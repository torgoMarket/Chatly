package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/models"
	"gorm.io/gorm"
)

func CreateChat(c *gin.Context, chatName string) {
	// var chat models.Chat
	// if err := c.ShouldBindJSON(&chat); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	var chat models.Chat
	if err := initializers.DB.First(&chat, "name = ?", chatName).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Chat already exists"})
		return
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query chat", "details": err.Error()})
		return
	}
	fmt.Println(reflect.TypeOf(chatName))
	members := strings.Split(chatName, "&")
	jsonMembers, err := json.Marshal(members)
	if err != nil {
		log.Fatalf("Failed to serialize members: %v", err)
	}
	fmt.Println("type offf -------------", reflect.TypeOf(members))
	chat = models.Chat{
		Name:            chatName,
		MembersNickName: string(jsonMembers),
	}
	if initializers.DB.Create(&chat).Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create chat"})
		return
	}
	if err := CreateChatMessagesTable(chat.ID); err != nil { // create message table for chat
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Chat created successfully"})
}

// func GetChatsofUser(c *gin.Context) {
// 	user := c.Query("name")
// 	if user == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "User parameter is required"})
// 		return
// 	}
// 	var chats []models.Chat
// 	err := initializers.DB.Joins("JOIN user_chats ON user_chats.chat_id = chats.id").
// 		Joins("JOIN users ON users.id = user_chats.user_id").
// 		Where("users.nick_name = ?", user).
// 		Preload("Members").
// 		Find(&chats).Error

// 	if err != nil {
// 		panic(err)
// 	}

// 	// Вывод результата
// 	for _, chat := range chats {
// 		fmt.Printf("Chat ID: %d, Name: %s\n", chat.ID, chat.Name)
// 		for _, member := range chat.Members {
// 			fmt.Printf(" - Member: %s\n", member.Name)
// 		}
// 	}
// 	c.JSON(http.StatusOK, chats)
// }

func CreateChatMessagesTable(chatID uint) error {
	tableName := fmt.Sprintf("chat_%d", chatID)
	if !initializers.DB.Migrator().HasTable(tableName) {
		result := initializers.DB.Table(tableName).AutoMigrate(&models.Message{})
		if result.Error != nil {
			return fmt.Errorf("Failed to create table %s: %s", tableName, result.Error)
		}
		log.Printf("Table %s created", tableName)
	} else {
		return fmt.Errorf("Table %s already exists", tableName)
	}
	return nil
}

func InsertMessage(message *models.Message) {
	tableName := fmt.Sprintf("chat_%d", message.ChatID)
	result := initializers.DB.Table(tableName).Create(message)
	if result.Error != nil {
		log.Fatal("Failed to save message")
	}
}

func GetMessagesofChat(c *gin.Context) {
	var body struct {
		ChatID uint "json:chatid"
		Limit  int  "json:limit"
		Offset int  "json:offset"
	}
	// or can do as c.Query
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"err": err.Error(),
		})
		return
	}
	fmt.Println(body)
	if c.Bind(&body) == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body in getting messages",
		})
		return
	}
	var messages []models.Message
	tableName := fmt.Sprintf("chat_%d", body.ChatID)
	err := initializers.DB.Table(tableName).
		Limit(body.Limit).
		Offset(body.Offset).
		Order("created_at desc").
		Find(&messages).Error
	c.JSON(http.StatusOK, gin.H{
		"data":  messages,
		"error": err,
	})
}

func GetChats(c *gin.Context) {
	var chats []models.Chat
	initializers.DB.Find(&chats)
	c.JSON(http.StatusOK, chats)
}
