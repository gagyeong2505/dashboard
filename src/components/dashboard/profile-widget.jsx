import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';

function ProfileWidget() {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            backgroundColor: '#E63012',
            fontSize: '1.125rem',
            fontWeight: 700,
          }}
        >
          김
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>
            김가경
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            @gakyung2505
          </Typography>
        </Box>
      </Box>

      <Chip
        label='Student'
        size='small'
        sx={{
          backgroundColor: '#FFE0D6',
          color: '#E63012',
          fontSize: '0.6875rem',
          fontWeight: 600,
          height: 22,
          mb: 2,
        }}
      />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Typography variant='caption' color='text.secondary'>
            학습 진도
          </Typography>
          <Typography variant='caption' sx={{ fontWeight: 700, color: '#E63012' }}>
            72%
          </Typography>
        </Box>
        <LinearProgress
          variant='determinate'
          value={72}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#F5ECEA',
            '& .MuiLinearProgress-bar': { backgroundColor: '#E63012', borderRadius: 3 },
          }}
        />
      </Box>
    </Box>
  );
}

export default ProfileWidget;
