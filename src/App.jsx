import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import Header from './components/common/header';
import UploadZone from './components/gallery/upload-zone';
import GalleryGrid from './components/gallery/gallery-grid';
import PreviewModal from './components/gallery/preview-modal';
import { useGallery } from './hooks/use-gallery';

function App() {
  const { images, loading, uploading, error, uploadFiles, deleteImage } = useGallery();
  const [preview, setPreview] = useState(null);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      <Header />

      <Container maxWidth='xl' sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography variant='h5' fontWeight={700} gutterBottom>
            이미지 업로드
          </Typography>
          <UploadZone onUpload={uploadFiles} isUploading={uploading} />
        </Box>

        <Divider sx={{ mb: { xs: 3, md: 4 } }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant='h5' fontWeight={700}>
            갤러리
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {images.length}개의 이미지
          </Typography>
        </Box>

        <GalleryGrid
          images={images}
          isLoading={loading}
          onPreview={setPreview}
          onDelete={deleteImage}
        />
      </Container>

      <PreviewModal image={preview} onClose={() => setPreview(null)} />

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => {}}>
        <Alert severity='error' variant='filled'>{error}</Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
