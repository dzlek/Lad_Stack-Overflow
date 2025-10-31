import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CodeXml } from 'lucide-react';

import { QUERY_KEYS } from '../../app/context/queryKeys';
import { Snippet } from '../../components/snippetCard/SnippetCard';
import SnippetList from '../../components/snippetList/SnippetList';

import s from './postsPage.module.scss';

const fetchUserSnippets = async (userId: string): Promise<Snippet[]> => {
  const res = await axios.get(`/api/snippets?userId=${userId}`);
  return res.data.data.data;
};

const PostsPage = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id;

  const { data: snippets, isLoading } = useQuery<Snippet[]>({
    queryKey: [...QUERY_KEYS.SNIPPETS, userId],
    queryFn: () => fetchUserSnippets(userId!),
    enabled: !!userId,
  });

  if (!userId)
    return <p className={s.error}>Please log in to view your posts.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!snippets || snippets.length === 0) return <p>No snippets yet.</p>;

  return (
    <div className={s.postsPageWrapper}>
      <h2>My posts:</h2>
      <CodeXml size={28} />
      <SnippetList snippets={snippets} />
    </div>
  );
};

export default PostsPage;
