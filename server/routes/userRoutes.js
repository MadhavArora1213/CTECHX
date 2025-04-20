const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/game-stats', userController.getGameStats);
router.get('/achievements', userController.getAchievements);
router.get('/leaderboard', userController.getLeaderboard);
router.post('/primary-path', userController.changePrimaryPath);

module.exports = router;