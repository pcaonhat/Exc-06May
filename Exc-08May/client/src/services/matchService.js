import axios from 'axios';

export const getAllMatches = async () => {
  const response = await axios.get('/api/matchPlayers');
  return response.data;
};

export const getMatchesByPlayerId = async (playerId) => {
  const response = await axios.get(`/api/matchPlayers/${playerId}`);
  return response.data;
};

export const getMatchesByMatchId = async (matchId) => {
  const response = await axios.get(`/api/matchPlayers/match/${matchId}`);
  return response.data;
}