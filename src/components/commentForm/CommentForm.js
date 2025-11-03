import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import Button from '../button/Button';
import TextField from '../textField/TextField';
import s from './commentForm.module.scss';
import { useMutation } from '@tanstack/react-query';
const CommentForm = ({ snippetId, onSuccess }) => {
    const [text, setText] = useState('');
    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const res = await axios.post('/api/comments', { snippetId, content: newComment }, { withCredentials: true });
            return res.data?.data ?? res.data;
        },
        onSuccess: (created) => {
            onSuccess?.(created);
            setText('');
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim())
            return;
        mutation.mutate(text);
    };
    return (_jsxs("form", { className: s.commentFormWrapper, onSubmit: handleSubmit, children: [_jsx(TextField, { value: text, onChange: (e) => setText(e.target.value), placeholder: "Leave a comment..." }), _jsx(Button, { type: "submit", disabled: mutation.isPending || !text.trim(), children: mutation.isPending ? 'Sending...' : 'Send' })] }));
};
export default CommentForm;
