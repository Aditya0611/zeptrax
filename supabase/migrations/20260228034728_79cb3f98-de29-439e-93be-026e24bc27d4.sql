-- Assign admin role to user mydata193@gmail.com
INSERT INTO public.user_roles (user_id, role) 
VALUES ('451387ae-741d-46e5-8b28-444012c3f658', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;