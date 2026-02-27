import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_type: string | null;
  status: string | null;
  created_at: string;
}

const AdminDocuments = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
      setDocs((data as Document[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Documents</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Title</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Description</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 text-foreground">{d.title}</td>
                <td className="py-3 px-2 text-muted-foreground">{d.description || "—"}</td>
                <td className="py-3 px-2 text-foreground">{d.file_type || "—"}</td>
                <td className="py-3 px-2"><span className="px-2 py-1 rounded text-xs font-medium bg-secondary/20 text-secondary">{d.status || "pending"}</span></td>
                <td className="py-3 px-2 text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {docs.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No documents yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDocuments;
