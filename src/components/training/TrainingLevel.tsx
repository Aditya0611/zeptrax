import React from 'react';
import { motion } from 'framer-motion';

interface Module {
  title: string;
  topics: string;
  outcome: string;
}

interface Project {
  name: string;
}

interface TrainingLevelProps {
  id: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  intro: string;
  modules: Module[];
  projects: Project[];
  schedule: {
    modules: number | string;
    hours: string;
    duration: string;
  };
  skills: string[];
}

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

const TrainingLevel: React.FC<TrainingLevelProps> = ({
  id, tag, tagColor, tagBg, title, intro, modules, projects, schedule, skills
}) => {
  return (
    <section id={id} className="training-section level-section">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="level-header"
      >
        <div className="level-header-left">
          <div className="level-tag" style={{ background: tagBg, color: tagColor, borderColor: `rgba(255,255,255,0.1)` }}>
            <span className="level-tag-dot" style={{ background: tagColor, boxShadow: `0 0 10px ${tagColor}` }}></span>
            {tag}
          </div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }}></h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="schedule-grid" 
            style={{ marginTop: '1.5rem' }}
          >
            <div className="sched-cell"><div className="sched-val">{schedule.modules}</div><div className="sched-lbl">Modules</div></div>
            <div className="sched-cell"><div className="sched-val">{schedule.hours}</div><div className="sched-lbl">Training</div></div>
            <div className="sched-cell"><div className="sched-val">{schedule.duration}</div><div className="sched-lbl">Duration</div></div>
          </motion.div>
        </div>
        <div className="level-header-right">
          <p className="level-intro" dangerouslySetInnerHTML={{ __html: intro }}></p>
        </div>
      </motion.div>

      <div className="modules-title">Curriculum Modules</div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="modules-grid"
      >
        {modules.map((m, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            className="module-card group"
          >
            <div className="module-num-label">Module {String(i + 1).padStart(2, '0')}</div>
            <div className="module-title">{m.title}</div>
            <div className="module-topics">{m.topics}</div>
            <div className="module-outcome">{m.outcome}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="modules-title">Core Projects</div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="projects-row"
      >
        {projects.map((p, i) => (
          <motion.div 
            variants={itemVariants}
            key={i} 
            className="project-card"
          >
            <div className="project-n">Project {String(i + 1).padStart(2, '0')}</div>
            <div className="project-name">{p.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="modules-title">Skill Set Acquisition</div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="skills-cloud"
      >
        {skills.map((s, i) => (
          <motion.span variants={itemVariants} key={i} className="skill-pill">{s}</motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default TrainingLevel;
