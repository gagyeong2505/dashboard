import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <AppBar position='static' elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <PhotoLibraryIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 28 }} />
        <Typography variant='h6' fontWeight={700} color='text.primary'>
          Gallery Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          VIBE_DASH
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
