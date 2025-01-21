package websocket

import (
	"strconv"
	"sync"

	"github.com/torgoMarket/Chatly/backend/controllers"
	"github.com/torgoMarket/Chatly/backend/models"
)

type Room struct {
	ID      string    `json:"id"`
	Name    string    `json:"name"`
	Clients []*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
	mu         sync.Mutex
}

func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan *Message, 5),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case cl := <-h.Register:
			h.addClientToRoom(cl)
		case cl := <-h.Unregister:
			h.removeClientFromRoom(cl)
		case m := <-h.Broadcast:
			h.sendMessageToRoom(m)

		}
	}
}

func (h *Hub) addClientToRoom(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	// Check if user in DB is partier

	room, exists := h.Rooms[client.RoomID]
	if !exists {
		//log.Fatal("Room not found") //For Dev time
		room = &Room{
			ID:      client.RoomID,
			Clients: make([]*Client, 0),
		}
		h.Rooms[client.RoomID] = room
	}

	room.Clients = append(room.Clients, client)

}

func (h *Hub) removeClientFromRoom(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	room, exists := h.Rooms[client.RoomID]
	if !exists {
		return
	}

	// delete client from room
	for i, cl := range room.Clients {
		if cl.Username == client.Username {
			room.Clients = append(room.Clients[:i], room.Clients[i+1:]...)
			client.RoomID = ""
			break
		}
	}
	//delete room if no clients
	if len(room.Clients) == 0 {
		delete(h.Rooms, client.RoomID)
	}
}

func (h *Hub) sendMessageToRoom(message *Message) {
	h.mu.Lock()
	defer h.mu.Unlock()

	room, exists := h.Rooms[message.RoomID]
	if !exists {
		return
	}

	// create chat and insert message
	// controllers.InsertMessage()
	uintRoomID, _ := strconv.ParseUint(message.RoomID, 10, 64)
	uintUserID, _ := strconv.ParseUint(message.UserID, 10, 64)
	var msg models.Message
	msg.ChatID = uint(uintRoomID)
	msg.Content = message.Content
	msg.UserID = uint(uintUserID)
	controllers.InsertMessage(&msg)
	message.ID = strconv.FormatUint(uint64(msg.ID), 10)

	//broadcast message to all clients in room except sender
	for _, client := range room.Clients {
		if client.Username == message.Username {
			continue
		}
		client.Message <- message

	}
}
