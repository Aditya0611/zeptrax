
-- Table for admin-assigned projects to users
CREATE TABLE public.assigned_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  file_url text,
  file_name text,
  status text DEFAULT 'active',
  assigned_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.assigned_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage assigned projects"
ON public.assigned_projects FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own assigned projects"
ON public.assigned_projects FOR SELECT
USING (auth.uid() = user_id);

CREATE TRIGGER update_assigned_projects_updated_at
BEFORE UPDATE ON public.assigned_projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table for learning videos assigned to users
CREATE TABLE public.learning_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  duration text,
  status text DEFAULT 'active',
  assigned_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.learning_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage learning videos"
ON public.learning_videos FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own learning videos"
ON public.learning_videos FOR SELECT
USING (auth.uid() = user_id);

CREATE TRIGGER update_learning_videos_updated_at
BEFORE UPDATE ON public.learning_videos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
