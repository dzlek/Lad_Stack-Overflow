import { useQuery } from '@tanstack/react-query';

import { CodeXml } from 'lucide-react';
import axios from 'axios';
import SnippetList from '../../components/snippetList/SnippetList';

import s from './homePage.module.scss';
import { Snippet } from '../../components/snippetCard/SnippetCard';
import { QUERY_KEYS } from '../../app/context/queryKeys';

const fetchSnippets = async (): Promise<Snippet[]> => {
  const res = await axios.get('/api/snippets');
  return res.data.data.data;
};

const HomePage = () => {
  const { data: snippets, isLoading } = useQuery<Snippet[]>({
    queryKey: QUERY_KEYS.SNIPPETS,
    queryFn: fetchSnippets,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!snippets || snippets.length === 0) return <p>No snippets yet.</p>;

  return (
    <div className={s.homePageWrapper}>
      <h2>Welcome to Codelang!</h2>
      <CodeXml size={28} />
      <SnippetList snippets={snippets} />;
    </div>
  );
};

export default HomePage;
