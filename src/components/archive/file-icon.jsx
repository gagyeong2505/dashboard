import Box from '@mui/material/Box';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import VideoFileRoundedIcon from '@mui/icons-material/VideoFileRounded';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

const ICON_CONFIG = {
  문서:    { icon: DescriptionRoundedIcon,     color: '#1565C0', bg: '#E3F2FD' },
  이미지:  { icon: ImageRoundedIcon,           color: '#2E7D32', bg: '#E8F5E9' },
  영상:    { icon: VideoFileRoundedIcon,        color: '#6A1B9A', bg: '#EDE7F6' },
  압축파일: { icon: FolderZipRoundedIcon,       color: '#E65100', bg: '#FFF3E0' },
  코드:    { icon: CodeRoundedIcon,             color: '#00838F', bg: '#E0F7FA' },
  기타:    { icon: InsertDriveFileRoundedIcon,  color: '#757575', bg: '#F5F5F5' },
};

/**
 * FileIcon 컴포넌트
 *
 * Props:
 * @param {string} category - 파일 카테고리 [Required]
 * @param {string} extension - 파일 확장자 [Optional]
 * @param {number} size - 아이콘 크기(px) [Optional, 기본값: 26]
 *
 * Example usage:
 * <FileIcon category="문서" extension="pdf" />
 */
function FileIcon({ category, extension, size = 26 }) {
  const isPdf = extension === 'pdf';
  const config = ICON_CONFIG[category] || ICON_CONFIG['기타'];
  const IconComponent = isPdf ? PictureAsPdfRoundedIcon : config.icon;
  const color = isPdf ? '#D32F2F' : config.color;
  const bg = isPdf ? '#FFEBEE' : config.bg;

  return (
    <Box
      sx={{
        width: size + 18,
        height: size + 18,
        borderRadius: '10px',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <IconComponent sx={{ fontSize: size, color }} />
    </Box>
  );
}

export default FileIcon;
