const express = require('express');
const router = express.Router();

const matchController = require('../controllers/matchController');

router.get('/', matchController.getAllMatchPlayers);
router.get('/:player_id', matchController.getMatchPlayerByPlayerId);
router.get('/match/:match_id', matchController.getMatchPlayerByMatchId);

module.exports = router;