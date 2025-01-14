package models

import (
	"time"
)

type Message struct {
	ID        uint `gorm:"primaryKey"`
	ChatID    uint `gorm:"not null"`
	Reply     string
	Content   string    `gorm:"not null;size:500"`
	UserID    uint      `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}
