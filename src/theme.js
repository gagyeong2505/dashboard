import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E63012',
      light: '#FF5733',
      dark: '#C42508',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F2E8A0',
      contrastText: '#E63012',
    },
    background: {
      default: '#E63012',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#777777',
    },
    divider: '#F5ECEA',
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans KR", "Roboto", sans-serif',
    h1: { fontSize: '1.625rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 },
    body1: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 },
    caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.4 },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: 'none',
          border: '1px solid #F5ECEA',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#E63012',
        },
      },
    },
  },
});

export default theme;
