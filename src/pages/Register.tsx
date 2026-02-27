import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryBot from "@/components/QueryBot";

const Register = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    domain: "",
    experience: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

  const domains = [
    "Banking & Finance", "Retail & E-commerce", "Education & EdTech",
    "Healthcare & Diagnostics", "Logistics & Supply Chain", "HR & Recruitment",
    "Real Estate", "Marketing & Advertising", "Agriculture",
    "Manufacturing", "Legal & Compliance", "Gaming & Entertainment", "Other",
  ];

  const sendOtp = async () => {
    if (!form.phone || form.phone.length < 10) {
      toast.error("Enter a valid phone number");
      return;
    }
    // Simulated OTP - in production, integrate Firebase Phone Auth
    setOtpSent(true);
    toast.success("OTP sent to your phone number (demo: use 123456)");
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      setPhoneVerified(true);
      toast.success("Phone verified successfully!");
    } else {
      toast.error("Invalid OTP. Demo OTP is 123456");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.domain) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!phoneVerified) {
      toast.error("Please verify your phone number first");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.from("registrations").insert({
        user_id: user?.id || null,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        phone_verified: phoneVerified,
        domain: form.domain,
        experience: form.experience || null,
        message: form.message || null,
      });

      if (error) throw error;
      toast.success("Registration successful! We'll contact you shortly.");
      setForm({ fullName: "", email: "", phone: "", domain: "", experience: "", message: "" });
      setPhoneVerified(false);
      setOtpSent(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                  Register for <span className="text-gradient-gold">AI Training</span>
                </h1>
                <p className="text-muted-foreground">
                  Join the Special AI Program for all domain professionals
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number * {phoneVerified && <span className="text-green-400">✓ Verified</span>}</label>
                  <div className="flex gap-2">
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      disabled={phoneVerified}
                      className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="+91 XXXXX XXXXX" />
                    {!phoneVerified && !otpSent && (
                      <button type="button" onClick={sendOtp} className="px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap hover:bg-primary/90">
                        Send OTP
                      </button>
                    )}
                  </div>
                  {otpSent && !phoneVerified && (
                    <div className="flex gap-2 mt-2">
                      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6}
                        className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter 6-digit OTP" />
                      <button type="button" onClick={verifyOtp} className="px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap hover:bg-primary/90">
                        Verify
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Domain of Interest *</label>
                  <select value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select your domain</option>
                    {domains.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Experience Level</label>
                  <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select experience</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Additional Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Any specific topics or questions..." />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-lg bg-gradient-cta text-primary-foreground font-display font-semibold text-lg glow-blue hover:scale-[1.02] transition-transform disabled:opacity-50">
                  {loading ? "Registering..." : "Register Now"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <QueryBot />
    </div>
  );
};

export default Register;
