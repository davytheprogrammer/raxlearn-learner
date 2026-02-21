import { TechOption, Project, createTask } from './types';

const createTechProject = (id: string, title: string, description: string, technologies: string[], difficulty: 'beginner' | 'intermediate' | 'advanced', customTasks: { title: string, desc: string }[]): Project => ({
    id,
    title,
    description,
    image: `/images/projects/${id}.jpg`,
    difficulty,
    duration: difficulty === 'beginner' ? '2-3 weeks' : difficulty === 'intermediate' ? '4-6 weeks' : '6-8 weeks',
    technologies,
    learningOutcomes: [
        `Master ${technologies.join(', ')} core concepts and advanced patterns`,
        `Build a complete, production-ready ${title.toLowerCase()}`,
        `Implement rigorous state management and data fetching workflows`,
        `Deploy the application with CI/CD and optimize performance metrics`
    ],
    tasks: customTasks.map((t, i) => createTask(`${id}-task-${i + 1}`, t.title, t.desc, difficulty))
});

export const webFrontendTechOptions: TechOption[] = [
    {
        id: 'react',
        title: 'React & Ecosystem',
        description: 'Master React, Hooks, Context API, Redux Toolkit, and React Router. Build highly interactive Single Page Applications handling complex global state and deeply nested component trees.',
        iconName: 'Zap',
        color: 'from-cyan-400 to-cyan-600',
        duration: '6-8 weeks',
        projects: [
            createTechProject('react-saas-dashboard', 'Enterprise SaaS Dashboard', 'Construct a high-performance business dashboard featuring heavy data visualization, drag-and-drop grid layouts, dynamic theming, and multi-step forms using React, Redux Toolkit, and Recharts. Focus heavily on memoization to maintain 60FPS during data mutations.', ['React', 'Redux Toolkit', 'Recharts', 'TailwindCSS'], 'advanced', [
                { title: 'Project Initialization & Theming', desc: 'Set up Vite, configure Tailwind, and build a robust CSS variables-based dynamic theming engine.' },
                { title: 'State Architecture', desc: 'Design the Redux store with strict typing for a massive financial mock-data set.' },
                { title: 'Advanced Visualizations', desc: 'Implement Recharts with custom tooltips, responsive containers, and highly animated SVG transitions.' },
                { title: 'Memoization & Profiling', desc: 'Use React Profiler to identify render bottlenecks and apply strict useMemo/useCallback patterns.' }
            ]),
            createTechProject('react-social-feed', 'Real-Time Social Feed', 'Develop a highly interactive social timeline supporting infinite scrolling, optimistic UI updates for likes and comments, complex media uploading, and WebSockets integration for real-time notification syncing.', ['React', 'Context API', 'Socket.io-client', 'Framer Motion'], 'intermediate', [
                { title: 'Feed UI & Virtualization', desc: 'Build the scrolling timeline using windowing/virtualization techniques to handle thousands of posts.' },
                { title: 'Optimistic Mutations', desc: 'Implement immediate visual feedback for likes and comments with rollback handlers on failure.' },
                { title: 'WebSocket Integration', desc: 'Connect to a mock realtime server to stream in notifications and live visitor counts.' }
            ])
        ]
    },
    {
        id: 'vue',
        title: 'Vue.js Framework',
        description: 'Create elegant, progressive applications with Vue 3. Deep dive into the Composition API, Pinia state management, Vue Router, and reactive paradigms to build maintainable, lightning-fast web interfaces.',
        iconName: 'Monitor',
        color: 'from-green-400 to-green-600',
        duration: '5-7 weeks',
        projects: [
            createTechProject('vue-ecommerce-platform', 'Vue 3 E-Commerce Storefront', 'Design a sophisticated digital storefront utilizing Vue 3 Composition API and Pinia. You will implement nested routing, complex product filtering using reactive computed properties, a persistent shopping cart, and a seamless checkout experience with payment gateway mocking.', ['Vue 3', 'Pinia', 'Vue Router', 'TailwindCSS'], 'advanced', [
                { title: 'Composition API Setup', desc: 'Architect reusable composables for cart logic, user authentication, and product catalog fetching.' },
                { title: 'Pinia State Design', desc: 'Build modular Pinia stores handling asynchronous actions for hydrating the shopping cart.' },
                { title: 'Advanced Filtering Options', desc: 'Create a complex sidebar filter combining color, size, and price using deeply reactive watchers.' },
                { title: 'Route Guards & Checkout', desc: 'Implement strict Vue Router navigation guards ensuring the user goes through proper checkout steps.' }
            ]),
            createTechProject('vue-task-kanban', 'Interactive Kanban Board', 'Build a reactive, drag-and-drop task management tool similar to Trello. Leverage deep reactivity to update multiple lists simultaneously, implement local storage persistence, and create complex nested components utilizing Vue Slots and Teleport.', ['Vue 3', 'VueDraggable', 'CSS Modules'], 'intermediate', [
                { title: 'Data Reactivity', desc: 'Establish the complex reactive tree of boards, lists, and individual task cards.' },
                { title: 'Drag and Drop Implementation', desc: 'Integrate Sortable.js/VueDraggable to enable fluid dragging across different list DOM contexts.' },
                { title: 'Modern Modal Management', desc: 'Use Vue Teleport to escape DOM hierarchies and perfectly layer task-edit modals.' }
            ])
        ]
    },
    {
        id: 'nextjs',
        title: 'Next.js Full-Stack Web',
        description: 'Build absolute production-ready applications with Next.js App Router. Master Server Components, Server Actions, streaming, SEO optimization, SSR/SSG, and deployed edge functions.',
        iconName: 'Globe',
        color: 'from-gray-700 to-gray-900',
        duration: '6-8 weeks',
        projects: [
            createTechProject('nextjs-publishing-platform', 'Full-Scale Publishing Platform', 'Engineer a complete Medium-clone blog platform utilizing Next.js 14 App Router. You will build highly optimized static reading pages taking advantage of ISR, complex authenticated writer dashboards using Server Actions, and implement rich text editing with automatic image optimization.', ['Next.js App Router', 'Server Actions', 'Prisma', 'NextAuth'], 'advanced', [
                { title: 'App Router Architecture', desc: 'Design the folder structure using Route Groups and Parallel Routes for the dashboard and reading views.' },
                { title: 'Server Components & Data Fetching', desc: 'Fetch article data directly in React Server Components to eliminate client-side loading spinners.' },
                { title: 'Form Mutations with Server Actions', desc: 'Build the article publication flow securely bypassing API routes entirely using useFormState.' },
                { title: 'Advanced Caching', desc: 'Implement precise path revalidation strategies so newly published articles appear instantly.' }
            ]),
            createTechProject('nextjs-seo-portfolio', 'Ultra-Optimized Portfolio', 'Construct a developer portfolio that aces Lighthouse scores. Dive deep into the Next.js Metadata API, sitemap generation, structured JSON-LD data, and Next/Image/Font optimizations.', ['Next.js', 'Framer Motion', 'TailwindCSS'], 'intermediate', [
                { title: 'SEO Foundations', desc: 'Use the new Metadata API to generate dynamic OpenGraph images and highly specific page titles.' },
                { title: 'Asset Optimization', desc: 'Configure next/image explicitly for modern formats and enforce rigorous LCP metric scores.' },
                { title: 'Dynamic API Routes', desc: 'Create a highly secure, rate-limited edge function API route to handle contact form submissions.' }
            ])
        ]
    },
    {
        id: 'angular',
        title: 'Angular Framework',
        description: 'Learn enterprise web application development with the highly opinionated Angular framework. Master TypeScript, Dependency Injection, RxJS Observables, NgRx state management, and component architecture.',
        iconName: 'Cpu',
        color: 'from-red-400 to-red-600',
        duration: '8-10 weeks',
        projects: [
            createTechProject('angular-erp-system', 'Corporate ERP Interface', 'Develop a massive enterprise resource planning (ERP) system module displaying highly complex intersecting datasets. You will use RxJS heavily to orchestrate multiple overlapping API requests, enforce strict TypeScript interfaces, and use Angular Material for a compliant UI.', ['Angular', 'TypeScript', 'RxJS', 'Angular Material'], 'advanced', [
                { title: 'Module Federation', desc: 'Architect the application using strict lazy-loading feature modules and standalone components.' },
                { title: 'Complex RxJS Pipelines', desc: 'Combine multiple simultaneous HTTP requests using forkJoin, switchMap, and combineLatest.' },
                { title: 'Custom Form Validators', desc: 'Build intricate asynchronous reactive form validators checking user inputs against live databases.' },
                { title: 'Dependency Injection Trees', desc: 'Create hierarchical singleton services and interceptors to handle auth tokens and global error states.' }
            ])
        ]
    },
    {
        id: 'html-css',
        title: 'HTML & Advanced CSS',
        description: 'Master the fundamental building blocks of the web. Move beyond basic styling to learn CSS Grid, Flexbox, keyframe animations, responsive design principles, and custom CSS properties.',
        iconName: 'Palette',
        color: 'from-emerald-400 to-emerald-600',
        duration: '3-5 weeks',
        projects: [
            createTechProject('css-grid-magazine', 'Interactive Digital Magazine', 'Create a visually stunning digital magazine layout relying exclusively on advanced CSS Grid and Flexbox structures without a framework. Focus on typographic hierarchy, complex asymmetrical grids, CSS variables for theming, and print stylesheets.', ['HTML5', 'CSS3 Grid', 'CSS Variables'], 'beginner', [
                { title: 'Semantic HTML Construction', desc: 'Use proper HTML5 document outlining, sectioning, and strict accessibility ARIA roles.' },
                { title: 'Advanced Grid Layouts', desc: 'Implement grid-template-areas and fractional units to create overlapping magazine features.' },
                { title: 'Responsive Reflows', desc: 'Build mobile-first media queries that drastically alter the grid structure seamlessly.' }
            ])
        ]
    },
    {
        id: 'javascript',
        title: 'JavaScript Deep Dive',
        description: 'Build native web functionality without frameworks. Master closures, the event loop, prototypes, asynchronous JavaScript (Promises/Async/Await), and DOM manipulation algorithms.',
        iconName: 'Code',
        color: 'from-yellow-400 to-yellow-600',
        duration: '4-6 weeks',
        projects: [
            createTechProject('vanilla-js-spreadsheet', 'Vanilla JS Spreadsheet Engine', 'Engineer an entire Excel-like spreadsheet running natively in the browser. You will write parsers for basic math formulas, implement an intricate event delegation system for the grid, and establish a reactive data model using ES6 Proxies.', ['Vanilla JavaScript', 'ES6+', 'DOM API'], 'advanced', [
                { title: 'Data Reactivity via Proxies', desc: 'Build a custom reactive state engine using native JavaScript Proxy objects to bind data to cells.' },
                { title: 'Formula Parser Engine', desc: 'Write a tokenizer and evaluator for basic cell formulas like =SUM(A1:B2) natively.' },
                { title: 'DOM Event Delegation', desc: 'Optimize memory by attaching a single event listener to the grid root instead of 1000 individual cells.' }
            ])
        ]
    }
];
