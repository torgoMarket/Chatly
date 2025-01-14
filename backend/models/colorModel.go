package models

type Color struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"size:50;not null;unique"`
}
