import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const FILTERS = ['전체', '진행중', '완료', '즐겨찾기'];

/**
 * FilterBar 컴포넌트
 *
 * Props:
 * @param {function} onFilterChange - 필터 변경 시 호출 [Optional]
 *
 * Example usage:
 * <FilterBar onFilterChange={(f) => setFilter(f)} />
 */
function FilterBar({ onFilterChange }) {
  const [active, setActive] = useState('전체');
  const [sort, setSort] = useState('최신순');

  const handleFilter = (f) => {
    setActive(f);
    onFilterChange?.(f);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <Button
            key={f}
            size='small'
            onClick={() => handleFilter(f)}
            sx={{
              height: 32,
              px: '12px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              minWidth: 'auto',
              backgroundColor: active === f ? '#E63012' : 'transparent',
              color: active === f ? '#FFFFFF' : '#777777',
              border: active === f ? '1px solid #E63012' : '1px solid #E8E0E0',
              '&:hover': {
                backgroundColor: active === f ? '#C42508' : '#F5F0F0',
                borderColor: active === f ? '#C42508' : '#D0C8C8',
              },
            }}
          >
            {f}
          </Button>
        ))}
      </Box>
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        size='small'
        IconComponent={KeyboardArrowDownRoundedIcon}
        sx={{
          height: 32,
          fontSize: '0.8125rem',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E8E0E0' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E63012' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E63012' },
          borderRadius: '8px',
        }}
      >
        <MenuItem value='최신순'>최신순</MenuItem>
        <MenuItem value='이름순'>이름순</MenuItem>
        <MenuItem value='진도순'>진도순</MenuItem>
      </Select>
    </Box>
  );
}

export default FilterBar;
