import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

/**
 * GuestbookForm 컴포넌트
 *
 * Props:
 * @param {function} onSubmit - 제출 콜백 ({ author, content, password }) [Required]
 * @param {boolean} isSubmitting - 제출 중 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookForm onSubmit={handleAdd} isSubmitting={submitting} />
 */
function GuestbookForm({ onSubmit, isSubmitting = false }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!author.trim()) next.author = '이름을 입력해주세요.';
    if (!content.trim()) next.content = '내용을 입력해주세요.';
    if (!password) next.password = '비밀번호를 입력해주세요.';
    else if (password.length < 4) next.password = '비밀번호는 4자리 이상이어야 합니다.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = await onSubmit({ author, content, password });
    if (ok) {
      setAuthor('');
      setContent('');
      setPassword('');
      setErrors({});
    }
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E63012' },
    },
    '& label.Mui-focused': { color: '#E63012' },
  };

  return (
    <Paper
      elevation={0}
      sx={{ border: '1px solid #EEEEEE', borderRadius: '16px', p: { xs: 2.5, md: 3 }, mb: 4, backgroundColor: '#FFFFFF' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <EditRoundedIcon sx={{ fontSize: 20, color: '#E63012' }} />
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A' }}>방명록 작성</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={!!errors.author}
            helperText={errors.author}
            size="small"
            sx={{ ...fieldSx, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRoundedIcon sx={{ fontSize: 18, color: '#AAAAAA' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password || '수정·삭제 시 사용됩니다'}
            size="small"
            sx={{ ...fieldSx, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ fontSize: 18, color: '#AAAAAA' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TextField
          label="내용"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          error={!!errors.content}
          helperText={errors.content}
          fullWidth
          sx={{ ...fieldSx, mb: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#E63012',
              '&:hover': { backgroundColor: '#C42508' },
              '&:disabled': { backgroundColor: '#FFCDC5', color: '#FFFFFF' },
              borderRadius: '10px',
              fontWeight: 600,
              px: 3,
              height: 40,
            }}
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default GuestbookForm;
