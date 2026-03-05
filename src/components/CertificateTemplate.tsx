import { forwardRef } from "react";
import zeptraxLogo from "@/assets/zeptrax-logo.png";

interface CertificateTemplateProps {
  recipientName: string;
  courseName: string;
  certificateNumber: string;
  issueDate: string;
  certificateType: "internship" | "training";
  blockchainHash?: string | null;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ recipientName, courseName, certificateNumber, issueDate, certificateType, blockchainHash }, ref) => {
    const title = certificateType === "internship"
      ? "Certificate of Internship Completion"
      : "Certificate of Training Completion";

    return (
      <div
        ref={ref}
        className="w-[800px] bg-white text-gray-900 p-0 font-sans"
        style={{ fontFamily: "'Inter', 'Georgia', serif" }}
      >
        {/* Outer decorative border */}
        <div className="border-[3px] border-amber-600 m-3 p-1">
          <div className="border-[1px] border-amber-400 p-8">
            
            {/* Header */}
            <div className="text-center mb-6">
              <img src={zeptraxLogo} alt="Zeptrax AI" className="h-14 mx-auto mb-2" />
              <h1 className="text-xl font-bold text-gray-800 tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                ZEPTRAX AI
              </h1>
              <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                Innovating the Future with Artificial Intelligence
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-24 bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="h-[1px] w-24 bg-amber-500" />
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-700" style={{ fontFamily: "'Georgia', serif" }}>
                {title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">This is to certify that</p>
            </div>

            {/* Recipient Name */}
            <div className="text-center mb-4">
              <p
                className="text-3xl font-bold text-blue-800 italic"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {recipientName}
              </p>
              <div className="w-64 h-[1px] bg-gray-400 mx-auto mt-2" />
            </div>

            {/* Description */}
            <div className="text-center mb-6 max-w-lg mx-auto">
              <p className="text-sm text-gray-700 leading-relaxed">
                has successfully completed the
              </p>
              <p className="text-lg font-bold text-gray-900 uppercase tracking-wide mt-2">
                {courseName}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {certificateType === "internship"
                  ? "internship program and demonstrated outstanding performance and dedication."
                  : "training program and met all the requirements for certification."}
              </p>
            </div>

            {/* Date & Certificate ID */}
            <div className="text-center text-xs text-gray-500 mb-6 space-y-1">
              <p><span className="font-semibold">Date:</span> {issueDate}</p>
              <p><span className="font-semibold">Certificate ID:</span> {certificateNumber}</p>
              {blockchainHash && (
                <p className="font-mono text-[10px] text-gray-400 break-all max-w-md mx-auto">
                  Blockchain Hash: {blockchainHash}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-gray-300" />
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-end px-8">
              {/* Founder - Left */}
              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                  P Sharma
                </p>
                <div className="w-32 h-[1px] bg-gray-400 mx-auto" />
                <p className="text-xs text-gray-600 mt-1 font-semibold">P Sharma</p>
                <p className="text-[10px] text-gray-500">Founder, Zeptrax AI</p>
              </div>

              {/* Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-600 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-amber-400 flex items-center justify-center">
                    <span className="text-[8px] text-amber-700 font-bold text-center leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      ZEPTRAX<br/>AI
                    </span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 mt-1">Verified</p>
              </div>

              {/* Program Director - Right */}
              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                  Zeptrax AI
                </p>
                <div className="w-32 h-[1px] bg-gray-400 mx-auto" />
                <p className="text-xs text-gray-600 mt-1 font-semibold">Program Director</p>
                <p className="text-[10px] text-gray-500">Zeptrax AI</p>
              </div>
            </div>

            {/* Footer verification link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200">
              <p className="text-[10px] text-gray-400">
                Verify this certificate at: {window.location.origin}/certificate/{certificateNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";
export default CertificateTemplate;
