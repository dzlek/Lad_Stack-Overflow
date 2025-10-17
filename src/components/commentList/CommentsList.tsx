import s from './commentList.module.scss';

import { Comment } from '../../components/snippetCard/SnippetCard';

type CommentsProp = {
  comments: Comment[];
};

const CommentsList = ({ comments }: CommentsProp) => {
  if (!comments || comments.length === 0) return <div>No comments...</div>;
  return (
    <ul className={s.commentListWrapper}>
      {comments.map((c) => (
        <li key={c.id}>
          <strong>{c.user.username}:</strong>
          <div>{c.content}</div>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
