import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg text-gradient-brand">Zeptrax AI</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
            <a href="mailto:mydata193@gmail.com" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Zeptrax AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
