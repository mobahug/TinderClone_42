CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id SERIAL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    liker_id SERIAL,
    CONSTRAINT fk_liker
        FOREIGN KEY(liker_id) 
        REFERENCES users(id)
        ON DELETE CASCADE)
