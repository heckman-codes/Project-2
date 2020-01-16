DROP DATABASE IF EXISTS users;
CREATE DATABASE users;

USE users;

CREATE TABLE user_profile
(
    user_id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NUll,
    user_name VARCHAR(100) NOT NULL,
    photo_url VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id),
)

DROP DATABASE IF EXISTS pets;
CREATE DATABASE pets;

USE pets;

CREATE TABLE saved_pets
(
    pet_id INT AUTO_INCREMENT NOT NULL,
    animal_id INT NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    breed_primary VARCHAR(100) NOT NULL,
    pet_description VARCHAR(500) NOT NULL,
    photo_url VARCHAR(100) NOT NULL,
    location_address VARCHAR(100) NOT NULL,
    location_city VARCHAR(100) NOT NULL,
    location_state VARCHAR(100) NOT NULL,
    location_postcode VARCHAR(100) NOT NULL,
    location_country VARCHAR(100) NOT NULL,
    location_email VARCHAR(255) NOT NULL,
    location_phone VARCHAR(100) NOT NULL,
    distance_miles DECIMAL(10,2) NULL,
    FOREIGN KEY (user_id)
        REFERENCES user_profile(user_id),
        ON DELETE CASCADE
)