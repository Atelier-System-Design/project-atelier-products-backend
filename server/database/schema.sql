-- psql products < /Users/chris/Desktop/hackreactor/project-atelier-products-backend/server/database/schema.sql

CREATE TABLE products (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INTEGER NOT NULL
);

CREATE TABLE features (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products (id),
  feature TEXT,
  value TEXT
);

CREATE TABLE styles (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER REFERENCES products (id),
  name TEXT,
  sale_price INTEGER,
  original_price INTEGER NOT NULL,
  default_style BOOLEAN
);

CREATE TABLE photos (
  id INTEGER NOT NULL PRIMARY KEY,
  styles_id INTEGER REFERENCES styles (id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  id INTEGER NOT NULL PRIMARY KEY,
  styles_id INTEGER REFERENCES styles(id),
  size TEXT,
  quantity INTEGER
);

CREATE TABLE cart (
  id INTEGER NOT NULL PRIMARY KEY,
  user_session INTEGER NOT NULL,
  product_id INTEGER REFERENCES products (id),
  active BOOLEAN
)