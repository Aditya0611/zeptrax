import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, Upload, Trash2, UserPlus, UserMinus, FileText
} from "lucide-react";

const MODULE_LEVELS = [
  { id: "beginner", label: "Beginner", color: "text-green-400 bg-green-500/20" },
  { id: "intermediate", label: "Intermediate", color: "text-blue-400 bg-blue-500/20" },
  { id: "advance", label: "Advance", color: "text-orange-400 bg-orange-500/20" },
  { id: "expertise", label: "Expertise", color: "text-purple-400 bg-purple-500/20" },
];

interface ModuleDocument {
  id: string;
  module_level: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  created_at: string;
}

interface UserModule {
  id: string;
  user_id: string;
  module_level: string;
  created_at: string;
}

interface ApprovedUser {
  id: string;
  email: string;
  full_name: string;
  user_id: string | null;
}

const AdminModules = () => {
  const [documents, setDocuments] = useState<ModuleDocument[]>([]);
  const [userModules, setUserModules] = useState<UserModule[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<ApprovedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState("beginner");

  // Upload form state
  const [docTitle, setDocTitle] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Assign user state
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [docsRes, modulesRes, usersRes] = await Promise.all([
      supabase.from("module_documents" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("user_modules" as any).select("*"),
      supabase.from("registrations").select("id, email, full_name, user_id").eq("status", "approved"),
    ]);
    setDocuments((docsRes.data as unknown as ModuleDocument[]) || []);
    setUserModules((modulesRes.data as unknown as UserModule[]) || []);
    setApprovedUsers((usersRes.data as ApprovedUser[]) || []);
    setLoading(false);
  };

  const addDocument = async () => {
    if (!docTitle.trim()) { toast.error("Title is required"); return; }
    setUploading(true);
    const { error } = await supabase.from("module_documents" as any).insert({
      module_level: activeLevel,
      title: docTitle.trim(),
      description: docDesc.trim() || null,
      file_url: docUrl.trim() || null,
      file_name: docTitle.trim(),
    });
    if (error) { toast.error("Failed to add document"); }
    else {
      toast.success("Document added");
      setDocTitle(""); setDocDesc(""); setDocUrl("");
      fetchAll();
    }
    setUploading(false);
  };

  const removeDocument = async (id: string) => {
    if (!confirm("Remove this document?")) return;
    await supabase.from("module_documents").delete().eq("id", id);
    setDocuments(prev => prev.filter(d => d.id !== id));
    toast.success("Document removed");
  };

  const assignModule = async () => {
    if (!selectedUserId) { toast.error("Select a user"); return; }
    const { error } = await supabase.from("user_modules").insert({
      user_id: selectedUserId,
      module_level: activeLevel,
    });
    if (error) {
      if (error.code === "23505") toast.error("User already has access to this module");
      else toast.error("Failed to assign module");
    } else {
      toast.success("Module access granted");
      setSelectedUserId("");
      fetchAll();
    }
  };

  const revokeModule = async (id: string) => {
    await supabase.from("user_modules").delete().eq("id", id);
    setUserModules(prev => prev.filter(m => m.id !== id));
    toast.success("Access revoked");
  };

  const levelDocs = documents.filter(d => d.module_level === activeLevel);
  const levelUsers = userModules.filter(m => m.module_level === activeLevel);
  const usersWithAccess = levelUsers.map(m => m.user_id);
  const availableUsers = approvedUsers.filter(u => u.user_id && !usersWithAccess.includes(u.user_id));

  const getUserName = (userId: string) => {
    const user = approvedUsers.find(u => u.user_id === userId);
    return user ? `${user.full_name} (${user.email})` : userId;
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Modules</h2>

      <Tabs value={activeLevel} onValueChange={setActiveLevel}>
        <TabsList className="grid grid-cols-4 mb-6">
          {MODULE_LEVELS.map(level => (
            <TabsTrigger key={level.id} value={level.id} className="text-xs sm:text-sm">
              {level.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {MODULE_LEVELS.map(level => (
          <TabsContent key={level.id} value={level.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Documents Section */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {level.label} Documents
                </h3>

                {/* Add Document Form */}
                <div className="space-y-3 mb-4 p-4 rounded-lg bg-muted/30 border border-border">
                  <input
                    type="text" placeholder="Document title *"
                    value={docTitle} onChange={e => setDocTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground"
                  />
                  <input
                    type="text" placeholder="Description (optional)"
                    value={docDesc} onChange={e => setDocDesc(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground"
                  />
                  <input
                    type="url" placeholder="Document URL / Link"
                    value={docUrl} onChange={e => setDocUrl(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground"
                  />
                  <button
                    onClick={addDocument} disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? "Adding..." : "Add Document"}
                  </button>
                </div>

                {/* Document List */}
                <div className="space-y-2">
                  {levelDocs.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No documents yet</p>
                  )}
                  {levelDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                        {doc.description && <p className="text-xs text-muted-foreground truncate">{doc.description}</p>}
                        {doc.file_url && (
                          <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline">View Document</a>
                        )}
                      </div>
                      <button onClick={() => removeDocument(doc.id)}
                        className="ml-2 p-1.5 rounded text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Access Section */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  Assign {level.label} Access
                </h3>

                {/* Assign User */}
                <div className="flex gap-2 mb-4 p-4 rounded-lg bg-muted/30 border border-border">
                  <select
                    value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="">Select user...</option>
                    {availableUsers.map(u => (
                      <option key={u.id} value={u.user_id!}>{u.full_name} ({u.email})</option>
                    ))}
                  </select>
                  <button onClick={assignModule}
                    className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                    Assign
                  </button>
                </div>

                {/* Users with access */}
                <div className="space-y-2">
                  {levelUsers.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No users assigned</p>
                  )}
                  {levelUsers.map(um => (
                    <div key={um.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                      <p className="text-sm text-foreground truncate flex-1">{getUserName(um.user_id)}</p>
                      <button onClick={() => revokeModule(um.id)}
                        className="ml-2 p-1.5 rounded text-destructive hover:bg-destructive/10 flex items-center gap-1 text-xs">
                        <UserMinus className="w-4 h-4" /> Revoke
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminModules;
