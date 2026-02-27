import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Award, FileText, Star } from "lucide-react";

const AdminOverview = () => {
  const [stats, setStats] = useState({ registrations: 0, certificates: 0, documents: 0, reviews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [reg, cert, doc, rev] = await Promise.all([
        supabase.from("registrations").select("id", { count: "exact", head: true }),
        supabase.from("certificates").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        registrations: reg.count || 0,
        certificates: cert.count || 0,
        documents: doc.count || 0,
        reviews: rev.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Registrations", value: stats.registrations, icon: Users, color: "text-primary" },
    { label: "Certificates", value: stats.certificates, icon: Award, color: "text-secondary" },
    { label: "Documents", value: stats.documents, icon: FileText, color: "text-accent" },
    { label: "Reviews", value: stats.reviews, icon: Star, color: "text-secondary" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <p className="text-3xl font-display font-bold text-foreground">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
