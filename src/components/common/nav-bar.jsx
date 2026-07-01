import { useLocation, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

const NAV_ITEMS = [
  { label: '파일 아카이브', path: '/', icon: <FolderRoundedIcon sx={{ fontSize: 17 }} /> },
  { label: '방명록', path: '/guestbook', icon: <ForumRoundedIcon sx={{ fontSize: 17 }} /> },
];

function NavBar() {
  const { pathname } = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EEEEEE', zIndex: 1100 }}
    >
      <Toolbar sx={{ minHeight: '52px !important', px: { xs: 2, md: 4 }, gap: 1 }}>
        {/* 로고 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 3 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              backgroundColor: '#E63012',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', lineHeight: 1 }}>📦</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
            Archive
          </Typography>
        </Box>

        {/* 네비게이션 링크 */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {NAV_ITEMS.map(({ label, path, icon }) => {
            const isActive = pathname === path;
            return (
              <Button
                key={path}
                component={Link}
                to={path}
                startIcon={icon}
                size="small"
                sx={{
                  height: 34,
                  px: '14px',
                  borderRadius: '20px',
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#E63012' : '#666666',
                  backgroundColor: isActive ? '#FFF0EE' : 'transparent',
                  '&:hover': { backgroundColor: isActive ? '#FFE8E4' : '#F5F5F5' },
                  '& .MuiButton-startIcon': { color: isActive ? '#E63012' : '#AAAAAA' },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
