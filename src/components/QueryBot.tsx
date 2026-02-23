import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe_placeholder/formResponse";

const QueryBot = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.query) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
      // Submit to Google Sheets via a public Google Apps Script endpoint
      // The user should deploy a Google Apps Script web app linked to their sheet
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbz_PLACEHOLDER/exec";

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "query",
          name: form.name,
          email: form.email,
          query: form.query,
          timestamp: new Date().toISOString(),
        }),
      });

      toast.success("Query submitted successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", query: "" });
      setOpen(false);
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-cta flex items-center justify-center glow-blue hover:scale-110 transition-transform shadow-lg"
      >
        {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 glass-card rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-cta p-4">
              <h3 className="font-display font-bold text-primary-foreground text-sm">Zeptrax AI Assistant</h3>
              <p className="text-primary-foreground/70 text-xs">Submit your query below</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea
                placeholder="Your Query..."
                rows={3}
                value={form.query}
                onChange={(e) => setForm({ ...form, query: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-gradient-cta text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Submit Query"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QueryBot;
