package main

import (
	"os"

	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/router"
	"github.com/torgoMarket/Chatly/backend/websocket"
)

func init() {
	initializers.LoadEnvVariables()

	initializers.InitDB()
	initializers.SyncDatabase()
}

func main() {
	// init server
	hub := websocket.NewHub()
	wshandler := websocket.NewHandler(hub)
	go hub.Run()
	router.InitRouter(wshandler)
	router.Start(os.Getenv("PORT"))

}
