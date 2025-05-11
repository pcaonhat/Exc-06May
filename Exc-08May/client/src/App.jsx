import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';

// Tạo theme với các màu phù hợp cho ứng dụng game
const theme = createTheme({
  palette: {
    mode: 'light', // Có thể chuyển thành 'dark' nếu muốn dark mode
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ff5722', // Màu cam phù hợp với giao diện game
    },
    background: {
      default: '#f8f9fa', // Màu nền nhẹ nhàng
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif', // Font chữ hiện đại
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        <Home />
      </div>
    </ThemeProvider>
  );
};

export default App;