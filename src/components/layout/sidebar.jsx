import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

const MAIN_MENU = [
  { label: 'Dashboard', icon: DashboardRoundedIcon },
  { label: 'All Courses', icon: MenuBookRoundedIcon },
  { label: 'Messages', icon: ChatBubbleRoundedIcon },
  { label: 'Friends', icon: PeopleRoundedIcon },
  { label: 'Schedule', icon: CalendarMonthRoundedIcon },
];

const BOTTOM_MENU = [
  { label: 'Settings', icon: SettingsRoundedIcon },
  { label: 'Directory', icon: FolderRoundedIcon },
];

const ACTIVE_ITEM = 'Dashboard';

/**
 * MenuItem 컴포넌트
 *
 * Props:
 * @param {object} item - 메뉴 아이템 데이터 { label, icon } [Required]
 * @param {boolean} isActive - 활성 상태 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <MenuItem item={{ label: 'Dashboard', icon: DashboardRoundedIcon }} isActive={true} />
 */
function MenuItem({ item, isActive = false }) {
  const IconComponent = item.icon;
  return (
    <ListItem disablePadding sx={{ mb: '4px' }}>
      <ListItemButton
        sx={{
          borderRadius: '10px',
          py: '10px',
          px: '12px',
          gap: '10px',
          backgroundColor: isActive ? '#F2E8A0' : 'transparent',
          '&:hover': {
            backgroundColor: isActive ? '#EDE090' : 'rgba(255,255,255,0.1)',
          },
          transition: 'background-color 0.15s',
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, color: isActive ? '#E63012' : 'rgba(255,255,255,0.8)' }}>
          <IconComponent sx={{ fontSize: 18 }} />
        </ListItemIcon>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: isActive ? 600 : 500,
            color: isActive ? '#E63012' : 'rgba(255,255,255,0.85)',
            lineHeight: 1.2,
          }}
        >
          {item.label}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}

function Sidebar() {
  return (
    <Box
      sx={{
        width: 180,
        flexShrink: 0,
        backgroundColor: '#C42508',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        py: '24px',
        px: '16px',
      }}
    >
      {/* 로고 */}
      <Box sx={{ mb: '28px', px: '4px' }}>
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#F2E8A0',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          eCoursie
        </Typography>
        <Typography sx={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)', mt: '4px' }}>
          Learning Platform
        </Typography>
      </Box>

      {/* 상단 메뉴 */}
      <List disablePadding sx={{ flex: 1 }}>
        {MAIN_MENU.map((item) => (
          <MenuItem key={item.label} item={item} isActive={item.label === ACTIVE_ITEM} />
        ))}
      </List>

      {/* 하단 메뉴 */}
      <Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mb: '16px' }} />
        <List disablePadding>
          {BOTTOM_MENU.map((item) => (
            <MenuItem key={item.label} item={item} isActive={false} />
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
