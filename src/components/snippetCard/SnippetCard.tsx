import { useCallback, useEffect, useState } from 'react';
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
import { QUERY_KEYS } from '../../app/context/queryKeys';

enum MarkType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  NONE = 'none',
}

export type User = {
  id: string;
  username: string;
  role: string;
};

export type Mark = {
  id: string;
  type: MarkType;
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

  const [localMark, setLocalMark] = useState<MarkType>(MarkType.NONE);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const likes = snippet.marks.filter((m) => m.type === MarkType.LIKE).length;
    const dislikes = snippet.marks.filter(
      (m) => m.type === MarkType.DISLIKE,
    ).length;
    setLikeCount(likes);
    setDislikeCount(dislikes);
  }, [snippet.marks]);

  useEffect(() => {
    if (!currentUser) {
      setLocalMark(MarkType.NONE);
      return;
    }

    const userMark = snippet.marks.find((m) => m.user.id === currentUser.id);

    if (!userMark) {
      setLocalMark(MarkType.NONE);
      return;
    }

    if (userMark.type === MarkType.LIKE) {
      setLocalMark(MarkType.LIKE);
    } else if (userMark.type === MarkType.DISLIKE) {
      setLocalMark(MarkType.DISLIKE);
    } else {
      setLocalMark(MarkType.NONE);
    }
  }, [snippet.marks, currentUser]);

  const markMutation = useMutation({
    mutationFn: async (mark: MarkType) => {
      const res = await axios.post(
        `/api/snippets/${snippet.id}/mark`,
        { mark },
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SNIPPETS });
    },
  });

  const handleMark = useCallback(
    (mark: MarkType.LIKE | MarkType.DISLIKE) => {
      if (!isAuth) return;

      const newMark = localMark === mark ? MarkType.NONE : mark;

      if (localMark === MarkType.LIKE && newMark === MarkType.NONE) {
        setLikeCount((prev) => prev - 1);
      } else if (localMark !== MarkType.LIKE && newMark === MarkType.LIKE) {
        setLikeCount((prev) => prev + 1);
      }

      if (localMark === MarkType.DISLIKE && newMark === MarkType.NONE) {
        setDislikeCount((prev) => prev - 1);
      } else if (
        localMark !== MarkType.DISLIKE &&
        newMark === MarkType.DISLIKE
      ) {
        setDislikeCount((prev) => prev + 1);
      }

      setLocalMark(newMark);
      markMutation.mutate(newMark);
    },
    [isAuth, localMark, markMutation],
  );

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
            className={`${s.icon} ${localMark === MarkType.LIKE ? s.active : ''}`}
            onClick={() => handleMark(MarkType.LIKE)}
          >
            <ThumbsUp size={18} />
          </div>
          {likeCount}
          <div
            className={`${s.icon} ${localMark === MarkType.DISLIKE ? s.active : ''}`}
            onClick={() => handleMark(MarkType.DISLIKE)}
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
