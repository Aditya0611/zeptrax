
-- Table to store email OTPs for registration verification
CREATE TABLE public.email_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '10 minutes'),
  verified boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- No RLS needed - accessed only via edge functions with service role
ALTER TABLE public.email_otps ENABLE ROW LEVEL SECURITY;

-- Only service role (edge functions) can access this table
-- No public policies - all access through edge functions

-- Add generated_password column to registrations (admin sees this after approval)
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS generated_password text;

-- Index for quick OTP lookups
CREATE INDEX idx_email_otps_email ON public.email_otps (email, otp_code);

-- Auto-cleanup expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.email_otps WHERE expires_at < now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER cleanup_otps_on_insert
AFTER INSERT ON public.email_otps
FOR EACH STATEMENT
EXECUTE FUNCTION public.cleanup_expired_otps();
