-- Add preview_html column to review_requests.
-- Purpose: pre-rendered HTML drafts (email body, etc.) that the /preview/[id]
-- route iframes so Brett can see the artifact exactly as a subscriber would.
--
-- context_md remains the channel for Bernard's text-only memos + the
-- TCP_DISPATCH sentinel. preview_html is purely optional, only populated by
-- Scribe / Vale / Devan when they hand off a visually-previewable artifact.
--
-- Run this in the Supabase SQL Editor for project tpihpenmsiojzznpcmcr.

ALTER TABLE public.review_requests
  ADD COLUMN IF NOT EXISTS preview_html text;

-- No index, no RLS change — anon SELECT/UPDATE policies already cover the
-- column. Token-gated read is enforced at the application layer.
