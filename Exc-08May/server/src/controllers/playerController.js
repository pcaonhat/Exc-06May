const playerServices = require('../services/playerService');

exports.getAllPlayers = async (request, response) => {
  const result = await playerServices.getAllPlayers();
  response.json(result.rows);
};
