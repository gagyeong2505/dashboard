/** 확장자 → 카테고리 분류 기준 */
const CATEGORY_MAP = {
  문서: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'hwp', 'txt', 'md'],
  이미지: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  영상: ['mp4', 'mov', 'avi', 'webm'],
  압축파일: ['zip', 'rar', '7z', 'tar', 'gz'],
  코드: ['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'py', 'java', 'php'],
};

export const CATEGORIES = ['전체 보기', '문서', '이미지', '영상', '압축파일', '코드', '기타'];

/** 확장자로 카테고리 반환 */
export function getCategory(extension) {
  const ext = (extension || '').toLowerCase();
  for (const [category, exts] of Object.entries(CATEGORY_MAP)) {
    if (exts.includes(ext)) return category;
  }
  return '기타';
}

/** 바이트 → 사람이 읽기 쉬운 크기 문자열 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/** 파일명에서 확장자 추출 (소문자) */
export function getExtension(fileName) {
  const parts = (fileName || '').split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

/** 충돌 방지를 위한 고유 파일명 생성 (timestamp + random) */
export function generateUniqueFileName(originalName) {
  const ext = getExtension(originalName);
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return ext ? `${timestamp}_${random}.${ext}` : `${timestamp}_${random}`;
}

/** ISO 날짜 → YYYY.MM.DD */
export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

/** 카테고리별 파일 개수 집계 */
export function countByCategory(files) {
  const counts = { '전체 보기': files.length };
  for (const file of files) {
    counts[file.category] = (counts[file.category] || 0) + 1;
  }
  return counts;
}
