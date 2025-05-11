import React, { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Paper
} from '@mui/material';
import { green, red, blue, orange } from '@mui/material/colors';
import { getMatchesByMatchId } from '../services/matchService';

const MatchDetail = ({ matchId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (matchId) {
      const fetchMatchPlayers = async () => {
        setLoading(true);
        try {
          const data = await getMatchesByMatchId(matchId);
          setPlayers(data || []);
        } catch (error) {
          console.error('Error fetching match details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMatchPlayers();
    }
  }, [matchId]);

  const getTeamColor = (team) => team === 1 ? blue[500] : orange[500];

  if (!matchId) return null;

  return (
    <TableContainer component={Paper} elevation={0}>
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Người chơi</TableCell>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center">Kết quả</TableCell>
              <TableCell align="center">K/D/A</TableCell>
              <TableCell align="right">Vàng</TableCell>
              <TableCell align="right">Sát thương</TableCell>
              <TableCell align="right">∆ ELO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={`${matchId}-${player.player_id}`}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ 
                      bgcolor: getTeamColor(player.team),
                      width: 24, 
                      height: 24,
                      fontSize: '0.75rem',
                      mr: 1
                    }}>
                      {player.player_id.toString().slice(-2)}
                    </Avatar>
                    <Typography variant="body2">{player.name || `Player ${player.player_id}`}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={`Team ${player.team}`} 
                    size="small"
                    sx={{ 
                      bgcolor: getTeamColor(player.team),
                      color: 'white'
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={player.result ? 'Thắng' : 'Thua'}
                    size="small"
                    sx={{ 
                      bgcolor: player.result ? green[100] : red[100],
                      color: player.result ? green[800] : red[800]
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" gap={0.5} justifyContent="center">
                    <Chip label={player.kills} size="small" color="success" />
                    <Chip label={player.deaths} size="small" color="error" />
                    <Chip label={player.assists} size="small" />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontFamily="monospace">
                    {new Intl.NumberFormat().format(player.gold)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontFamily="monospace">
                    {new Intl.NumberFormat().format(player.damage)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography 
                    variant="body2"
                    color={player.elo_after > player.elo_before ? 'success.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {player.elo_after - player.elo_before > 0 ? '+' : ''}
                    {player.elo_after - player.elo_before}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default MatchDetail;