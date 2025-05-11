import React, { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Divider,
  Typography,
  CircularProgress,
  Box,
  Chip
} from '@mui/material';
import { getAllPlayers } from '../services/playerService';
import { deepPurple } from '@mui/material/colors';

const PlayerList = ({ onSelect }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPlayers()
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {players.map((player) => (
        <React.Fragment key={player.id}>
          <ListItem 
            alignItems="flex-start"
            button
            onClick={() => onSelect(player.id)}
            sx={{
              '&:hover': { backgroundColor: 'action.hover' },
              transition: 'background-color 0.2s'
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {player.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" component="div">
                  {player.name}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'inline-block', mr: 1 }}
                  >
                    ELO: {player.elo}
                  </Typography>
                  <Chip 
                    label={`#${player.id}`} 
                    size="small" 
                    variant="outlined"
                  />
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PlayerList;