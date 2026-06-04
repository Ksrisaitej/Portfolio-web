export interface Project {
  id: number;
  title: string;
  tags: string[];
  year: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Oxford 102 Flower Classification',
    tags: ['CNN', 'Transfer Learning', 'PyTorch', 'ResNet'],
    year: '2025',
    image: '/projects/flower-classification.jpg',
    githubUrl: 'https://github.com/Ksrisaitej',
  },
  {
    id: 2,
    title: 'Siamese Network Signature Approval',
    tags: ['Siamese Network', 'Contrastive Loss', 'One-Shot Learning'],
    year: '2025',
    image: '/projects/signature-approval.jpg',
    githubUrl: 'https://github.com/Ksrisaitej',
  },
  {
    id: 3,
    title: 'Leviathan Time Series Classification',
    tags: ['CNN', 'LSTM', 'Time Series', 'Deep Learning'],
    year: '2025',
    image: '/projects/leviathan-timeseries.jpg',
    githubUrl: 'https://github.com/Ksrisaitej',
  },
  {
    id: 4,
    title: 'Smart Helmet Accident Detection',
    tags: ['MPU6050', 'GPS', 'GSM', 'IIT KGP'],
    year: '2025',
    image: '/projects/smart-helmet.jpg',
    githubUrl: 'https://github.com/Ksrisaitej',
  },
  {
    id: 5,
    title: 'Handwritten Digit Recognition',
    tags: ['MNIST', 'CNN', 'PyTorch', 'Deep Learning'],
    year: '2025',
    image: '/projects/digit-recognition.jpg',
    githubUrl: 'https://github.com/Ksrisaitej',
  },
  {
    id: 6,
    title: 'Transient Detection Using SVM',
    tags: ['SVM', 'Scikit-Learn', 'Machine Learning', 'Signal Processing'],
    year: '2025',
    image: '/projects/transient-detection.jpg',
    githubUrl: 'https://github.com/Ksrisaitej',
  },
];
