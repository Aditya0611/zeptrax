import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const TrainingSpecialization: React.FC = () => {
  return (
    <section id="specialization" className="training-section level-section">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="level-header"
      >
        <div className="level-header-left">
          <div className="level-tag" style={{ background: 'var(--violet-light)', color: 'var(--violet)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <span className="level-tag-dot" style={{ background: 'var(--violet)', boxShadow: '0 0 10px var(--violet)' }}></span>
            Level 04 — Specialization
          </div>
          <h2 className="section-title">Industry Expert<br/>& AI Research</h2>
          <div className="schedule-grid" style={{ marginTop: '1.5rem' }}>
            <div className="sched-cell"><div className="sched-val">9</div><div className="sched-lbl">Modules</div></div>
            <div className="sched-cell"><div className="sched-val">32h</div><div className="sched-lbl">Training</div></div>
            <div className="sched-cell"><div className="sched-val">2mo</div><div className="sched-lbl">Duration</div></div>
          </div>
        </div>
        <div className="level-header-right">
          <p className="level-intro">The final stage is designed for those aiming to become top-tier AI researchers, leads, or architects. This advanced program dives deep into the high-end architectures of <strong>Large Language Models (LLMs)</strong>, advanced <strong>Reinforcement Learning</strong>, autonomous <strong>AI Agent design</strong>, and <strong>AI infrastructure scaling</strong>. Participants engage in advanced specialization tracks and industry-grade research implementations.</p>
        </div>
      </motion.div>

      <div className="modules-title">Specialization Modules</div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="spec-grid"
      >
        {[
          { color: 'var(--violet)', title: "Advanced Transformer & LLM Architectures", topics: "GPT, BERT, Llama internals · Attention mechanisms · Fine-tuning strategies · Model quantization · Prompting techniques for scale" },
          { color: 'var(--teal)', title: "Autonomous AI Agents and Workflows", topics: "Agentic reasoning · Multi-agent systems · Tool use & function calling · Long-term memory · Task planning & orchestration" },
          { color: 'var(--gold)', title: "Reinforcement Learning & Optimization", topics: "Markov Decision Processes · Q-Learning · Policy Gradients · RLHF internals · Optimization for real-time AI" },
          { color: 'var(--cobalt)', title: "Enterprise AI Architecture and Scalability", topics: "Vector databases (Pinecone, Weaviate) · Scalable AI infrastructure · AI microservices · Monitoring AI in production (MLOps)" },
          { color: 'var(--rust)', title: "Multi-Modal AI Systems", topics: "Combining vision and language models · Cross-modal attention · Video-language understanding · Multi-modal generative systems" },
          { color: 'var(--violet)', title: "AI for Robotics and Edge Computing", topics: "Robot control with AI · Edge AI deployment (TensorRT) · Low-latency inference · Embedded AI systems" },
          { color: 'var(--teal)', title: "Advanced AI Research Methodology", topics: "Reading & evaluating academic AI papers · Designing AI experiments · Hypothesis testing · Publishing AI research outcomes" },
          { color: 'var(--gold)', title: "AI Governance, Risk & Policy", topics: "AI alignment & safety · Global AI regulations · Risk assessment frameworks · Ethical AI at scale" },
          { color: 'var(--cobalt)', title: "Capstone Research Project", topics: "Full-cycle AI research or development project · Mentorship from industry experts · Final presentation & demonstration" }
        ].map((mod, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="spec-card" 
            style={{ borderTopColor: mod.color }}
          >
            <div className="module-title">{mod.title}</div>
            <div className="module-topics">{mod.topics}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
export default TrainingSpecialization;
