import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import GuestbookCard from './guestbook-card';

/**
 * GuestbookList 컴포넌트
 *
 * Props:
 * @param {Array} entries - 방명록 항목 배열 [Required]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {boolean} isSubmitting - 처리 중 여부 [Optional, 기본값: false]
 * @param {function} onEdit - 수정 콜백 [Required]
 * @param {function} onDelete - 삭제 콜백 [Required]
 *
 * Example usage:
 * <GuestbookList entries={entries} isLoading={loading} onEdit={handleEdit} onDelete={handleDelete} />
 */
function GuestbookList({ entries, isLoading = false, isSubmitting = false, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
        <CircularProgress sx={{ color: '#E63012' }} />
        <Typography variant="body1" color="text.secondary">
          방명록을 불러오는 중...
        </Typography>
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 12,
          gap: 1.5,
        }}
      >
        <ForumRoundedIcon sx={{ fontSize: 60, color: '#E0E0E0' }} />
        <Typography sx={{ fontSize: '0.9375rem', color: '#BBBBBB', fontWeight: 500 }}>
          아직 방명록이 없습니다
        </Typography>
        <Typography variant="caption" color="text.secondary">
          첫 번째 방명록을 남겨보세요
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {entries.map((entry) => (
        <GuestbookCard
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
          isSubmitting={isSubmitting}
        />
      ))}
    </Box>
  );
}

export default GuestbookList;
