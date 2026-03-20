DO $$
BEGIN
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