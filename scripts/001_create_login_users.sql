-- Create login_users table to store user credentials
CREATE TABLE IF NOT EXISTS public.login_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  country_code TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS so anyone can insert (this is a public login form)
ALTER TABLE public.login_users DISABLE ROW LEVEL SECURITY;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_login_users_phone ON public.login_users(phone, country_code);
