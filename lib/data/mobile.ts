import { TechOption, Project, createTask } from './types';

const createTechProject = (id: string, title: string, description: string, technologies: string[], difficulty: 'beginner' | 'intermediate' | 'advanced', customTasks: { title: string, desc: string }[]): Project => ({
    id,
    title,
    description,
    image: `/images/projects/${id}.jpg`,
    difficulty,
    duration: difficulty === 'beginner' ? '3-5 weeks' : difficulty === 'intermediate' ? '5-8 weeks' : '8-12 weeks',
    technologies,
    learningOutcomes: [
        `Master ${technologies.join(', ')} core concepts and architectural patterns`,
        `Build a complete, production-ready ${title.toLowerCase()}`,
        `Implement native device APIs and robust state management`,
        `Prepare applications for Apple App Store and Google Play deployment`
    ],
    tasks: customTasks.map((t, i) => createTask(`${id}-task-${i + 1}`, t.title, t.desc, difficulty))
});

export const mobileTechOptions: TechOption[] = [
    {
        id: 'react-native',
        title: 'React Native (Expo & CLI)',
        description: 'Build truly native applications using React architecture. Master deep-linking, animated gesture handling (Reanimated), native module bridging, offline-first architectures, and frictionless cross-platform UI engineering.',
        iconName: 'Smartphone',
        color: 'from-cyan-400 to-cyan-600',
        duration: '6-8 weeks',
        projects: [
            createTechProject('rn-ride-sharing', 'Cross-Platform Ride Sharing App', 'Engineer a high-performance Uber clone utilizing React Native Maps. Implement extremely complex realtime driver tracking with Websockets, strict background geolocation updates, and highly optimized fluid MapView markers.', ['React Native', 'Expo', 'Google Maps API', 'Reanimated'], 'advanced', [
                { title: 'Background Geolocation', desc: 'Configure Expo Background Fetch and TaskManager to reliably listen to GPS updates indefinitely.' },
                { title: 'Fluid Marker Interpolation', desc: 'Utilize React Native Reanimated to interpolate driver GPS coordinates into smooth 60fps moving sprites.' },
                { title: 'Offline Queueing System', desc: 'Implement a highly robust offline cache that queues ride requests and fires them simultaneously upon reconnection.' },
                { title: 'Deep Linking & Push', desc: 'Process exact deep-links seamlessly and implement interactive background push notifications.' }
            ]),
            createTechProject('rn-social-ecom', 'Social Marketplace', 'Build an intricate Instagram/E-commerce hybrid app utilizing performant FlatList recycling, heavy video rendering matrices, entirely nested bottom-sheet navigators, and dynamic dark mode toggling natively.', ['React Native', 'React Navigation', 'Zustand', 'Stripe SDK'], 'intermediate', [
                { title: 'React Navigation V6 Trees', desc: 'Architect profoundly nested Stack, Tab, and Drawer navigators heavily utilizing presentation modals.' },
                { title: 'FlatList Memory Optimization', desc: 'Maintain 60fps list scrolling with 1,000+ items customizing windowSize and maxToRenderPerBatch strictly.' },
                { title: 'Native Stripe Integration', desc: 'Embed the native Stripe UI elements invoking the device-level Apple Pay and Google Pay wallets.' }
            ])
        ]
    },
    {
        id: 'flutter',
        title: 'Flutter & Dart',
        description: 'Command the immensely powerful Flutter framework using the Dart programming language. Compile native ARM code emphasizing completely custom painting, intricate animation controllers, and declarative UI widgets.',
        iconName: 'Layers',
        color: 'from-emerald-400 to-indigo-600',
        duration: '6-8 weeks',
        projects: [
            createTechProject('flutter-fintech-dashboard', 'Fintech Analytics Dashboard', 'Create an extremely dense financial transaction dashboard. Heavily utilize the CustomPaint class for highly detailed proprietary bezier curve charts, strict local BLoC structural management, and secure biometric authentication layers.', ['Flutter', 'Dart', 'BLoC Pattern', 'LocalAuth'], 'advanced', [
                { title: 'CustomPaint Bezier Rendering', desc: 'Mathematically draw fluid financial area charts completely from scratch executing directly on the Skia/Impeller canvas.' },
                { title: 'BLoC Architecture implementation', desc: 'Strictly separate the business logic components from the UI using completely isolated Streams and Sinks.' },
                { title: 'Secure Enclave Biometrics', desc: 'Protect sensitive wallet information requesting explicit FaceID / TouchID invocations cleanly.' }
            ])
        ]
    },
    {
        id: 'ios-swift',
        title: 'iOS Native (SwiftUI)',
        description: 'Dive deep into Apple\'s ecosystem natively. Master Swift 5+, SwiftUI declarative layouts, CoreData/SwiftData persistence, Combine reactive frameworks, and iOS-specific Human Interface Guidelines.',
        iconName: 'Apple',
        color: 'from-gray-600 to-gray-900',
        duration: '8-10 weeks',
        projects: [
            createTechProject('swiftui-health-tracker', 'Native Health & Fitness Aggregator', 'Develop a comprehensive tracking app heavily tied into iOS frameworks. You will uniquely utilize HealthKit to aggregate step data, WidgetKit for interactive home-screen widgets, and strictly local SwiftData persistence.', ['Swift 5.9', 'SwiftUI', 'HealthKit', 'WidgetKit'], 'advanced', [
                { title: 'SwiftData Schema Design', desc: 'Construct strongly typed, purely native SwiftData macroscopic models for user workouts offline.' },
                { title: 'HealthKit Interoperability', desc: 'Prompt user permissions gracefully and query the device’s secured cryptographic HealthKit enclave.' },
                { title: 'Dynamic Interactive Widgets', desc: 'Provide entirely actionable iOS 17 home screen widgets sharing data seamlessly via App Groups.' }
            ])
        ]
    },
    {
        id: 'android-kotlin',
        title: 'Android Native (Kotlin & Compose)',
        description: 'Master Android application development utilizing highly expressive Kotlin. Build fluid UIs using Jetpack Compose entirely over legacy XML, manage state via ViewModels, and handle asynchronous flows with Kotlin Coroutines.',
        iconName: 'Smartphone',
        color: 'from-green-500 to-green-700',
        duration: '8-10 weeks',
        projects: [
            createTechProject('kotlin-media-player', 'Background Media Service Player', 'Architect an exhaustive music streaming application enforcing robust MediaSession APIs. Strictly handle Android\'s lifecycle preventing service degradation, UI sync via StateFlow, and intricate caching algorithms.', ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Media3 Exoplayer'], 'advanced', [
                { title: 'Jetpack Compose UIs', desc: 'Completely toss out XML files developing complex dynamic view trees uniquely using Kotlin composables.' },
                { title: 'Media3 Exoplayer Service', desc: 'Construct a sticky foreground service guaranteeing continuous audio playback during deep Doze states.' },
                { title: 'Coroutines & StateFlow', desc: 'Stream player state mutations into the UI instantly observing intensely typed asynchronous Coroutine flows.' }
            ])
        ]
    }
];
