-- Create review_requests table for TCP autonomous ops review dashboard
-- Bernard inserts rows here to queue items for Brett's one-click GO/REVISE.
-- Run this in the Supabase SQL Editor for project tpihpenmsiojzznpcmcr.

CREATE TABLE IF NOT EXISTS public.review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type text NOT NULL,
  item_label text NOT NULL,
  preview_urls text[] DEFAULT ARRAY[]::text[],
  context_md text,
  created_by text DEFAULT 'bernard',
  created_at timestamptz DEFAULT now(),
  decision text CHECK (decision IN ('go', 'revise')),
  decision_comment text,
  decided_at timestamptz,
  acted_on_at timestamptz
);

-- Enable RLS
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous SELECT (HMAC token in URL is the auth)
CREATE POLICY "Allow anonymous select" ON public.review_requests
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous UPDATE (HMAC token in URL is the auth)
CREATE POLICY "Allow anonymous update" ON public.review_requests
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Index on created_at for dashboard ordering / Bernard queries
CREATE INDEX IF NOT EXISTS idx_review_requests_created_at
  ON public.review_requests (created_at DESC);

-- Partial index on pending decisions for fast "what needs Brett's eye" queries
CREATE INDEX IF NOT EXISTS idx_review_requests_pending
  ON public.review_requests (created_at DESC)
  WHERE decision IS NULL;
