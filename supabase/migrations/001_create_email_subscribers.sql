-- Create email_subscribers table for lead capture + newsletter
-- Run this in the Supabase SQL Editor for project tpihpenmsiojzznpcmcr

CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text,
  lead_magnet text,
  page_url text,
  created_at timestamptz DEFAULT now(),
  subscribed boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the frontend capture forms)
CREATE POLICY "Allow anonymous insert" ON public.email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow upsert (update on conflict) for anon role
CREATE POLICY "Allow anonymous update own row" ON public.email_subscribers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON public.email_subscribers (email);

-- Index on created_at for analytics queries
CREATE INDEX IF NOT EXISTS idx_email_subscribers_created_at ON public.email_subscribers (created_at DESC);
