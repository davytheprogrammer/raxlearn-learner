import { TechOption, Project, createTask } from './types';

const createTechProject = (id: string, title: string, description: string, technologies: string[], difficulty: 'beginner' | 'intermediate' | 'advanced', customTasks: { title: string, desc: string }[]): Project => ({
    id,
    title,
    description,
    image: `/images/projects/${id}.jpg`,
    difficulty,
    duration: difficulty === 'beginner' ? '3-5 weeks' : difficulty === 'intermediate' ? '5-7 weeks' : '8-10 weeks',
    technologies,
    learningOutcomes: [
        `Master foundational ${technologies[0]} architecture and operational excellence`,
        `Build, configure, and secure the ${title.toLowerCase()} completely from scratch`,
        `Implement highly-available redundancy and strictly audited integration pipelines`,
        `Establish comprehensive system observability (logs, metrics, and alerts)`
    ],
    tasks: customTasks.map((t, i) => createTask(`${id}-task-${i + 1}`, t.title, t.desc, difficulty))
});

export const web3TechOptions: TechOption[] = [
    {
        id: 'solidity',
        title: 'Solidity Smart Contracts',
        description: 'Engineer the backbone of decentralized finance. Audit, write, and deploy immutable Ethereum Smart Contracts. Strictly master mitigating re-entrancy attacks, optimizing gas Gwei calculations, and adopting ERC-20/ERC-721 token standards heavily.',
        iconName: 'Code',
        color: 'from-gray-500 to-gray-700',
        duration: '6-8 weeks',
        projects: [
            createTechProject('solidity-defi-dex', 'Decentralized AMM Exchange', 'Develop a sprawling Decentralized Exchange (DEX) utilizing the Automated Market Maker (AMM) constant product formula. You will architect multiple overlapping liquidity pools securely mitigating impermanent loss utilizing OpenZeppelin libraries.', ['Solidity', 'Hardhat', 'Ethers.js', 'OpenZeppelin'], 'advanced', [
                { title: 'AMM Liquidity Pools', desc: 'Code mathematically pristine k = x * y liquidity equations strictly preventing integer overflows / underflows.' },
                { title: 'Re-Entrancy Guards', desc: 'Securely barricade all external token transfer functions locking the contract state completely executing the Check-Effects-Interactions pattern.' },
                { title: 'Hardhat Mocha Testing', desc: 'Deploy massive local Ethereum testnets scripting intense asynchronous assertions simulating terrible network congestion.' }
            ])
        ]
    },
    {
        id: 'react-web3',
        title: 'Web3 & React DApps',
        description: 'Construct completely decentralized, permissionless web applications. Marry standard React SPA methodologies with the Ethers.js and Wagmi libraries connecting native crypto wallets and reading real-time blockchain states.',
        iconName: 'Globe',
        color: 'from-emerald-400 to-teal-500',
        duration: '4-6 weeks',
        projects: [
            createTechProject('web3-nft-mint', 'NFT Minting Interface', 'Build a fully responsive Web3 minting engine capturing user MetaMask injections instantly. Read the current live smart contract supply cleanly, calculate accurate arbitrary network gas estimates, and formulate a secure transaction submission workflow.', ['React', 'Wagmi.sh', 'Viem', 'WalletConnect'], 'intermediate', [
                { title: 'Wagmi Provider Configuration', desc: 'Establish resilient multi-chain provider networks falling back onto public Alchemy / Infura nodes automatically.' },
                { title: 'Live Contract Mapping', desc: 'Read deeply encoded ABI parameters calculating real-time mint limits securely via React Hooks.' },
                { title: 'WalletConnect Integration', desc: 'Incorporate massive universal wallet connectors bridging Mobile-first MetaMask applications instantly into the browser.' }
            ])
        ]
    }
];

export const aiMlTechOptions: TechOption[] = [
    {
        id: 'openai-api',
        title: 'OpenAI Integrations',
        description: 'Integrate groundbreaking Large Language Models straight into production codebases. Leverage GPT-4 vision APIs, structure JSON constraints, master extensive prompt engineering contexts, and implement DALL-E image generation streams.',
        iconName: 'Cpu',
        color: 'from-green-500 to-emerald-700',
        duration: '3-5 weeks',
        projects: [
            createTechProject('openai-customer-support', 'Autonomous AI Support Agent', 'Engineer a serverless customer support bot heavily utilizing the Assistants API. Maintain isolated conversation threads automatically, securely inject semantic company-specific knowledge documents via the Retrieval framework, and structure robust tools allowing the AI to query databases.', ['OpenAI API', 'Node.js', 'Vercel Edge', 'Pinecone'], 'intermediate', [
                { title: 'Assistants API Architecture', desc: 'Initialize unique conversational threads parsing streaming WebSockets resolving completely non-blocking frontend UX.' },
                { title: 'RAG Knowledge Insertion', desc: 'Dynamically scrape support documentations, calculate vector embeddings computationally, and utilize Pinecone similarity searching.' },
                { title: 'Function Calling Tools', desc: 'Provide the AI strict JSON-schema functions allowing it to autonomously invoke backend actions like "check_shipping_status".' }
            ])
        ]
    },
    {
        id: 'langchain',
        title: 'LangChain & Vector DBs',
        description: 'Build immense modular reasoning applications chaining multiple Large Language Models recursively. Construct complex autonomous agents handling heavy mathematics, querying massive isolated SQL tables via Text-to-SQL logic natively.',
        iconName: 'Layers',
        color: 'from-emerald-500 to-indigo-600',
        duration: '4-6 weeks',
        projects: [
            createTechProject('langchain-financial-agent', 'Autonomous Financial Agent', 'Develop a recursively reasoning Python agent analyzing massive SEC corporate filings autonomously. Construct intricate LangChain routing pipelines verifying the model’s logical deduction, fetching stock prices dynamically using API tools, and generating summarized markdown briefs.', ['Python', 'LangChain', 'ChromaDB', 'Pandas'], 'advanced', [
                { title: 'ReAct Agent Configuration', desc: 'Instruct the Model to execute the Reasoning and Acting pattern natively looping infinitely until the financial deduction resolves.' },
                { title: 'ChromaDB Document Chunking', desc: 'Extract gigabytes of strict PDF corporate data partitioning structurally and indexing vector-metrics via huggingface.' },
                { title: 'Sequential Tool Chaining', desc: 'Link multiple discrete actions routing explicitly an internet search into a calculator then into the final summarizer node.' }
            ])
        ]
    }
];

