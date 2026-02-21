export interface Task {
    id: string;
    title: string;
    description: string;
    detailed_instructions?: string;
    starter_code?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    learningOutcomes: string[];
    prerequisites: string[];
    resources: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    technologies: string[];
    learningOutcomes: string[];
    tasks: Task[];
}

export interface TechOption {
    id: string;
    title: string;
    description: string;
    iconName: string;
    color: string;
    duration: string;
    projects: Project[]; // Explicitly attaching projects to the tech option
}

export interface SkillPath {
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    color: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    students: number;
    rating: number;
    techOptions: TechOption[];
}

// Helper to generate contextual resources based on task keywords
function generateResources(title: string, description: string): string[] {
    const text = `${title} ${description}`.toLowerCase();
    const resources: string[] = [];

    if (text.includes('react') || text.includes('hook') || text.includes('jsx') || text.includes('component')) {
        resources.push('https://react.dev/learn');
    }
    if (text.includes('next') || text.includes('server component') || text.includes('app router')) {
        resources.push('https://nextjs.org/docs');
    }
    if (text.includes('vue') || text.includes('pinia') || text.includes('composition api')) {
        resources.push('https://vuejs.org/guide/introduction.html');
    }
    if (text.includes('typescript') || text.includes('typed') || text.includes('typing')) {
        resources.push('https://www.typescriptlang.org/docs/');
    }
    if (text.includes('css') || text.includes('tailwind') || text.includes('style') || text.includes('layout') || text.includes('grid') || text.includes('flex')) {
        resources.push('https://developer.mozilla.org/en-US/docs/Web/CSS');
    }
    if (text.includes('api') || text.includes('fetch') || text.includes('rest') || text.includes('endpoint')) {
        resources.push('https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API');
    }
    if (text.includes('node') || text.includes('express') || text.includes('server')) {
        resources.push('https://nodejs.org/en/docs/');
    }
    if (text.includes('docker') || text.includes('container') || text.includes('kubernetes')) {
        resources.push('https://docs.docker.com/get-started/');
    }
    if (text.includes('python') || text.includes('pandas') || text.includes('flask') || text.includes('django')) {
        resources.push('https://docs.python.org/3/');
    }
    if (text.includes('database') || text.includes('sql') || text.includes('prisma') || text.includes('postgres')) {
        resources.push('https://www.prisma.io/docs');
    }
    if (text.includes('test') || text.includes('jest') || text.includes('mocha') || text.includes('assert')) {
        resources.push('https://jestjs.io/docs/getting-started');
    }
    if (text.includes('git') || text.includes('commit') || text.includes('branch')) {
        resources.push('https://git-scm.com/doc');
    }
    if (text.includes('websocket') || text.includes('socket') || text.includes('realtime') || text.includes('real-time')) {
        resources.push('https://socket.io/docs/v4/');
    }
    if (text.includes('redux') || text.includes('state management') || text.includes('store')) {
        resources.push('https://redux-toolkit.js.org/introduction/getting-started');
    }
    if (text.includes('animation') || text.includes('framer') || text.includes('motion')) {
        resources.push('https://www.framer.com/motion/');
    }

    // Always include MDN as a baseline web reference
    if (resources.length === 0) {
        resources.push('https://developer.mozilla.org/en-US/docs/Web');
    }

    // Cap at 4 resources
    return resources.slice(0, 4);
}

// Helper to generate contextual learning outcomes
function generateOutcomes(title: string, description: string): string[] {
    const t = title.toLowerCase();
    const d = description.toLowerCase();
    const outcomes: string[] = [];

    // First outcome: always about the primary skill in the title
    outcomes.push(`Understand the architecture and implementation patterns behind ${title.toLowerCase()}`);

    // Second: derived from the description
    if (d.includes('secur') || d.includes('auth')) outcomes.push('Implement robust security practices and authentication flows');
    else if (d.includes('perform') || d.includes('optim')) outcomes.push('Profile and optimize code for production-grade performance');
    else if (d.includes('test') || d.includes('assert')) outcomes.push('Write comprehensive automated tests with high code coverage');
    else outcomes.push('Write clean, modular, production-ready code following industry conventions');

    // Third: about debugging / problem-solving
    outcomes.push('Debug complex issues using browser dev tools, logs, and systematic reasoning');

    // Fourth: always about shipping
    outcomes.push('Ship a polished, working feature that you can showcase in your portfolio');

    return outcomes;
}

// Helper: generate contextual prerequisites
function generatePrerequisites(title: string, description: string, difficulty: string): string[] {
    if (difficulty === 'beginner') return [];
    const text = `${title} ${description}`.toLowerCase();
    const prereqs: string[] = [];

    if (difficulty === 'advanced') prereqs.push('Solid understanding of programming fundamentals and data structures');
    else prereqs.push('Basic programming experience in any language');

    if (text.includes('react') || text.includes('vue') || text.includes('next') || text.includes('angular')) prereqs.push('Familiarity with HTML, CSS, and JavaScript (ES6+)');
    if (text.includes('api') || text.includes('server') || text.includes('backend')) prereqs.push('Understanding of HTTP methods and REST principles');
    if (text.includes('database') || text.includes('sql') || text.includes('prisma')) prereqs.push('Basic knowledge of relational or NoSQL databases');
    if (text.includes('docker') || text.includes('kubernetes') || text.includes('ci/cd')) prereqs.push('Comfort with terminal/command-line interfaces');
    if (text.includes('typescript')) prereqs.push('Working knowledge of JavaScript');

    return prereqs.slice(0, 3);
}

export const createTask = (id: string, title: string, description: string, difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Task => ({
    id,
    title,
    description,
    difficulty,
    duration: difficulty === 'beginner' ? '2-3 hours' : difficulty === 'intermediate' ? '4-6 hours' : '8-12 hours',
    learningOutcomes: generateOutcomes(title, description),
    prerequisites: generatePrerequisites(title, description, difficulty),
    resources: generateResources(title, description),
});
