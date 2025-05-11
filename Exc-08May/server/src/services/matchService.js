const pool = require('../../db/connection');

exports.getAllMatchPlayers = async () => {
    try {
        const result = await pool.query('SELECT * FROM match_player ORDER BY match_id ASC');
        return result;
    } catch (error) {
        console.error('Error fetching match players:', error);
        throw error; 
    }
}

exports.getMatchPlayerByPlayerId = async (playerId) => {
    try {
        const result = await pool.query('SELECT * FROM match_player WHERE player_id = $1 ORDER BY match_id ASC', [playerId]);
        return result;
    } catch (error) {
        console.error('Error fetching match player by player Id:', error);
        throw error; 
    }
}

exports.getMatchPlayerByMatchId = async (matchId) => {
    try {
        const result = await pool.query('SELECT * FROM match_player WHERE match_id = $1 ORDER BY team ASC', [matchId]);
        return result;
    } catch (error) {
        console.error('Error fetching match player by match Id:', error);
        throw error; 
    }
}
