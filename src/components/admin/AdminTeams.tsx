import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Team {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

const AdminTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*").order("created_at", { ascending: false });
    setTeams((data as Team[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchTeams(); }, []);

  const addTeam = async () => {
    if (!name) { toast.error("Team name required"); return; }
    const { error } = await supabase.from("teams").insert({ name, description: description || null });
    if (error) { toast.error(error.message); return; }
    toast.success("Team created");
    setName(""); setDescription(""); setShowForm(false);
    fetchTeams();
  };

  const deleteTeam = async (id: string) => {
    await supabase.from("teams").delete().eq("id", id);
    setTeams((prev) => prev.filter((t) => t.id !== id));
    toast.success("Team deleted");
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Teams</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add Team
        </button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-4 mb-6 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Team name" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <button onClick={addTeam} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Create</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((t) => (
          <div key={t.id} className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-1">{t.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{t.description || "No description"}</p>
            <button onClick={() => deleteTeam(t.id)} className="text-xs text-destructive hover:underline">Delete</button>
          </div>
        ))}
        {teams.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No teams yet</p>}
      </div>
    </div>
  );
};

export default AdminTeams;
