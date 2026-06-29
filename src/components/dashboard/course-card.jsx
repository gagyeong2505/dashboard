import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

/**
 * CourseCard 컴포넌트
 *
 * Props:
 * @param {string} title - 코스 제목 [Required]
 * @param {string} description - 코스 설명 [Required]
 * @param {string} instructor - 강사명 [Required]
 * @param {string} iconBg - 아이콘 영역 배경색 [Optional, 기본값: '#FFE0D6']
 * @param {React.ReactNode} icon - 아이콘 컴포넌트 [Required]
 *
 * Example usage:
 * <CourseCard title="Operating System" description="..." instructor="Dr. Kim" icon={<ComputerIcon />} />
 */
function CourseCard({ title, description, instructor, iconBg = '#FFE0D6', icon }) {
  return (
    <Card sx={{ height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 4px 20px rgba(230,48,18,0.12)' } }}>
      <CardContent sx={{ p: '20px !important', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 90,
            height: 90,
            flexShrink: 0,
            borderRadius: '12px',
            backgroundColor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant='h2' sx={{ mb: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{
              mb: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Created by{' '}
            <Box component='span' sx={{ fontWeight: 600, color: '#E63012' }}>
              {instructor}
            </Box>
          </Typography>
        </Box>

        <IconButton
          size='small'
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            backgroundColor: '#E63012',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#C42508' },
          }}
        >
          <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
