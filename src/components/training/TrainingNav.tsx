import React from 'react';

const TrainingNav: React.FC = () => {
  return (
    <nav className="training-nav">
      <div className="nav-logo">
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL3SURBVHgB7Z27TxxBEMbPAtEREREREREREREREREREREREREREREREZEREZEREZEREZEREZEREZEREZEREZEREZEREZEREZEREZEREaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaXFmZmZ97vHwX+Fv76/7/68v79/vL+/f7y/v3++v79/vr+/f76/v3++v79/vr+/v76/v7+/vr+/v7+/vr+8v7S8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vh8fH68fG7p73u8e8v7+/vr+8v7S8vLy8vLy8vLy8vLy8vLy8vLy8vef9S8vLy8vLy8u8tLy8vLx7XpSBAAAAAAQBgP6/G0lVRElSAAAAAElFTkSuQmCC" 
          className="nav-logo-icon" 
          alt="Zeptrax AI Logo" 
          style={{ width: '44px', height: 'auto' }} 
        />
      </div>
      <ul className="nav-links">
        <li><a href="#pathway">Pathway</a></li>
        <li><a href="#beginner">Beginner</a></li>
        <li><a href="#intermediate">Intermediate</a></li>
        <li><a href="#advanced">Advanced</a></li>
        <li><a href="#specialization">Specialization</a></li>
      </ul>
    </nav>
  );
};

export default TrainingNav;
