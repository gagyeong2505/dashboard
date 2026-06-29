import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ImageIcon from '@mui/icons-material/Image';
import ImageCard from './image-card';

/**
 * GalleryGrid 컴포넌트
 *
 * Props:
 * @param {Array} images - 이미지 목록 [Required]
 * @param {boolean} isLoading - 로딩 여부 [Required]
 * @param {function} onPreview - 미리보기 핸들러 [Required]
 * @param {function} onDelete - 삭제 핸들러 [Required]
 *
 * Example usage:
 * <GalleryGrid images={images} isLoading={loading} onPreview={handlePreview} onDelete={handleDelete} />
 */
export default function GalleryGrid({ images, isLoading, onPreview, onDelete }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
        <ImageIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
        <Typography variant='h6' color='text.secondary'>업로드된 이미지가 없습니다</Typography>
        <Typography variant='body2' color='text.disabled'>위 업로드 영역에 이미지를 드래그하거나 클릭하여 추가하세요</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {images.map((image) => (
        <Grid key={image.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ImageCard image={image} onPreview={onPreview} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
