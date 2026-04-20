import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Lock } from "lucide-react";

const MODULE_LEVELS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advance", label: "Advance" },
  { id: "expertise", label: "Expertise" },
];

interface ModuleDocument {
  id: string;
  module_level: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
}

const UserModules = ({ userId }: { userId: string }) => {
  const [accessLevels, setAccessLevels] = useState<string[]>([]);
  const [documents, setDocuments] = useState<ModuleDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [modulesRes, docsRes] = await Promise.all([
        supabase.from("user_modules").select("module_level").eq("user_id", userId),
        supabase.from("module_documents").select("*").order("created_at", { ascending: false }),
      ]);
      setAccessLevels((modulesRes.data || []).map((m: { module_level: string }) => m.module_level));
      setDocuments((docsRes.data as ModuleDocument[]) || []);
      setLoading(false);
    };
    fetch();
  }, [userId]);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  if (accessLevels.length === 0) {
    return (
      <div className="text-center py-12">
        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground">No Modules Assigned</h3>
        <p className="text-sm text-muted-foreground mt-1">Contact your admin to get module access.</p>
      </div>
    );
  }

  const availableLevels = MODULE_LEVELS.filter(l => accessLevels.includes(l.id));

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">My Modules</h2>
      <Tabs defaultValue={availableLevels[0]?.id}>
        <TabsList className={`grid mb-6`} style={{ gridTemplateColumns: `repeat(${availableLevels.length}, 1fr)` }}>
          {availableLevels.map(level => (
            <TabsTrigger key={level.id} value={level.id}>{level.label}</TabsTrigger>
          ))}
        </TabsList>

        {availableLevels.map(level => {
          const levelDocs = documents.filter(d => d.module_level === level.id);
          return (
            <TabsContent key={level.id} value={level.id}>
              <div className="space-y-3">
                {levelDocs.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No documents available yet.</p>
                )}
                {levelDocs.map(doc => (
                  <div key={doc.id} className="glass-card rounded-xl p-4 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{doc.title}</p>
                      {doc.description && <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>}
                      {doc.file_url && (
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline mt-2 inline-block">
                          View / Download Document
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default UserModules;
