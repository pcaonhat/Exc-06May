import axios from 'axios';

export const getAllPlayers = async () => {
  const response = await axios.get('/api/players');
  return response.data;
};
