CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE preference AS ENUM ('male', 'female', 'both');
CREATE TYPE category AS ENUM ('liked', 'visit profile', 'received message', 'match', 'unliked', 'blocked');
create extension if not exists cube;
create extension if not exists earthdistance;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR NOT NULL,
    email VARCHAR(100) NOT NULL  UNIQUE,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    logged_in TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT false,
    activation_code VARCHAR(255) NOT NULL,
    lost_password_code VARCHAR(255) NULL,
    preference preference,
    gender gender,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    ip_latitude DOUBLE PRECISION,
    ip_longitude DOUBLE PRECISION,
    birthdate DATE,
    fame INTEGER DEFAULT 100,
    bio VARCHAR(500),
    wants_to_be_positioned BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS tag (
    id SERIAL PRIMARY KEY,
    name  VARCHAR(255) UNIQUE);

CREATE TABLE IF NOT EXISTS usersTag (
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

 CREATE TABLE IF NOT EXISTS blocked (
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
        ON DELETE CASCADE);


CREATE TABLE IF NOT EXISTS photos (
      id SERIAL PRIMARY KEY,
      uri  VARCHAR(255),
      is_profile BOOLEAN DEFAULT FALSE,
      path VARCHAR(255) UNIQUE,
      user_id SERIAL,
      CONSTRAINT fk_user
            FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS notification (
    id SERIAL PRIMARY KEY,
    category category,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id SERIAL,
    is_read BOOLEAN DEFAULT FALSE, 
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    sender_id SERIAL,
    CONSTRAINT fk_sender
        FOREIGN KEY(sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS visitHistory (
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

CREATE TABLE IF NOT EXISTS conversation (
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
        ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE, 
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
        ON DELETE CASCADE,
    conversation_id SERIAL,
    CONSTRAINT fk_conversation
        FOREIGN KEY(conversation_id)
        REFERENCES conversation(id)
        ON DELETE CASCADE);

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
        ON DELETE CASCADE);

CREATE TABLE testtable (
    id SERIAL PRIMARY KEY,
    name VARCHAR(10)
);

SELECT cron.schedule('0 0 * * *', $$update users set fame=0 where DATE_PART('day', now()-users.logged_in)>7$$);