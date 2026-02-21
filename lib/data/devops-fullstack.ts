import { TechOption, Project, createTask } from './types';

const createTechProject = (id: string, title: string, description: string, technologies: string[], difficulty: 'beginner' | 'intermediate' | 'advanced', customTasks: { title: string, desc: string }[]): Project => ({
    id,
    title,
    description,
    image: `/images/projects/${id}.jpg`,
    difficulty,
    duration: difficulty === 'beginner' ? '2-4 weeks' : difficulty === 'intermediate' ? '4-6 weeks' : '6-8 weeks',
    technologies,
    learningOutcomes: [
        `Master foundational ${technologies[0]} architecture and operational excellence`,
        `Build, configure, and secure the ${title.toLowerCase()} completely from scratch`,
        `Implement highly-available redundancy and strictly audited deployment pipelines`,
        `Establish comprehensive system observability (logs, metrics, and alerts)`
    ],
    tasks: customTasks.map((t, i) => createTask(`${id}-task-${i + 1}`, t.title, t.desc, difficulty))
});

export const devopsTechOptions: TechOption[] = [
    {
        id: 'docker',
        title: 'Docker & Containerization',
        description: 'Isolate infrastructure using lightweight Linux namespaces via Docker. Master writing hyper-optimized multi-stage Dockerfiles, managing persistent volumes, orchestrating Docker Compose micro-networks, and establishing secure image registries.',
        iconName: 'Box',
        color: 'from-emerald-400 to-emerald-600',
        duration: '2-4 weeks',
        projects: [
            createTechProject('docker-compose-stack', 'Multi-Tier Microservice Stack', 'Deploy a massive multi-container stack natively. Write strict, extremely low-footprint Alpine Linux-based Dockerfiles for Node APIs, Python workers, and a Redis cache, orchestrated beautifully across a custom internal Docker bridging network.', ['Docker', 'Docker Compose', 'Alpine Linux', 'Nginx Reverse Proxy'], 'intermediate', [
                { title: 'Multi-Stage Builds', desc: 'Shed gigabytes of image weight by strictly compiling dependencies in builder stages and copying exclusively the binaries.' },
                { title: 'Complex Compose Sub-Networks', desc: 'Isolate the Redis cache onto a private backend bridge entirely unreachable by the public-facing Nginx container.' },
                { title: 'Volume Persistence Strategy', desc: 'Mount localized named volumes ensuring the core database survives aggressive container purges and recreations.' }
            ])
        ]
    },
    {
        id: 'kubernetes',
        title: 'Kubernetes Orchestration',
        description: 'Command massive cloud clusters operating at planet-scale. Write declarative YAML manifests for Pods, ReplicaSets, and Deployments. Master intricate StatefulSets, DaemonSets, robust Liveness Probes, and Helm package rollouts.',
        iconName: 'Terminal',
        color: 'from-cyan-500 to-emerald-700',
        duration: '6-8 weeks',
        projects: [
            createTechProject('k8s-high-availability', 'Zero-Downtime Cluster Migration', 'Architect an indestructible Kubernetes application architecture. You will enforce strict Pod Anti-Affinity rules dynamically scattering nodes across physical AWS Availability Zones, implement horizontal pod autoscaling under stress, and execute rolling mathematical blue-green updates.', ['Kubernetes', 'Helm', 'kubectl', 'HPA'], 'advanced', [
                { title: 'Horizontal Pod Autoscaling (HPA)', desc: 'Configure HPA metric servers scaling the frontend deployment dynamically when CPU spikes breach 75% thresholds.' },
                { title: 'Readiness & Liveness Probes', desc: 'Prevent catastrophic outages by explicitly pinging active health endpoints before Kubernetes assigns massive traffic to a pod.' },
                { title: 'Helm Templating Deployment', desc: 'Extract hardcoded YAML variables into a dynamic Helm chart allowing instant dev/staging/prod namespace branching.' }
            ])
        ]
    },
    {
        id: 'aws',
        title: 'Amazon Web Services (AWS)',
        description: 'Master the behemoth of public clouds configuring precise VPC subdivisions, Identity Access Management (IAM) permissions, ELB load balancers, RDS databases, and massive S3 storage protocols utilizing raw infrastructure as code.',
        iconName: 'Cloud',
        color: 'from-yellow-500 to-orange-500',
        duration: '6-8 weeks',
        projects: [
            createTechProject('aws-terraform-vpc', 'Automated VPC Architecture via Terraform', 'Eradicate manual cloud clicking. Script an entire highly-available multi-zone Virtual Private Cloud utilizing the Terraform HCL language. Formulate strict public/private subnets, explicit Internet Gateway routes, and hermetic EC2 bastion jump hosts.', ['AWS VPC', 'Terraform HCL', 'AWS IAM', 'EC2 AutoScaling'], 'advanced', [
                { title: 'Terraform State Management', desc: 'Initialize standard S3 remote-state backends bound strictly via DynamoDB stat-locking preventing concurrent corruption.' },
                { title: 'Multi-AZ Subnet Scaffolding', desc: 'Loop explicitly through AWS Availability Zones establishing interconnected private NAT-routed database subnets securely.' },
                { title: 'IAM Least Privilege Generation', desc: 'Generate dense JSON IAM policies programmatically restricting exactly what S3 buckets the EC2 instances can traverse.' }
            ])
        ]
    },
    {
        id: 'ci-cd',
        title: 'CI/CD Pipelines (GitHub Actions)',
        description: 'Automate deployment pipelines aggressively. Eliminate manual human deployments by scripting intense CI/CD workflows running parallel matrix unit tests, mandatory SonarQube formatting restrictions, and continuous CD deployment hooks merging to main.',
        iconName: 'GitMerge',
        color: 'from-gray-600 to-gray-800',
        duration: '3-5 weeks',
        projects: [
            createTechProject('github-actions-matrix', 'Enterprise E-2-E Pipeline', 'Construct an industrial software release pipeline utilizing GitHub Actions. Force the runner to execute the test suite concurrently across Node 18/20 and matrixed OS platforms, inject secured repository secrets magically, and push explicit tagged binary semantic releases automatically.', ['GitHub Actions', 'Semantic Release', 'Docker Registry', 'Bash Shell'], 'intermediate', [
                { title: 'Matrix Paralleled Jobs', desc: 'Instantiate multiple isolated GitHub runner environments slashing 30-minute test suite waiting times down to exclusively 5 minutes.' },
                { title: 'Docker Image Promotion', desc: 'Authenticate via OIDC protocols logging instantly into DockerHub passing massive immutable SHA-256 image tags.' },
                { title: 'Automated Semantic Versioning', desc: 'Analyze the conventional git-commit syntax strictly incrementing the Major/Minor/Patch versioning tags automatically upon PR merges.' }
            ])
        ]
    }
];

