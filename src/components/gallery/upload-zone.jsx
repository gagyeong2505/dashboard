import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';

/**
 * UploadZone 컴포넌트
 *
 * Props:
 * @param {function} onUpload - 파일 선택 시 실행할 함수 [Required]
 * @param {boolean} isUploading - 업로드 진행 중 여부 [Required]
 *
 * Example usage:
 * <UploadZone onUpload={handleUpload} isUploading={uploading} />
 */
export default function UploadZone({ onUpload, isUploading }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) onUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleChange = (e) => {
    if (e.target.files.length > 0) onUpload(e.target.files);
    e.target.value = '';
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isUploading && inputRef.current?.click()}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'divider',
        borderRadius: 3,
        py: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        cursor: isUploading ? 'not-allowed' : 'pointer',
        bgcolor: isDragging ? 'primary.50' : 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
      }}
    >
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple
        hidden
        onChange={handleChange}
      />
      {isUploading ? (
        <>
          <CircularProgress size={36} />
          <Typography variant='body2' color='text.secondary'>업로드 중...</Typography>
        </>
      ) : (
        <>
          <UploadFileIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant='h6' fontWeight={600}>이미지를 드래그하거나 클릭하여 업로드</Typography>
          <Typography variant='body2' color='text.secondary'>JPG, PNG, GIF, WEBP 지원 · 파일당 최대 50MB</Typography>
          <Button variant='contained' size='small' sx={{ mt: 1 }}>파일 선택</Button>
        </>
      )}
    </Box>
  );
}
