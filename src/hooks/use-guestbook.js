import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { hashPassword, verifyPassword } from '../utils/crypto-utils';

export function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select('id, author, content, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('방명록을 불러오는 중 오류가 발생했습니다.');
    } else {
      setEntries(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const addEntry = useCallback(async ({ author, content, password }) => {
    if (!author.trim() || !content.trim() || !password) return false;
    setSubmitting(true);
    clearMessages();
    try {
      const password_hash = await hashPassword(password);
      const { error: insertError } = await supabase
        .from('guestbook')
        .insert({ author: author.trim(), content: content.trim(), password_hash });

      if (insertError) throw insertError;
      setSuccessMessage('방명록이 등록되었습니다.');
      await fetchEntries();
      return true;
    } catch {
      setError('등록 중 오류가 발생했습니다.');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchEntries, clearMessages]);

  /** 비밀번호 검증 후 수정 — 반환값: 'ok' | 'wrong_password' | 'error' */
  const editEntry = useCallback(async ({ id, author, content, password }) => {
    setSubmitting(true);
    clearMessages();
    try {
      const { data, error: fetchError } = await supabase
        .from('guestbook')
        .select('password_hash')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const isValid = await verifyPassword(password, data.password_hash);
      if (!isValid) {
        setSubmitting(false);
        return 'wrong_password';
      }

      const { error: updateError } = await supabase
        .from('guestbook')
        .update({ author: author.trim(), content: content.trim(), updated_at: new Date().toISOString() })
        .eq('id', id);

      if (updateError) throw updateError;
      setSuccessMessage('방명록이 수정되었습니다.');
      await fetchEntries();
      return 'ok';
    } catch {
      setError('수정 중 오류가 발생했습니다.');
      return 'error';
    } finally {
      setSubmitting(false);
    }
  }, [fetchEntries, clearMessages]);

  /** 비밀번호 검증 후 삭제 — 반환값: 'ok' | 'wrong_password' | 'error' */
  const deleteEntry = useCallback(async ({ id, password }) => {
    setSubmitting(true);
    clearMessages();
    try {
      const { data, error: fetchError } = await supabase
        .from('guestbook')
        .select('password_hash')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const isValid = await verifyPassword(password, data.password_hash);
      if (!isValid) {
        setSubmitting(false);
        return 'wrong_password';
      }

      const { error: deleteError } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setSuccessMessage('방명록이 삭제되었습니다.');
      await fetchEntries();
      return 'ok';
    } catch {
      setError('삭제 중 오류가 발생했습니다.');
      return 'error';
    } finally {
      setSubmitting(false);
    }
  }, [fetchEntries, clearMessages]);

  return {
    entries,
    loading,
    submitting,
    error,
    successMessage,
    addEntry,
    editEntry,
    deleteEntry,
    clearMessages,
    refetch: fetchEntries,
  };
}
