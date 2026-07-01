import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

import { useGuestbook } from '../hooks/use-guestbook';
import GuestbookForm from '../components/guestbook/guestbook-form';
import GuestbookList from '../components/guestbook/guestbook-list';

function GuestbookPage() {
  const {
    entries,
    loading,
    submitting,
    error,
    successMessage,
    addEntry,
    editEntry,
    deleteEntry,
    clearMessages,
  } = useGuestbook();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
      {/* 헤더 */}
      <Box sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EEEEEE', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                backgroundColor: '#E63012',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ForumRoundedIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}
              >
                방명록
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                방문을 기념하는 메시지를 남겨주세요
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        {/* 총 게시글 수 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '0.8125rem', color: '#999999' }}>
            총{' '}
            <Box component="span" sx={{ color: '#E63012', fontWeight: 700 }}>
              {entries.length}
            </Box>
            개의 방명록
          </Typography>
        </Box>

        {/* 작성 폼 */}
        <GuestbookForm onSubmit={addEntry} isSubmitting={submitting} />

        <Divider sx={{ mb: 3 }} />

        {/* 방명록 목록 */}
        <GuestbookList
          entries={entries}
          isLoading={loading}
          isSubmitting={submitting}
          onEdit={editEntry}
          onDelete={deleteEntry}
        />
      </Container>

      {/* 성공 토스트 */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={clearMessages}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={clearMessages} sx={{ borderRadius: '10px' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* 에러 토스트 */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={clearMessages}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={clearMessages} sx={{ borderRadius: '10px' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default GuestbookPage;
