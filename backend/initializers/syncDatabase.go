package initializers

import "github.com/torgoMarket/Chatly/backend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.Color{}, &models.Chat{}, &models.User{})
}
