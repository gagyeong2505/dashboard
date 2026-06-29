import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';

/**
 * PreviewModal 컴포넌트
 *
 * Props:
 * @param {object|null} image - 미리볼 이미지 { name, publicUrl } 또는 null [Required]
 * @param {function} onClose - 모달 닫기 핸들러 [Required]
 *
 * Example usage:
 * <PreviewModal image={selected} onClose={handleClose} />
 */
export default function PreviewModal({ image, onClose }) {
  if (!image) return null;

  const handleDownload = async () => {
    const res = await fetch(image.publicUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal open={!!image} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.85)',
          p: 2,
        }}
        onClick={onClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            gap: 1,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title='다운로드'>
            <IconButton onClick={handleDownload} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='닫기'>
            <IconButton onClick={onClose} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          component='img'
          src={image.publicUrl}
          alt={image.name}
          onClick={(e) => e.stopPropagation()}
          sx={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: 2,
            boxShadow: 24,
          }}
        />

        <Typography
          variant='caption'
          color='grey.400'
          sx={{ mt: 1.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          {image.name}
        </Typography>
      </Box>
    </Modal>
  );
}
