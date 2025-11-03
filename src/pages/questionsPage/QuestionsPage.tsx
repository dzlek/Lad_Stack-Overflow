import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './questionsPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import { Trash2, Eye, Cherry, SquarePen } from 'lucide-react';
import { useAuth } from '../../app/context/useAuth';

type Question = {
  id: string;
  title: string;
  description: string;
  user: {
    id: string;
    username: string;
  };
};

const QuestionsPage = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    data: questions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.QUESTIONS,
    queryFn: async () => {
      const res = await axios.get('/api/questions', { withCredentials: true });
      return res.data.data.data as Question[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/questions/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS });
    },
  });

  const handleEdit = (id: string) => {
    navigate(`/questions/edit/${id}`);
  };

  if (isLoading) return <div>Loading questions...</div>;
  if (isError) return <div>Failed to load questions</div>;

  return (
    <div className={s.questionsPageWrapper}>
      <ul>
        {questions?.map((q) => (
          <li key={q.id} className={s.item}>
            <div className={s.header}>
              <Cherry />
              <span>
                <h3>{q.title}</h3>
                <div>asked by user: {q.user.username}</div>
              </span>
            </div>
            <div>{q.description}</div>
            <Link to={`/questions/${q.id}`}>
              <Eye color="rgb(25, 118, 210) " />
            </Link>
            {currentUser?.id === q.user.id && (
              <span>
                <SquarePen size={18} onClick={() => handleEdit(q.id)} />
                <Trash2
                  size={18}
                  onClick={() =>
                    confirm('Delete this question?') &&
                    deleteMutation.mutate(q.id)
                  }
                />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;
