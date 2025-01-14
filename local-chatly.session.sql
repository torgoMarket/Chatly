create table Users(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    tag VARCHAR(50) NOT NULL UNIQUE,
    colorid INT DEFAULT 0 REFERENCES colors(colorid),
    chats INT ARRAY,
    chatsorder TEXT
);

create table chats(
    chatid BIGSERIAL NOT NULL PRIMARY KEY,
    participant INT ARRAY
);

create table colors(
    colorid BIGSERIAL NOT NULL PRIMARY KEY,
    color TEXT
);

create table messages(
    messageid BIGSERIAL NOT NULL PRIMARY KEY,
    chatid INT REFERENCES chats(chatid),
    reply VARCHAR(500),
    body VARCHAR(500) NOT NULL,
    userid INT REFERENCES users(id),
    seentime DATE,
    edited BOOL DEFAULT FALSE
    );