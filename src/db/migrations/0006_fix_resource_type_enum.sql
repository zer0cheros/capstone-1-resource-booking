-- Fix and align enum "resource_type" values with app strings.
-- This is intentionally a new migration so it runs even if older migrations were already applied.

-- Rename misspelled enum labels (safe: only runs when the old label exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_enum e ON e.enumtypid = t.oid
    WHERE t.typname = 'resource_type' AND e.enumlabel = 'Appartments & Spaces'
  ) THEN
    ALTER TYPE "public"."resource_type" RENAME VALUE 'Appartments & Spaces' TO 'Apartments & Spaces';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_enum e ON e.enumtypid = t.oid
    WHERE t.typname = 'resource_type' AND e.enumlabel = 'Office & Teach'
  ) THEN
    ALTER TYPE "public"."resource_type" RENAME VALUE 'Office & Teach' TO 'Office & Tech';
  END IF;
END $$;

-- Add missing enum value used by the app (safe: only runs when the value is absent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_enum e ON e.enumtypid = t.oid
    WHERE t.typname = 'resource_type' AND e.enumlabel = 'Vehicles & Transport'
  ) THEN
    ALTER TYPE "public"."resource_type" ADD VALUE 'Vehicles & Transport';
  END IF;
END $$;

