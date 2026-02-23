import { motion } from "framer-motion";
import {
  Building2, ShoppingCart, GraduationCap, Truck, Heart, Users,
  Home, Megaphone, Tractor, Factory, Scale, Gamepad2
} from "lucide-react";

const domains = [
  { icon: Building2, title: "Banking & Finance", desc: "Fraud detection, risk analysis, smart loan approvals" },
  { icon: ShoppingCart, title: "Retail & E-commerce", desc: "Customer behavior analytics, demand forecasting, AI chatbots" },
  { icon: GraduationCap, title: "Education & EdTech", desc: "Personalized learning, AI tutors, automated grading" },
  { icon: Truck, title: "Logistics & Supply Chain", desc: "Route optimization, inventory prediction" },
  { icon: Heart, title: "Healthcare & Diagnostics", desc: "Medical imaging analysis, patient monitoring" },
  { icon: Users, title: "HR & Recruitment", desc: "Resume screening, intelligent candidate matching" },
  { icon: Home, title: "Real Estate", desc: "Price prediction, smart property recommendations" },
  { icon: Megaphone, title: "Marketing & Advertising", desc: "AI content generation, targeted campaigns" },
  { icon: Tractor, title: "Agriculture", desc: "Crop health monitoring, yield prediction" },
  { icon: Factory, title: "Manufacturing", desc: "Predictive maintenance, quality control automation" },
  { icon: Scale, title: "Legal & Compliance", desc: "Contract analysis, regulatory compliance AI" },
  { icon: Gamepad2, title: "Gaming & Entertainment", desc: "Procedural content generation, NPC intelligence" },
];

const DomainsSection = () => {
  return (
    <section id="domains" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            AI Implementation <span className="text-gradient-gold">Across All Industries</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transforming every sector with cutting-edge artificial intelligence solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-6 hover:glow-blue transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <domain.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{domain.title}</h3>
              <p className="text-muted-foreground text-sm">{domain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
