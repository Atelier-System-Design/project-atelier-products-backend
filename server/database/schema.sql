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
  style_id INTEGER REFERENCES styles (id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  id INTEGER NOT NULL PRIMARY KEY,
  style_id INTEGER REFERENCES styles(id),
  size TEXT,
  quantity INTEGER
);

CREATE TABLE related (
  id INTEGER NOT NULL PRIMARY KEY,
  current_product_id INTEGER REFERENCES products (id),
  related_product_id INTEGER REFERENCES products (id)
);

CREATE INDEX idx_features_pid on features(product_id);
CREATE INDEX idx_styles_pid on styles(product_id);
CREATE INDEX idx_photos_sid on photos(style_id);
CREATE INDEX idx_skus_sid on skus(style_id);
CREATE INDEX idx_related_pid on related(current_product_id);