import React from 'react';

const MatchList = ({ matches }) => {
  return (
    <div>
      <h2>Lịch sử trận đấu</h2>
      {matches.map((m, i) => (
        <div key={i} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
          Trận #{m.match_id} | Người chơi: {m.player_id} | Team: {m.team} | KDA: {m.kills}/{m.deaths}/{m.assists}<br />
          Vàng: {m.gold}, Sát thương: {m.damage}, Kết quả: {m.result ? 'Thắng' : 'Thua'}
        </div>
      ))}
    </div>
  );
};

export default MatchList;
