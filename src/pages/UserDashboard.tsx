import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  LayoutDashboard, FolderOpen, Video, LogOut, Menu, X, ChevronRight, User, BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import UserAssignedProjects from "@/components/user/UserAssignedProjects";
import UserLearningVideos from "@/components/user/UserLearningVideos";
import UserModules from "@/components/user/UserModules";

const tabs = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "modules", label: "Modules", icon: BookOpen },
  { id: "projects", label: "Assigned Projects", icon: FolderOpen },
  { id: "videos", label: "Learning Videos", icon: Video },
];

interface Profile {
  full_name: string | null;
  email: string | null;
}

const UserDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login first");
      navigate("/auth");
    }
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || isAdmin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "modules": return <UserModules userId={user.id} />;
      case "projects": return <UserAssignedProjects userId={user.id} />;
      case "videos": return <UserLearningVideos userId={user.id} />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Welcome, {profile?.full_name || user.email}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button onClick={() => setActiveTab("modules")}
                className="glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-colors">
                <BookOpen className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground">Modules</h3>
                <p className="text-sm text-muted-foreground mt-1">Access your assigned learning modules</p>
              </button>
              <button onClick={() => setActiveTab("projects")}
                className="glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-colors">
                <FolderOpen className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground">Assigned Projects</h3>
                <p className="text-sm text-muted-foreground mt-1">View and download your project files</p>
              </button>
              <button onClick={() => setActiveTab("videos")}
                className="glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-colors">
                <Video className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground">Learning Videos</h3>
                <p className="text-sm text-muted-foreground mt-1">Watch your assigned training videos</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 md:hidden w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <aside className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border p-4 overflow-y-auto transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
          <div className="flex items-center gap-3 px-3 py-3 mb-4 rounded-lg bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-foreground truncate">{profile?.full_name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}>
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <button onClick={signOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8 min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
