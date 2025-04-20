const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController');
const missionController = require('../controller/missionController');
// const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// These routes don't require authentication - they take userId as query param
router.get('/progress', gameController.getGameProgress);
router.get('/planets', gameController.getPlanets);
router.get('/planets/:planetId/missions', gameController.getMissions);

// Mission routes
router.get('/missions/:missionId', missionController.getMission);
router.post('/missions/:missionId/complete', gameController.completeMission);
router.post('/missions/:missionId/verify', missionController.verifyMissionSolution);

module.exports = router;