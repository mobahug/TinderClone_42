CREATE TABLE visitHistory (
    id SERIAL PRIMARY KEY,
    user_id SERIAL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        visitor_id SERIAL,
    CONSTRAINT fk_visitor
        FOREIGN KEY(visitor_id)
        REFERENCES users(id)
        ON DELETE CASCADE);