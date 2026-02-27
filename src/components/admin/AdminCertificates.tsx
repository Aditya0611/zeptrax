import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Shield } from "lucide-react";
import { mineBlock, generateCertificateNumber } from "@/lib/blockchain";

interface Certificate {
  id: string;
  certificate_number: string;
  recipient_name: string;
  course_name: string;
  issue_date: string;
  blockchain_hash: string | null;
  previous_hash: string | null;
  block_index: number | null;
  status: string | null;
  created_at: string;
}

const AdminCertificates = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [mining, setMining] = useState(false);

  const fetchCerts = async () => {
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    setCerts((data as Certificate[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchCerts(); }, []);

  const issueCertificate = async () => {
    if (!recipientName || !courseName) { toast.error("Fill all fields"); return; }
    setMining(true);

    try {
      const certNumber = generateCertificateNumber();
      const lastCert = certs[0];
      const previousHash = lastCert?.blockchain_hash || "0".repeat(64);
      const blockIndex = (lastCert?.block_index || 0) + 1;

      const block = await mineBlock(blockIndex, {
        certificateNumber: certNumber,
        recipientName,
        courseName,
        issueDate: new Date().toISOString().split("T")[0],
      }, previousHash);

      const { error } = await supabase.from("certificates").insert({
        certificate_number: certNumber,
        recipient_name: recipientName,
        course_name: courseName,
        blockchain_hash: block.hash,
        previous_hash: previousHash,
        block_index: blockIndex,
        nonce: block.nonce,
      });

      if (error) throw error;
      toast.success(`Certificate ${certNumber} issued with blockchain hash!`);
      setRecipientName(""); setCourseName(""); setShowForm(false);
      fetchCerts();
    } catch (err: any) {
      toast.error(err.message || "Failed to issue certificate");
    } finally {
      setMining(false);
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Certificates</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Issue Certificate
        </button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-4 mb-6 space-y-3">
          <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Recipient name" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course name" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <button onClick={issueCertificate} disabled={mining} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
            <Shield className="w-4 h-4" /> {mining ? "Mining block..." : "Issue with Blockchain"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Certificate #</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Recipient</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Course</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Blockchain Hash</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c) => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 font-mono text-xs text-primary">{c.certificate_number}</td>
                <td className="py-3 px-2 text-foreground">{c.recipient_name}</td>
                <td className="py-3 px-2 text-foreground">{c.course_name}</td>
                <td className="py-3 px-2 font-mono text-xs text-muted-foreground truncate max-w-[200px]">{c.blockchain_hash || "—"}</td>
                <td className="py-3 px-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">{c.status || "active"}</span>
                </td>
              </tr>
            ))}
            {certs.length === 0 && (
              <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No certificates issued yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCertificates;
