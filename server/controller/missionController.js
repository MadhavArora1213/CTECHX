const Mission = require('../models/Mission');

exports.getMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    
    const mission = await Mission.findById(missionId);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    
    res.json(mission);
  } catch (error) {
    console.error('Error fetching mission:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyMissionSolution = async (req, res) => {
  try {
    const { missionId } = req.params;
    const { solution } = req.body;
    
    const mission = await Mission.findById(missionId);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    
    // Each mission type needs its own verification logic
    let isCorrect = false;
    let score = 0;
    
    switch (mission.type) {
      case 'code':
        // Evaluate code solution
        ({ isCorrect, score } = evaluateCodeSolution(mission, solution));
        break;
      
      case 'puzzle':
        // Verify puzzle solution
        ({ isCorrect, score } = verifyPuzzleSolution(mission, solution));
        break;
      
      case 'quiz':
        // Check quiz answers
        ({ isCorrect, score } = checkQuizAnswers(mission, solution));
        break;
        
      case 'dragdrop':
        // Verify dragdrop arrangement
        ({ isCorrect, score } = verifyDragDropSolution(mission, solution));
        break;
        
      default:
        return res.status(400).json({ message: 'Unknown mission type' });
    }
    
    res.json({
      isCorrect,
      score,
      feedback: isCorrect 
        ? "Great job! Mission accomplished!" 
        : "Not quite right. Try again!"
    });
    
  } catch (error) {
    console.error('Error verifying solution:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Solution verification helper functions
function evaluateCodeSolution(mission, solution) {
  // This would be more complex in production with a code execution engine
  const expectedOutput = mission.expectedOutput;
  const isCorrect = solution.trim() === expectedOutput.trim();
  
  return {
    isCorrect,
    score: isCorrect ? 100 : 0
  };
}

function verifyPuzzleSolution(mission, solution) {
  const correctSolution = mission.solution;
  const isCorrect = JSON.stringify(solution) === JSON.stringify(correctSolution);
  
  return {
    isCorrect,
    score: isCorrect ? 100 : 0
  };
}

function checkQuizAnswers(mission, solution) {
  let correctAnswers = 0;
  const totalQuestions = mission.questions.length;
  
  mission.questions.forEach((question, index) => {
    if (question.correctAnswer === solution[index]) {
      correctAnswers++;
    }
  });
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const isCorrect = score >= mission.passingScore;
  
  return {
    isCorrect,
    score
  };
}

function verifyDragDropSolution(mission, solution) {
  // Compare user's arrangement with the correct one
  const correctSolution = mission.solution;
  
  // For drag and drop, we might need to compare arrays of positions or connections
  let correctItems = 0;
  const totalItems = correctSolution.length;
  
  solution.forEach((item, index) => {
    if (JSON.stringify(item) === JSON.stringify(correctSolution[index])) {
      correctItems++;
    }
  });
  
  const score = Math.round((correctItems / totalItems) * 100);
  const isCorrect = score >= mission.passingScore;
  
  return {
    isCorrect,
    score
  };
}