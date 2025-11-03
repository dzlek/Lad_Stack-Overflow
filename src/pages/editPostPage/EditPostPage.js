import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import s from '../createPostPage/createPostPage.module.scss';
import Button from '../../components/button/Button';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import Select from '../../components/select/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSnippetSchema } from '../../app/schemas/schema';
const fetchSnippetById = async (id) => {
    const res = await axios.get(`/api/snippets/${id}`, { withCredentials: true });
    return res.data.data;
};
const fetchLanguages = async () => {
    const res = await axios.get('/api/snippets/languages', {
        withCredentials: true,
    });
    return res.data.data;
};
const updateSnippet = async (id, data) => {
    const res = await axios.patch(`/api/snippets/${id}`, { language: data.language, code: data.code }, { withCredentials: true });
    return res.data.data ?? res.data;
};
const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const { control, register, handleSubmit, reset } = useForm({
        resolver: zodResolver(createSnippetSchema),
        defaultValues: { language: '', code: '' },
    });
    const { data: snippet, isLoading: isSnippetLoading } = useQuery({
        queryKey: [...QUERY_KEYS.SNIPPETS, id],
        queryFn: () => fetchSnippetById(id),
        enabled: !!id,
    });
    const { data: languages, isLoading: isLangLoading } = useQuery({
        queryKey: QUERY_KEYS.LANGUAGES,
        queryFn: fetchLanguages,
    });
    useEffect(() => {
        if (snippet)
            reset({ language: snippet.language, code: snippet.code });
    }, [snippet, reset]);
    const mutation = useMutation({
        mutationFn: (data) => updateSnippet(id, data),
        onSuccess: () => {
            navigate(`/post/${id}`);
        },
        onError: () => {
            setErrorMsg('Failed to update snippet. Please try again.');
        },
    });
    const onSubmit = (data) => {
        setErrorMsg('');
        mutation.mutate(data);
    };
    const getLanguageOptions = (langs) => langs?.map((lang) => ({ label: lang, value: lang })) ?? [];
    if (isSnippetLoading)
        return _jsx("p", { children: "Loading snippet..." });
    return (_jsxs("div", { className: s.createPostPageWrapper, children: [_jsx("h2", { children: "Edit snippet" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: s.form, children: [_jsx("label", { children: "Language of your snippet:" }), isLangLoading ? (_jsx("p", { children: "Loading languages..." })) : (_jsx(Controller, { name: "language", control: control, render: ({ field }) => (_jsx(Select, { ...field, label: "Select", options: getLanguageOptions(languages) })) })), _jsx("label", { children: "Code of your snippet:" }), _jsx("textarea", { className: s.textarea, ...register('code'), rows: 10, placeholder: "Edit your code here..." }), errorMsg && _jsx("p", { className: s.error, children: errorMsg }), _jsx(Button, { type: "submit", disabled: mutation.isPending, children: mutation.isPending ? 'Saving...' : 'Save Changes' })] })] }));
};
export default EditPostPage;
