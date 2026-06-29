import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

/**
 * ImageCard 컴포넌트
 *
 * Props:
 * @param {object} image - { name, publicUrl } [Required]
 * @param {function} onPreview - 미리보기 클릭 핸들러 [Required]
 * @param {function} onDelete - 삭제 클릭 핸들러 [Required]
 *
 * Example usage:
 * <ImageCard image={img} onPreview={handlePreview} onDelete={handleDelete} />
 */
export default function ImageCard({ image, onPreview, onDelete }) {
  const handleDownload = async (e) => {
    e.stopPropagation();
    const res = await fetch(image.publicUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const displayName = image.name.replace(/^\d+_[a-z0-9]+\./, '').slice(0, 24);

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => onPreview(image)}>
        <CardMedia
          component='img'
          image={image.publicUrl}
          alt={image.name}
          sx={{ height: 200, objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover': { opacity: 1 },
          }}
        >
          <ZoomInIcon sx={{ color: 'white', fontSize: 40 }} />
        </Box>
      </Box>

      <CardActions sx={{ justifyContent: 'space-between', px: 1.5, py: 1 }}>
        <Typography variant='caption' color='text.secondary' noWrap sx={{ maxWidth: 120 }}>
          {displayName}
        </Typography>
        <Box>
          <Tooltip title='다운로드'>
            <IconButton size='small' onClick={handleDownload}>
              <DownloadIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='삭제'>
            <IconButton size='small' color='error' onClick={(e) => { e.stopPropagation(); onDelete(image.name); }}>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}
