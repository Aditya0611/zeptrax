import React from 'react';

const TrainingCertifications: React.FC = () => {
  return (
    <section className="training-section">
      <div className="cert-banner">
        <div className="cert-banner-title">Free Certifications Included</div>
        <div className="cert-banner-desc">Participants will be guided to complete globally recognized free AI certifications to strengthen their professional profile and enhance career opportunities.</div>
        <div className="cert-list">
          <div className="cert-item"><div className="cert-dot"></div><div className="cert-text">Artificial Intelligence Fundamentals — core AI concepts and applications across industries</div></div>
          <div className="cert-item"><div className="cert-dot"></div><div className="cert-text">AI Concepts and Responsible AI — ethical considerations and responsible AI practices</div></div>
          <div className="cert-item"><div className="cert-dot"></div><div className="cert-text">Machine Learning and AI Foundations — how models learn from data</div></div>
          <div className="cert-item"><div className="cert-dot"></div><div className="cert-text">Practical AI Learning Modules — hands-on AI tools, technologies, and workflows</div></div>
          <div className="cert-item"><div className="cert-dot"></div><div className="cert-text">Data Science and Machine Learning Micro Courses — data analysis, ML basics, AI development</div></div>
        </div>
      </div>
    </section>
  );
};

export default TrainingCertifications;
