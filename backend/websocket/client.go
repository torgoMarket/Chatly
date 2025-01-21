package websocket

import (
	"log"

	"github.com/gorilla/websocket"
	"github.com/torgoMarket/Chatly/backend/initializers"
)

type Client struct {
	ID       string `json:"id"`
	Username string `json:"username`
	RoomID   string `json:"roomId`
	Message  chan *Message
	Conn     *websocket.Conn
}

type Message struct {
	ID       string `json:"Id"`
	UserID   string `json:"userId`
	RoomID   string `json:"roomId`
	Username string `json:"username`
	Content  string `json:"content`
	SeenTime string `json:"seenTime`
}

// var (
// 	pongWait   = 15 * time.Second
// 	pingPeriod = (pongWait * 9) / 10
// )

func (c *Client) writeMessage(roomID string) {
	defer func() {
		c.Conn.Close()
	}()

	//ticker := time.NewTicker(pingPeriod)

	for {
		select {
		case message, ok := <-c.Message:
			if !ok {
				return
			}
			c.Conn.WriteJSON(message)
			// case <-ticker.C:
			// 	log.Println("ping")
			// 	if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
			// 		log.Println(err.Error())
			// 		return
			// 	}

		}
	}
}

func (c *Client) readMessage(hub *Hub) {
	defer func() {
		hub.Unregister <- c
		c.Conn.Close()
	}()
	// if err := c.Conn.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
	// 	log.Println(err.Error())
	// 	return
	// }
	c.Conn.SetReadLimit(512)
	//c.Conn.SetPongHandler(c.pongHandler())

	//change seent time of message in db
	for {
		_, m, err := c.Conn.ReadMessage()
		// _ is message type that can be recieved
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		//------------------------------------
		initializers.DB.Table("chat_"+c.RoomID).Where("id = ?", "1").Update("seen_time", "now()") // update seen time of message
		msg := &Message{
			Content:  string(m),
			RoomID:   c.RoomID,
			Username: c.Username,
		}
		hub.Broadcast <- msg
	}
}

// func (c *Client) pongHandler() func(string) error {
// 	return func(string) error {
// 		return c.Conn.SetReadDeadline(time.Now().Add(pongWait))
// 	}
// }
