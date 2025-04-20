/**
 * Tech Odyssey Missions Data
 * 
 * Missions are the core gameplay element where students complete coding
 * challenges and learn new skills.
 */

const missions = [
    // CodeForge - Central Hub Missions
    {
      id: 'html-basics',
      title: 'HTML Foundations',
      description: 'Learn the basic structure of HTML documents and create your first webpage.',
      planetId: 'codeforge',
      locationId: 'central-hub',
      type: 'tutorial', // tutorial, challenge, project, quiz
      difficulty: 1, // 1-5 scale
      xpReward: 50,
      itemRewards: ['html-handbook'],
      requiredSkills: [],
      unlocks: ['css-styling'],
      duration: 20, // in minutes
      objectives: [
        'Create an HTML document with proper structure',
        'Add headings, paragraphs, and lists',
        'Include links and images'
      ],
      completionCriteria: {
        type: 'codeSubmission',
        tests: [
          { description: 'Has valid HTML structure with doctype, html, head and body tags', points: 30 },
          { description: 'Includes at least one heading tag', points: 20 },
          { description: 'Contains paragraph text', points: 20 },
          { description: 'Has at least one image with alt text', points: 15 },
          { description: 'Includes a hyperlink to another page', points: 15 }
        ]
      },
      resources: [
        { type: 'video', title: 'HTML Basics', url: 'https://example.com/html-basics' },
        { type: 'article', title: 'Getting Started with HTML', url: 'https://example.com/html-getting-started' }
      ],
      status: 'available' // available, locked, completed
    },
    {
      id: 'css-styling',
      title: 'CSS Styling Adventure',
      description: 'Style your HTML page with CSS to make it visually appealing.',
      planetId: 'codeforge',
      locationId: 'central-hub',
      type: 'challenge',
      difficulty: 1,
      xpReward: 75,
      itemRewards: ['style-brush'],
      requiredSkills: ['html-basics'],
      unlocks: ['responsive-design'],
      duration: 30,
      objectives: [
        'Link a CSS stylesheet to your HTML document',
        'Style text with different colors, sizes, and fonts',
        'Add backgrounds, borders, and spacing',
        'Create a simple layout'
      ],
      completionCriteria: {
        type: 'codeSubmission',
        tests: [
          { description: 'CSS is properly linked to HTML', points: 20 },
          { description: 'Text styling applied (color, font, size)', points: 20 },
          { description: 'Element styling with backgrounds and borders', points: 20 },
          { description: 'Uses margins and padding correctly', points: 20 },
          { description: 'Includes at least one layout technique (flexbox, grid, or positioning)', points: 20 }
        ]
      },
      status: 'locked'
    },
    {
      id: 'js-intro',
      title: 'JavaScript Initiation',
      description: 'Start your journey with JavaScript by learning the fundamentals of the language.',
      planetId: 'codeforge',
      locationId: 'central-hub',
      type: 'tutorial',
      difficulty: 2,
      xpReward: 100,
      itemRewards: ['script-wand'],
      requiredSkills: ['html-basics'],
      unlocks: ['dom-manipulation'],
      duration: 45,
      objectives: [
        'Understand JavaScript data types and variables',
        'Write functions and control flow statements',
        'Use arrays and objects',
        'Add JavaScript to an HTML page'
      ],
      completionCriteria: {
        type: 'multipart',
        parts: [
          {
            type: 'quiz',
            questions: 5,
            passingScore: 80
          },
          {
            type: 'codeSubmission',
            tests: [
              { description: 'JavaScript properly included in HTML', points: 20 },
              { description: 'Uses variables with different data types', points: 20 },
              { description: 'Contains at least one function', points: 20 },
              { description: 'Implements conditional logic', points: 20 },
              { description: 'Works with arrays or objects', points: 20 }
            ]
          }
        ]
      },
      status: 'locked'
    },
  
    // CodeForge - Frontend Valley
    {
      id: 'responsive-design',
      title: 'Responsive Web Design',
      description: 'Learn to create websites that adapt to different screen sizes.',
      planetId: 'codeforge',
      locationId: 'frontend-valley',
      type: 'challenge',
      difficulty: 2,
      xpReward: 125,
      itemRewards: ['responsive-lens'],
      requiredSkills: ['css-styling'],
      unlocks: ['flexbox-mastery'],
      duration: 60,
      objectives: [
        'Understand the principles of responsive design',
        'Use media queries to adapt layouts for different devices',
        'Implement flexible images and grids',
        'Test your site on multiple screen sizes'
      ],
      status: 'locked'
    },
    {
      id: 'flexbox-mastery',
      title: 'Flexbox Layout Master',
      description: 'Harness the power of CSS Flexbox for advanced layouts.',
      planetId: 'codeforge',
      locationId: 'frontend-valley',
      type: 'challenge',
      difficulty: 2,
      xpReward: 150,
      itemRewards: ['flex-container'],
      requiredSkills: ['responsive-design'],
      unlocks: ['css-grid-explorer'],
      duration: 45,
      status: 'locked'
    },
    
    // CodeForge - Backend Mountains
    {
      id: 'node-basics',
      title: 'Node.js Fundamentals',
      description: 'Enter the world of server-side JavaScript with Node.js.',
      planetId: 'codeforge',
      locationId: 'backend-mountains',
      type: 'tutorial',
      difficulty: 3,
      xpReward: 175,
      itemRewards: ['node-module'],
      requiredSkills: ['js-intro'],
      unlocks: ['express-api'],
      duration: 75,
      status: 'locked'
    },
    {
      id: 'express-api',
      title: 'Express API Builder',
      description: 'Create a RESTful API using Express.js.',
      planetId: 'codeforge',
      locationId: 'backend-mountains',
      type: 'project',
      difficulty: 3,
      xpReward: 200,
      itemRewards: ['api-key'],
      requiredSkills: ['node-basics'],
      unlocks: ['mongodb-intro'],
      duration: 90,
      status: 'locked'
    },
    
    // Neuron - Data Harbor
    {
      id: 'python-basics',
      title: 'Python Foundations',
      description: 'Begin your data science journey with Python fundamentals.',
      planetId: 'neuron',
      locationId: 'data-harbor',
      type: 'tutorial',
      difficulty: 2,
      xpReward: 125,
      itemRewards: ['python-scroll'],
      requiredSkills: [],
      unlocks: ['data-analysis-pandas'],
      duration: 60,
      status: 'locked'
    },
    {
      id: 'data-analysis-pandas',
      title: 'Data Analysis with Pandas',
      description: 'Learn to manipulate and analyze data using Python Pandas.',
      planetId: 'neuron',
      locationId: 'data-harbor',
      type: 'challenge',
      difficulty: 3,
      xpReward: 175,
      itemRewards: ['data-goggles'],
      requiredSkills: ['python-basics'],
      unlocks: ['visualization-matplotlib'],
      duration: 75,
      status: 'locked'
    },
    
    // DroidCore - App Station
    {
      id: 'react-native-intro',
      title: 'React Native Introduction',
      description: 'Build your first mobile app using React Native.',
      planetId: 'droidcore',
      locationId: 'app-station',
      type: 'tutorial',
      difficulty: 3,
      xpReward: 150,
      itemRewards: ['mobile-blueprint'],
      requiredSkills: ['js-intro'],
      unlocks: ['react-navigation'],
      duration: 90,
      status: 'locked'
    },
    
    // More missions would be defined similarly...
  ];
  
  export default missions;
  
  // Helper functions
  export const getMission = (missionId) => missions.find(mission => mission.id === missionId);
  export const getMissionsByPlanet = (planetId) => missions.filter(mission => mission.planetId === planetId);
  export const getMissionsByLocation = (planetId, locationId) => {
    return missions.filter(mission => mission.planetId === planetId && mission.locationId === locationId);
  };
  export const getAvailableMissions = (completedMissionIds) => {
    return missions.filter(mission => {
      // Mission is available if:
      // 1. It has no required skills, OR
      // 2. All its required skills are in the completed missions
      if (!mission.requiredSkills || mission.requiredSkills.length === 0) {
        return true;
      }
      return mission.requiredSkills.every(skill => completedMissionIds.includes(skill));
    });
  };