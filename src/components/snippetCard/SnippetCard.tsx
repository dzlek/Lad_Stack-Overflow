import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import s from './snippetCard.module.scss';
import {
  User as UserIcon,
  FileJson,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type User = {
  id: string;
  username: string;
  role: string;
};

export type Mark = {
  id: string;
  type: 'like' | 'dislike';
  user: User;
};

export type Comment = {
  id: string;
  content: string;
};

export type Snippet = {
  id: string;
  code: string;
  language: string;
  user: User;
  marks: Mark[];
  comments: Comment[];
};

type SnippetCardProps = {
  snippet: Snippet;
  isAuth: boolean;
  currentUser?: User | null;
};

const SnippetCard = ({ snippet, isAuth, currentUser }: SnippetCardProps) => {
  const queryClient = useQueryClient();

  const [localMark, setLocalMark] = useState<'like' | 'dislike' | 'none'>(
    'none',
  );
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const likes = snippet.marks.filter((m) => m.type === 'like').length;
    const dislikes = snippet.marks.filter((m) => m.type === 'dislike').length;
    setLikeCount(likes);
    setDislikeCount(dislikes);

    if (currentUser) {
      const userMark = snippet.marks.find((m) => m.user.id === currentUser.id);
      setLocalMark(userMark ? userMark.type : 'none');
    }
  }, [snippet, currentUser]);

  const markMutation = useMutation({
    mutationFn: async (mark: 'like' | 'dislike' | 'none') => {
      const res = await axios.post(
        `/api/snippets/${snippet.id}/mark`,
        { mark },
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
    },
  });

  const handleMark = (mark: 'like' | 'dislike') => {
    if (!isAuth) return;

    const newMark = localMark === mark ? 'none' : mark;

    setLikeCount((prev) =>
      localMark === 'like' && newMark === 'none'
        ? prev - 1
        : localMark !== 'like' && newMark === 'like'
          ? prev + 1
          : prev,
    );

    setDislikeCount((prev) =>
      localMark === 'dislike' && newMark === 'none'
        ? prev - 1
        : localMark !== 'dislike' && newMark === 'dislike'
          ? prev + 1
          : prev,
    );

    setLocalMark(newMark);
    markMutation.mutate(newMark);
  };

  return (
    <div className={s.snippetCard}>
      <div className={s.cardHeader}>
        <span>
          <UserIcon size={18} /> {snippet.user.username}
        </span>
        <span>
          <FileJson size={18} /> {snippet.language}
        </span>
      </div>

      <div className={s.cardCode}>{snippet.code}</div>

      <div className={s.stats}>
        <span>
          <div
            className={`${s.icon} ${localMark === 'like' ? s.active : ''}`}
            onClick={() => handleMark('like')}
          >
            <ThumbsUp size={18} />
          </div>
          {likeCount}
          <div
            className={`${s.icon} ${localMark === 'dislike' ? s.active : ''}`}
            onClick={() => handleMark('dislike')}
          >
            <ThumbsDown size={18} />
          </div>
          {dislikeCount}
        </span>

        <span>
          {snippet.comments.length}{' '}
          <Link to={`/post-snippet`}>
            <MessageSquare size={18} />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SnippetCard;
