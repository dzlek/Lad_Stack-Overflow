import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import s from './createQuestionPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Button from '../../components/button/Button';
const API_BASE = import.meta.env.VITE_API_BASE || '';

type FormData = {
  title: string;
  description: string;
};

const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post(`${API_BASE}/questions`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS });
      navigate('/questions');
    },
  });

  return (
    <div className={s.createPageWrapper}>
      <h2>Ask a New Question: </h2>
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className={s.form}
      >
        <input
          type="text"
          placeholder="Question title"
          {...register('title', { required: true })}
        />
        <textarea
          placeholder="Describe your question..."
          rows={8}
          {...register('description', { required: true })}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateQuestionPage;
