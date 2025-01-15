package websocket

import (
	"fmt"
	"sync"
)

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
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

	room, exists := h.Rooms[client.RoomID]
	if !exists {
		room = &Room{
			ID:      client.RoomID,
			Clients: make(map[string]*Client),
		}
		h.Rooms[client.RoomID] = room
	}

	room.Clients[client.ID] = client
}

func (h *Hub) removeClientFromRoom(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	room, exists := h.Rooms[client.RoomID]
	if !exists {
		return
	}

	delete(room.Clients, client.ID)
	if len(room.Clients) == 0 {
		delete(h.Rooms, client.RoomID)
	}
}

func (h *Hub) sendMessageToRoom(message *Message) {
	h.mu.Lock()
	defer h.mu.Unlock()

	fmt.Println(message.Content)

	room, exists := h.Rooms[message.RoomID]
	if !exists {
		return
	}

	for _, client := range room.Clients {
		client.Message <- message
	}
}
