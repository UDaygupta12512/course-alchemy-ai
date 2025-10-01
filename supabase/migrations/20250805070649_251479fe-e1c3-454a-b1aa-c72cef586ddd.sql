-- Grant necessary permissions to auth admin for the profiles table
GRANT INSERT ON public.profiles TO supabase_auth_admin;
GRANT UPDATE ON public.profiles TO supabase_auth_admin;
GRANT SELECT ON public.profiles TO supabase_auth_admin;

-- Also grant usage on the sequence if it exists
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO supabase_auth_admin;