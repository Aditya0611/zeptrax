import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LogIn, ArrowLeft, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Logged in successfully!");
      // Check if user is admin to route correctly
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id || "")
        .eq("role", "admin")
        .maybeSingle();
      navigate(roleData ? "/admin" : "/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Password reset link sent to your email!");
    } catch (err: any) {
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="glass-card rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  {isForgotPassword ? <KeyRound className="w-8 h-8 text-primary" /> : <LogIn className="w-8 h-8 text-primary" />}
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                  {isForgotPassword ? "Reset Password" : "Login"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isForgotPassword
                    ? "Enter your email to receive a password reset link"
                    : "Sign in with the credentials provided by admin"}
                </p>
              </div>

              {isForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-gradient-cta text-primary-foreground font-semibold glow-blue hover:scale-[1.02] transition-transform disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-gradient-cta text-primary-foreground font-semibold glow-blue hover:scale-[1.02] transition-transform disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              )}

              <div className="text-center mt-6 space-y-2">
                <button
                  onClick={() => setIsForgotPassword(!isForgotPassword)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {isForgotPassword ? "Back to Login" : "Forgot Password?"}
                </button>
                {!isForgotPassword && (
                  <p className="text-xs text-muted-foreground">
                    Don't have credentials? <Link to="/register" className="text-primary hover:underline">Register first</Link>, then wait for admin approval.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
