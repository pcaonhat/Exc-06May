import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider, 
  useMediaQuery,
  Grid,
  CircularProgress
} from '@mui/material';
import PlayerList from '../components/PlayerList';
import MatchList from '../components/MatchList';
import MatchDetail from '../components/MatchDetail';
import { getAllMatches, getMatchesByPlayerId } from '../services/matchService';

const Home = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const data = selectedPlayerId 
          ? await getMatchesByPlayerId(selectedPlayerId)
          : await getAllMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [selectedPlayerId]);

return (
    <Box sx={{ 
      p: { xs: 1, md: 3 },
      height: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      overflowX: 'auto'
    }}>
      <Grid container spacing={3} sx={{ height: '100%' }} wrap="nowrap">
        {/* Cột 1: Danh sách người chơi */}
        <Grid item xs={12} md={3} sx={{ height: '100%' }}>
          <Paper sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Danh sách người chơi
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <PlayerList 
                onSelect={setSelectedPlayerId} 
                selectedPlayerId={selectedPlayerId}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Cột 2: Danh sách trận đấu */}
        <Grid item xs={12} md={isMobile ? 6 : 4} sx={{ height: '100%' }}>
          <Paper sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedPlayerId ? 'Lịch sử trận đấu' : 'Tất cả trận đấu'}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }}>
              {loading ? (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '100%'
                }}>
                  <CircularProgress />
                </Box>
              ) : (
                <MatchList 
                  matches={matches} 
                  onMatchSelect={setSelectedMatchId}
                  selectedMatchId={selectedMatchId}
                />
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Cột 3: Chi tiết trận đấu */}
        {!isMobile && (
          <Grid item xs={12} md={5} sx={{ height: '100%' }}>
            <Paper sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {selectedMatchId ? `Chi tiết trận #${selectedMatchId}` : 'Chọn một trận đấu'}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                {selectedMatchId ? (
                  <MatchDetail matchId={selectedMatchId} />
                ) : (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: 'text.secondary'
                  }}>
                    <Typography>Nhấn vào trận đấu để xem chi tiết</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Hiển thị dưới dạng Dialog trên mobile */}
      {isMobile && (
        <MatchDetail 
          matchId={selectedMatchId} 
          open={Boolean(selectedMatchId)}
          onClose={() => setSelectedMatchId(null)}
        />
      )}
    </Box>
  );
};

export default Home;