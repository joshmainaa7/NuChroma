-- NuChroma database schema
-- Run this in Supabase Dashboard → SQL Editor → New Query

-- ============================================================
-- PROFILES — extends auth.users with NuChroma-specific fields
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  craft text,
  location text,
  rate_type text check (rate_type in ('daily', 'project', 'hourly')),
  rate_amount integer default 0,
  currency text default 'KES',
  is_pro boolean default false,
  is_open_to_work boolean default false,
  chip_count integer default 3,
  account_type text check (account_type in ('creative', 'client', 'agency')) default 'creative',
  agency_name text,
  agency_size text,
  views_count integer default 0,
  saves_count integer default 0,
  projects_count integer default 0,
  search_rank integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- POSTS — feed content
-- ============================================================
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text,
  body text,
  media_url text,
  media_type text check (media_type in ('image', 'video', 'audio', 'embed')),
  likes_count integer default 0,
  comments_count integer default 0,
  saves_count integer default 0,
  created_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Posts are viewable by everyone"
  on public.posts for select using (true);

create policy "Authenticated users can create posts"
  on public.posts for insert with check (auth.uid() = author_id);

create policy "Users can update own posts"
  on public.posts for update using (auth.uid() = author_id);

create policy "Users can delete own posts"
  on public.posts for delete using (auth.uid() = author_id);


-- ============================================================
-- COMMENTS
-- ============================================================
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  body text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Authenticated users can comment"
  on public.comments for insert with check (auth.uid() = author_id);

create policy "Users can delete own comments"
  on public.comments for delete using (auth.uid() = author_id);


-- ============================================================
-- CONVERSATIONS — DM threads
-- ============================================================
create table public.conversations (
  id uuid default gen_random_uuid() primary key,
  participant_1 uuid references public.profiles(id) on delete cascade not null,
  participant_2 uuid references public.profiles(id) on delete cascade not null,
  last_message_at timestamptz default now(),
  created_at timestamptz default now(),
  unique (participant_1, participant_2)
);

alter table public.conversations enable row level security;

create policy "Users can view own conversations"
  on public.conversations for select
  using (auth.uid() = participant_1 or auth.uid() = participant_2);

create policy "Authenticated users can start conversations"
  on public.conversations for insert
  with check (auth.uid() = participant_1 or auth.uid() = participant_2);


-- ============================================================
-- MESSAGES — individual messages in conversations
-- ============================================================
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  body text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Users can view messages in own conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and (c.participant_1 = auth.uid() or c.participant_2 = auth.uid())
    )
  );

create policy "Users can send messages in own conversations"
  on public.messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and (c.participant_1 = auth.uid() or c.participant_2 = auth.uid())
    )
  );


-- ============================================================
-- BRIEFS — project briefs attached to conversations
-- ============================================================
create table public.briefs (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  deliverables text,
  budget integer default 0,
  currency text default 'KES',
  deadline date,
  status text check (status in ('pending', 'accepted', 'declined', 'expired')) default 'pending',
  created_at timestamptz default now()
);

alter table public.briefs enable row level security;

create policy "Users can view own briefs"
  on public.briefs for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can create briefs"
  on public.briefs for insert
  with check (auth.uid() = sender_id);

create policy "Recipients can update brief status"
  on public.briefs for update
  using (auth.uid() = recipient_id);


-- ============================================================
-- CONTRACTS — formal agreements
-- ============================================================
create table public.contracts (
  id uuid default gen_random_uuid() primary key,
  brief_id uuid references public.briefs(id),
  client_id uuid references public.profiles(id) on delete cascade not null,
  creative_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  total_amount integer default 0,
  currency text default 'KES',
  fee_percent numeric(4,2) default 8.00,
  status text check (status in ('draft', 'active', 'completed', 'cancelled', 'disputed')) default 'draft',
  created_at timestamptz default now(),
  completed_at timestamptz
);

alter table public.contracts enable row level security;

create policy "Users can view own contracts"
  on public.contracts for select
  using (auth.uid() = client_id or auth.uid() = creative_id);

create policy "Clients can create contracts"
  on public.contracts for insert
  with check (auth.uid() = client_id);

create policy "Contract parties can update"
  on public.contracts for update
  using (auth.uid() = client_id or auth.uid() = creative_id);


-- ============================================================
-- MILESTONES — contract payment milestones
-- ============================================================
create table public.milestones (
  id uuid default gen_random_uuid() primary key,
  contract_id uuid references public.contracts(id) on delete cascade not null,
  title text not null,
  description text,
  amount integer default 0,
  sort_order integer default 0,
  status text check (status in ('pending', 'in_progress', 'submitted', 'approved', 'paid')) default 'pending',
  due_date date,
  completed_at timestamptz
);

alter table public.milestones enable row level security;

create policy "Contract parties can view milestones"
  on public.milestones for select
  using (
    exists (
      select 1 from public.contracts c
      where c.id = contract_id
      and (c.client_id = auth.uid() or c.creative_id = auth.uid())
    )
  );

create policy "Contract parties can manage milestones"
  on public.milestones for all
  using (
    exists (
      select 1 from public.contracts c
      where c.id = contract_id
      and (c.client_id = auth.uid() or c.creative_id = auth.uid())
    )
  );


-- ============================================================
-- SAVES — users saving profiles/posts (honest signal)
-- ============================================================
create table public.saves (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_type text check (target_type in ('profile', 'post')) not null,
  target_id uuid not null,
  created_at timestamptz default now(),
  unique (user_id, target_type, target_id)
);

alter table public.saves enable row level security;

create policy "Users can view own saves"
  on public.saves for select using (auth.uid() = user_id);

create policy "Users can save"
  on public.saves for insert with check (auth.uid() = user_id);

create policy "Users can unsave"
  on public.saves for delete using (auth.uid() = user_id);


-- ============================================================
-- FOLLOWS
-- ============================================================
create table public.follows (
  id uuid default gen_random_uuid() primary key,
  follower_id uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (follower_id, following_id)
);

alter table public.follows enable row level security;

create policy "Follows are viewable by everyone"
  on public.follows for select using (true);

create policy "Users can follow"
  on public.follows for insert with check (auth.uid() = follower_id);

create policy "Users can unfollow"
  on public.follows for delete using (auth.uid() = follower_id);


-- ============================================================
-- UPDATED_AT trigger
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();


-- ============================================================
-- INDEXES for performance
-- ============================================================
create index idx_posts_author on public.posts(author_id);
create index idx_posts_created on public.posts(created_at desc);
create index idx_comments_post on public.comments(post_id);
create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_milestones_contract on public.milestones(contract_id, sort_order);
create index idx_profiles_craft on public.profiles(craft);
create index idx_profiles_location on public.profiles(location);
create index idx_profiles_open on public.profiles(is_open_to_work) where is_open_to_work = true;
create index idx_saves_target on public.saves(target_type, target_id);
create index idx_follows_following on public.follows(following_id);
