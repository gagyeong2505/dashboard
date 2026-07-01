import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PasswordDialog from './password-dialog';

/**
 * GuestbookCard 컴포넌트
 *
 * Props:
 * @param {object} entry - 방명록 항목 객체 [Required]
 * @param {function} onEdit - 수정 콜백 ({ id, author, content, password }) [Required]
 * @param {function} onDelete - 삭제 콜백 ({ id, password }) [Required]
 * @param {boolean} isSubmitting - 처리 중 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookCard entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
 */
function GuestbookCard({ entry, onEdit, onDelete, isSubmitting = false }) {
  const [dialog, setDialog] = useState(null); // null | 'edit' | 'delete'
  const [passwordError, setPasswordError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editAuthor, setEditAuthor] = useState(entry.author);
  const [editContent, setEditContent] = useState(entry.content);
  const [pendingPassword, setPendingPassword] = useState('');

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const isEdited = entry.updated_at !== entry.created_at;

  const handlePasswordConfirm = async (password) => {
    setPasswordError(false);
    if (dialog === 'delete') {
      const result = await onDelete({ id: entry.id, password });
      if (result === 'wrong_password') {
        setPasswordError(true);
      } else {
        setDialog(null);
      }
    } else if (dialog === 'edit') {
      setPendingPassword(password);
      const { data, error } = await import('../../lib/supabase').then(async (m) => {
        const res = await m.supabase
          .from('guestbook')
          .select('password_hash')
          .eq('id', entry.id)
          .single();
        return res;
      });
      if (error) { setPasswordError(true); return; }
      const { verifyPassword } = await import('../../utils/crypto-utils');
      const valid = await verifyPassword(password, data.password_hash);
      if (!valid) {
        setPasswordError(true);
      } else {
        setDialog(null);
        setEditMode(true);
      }
    }
  };

  const handleEditSave = async () => {
    const result = await onEdit({
      id: entry.id,
      author: editAuthor,
      content: editContent,
      password: pendingPassword,
    });
    if (result === 'ok') {
      setEditMode(false);
      setPendingPassword('');
    }
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditAuthor(entry.author);
    setEditContent(entry.content);
    setPendingPassword('');
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E63012' },
    },
    '& label.Mui-focused': { color: '#E63012' },
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #EEEEEE',
          borderRadius: '14px',
          p: { xs: 2, md: 2.5 },
          backgroundColor: '#FFFFFF',
          transition: 'box-shadow 0.15s',
          '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
        }}
      >
        {/* 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                backgroundColor: '#FFF0EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <PersonRoundedIcon sx={{ fontSize: 18, color: '#E63012' }} />
            </Box>
            {editMode ? (
              <TextField
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                size="small"
                sx={{ ...fieldSx, width: 140 }}
                label="이름"
              />
            ) : (
              <Box>
                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>
                  {entry.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(entry.created_at)}
                  {isEdited && (
                    <Box component="span" sx={{ ml: '6px', color: '#BBBBBB' }}>
                      (수정됨)
                    </Box>
                  )}
                </Typography>
              </Box>
            )}
          </Box>

          {/* 수정 / 삭제 버튼 */}
          {!editMode && (
            <Box sx={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
              <Tooltip title="수정">
                <IconButton
                  size="small"
                  onClick={() => { setPasswordError(false); setDialog('edit'); }}
                  sx={{ color: '#CCCCCC', '&:hover': { color: '#555555', backgroundColor: '#F5F5F5' } }}
                >
                  <EditRoundedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="삭제">
                <IconButton
                  size="small"
                  onClick={() => { setPasswordError(false); setDialog('delete'); }}
                  sx={{ color: '#CCCCCC', '&:hover': { color: '#E63012', backgroundColor: '#FFF0EE' } }}
                >
                  <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {/* 내용 */}
        {editMode ? (
          <Box>
            <TextField
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              multiline
              rows={3}
              fullWidth
              size="small"
              sx={{ ...fieldSx, mb: 1.5 }}
              label="내용"
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                size="small"
                onClick={handleEditCancel}
                startIcon={<CloseRoundedIcon />}
                sx={{ color: '#888888', borderRadius: '8px', fontWeight: 500 }}
              >
                취소
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleEditSave}
                disabled={isSubmitting}
                startIcon={<CheckRoundedIcon />}
                sx={{
                  backgroundColor: '#1A1A1A',
                  '&:hover': { backgroundColor: '#333333' },
                  borderRadius: '8px',
                  fontWeight: 600,
                }}
              >
                저장
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#333333',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              pl: '42px',
            }}
          >
            {entry.content}
          </Typography>
        )}
      </Paper>

      <PasswordDialog
        open={!!dialog}
        mode={dialog ?? 'delete'}
        isLoading={isSubmitting}
        hasError={passwordError}
        onConfirm={handlePasswordConfirm}
        onClose={() => { setDialog(null); setPasswordError(false); }}
      />
    </>
  );
}

export default GuestbookCard;
