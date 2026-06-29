import { useState, useEffect, useCallback } from 'react';
import { supabase, BUCKET } from '../lib/supabase';

export function useGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase.storage
        .from(BUCKET)
        .list('', { sortBy: { column: 'created_at', order: 'desc' } });

      if (fetchError) throw fetchError;

      const withUrls = (data || [])
        .filter((file) => file.name !== '.emptyFolderPlaceholder')
        .map((file) => {
          const { data: urlData } = supabase.storage
            .from(BUCKET)
            .getPublicUrl(file.name);
          return { ...file, publicUrl: urlData.publicUrl };
        });

      setImages(withUrls);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFiles = useCallback(async (files) => {
    setUploading(true);
    setError(null);
    try {
      const uploads = Array.from(files).map(async (file) => {
        const ext = file.name.split('.').pop();
        const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(uniqueName, file);
        if (uploadError) throw uploadError;
      });
      await Promise.all(uploads);
      await fetchImages();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }, [fetchImages]);

  const deleteImage = useCallback(async (fileName) => {
    setError(null);
    try {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET)
        .remove([fileName]);
      if (deleteError) throw deleteError;
      setImages((prev) => prev.filter((img) => img.name !== fileName));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading, uploading, error, uploadFiles, deleteImage, refetch: fetchImages };
}
