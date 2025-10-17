import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../snippetCard/SnippetCard';
import Button from '../button/Button';
import TextField from '../textField/TextField';

import s from './commentForm.module.scss';

type CommentFormProps = {
  snippetId: string;
  onSuccess?: (newComment: { id: string; content: string; user: User }) => void;
};

const CommentForm = ({ snippetId, onSuccess }: CommentFormProps) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        '/api/comments',
        { snippetId, content: text },
        { withCredentials: true },
      );

      const created = res.data?.data ?? res.data;
      onSuccess?.(created);
      setText('');
    } catch (err) {
      console.error('Failed to comment', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.commentFormWrapper} onSubmit={handleSubmit}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment..."
      />
      <Button type="submit" disabled={loading || !text.trim()}>
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default CommentForm;
