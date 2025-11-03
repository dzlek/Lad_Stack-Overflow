import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import s from './userPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import { User } from 'lucide-react';

type UserStatisticData = {
  rating: number;
  snippetsCount: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
};

type UserStatistic = {
  id: string;
  username: string;
  role: 'user' | 'admin';
  statistic: UserStatisticData;
};

const UserPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...QUERY_KEYS.USER_STATS, id],
    queryFn: async () => {
      const res = await axios.get(`/api/users/${id}/statistic`, {
        withCredentials: true,
      });
      return res.data.data as UserStatistic;
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Loading user statistics...</div>;
  if (isError) return <div>Failed to load user statistics</div>;
  if (!stats) return <div>No statistics found</div>;

  return (
    <div className={s.statsWrapper}>
      <div className={s.statsInfo}>
        <User size={150} />
        <div>
          <p>
            <strong>{stats.username}</strong>
          </p>
          <p>id: {stats.id}</p>
          <p>Role: {stats.role}</p>
        </div>
      </div>
      <div>
        <p>
          <b>Rating:</b> {stats.statistic.rating}
        </p>
        <p>
          <b>Snippets:</b> {stats.statistic.snippetsCount}
        </p>
        <p>
          <b>Comments:</b> {stats.statistic.commentsCount}
        </p>
        <p>
          <b>Likes:</b> {stats.statistic.likesCount}
        </p>
        <p>
          <b>Dislikes:</b> {stats.statistic.dislikesCount}
        </p>
        <p>
          <b>Questions:</b> {stats.statistic.questionsCount}
        </p>
        <p>
          <b>Correct Answers:</b> {stats.statistic.correctAnswersCount}
        </p>
        <p>
          <b>Regular Answers:</b> {stats.statistic.regularAnswersCount}
        </p>
      </div>
    </div>
  );
};

export default UserPage;
