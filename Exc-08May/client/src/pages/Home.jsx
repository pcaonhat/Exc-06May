import React, { useState, useEffect } from 'react';
import PlayerList from '../components/PlayerList';
import MatchList from '../components/MatchList';
import { getAllMatches, getMatchesByPlayerId } from '../services/matchService';

const Home = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      if (selectedPlayerId) {
        const data = await getMatchesByPlayerId(selectedPlayerId);
        setMatches(data);
      } else {
        const data = await getAllMatches();
        setMatches(data);
      }
    };
    fetchMatches();
  }, [selectedPlayerId]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', borderRight: '1px solid #ccc' }}>
        <MatchList matches={matches} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <PlayerList onSelect={setSelectedPlayerId} />
      </div>
    </div>
  );
};

export default Home;
