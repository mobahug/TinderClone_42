CREATE TABLE usersTag (
    id SERIAL PRIMARY KEY,
    user_id SERIAL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    tag_id SERIAL,
    CONSTRAINT fk_tag
        FOREIGN KEY(tag_id)
        REFERENCES tag(id)
        ON DELETE CASCADE);