import { useAuth } from '../../app/context/useAuth';
import SnippetCard, { Snippet } from '../snippetCard/SnippetCard';

import s from './snippetList.module.scss';

type SnippetListProps = {
  snippets: Snippet[];
};

const SnippetList = ({ snippets }: SnippetListProps) => {
  const { isAuth } = useAuth();

  return (
    <div className={s.snippetList}>
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} isAuth={isAuth} />
      ))}
    </div>
  );
};

export default SnippetList;
