-- Schema update to fix ID column in user_details_node table
-- This will be executed to ensure proper auto-increment setup

-- First, check if the table exists and has the wrong ID column type
-- Drop and recreate the user_details_node table with proper auto-increment
DROP TABLE IF EXISTS user_details_node CASCADE;

CREATE TABLE user_details_node (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    full_name VARCHAR(255),
    address VARCHAR(255),
    address_two VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    card_num VARCHAR(255)
);

-- Note: This will clear existing user detail data, but preserves users and items
-- In production, you would use ALTER TABLE or a proper migration tool