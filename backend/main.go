package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/torgoMarket/Chatly/backend/controllers"
	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/middleware"
	"github.com/torgoMarket/Chatly/backend/websocket"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func serveWS(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("websocket endpoint reached")
	conn, _ := websocket.Upgrade(w, r)
	client := &websocket.Client{Conn: conn, Pool: pool}
	pool.Register <- client
	client.Read()

}

func setupRotes() {
	pool := websocket.NewPool()
	go pool.Start()
}
func main() {
	r := gin.Default()
	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/val", middleware.RequireAuth, controllers.Validate)
	r.Run()
}
