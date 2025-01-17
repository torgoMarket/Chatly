package models

type Chat struct {
	ID      uint `gorm:"primaryKey"`
	Name    string
	Members []User `gorm:"many2many:user_chats"`
}
