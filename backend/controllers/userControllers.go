package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/middleware"
	"github.com/torgoMarket/Chatly/backend/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SignUp(c *gin.Context) {
	var body struct {
		Name     string
		Email    string
		Password string
		NickName string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in SignUp",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}
	user := models.User{Name: body.Name, Email: body.Email, Password: string(hash), NickName: body.NickName, Device_hear: "", Device_voice: "", ColorID: 0}
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
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
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

	jwtToken, err := middleware.GenerateJWT(user.ID, user.NickName)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", jwtToken, 3600*24*30, "/", "localhost", false, true)
	user = middleware.UserDtoToUser(&user)
	c.JSON(http.StatusOK, user)

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
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"msg": "unsigned"})

}

func Sendmail(c *gin.Context) {
	var body struct {
		Email   string
		Subject string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in Logout",
		})
		return
	}
	if body.Subject == "Email verification" {
		code := middleware.SendEmail(
			"Email verification",
			"<h1>Your verification code: </h1> <h2>",
			body.Email,
		)
		c.JSON(http.StatusOK, gin.H{
			"code": code,
		})
		var user models.User
		initializers.DB.First(&user, "email = ?", body.Email)
		if user.ID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid email or password",
			})
			return
		}
		user.ActivationCode = code
		initializers.DB.Save(&user)
		c.JSON(http.StatusOK, gin.H{"msg": "Email code sent"})
	} else if body.Subject == "Password recovery" {
		code := middleware.SendEmail(
			"Password recovery",
			"<h1>Your recovery code: </h1> <h2>",
			body.Email,
		)
		c.JSON(http.StatusOK, gin.H{
			"code": code,
		})
		var user models.User
		initializers.DB.First(&user, "email = ?", body.Email)
		if user.ID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid email or password",
			})
			return
		}
		user.ActivationCode = code
		initializers.DB.Save(&user)
		c.JSON(http.StatusOK, gin.H{"msg": "Recovery code sent"})
	}
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
			"error": "Failed to read body in email verfication",
		})
		return
	}
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
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

func RecoverPassword(c *gin.Context) {
	var Body struct {
		Email       string
		NewPassword string
		Code        int
	}
	if c.Bind(&Body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in RecoverPassword",
		})
		return
	}
	var user models.User
	initializers.DB.First(&user, "email = ?", Body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email",
		})
		return
	}
	if user.ActivationCode != Body.Code {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid code",
		})
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(Body.NewPassword), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}
	user.Password = string(hash)
	user.ActivationCode = 0
	initializers.DB.Save(&user)
	c.JSON(http.StatusOK, gin.H{
		"msg": "Password changed",
	})

}

func GetUser(c *gin.Context) {
	var Body struct {
		NickName string
		Email    string
	}
	if c.Bind(&Body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in RecoverPassword",
		})
		return
	}
	var user models.User
	err := initializers.DB.Where("nick_name = ? OR email = ?", Body.NickName, Body.Email).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "User not found",
			})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error()})
		return
	} else {
		user = middleware.UserDtoToUser(&user)
		c.JSON(http.StatusOK, user)
	}
}

func UpdateUser(c *gin.Context) {
	var Body struct {
		Name         string
		NickName     string
		Email        string
		Device_hear  string
		Device_voice string
	}
	if c.Bind(&Body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in RecoverPassword",
		})
		return
	}
	var user models.User
	err := initializers.DB.Where("nick_name = ? OR email = ?", Body.NickName, Body.Email).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "User not found",
			})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error()})
		return
	} else {
		user.Name = Body.Name
		user.NickName = Body.NickName
		user.Device_hear = Body.Device_hear
		user.Device_voice = Body.Device_voice
		initializers.DB.Save(&user)
		user = middleware.UserDtoToUser(&user)
		c.JSON(http.StatusOK, user)
	}
}
