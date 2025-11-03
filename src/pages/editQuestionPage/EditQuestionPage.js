import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import s from './editQuestionPage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Button from '../../components/button/Button';
const EditQuestionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: [...QUERY_KEYS.QUESTIONS, id],
        queryFn: async () => {
            const res = await axios.get(`/api/questions/${id}`, {
                withCredentials: true,
            });
            return res.data.data;
        },
        enabled: !!id,
    });
    const { register, handleSubmit, reset } = useForm();
    useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                description: data.description,
            });
        }
    }, [data, reset]);
    const mutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axios.patch(`/api/questions/${id}`, formData, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS });
            navigate('/questions');
        },
    });
    const onSubmit = (formData) => mutation.mutate(formData);
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (isError)
        return _jsx("div", { children: "Failed to load question" });
    return (_jsxs("div", { className: s.editPageWrapper, children: [_jsx("h2", { children: "Edit Question" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: s.form, children: [_jsx("input", { type: "text", placeholder: "Title", ...register('title', { required: true }) }), _jsx("textarea", { rows: 8, placeholder: "Question content...", ...register('description', { required: true }) }), _jsx(Button, { type: "submit", children: "Save Changes" })] })] }));
};
export default EditQuestionPage;
