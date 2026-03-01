import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Eye, EyeOff, Copy, CheckCircle, XCircle, Clock } from "lucide-react";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  domain: string;
  experience: string | null;
  status: string | null;
  generated_password: string | null;
  created_at: string;
}

const AdminRecords = () => {
  const { session } = useAuth();
  const [records, setRecords] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      setRecords((data as Registration[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const approveRegistration = async (id: string) => {
    setApproving(id);
    try {
      const { data, error } = await supabase.functions.invoke("approve-registration", {
        body: { registrationId: id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`Approved! Credentials: ${data.email} / ${data.password}`);
      setRecords((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "approved", generated_password: data.password } : r
        )
      );
    } catch (err: any) {
      toast.error(err.message || "Approval failed");
    } finally {
      setApproving(null);
    }
  };

  const rejectRegistration = async (id: string) => {
    await supabase.from("registrations").update({ status: "rejected" }).eq("id", id);
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)));
    toast.success("Registration rejected");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
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
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Credentials</th>
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
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    r.status === "approved" ? "bg-green-500/20 text-green-400" :
                    r.status === "rejected" ? "bg-destructive/20 text-destructive" :
                    "bg-secondary/20 text-secondary"
                  }`}>
                    {r.status === "approved" ? <CheckCircle className="w-3 h-3" /> :
                     r.status === "rejected" ? <XCircle className="w-3 h-3" /> :
                     <Clock className="w-3 h-3" />}
                    {r.status || "pending"}
                  </span>
                </td>
                <td className="py-3 px-2">
                  {r.status === "approved" && r.generated_password ? (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">ID:</span> {r.email}
                        <button onClick={() => copyToClipboard(r.email)} className="ml-1 text-primary hover:text-primary/80">
                          <Copy className="w-3 h-3 inline" />
                        </button>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="font-medium">PW:</span>
                        <span>{showPassword[r.id] ? r.generated_password : "••••••••"}</span>
                        <button onClick={() => setShowPassword(p => ({ ...p, [r.id]: !p[r.id] }))}
                          className="text-primary hover:text-primary/80">
                          {showPassword[r.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                        <button onClick={() => copyToClipboard(r.generated_password!)} className="text-primary hover:text-primary/80">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="py-3 px-2 flex gap-2">
                  {r.status !== "approved" && (
                    <button
                      onClick={() => approveRegistration(r.id)}
                      disabled={approving === r.id}
                      className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50"
                    >
                      {approving === r.id ? "Approving..." : "Approve"}
                    </button>
                  )}
                  {r.status !== "rejected" && r.status !== "approved" && (
                    <button
                      onClick={() => rejectRegistration(r.id)}
                      className="text-xs px-2 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-muted-foreground">No records yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecords;