export const gameDevTechOptions: TechOption[] = [
    {
        id: 'unity',
        title: 'Unity Engine (C#)',
        description: 'Master the industry-dominating game platform. Compile immense 3D architectural worlds scripting complex MonoBehaviours natively in C#. Implement completely dynamic lighting engines, strict rigid-body physics bounds, and detailed Animator state machines.',
        iconName: 'Monitor',
        color: 'from-gray-800 to-black',
        duration: '8-12 weeks',
        projects: [
            createTechProject('unity-survival-fps', 'First-Person Survival Game', 'Execute an entirely self-contained 3D survival simulation. Implement intricate Raycast weapon ballistics, develop a massive procedural generated voxel terrain engine chunking properly, and configure navmesh-based autonomous enemy artificial intelligence.', ['Unity 3D', 'C#', 'NavMesh', 'Cinemachine'], 'advanced', [
                { title: 'Voxel Chunk System', desc: 'Engineer strictly optimized memory-allocated chunks manipulating mathematical meshes calculating noise algorithms dynamically.' },
                { title: 'NavMesh Autonomous Agents', desc: 'Bake a completely static navigation layout scripting A-Star pathfinding enemies hunting the centralized player GameObject.' },
                { title: 'Cinemachine Camera Logic', desc: 'Configure virtual cameras calculating highly realistic weapon re-coil noise shakes automatically upon firing triggers.' }
            ])
        ]
    }
];

export const cybersecurityTechOptions: TechOption[] = [
    {
        id: 'penetration-testing',
        title: 'Penetration Testing (Kali Linux)',
        description: 'Think like a hacker to secure the corporate firewall. Execute meticulously scoped network infiltrations utilizing Nmap subnet discovery, Metasploit payload injections, BurpSuite traffic interception, and Wireshark packet captures.',
        iconName: 'Shield',
        color: 'from-red-600 to-red-800',
        duration: '6-8 weeks',
        projects: [
            createTechProject('kali-network-breach', 'Corporate Subnet Vulnerability Audit', 'Simulate a highly secure Blackbox penetration testing contract physically mapping an intricate virtual network. Exploit a legacy Windows Active Directory controller via precisely crafted payload vectors executing privilege escalation utilizing Metasploit.', ['Kali Linux', 'Metasploit', 'Nmap', 'Active Directory'], 'advanced', [
                { title: 'Nmap Subnet Enumeration', desc: 'Scan absolutely every open port bypassing strict stealth firewalls utilizing fractional timing and decoy packets.' },
                { title: 'Payload Execution', desc: 'Construct a tightly obfuscated reverse-TCP meterpreter executing strictly inside memory bypassing static Windows Defender signatures.' },
                { title: 'Active Directory Lateral Movement', desc: 'Dump isolated NTLM credential hashes utilizing Mimikatz pivoting laterally across multiple machine terminals.' }
            ])
        ]
    }
];

export const iotTechOptions: TechOption[] = [
    {
        id: 'arduino',
        title: 'Arduino & Microcontrollers',
        description: 'Bridge software into precisely crafted hardware manipulation. Write heavily memory-optimized C++ executables controlling vast arrays of physical sensors, multiplexing intricate LED matrices, and transmitting data strictly via SPI/I2C.',
        iconName: 'Cpu',
        color: 'from-teal-500 to-cyan-700',
        duration: '4-6 weeks',
        projects: [
            createTechProject('arduino-weather-station', 'Autonomous Weather Station', 'Architect a localized environmental weather array tracking temperature, humidity, and barometric pressure precisely. Transmit real-time byte analytics asynchronously over isolated 2.4GHz WiFi modules securely dumping into a localized Raspberry Pi database.', ['Arduino C++', 'ESP8266 WiFi', 'MQTT Protocol', 'I2C Sensors'], 'intermediate', [
                { title: 'I2C Sensor Multiplexing', desc: 'Wire exactly configured physical architectures querying deeply nested Hexadecimal sensor registers directly.' },
                { title: 'MQTT Telemetry Publishing', desc: 'Connect securely utilizing Publish/Subscribe frameworks buffering dropped Wi-Fi packets dynamically.' },
                { title: 'Hardware Interrupts', desc: 'Avoid block looping functions entirely coding strict detached interrupt service routines tracking an exact anemometer rotation.' }
            ])
        ]
    }
];
