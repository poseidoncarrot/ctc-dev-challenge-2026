-- Migration 002: Expand restaurants table with additional detailed information
--
-- Adds location data, distance from home, price range, contact info, and hours
-- All fields are nullable to maintain backward compatibility

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS latitude NUMERIC,
  ADD COLUMN IF NOT EXISTS longitude NUMERIC,
  ADD COLUMN IF NOT EXISTS distance_from_home NUMERIC,
  ADD COLUMN IF NOT EXISTS price_range TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS hours TEXT;
