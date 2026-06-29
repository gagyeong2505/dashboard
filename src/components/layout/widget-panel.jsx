import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ProfileWidget from '../dashboard/profile-widget';
import MiniCalendar from '../dashboard/mini-calendar';
import OnlineUsers from '../dashboard/online-users';

function WidgetPanel() {
  return (
    <Box
      sx={{
        width: 220,
        flexShrink: 0,
        backgroundColor: '#FFFAF8',
        borderLeft: '1px solid #F5ECEA',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        py: '20px',
        px: '16px',
        overflowY: 'auto',
      }}
    >
      {/* 프로필 위젯 */}
      <ProfileWidget />

      <Divider sx={{ borderColor: '#F5ECEA', my: '20px' }} />

      {/* 미니 달력 */}
      <Box>
        <Typography
          sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A1A', mb: 1.5 }}
        >
          일정
        </Typography>
        <MiniCalendar />
      </Box>

      <Divider sx={{ borderColor: '#F5ECEA', my: '20px' }} />

      {/* 온라인 유저 */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A1A' }}>
            Online Users
          </Typography>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#E63012',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.6875rem', color: '#FFFFFF', fontWeight: 700, lineHeight: 1 }}>
              5
            </Typography>
          </Box>
        </Box>
        <OnlineUsers />
      </Box>
    </Box>
  );
}

export default WidgetPanel;
