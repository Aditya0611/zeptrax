import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Shield, ExternalLink, Copy, Eye, Pencil, Check, X } from "lucide-react";
import { mineBlock, generateCertificateNumber } from "@/lib/blockchain";
import CertificateTemplate from "@/components/CertificateTemplate";

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
  metadata: any;
  created_at: string;
}

const AdminCertificates = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [certType, setCertType] = useState<"internship" | "training">("internship");
  const [mining, setMining] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

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
        metadata: { type: certType },
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

  const copyLink = (certNumber: string) => {
    const url = `${window.location.origin}/certificate/${certNumber}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Recipient name" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course name" className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Certificate Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setCertType("internship")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${certType === "internship" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                Internship Certificate
              </button>
              <button
                onClick={() => setCertType("training")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${certType === "training" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                Training Certificate
              </button>
            </div>
          </div>
          <button onClick={issueCertificate} disabled={mining} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
            <Shield className="w-4 h-4" /> {mining ? "Mining block..." : "Issue with Blockchain"}
          </button>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-auto" onClick={() => setPreviewCert(null)}>
          <div className="max-w-[850px]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex justify-end gap-2">
              <button onClick={() => copyLink(previewCert.certificate_number)} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs flex items-center gap-1">
                <Copy className="w-3 h-3" /> Copy Share Link
              </button>
              <a href={`/certificate/${previewCert.certificate_number}`} target="_blank" className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Open Full Page
              </a>
              <button onClick={() => setPreviewCert(null)} className="px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-xs">
                Close
              </button>
            </div>
            <div className="overflow-auto rounded-lg shadow-2xl">
              <CertificateTemplate
                recipientName={previewCert.recipient_name}
                courseName={previewCert.course_name}
                certificateNumber={previewCert.certificate_number}
                issueDate={previewCert.issue_date}
                certificateType={previewCert.metadata?.type || "training"}
                blockchainHash={previewCert.blockchain_hash}
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Certificate #</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Recipient</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Course</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Blockchain Hash</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c) => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 font-mono text-xs text-primary">{c.certificate_number}</td>
                <td className="py-3 px-2 text-foreground">{c.recipient_name}</td>
                <td className="py-3 px-2 text-foreground">{c.course_name}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${c.metadata?.type === "internship" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                    {c.metadata?.type === "internship" ? "Internship" : "Training"}
                  </span>
                </td>
                <td className="py-3 px-2 font-mono text-xs text-muted-foreground truncate max-w-[150px]">{c.blockchain_hash || "—"}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPreviewCert(c)} className="p-1.5 rounded hover:bg-muted text-primary" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => copyLink(c.certificate_number)} className="p-1.5 rounded hover:bg-muted text-primary" title="Copy share link">
                      <Copy className="w-4 h-4" />
                    </button>
                    <a href={`/certificate/${c.certificate_number}`} target="_blank" className="p-1.5 rounded hover:bg-muted text-primary" title="Open certificate">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
            {certs.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No certificates issued yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCertificates;
