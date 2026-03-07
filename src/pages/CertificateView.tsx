import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { verifyBlock } from "@/lib/blockchain";
import { ShieldCheck, ShieldX, Download, FileDown } from "lucide-react";
import CertificateTemplate from "@/components/CertificateTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const CertificateView = () => {
  const { certNumber } = useParams<{ certNumber: string }>();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blockchainValid, setBlockchainValid] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!certNumber) return;
      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_number", certNumber)
        .maybeSingle();

      if (data) {
        setCert(data);
        if (data.blockchain_hash && data.previous_hash && data.block_index !== null) {
          const valid = await verifyBlock({
            index: data.block_index,
            timestamp: data.created_at,
            data: {
              certificateNumber: data.certificate_number,
              recipientName: data.recipient_name,
              courseName: data.course_name,
              issueDate: data.issue_date,
            },
            previousHash: data.previous_hash,
            hash: data.blockchain_hash,
            nonce: data.nonce || 0,
          });
          setBlockchainValid(valid);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [certNumber]);

  const certRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${cert?.certificate_number || "certificate"}.pdf`);
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h1>
          <p className="text-gray-600">No certificate found with number: {certNumber}</p>
        </div>
      </div>
    );
  }

  const certType = (cert.metadata as any)?.type || "training";

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Verification badge */}
      <div className="max-w-3xl mx-auto mb-4 px-4">
        <div className={`flex items-center gap-3 p-3 rounded-lg ${blockchainValid ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
          {blockchainValid ? (
            <ShieldCheck className="w-6 h-6 text-green-600" />
          ) : (
            <ShieldX className="w-6 h-6 text-yellow-600" />
          )}
          <div>
            <p className={`font-semibold text-sm ${blockchainValid ? "text-green-800" : "text-yellow-800"}`}>
              {blockchainValid ? "Blockchain Verified ✓" : "Verification Pending"}
            </p>
            <p className="text-xs text-gray-500">Certificate ID: {cert.certificate_number}</p>
          </div>
          <button
            onClick={handlePrint}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 print:hidden"
          >
            <Download className="w-4 h-4" /> Print / Download
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div className="flex justify-center overflow-x-auto px-4 print:px-0">
        <CertificateTemplate
          recipientName={cert.recipient_name}
          courseName={cert.course_name}
          certificateNumber={cert.certificate_number}
          issueDate={cert.issue_date}
          certificateType={certType}
          blockchainHash={cert.blockchain_hash}
        />
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default CertificateView;
