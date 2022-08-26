CREATE TYPE category AS ENUM ('liked', 'visit profile', 'received message', 'liked back', 'unliked', );

CREATE TABLE notification (
    id SERIAL PRIMARY KEY,
    category category,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id SERIAL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    sender_id SERIAL,
    CONSTRAINT fk_sender
        FOREIGN KEY(sender_id) 
        REFERENCES users(id)
        ON DELETE CASCADE)
