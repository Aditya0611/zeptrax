import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface EmailLog {
  id: string;
  recipient_email: string;
  subject: string;
  status: string | null;
  error_message: string | null;
  created_at: string;
}

const AdminEmailLogs = () => {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("email_logs").select("*").order("created_at", { ascending: false });
      setLogs((data as EmailLog[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Email Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Recipient</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Subject</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Error</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 text-foreground">{l.recipient_email}</td>
                <td className="py-3 px-2 text-foreground">{l.subject}</td>
                <td className="py-3 px-2"><span className={`px-2 py-1 rounded text-xs font-medium ${l.status === "sent" ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"}`}>{l.status || "sent"}</span></td>
                <td className="py-3 px-2 text-muted-foreground text-xs">{l.error_message || "—"}</td>
                <td className="py-3 px-2 text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {logs.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No email logs yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEmailLogs;
