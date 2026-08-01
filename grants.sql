-- Run this in Supabase Dashboard → SQL Editor
-- Grants table-level permissions to anon and authenticated roles

-- Profiles
grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;

-- Posts
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;

-- Comments
grant select on public.comments to anon, authenticated;
grant insert, delete on public.comments to authenticated;

-- Conversations
grant select on public.conversations to authenticated;
grant insert on public.conversations to authenticated;

-- Messages
grant select, insert on public.messages to authenticated;

-- Briefs
grant select, insert, update on public.briefs to authenticated;

-- Contracts
grant select, insert, update on public.contracts to authenticated;

-- Milestones
grant select, insert, update, delete on public.milestones to authenticated;

-- Saves
grant select, insert, delete on public.saves to authenticated;

-- Follows
grant select on public.follows to anon, authenticated;
grant insert, delete on public.follows to authenticated;