export const fullStackTechOptions: TechOption[] = [
    {
        id: 'mern',
        title: 'MERN Stack Applications',
        description: 'Harness the pure power of MongoDB, Express, React, and Node (MERN). Completely dominate universal JavaScript bridging dynamic React client-trees effortlessly with massive non-relational NoSQL BSON document databases.',
        iconName: 'Database',
        color: 'from-green-500 to-emerald-500',
        duration: '6-8 weeks',
        projects: [
            createTechProject('mern-airbnb-clone', 'Global Booking Marketplace', 'Build an extensive Airbnb clone scaling across hundreds of mock geographic nodes. You will heavily utilize mongoose aggregations checking date-range overlapping availabilities, enforce strict React-Router lazy loading paths securely checked with HTTP-only cookies, and implement Mapbox API geometries.', ['MongoDB Aggregations', 'Express APIs', 'React (Vite)', 'Node.js'], 'advanced', [
                { title: 'MongoDB Geolocational Queries', desc: 'Index property locations intensely using MongoDB 2dsphere mapping enabling instantaneous radius-based geographic queries.' },
                { title: 'Advanced Overlap Aggregations', desc: 'Script sprawling $lookup and $match Mongoose pipelines comparing thousands of array booking dates preventing double-rents.' },
                { title: 'Strict HTTP-Only Cookie Auth', desc: 'Secure the Express application actively refusing localStorage JWTs, setting strictly locked HTTP-Only secured cookies intercepting client-side JS.' },
                { title: 'Concurrent Image Uploading', desc: 'Use Multer strictly throttling massive AWS S3 multipart image uploads directly from the React client-side browser.' }
            ])
        ]
    },
    {
        id: 'nextjs',
        title: 'Next.js & Prisma Stack',
        description: 'Architect bleeding-edge full stack software utilizing the highly integrated Next.js ecosystem. Marry React Server Components strictly onto Postgres SQL schemas via the strictly-typed Prisma ORM bridging client, server, and database safely.',
        iconName: 'Globe',
        color: 'from-gray-700 to-black',
        duration: '6-8 weeks',
        projects: [
            createTechProject('next-prisma-saas', 'Multi-Tenant Micro SaaS', 'Engineer an immense production SaaS skeleton utilizing Next.js 14. Write heavily secured Server Actions mutating the relational PostgreSQL database via Prisma, implement strict multi-tenant authorization preventing users accessing adjacent organizations, and map seamless Stripe subscription webhooks.', ['Next.js 14 App Router', 'Prisma ORM', 'PostgreSQL', 'Stripe Webhooks'], 'advanced', [
                { title: 'Prisma Schema Modeling', desc: 'Map highly relational multi-tenant PostgreSQL cascades strictly delineating Organization -> User -> Subscription limits.' },
                { title: 'React Server Action Mutations', desc: 'Formulate heavily typed Zod-verified server mutation files executed absolutely invisibly avoiding client boundary REST APIs.' },
                { title: 'Stripe SaaS Subscriptions', desc: 'Verify Stripe event headers securely syncing upgrading/downgrading webhooks asynchronously with the Prisma database.' }
            ])
        ]
    }
];
