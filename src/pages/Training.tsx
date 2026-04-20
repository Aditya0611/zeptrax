import React from 'react';
import '../training.css';
import TrainingNav from '@/components/training/TrainingNav';
import TrainingHero from '@/components/training/TrainingHero';
import TrainingPathway from '@/components/training/TrainingPathway';
import TrainingLevel from '@/components/training/TrainingLevel';
import TrainingCertifications from '@/components/training/TrainingCertifications';
import TrainingSpecialization from '@/components/training/TrainingSpecialization';
import TrainingFooter from '@/components/training/TrainingFooter';

const Training = () => {
  return (
    <div className="training-body">
      <TrainingNav />
      <TrainingHero />
      <TrainingPathway />
      
      <TrainingLevel 
        id="beginner"
        tag="Level 01 — Beginner"
        tagColor="var(--teal)"
        tagBg="var(--teal-light)"
        title="Understanding AI<br/>Concepts & Tools"
        intro="Designed for students, professionals, and non-technical learners who want to understand Artificial Intelligence and begin using modern AI tools effectively. This program is designed to remove the barrier of entry by introducing AI in a simple, practical, and beginner-friendly manner. <strong>No prior programming or AI knowledge is required.</strong>"
        schedule={{ modules: 6, hours: "32h", duration: "2mo" }}
        modules={[
          { num: "01", title: "Introduction to Artificial Intelligence", topics: "What is AI · Difference between AI, ML & Deep Learning · History and evolution · Real-world examples · Why AI matters today", outcome: "Outcome: Clear understanding of what AI is and why it transforms industries" },
          { num: "02", title: "AI in Everyday Life", topics: "AI in smartphones & digital assistants · Google search & recommendations · Social media · Online shopping · Healthcare & finance", outcome: "Outcome: Understand how AI influences everyday digital experiences" },
          { num: "03", title: "Introduction to Generative AI", topics: "What is Generative AI · How large language models work · Basics of prompt engineering · AI for writing, research & productivity", outcome: "Outcome: Communicate effectively with AI systems and generate useful outputs" },
          { num: "04", title: "AI for Productivity and Work", topics: "AI for writing & documentation · Research & summarization · Presentations & reports · Coding assistance · Business productivity", outcome: "Outcome: Use AI to enhance productivity and automate common tasks" },
          { num: "05", title: "AI for Creativity and Content Creation", topics: "AI image generation · AI video creation tools · AI music generation · AI design assistance", outcome: "Outcome: Explore how AI is transforming creative industries" },
          { num: "06", title: "Responsible and Ethical AI", topics: "Ethical considerations in AI · Data privacy and security · Bias in AI systems · Responsible usage of AI technologies", outcome: "Outcome: Understand the importance of ethical and responsible AI usage" }
        ]}
        projects={[
          { num: "01", name: "AI Content Generator" },
          { num: "02", name: "AI Image Creation Project" },
          { num: "03", name: "AI Research Assistant" }
        ]}
        skills={[
          "Core AI concepts & terminology",
          "Identify AI in real-world industries",
          "Use AI tools for productivity",
          "Generate content & images using AI",
          "Apply prompt engineering techniques",
          "Understand ethical AI practices"
        ]}
      />

      <TrainingCertifications />

      <TrainingLevel 
        id="intermediate"
        tag="Level 02 — Intermediate"
        tagColor="var(--cobalt)"
        tagBg="var(--cobalt-light)"
        title="AI Development<br/>& Machine Learning"
        intro="Designed for learners who already understand AI fundamentals and are ready to move toward practical AI development. Participants transition from simply using AI tools to understanding how AI systems are built, trained, optimized, and deployed. The program focuses on developing technical capabilities including Python programming, data analysis, machine learning model development, deep learning, NLP, and generative AI systems."
        schedule={{ modules: 9, hours: "32h", duration: "2mo" }}
        modules={[
          { num: "01", title: "AI System Foundations", topics: "AI architecture & modern ecosystems · AI development lifecycle · Types of ML systems · Datasets & data pipelines · AI project workflows" },
          { num: "02", title: "Python for Artificial Intelligence", topics: "Advanced Python for AI · Data structures & functions · OOP basics · NumPy, Pandas, SciPy · Python scripting for data processing" },
          { num: "03", title: "Data Engineering and Data Analysis", topics: "Data collection & preprocessing pipelines · Feature engineering · Exploratory Data Analysis (EDA) · Matplotlib and Seaborn visualization" },
          { num: "04", title: "Machine Learning Model Development", topics: "Supervised & unsupervised learning · Regression & classification models · Model evaluation & optimization · Cross-validation & hyperparameter tuning" },
          { num: "05", title: "Deep Learning and Neural Networks", topics: "Neural network architecture · Activation & loss functions · Training deep learning models · CNNs · Recurrent neural networks" },
          { num: "06", title: "Natural Language Processing", topics: "Text preprocessing & tokenization · Word embeddings & vector representations · Sentiment analysis · Named entity recognition · Transformer architectures" },
          { num: "07", title: "Generative AI & Large Language Models", topics: "GPT-style model architecture · Prompt engineering strategies · LLM-based workflows · Retrieval-augmented generation (RAG) · Conversational AI systems" },
          { num: "08", title: "AI Automation and Application Development", topics: "Integrating AI APIs · Building simple AI-powered tools · Workflow automation · Creating AI dashboards & interfaces · Introduction to deploying AI models" },
          { num: "09", title: "Portfolio Development and Industry Projects", topics: "AI project planning & documentation · GitHub portfolio development · AI project presentation techniques · Preparing technical resumes for AI roles" }
        ]}
        projects={[
          { num: "01", name: "Machine Learning Prediction System" },
          { num: "02", name: "NLP Application (Sentiment Analysis)" },
          { num: "03", name: "AI Research Assistant" },
          { num: "04", name: "AI Web Application (Streamlit/Gradio)" },
          { num: "05", name: "AI Recommendation System" }
        ]}
        skills={[
          "Python for AI & data science",
          "Data preprocessing & feature engineering",
          "ML model development & evaluation",
          "Deep learning & neural network training",
          "NLP techniques",
          "Generative AI workflow development",
          "AI automation & application integration",
          "AI experiment tracking & optimization",
          "AI-powered application development",
          "Professional AI portfolio development"
        ]}
      />


      <TrainingLevel 
        id="advanced"
        tag="Level 03 — Advanced"
        tagColor="var(--gold)"
        tagBg="#FFF0D5"
        title="Professional AI Development<br/>& Deployment"
        intro="For learners who have completed foundational and intermediate stages and are ready to develop professional-level AI capabilities. The program emphasizes practical implementation, system design, and real-world AI problem solving at scale. Participants focus on building complex, production-ready AI systems across various domains."
        schedule={{ modules: 7, hours: "32h", duration: "2mo" }}
        modules={[
          { num: "01", title: "Advanced Machine Learning Model Optimization", topics: "Advanced feature engineering · Hyperparameter tuning strategies · Gradient boosting models (XGBoost, LightGBM) · Ensemble learning techniques · Handling large-scale datasets" },
          { num: "02", title: "Deep Learning Architectures and Transfer Learning", topics: "Transfer learning techniques · Fine-tuning pre-trained models · Advanced neural network optimization · Designing custom network layers · Model pruning & distillation" },
          { num: "03", title: "Advanced Natural Language Processing", topics: "Transformer-based architectures (BERT, RoBERTa) · Advanced text classification · Sequence-to-sequence models · Language model evaluation · Custom tokenizer development" },
          { num: "04", title: "Computer Vision and Image Processing", topics: "Object detection & localization · Image segmentation · Real-time video analysis · GANs for image generation · Vision Transformer (ViT) basics" },
          { num: "05", title: "Reinforcement Learning and Decision Systems", topics: "Foundations of reinforcement learning · Q-learning and Policy Gradients · Building decision-making agents · Simulation environments (OpenAI Gym)" },
          { num: "06", title: "Big Data & Cloud for AI Systems", topics: "Distributed computing for AI · Training models on cloud (AWS/GCP/Azure) · Large-scale data pipelines · High-performance computing for AI" },
          { num: "07", title: "AI Model Deployment and MLOps", topics: "Model serialization & versioning · Building production-ready APIs · Monitoring AI models in production · Continuous Integration for ML (CI/CD) · Containerization (Docker/Kubernetes)" }
        ]}
        projects={[
          { num: "01", name: "High-Performance ML Pipeline" },
          { num: "02", name: "Advanced Computer Vision System" },
          { num: "03", name: "Production-Grade AI API" }
        ]}
        skills={[
          "Advanced ML system design",
          "Deep learning architecture optimization",
          "Advanced NLP & computer vision",
          "Reinforcement learning applications",
          "Production MLOps & deployment",
          "Cloud-scale AI infrastructure"
        ]}
      />


      <TrainingSpecialization />
      <TrainingFooter />
    </div>
  );
};

export default Training;
