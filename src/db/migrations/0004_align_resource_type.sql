-- Align DB schema with current Drizzle model:
-- - resource.type  -> resource.resource_type
-- - enum "resource_type" values -> match app strings

DO $$
BEGIN
  -- Rename column if it still uses the old name from 0003
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'resource'
      AND column_name = 'type'
  ) THEN
    ALTER TABLE "public"."resource" RENAME COLUMN "type" TO "resource_type";
  END IF;
END $$;

-- Fix misspelled enum labels (Postgres supports RENAME VALUE)
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

-- Add missing enum value used by the app
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
