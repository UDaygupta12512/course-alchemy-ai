-- Create trigger for automatic profile creation when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update profiles table RLS policies to allow the trigger to insert
CREATE POLICY "Allow service role to insert profiles" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (true);