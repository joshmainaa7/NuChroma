-- Update the trigger to read all profile fields from user metadata
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
end;
$$ language plpgsql security definer;
