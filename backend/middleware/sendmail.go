package middleware

import (
	"log"
	"math/rand"
	"net/smtp"
	"os"
	"strconv"
)

func SendEmail(subject string, html string, email string) int {
	code := rand.Intn(9000) + 1000
	auth := smtp.PlainAuth(
		"",
		os.Getenv("SMTPEMAIL"),
		os.Getenv("SMTP"),
		"smtp.gmail.com",
	)

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	var stringifiedCode string = strconv.Itoa(code)

	msg := "Subject: " + subject + "\n" + headers + "\n\n" + html + stringifiedCode + "</h2>"
	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		os.Getenv("SMTPEMAIL"),
		[]string{email},
		[]byte(msg),
	)
	if err != nil {
		log.Fatal(err)
	}
	return code
}
