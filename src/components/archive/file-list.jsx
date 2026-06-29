import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import FileCard from './file-card';

/**
 * FileList 컴포넌트
 *
 * Props:
 * @param {Array} files - 파일 목록 배열 [Required]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {function} onDelete - 삭제 콜백 [Required]
 * @param {boolean} isSelectMode - 파일 선택 모드 여부 [Optional, 기본값: false]
 * @param {Set} selectedIds - 선택된 파일 id 집합 [Optional, 기본값: new Set()]
 * @param {function} onToggleSelect - 선택 토글 콜백 [Optional]
 *
 * Example usage:
 * <FileList files={files} isLoading={loading} onDelete={handleDelete} />
 */
function FileList({ files, isLoading = false, onDelete, isSelectMode = false, selectedIds = new Set(), onToggleSelect }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
        <CircularProgress sx={{ color: '#E63012' }} />
        <Typography variant="body1" color="text.secondary">
          파일 목록을 불러오는 중...
        </Typography>
      </Box>
    );
  }

  if (files.length === 0) {
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
        <InboxRoundedIcon sx={{ fontSize: 60, color: '#E0E0E0' }} />
        <Typography sx={{ fontSize: '0.9375rem', color: '#BBBBBB', fontWeight: 500 }}>
          업로드된 파일이 없습니다
        </Typography>
        <Typography variant="caption" color="text.secondary">
          위 영역에 파일을 드래그하거나 버튼을 눌러 업로드하세요
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onDelete={onDelete}
          isSelectMode={isSelectMode}
          isSelected={selectedIds.has(file.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </Box>
  );
}

export default FileList;
