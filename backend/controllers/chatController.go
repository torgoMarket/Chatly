package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/torgoMarket/Chatly/backend/initializers"
	"github.com/torgoMarket/Chatly/backend/models"
)

func CreateChat(c *gin.Context) {
	var chat models.Chat
	if err := c.ShouldBindJSON(&chat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := initializers.DB.Create(&chat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create chat"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Chat created successfully"})
}
func GetChatHistory() {}
func GetChats(c *gin.Context) {

	var chats []models.Chat
	err := initializers.DB.Joins("JOIN user_chats ON user_chats.chat_id = chats.id").
		Joins("JOIN users ON users.id = user_chats.user_id").
		Where("users.nick_name = ?", "Asad").
		Preload("Members").
		Find(&chats).Error

	if err != nil {
		panic(err)
	}

	// Вывод результата
	for _, chat := range chats {
		fmt.Printf("Chat ID: %d, Name: %s\n", chat.ID, chat.Name)
		for _, member := range chat.Members {
			fmt.Printf(" - Member: %s\n", member.Name)
		}
	}
	c.JSON(http.StatusOK, chats)
}
