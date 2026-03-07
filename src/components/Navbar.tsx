import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import zeptraxLogo from "@/assets/zeptrax-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const links = [
    ...(!user ? [{ href: "/register", label: "Register Now" }] : []),
    ...(!user ? [{ href: "/auth", label: "Login" }] : []),
    ...(user && !isAdmin ? [{ href: "/dashboard", label: "My Dashboard" }] : []),
    ...(isAdmin ? [{ href: "/admin", label: "Admin Dashboard" }] : []),
    { href: "https://chat.whatsapp.com/EAJYjQDwsoYDyBDNmmGrLE", label: "Join Community", external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={zeptraxLogo} alt="Zeptrax AI" className="h-10 w-auto" />
        </Link>

        <a href="https://www.zeptraxai.com" target="_blank" rel="noopener noreferrer" className="hidden lg:block text-xs text-muted-foreground hover:text-primary transition-colors">
          www.zeptraxai.com
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) =>
            (l as any).external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} to={l.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === l.href ? "text-primary" : "text-muted-foreground"
                }`}>
                {l.label}
              </Link>
            )
          )}
          {user && (
            <button onClick={async () => { await (await import("@/integrations/supabase/client")).supabase.auth.signOut(); }}
              className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
              Logout
            </button>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 py-4 space-y-3">
          {links.map((l) =>
            (l as any).external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-primary">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-primary">
                {l.label}
              </Link>
            )
          )}
          {user && (
            <button onClick={async () => { await (await import("@/integrations/supabase/client")).supabase.auth.signOut(); setOpen(false); }}
              className="block text-sm font-medium text-muted-foreground hover:text-destructive">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
