import React, { useState, useEffect } from 'react';import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Paper,
  Chip,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { getAllMatches, getMatchesByPlayerId }  from '../services/matchService';

const MatchList = ({ matches, onMatchSelect, selectedMatchId }) => {

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" aria-label="match history">
        <TableHead>
          <TableRow>
            <TableCell>Trận đấu</TableCell>
            <TableCell align="center">Kết quả</TableCell>
            <TableCell align="center">K/D/A</TableCell>
            <TableCell align="right">Vàng</TableCell>
            <TableCell align="right">Sát thương</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match) => (
            <TableRow 
              key={match.match_id} 
              hover
              selected={match.match_id === selectedMatchId}
              onClick={() => onMatchSelect(match.match_id)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Typography variant="body2">#{match.match_id}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Player {match.player_id}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={match.result ? 'Thắng' : 'Thua'}
                  size="small"
                  sx={{ 
                    backgroundColor: match.result ? green[100] : red[100],
                    color: match.result ? green[800] : red[800]
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Chip label={match.kills} size="small" color="success" />
                  <Chip label={match.deaths} size="small" color="error" />
                  <Chip label={match.assists} size="small" />
                </Box>
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(match.gold)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(match.damage)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchList;