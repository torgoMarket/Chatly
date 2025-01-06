CREATE TABLE Users(
    Id BIGSERIAL NOT NULL PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Email VARCHAR(30) NOT NULL,
    Password VARCHAR(30) NOT NULL,
    Tag VARCHAR(50) NOT NULL,
    color_id INT,
    chats TEXT,
    chats_order TEXT
);