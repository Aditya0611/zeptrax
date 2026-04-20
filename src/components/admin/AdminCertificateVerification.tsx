import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ShieldCheck, ShieldX, Search } from "lucide-react";
import { verifyBlock } from "@/lib/blockchain";

interface Certificate {
  id: string;
  certificate_number: string;
  recipient_name: string;
  course_name: string;
  issue_date: string;
  blockchain_hash: string | null;
  previous_hash: string | null;
  block_index: number | null;
  nonce: number | null;
  created_at: string;
}

const AdminCertificateVerification = () => {
  const [certNumber, setCertNumber] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    certificate?: Certificate;
    blockchainValid?: boolean;
  } | null>(null);

  const verifyCertificate = async () => {
    if (!certNumber.trim()) { toast.error("Enter a certificate number"); return; }
    setVerifying(true);
    setResult(null);

    try {
      const { data: cert } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_number", certNumber.trim())
        .maybeSingle();

      if (!cert) {
        setResult({ valid: false });
        // Log verification attempt
        await supabase.from("certificate_verifications").insert({
          certificate_number: certNumber.trim(),
          verification_result: false,
        });
        return;
      }

      let blockchainValid = false;
      if (cert.blockchain_hash && cert.previous_hash && cert.block_index !== null) {
        blockchainValid = await verifyBlock({
          index: cert.block_index,
          timestamp: cert.created_at,
          data: {
            certificateNumber: cert.certificate_number,
            recipientName: cert.recipient_name,
            courseName: cert.course_name,
            issueDate: cert.issue_date,
          },
          previousHash: cert.previous_hash,
          hash: cert.blockchain_hash,
          nonce: cert.nonce || 0,
        });
      }

      setResult({ valid: true, certificate: cert, blockchainValid });

      await supabase.from("certificate_verifications").insert({
        certificate_id: cert.id,
        certificate_number: certNumber.trim(),
        verification_result: true,
      });
    } catch {
      toast.error("Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Certificate Verification</h2>

      <div className="glass-card rounded-xl p-6 max-w-lg">
        <p className="text-muted-foreground text-sm mb-4">Enter a certificate number to verify its authenticity using blockchain hash verification.</p>

        <div className="flex gap-2 mb-6">
          <input
            value={certNumber}
            onChange={(e) => setCertNumber(e.target.value)}
            placeholder="e.g. ZEPT-2026-A1B2C3"
            className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={verifyCertificate}
            disabled={verifying}
            className="px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
          >
            <Search className="w-4 h-4" /> {verifying ? "Verifying..." : "Verify"}
          </button>
        </div>

        {result && (
          <div className={`rounded-xl p-5 ${result.valid ? "bg-green-500/10 border border-green-500/30" : "bg-destructive/10 border border-destructive/30"}`}>
            <div className="flex items-center gap-3 mb-3">
              {result.valid ? (
                <ShieldCheck className="w-8 h-8 text-green-400" />
              ) : (
                <ShieldX className="w-8 h-8 text-destructive" />
              )}
              <div>
                <h3 className="font-display font-bold text-foreground">
                  {result.valid ? "Certificate Verified ✓" : "Certificate Not Found"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {result.valid ? "This certificate is authentic" : "No certificate found with this number"}
                </p>
              </div>
            </div>

            {result.valid && result.certificate && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Recipient:</span><span className="text-foreground">{result.certificate.recipient_name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Course:</span><span className="text-foreground">{result.certificate.course_name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Issue Date:</span><span className="text-foreground">{result.certificate.issue_date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Blockchain:</span>
                  <span className={result.blockchainValid ? "text-green-400" : "text-secondary"}>
                    {result.blockchainValid ? "Hash Verified ✓" : "Hash Pending"}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground font-mono break-all">Hash: {result.certificate.blockchain_hash}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCertificateVerification;
