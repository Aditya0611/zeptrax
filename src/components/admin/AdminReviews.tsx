import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number | null;
  comment: string | null;
  status: string | null;
  created_at: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      setReviews((data as Review[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reviews").update({ status }).eq("id", id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= (r.rating || 0) ? "text-secondary fill-secondary" : "text-muted-foreground"}`} />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-foreground text-sm mb-2">{r.comment || "No comment"}</p>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${r.status === "approved" ? "bg-green-500/20 text-green-400" : "bg-secondary/20 text-secondary"}`}>{r.status || "pending"}</span>
              <button onClick={() => updateStatus(r.id, "approved")} className="text-xs text-green-400 hover:underline">Approve</button>
              <button onClick={() => updateStatus(r.id, "rejected")} className="text-xs text-destructive hover:underline">Reject</button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center text-muted-foreground py-8">No reviews yet</p>}
      </div>
    </div>
  );
};

export default AdminReviews;
