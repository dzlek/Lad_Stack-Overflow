import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import s from '../createPostPage/createPostPage.module.scss';
import Button from '../../components/button/Button';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Select from '../../components/select/Select';
const API_BASE = import.meta.env.VITE_API_BASE || '';

import { zodResolver } from '@hookform/resolvers/zod';
import { createSnippetSchema, FormData } from '../../app/schemas/schema';

const fetchSnippetById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/snippets/${id}`, {
    withCredentials: true,
  });
  return res.data.data;
};

const fetchLanguages = async () => {
  const res = await axios.get(`${API_BASE}/snippets/languages`, {
    withCredentials: true,
  });
  return res.data.data;
};

const updateSnippet = async (id: string, data: FormData) => {
  const res = await axios.patch(
    '{API_BASE}/snippets/${id}',
    { language: data.language, code: data.code },
    { withCredentials: true },
  );
  return res.data.data ?? res.data;
};

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const { control, register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: { language: '', code: '' },
  });

  const { data: snippet, isLoading: isSnippetLoading } = useQuery({
    queryKey: [...QUERY_KEYS.SNIPPETS, id],
    queryFn: () => fetchSnippetById(id!),
    enabled: !!id,
  });

  const { data: languages, isLoading: isLangLoading } = useQuery({
    queryKey: QUERY_KEYS.LANGUAGES,
    queryFn: fetchLanguages,
  });

  useEffect(() => {
    if (snippet) reset({ language: snippet.language, code: snippet.code });
  }, [snippet, reset]);

  const mutation = useMutation({
    mutationFn: (data: FormData) => updateSnippet(id!, data),
    onSuccess: () => {
      navigate(`/post/${id}`);
    },
    onError: () => {
      setErrorMsg('Failed to update snippet. Please try again.');
    },
  });

  const onSubmit = (data: FormData) => {
    setErrorMsg('');
    mutation.mutate(data);
  };

  const getLanguageOptions = (langs?: string[]) =>
    langs?.map((lang) => ({ label: lang, value: lang })) ?? [];

  if (isSnippetLoading) return <p>Loading snippet...</p>;

  return (
    <div className={s.createPostPageWrapper}>
      <h2>Edit snippet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label>Language of your snippet:</label>

        {isLangLoading ? (
          <p>Loading languages...</p>
        ) : (
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Select"
                options={getLanguageOptions(languages)}
              />
            )}
          />
        )}

        <label>Code of your snippet:</label>

        <textarea
          className={s.textarea}
          {...register('code')}
          rows={10}
          placeholder="Edit your code here..."
        />

        {errorMsg && <p className={s.error}>{errorMsg}</p>}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default EditPostPage;
