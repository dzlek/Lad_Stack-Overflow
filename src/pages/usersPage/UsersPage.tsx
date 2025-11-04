import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import axios from 'axios';
import { User } from '../../components/snippetCard/SnippetCard';
import s from './usersPage.module.scss';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async () => {
      const res = await axios.get('/api/users', { withCredentials: true });
      return res.data.data.data as User[];
    },
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Failed to load users</div>;

  return (
    <div className={s.usersPageWrapper}>
      <h2>All Users</h2>
      <ul className={s.userListWrapper}>
        {users?.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              <strong>{user.username}</strong>
            </Link>
            <div>
              role: {user.role}, id:{user.id}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
