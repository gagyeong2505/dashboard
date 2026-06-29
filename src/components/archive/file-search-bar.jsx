import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

/**
 * FileSearchBar 컴포넌트
 *
 * Props:
 * @param {string} value - 검색어 [Required]
 * @param {function} onChange - 검색어 변경 콜백 [Required]
 *
 * Example usage:
 * <FileSearchBar value={query} onChange={setQuery} />
 */
function FileSearchBar({ value, onChange }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="파일명으로 검색..."
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ fontSize: 20, color: '#AAAAAA' }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onChange('')}>
                <ClearRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          fontSize: '0.875rem',
          backgroundColor: '#FFFFFF',
          '&:hover fieldset': { borderColor: '#E63012' },
          '&.Mui-focused fieldset': { borderColor: '#E63012', borderWidth: 2 },
        },
      }}
    />
  );
}

export default FileSearchBar;
