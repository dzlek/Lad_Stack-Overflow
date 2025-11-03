import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './questionsPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import { Trash2, Eye, Cherry, SquarePen } from 'lucide-react';
import { useAuth } from '../../app/context/useAuth';
const QuestionsPage = () => {
    const queryClient = useQueryClient();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const { data: questions, isLoading, isError, } = useQuery({
        queryKey: QUERY_KEYS.QUESTIONS,
        queryFn: async () => {
            const res = await axios.get('/api/questions', { withCredentials: true });
            return res.data.data.data;
        },
    });
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`/api/questions/${id}`, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS });
        },
    });
    const handleEdit = (id) => {
        navigate(`/questions/edit/${id}`);
    };
    if (isLoading)
        return _jsx("div", { children: "Loading questions..." });
    if (isError)
        return _jsx("div", { children: "Failed to load questions" });
    return (_jsx("div", { className: s.questionsPageWrapper, children: _jsx("ul", { children: questions?.map((q) => (_jsxs("li", { className: s.item, children: [_jsxs("div", { className: s.header, children: [_jsx(Cherry, {}), _jsxs("span", { children: [_jsx("h3", { children: q.title }), _jsxs("div", { children: ["asked by user: ", q.user.username] })] })] }), _jsx("div", { children: q.description }), _jsx(Link, { to: `/questions/${q.id}`, children: _jsx(Eye, { color: "rgb(25, 118, 210) " }) }), currentUser?.id === q.user.id && (_jsxs("span", { children: [_jsx(SquarePen, { size: 18, onClick: () => handleEdit(q.id) }), _jsx(Trash2, { size: 18, onClick: () => confirm('Delete this question?') &&
                                    deleteMutation.mutate(q.id) })] }))] }, q.id))) }) }));
};
export default QuestionsPage;
