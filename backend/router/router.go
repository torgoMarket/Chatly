package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/torgoMarket/Chatly/backend/controllers"
	"github.com/torgoMarket/Chatly/backend/middleware"
	"github.com/torgoMarket/Chatly/backend/websocket"
)

var r *gin.Engine

func InitRouter(wsHandler *websocket.Handler) { //userHandler *userHandler,
	r = gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	}))
	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/getuserinfo", middleware.RequireAuth, controllers.Validate) // validate account
	r.POST("/logout", controllers.Logout)
	r.POST("/sendmail", controllers.Sendmail)
	r.POST("/vermail", controllers.VerifyEmail)
	r.GET("/getusers", controllers.GetUsers)
	r.POST("/getuser", controllers.GetUser)
	r.GET("/recover", controllers.RecoverPassword)
	//r.POST("/reset", controllers.ResetPassword) // have to implement
	r.POST("/update", controllers.UpdateUser)

	r.POST("/ws/createroom", middleware.RequireAuth, wsHandler.CreateRoom)
	r.GET("/ws/joinroom", wsHandler.JoinRoom)
	r.GET("/ws/getrooms", wsHandler.GetRooms)
	r.GET("/ws/getclients/:roomId", wsHandler.GetClients)

	r.POST("/ws/getchathistory", controllers.GetMessagesofChat)
	r.GET("/ws/getchats", controllers.GetChats)

}

func Start(addr string) error {
	return r.Run()
}
