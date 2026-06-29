import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';

import { useFileArchive } from '../hooks/use-file-archive';
import { countByCategory } from '../utils/file-utils';
import FileUploadArea from '../components/archive/file-upload-area';
import CategoryTabs from '../components/archive/category-tabs';
import FileSearchBar from '../components/archive/file-search-bar';
import FileList from '../components/archive/file-list';

function ArchivePage() {
  const {
    files,
    loading,
    uploading,
    uploadProgress,
    error,
    successMessage,
    uploadFiles,
    deleteFile,
    clearMessages,
  } = useFileArchive();

  const [selectedCategory, setSelectedCategory] = useState('전체 보기');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleToggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    setSelectedIds(new Set());
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredFiles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFiles.map((f) => f.id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`선택된 ${selectedIds.size}개 파일을 삭제하시겠습니까?`)) return;
    const toDelete = files.filter((f) => selectedIds.has(f.id));
    for (const file of toDelete) {
      await deleteFile(file);
    }
    setSelectedIds(new Set());
    setIsSelectMode(false);
  };

  /** 카테고리 탭 + 검색어 기준 필터링 */
  const filteredFiles = useMemo(() => {
    let result = files;
    if (selectedCategory !== '전체 보기') {
      result = result.filter((f) => f.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((f) => f.original_name.toLowerCase().includes(q));
    }
    return result;
  }, [files, selectedCategory, searchQuery]);

  const counts = useMemo(() => countByCategory(files), [files]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
      {/* 헤더 */}
      <Box sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EEEEEE', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            {/* 타이틀 */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
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
                  <Typography sx={{ fontSize: '1.125rem', lineHeight: 1 }}>📦</Typography>
                </Box>
                <Typography
                  sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}
                >
                  File Archive
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ pl: '48px' }}>
                파일을 업로드하고 팀과 공유하세요
              </Typography>
            </Box>

            {/* 검색창 */}
            <Box sx={{ width: { xs: '100%', md: '340px' } }}>
              <FileSearchBar value={searchQuery} onChange={setSearchQuery} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        {/* 업로드 영역 */}
        <FileUploadArea
          onUpload={uploadFiles}
          isUploading={uploading}
          uploadProgress={uploadProgress}
        />

        <Divider sx={{ mb: 3 }} />

        {/* 카테고리 탭 */}
        <CategoryTabs
          selected={selectedCategory}
          onSelect={(cat) => { setSelectedCategory(cat); }}
          counts={counts}
          isSelectMode={isSelectMode}
          onToggleSelectMode={handleToggleSelectMode}
          selectedCount={selectedIds.size}
          totalCount={filteredFiles.length}
          onSelectAll={handleSelectAll}
          onDeleteSelected={handleDeleteSelected}
        />

        {/* 결과 카운트 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ fontSize: '0.8125rem', color: '#999999' }}>
            {filteredFiles.length}개의 파일
            {searchQuery.trim() && (
              <Box component="span" sx={{ color: '#E63012', fontWeight: 600, ml: '4px' }}>
                "{searchQuery}" 검색 결과
              </Box>
            )}
          </Typography>
        </Box>

        {/* 파일 목록 */}
        <FileList
          files={filteredFiles}
          isLoading={loading}
          onDelete={deleteFile}
          isSelectMode={isSelectMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
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

export default ArchivePage;
