const pool = require('../../db/connection');

exports.getAllPlayers = async () => {
    try {
        const result = await pool.query('SELECT * FROM players ORDER BY id ASC');
        return result;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error; 
    }
}