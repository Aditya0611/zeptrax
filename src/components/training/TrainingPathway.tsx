import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const TrainingPathway: React.FC = () => {
  const pathways = [
    {
      num: "01",
      level: "Beginner",
      name: "AI Concepts & Tools",
      desc: "Understand what AI is, how it works in everyday life, and how to use modern AI tools to improve productivity — no code required.",
      detail: "6 modules · 32 hrs · 2 months",
      accentColor: "var(--teal)"
    },
    {
      num: "02",
      level: "Intermediate",
      name: "AI Development & ML",
      desc: "Python, data engineering, machine learning model development, deep learning, NLP, and building AI-powered applications.",
      detail: "9 modules · 32 hrs · 2 months",
      accentColor: "var(--cobalt)"
    },
    {
      num: "03",
      level: "Advanced",
      name: "Professional AI & Deployment",
      desc: "Advanced ML systems, deep learning architectures, computer vision, generative AI, and deploying scalable production AI systems.",
      detail: "7 modules · 32 hrs · 2 months",
      accentColor: "var(--gold)"
    },
    {
      num: "04",
      level: "Specialization",
      name: "Industry Expert & Research",
      desc: "LLM development, transformer architectures, reinforcement learning, autonomous agents, and enterprise AI architecture.",
      detail: "9 modules · 32 hrs · 2 months",
      accentColor: "var(--violet)"
    }
  ];

  return (
    <section className="training-section pathway-section" id="pathway">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Learning Pathway</div>
        <h2 className="section-title text-4xl md:text-5xl font-bold">Four Stages to AI Mastery</h2>
        <p className="section-desc max-w-2xl text-lg">Each level builds precisely on the previous, creating a coherent journey from first concepts to research-grade expertise.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pathway-grid"
      >
        {pathways.map((item, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="pathway-card group"
            whileHover={{ y: -10 }}
          >
            <div className="pathway-num">{item.num}</div>
            <span className="pathway-badge" style={{ background: `${item.accentColor}22`, color: item.accentColor, border: `1px solid ${item.accentColor}44` }}>{item.level}</span>
            <div className="pathway-name">{item.name}</div>
            <div className="pathway-desc">{item.desc}</div>
            <div className="pathway-detail">{item.detail}</div>
            <div className="pathway-accent" style={{ background: item.accentColor, boxShadow: `0 0 15px ${item.accentColor}` }}></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrainingPathway;
