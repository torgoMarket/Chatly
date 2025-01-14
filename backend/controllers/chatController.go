package controllers

import (
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
func GetChats()       {}
