import { TechOption, Project, createTask } from './types';

const createTechProject = (id: string, title: string, description: string, technologies: string[], difficulty: 'beginner' | 'intermediate' | 'advanced', customTasks: { title: string, desc: string }[]): Project => ({
    id,
    title,
    description,
    image: `/images/projects/${id}.jpg`,
    difficulty,
    duration: difficulty === 'beginner' ? '4-6 weeks' : difficulty === 'intermediate' ? '6-8 weeks' : '8-10 weeks',
    technologies,
    learningOutcomes: [
        `Master foundational ${technologies.length > 0 ? technologies[0] : 'Data'} methodologies and statistical correctness`,
        `Execute complex transformations on massive, unstructured datasets confidently`,
        `Build, validate, and optimize hyper-parameters for production-grade models`,
        `Effectively communicate visualization insights to stakeholders`
    ],
    tasks: customTasks.map((t, i) => createTask(`${id}-task-${i + 1}`, t.title, t.desc, difficulty))
});

export const dataScienceTechOptions: TechOption[] = [
    {
        id: 'python',
        title: 'Python for Data Analysis',
        description: 'Command the immensely powerful Python data ecosystem. Utilize Pandas for massive tabular data manipulations, NumPy for heavy linear algebra, Matplotlib/Seaborn for statistical distributions, and build interactive EDA (Exploratory Data Analysis) dashboards.',
        iconName: 'BarChart2',
        color: 'from-emerald-500 to-yellow-500',
        duration: '4-6 weeks',
        projects: [
            createTechProject('pandas-market-analyst', 'Global Financial Market Analyzer', 'Perform exhaustive Exploratory Data Analysis (EDA) on a massive 15-year S&P 500 dataset. You will implement convoluted rolling-window calculations, handle widespread null extrapolations utilizing Pandas interpolations, and map distribution volatilities.', ['Python', 'Pandas', 'NumPy', 'Seaborn'], 'intermediate', [
                { title: 'Vectorized Data Cleaning', desc: 'Srub massive corrupted CSV files utilizing perfectly optimized non-looping Pandas C-bindings.' },
                { title: 'Multi-Index Groupings', desc: 'Aggressively aggregate hierarchical sector metrics creating deep MultiIndex pivot tables.' },
                { title: 'Statistical Distributions', desc: 'Visualize the long-tail Kurtosis and Skewness of market bursts leveraging Seaborn violin plots.' }
            ])
        ]
    },
    {
        id: 'machine-learning',
        title: 'Machine Learning (scikit-learn)',
        description: 'Transform raw data into predictive assets using traditional ML algorithms. Understand the dense mathematics behind Support Vector Machines (SVMs), Random Forests, Gradient Boosted Trees (XGBoost), and rigorous K-Fold Cross Validation.',
        iconName: 'Brain',
        color: 'from-teal-500 to-indigo-500',
        duration: '6-8 weeks',
        projects: [
            createTechProject('ml-fraud-detector', 'Ensemble Fraud Detection Matrix', 'Strategically build a heavily imbalanced credit-card fraud detection system. Execute rigorous SMOTE oversampling algorithms, construct isolated Random Forest and XGBoost predictors, and aggregate them securely using advanced Voting Classifiers.', ['Python', 'scikit-learn', 'XGBoost', 'Imbalanced-Learn'], 'advanced', [
                { title: 'SMOTE Matrix Balancing', desc: 'Generate synthetic fraudulent instances mathematically to correct a 99.9% skewed class imbalance.' },
                { title: 'GridSearch Hyper-Tuning', desc: 'Execute widespread GridSearch / RandomizedSearch permutations to locate the optimal Alpha/Gamma tree restrictions.' },
                { title: 'ROC-AUC Optimization', desc: 'Optimize the models strictly for Recall vs Precision mapping the F1-Scores and Area Under the Curve precisely.' }
            ])
        ]
    },
    {
        id: 'deep-learning',
        title: 'Deep Learning (TensorFlow & PyTorch)',
        description: 'Engineer sophisticated neural networks conquering image, audio, and text domains. Architect advanced Convolutional (CNNs) and Recurrent (RNNs/LSTMs) nodes, design multi-layered perceptrons, and utilize backpropagation meticulously via gradient descent.',
        iconName: 'Network',
        color: 'from-orange-500 to-red-500',
        duration: '8-10 weeks',
        projects: [
            createTechProject('dl-medical-imaging', 'Medical Lesion Classifier CNN', 'Construct a strictly regulated Convolutional Neural Network processing complex thousands of dermatological multi-dimensional pixel matrices. You will execute massive GPU tensor transformations, apply strategic dropout layers preventing catastrophic overfitting, and employ Transfer Learning using pre-trained ResNet50 architectures.', ['PyTorch', 'TensorFlow', 'Keras', 'OpenCV'], 'advanced', [
                { title: 'Image Augmentation Pipelines', desc: 'Artificially expand the training data exponentially by executing live-rotation, flipping, and shearing tensors.' },
                { title: 'ResNet50 Transfer Learning', desc: 'Freeze the heavily trained foundational layers of ResNet50 and replace the dense classification head linearly.' },
                { title: 'Gradient Decent Tuning', desc: 'Implement intricate cyclical learning rates dynamically decaying Adam optimizers during massive plateau epochs.' }
            ])
        ]
    }
];
