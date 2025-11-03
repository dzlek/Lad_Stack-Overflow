import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import CommentsList from '../../components/commentList/CommentsList';
import CommentForm from '../../components/commentForm/CommentForm';
import SnippetCard from '../../components/snippetCard/SnippetCard';
import { getSocket } from '../../app/context/useSocket';
import { useAuth } from '../../app/context/useAuth';
const fetchSnippet = async (id) => {
    const res = await axios.get(`/api/snippets/${id}`);
    return res.data.data;
};
const PostPage = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { isAuth } = useAuth();
    const { data: snippet, isLoading } = useQuery({
        queryKey: QUERY_KEYS.SNIPPET_DETAILS(id),
        queryFn: () => fetchSnippet(id),
        enabled: !!id,
    });
    useEffect(() => {
        if (!id)
            return;
        const socket = getSocket();
        const handleNewComment = (payload) => {
            if (payload.snippetId !== id)
                return;
            queryClient.setQueryData(QUERY_KEYS.SNIPPET_DETAILS(id), (oldSnippet) => {
                if (!oldSnippet)
                    return oldSnippet;
                return {
                    ...oldSnippet,
                    comments: [...oldSnippet.comments, payload.comment],
                };
            });
        };
        socket.on('comment:created', handleNewComment);
        return () => {
            socket.off('comment:created', handleNewComment);
        };
    }, [id, queryClient]);
    const handleLocalAdd = (newComment) => {
        if (!id)
            return;
        queryClient.setQueryData(QUERY_KEYS.SNIPPET_DETAILS(id), (oldSnippet) => {
            if (!oldSnippet)
                return oldSnippet;
            return {
                ...oldSnippet,
                comments: [...oldSnippet.comments, newComment],
            };
        });
    };
    return (_jsxs("div", { children: [isLoading && _jsx("p", { children: "Loading post..." }), !isLoading && !snippet && _jsx("p", { children: "Snippet not found" }), !isLoading && snippet && (_jsxs(_Fragment, { children: [_jsx(SnippetCard, { snippet: snippet, isAuth: true }), _jsx(CommentsList, { comments: snippet.comments }), isAuth && _jsx(CommentForm, { snippetId: id, onSuccess: handleLocalAdd })] }))] }));
};
export default PostPage;
