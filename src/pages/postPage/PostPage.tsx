import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { QUERY_KEYS } from '../../app/context/queryKeys';
import CommentsList from '../../components/commentList/CommentsList';
import CommentForm from '../../components/commentForm/CommentForm';
import SnippetCard, {
  Snippet,
  Comment,
} from '../../components/snippetCard/SnippetCard';
import { getSocket } from '../../app/context/useSocket';
import { useAuth } from '../../app/context/useAuth';

const fetchSnippet = async (id: string): Promise<Snippet> => {
  const res = await axios.get(`/api/snippets/${id}`);
  return res.data.data;
};

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { isAuth } = useAuth();

  const { data: snippet, isLoading } = useQuery<Snippet>({
    queryKey: QUERY_KEYS.SNIPPET_DETAILS(id!),
    queryFn: () => fetchSnippet(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;

    const socket = getSocket();

    const handleNewComment = (payload: {
      comment: Comment;
      snippetId: string;
    }) => {
      if (payload.snippetId !== id) return;

      queryClient.setQueryData<Snippet>(
        QUERY_KEYS.SNIPPET_DETAILS(id),
        (oldSnippet) => {
          if (!oldSnippet) return oldSnippet;
          return {
            ...oldSnippet,
            comments: [...oldSnippet.comments, payload.comment],
          };
        },
      );
    };

    socket.on('comment:created', handleNewComment);

    return () => {
      socket.off('comment:created', handleNewComment);
    };
  }, [id, queryClient]);

  const handleLocalAdd = (newComment: Comment) => {
    if (!id) return;
    queryClient.setQueryData<Snippet>(
      QUERY_KEYS.SNIPPET_DETAILS(id),
      (oldSnippet) => {
        if (!oldSnippet) return oldSnippet;
        return {
          ...oldSnippet,
          comments: [...oldSnippet.comments, newComment],
        };
      },
    );
  };

  return (
    <div>
      {isLoading && <p>Loading post...</p>}
      {!isLoading && !snippet && <p>Snippet not found</p>}

      {!isLoading && snippet && (
        <>
          <SnippetCard snippet={snippet} isAuth={true} currentUser={null} />
          <CommentsList comments={snippet.comments} />
          {isAuth && <CommentForm snippetId={id!} onSuccess={handleLocalAdd} />}
        </>
      )}
    </div>
  );
};

export default PostPage;
