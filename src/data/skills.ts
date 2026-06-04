export interface Skill {
  name: string;
  category: string;
  tooltip: string;
}

export const skillCategories = [
  'All',
  'Programming',
  'Machine Learning',
  'Deep Learning',
  'Reinforcement Learning',
  'Mathematics & Physics',
  'AI & Research',
];

export const skills: Skill[] = [
  // Programming
  { name: 'Python', category: 'Programming', tooltip: 'Primary language for ML/AI development' },
  { name: 'NumPy', category: 'Programming', tooltip: 'Numerical computing and array operations' },
  { name: 'Pandas', category: 'Programming', tooltip: 'Data manipulation and analysis' },
  { name: 'Matplotlib', category: 'Programming', tooltip: 'Data visualization and plotting' },
  { name: 'Jupyter Notebook', category: 'Programming', tooltip: 'Interactive development environment' },
  { name: 'Git & GitHub', category: 'Programming', tooltip: 'Version control and collaboration' },

  // Machine Learning
  { name: 'Supervised Learning', category: 'Machine Learning', tooltip: 'Classification and regression models' },
  { name: 'Unsupervised Learning', category: 'Machine Learning', tooltip: 'Clustering and dimensionality reduction' },
  { name: 'Model Evaluation & Validation', category: 'Machine Learning', tooltip: 'Cross-validation and metrics' },
  { name: 'Feature Engineering', category: 'Machine Learning', tooltip: 'Data preprocessing and feature selection' },
  { name: 'Scikit-learn', category: 'Machine Learning', tooltip: 'ML library for classical algorithms' },
  { name: 'End-to-End ML Pipelines', category: 'Machine Learning', tooltip: 'Complete model development workflows' },

  // Deep Learning
  { name: 'PyTorch', category: 'Deep Learning', tooltip: 'Primary deep learning framework' },
  { name: 'Neural Networks', category: 'Deep Learning', tooltip: 'Feedforward and architecture design' },
  { name: 'CNNs', category: 'Deep Learning', tooltip: 'Convolutional neural networks for vision' },
  { name: 'Transfer Learning', category: 'Deep Learning', tooltip: 'Pre-trained model fine-tuning' },
  { name: 'Training & Optimization', category: 'Deep Learning', tooltip: 'Loss functions, optimizers, scheduling' },
  { name: 'Computer Vision Fundamentals', category: 'Deep Learning', tooltip: 'Image processing and analysis' },

  // Reinforcement Learning
  { name: 'Q-Learning', category: 'Reinforcement Learning', tooltip: 'Value-based RL algorithm' },
  { name: 'Deep Q-Networks', category: 'Reinforcement Learning', tooltip: 'Deep RL with neural network approximation' },
  { name: 'Policy Gradients', category: 'Reinforcement Learning', tooltip: 'Direct policy optimization methods' },
  { name: 'OpenAI Gym', category: 'Reinforcement Learning', tooltip: 'RL environment simulation framework' },
  { name: 'Reward Engineering', category: 'Reinforcement Learning', tooltip: 'Designing effective reward functions' },

  // Mathematics & Physics
  { name: 'Linear Algebra', category: 'Mathematics & Physics', tooltip: 'Matrix operations and vector spaces' },
  { name: 'Calculus', category: 'Mathematics & Physics', tooltip: 'Differential and integral calculus' },
  { name: 'Probability & Statistics', category: 'Mathematics & Physics', tooltip: 'Statistical inference and distributions' },
  { name: 'Differential Equations', category: 'Mathematics & Physics', tooltip: 'ODEs and PDEs for modeling' },
  { name: 'Classical Mechanics', category: 'Mathematics & Physics', tooltip: 'Newtonian mechanics and Lagrangian' },
  { name: 'Electromagnetism', category: 'Mathematics & Physics', tooltip: "Maxwell's equations and applications" },

  // AI & Research
  { name: 'Research Paper Implementation', category: 'AI & Research', tooltip: 'Reproducing papers from scratch' },
  { name: 'Generative AI', category: 'AI & Research', tooltip: 'GANs, VAEs, and generative models' },
  { name: 'Natural Language Processing', category: 'AI & Research', tooltip: 'Text processing and language models' },
  { name: 'Large Language Models', category: 'AI & Research', tooltip: 'Transformer architectures and fine-tuning' },
  { name: 'arXiv Literature Review', category: 'AI & Research', tooltip: 'Staying current with latest research' },
  { name: 'Open Source Contribution', category: 'AI & Research', tooltip: 'Contributing to ML/AI projects' },
];
