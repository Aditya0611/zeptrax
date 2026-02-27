import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  domain: string;
  experience: string | null;
  status: string | null;
  phone_verified: boolean | null;
  created_at: string;
}

const AdminRecords = () => {
  const [records, setRecords] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
      setRecords((data as Registration[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("registrations").update({ status }).eq("id", id);
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Registration Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Phone</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Domain</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 text-foreground">{r.full_name}</td>
                <td className="py-3 px-2 text-foreground">{r.email}</td>
                <td className="py-3 px-2 text-foreground">{r.phone}</td>
                <td className="py-3 px-2 text-foreground">{r.domain}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    r.status === "approved" ? "bg-green-500/20 text-green-400" :
                    r.status === "rejected" ? "bg-destructive/20 text-destructive" :
                    "bg-secondary/20 text-secondary"
                  }`}>
                    {r.status || "pending"}
                  </span>
                </td>
                <td className="py-3 px-2 flex gap-2">
                  <button onClick={() => updateStatus(r.id, "approved")} className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30">
                    Approve
                  </button>
                  <button onClick={() => updateStatus(r.id, "rejected")} className="text-xs px-2 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No records yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecords;
