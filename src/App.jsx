import Box from '@mui/material/Box';
import Sidebar from './components/layout/sidebar';
import WidgetPanel from './components/layout/widget-panel';
import DashboardPage from './pages/dashboard-page';

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#E63012',
        display: 'flex',
        alignItems: 'stretch',
        p: { xs: 0, md: '24px' },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          borderRadius: { xs: 0, md: '20px' },
          overflow: 'hidden',
          minHeight: { xs: '100vh', md: 'auto' },
          maxHeight: { md: 'calc(100vh - 48px)' },
        }}
      >
        <Sidebar />
        <DashboardPage />
        <WidgetPanel />
      </Box>
    </Box>
  );
}

export default App;
