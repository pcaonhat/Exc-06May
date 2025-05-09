import React, { useState, useEffect } from 'react';
import './App.css';



function App() {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    fetch('/api/players')
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1> Danh sách player</h1>
      <ul>  
        {players.map(player => (
          <li key = {player.id}>
            {player.name} - ELO: {player.elo}
          </li>
        ) )}
      </ul>
    </div>
  );
}

export default App;
