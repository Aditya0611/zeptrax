import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";

const tiers = [
  {
    name: "Foundation",
    price: "₹9,999",
    period: "per program",
    icon: Zap,
    highlight: false,
    description: "Perfect for beginners starting their AI journey",
    features: [
      "AI Fundamentals & Python",
      "Machine Learning Basics",
      "Hands-on Projects (3)",
      "Certificate of Completion",
      "Community Access",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: "₹19,999",
    period: "per program",
    icon: Star,
    highlight: true,
    description: "For professionals looking to upskill with advanced AI",
    features: [
      "Everything in Foundation",
      "Deep Learning & NLP",
      "Generative AI & LLMs",
      "Hands-on Projects (8)",
      "Industry Mentorship",
      "1-on-1 Doubt Sessions",
      "Job Assistance",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    icon: Crown,
    highlight: false,
    description: "Custom AI training for teams and organizations",
    features: [
      "Everything in Professional",
      "Custom Curriculum Design",
      "On-site / Virtual Training",
      "Dedicated AI Consultant",
      "Team Progress Dashboard",
      "Enterprise Certification",
      "24/7 Premium Support",
      "Post-Training Support (3 months)",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Training <span className="text-gradient-gold">Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Invest in your AI future with industry-leading training programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 relative transition-all duration-500 ${
                tier.highlight
                  ? "glass-card glow-blue border-primary/40 scale-[1.03]"
                  : "glass-card hover:glow-blue"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Most Popular
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                <tier.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mb-5">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm ml-2">/ {tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={tier.price === "Custom" ? "https://chat.whatsapp.com/Kzpq23LBzuHLuN1Es2SN2P?mode=gi_t" : "upi://pay?pa=9354992890@ptyes&pn=Zeptrax%20AI&am=" + (tier.name === "Foundation" ? "9999" : "19999") + "&cu=INR&tn=" + encodeURIComponent(tier.name + " Program")}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                {tier.price === "Custom" ? "Contact Us" : "Pay\u00A0Now"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
