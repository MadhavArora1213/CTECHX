// Collection of reusable game assets for use throughout the game landing page

// Game level information - maps section names to gaming concepts
export const gameLevels = [
  { id: 'hero', name: 'Intro Level', description: 'Begin your journey', icon: '🏁' },
  { id: 'features', name: 'Skill Tree', description: 'Discover abilities', icon: '🌳' },
  { id: 'projects', name: 'Quest Board', description: 'View missions', icon: '📜' },
  { id: 'community', name: 'The Guild', description: 'Meet your team', icon: '👥' },
  { id: 'events', name: 'Event Arena', description: 'Join tournaments', icon: '🏟️' },
  { id: 'join', name: 'Character Creation', description: 'Create your profile', icon: '✨' }
];

// Tech skills as collectible items
export const techSkills = [
  { id: 'html', name: 'HTML', icon: '🔖', color: '#E34F26', points: 10, level: 1 },
  { id: 'css', name: 'CSS', icon: '🎨', color: '#1572B6', points: 10, level: 1 },
  { id: 'js', name: 'JavaScript', icon: '⚡', color: '#F7DF1E', points: 20, level: 1 },
  { id: 'react', name: 'React', icon: '⚛️', color: '#61DAFB', points: 30, level: 2 },
  { id: 'node', name: 'Node.js', icon: '🟢', color: '#339933', points: 30, level: 2 },
  { id: 'python', name: 'Python', icon: '🐍', color: '#3776AB', points: 30, level: 2 },
  { id: 'ai', name: 'AI/ML', icon: '🧠', color: '#FF6F61', points: 50, level: 3 },
  { id: 'cloud', name: 'Cloud', icon: '☁️', color: '#0072C6', points: 40, level: 3 },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#F7931A', points: 50, level: 3 }
];

// Game backgrounds - external internet links
export const gameBackgrounds = {
  cyberpunk: 'https://images.unsplash.com/photo-1599837487527-e105519e4bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  futuristic: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  digitalGrid: 'https://cdn.pixabay.com/photo/2018/03/16/03/34/network-3230393_1280.jpg',
  virtualReality: 'https://images.unsplash.com/photo-1543470373-e055b73a8f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  galaxySpace: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
};

// Game interface elements
export const gameUIElements = {
  // Icons from Feather icons (via CDN)
  icons: {
    home: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/home.svg',
    skills: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/grid.svg',
    projects: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/folder.svg',
    community: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/users.svg',
    events: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/calendar.svg',
    join: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/user-plus.svg',
    settings: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/settings.svg',
  },
  // UI frame images
  frames: {
    hexagon: 'https://cdn.pixabay.com/photo/2017/01/26/08/07/light-2010022_1280.png',
    circle: 'https://cdn.pixabay.com/photo/2016/04/24/22/30/light-1350458_1280.png',
    square: 'https://cdn.pixabay.com/photo/2017/06/10/22/58/composing-2391033_1280.jpg'
  },
  // Particle effects
  particles: {
    glow: 'https://cdn.pixabay.com/photo/2021/10/05/14/32/lights-6683119_1280.png',
    sparkle: 'https://cdn.pixabay.com/photo/2020/04/21/10/26/bokeh-5072271_1280.png',
    dust: 'https://cdn.pixabay.com/photo/2017/08/25/18/48/watercolor-2681039_1280.jpg'
  }
};

// Game sound effects (from free sound libraries)
export const gameSoundEffects = {
  buttonClick: 'https://cdn.pixabay.com/audio/2022/03/10/audio_255c2065d3.mp3',
  achievementUnlock: 'https://cdn.pixabay.com/audio/2022/11/21/audio_7aa54d4c95.mp3',
  levelUp: 'https://cdn.pixabay.com/audio/2022/03/22/audio_38971280d5.mp3',
  itemCollect: 'https://cdn.pixabay.com/audio/2022/02/15/audio_c8c8a73467.mp3',
  uiBlip: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8b0b57d80.mp3',
  uiTap: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d3a4fe98de.mp3',
  achievementView: 'https://cdn.pixabay.com/audio/2021/08/09/audio_614eb3383d.mp3'
};

// Character sprites and animations
export const characterAssets = {
  playerSprites: {
    idle: 'https://cdn.pixabay.com/photo/2022/07/18/12/40/avatar-7329214_1280.png',
    active: 'https://cdn.pixabay.com/photo/2022/07/18/12/40/avatar-7329211_1280.png',
  },
  npcSprites: [
    'https://cdn.pixabay.com/photo/2022/07/18/12/40/avatar-7329194_1280.png',
    'https://cdn.pixabay.com/photo/2022/07/18/15/39/avatar-7329655_1280.png',
    'https://cdn.pixabay.com/photo/2022/07/18/12/40/avatar-7329192_1280.png'
  ]
};

// Loading screen tips
export const loadingTips = [
  "Click on glowing elements to earn points!",
  "Explore all sections to unlock the 'Explorer' achievement",
  "Night owl? Visit between midnight and 5 AM for a secret achievement",
  "Some buttons have hidden click effects - try clicking everything!",
  "Your progress is saved automatically between sessions",
  "Collect all technology skills to maximize your score",
  "Earn achievements to level up faster",
  "Try hovering over different UI elements for tooltips and effects",
  "Each section represents a different game level - complete them all!",
  "The more you interact with the page, the more points you'll earn"
];

