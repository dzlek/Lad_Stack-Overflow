import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import s from './userPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import { User } from 'lucide-react';
const UserPage = () => {
    const { id } = useParams();
    const { data: stats, isLoading, isError, } = useQuery({
        queryKey: [...QUERY_KEYS.USER_STATS, id],
        queryFn: async () => {
            const res = await axios.get(`/api/users/${id}/statistic`, {
                withCredentials: true,
            });
            return res.data.data;
        },
        enabled: !!id,
    });
    if (isLoading)
        return _jsx("div", { children: "Loading user statistics..." });
    if (isError)
        return _jsx("div", { children: "Failed to load user statistics" });
    if (!stats)
        return _jsx("div", { children: "No statistics found" });
    return (_jsxs("div", { className: s.statsWrapper, children: [_jsxs("div", { className: s.statsInfo, children: [_jsx(User, { size: 150 }), _jsxs("div", { children: [_jsx("p", { children: _jsx("strong", { children: stats.username }) }), _jsxs("p", { children: ["id: ", stats.id] }), _jsxs("p", { children: ["Role: ", stats.role] })] })] }), _jsxs("div", { children: [_jsxs("p", { children: [_jsx("b", { children: "Rating:" }), " ", stats.statistic.rating] }), _jsxs("p", { children: [_jsx("b", { children: "Snippets:" }), " ", stats.statistic.snippetsCount] }), _jsxs("p", { children: [_jsx("b", { children: "Comments:" }), " ", stats.statistic.commentsCount] }), _jsxs("p", { children: [_jsx("b", { children: "Likes:" }), " ", stats.statistic.likesCount] }), _jsxs("p", { children: [_jsx("b", { children: "Dislikes:" }), " ", stats.statistic.dislikesCount] }), _jsxs("p", { children: [_jsx("b", { children: "Questions:" }), " ", stats.statistic.questionsCount] }), _jsxs("p", { children: [_jsx("b", { children: "Correct Answers:" }), " ", stats.statistic.correctAnswersCount] }), _jsxs("p", { children: [_jsx("b", { children: "Regular Answers:" }), " ", stats.statistic.regularAnswersCount] })] })] }));
};
export default UserPage;
