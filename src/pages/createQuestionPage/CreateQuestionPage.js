import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import s from './createQuestionPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Button from '../../components/button/Button';
const CreateQuestionPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm();
    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post('/api/questions', data, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS });
            navigate('/questions');
        },
    });
    const onSubmit = (data) => mutation.mutate(data);
    return (_jsxs("div", { className: s.createPageWrapper, children: [_jsx("h2", { children: "Ask a New Question: " }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: s.form, children: [_jsx("input", { type: "text", placeholder: "Question title", ...register('title', { required: true }) }), _jsx("textarea", { placeholder: "Describe your question...", rows: 8, ...register('description', { required: true }) }), _jsx(Button, { type: "submit", children: "Submit" })] })] }));
};
export default CreateQuestionPage;
