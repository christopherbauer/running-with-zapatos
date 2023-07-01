CREATE DATABASE ecommerce;
\c ecommerce;

-- Create the User table
CREATE TABLE "User" (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create the Product table
CREATE TABLE "Product" (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create the Order table
CREATE TABLE "Order" (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "User"(user_id),
  order_date DATE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(255) NOT NULL
);

-- Create the OrderItem table
CREATE TABLE "OrderItem" (
  order_item_id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES "Order"(order_id),
  product_id INTEGER REFERENCES "Product"(product_id),
  quantity INTEGER NOT NULL,
  price_per_unit DECIMAL(10, 2) NOT NULL
);

-- Create the Address table
CREATE TABLE "Address" (
  address_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "User"(user_id),
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  postal_code VARCHAR(20) NOT NULL
);
