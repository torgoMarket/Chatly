package websocket

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID       string `json:"id"`
	Username string `json:"username`
	RoomID   string `json:"roomId`
	Message  chan *Message
	Conn     *websocket.Conn
}

type Message struct {
	RoomID   string `json:"roomId`
	Username string `json:"username`
	Content  string `json:"content`
}

func (c *Client) writeMessage() {
	defer func() {
		c.Conn.Close()
	}()

	for {
		message, ok := <-c.Message
		if !ok {
			return
		}
		c.Conn.WriteJSON(message)
	}
}

func (c *Client) readMessage(hub *Hub) {
	defer func() {
		hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		msg := &Message{
			Content:  string(m),
			RoomID:   c.RoomID,
			Username: c.Username,
		}

		hub.Broadcast <- msg
	}
}
