-- Update profiles table RLS policies to allow the trigger to insert
CREATE POLICY "Allow service role to insert profiles" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (true);