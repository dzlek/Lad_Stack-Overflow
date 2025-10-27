import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './createPostPage.module.scss';
import Button from '../../components/button/Button';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Select from '../../components/select/Select';

import { zodResolver } from '@hookform/resolvers/zod';
import { createSnippetSchema, FormData } from '../../app/schemas/schema';

const createSnippet = async (data: FormData) => {
  const res = await axios.post(
    '/api/snippets',
    { language: data.language, code: data.code },
    { withCredentials: true },
  );
  return res.data.data ?? res.data;
};

const fetchLanguages = async () => {
  const res = await axios.get('/api/snippets/languages', {
    withCredentials: true,
  });
  return res.data.data;
};

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const { control, register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: { language: '', code: '' },
  });

  const { data: languages, isLoading } = useQuery({
    queryKey: QUERY_KEYS.LANGUAGES,
    queryFn: fetchLanguages,
  });

  const mutation = useMutation({
    mutationFn: createSnippet,
    onSuccess: (createdSnippet) => {
      const id = createdSnippet.id;
      reset();
      navigate(`/post/${id}`);
    },
    onError: () => {
      setErrorMsg('Failed to create snippet. Please try again.');
    },
  });

  const onSubmit = (data: FormData) => {
    setErrorMsg('');
    mutation.mutate(data);
  };

  const getLanguageOptions = (langs?: string[]) =>
    langs?.map((lang) => ({ label: lang, value: lang })) ?? [];

  return (
    <div className={s.createPostPageWrapper}>
      <h2>Create new snippet!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label>Language of your snippet:</label>

        {isLoading ? (
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
          placeholder="Write your code here..."
        />

        {errorMsg && <p className={s.error}>{errorMsg}</p>}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Snippet'}
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
