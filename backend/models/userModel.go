package models

type User struct {
	//gorm.Model
	Id         int `gorm:"unique"`
	Name       string
	Email      string `gorm:"unique <-"`
	Password   string
	Tag        string `gorm:"unique"`
	Color_id   int
	Chats      string
	ChatsOrder string
}
