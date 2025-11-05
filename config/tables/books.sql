CREATE TABLE books (
    id BIGINT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    available BOOLEAN NOT NULL,
    UNIQUE(title)
);