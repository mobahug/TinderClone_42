CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE preference AS ENUM ('male', 'female', 'both');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(10) NOT NULL UNIQUE,
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
)