import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface OnboardingStep {
  id: string;
  step: string;
  status: string | null;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
}

const AdminOnboarding = () => {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("onboarding").select("*").order("created_at", { ascending: false });
      setSteps((data as OnboardingStep[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Onboarding</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Step</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Completed</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-2 text-foreground">{s.step}</td>
                <td className="py-3 px-2"><span className={`px-2 py-1 rounded text-xs font-medium ${s.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-secondary/20 text-secondary"}`}>{s.status || "pending"}</span></td>
                <td className="py-3 px-2 text-muted-foreground">{s.completed_at ? new Date(s.completed_at).toLocaleDateString() : "—"}</td>
                <td className="py-3 px-2 text-muted-foreground">{s.notes || "—"}</td>
              </tr>
            ))}
            {steps.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">No onboarding steps yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOnboarding;
