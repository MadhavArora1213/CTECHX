/**
 * Tech Odyssey Achievements Data
 * 
 * Achievements are special rewards that students can unlock by
 * reaching milestones or completing specific actions in the game.
 */

const achievements = [
  // Milestone Achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first mission in Tech Odyssey.',
    category: 'milestone',
    icon: '🚀',
    rarity: 'common',
    xpReward: 50,
    itemReward: null,
    criteria: {
      type: 'mission-completion',
      count: 1
    },
    secret: false
  },
  {
    id: 'dedicated-student',
    title: 'Dedicated Student',
    description: 'Complete 10 missions across any planets.',
    category: 'milestone',
    icon: '📚',
    rarity: 'uncommon',
    xpReward: 200,
    itemReward: 'knowledge-orb',
    criteria: {
      type: 'mission-completion',
      count: 10
    },
    secret: false
  },
  {
    id: 'tech-journeyman',
    title: 'Tech Journeyman',
    description: 'Complete 25 missions across any planets.',
    category: 'milestone',
    icon: '🧙‍♂️',
    rarity: 'rare',
    xpReward: 500,
    itemReward: 'journeyman-satchel',
    criteria: {
      type: 'mission-completion',
      count: 25
    },
    secret: false
  },
  {
    id: 'code-master',
    title: 'Code Master',
    description: 'Complete 50 missions across any planets.',
    category: 'milestone',
    icon: '👨‍💻',
    rarity: 'epic',
    xpReward: 1000,
    itemReward: 'mastery-medallion',
    criteria: {
      type: 'mission-completion',
      count: 50
    },
    secret: false
  },
  {
    id: 'tech-legend',
    title: 'Tech Legend',
    description: 'Complete 100 missions across all planets.',
    category: 'milestone',
    icon: '🏆',
    rarity: 'legendary',
    xpReward: 2000,
    itemReward: 'legendary-crown',
    criteria: {
      type: 'mission-completion',
      count: 100
    },
    secret: false
  },
  
  // Planet-specific Achievements
  {
    id: 'codeforge-explorer',
    title: 'CodeForge Explorer',
    description: 'Complete 10 missions on Planet CodeForge.',
    category: 'exploration',
    icon: '🌐',
    rarity: 'uncommon',
    xpReward: 150,
    itemReward: null,
    criteria: {
      type: 'planet-missions',
      planetId: 'codeforge',
      count: 10
    },
    secret: false
  },
  {
    id: 'codeforge-conqueror',
    title: 'CodeForge Conqueror',
    description: 'Complete all missions on Planet CodeForge.',
    category: 'exploration',
    icon: '⚔️',
    rarity: 'epic',
    xpReward: 750,
    itemReward: 'codeforge-banner',
    criteria: {
      type: 'planet-completion',
      planetId: 'codeforge'
    },
    secret: false
  },
  {
    id: 'neuron-pioneer',
    title: 'Neuron Pioneer',
    description: 'Complete 10 missions on Planet Neuron.',
    category: 'exploration',
    icon: '🧠',
    rarity: 'uncommon',
    xpReward: 200,
    itemReward: null,
    criteria: {
      type: 'planet-missions',
      planetId: 'neuron',
      count: 10
    },
    secret: false
  },
  {
    id: 'neuron-navigator',
    title: 'Neuron Navigator',
    description: 'Complete all missions on Planet Neuron.',
    category: 'exploration',
    icon: '🔮',
    rarity: 'epic',
    xpReward: 800,
    itemReward: 'neural-crown',
    criteria: {
      type: 'planet-completion',
      planetId: 'neuron'
    },
    secret: false
  },
  
  // Skill-based Achievements
  {
    id: 'frontend-artisan',
    title: 'Frontend Artisan',
    description: 'Complete all frontend-related missions across all planets.',
    category: 'mastery',
    icon: '🎨',
    rarity: 'rare',
    xpReward: 400,
    itemReward: 'design-palette',
    criteria: {
      type: 'tag-completion',
      tag: 'frontend',
      count: 15
    },
    secret: false
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    description: 'Complete all backend-related missions across all planets.',
    category: 'mastery',
    icon: '⚙️',
    rarity: 'rare',
    xpReward: 400,
    itemReward: 'server-module',
    criteria: {
      type: 'tag-completion',
      tag: 'backend',
      count: 15
    },
    secret: false
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Complete all data science-related missions across all planets.',
    category: 'mastery',
    icon: '📊',
    rarity: 'rare',
    xpReward: 450,
    itemReward: 'data-lens',
    criteria: {
      type: 'tag-completion',
      tag: 'data-science',
      count: 12
    },
    secret: false
  },
  
  // Performance Achievements
  {
    id: 'perfect-score',
    title: 'Perfectionist',
    description: 'Complete a mission with a 100% score.',
    category: 'mastery',
    icon: '✨',
    rarity: 'uncommon',
    xpReward: 100,
    itemReward: null,
    criteria: {
      type: 'mission-score',
      score: 100,
      count: 1
    },
    secret: false
  },
  {
    id: 'speed-coder',
    title: 'Speed Coder',
    description: 'Complete 5 missions in under half the estimated time.',
    category: 'mastery',
    icon: '⚡',
    rarity: 'rare',
    xpReward: 300,
    itemReward: 'speed-bracers',
    criteria: {
      type: 'mission-speed',
      factor: 0.5,
      count: 5
    },
    secret: false
  },
  
  // Social Achievements
  {
    id: 'team-player',
    title: 'Team Player',
    description: 'Collaborate with 3 other students on projects.',
    category: 'social',
    icon: '👥',
    rarity: 'uncommon',
    xpReward: 200,
    itemReward: null,
    criteria: {
      type: 'collaboration',
      count: 3
    },
    secret: false
  },
  {
    id: 'mentor',
    title: 'Helpful Mentor',
    description: 'Help 5 other students solve their coding problems.',
    category: 'social',
    icon: '🧑‍🏫',
    rarity: 'rare',
    xpReward: 350,
    itemReward: 'mentor-mantle',
    criteria: {
      type: 'help-others',
      count: 5
    },
    secret: false
  },
  
  // Secret Achievements
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Complete 5 missions between midnight and 5 AM.',
    category: 'learning',
    icon: '🦉',
    rarity: 'uncommon',
    xpReward: 150,
    itemReward: 'night-vision-goggles',
    criteria: {
      type: 'time-completion',
      startHour: 0, // midnight
      endHour: 5,
      count: 5
    },
    secret: true
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Find and report 3 bugs in the platform.',
    category: 'learning',
    icon: '🐛',
    rarity: 'rare',
    xpReward: 250,
    itemReward: 'debug-toolkit',
    criteria: {
      type: 'bug-reporting',
      count: 3
    },
    secret: true
  },
  {
    id: 'easter-egg',
    title: 'Easter Egg Hunter',
    description: 'Discover 5 hidden easter eggs across the platform.',
    category: 'exploration',
    icon: '🥚',
    rarity: 'epic',
    xpReward: 500,
    itemReward: 'easter-basket',
    criteria: {
      type: 'easter-eggs',
      count: 5
    },
    secret: true
  }
];

export default achievements;

// Helper functions
export const getAchievement = (achievementId) => achievements.find(achievement => achievement.id === achievementId);
export const getPublicAchievements = () => achievements.filter(achievement => !achievement.secret);
export const getAchievementsByCategory = (category) => achievements.filter(achievement => achievement.category === category);
export const getAchievementsByRarity = (rarity) => achievements.filter(achievement => achievement.rarity === rarity);