-- Update the trigger to read all profile fields from user metadata
-- Drop and recreate to ensure clean state
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, account_type, agency_name, agency_size, craft)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.email),
    coalesce(new.raw_user_meta_data->>'account_type', 'creative'),
    new.raw_user_meta_data->>'agency_name',
    new.raw_user_meta_data->>'agency_size',
    new.raw_user_meta_data->>'craft'
  );
  return new;
exception when others then
  raise log 'handle_new_user failed: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
