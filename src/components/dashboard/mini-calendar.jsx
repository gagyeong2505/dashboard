import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function MiniCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const isCurrentMonth = today.getFullYear() === viewYear && today.getMonth() === viewMonth;

  const handlePrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A1A' }}>
          {viewYear}년 {MONTHS[viewMonth]}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <IconButton size='small' onClick={handlePrev} sx={{ p: '2px', color: '#AAAAAA' }}>
            <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton size='small' onClick={handleNext} sx={{ p: '2px', color: '#AAAAAA' }}>
            <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: '4px' }}>
        {DAYS.map((d) => (
          <Box key={d} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: '2px' }}>
            <Typography sx={{ fontSize: '0.625rem', color: '#BBBBBB', fontWeight: 500 }}>{d}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((day, idx) => {
          const isToday = isCurrentMonth && day === today.getDate();
          return (
            <Box
              key={idx}
              sx={{
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                cursor: day ? 'pointer' : 'default',
                backgroundColor: isToday ? '#E63012' : 'transparent',
                '&:hover': day && !isToday ? { backgroundColor: '#F5F0F0' } : {},
              }}
            >
              {day && (
                <Typography
                  sx={{
                    fontSize: '0.6875rem',
                    fontWeight: isToday ? 700 : 400,
                    color: isToday ? '#FFFFFF' : '#444444',
                    lineHeight: 1,
                  }}
                >
                  {day}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default MiniCalendar;
