import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import s from './editQuestionPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Button from '../../components/button/Button';
const API_BASE = import.meta.env.VITE_API_BASE || '';

type FormData = {
  title: string;
  description: string;
};

type QuestionResponse = {
  id: string;
  title: string;
  description: string;
  user: {
    id: string;
    username: string;
  };
};

const EditQuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [...QUERY_KEYS.QUESTIONS, id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/questions/${id}`, {
        withCredentials: true,
      });
      return res.data.data as QuestionResponse;
    },
    enabled: !!id,
  });

  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.patch(`${API_BASE}/questions/${id}`, formData, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS });
      navigate('/questions');
    },
  });

  const onSubmit = (formData: FormData) => mutation.mutate(formData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load question</div>;

  return (
    <div className={s.editPageWrapper}>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <textarea
          rows={8}
          placeholder="Question content..."
          {...register('description', { required: true })}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default EditQuestionPage;
