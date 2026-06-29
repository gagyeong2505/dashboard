import { useState, useEffect, useCallback } from 'react';
import { supabase, BUCKET } from '../lib/supabase';
import { getCategory, getExtension, generateUniqueFileName } from '../utils/file-utils';

export function useFileArchive() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  /** Supabase DB에서 파일 목록 불러오기 (최신 순) */
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setFiles(data || []);
    } catch (err) {
      setError('파일 목록을 불러오는 데 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 단일 파일을 Storage에 업로드하고 DB에 메타데이터 저장 */
  const uploadSingleFile = async (file, folderPath) => {
    const ext = getExtension(file.name);
    const uniqueName = generateUniqueFileName(file.name);
    const storagePath = folderPath ? `${folderPath}/${uniqueName}` : uniqueName;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file);
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const { error: dbError } = await supabase.from('files').insert({
      file_name: uniqueName,
      original_name: file.name,
      file_path: storagePath,
      folder_path: folderPath,
      file_size: file.size,
      file_type: file.type || '',
      extension: ext,
      category: getCategory(ext),
      storage_bucket: BUCKET,
      public_url: urlData.publicUrl,
    });
    if (dbError) throw dbError;
  };

  /** 여러 파일(또는 폴더) 업로드 — 진행률을 파일 단위로 계산 */
  const uploadFiles = useCallback(async (fileList) => {
    setUploading(true);
    setError(null);
    setSuccessMessage(null);
    const arr = Array.from(fileList);
    let completed = 0;

    try {
      for (const file of arr) {
        /* webkitRelativePath가 있으면 폴더 업로드: 경로 구조 유지 */
        const relativePath = file.webkitRelativePath || '';
        const folderPath = relativePath
          ? relativePath.split('/').slice(0, -1).join('/')
          : '';

        await uploadSingleFile(file, folderPath);
        completed++;
        setUploadProgress(Math.round((completed / arr.length) * 100));
      }

      setSuccessMessage(`${arr.length}개 파일이 업로드되었습니다.`);
      await fetchFiles();
    } catch (err) {
      setError('업로드 실패: ' + err.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [fetchFiles]);

  /** Storage와 DB에서 파일 동시 삭제 */
  const deleteFile = useCallback(async (file) => {
    setError(null);
    try {
      const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove([file.file_path]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', file.id);
      if (dbError) throw dbError;

      setFiles((prev) => prev.filter((f) => f.id !== file.id));
      setSuccessMessage('파일이 삭제되었습니다.');
    } catch (err) {
      setError('삭제 실패: ' + err.message);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    uploading,
    uploadProgress,
    error,
    successMessage,
    uploadFiles,
    deleteFile,
    refetch: fetchFiles,
    clearMessages,
  };
}
