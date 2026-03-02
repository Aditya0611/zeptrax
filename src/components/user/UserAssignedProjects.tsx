import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Download, ExternalLink } from "lucide-react";

interface AssignedProject {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  status: string | null;
  created_at: string;
}

const UserAssignedProjects = ({ userId }: { userId: string }) => {
  const [projects, setProjects] = useState<AssignedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("assigned_projects")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false });
      setProjects((data as AssignedProject[]) || []);
      setLoading(false);
    };
    fetch();
  }, [userId]);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Assigned Projects</h2>
      {projects.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No projects assigned yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="glass-card rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
              {p.description && <p className="text-sm text-muted-foreground mb-3">{p.description}</p>}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span>Assigned: {new Date(p.created_at).toLocaleDateString()}</span>
              </div>
              {p.file_url && (
                <a href={p.file_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/15 text-primary text-sm font-medium hover:bg-primary/25 transition-colors">
                  <Download className="w-4 h-4" />
                  {p.file_name || "Download File"}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAssignedProjects;
