package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/middleware"
	"github.com/torgoMarket/Chatly/backend/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var body struct {
		Name     string
		Email    string
		Password string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in SignUp",
		})
		return
	}

	fmt.Println(body.Name,body.Email)
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash Password",
		})
		return
	}

	tag := uuid.NewString()
	user := models.User{Name: body.Name, Email: body.Email, Password: string(hash), Tag: tag, Device_hear: "", Device_voice: "", ColorID: 0}
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "Signup successfully complete"})

}

func Login(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in SignUp",
		})
		return
	}
	var user models.User
	initializers.DB.First(&user, "Email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Email or Password",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	jwtToken, err := middleware.GenerateJWT(user.ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", jwtToken, 3600*24*30, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{
		"userid": user.ID,
		"Name":   user.Name,
	},
	)

}

func Logout(c *gin.Context) {
	var body struct {
		Email string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in Logout",
		})
		return
	}
	var user models.User
	initializers.DB.First(&user, "Email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Email or Password",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"msg": "unsigned"})

}

func Sendmail(c *gin.Context) {
	var body struct {
		Email string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in Logout",
		})
		return
	}
	Code := middleware.SendEmail(
		"Email verification",
		"<h1>Your verification Code: </h1> <h2>",
		body.Email,
	)
	c.JSON(http.StatusOK, gin.H{
		"Code": Code,
	})
	var user models.User
	initializers.DB.First(&user, "Email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Email or Password",
		})
		return
	}
	user.ActivationCode = Code
	initializers.DB.Save(&user)
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"msg": user,
	})
}

func VerifyEmail(c *gin.Context) {
	var body struct {
		Code  int
		Email string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in Email verfication",
		})
		return
	}
	var user models.User
	initializers.DB.First(&user, "Email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Email or Password",
		})
		return
	}
	user.IsActivated = true
	initializers.DB.Save(&user)
	c.JSON(http.StatusOK, gin.H{
		"msg":  "verified",
		"body": body.Email,
	})

}
