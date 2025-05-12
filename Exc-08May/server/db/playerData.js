const fs = require('fs');
const { faker } = require('@faker-js/faker');

let sql = `-- Tạo bảng
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  elo INT NOT NULL DEFAULT 1200
  winrate FLOAT DEFAULT 0,
  rank VARCHAR(50) DEFAULT 'Bronze V',
);

CREATE TABLE IF NOT EXISTS matchs (
  id SERIAL PRIMARY KEY,
  match_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_player (
  match_id INT REFERENCES matchs(id),
  player_id INT REFERENCES players(id),
  team INT CHECK (team IN (1, 2)),
  result BOOLEAN,
  kills INT DEFAULT 0,
  deaths INT DEFAULT 0,
  assists INT DEFAULT 0,
  gold INT DEFAULT 0,
  damage INT DEFAULT 0,
  elo_before INT,
  elo_after INT,
  PRIMARY KEY (match_id, player_id)
);\n\n`;

sql += 'INSERT INTO players (name, elo) VALUES\n';

let players = [];
for (let i = 1; i <= 100; i++) {
  const name = faker.person.fullName().replace("'", "");
  players.push({ id: i, name, elo: 1200, matches: 0 });
  sql += `('${name}', 1200)${i < 100 ? ',' : ';'}\n`;
}

let matchId = 1;

function getRandomPlayers() {
  // Lấy 20 player có ít matches nhất, rồi chọn ngẫu nhiên 10 từ đó
  let sortedPlayers = [...players].sort((a, b) => a.matches - b.matches);
  let candidates = sortedPlayers.slice(0, 20);
  return candidates.sort(() => Math.random() - 0.5).slice(0, 10);

}

function updateElo(player, deltaElo) {
  player.elo += deltaElo;
  if (player.elo < 0) player.elo = 0;
}

const K = 24;

function expectedScore(averageEloTeamA, averageEloTeamB) {
  return 1 / (1 + Math.pow(10, (averageEloTeamA - averageEloTeamB) / 400));
}
function averageElo(team) {
  return team.reduce((sum, player) => sum + player.elo, 0) / team.length;
}

while (players.some(player => player.matches < 100))
{
  const pickedPlayers = getRandomPlayers();
  const team1 = pickedPlayers.slice(0, 5);
  const team2 = pickedPlayers.slice(5, 10);

  const averageEloTeam1 = averageElo(team1);
  const averageEloTeam2 = averageElo(team2);

  const expectedScoreTeam1 = expectedScore(averageEloTeam1, averageEloTeam2);
  const expectedScoreTeam2 = expectedScore(averageEloTeam2, averageEloTeam1);

  const winner = Math.random() < expectedScoreTeam1 ? 1 : 2;

  const handleTeam = (team, teamNum, winner) => {
    for(let player of team) {

      const eloBefore = player.elo;
      const expectedScore = teamNum ? expectedScoreTeam1 : expectedScoreTeam2;

      const isWin = teamNum === winner;
      const result = isWin ? 1 : 0;

      const deltaElo = Math.round(K* (result - expectedScore));

      updateElo(player, deltaElo);

      const kills = Math.floor(Math.random() * 15);
      const deaths = Math.floor(Math.random() * 10);
      const assists = Math.floor(Math.random() * 20);
      const gold = Math.floor(Math.random() * 15000 + 5000);
      const damage = Math.floor(Math.random() * 60000 + 5000);

      sql += `INSERT INTO match_player (match_id, player_id, team, result, kills, deaths, assists, gold, damage, elo_before, elo_after) 
          VALUES (${matchId}, ${player.id}, ${teamNum}, ${isWin}, ${kills}, ${deaths}, ${assists}, ${gold}, ${damage}, ${eloBefore}, ${player.elo});\n`;
      
      sql += `UPDATE players SET elo = ${player.elo} WHERE id = ${player.id};\n`;
      player.matches++;
    }
  }

  //Random match time
  const matchTime = faker.date.past(1);
  sql += `INSERT INTO matchs (id, match_time) VALUES (${matchId}, '${matchTime.toISOString()}');\n`;

  handleTeam(team1, 1, winner);
  handleTeam(team2, 2, winner);

  matchId++;
}

fs.writeFileSync('init.sql', sql);
console.log('✅ Đã tạo file init.sql đầy đủ dữ liệu player và trận đấu.');