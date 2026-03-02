import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Video, Play } from "lucide-react";

interface LearningVideo {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  status: string | null;
  created_at: string;
}

const UserLearningVideos = ({ userId }: { userId: string }) => {
  const [videos, setVideos] = useState<LearningVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("learning_videos")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false });
      setVideos((data as LearningVideo[]) || []);
      setLoading(false);
    };
    fetch();
  }, [userId]);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Learning Videos</h2>
      {videos.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No learning videos assigned yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div key={v.id} className="glass-card rounded-xl overflow-hidden">
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                {v.thumbnail_url ? (
                  <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
                ) : (
                  <Video className="w-10 h-10 text-muted-foreground" />
                )}
                <a href={v.video_url} target="_blank" rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </div>
                </a>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                {v.description && <p className="text-sm text-muted-foreground mb-2">{v.description}</p>}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {v.duration && <span>{v.duration}</span>}
                  <span>Added: {new Date(v.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLearningVideos;
