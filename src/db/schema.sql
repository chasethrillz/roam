DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  image_url TEXT,
  current_city VARCHAR(255) NOT NULL,
  join_date DATE
);

DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users,
  city_id INT REFERENCES cities,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
);
