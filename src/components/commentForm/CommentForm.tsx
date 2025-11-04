import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../snippetCard/SnippetCard';
import Button from '../button/Button';
import TextField from '../textField/TextField';

const API_BASE = import.meta.env.VITE_API_BASE || '';

import s from './commentForm.module.scss';
import { useMutation } from '@tanstack/react-query';

type CommentFormProps = {
  snippetId: string;
  onSuccess?: (newComment: { id: string; content: string; user: User }) => void;
};

const CommentForm = ({ snippetId, onSuccess }: CommentFormProps) => {
  const [text, setText] = useState('');

  const mutation = useMutation({
    mutationFn: async (newComment: string) => {
      const res = await axios.post(
        `${API_BASE}/comments`,
        { snippetId, content: newComment },
        { withCredentials: true },
      );
      return res.data?.data ?? res.data;
    },
    onSuccess: (created) => {
      onSuccess?.(created);
      setText('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    mutation.mutate(text);
  };

  return (
    <form className={s.commentFormWrapper} onSubmit={handleSubmit}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment..."
      />
      <Button type="submit" disabled={mutation.isPending || !text.trim()}>
        {mutation.isPending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default CommentForm;
