-- Schema for ItemNode table
-- This will be executed before data.sql

CREATE TABLE IF NOT EXISTS item_node (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255),
    description VARCHAR(500),
    price DOUBLE,
    picture VARCHAR(255)
);