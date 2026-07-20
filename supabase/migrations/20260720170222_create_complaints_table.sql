/*
# Create complaints table for the Community Complaint Board

1. New Tables
- `complaints`
  - `id` (uuid, primary key)
  - `display_name` (text, optional - the name of the person filing the complaint)
  - `complaint` (text, the funny complaint text)
  - `severity` (text, severity level: Low, Medium, High, Critical, Catastrophic)
  - `reactions` (jsonb, default empty object - tracks reaction counts like laugh, angry, agree)
  - `status` (text, default 'Pending Investigation' - investigation status)
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on `complaints`.
- This is a no-auth, single-tenant parody app where the complaint board is intentionally public/shared.
- Allow anon + authenticated CRUD with USING (true) because the data is intentionally public.

3. Notes
- The frontend uses the anon key, so anon must have read+write access.
- Reactions are stored as a jsonb object to allow flexible reaction types.
*/

CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text,
  complaint text NOT NULL,
  severity text NOT NULL DEFAULT 'Medium',
  reactions jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'Pending Investigation',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_complaints" ON complaints;
CREATE POLICY "anon_select_complaints" ON complaints FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_complaints" ON complaints;
CREATE POLICY "anon_insert_complaints" ON complaints FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_complaints" ON complaints;
CREATE POLICY "anon_update_complaints" ON complaints FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_complaints" ON complaints;
CREATE POLICY "anon_delete_complaints" ON complaints FOR DELETE
  TO anon, authenticated USING (true);
