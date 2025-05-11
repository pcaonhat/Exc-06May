import axios from 'axios';

export const getAllMatches = async () => {
  const res = await axios.get('/api/matchPlayers');
  return res.data;
};

export const getMatchesByPlayerId = async (id) => {
  const res = await axios.get(`/api/matchPlayers/${id}`);
  return res.data;
};
