CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id SERIAL,
    message VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE, 
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    sender_id SERIAL,
    CONSTRAINT fk_sender
        FOREIGN KEY(sender_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    conversation_id SERIAL,
    CONSTRAINT fk_conversation
        FOREIGN KEY(conversation_id)
        REFERENCES conversation(id)
        ON DELETE CASCADE)