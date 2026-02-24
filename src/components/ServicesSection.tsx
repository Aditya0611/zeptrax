import { motion } from "framer-motion";
import { Bot, Cloud, Shield, Cpu, Link2, Globe } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Build intelligent AI-powered automation that streamlines workflows, handles customer interactions, and makes decisions autonomously. From RPA to cognitive automation.",
    features: ["AI-Powered RPA", "Process Automation", "Intelligent Workflows", "Decision Systems"],
  },
  {
    icon: Cloud,
    title: "AI with Cloud Services",
    desc: "Deploy scalable AI solutions on cloud platforms. Train models at scale, serve predictions globally, and manage ML pipelines efficiently.",
    features: ["AWS SageMaker", "Azure AI", "Google Vertex AI", "MLOps Pipelines"],
  },
  {
    icon: Link2,
    title: "AI with Blockchain",
    desc: "Combine AI with blockchain for decentralized intelligence, smart contract automation, and tamper-proof AI decision systems.",
    features: ["Smart Contracts AI", "Decentralized AI", "NFT Analytics", "DeFi Automation"],
  },
  {
    icon: Shield,
    title: "AI with Cyber Security",
    desc: "Leverage AI for advanced threat detection, anomaly analysis, vulnerability assessment, and zero-trust security architecture.",
    features: ["Threat Detection", "Anomaly Analysis", "Vulnerability AI", "Zero-Trust Security"],
  },
  {
    icon: Cpu,
    title: "Generative AI & LLMs",
    desc: "Master large language models, prompt engineering, fine-tuning, and building production-ready GenAI applications.",
    features: ["LLM Fine-Tuning", "Prompt Engineering", "RAG Systems", "Multi-Modal AI"],
  },
  {
    icon: Globe,
    title: "AI-Based Applications & Websites",
    desc: "Build intelligent web applications and websites powered by AI. From smart dashboards to AI-driven customer portals and automated content platforms.",
    features: ["AI Web Apps", "Smart Dashboards", "AI Chatbots", "Content Automation"],
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient-brand">Core Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive AI training programs designed for real-world implementation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:glow-blue transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
