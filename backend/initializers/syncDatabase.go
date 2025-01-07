package initializers

import "github.com/torgoMarket/Chatly/backend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}
