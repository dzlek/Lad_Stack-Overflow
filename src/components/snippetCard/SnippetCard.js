import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import s from './snippetCard.module.scss';
import { User as UserIcon, FileJson, ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2, } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import { useAuth } from '../../app/context/useAuth';
var MarkType;
(function (MarkType) {
    MarkType["LIKE"] = "like";
    MarkType["DISLIKE"] = "dislike";
    MarkType["NONE"] = "none";
})(MarkType || (MarkType = {}));
const SnippetCard = ({ snippet, isAuth }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const [localMark, setLocalMark] = useState(MarkType.NONE);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    useEffect(() => {
        const likes = snippet.marks.filter((m) => m.type === MarkType.LIKE).length;
        const dislikes = snippet.marks.filter((m) => m.type === MarkType.DISLIKE).length;
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
        }
        else if (userMark.type === MarkType.DISLIKE) {
            setLocalMark(MarkType.DISLIKE);
        }
        else {
            setLocalMark(MarkType.NONE);
        }
    }, [snippet.marks, currentUser]);
    const markMutation = useMutation({
        mutationFn: async (mark) => {
            const res = await axios.post(`/api/snippets/${snippet.id}/mark`, { mark }, { withCredentials: true });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SNIPPETS });
        },
    });
    const deleteMutation = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/snippets/${snippet.id}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SNIPPETS });
        },
    });
    const handleMark = useCallback((mark) => {
        if (!isAuth)
            return;
        const newMark = localMark === mark ? MarkType.NONE : mark;
        if (localMark === MarkType.LIKE && newMark === MarkType.NONE) {
            setLikeCount((prev) => prev - 1);
        }
        else if (localMark !== MarkType.LIKE && newMark === MarkType.LIKE) {
            setLikeCount((prev) => prev + 1);
        }
        if (localMark === MarkType.DISLIKE && newMark === MarkType.NONE) {
            setDislikeCount((prev) => prev - 1);
        }
        else if (localMark !== MarkType.DISLIKE &&
            newMark === MarkType.DISLIKE) {
            setDislikeCount((prev) => prev + 1);
        }
        setLocalMark(newMark);
        markMutation.mutate(newMark);
    }, [isAuth, localMark, markMutation]);
    const handleEdit = () => navigate(`/edit/${snippet.id}`);
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this snippet?')) {
            deleteMutation.mutate();
        }
    };
    return (_jsxs("div", { className: s.snippetCard, children: [_jsxs("div", { className: s.cardHeader, children: [_jsxs("span", { children: [_jsx(UserIcon, { size: 18 }), " ", snippet.user.username] }), _jsxs("span", { children: [currentUser?.id === snippet.user.id && (_jsxs("span", { children: [_jsx(Edit2, { size: 18, onClick: handleEdit }), _jsx(Trash2, { size: 18, onClick: handleDelete })] })), _jsx(FileJson, { size: 18 }), " ", snippet.language] })] }), _jsx("div", { className: s.cardCode, children: snippet.code }), _jsxs("div", { className: s.stats, children: [_jsxs("span", { children: [_jsx("div", { className: `${s.icon} ${localMark === MarkType.LIKE ? s.active : ''}`, onClick: () => handleMark(MarkType.LIKE), children: _jsx(ThumbsUp, { size: 18 }) }), likeCount, _jsx("div", { className: `${s.icon} ${localMark === MarkType.DISLIKE ? s.active : ''}`, onClick: () => handleMark(MarkType.DISLIKE), children: _jsx(ThumbsDown, { size: 18 }) }), dislikeCount] }), _jsxs("span", { children: [snippet.comments.length, ' ', _jsx(Link, { to: `/post/${snippet.id}`, children: _jsx(MessageSquare, { size: 18 }) })] })] })] }));
};
export default SnippetCard;
