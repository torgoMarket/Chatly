package models

type Chat struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"unique;not null"`
	//Members []User `gorm:"many2many:user_chats"`
	MembersNickName string `gorm:"type:json"`
}
