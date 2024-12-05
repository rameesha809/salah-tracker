CREATE DATABASE salahtracking;

CREATE TABLE salah (
    user_id VARCHAR(255) PRIMARY KEY,   -- Each user will have a unique entry in the table
    prayer_data JSONB                   -- JSONB field to store prayer records for multiple dates
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE saved_hadith (
    id SERIAL PRIMARY KEY,                
    user_id INTEGER REFERENCES users(id),  -- Foreign key to link to users table
    hadith_id VARCHAR(255),               
    hadith_data JSONB,                    
    saved_at TIMESTAMP DEFAULT NOW(),     
    UNIQUE (user_id, hadith_id)            -- Ensure each Hadith can only be saved once per user
);
