CREATE TABLE conversation (
    id SERIAL PRIMARY KEY,
    user_id1 SERIAL,
    blocked BOOLEAN DEFAULT false,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id1) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    user_id2 SERIAL,
    CONSTRAINT fk_user2
        FOREIGN KEY(user_id2) 
        REFERENCES users(id)
        ON DELETE CASCADE)
