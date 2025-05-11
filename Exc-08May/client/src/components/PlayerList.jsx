import React, { useEffect, useState } from 'react';
import { getAllPlayers } from '../services/playerService';

const PlayerList = ({ onSelect }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAllPlayers().then(setPlayers);
  }, []);

  return (
    <div>
      <h2>Người chơi</h2>
      {players.map((p) => (
        <div key={p.id} style={{ padding: '8px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
             onClick={() => onSelect(p.id)}>
          <strong>{p.name}</strong> — ELO: {p.elo}
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
