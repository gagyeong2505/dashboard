import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FileIcon from './file-icon';
import { formatFileSize, formatDate } from '../../utils/file-utils';

/**
 * FileCard 컴포넌트
 *
 * Props:
 * @param {object} file - 파일 메타데이터 객체 [Required]
 * @param {function} onDelete - 삭제 콜백 함수 [Required]
 * @param {boolean} isSelectMode - 파일 선택 모드 여부 [Optional, 기본값: false]
 * @param {boolean} isSelected - 현재 선택 여부 [Optional, 기본값: false]
 * @param {function} onToggleSelect - 선택 토글 콜백 (id 전달) [Optional]
 *
 * Example usage:
 * <FileCard file={fileObj} onDelete={handleDelete} isSelectMode={true} isSelected={false} onToggleSelect={handleToggle} />
 */
function FileCard({ file, onDelete, isSelectMode = false, isSelected = false, onToggleSelect }) {
  /* cross-origin URL에서 download 속성이 무시되는 문제를 피하기 위해
     fetch로 파일을 받아 Blob URL(same-origin)로 변환 후 다운로드 */
  const handleDownload = async () => {
    try {
      const response = await fetch(file.public_url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('다운로드 실패:', err);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`"${file.original_name}" 파일을 삭제하시겠습니까?`)) {
      onDelete(file);
    }
  };

  return (
    <Box
      onClick={isSelectMode ? () => onToggleSelect(file.id) : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, md: 2 },
        p: { xs: '12px 14px', md: '14px 18px' },
        borderRadius: '12px',
        border: `1px solid ${isSelected ? '#E63012' : '#F0F0F0'}`,
        backgroundColor: isSelected ? '#FFF5F3' : '#FFFFFF',
        cursor: isSelectMode ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s, border-color 0.15s, background-color 0.15s',
        '&:hover': isSelectMode
          ? { backgroundColor: isSelected ? '#FFF0ED' : '#FAFAFA' }
          : { boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderColor: '#E0E0E0' },
      }}
    >
      {/* 선택 모드 체크박스 */}
      {isSelectMode && (
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(file.id)}
          onClick={(e) => e.stopPropagation()}
          size="small"
          sx={{
            p: 0,
            flexShrink: 0,
            color: '#DDDDDD',
            '&.Mui-checked': { color: '#E63012' },
          }}
        />
      )}

      {/* 파일 타입 아이콘 */}
      <FileIcon category={file.category} extension={file.extension} />

      {/* 파일 정보 */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '4px', flexWrap: 'wrap' }}>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1A1A1A',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: { xs: '150px', sm: '260px', md: '420px', lg: '560px' },
            }}
          >
            {file.original_name}
          </Typography>
          {/* 폴더 경로 표시 */}
          {file.folder_path && (
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: '#AAAAAA',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              📁 {file.folder_path}
            </Typography>
          )}
        </Box>

        {/* 메타 정보 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={file.category}
            size="small"
            sx={{ height: 20, fontSize: '0.6875rem', fontWeight: 600, backgroundColor: '#F5F5F5', color: '#666' }}
          />
          <Typography variant="caption" color="text.secondary">
            {formatFileSize(file.file_size)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {formatDate(file.created_at)}
          </Typography>
          {file.extension && (
            <Typography variant="caption" sx={{ color: '#CCCCCC', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
              .{file.extension}
            </Typography>
          )}
        </Box>
      </Box>

      {/* 액션 버튼 */}
      <Box sx={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        <Tooltip title="다운로드">
          <IconButton
            size="small"
            onClick={handleDownload}
            sx={{
              width: 36,
              height: 36,
              backgroundColor: '#E63012',
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#C42508' },
            }}
          >
            <DownloadRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제">
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{
              width: 36,
              height: 36,
              color: '#CCCCCC',
              '&:hover': { color: '#E63012', backgroundColor: '#FFF0EE' },
            }}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default FileCard;
