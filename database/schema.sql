-- psql products < /Users/chris/Desktop/hackreactor/project-atelier-products-backend/database/schema.sql

CREATE TABLE products (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INTEGER NOT NULL
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  feature TEXT,
  value TEXT
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  name TEXT,
  original_price INTEGER NOT NULL,
  sale_price INTEGER,
  default_style BOOLEAN,
  product_id INTEGER REFERENCES products (id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  thumbnail_url TEXT,
  url TEXT,
  styles_id INTEGER REFERENCES styles (id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  size TEXT,
  styles_id INTEGER REFERENCES styles(id)
);