import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Box from '@mui/material/Box';

/**
 * PasswordDialog 컴포넌트
 *
 * Props:
 * @param {boolean} open - 다이얼로그 열림 여부 [Required]
 * @param {string} mode - 'edit' | 'delete' [Required]
 * @param {boolean} isLoading - 처리 중 여부 [Optional, 기본값: false]
 * @param {boolean} hasError - 비밀번호 오류 여부 [Optional, 기본값: false]
 * @param {function} onConfirm - 확인 콜백 (password: string) [Required]
 * @param {function} onClose - 닫기 콜백 [Required]
 *
 * Example usage:
 * <PasswordDialog open={open} mode="delete" onConfirm={handleConfirm} onClose={handleClose} />
 */
function PasswordDialog({ open, mode, isLoading = false, hasError = false, onConfirm, onClose }) {
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  const handleConfirm = () => {
    if (!password) return;
    onConfirm(password);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm();
  };

  const isDelete = mode === 'delete';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockRoundedIcon sx={{ fontSize: 20, color: '#E63012' }} />
          <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {isDelete ? '삭제 확인' : '수정 확인'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: '12px !important' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isDelete
            ? '작성 시 설정한 비밀번호를 입력하면 글이 삭제됩니다.'
            : '작성 시 설정한 비밀번호를 입력하면 수정 화면으로 이동합니다.'}
        </Typography>
        <TextField
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          error={hasError}
          helperText={hasError ? '비밀번호가 일치하지 않습니다.' : ''}
          fullWidth
          size="small"
          autoFocus
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E63012' },
            },
            '& label.Mui-focused': { color: '#E63012' },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          sx={{ color: '#888888', borderRadius: '10px', fontWeight: 500 }}
        >
          취소
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!password || isLoading}
          sx={{
            backgroundColor: isDelete ? '#E63012' : '#1A1A1A',
            '&:hover': { backgroundColor: isDelete ? '#C42508' : '#333333' },
            '&:disabled': { backgroundColor: '#EEEEEE', color: '#AAAAAA' },
            borderRadius: '10px',
            fontWeight: 600,
            px: 2.5,
          }}
        >
          {isLoading ? '처리 중...' : isDelete ? '삭제' : '확인'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordDialog;
