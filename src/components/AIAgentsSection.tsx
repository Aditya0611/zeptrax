import { motion } from "framer-motion";
import { Bot, MessageSquare, FileSearch, Workflow, BrainCircuit, Headphones } from "lucide-react";

const agents = [
  {
    icon: MessageSquare,
    title: "Conversational AI Agents",
    desc: "Build intelligent chatbots and virtual assistants that understand context, handle multi-turn conversations, and provide human-like responses.",
    useCases: ["Customer Support", "Sales Assistants", "FAQ Automation"],
  },
  {
    icon: FileSearch,
    title: "Research & Analysis Agents",
    desc: "Deploy AI agents that autonomously gather, analyze, and summarize information from multiple sources for data-driven decisions.",
    useCases: ["Market Research", "Competitive Analysis", "Report Generation"],
  },
  {
    icon: Workflow,
    title: "Task Automation Agents",
    desc: "Create autonomous agents that execute multi-step workflows, integrate with APIs, and complete complex tasks without human intervention.",
    useCases: ["Email Automation", "Data Entry", "Scheduling"],
  },
  {
    icon: BrainCircuit,
    title: "Reasoning & Decision Agents",
    desc: "Build agents with advanced reasoning capabilities that can plan, evaluate options, and make intelligent decisions in real-time.",
    useCases: ["Risk Assessment", "Strategy Planning", "Anomaly Detection"],
  },
  {
    icon: Headphones,
    title: "Voice AI Agents",
    desc: "Develop voice-powered agents for call centers, virtual receptionists, and voice-controlled applications with natural speech understanding.",
    useCases: ["Call Centers", "Voice Assistants", "IVR Systems"],
  },
  {
    icon: Bot,
    title: "Multi-Agent Systems",
    desc: "Design collaborative AI agent networks where multiple specialized agents work together to solve complex, enterprise-level problems.",
    useCases: ["Enterprise Workflows", "Supply Chain", "DevOps Automation"],
  },
];

const AIAgentsSection = () => {
  return (
    <section id="ai-agents" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            AI <span className="text-gradient-brand">Agents</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Build autonomous AI agents that think, reason, and act — transforming how businesses operate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-8 hover:glow-blue transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                <agent.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{agent.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{agent.desc}</p>
              <div className="flex flex-wrap gap-2">
                {agent.useCases.map((uc) => (
                  <span
                    key={uc}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                  >
                    {uc}
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

export default AIAgentsSection;