// Generate a random gamer tag
export const generateGamerTag = () => {
  const prefixes = ['Cyber', 'Digital', 'Quantum', 'Pixel', 'Neo', 'Tech', 'Glitch', 'Code', 'Data', 'Crypto'];
  const suffixes = ['Ninja', 'Hunter', 'Wizard', 'Master', 'Runner', 'Hacker', 'Legend', 'Warrior', 'Ghost', 'Phoenix'];
  const randomNum = Math.floor(Math.random() * 1000);
  
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${randomPrefix}${randomSuffix}${randomNum}`;
};

// Game achievements for collection
export const gameAchievements = [
  {
    id: 'visitor',
    title: 'First Contact',
    description: 'Visit the landing page',
    icon: '👋',
    points: 10
  },
  {
    id: 'explorer',
    title: 'Digital Explorer',
    description: 'Visit all sections of the landing page',
    icon: '🔍',
    points: 50
  },
  {
    id: 'collector',
    title: 'Skill Collector',
    description: 'Collect all available tech skills',
    icon: '🧩',
    points: 100
  },
  {
    id: 'social',
    title: 'Social Butterfly',
    description: 'Connect with the community section',
    icon: '🦋',
    points: 30
  },
  {
    id: 'ninja',
    title: 'Click Ninja',
    description: 'Click 50 interactive elements',
    icon: '⚡',
    points: 75
  },
  {
    id: 'hacker',
    title: 'Keyboard Hacker',
    description: 'Use keyboard shortcuts',
    icon: '⌨️',
    points: 40
  },
  {
    id: 'nightowl',
    title: 'Night Owl',
    description: 'Visit between midnight and 5 AM',
    icon: '🦉',
    points: 100
  }
];

// Project quest data
export const projectQuests = [
  {
    id: 'quest1',
    title: 'Web Wizard Challenge',
    difficulty: 'Beginner',
    type: 'Frontend',
    description: 'Create a responsive landing page with modern CSS',
    rewards: ['XP +100', 'HTML Badge', 'CSS Badge'],
    image: 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg'
  },
  {
    id: 'quest2',
    title: 'API Explorer Mission',
    difficulty: 'Intermediate',
    type: 'Backend',
    description: 'Build an app that interacts with multiple APIs',
    rewards: ['XP +200', 'API Badge', 'JSON Badge'],
    image: 'https://cdn.pixabay.com/photo/2023/01/30/18/47/ai-generated-7755881_1280.jpg'
  },
  {
    id: 'quest3',
    title: 'Database Dungeon',
    difficulty: 'Advanced',
    type: 'Fullstack',
    description: 'Create a complete CRUD app with authentication',
    rewards: ['XP +300', 'Database Badge', 'Authentication Badge'],
    image: 'https://cdn.pixabay.com/photo/2022/01/21/00/38/cyberpunk-6954141_1280.jpg'
  }
];

// Community member profiles
export const communityMembers = [
  {
    id: 'member1',
    name: 'CyberNinja',
    level: 42,
    role: 'Frontend Developer',
    specialty: 'UI/UX Design',
    avatar: 'https://cdn.pixabay.com/photo/2023/01/16/23/03/ai-generated-7722897_1280.jpg',
    badges: ['HTML Master', 'CSS Wizard', 'JS Guru']
  },
  {
    id: 'member2',
    name: 'QuantumCoder',
    level: 38,
    role: 'Backend Developer',
    specialty: 'API Architecture',
    avatar: 'https://cdn.pixabay.com/photo/2023/04/28/07/18/ai-generated-7956026_1280.jpg',
    badges: ['Node Expert', 'Python Master', 'Database Wizard']
  },
  {
    id: 'member3',
    name: 'PixelHunter',
    level: 45,
    role: 'Game Developer',
    specialty: '3D Animation',
    avatar: 'https://cdn.pixabay.com/photo/2023/04/08/18/13/ai-generated-7909416_1280.jpg',
    badges: ['Unity Master', 'C# Expert', 'Game Design Guru']
  }
];

// Event data
export const upcomingEvents = [
  {
    id: 'event1',
    title: 'Code Combat: Frontend Battle',
    date: '2023-06-15',
    time: '18:00 - 21:00',
    location: 'Virtual Arena',
    description: 'Compete with other developers in frontend challenges',
    image: 'https://cdn.pixabay.com/photo/2023/03/14/11/57/ai-generated-7853381_1280.jpg'
  },
  {
    id: 'event2',
    title: 'AI Workshop: Neural Networks',
    date: '2023-06-22',
    time: '14:00 - 16:00',
    location: 'Tech Nexus HQ',
    description: 'Learn how to build and train neural networks',
    image: 'https://cdn.pixabay.com/photo/2023/05/12/08/41/ai-generated-7988347_1280.jpg'
  },
  {
    id: 'event3',
    title: 'Hackathon: Blockchain Revolution',
    date: '2023-07-01',
    time: '09:00 - 21:00',
    location: 'Innovation Hub',
    description: '24-hour coding challenge to build blockchain solutions',
    image: 'https://cdn.pixabay.com/photo/2021/09/12/07/58/banner-6617550_1280.jpg'
  }
];