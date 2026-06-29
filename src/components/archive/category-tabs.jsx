import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CATEGORIES } from '../../utils/file-utils';

/**
 * CategoryTabs 컴포넌트
 *
 * Props:
 * @param {string} selected - 현재 선택된 카테고리 [Required]
 * @param {function} onSelect - 카테고리 선택 콜백 [Required]
 * @param {object} counts - 카테고리별 파일 개수 [Optional, 기본값: {}]
 *
 * Example usage:
 * <CategoryTabs selected="전체 보기" onSelect={setCategory} counts={counts} />
 */
function CategoryTabs({ selected, onSelect, counts = {} }) {
  return (
    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', mb: 3 }}>
      {CATEGORIES.map((cat) => {
        const count = counts[cat] ?? 0;
        const isActive = selected === cat;
        return (
          <Button
            key={cat}
            size="small"
            onClick={() => onSelect(cat)}
            sx={{
              height: 34,
              px: '14px',
              borderRadius: '20px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              backgroundColor: isActive ? '#E63012' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#666666',
              border: isActive ? '1px solid #E63012' : '1px solid #E0E0E0',
              '&:hover': {
                backgroundColor: isActive ? '#C42508' : '#F5F5F5',
              },
            }}
          >
            {cat}
            {count > 0 && (
              <Box
                component="span"
                sx={{
                  ml: '6px',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: isActive ? 'rgba(255,255,255,0.8)' : '#AAAAAA',
                }}
              >
                {count}
              </Box>
            )}
          </Button>
        );
      })}
    </Box>
  );
}

export default CategoryTabs;
