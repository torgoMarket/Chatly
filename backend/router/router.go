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
		AllowOrigins:     []string{"http://localhost:3000"},
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
	r.GET("/val", middleware.RequireAuth, controllers.Validate) // validate account
	r.POST("/logout", controllers.Logout)
	r.POST("/sendmail", controllers.Sendmail)
	r.POST("/vermail", controllers.VerifyEmail)

	r.POST("/ws/createroom", wsHandler.CreateRoom)
	r.GET("/ws/joinroom/:roomId", wsHandler.JoinRoom)
	r.GET("/ws/getrooms", wsHandler.GetRooms)
	r.GET("/ws/getclients/:roomId", wsHandler.GetClients)
}

func Start(addr string) error {
	return r.Run()
}
