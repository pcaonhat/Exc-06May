const matchService = require('../services/matchService');

exports.getAllMatchPlayers = async (request, response) => {
    try {
        const result = await matchService.getAllMatchPlayers();
        response.json(result.rows);
    } catch (error) {
        console.error('Error fetching match players:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMatchPlayerByPlayerId = async (request, response) => {
    const player_id = request.params.player_id;
    try {
        const result = await matchService.getMatchPlayerByPlayerId(player_id);
        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'Match for player id not found' });
        }
        response.json(result.rows);
    } catch (error) {
        console.error('Error fetching match player by ID:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMatchPlayerByMatchId = async (request, response) => {
    const match_id = request.params.match_id;
    try {
        const result = await matchService.getMatchPlayerByMatchId(match_id);
        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'Match for match id not found' });
        }
        response.json(result.rows);
    } catch (error) {
        console.error('Error fetching match player by ID:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}