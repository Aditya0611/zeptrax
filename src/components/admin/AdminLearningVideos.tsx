import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface UserOption {
  user_id: string;
  full_name: string;
  email: string;
}

const AdminLearningVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ user_id: "", title: "", description: "", video_url: "", thumbnail_url: "", duration: "" });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [{ data: videosData }, { data: usersData }] = await Promise.all([
      supabase.from("learning_videos").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);
    setVideos(videosData || []);
    setUsers((usersData as UserOption[]) || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!form.user_id || !form.title || !form.video_url) {
      toast.error("User, title and video URL are required");
      return;
    }
    const { error } = await supabase.from("learning_videos").insert({
      user_id: form.user_id,
      title: form.title,
      description: form.description || null,
      video_url: form.video_url,
      thumbnail_url: form.thumbnail_url || null,
      duration: form.duration || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Video assigned!");
    setForm({ user_id: "", title: "", description: "", video_url: "", thumbnail_url: "", duration: "" });
    setShowForm(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("learning_videos").delete().eq("id", id);
    toast.success("Video removed");
    loadData();
  };

  const getUserName = (userId: string) => {
    const u = users.find(u => u.user_id === userId);
    return u ? `${u.full_name} (${u.email})` : userId;
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Learning Videos</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Assign Video
        </button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-3">
          <select value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground">
            <option value="">Select User</option>
            {users.map(u => <option key={u.user_id} value={u.user_id}>{u.full_name} ({u.email})</option>)}
          </select>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" placeholder="Video Title" />
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" placeholder="Description (optional)" />
          <input value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" placeholder="Video URL (YouTube, etc.)" />
          <input value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" placeholder="Thumbnail URL (optional)" />
          <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground" placeholder="Duration e.g. 15:30 (optional)" />
          <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Assign
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">User</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Title</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">URL</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(v => (
              <tr key={v.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 text-foreground">{getUserName(v.user_id)}</td>
                <td className="py-3 px-2 text-foreground">{v.title}</td>
                <td className="py-3 px-2"><a href={v.video_url} target="_blank" className="text-primary hover:underline text-xs">View</a></td>
                <td className="py-3 px-2 text-muted-foreground text-xs">{new Date(v.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-2">
                  <button onClick={() => handleDelete(v.id)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {videos.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No videos assigned yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLearningVideos;
