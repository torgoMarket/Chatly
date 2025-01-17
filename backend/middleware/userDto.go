package middleware

import "github.com/torgoMarket/Chatly/backend/models"

func UserDtoToUser(user *models.User) models.User {
	return models.User{
		Name:         user.Name,
		Email:        user.Email,
		NickName:     user.NickName,
		Device_hear:  user.Device_hear,
		Device_voice: user.Device_voice,
	}
}
