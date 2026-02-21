export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  requirements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  skills: string[];
  tasks: Task[];
  outcomes: string[];
}

export interface SkillPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalHours: number;
  projects: Project[];
  prerequisites?: string[];
}

export const SKILL_PATHS: SkillPath[] = [
  {
    id: 'web-frontend',
    title: 'Web Development - Frontend',
    description: 'Master modern frontend development with React, Next.js, and cutting-edge web technologies',
    icon: 'Layout',
    color: 'from-cyan-400 to-emerald-500',
    totalHours: 120,
    projects: [
      {
        id: 'react-basics',
        title: 'React Fundamentals',
        description: 'Learn React core concepts: components, hooks, state management, and the virtual DOM',
        image: '/projects/react-basics.jpg',
        difficulty: 'beginner',
        duration: 24,
        skills: ['React', 'JavaScript', 'JSX', 'Hooks'],
        tasks: [
          {
            id: 'task-1',
            title: 'Setup React Environment',
            description: 'Create your first React app using Create React App',
            difficulty: 'beginner',
            estimatedHours: 2,
            requirements: ['Node.js installed', 'npm knowledge'],
          },
          {
            id: 'task-2',
            title: 'Build Component Hierarchy',
            description: 'Create a multi-component Todo app',
            difficulty: 'beginner',
            estimatedHours: 4,
            requirements: ['Basic React knowledge'],
          },
          {
            id: 'task-3',
            title: 'Master React Hooks',
            description: 'Deep dive into useState, useEffect, and custom hooks',
            difficulty: 'intermediate',
            estimatedHours: 6,
            requirements: ['Component basics'],
          },
        ],
        outcomes: [
          'Understand React component model',
          'Build interactive UIs with hooks',
          'Manage component state effectively',
          'Create reusable components',
        ],
      },
      {
        id: 'nextjs-fullstack',
        title: 'Next.js Full Stack',
        description: 'Build complete web applications with Next.js, API routes, and databases',
        image: '/projects/nextjs-fullstack.jpg',
        difficulty: 'intermediate',
        duration: 40,
        skills: ['Next.js', 'API Routes', 'Server Components', 'Databases'],
        tasks: [
          {
            id: 'task-1',
            title: 'Next.js App Router',
            description: 'Create a multi-page app with the modern App Router',
            difficulty: 'intermediate',
            estimatedHours: 8,
            requirements: ['React knowledge', 'Basic routing concepts'],
          },
          {
            id: 'task-2',
            title: 'API Route Development',
            description: 'Build RESTful API endpoints with Next.js',
            difficulty: 'intermediate',
            estimatedHours: 8,
            requirements: ['HTTP concepts', 'RESTful design'],
          },
          {
            id: 'task-3',
            title: 'Database Integration',
            description: 'Connect to PostgreSQL and build a complete CRUD application',
            difficulty: 'advanced',
            estimatedHours: 16,
            requirements: ['SQL knowledge', 'API routes'],
          },
        ],
        outcomes: [
          'Build full-stack applications',
          'Create scalable API endpoints',
          'Integrate databases',
          'Deploy to production',
        ],
      },
    ],
  },
  {
    id: 'web-backend',
    title: 'Backend Development',
    description: 'Build robust server-side applications with Node.js, Express, and databases',
    icon: 'Server',
    color: 'from-green-400 to-emerald-500',
    totalHours: 140,
    projects: [
      {
        id: 'nodejs-basics',
        title: 'Node.js Fundamentals',
        description: 'Learn Node.js runtime, event loop, async/await, and file systems',
        image: '/projects/nodejs-basics.jpg',
        difficulty: 'beginner',
        duration: 28,
        skills: ['Node.js', 'JavaScript', 'Async/Await', 'Event Loop'],
        tasks: [
          {
            id: 'task-1',
            title: 'Node.js Basics',
            description: 'Understand Node.js runtime and modules',
            difficulty: 'beginner',
            estimatedHours: 4,
            requirements: ['JavaScript fundamentals'],
          },
          {
            id: 'task-2',
            title: 'Asynchronous JavaScript',
            description: 'Master callbacks, promises, and async/await',
            difficulty: 'intermediate',
            estimatedHours: 8,
            requirements: ['JavaScript basics'],
          },
          {
            id: 'task-3',
            title: 'File System & Streams',
            description: 'Work with files and handle large data streams',
            difficulty: 'intermediate',
            estimatedHours: 6,
            requirements: ['Node.js basics'],
          },
        ],
        outcomes: [
          'Understand Node.js event-driven architecture',
          'Handle asynchronous operations',
          'Work with file systems',
          'Build command-line tools',
        ],
      },
      {
        id: 'express-apis',
        title: 'Express & REST APIs',
        description: 'Build production-ready REST APIs with Express framework',
        image: '/projects/express-apis.jpg',
        difficulty: 'intermediate',
        duration: 44,
        skills: ['Express', 'REST', 'Middleware', 'Error Handling'],
        tasks: [
          {
            id: 'task-1',
            title: 'Express Server Setup',
            description: 'Create and configure an Express server',
            difficulty: 'beginner',
            estimatedHours: 4,
            requirements: ['Node.js knowledge'],
          },
          {
            id: 'task-2',
            title: 'REST API Design',
            description: 'Design and implement proper REST endpoints',
            difficulty: 'intermediate',
            estimatedHours: 12,
            requirements: ['HTTP concepts', 'REST principles'],
          },
          {
            id: 'task-3',
            title: 'Authentication & Authorization',
            description: 'Implement JWT and session-based auth',
            difficulty: 'advanced',
            estimatedHours: 12,
            requirements: ['API knowledge', 'Security concepts'],
          },
        ],
        outcomes: [
          'Build REST APIs',
          'Implement authentication',
          'Handle errors gracefully',
          'Deploy APIs',
        ],
      },
    ],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Create cross-platform mobile apps with React Native and Flutter',
    icon: 'Smartphone',
    color: 'from-teal-400 to-pink-500',
    totalHours: 130,
    projects: [
      {
        id: 'react-native-basics',
        title: 'React Native Fundamentals',
        description: 'Learn React Native for iOS and Android development',
        image: '/projects/react-native-basics.jpg',
        difficulty: 'intermediate',
        duration: 32,
        skills: ['React Native', 'Mobile UI', 'Navigation', 'Native Modules'],
        tasks: [
          {
            id: 'task-1',
            title: 'React Native Setup',
            description: 'Setup Expo and create your first mobile app',
            difficulty: 'beginner',
            estimatedHours: 4,
            requirements: ['React knowledge'],
          },
          {
            id: 'task-2',
            title: 'Mobile UI Components',
            description: 'Build responsive mobile interfaces',
            difficulty: 'intermediate',
            estimatedHours: 10,
            requirements: ['React Native basics'],
          },
          {
            id: 'task-3',
            title: 'Navigation & State',
            description: 'Implement complex navigation and global state',
            difficulty: 'intermediate',
            estimatedHours: 12,
            requirements: ['Components and styling'],
          },
        ],
        outcomes: [
          'Build iOS and Android apps',
          'Create mobile UIs',
          'Manage navigation',
          'Handle platform differences',
        ],
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science & ML',
    description: 'Learn data analysis, machine learning, and AI with Python',
    icon: 'BarChart3',
    color: 'from-orange-400 to-red-500',
    totalHours: 150,
    projects: [
      {
        id: 'python-basics',
        title: 'Python for Data Science',
        description: 'Master Python, NumPy, Pandas, and data visualization',
        image: '/projects/python-basics.jpg',
        difficulty: 'beginner',
        duration: 40,
        skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
        tasks: [
          {
            id: 'task-1',
            title: 'Python Fundamentals',
            description: 'Learn Python syntax and data structures',
            difficulty: 'beginner',
            estimatedHours: 8,
            requirements: ['Programming basics'],
          },
          {
            id: 'task-2',
            title: 'Data Manipulation with Pandas',
            description: 'Work with tabular data and DataFrames',
            difficulty: 'intermediate',
            estimatedHours: 12,
            requirements: ['Python basics'],
          },
          {
            id: 'task-3',
            title: 'Data Visualization',
            description: 'Create compelling visualizations with Matplotlib and Seaborn',
            difficulty: 'intermediate',
            estimatedHours: 10,
            requirements: ['Pandas knowledge'],
          },
        ],
        outcomes: [
          'Manipulate data effectively',
          'Create visualizations',
          'Perform exploratory data analysis',
          'Handle real-world datasets',
        ],
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning Fundamentals',
        description: 'Learn supervised learning, classification, and regression',
        image: '/projects/machine-learning.jpg',
        difficulty: 'advanced',
        duration: 50,
        skills: ['scikit-learn', 'ML Algorithms', 'Model Evaluation', 'Feature Engineering'],
        tasks: [
          {
            id: 'task-1',
            title: 'ML Fundamentals',
            description: 'Understand supervised and unsupervised learning',
            difficulty: 'intermediate',
            estimatedHours: 10,
            requirements: ['Python and Pandas'],
          },
          {
            id: 'task-2',
            title: 'Classification Algorithms',
            description: 'Build classifiers with decision trees, SVM, and ensemble methods',
            difficulty: 'advanced',
            estimatedHours: 18,
            requirements: ['ML fundamentals'],
          },
          {
            id: 'task-3',
            title: 'Model Evaluation & Deployment',
            description: 'Evaluate models and deploy to production',
            difficulty: 'advanced',
            estimatedHours: 12,
            requirements: ['Classification knowledge'],
          },
        ],
        outcomes: [
          'Build machine learning models',
          'Evaluate model performance',
          'Handle imbalanced data',
          'Deploy models to production',
        ],
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Master deployment, containerization, and cloud infrastructure',
    icon: 'Cloud',
    color: 'from-emerald-400 to-cyan-500',
    totalHours: 110,
    projects: [
      {
        id: 'docker-basics',
        title: 'Docker & Containerization',
        description: 'Learn Docker, containers, and container orchestration',
        image: '/projects/docker-basics.jpg',
        difficulty: 'intermediate',
        duration: 36,
        skills: ['Docker', 'Containers', 'Docker Compose', 'Images'],
        tasks: [
          {
            id: 'task-1',
            title: 'Docker Fundamentals',
            description: 'Understand containers and Docker architecture',
            difficulty: 'beginner',
            estimatedHours: 6,
            requirements: ['Linux basics'],
          },
          {
            id: 'task-2',
            title: 'Building Docker Images',
            description: 'Create Dockerfiles and build optimized images',
            difficulty: 'intermediate',
            estimatedHours: 12,
            requirements: ['Docker basics'],
          },
          {
            id: 'task-3',
            title: 'Multi-Container Apps',
            description: 'Use Docker Compose for complex applications',
            difficulty: 'intermediate',
            estimatedHours: 10,
            requirements: ['Docker images'],
          },
        ],
        outcomes: [
          'Containerize applications',
          'Create efficient Docker images',
          'Manage multi-container applications',
          'Deploy with Docker',
        ],
      },
    ],
  },
];

export function getSkillPathById(id: string): SkillPath | undefined {
  return SKILL_PATHS.find(path => path.id === id);
}

export function getProjectById(projectId: string): Project | undefined {
  for (const path of SKILL_PATHS) {
    const project = path.projects.find(p => p.id === projectId);
    if (project) return project;
  }
  return undefined;
}
