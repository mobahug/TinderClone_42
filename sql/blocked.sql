CREATE TABLE blocked (
    id SERIAL PRIMARY KEY,
    user_id SERIAL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    blocked_id SERIAL,
    CONSTRAINT fk_blocked
        FOREIGN KEY(blocked_id) 
        REFERENCES users(id)
        ON DELETE CASCADE)
