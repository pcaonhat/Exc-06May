import React, { useEffect, useState } from 'react';
import { Book } from '../data/interfaces'
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
import { deepPurple } from '@mui/material/colors';
interface BookListProps {
    onSelect: (id: number) => void;
  }
  const BookList: React.FC<BookListProps> = ({ onSelect }) => {
  const [book, setBook] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllPlayers()
//       .then(data => {
//         setPlayers(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {book.map((book) => (
        <React.Fragment key={book.id}>
          <ListItem 
            alignItems="flex-start"
            component="button"
            onClick={() => onSelect(book.id)}
            sx={{
              '&:hover': { backgroundColor: 'action.hover' },
              transition: 'background-color 0.2s'
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {book.title.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" component="div">
                  {book.title}
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
                    Thể loại: {book.genre}
                  </Typography>
                  <Chip 
                    label={`#${book.id}`} 
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

export default BookList;