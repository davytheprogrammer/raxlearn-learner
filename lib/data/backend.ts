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
        `Implement strict testing, caching, and concurrent architectures`,
        `Design resilient deployment strategies`
    ],
    tasks: customTasks.map((t, i) => createTask(`${id}-task-${i + 1}`, t.title, t.desc, difficulty))
});

export const backendTechOptions: TechOption[] = [
    {
        id: 'nodejs',
        title: 'Node.js & Express',
        description: 'Master asynchronous JavaScript on the server. Build massively concurrent APIs utilizing Express, understand the Event Loop intricately, orchestrate raw database queries alongside ORMs like Prisma, and implement JSON Web Token (JWT) secured middleware.',
        iconName: 'Server',
        color: 'from-green-500 to-green-700',
        duration: '4-6 weeks',
        projects: [
            createTechProject('node-payment-gateway', 'Distributed Payment Microservice', 'Build a reliable Node.js payment microservice mapping to Stripe. You will architect robust asynchronous webhook listeners to guarantee idempotent database transactions across MongoDB and Redis cache.', ['Node.js', 'Express', 'Redis', 'Stripe API'], 'advanced', [
                { title: 'Asynchronous Express Setup', desc: 'Configure middleware securely using Helmet, body-parser, and an Express error handling abstraction.' },
                { title: 'Idempotency and Webhooks', desc: 'Securely verify Stripe webhook signatures and design a Redis lock to process payments exactly once.' },
                { title: 'Caching Engine', desc: 'Implement in-memory Redis caching to speed up high-traffic product endpoint queries.' }
            ]),
            createTechProject('node-graphql-federation', 'Federated GraphQL Hub', 'Implement an advanced GraphQL API that federates data from multiple legacy REST services into a single graph. Implement Apollo Server, dataloaders to solve N+1 problems, and robust authentication.', ['Node.js', 'Apollo Server', 'GraphQL'], 'intermediate', [
                { title: 'Schema Definition', desc: 'Design strict GraphQL types, queries, and mutations mapping to the underlying REST databases.' },
                { title: 'Dataloader Implementation', desc: 'Cache heavily requested relations to avoid querying the SQL database redundantly.' },
                { title: 'JWT Context Authentication', desc: 'Extract and verify JWT headers gracefully inserting the active user into the GraphQL context.' }
            ])
        ]
    },
    {
        id: 'python',
        title: 'Python (Django & FastAPI)',
        description: 'Leverage Python for rock-solid web applications. Build massive scalable apps with the batteries-included Django framework, and lightning-fast asynchronous microservices via FastAPI and Pydantic.',
        iconName: 'Code',
        color: 'from-emerald-500 to-yellow-500',
        duration: '4-6 weeks',
        projects: [
            createTechProject('django-enterprise-crm', 'Django Corporate CRM', 'Architect a sprawling Customer Relationship Management (CRM) template with Django. Emphasize complex relational PostgreSQL models, the Django ORM query optimizer (select_related), strict unit testing, and the Django Admin dashboard customizations.', ['Python', 'Django', 'PostgreSQL'], 'advanced', [
                { title: 'Relational Model Design', desc: 'Design complex many-to-many model mappings for clients, invoices, and distinct employee tiers.' },
                { title: 'ORM Query Optimization', desc: 'Utilize prefetch_related and select_related properly to eliminate terrifying N+1 database bottlenecks.' },
                { title: 'Custom Django Admin', desc: 'Override the default admin templates and forms to provide a deeply branded employee portal.' }
            ]),
            createTechProject('fastapi-streaming-engine', 'FastAPI Data Streamer', 'Develop a hyper-performant, async-first data streaming tool with FastAPI. This project enforces strict data validation using Pydantic, leverages asynchronous SQLAlchemy connections, and serves live WebSockets easily.', ['Python', 'FastAPI', 'Pydantic', 'AsyncIO'], 'intermediate', [
                { title: 'Pydantic Type Schemas', desc: 'Declare explicitly typed data classes to strictly filter and validate all incoming and outgoing API traffic.' },
                { title: 'Async SQLAlchemy', desc: 'Configure the database bindings heavily prioritizing non-blocking async operations under heavy load.' },
                { title: 'Background Tasks', desc: 'Push long-running computational jobs into FastAPI background task managers effortlessly.' }
            ])
        ]
    },
    {
        id: 'java',
        title: 'Java Spring Boot',
        description: 'Enter the corporate giant of backend infrastructure. Build strictly typed, immensely secure enterprise-grade systems utilizing Spring Boot, JPA/Hibernate, Spring Security, and Maven.',
        iconName: 'Coffee',
        color: 'from-red-500 to-orange-500',
        duration: '5-8 weeks',
        projects: [
            createTechProject('spring-logistics-core', 'Logistics Fleet Backend', 'Build a core monolithic tracking application using Spring Boot. Emphasize extensive Object-Oriented patterns, pure JPA entity relationships, and rock-solid Spring Security roles preventing unauthorized truck manipulations.', ['Java', 'Spring Boot', 'Hibernate DB'], 'advanced', [
                { title: 'Entity Annotations', desc: 'Map Java objects precisely to MySQL tables handling strictly cascading deletes and foreign keys.' },
                { title: 'Spring Security Filter Chains', desc: 'Implement JWT-based authentication overriding the core Spring Security protocols with custom HTTP filters.' },
                { title: 'JUNIT Integration Testing', desc: 'Mock the repository data seamlessly creating hermetic integration tests mimicking production.' }
            ])
        ]
    },
    {
        id: 'go',
        title: 'Go (Golang)',
        description: 'Develop high-performance, strictly typed network infrastructure. Learn Golang primitives, Goroutine concurrency, Channels, interface polymorphism, and compile completely static binaries.',
        iconName: 'Zap',
        color: 'from-cyan-500 to-emerald-500',
        duration: '4-6 weeks',
        projects: [
            createTechProject('go-concurrent-crawler', 'Concurrent Web Crawler', 'Write a blazingly fast URL crawler capitalizing entirely on Goroutines and Channels to handle 10,000+ simultaneous external requests. You will build custom worker pools and strict synchronization mutexes heavily.', ['Go', 'Concurrency', 'Channels', 'gRPC'], 'advanced', [
                { title: 'Worker Pool Architecture', desc: 'Distribute URL fetching tasks across a fixed set of concurrent Goroutines utilizing unbuffered channels.' },
                { title: 'Mutex Data Races', desc: 'Protect shared map architectures implementing sync.RWMutex appropriately to avoid terrifying memory panics.' },
                { title: 'gRPC Microservice API', desc: 'Expose the crawler results engine over a blisteringly fast gRPC Protocol Buffers interface.' }
            ])
        ]
    }
];
