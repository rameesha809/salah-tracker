CREATE DATABASE salahtracking;

-- CREATE TABLE salah (
--     id SERIAL PRIMARY KEY,                   -- Unique identifier for each prayer record
--     user_id VARCHAR(255),                    -- ID of the user who is being tracked
--     prayer_date DATE NOT NULL,               -- Date for which the data is recorded
--     fajr JSONB,                              -- JSONB type to store details about Fajr prayer
--     dhuhr JSONB,                             -- JSONB type to store details about Dhuhr prayer
--     asr JSONB,                               -- JSONB type to store details about Asr prayer
--     maghrib JSONB,                           -- JSONB type to store details about Maghrib prayer
--     isha JSONB,                              -- JSONB type to store details about Isha prayer
--     UNIQUE (user_id, prayer_date)            -- Ensure only one entry per user and date
-- );

-- CREATE TABLE salah (
--     id SERIAL PRIMARY KEY,                   -- Unique identifier for each prayer record
--     user_id VARCHAR(255),                    -- ID of the user being tracked
--     prayer_date DATE NOT NULL,               -- Date for which the prayers are recorded
--     prayers JSONB,                           -- JSONB to store all prayer data for the day
--     UNIQUE (user_id, prayer_date)            -- Ensure only one entry per user and date
-- );

CREATE TABLE salah (
    user_id VARCHAR(255) PRIMARY KEY,   -- Each user will have a unique entry in the table
    prayer_data JSONB                   -- JSONB field to store prayer records for multiple dates
);

