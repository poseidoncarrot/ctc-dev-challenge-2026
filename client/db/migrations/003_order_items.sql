-- Migration 003: Create order_items table for detailed order tracking
--
-- Tracks individual items ordered during each visit
-- Foreign key to visits ensures data integrity

CREATE TABLE IF NOT EXISTS order_items (
  id         SERIAL PRIMARY KEY,
  "visitId"  INTEGER NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  item_name  TEXT    NOT NULL,
  price      NUMERIC(10, 2) NOT NULL,
  quantity   INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_visit_id ON order_items ("visitId");
