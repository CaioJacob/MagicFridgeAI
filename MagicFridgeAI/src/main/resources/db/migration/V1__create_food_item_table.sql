CREATE TABLE food_item{
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    expiryDate VARCHAR(255) NOT NULL
    };