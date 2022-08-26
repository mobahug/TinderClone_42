CREATE TABLE photos (
      id SERIAL PRIMARY KEY,
      uri  VARCHAR(255) UNIQUE,
      is_profile BOOLEAN DEFAULT FALSE,
      path VARCHAR(255) UNIQUE,
      user_id SERIAL,
      CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
            ON DELETE CASCADE)