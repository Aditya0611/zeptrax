import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  LayoutDashboard, Users, Award, FileText, Star, UserCheck,
  Mail, ShieldCheck, LogOut, Menu, X, ChevronRight, FolderOpen, Video, BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AdminRecords from "@/components/admin/AdminRecords";
import AdminTeams from "@/components/admin/AdminTeams";
import AdminCertificates from "@/components/admin/AdminCertificates";
import AdminDocuments from "@/components/admin/AdminDocuments";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminOnboarding from "@/components/admin/AdminOnboarding";
import AdminEmailLogs from "@/components/admin/AdminEmailLogs";
import AdminCertificateVerification from "@/components/admin/AdminCertificateVerification";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminAssignedProjects from "@/components/admin/AdminAssignedProjects";
import AdminLearningVideos from "@/components/admin/AdminLearningVideos";
import AdminModules from "@/components/admin/AdminModules";

const tabs = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "records", label: "Records", icon: FileText },
  { id: "modules", label: "Modules", icon: BookOpen },
  { id: "assigned-projects", label: "Assign Projects", icon: FolderOpen },
  { id: "learning-videos", label: "Learning Videos", icon: Video },
  { id: "teams", label: "Teams", icon: Users },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "onboarding", label: "Onboarding", icon: UserCheck },
  { id: "email-logs", label: "Email Logs", icon: Mail },
  { id: "verify", label: "Verify Certificate", icon: ShieldCheck },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error("Access denied. Admin only.");
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <AdminOverview />;
      case "records": return <AdminRecords />;
      case "assigned-projects": return <AdminAssignedProjects />;
      case "learning-videos": return <AdminLearningVideos />;
      case "teams": return <AdminTeams />;
      case "certificates": return <AdminCertificates />;
      case "documents": return <AdminDocuments />;
      case "reviews": return <AdminReviews />;
      case "onboarding": return <AdminOnboarding />;
      case "email-logs": return <AdminEmailLogs />;
      case "verify": return <AdminCertificateVerification />;
      default: return <AdminOverview />;
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

        <aside
          className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border p-4 overflow-y-auto transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
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

export default AdminDashboard;
