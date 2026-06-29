import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';

/**
 * FileUploadArea 컴포넌트
 *
 * Props:
 * @param {function} onUpload - 파일 업로드 콜백 (FileList 수신) [Required]
 * @param {boolean} isUploading - 업로드 진행 중 여부 [Optional, 기본값: false]
 * @param {number} uploadProgress - 업로드 진행률 0~100 [Optional, 기본값: 0]
 *
 * Example usage:
 * <FileUploadArea onUpload={handleUpload} isUploading={uploading} uploadProgress={progress} />
 */
function FileUploadArea({ onUpload, isUploading = false, uploadProgress = 0 }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isUploading) setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (!isUploading && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleZoneClick = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onUpload(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* 드래그앤드롭 영역 */}
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleZoneClick}
        sx={{
          border: `2px dashed ${isDragActive ? '#E63012' : '#DDDDDD'}`,
          borderRadius: '16px',
          py: { xs: 5, md: 7 },
          px: 3,
          textAlign: 'center',
          backgroundColor: isDragActive ? '#FFF5F3' : '#FFFFFF',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': !isUploading ? { borderColor: '#E63012', backgroundColor: '#FFF5F3' } : {},
        }}
      >
        <CloudUploadRoundedIcon
          sx={{ fontSize: { xs: 40, md: 52 }, color: isDragActive ? '#E63012' : '#CCCCCC', mb: 1.5 }}
        />
        <Typography sx={{ fontSize: { xs: '0.9375rem', md: '1.0625rem' }, fontWeight: 600, color: '#333', mb: 0.5 }}>
          {isDragActive ? '여기에 파일을 놓으세요' : '파일을 드래그하거나 클릭하여 업로드'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          모든 파일 형식 지원 · 여러 파일 동시 업로드 가능 · 최대 100MB
        </Typography>
      </Box>

      {/* 버튼 그룹 */}
      <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<CloudUploadRoundedIcon />}
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            backgroundColor: '#E63012',
            '&:hover': { backgroundColor: '#C42508' },
            '&:disabled': { backgroundColor: '#FFCDC5', color: '#FFFFFF' },
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.875rem',
            px: 3,
            height: 40,
          }}
        >
          파일 선택
        </Button>
        <Button
          variant="outlined"
          startIcon={<FolderOpenRoundedIcon />}
          disabled={isUploading}
          onClick={() => folderInputRef.current?.click()}
          sx={{
            borderColor: '#E63012',
            color: '#E63012',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.875rem',
            px: 3,
            height: 40,
            '&:hover': { borderColor: '#C42508', backgroundColor: '#FFF5F3' },
            '&:disabled': { borderColor: '#FFCDC5', color: '#FFCDC5' },
          }}
        >
          폴더 업로드
        </Button>
      </Box>

      {/* 업로드 진행 상태 바 */}
      {isUploading && (
        <Box sx={{ mt: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" sx={{ fontSize: '0.8125rem', color: '#555' }}>
              업로드 중...
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#E63012' }}>
              {uploadProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#F5ECEA',
              '& .MuiLinearProgress-bar': { backgroundColor: '#E63012', borderRadius: 4 },
            }}
          />
        </Box>
      )}

      {/* 숨김 input (파일 선택) */}
      <input ref={fileInputRef} type="file" multiple hidden onChange={handleFileChange} />
      {/* 숨김 input (폴더 선택) — webkitdirectory 속성으로 폴더 선택 활성화 */}
      <input ref={folderInputRef} type="file" webkitdirectory="" multiple hidden onChange={handleFileChange} />
    </Box>
  );
}

export default FileUploadArea;
