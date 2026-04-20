import React from 'react';

const TrainingFooter: React.FC = () => {
  return (
    <footer className="training-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-name">Zeptrax AI</div>
          <p>Defining the boundaries of machine intelligence through comprehensive education and research.</p>
        </div>
        <div className="footer-col">
          <h4>Program</h4>
          <ul>
            <li>Pathway</li>
            <li>Beginner</li>
            <li>Intermediate</li>
            <li>Advanced</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Ethics</li>
            <li>Legal</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <ul>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Discord</li>
            <li>GitHub</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Zeptrax AI. All rights reserved.</p>
        <p>Training & Research Division</p>
      </div>
    </footer>
  );
};

export default TrainingFooter;
