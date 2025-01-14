package models

type Chat struct {
	ID      uint   `gorm:"primaryKey"`
	Members []User `gorm:"many2many:user_chats"`
}
