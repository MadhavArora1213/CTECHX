/**
 * Tech Odyssey Planets Data
 * 
 * Each planet represents a different focus area of technology with unique
 * missions, challenges, and learning opportunities.
 */

const planets = [
  {
    id: 'codeforge',
    name: 'CodeForge',
    shortDescription: 'The foundational planet for web development',
    description: 'The foundational planet where frontend and backend technologies merge. Master the basics of web development and building full-stack applications.',
    image: '/assets/planets/codeforge.webp',
    bgColor: 'from-blue-800 to-indigo-900',
    textColor: 'text-blue-400',
    accentColor: 'border-blue-500',
    techFocus: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'Databases'],
    difficulty: 1, // 1-5 scale
    unlockRequirement: null, // No requirement - starting planet
    locations: [
      {
        id: 'central-hub',
        name: 'Central Hub',
        description: 'The main gathering place for all developers',
        unlocked: true
      },
      {
        id: 'frontend-valley',
        name: 'Frontend Valley',
        description: 'Where the visual magic happens',
        unlockRequirement: 'Complete 3 missions in Central Hub',
        unlocked: false
      },
      {
        id: 'backend-mountains',
        name: 'Backend Mountains',
        description: 'Build robust server-side applications',
        unlockRequirement: 'Complete 3 missions in Frontend Valley',
        unlocked: false
      },
      {
        id: 'database-caves',
        name: 'Database Caves',
        description: 'Master the art of data storage and retrieval',
        unlockRequirement: 'Complete 3 missions in Backend Mountains',
        unlocked: false
      }
    ],
    totalMissions: 25,
    xpReward: 500, // XP rewarded for completing all missions on planet
    itemRewards: ['syntax-sword', 'framework-gloves'], // Special items unlocked on this planet
    completionAchievement: 'codeforge-conqueror'
  },
  {
    id: 'neuron',
    name: 'Neuron',
    shortDescription: 'AI and machine learning exploration',
    description: 'A planet dedicated to artificial intelligence and machine learning. Expand your knowledge in data science and neural networks.',
    image: '/assets/planets/neuron.webp',
    bgColor: 'from-purple-800 to-fuchsia-900',
    textColor: 'text-purple-400',
    accentColor: 'border-purple-500',
    techFocus: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Neural Networks'],
    difficulty: 3,
    unlockRequirement: {
      type: 'mission-count',
      count: 15,
      planetId: 'codeforge'
    },
    locations: [
      {
        id: 'data-harbor',
        name: 'Data Harbor',
        description: 'The entry point where data scientists gather',
        unlocked: true
      },
      {
        id: 'neural-forest',
        name: 'Neural Forest',
        description: 'Explore the intricate networks of AI models',
        unlockRequirement: 'Complete 3 missions in Data Harbor',
        unlocked: false
      },
      {
        id: 'tensor-fields',
        name: 'Tensor Fields',
        description: 'Advanced computation and model training grounds',
        unlockRequirement: 'Complete 3 missions in Neural Forest',
        unlocked: false
      },
      {
        id: 'prediction-peaks',
        name: 'Prediction Peaks',
        description: 'Master the art of predictive modeling and forecasting',
        unlockRequirement: 'Complete 3 missions in Tensor Fields',
        unlocked: false
      }
    ],
    totalMissions: 20,
    xpReward: 750,
    itemRewards: ['neural-helmet', 'data-compass'],
    completionAchievement: 'neuron-navigator'
  },
  {
    id: 'droidcore',
    name: 'DroidCore',
    shortDescription: 'Mobile app development planet',
    description: 'The home of mobile application development. Learn to build apps for Android, iOS, and cross-platform frameworks.',
    image: '/assets/planets/droidcore.webp',
    bgColor: 'from-green-800 to-emerald-900',
    textColor: 'text-green-400',
    accentColor: 'border-green-500',
    techFocus: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase', 'Mobile UX'],
    difficulty: 2,
    unlockRequirement: {
      type: 'mission-count',
      count: 10,
      planetId: 'codeforge'
    },
    locations: [
      {
        id: 'app-station',
        name: 'App Station',
        description: 'The central hub for mobile app developers',
        unlocked: true
      },
      {
        id: 'interface-gardens',
        name: 'Interface Gardens',
        description: 'Design beautiful and intuitive mobile interfaces',
        unlockRequirement: 'Complete 3 missions in App Station',
        unlocked: false
      },
      {
        id: 'native-ruins',
        name: 'Native Ruins',
        description: 'Explore platform-specific development techniques',
        unlockRequirement: 'Complete 3 missions in Interface Gardens',
        unlocked: false
      },
      {
        id: 'integration-nexus',
        name: 'Integration Nexus',
        description: 'Connect your apps to APIs and services',
        unlockRequirement: 'Complete 3 missions in Native Ruins',
        unlocked: false
      }
    ],
    totalMissions: 22,
    xpReward: 650,
    itemRewards: ['mobile-launcher', 'responsive-shield'],
    completionAchievement: 'droidcore-developer'
  },
  {
    id: 'cryptia',
    name: 'Cryptia',
    shortDescription: 'Cybersecurity and blockchain territory',
    description: 'The mysterious planet of cybersecurity and blockchain. Learn to protect systems and build decentralized applications.',
    image: '/assets/planets/cryptia.webp',
    bgColor: 'from-red-800 to-rose-900',
    textColor: 'text-red-400',
    accentColor: 'border-red-500',
    techFocus: ['Cybersecurity', 'Blockchain', 'Smart Contracts', 'Encryption', 'Ethical Hacking'],
    difficulty: 4,
    unlockRequirement: {
      type: 'planet-completion',
      planetId: 'codeforge'
    },
    locations: [
      {
        id: 'secure-haven',
        name: 'Secure Haven',
        description: 'The fortified entry point to the world of security',
        unlocked: true
      },
      {
        id: 'cipher-maze',
        name: 'Cipher Maze',
        description: 'Navigate through encryption challenges',
        unlockRequirement: 'Complete 3 missions in Secure Haven',
        unlocked: false
      },
      {
        id: 'blockchain-basin',
        name: 'Blockchain Basin',
        description: 'Explore distributed ledger technologies',
        unlockRequirement: 'Complete 3 missions in Cipher Maze',
        unlocked: false
      },
      {
        id: 'hacker-arena',
        name: 'Hacker Arena',
        description: 'Test your skills in ethical hacking scenarios',
        unlockRequirement: 'Complete 3 missions in Blockchain Basin',
        unlocked: false
      }
    ],
    totalMissions: 18,
    xpReward: 900,
    itemRewards: ['encryption-key', 'firewall-shield'],
    completionAchievement: 'cryptia-guardian'
  },
  {
    id: 'devopsprime',
    name: 'DevOpsPrime',
    shortDescription: 'Infrastructure and deployment world',
    description: 'The industrial planet of DevOps and cloud infrastructure. Master CI/CD, containerization, and cloud services.',
    image: '/assets/planets/devopsprime.webp',
    bgColor: 'from-amber-800 to-yellow-900',
    textColor: 'text-amber-400',
    accentColor: 'border-amber-500',
    techFocus: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Infrastructure as Code'],
    difficulty: 3,
    unlockRequirement: {
      type: 'mission-count',
      count: 10,
      planetId: 'codeforge'
    },
    locations: [
      {
        id: 'deployment-dock',
        name: 'Deployment Dock',
        description: 'The landing zone for all DevOps engineers',
        unlocked: true
      },
      {
        id: 'container-city',
        name: 'Container City',
        description: 'Master containerization technologies',
        unlockRequirement: 'Complete 3 missions in Deployment Dock',
        unlocked: false
      },
      {
        id: 'pipeline-network',
        name: 'Pipeline Network',
        description: 'Build and optimize CI/CD pipelines',
        unlockRequirement: 'Complete 3 missions in Container City',
        unlocked: false
      },
      {
        id: 'cloud-atlas',
        name: 'Cloud Atlas',
        description: 'Navigate the major cloud platforms and services',
        unlockRequirement: 'Complete 3 missions in Pipeline Network',
        unlocked: false
      }
    ],
    totalMissions: 20,
    xpReward: 800,
    itemRewards: ['pipeline-accelerator', 'cloud-compass'],
    completionAchievement: 'devops-engineer'
  },
  {
    id: 'algomatrix',
    name: 'AlgoMatrix',
    shortDescription: 'Algorithms and data structures domain',
    description: 'The abstract planet of algorithms and data structures. Perfect your problem-solving skills and computational thinking.',
    image: '/assets/planets/algomatrix.webp',
    bgColor: 'from-cyan-800 to-sky-900',
    textColor: 'text-cyan-400',
    accentColor: 'border-cyan-500',
    techFocus: ['Algorithms', 'Data Structures', 'Time Complexity', 'Problem Solving', 'System Design'],
    difficulty: 5,
    unlockRequirement: {
      type: 'planets-visited',
      count: 3
    },
    locations: [
      {
        id: 'logic-gateway',
        name: 'Logic Gateway',
        description: 'The entry point to algorithmic thinking',
        unlocked: true
      },
      {
        id: 'array-archipelago',
        name: 'Array Archipelago',
        description: 'Master fundamental data structures',
        unlockRequirement: 'Complete 3 missions in Logic Gateway',
        unlocked: false
      },
      {
        id: 'recursion-caverns',
        name: 'Recursion Caverns',
        description: 'Delve into the depths of recursive problem-solving',
        unlockRequirement: 'Complete 3 missions in Array Archipelago',
        unlocked: false
      },
      {
        id: 'optimization-oasis',
        name: 'Optimization Oasis',
        description: 'Learn to create efficient and scalable solutions',
        unlockRequirement: 'Complete 3 missions in Recursion Caverns',
        unlocked: false
      }
    ],
    totalMissions: 25,
    xpReward: 1000,
    itemRewards: ['algorithm-analyzer', 'complexity-reducer'],
    completionAchievement: 'algorithm-master'
  }
];

export default planets;

// Helper functions
export const getPlanet = (planetId) => planets.find(planet => planet.id === planetId);
export const getStarterPlanet = () => planets.find(planet => !planet.unlockRequirement);
export const getPlanetByDifficulty = (level) => planets.filter(planet => planet.difficulty === level);