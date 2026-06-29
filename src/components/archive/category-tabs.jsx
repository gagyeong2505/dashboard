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
 * @param {boolean} isSelectMode - 파일 선택 모드 여부 [Optional, 기본값: false]
 * @param {function} onToggleSelectMode - 선택 모드 토글 콜백 [Optional]
 * @param {number} selectedCount - 현재 선택된 파일 수 [Optional, 기본값: 0]
 * @param {number} totalCount - 현재 표시 중인 전체 파일 수 [Optional, 기본값: 0]
 * @param {function} onSelectAll - 전체 선택/해제 콜백 [Optional]
 * @param {function} onDeleteSelected - 선택 파일 삭제 콜백 [Optional]
 *
 * Example usage:
 * <CategoryTabs selected="전체 보기" onSelect={setCategory} counts={counts} />
 */
function CategoryTabs({
  selected,
  onSelect,
  counts = {},
  isSelectMode = false,
  onToggleSelectMode,
  selectedCount = 0,
  totalCount = 0,
  onSelectAll,
  onDeleteSelected,
}) {
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {/* 좌측: 파일 선택 버튼 + 카테고리 탭들 */}
        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* 파일 선택 / 취소 버튼 */}
          <Button
            size="small"
            onClick={onToggleSelectMode}
            sx={{
              height: 34,
              px: '14px',
              borderRadius: '20px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: isSelectMode ? '#1A1A1A' : 'transparent',
              color: isSelectMode ? '#FFFFFF' : '#444444',
              border: isSelectMode ? '1px solid #1A1A1A' : '1px solid #AAAAAA',
              '&:hover': {
                backgroundColor: isSelectMode ? '#333333' : '#F0F0F0',
              },
            }}
          >
            {isSelectMode ? '취소' : '파일 선택'}
          </Button>

          {/* 카테고리 탭 */}
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

        {/* 우측: 선택 모드 활성화 시 전체선택 + 삭제 버튼 */}
        {isSelectMode && (
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Button
              size="small"
              onClick={onSelectAll}
              sx={{
                height: 34,
                px: '14px',
                borderRadius: '20px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                backgroundColor: 'transparent',
                color: '#555555',
                border: '1px solid #DDDDDD',
                '&:hover': { backgroundColor: '#F5F5F5' },
              }}
            >
              {isAllSelected ? '전체 해제' : '전체 선택'}
            </Button>
            <Button
              size="small"
              disabled={selectedCount === 0}
              onClick={onDeleteSelected}
              sx={{
                height: 34,
                px: '14px',
                borderRadius: '20px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                backgroundColor: selectedCount > 0 ? '#E63012' : 'transparent',
                color: selectedCount > 0 ? '#FFFFFF' : '#CCCCCC',
                border: `1px solid ${selectedCount > 0 ? '#E63012' : '#E0E0E0'}`,
                '&:hover': { backgroundColor: selectedCount > 0 ? '#C42508' : 'transparent' },
                '&.Mui-disabled': { backgroundColor: 'transparent', color: '#CCCCCC', border: '1px solid #E0E0E0' },
              }}
            >
              삭제{selectedCount > 0 ? ` (${selectedCount})` : ''}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CategoryTabs;
