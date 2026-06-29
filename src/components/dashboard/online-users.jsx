import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

const USERS = [
  { id: 1, name: 'Kim Jiho', handle: '@jiho.kim', initials: 'KJ', color: '#E63012' },
  { id: 2, name: 'Park Soyeon', handle: '@soyeon.p', initials: 'PS', color: '#FF5733' },
  { id: 3, name: 'Lee Donghyun', handle: '@donghyun', initials: 'LD', color: '#C42508' },
  { id: 4, name: 'Choi Ara', handle: '@ara_choi', initials: 'CA', color: '#D4414A' },
  { id: 5, name: 'Jung Minsoo', handle: '@minsoo_j', initials: 'JM', color: '#A81E05' },
];

function OnlineUsers() {
  return (
    <Box>
      {USERS.map((user, idx) => (
        <Box
          key={user.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: '10px',
            borderBottom: idx < USERS.length - 1 ? '1px solid #F5ECEA' : 'none',
          }}
        >
          <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  border: '2px solid #FFFAF8',
                }}
              />
            }
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: user.color,
                fontSize: '0.6875rem',
                fontWeight: 700,
              }}
            >
              {user.initials}
            </Avatar>
          </Badge>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: '0.6875rem', color: '#BBBBBB', lineHeight: 1.3 }}>
              {user.handle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default OnlineUsers;
