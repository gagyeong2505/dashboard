import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/common/nav-bar';
import ArchivePage from './pages/archive-page';
import GuestbookPage from './pages/guestbook-page';

function App() {
  return (
    <BrowserRouter basename="/dashboard">
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ArchivePage />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
