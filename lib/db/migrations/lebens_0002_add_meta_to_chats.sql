-- Add column to Chat table
ALTER TABLE "Chat" ADD COLUMN IF NOT EXISTS "metadata" json;