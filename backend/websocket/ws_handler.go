package websocket

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/torgoMarket/Chatly/backend/controllers"
	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/middleware"
	"github.com/torgoMarket/Chatly/backend/models"
)

type Handler struct {
	hub *Hub
}

func NewHandler(h *Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

type CreateRoomReq struct {
	ID   string `json:"id"`
	Name string `json:"name"` // receiver`s nick-name
}

func (h *Handler) CreateRoom(c *gin.Context) {
	var req CreateRoomReq
	user := middleware.ParseToken(c)
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err": err.Error(),
		})
		return
	}
	h.hub.mu.Lock()
	defer h.hub.mu.Unlock()

	if _, exists := h.hub.Rooms[req.ID]; exists {
		c.JSON(http.StatusConflict, gin.H{"error": "Room already exists"})
		return
	}
	rname := req.Name + "&" + user.NickName
	// check if chat already exists
	var chatinfo models.Chat
	initializers.DB.Table("chats").First(&chatinfo, "name=?", rname)

	if chatinfo.ID == 0 {
		controllers.CreateChat(c, rname)
	}

	h.hub.Rooms[req.ID] = &Room{
		ID:      req.ID, // should get from fend
		Name:    rname,
		Clients: make([]*Client, 0),
	}
	c.JSON(http.StatusOK, req)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		switch origin {
		case "http://localhost:3000":
			return true
		case "http://localhost:5173":
			return true
		default:
			return true // for test(dev- false)
		}
	},
}

func (h *Handler) JoinRoom(c *gin.Context) {
	roomID := c.Query("roomid")
	clientID := c.Query("userid")
	username := c.Query("username")
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//registering new client
	cl := &Client{
		ID:       clientID,
		Username: username,
		RoomID:   roomID,
		Message:  make(chan *Message, 10),
		Conn:     conn,
	}
	h.hub.Register <- cl
	// send to frontend that user is online instead
	// m := &Message{
	// 	UserID:   clientID,
	// 	RoomID:   roomID,
	// 	Content:  username + " has joined the room",
	// 	Username: "Admin",
	// }

	// h.hub.Broadcast <- m

	go cl.readMessage(h.hub)
	go cl.writeMessage(cl.RoomID)
}

type RoomRes struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (h *Handler) GetRooms(c *gin.Context) {
	rooms := make([]RoomRes, 0)
	for _, r := range h.hub.Rooms {
		rooms = append(rooms, RoomRes{
			ID:   r.ID,
			Name: r.Name,
		})
	}

	c.JSON(http.StatusOK, rooms)
}

type ClientRes struct {
	ID map[string][]string `json:"id"`
}

func (h *Handler) GetClients(c *gin.Context) {
	var clients ClientRes
	clients.ID = make(map[string][]string)
	roomId := c.Param("roomId")
	h.hub.mu.Lock()
	room, ok := h.hub.Rooms[roomId]
	h.hub.mu.Unlock()
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
	}
	for _, cl := range room.Clients {
		clients.ID[roomId] = append(clients.ID[roomId], cl.Username)
	}
	c.JSON(http.StatusOK, gin.H{
		"msg": clients,
	})
}
