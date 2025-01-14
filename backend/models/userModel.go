package models

type User struct {
	ID             uint   `gorm:"primaryKey"`
	Name           string `gorm:"size:50;not null"`
	Email          string `gorm:"size:100;unique;not null"`
	Password       string `gorm:"not null"`
	Tag            string `gorm:"size:50;unique"`
	Device_hear    string
	Device_voice   string
	Chats          []Chat `gorm:"many2many:user_chats"`
	IsActivated    bool   `gorm:"default:false"`
	ActivationCode int
	ColorID        uint  `gorm:"default:0"`          // Внешний ключ
	Color          Color `gorm:"foreignKey:ColorID"` // Связь с таблицей colors
}
