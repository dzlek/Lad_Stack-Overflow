import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '../../app/context/useAuth';
import { STORAGE_KEYS } from '../../app/context/storageKeys';
import { QUERY_KEYS } from '../../app/context/queryKeys';

import s from './accountPage.module.scss';
import Button from '../../components/button/Button';
import { LogOut, Trash2 } from 'lucide-react';

type UsernameFormData = { username: string };
type PasswordFormData = { oldPassword: string; newPassword: string };

const updateUsername = async (data: UsernameFormData) => {
  const res = await axios.patch('/api/me', data, { withCredentials: true });
  return res.data;
};

const updatePassword = async (data: PasswordFormData) => {
  const res = await axios.patch('/api/me/password', data, {
    withCredentials: true,
  });
  return res.data;
};

const deleteUser = async () => {
  const res = await axios.delete('/api/me', { withCredentials: true });
  return res.data;
};

const fetchUserStatistic = async (userId: string) => {
  const res = await axios.get(`/api/users/${userId}/statistic`, {
    withCredentials: true,
  });

  return res.data.data.statistic;
};

const AccountPage = () => {
  const { user, isAuth, logout } = useAuth();
  const [status, setStatus] = useState('');

  const usernameForm = useForm<UsernameFormData>({
    defaultValues: { username: user?.username || '' },
  });
  const passwordForm = useForm<PasswordFormData>();

  const usernameMutation = useMutation({
    mutationFn: updateUsername,
    onSuccess: (res) => {
      setStatus('Success! Username updated successfully');
      const updatedUser = { ...user, username: res.data.username };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    },
    onError: () => setStatus('Failed to update username'),
  });

  const passwordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      setStatus('Success! Password changed successfully');
      passwordForm.reset();
    },
    onError: () => setStatus('Failed to update password'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setStatus('Success! Account deleted');
      logout();
    },
    onError: () => setStatus('Failed to delete account'),
  });

  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.USER_STATS(user?.id || ''),
    queryFn: () => fetchUserStatistic(user!.id),
    enabled: !!user?.id,
  });

  if (!isAuth) return <p>You must be logged in to view this page.</p>;
  if (!user) return <p>Loading user...</p>;

  const onUsernameSubmit = (data: UsernameFormData) =>
    usernameMutation.mutate(data);

  const onPasswordSubmit = (data: PasswordFormData) => {
    if (data.newPassword.trim().length < 6) {
      setStatus('Password must be at least 6 characters long');
      return;
    }
    passwordMutation.mutate(data);
  };

  return (
    <div className={s.accountPageWrapper}>
      <h2>
        Welcome, <span className={s.username}>{user.username}</span>
      </h2>

      {stats && (
        <div className={s.stats}>
          <p>Snippets: {stats.snippetsCount}</p>
          <p>Comments: {stats.commentsCount}</p>
          <p>Likes: {stats.likesCount}</p>
          <p>Dislikes: {stats.dislikesCount}</p>
        </div>
      )}

      <div className={s.forms}>
        <form
          onSubmit={usernameForm.handleSubmit(onUsernameSubmit)}
          className={s.form}
        >
          <h3 className={s.subtitle}>Change Username</h3>
          <input
            {...usernameForm.register('username', { required: true })}
            placeholder="Enter new username"
            className={s.input}
          />
          <button
            type="submit"
            disabled={usernameMutation.isPending}
            className={s.button}
          >
            {usernameMutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </form>

        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className={s.form}
        >
          <h3 className={s.subtitle}>Change Password</h3>

          <input
            type="password"
            {...passwordForm.register('oldPassword', { required: true })}
            placeholder="Old password"
            className={s.input}
          />

          <input
            type="password"
            {...passwordForm.register('newPassword', { required: true })}
            placeholder="New password"
            className={s.input}
          />

          <button
            type="submit"
            disabled={passwordMutation.isPending}
            className={s.button}
          >
            {passwordMutation.isPending ? 'Updating...' : 'Change'}
          </button>
        </form>
      </div>

      <div className={s.actions}>
        <Button onClick={() => logout()} className={`${s.button} ${s.signOut}`}>
          <LogOut size={18} />
        </Button>

        <Button
          onClick={() => {
            if (confirm('Are you sure you want to delete your account?'))
              deleteMutation.mutate();
          }}
          className={`${s.button} ${s.delete}`}
        >
          {deleteMutation.isPending ? '...' : <Trash2 size={18} />}
        </Button>
      </div>

      {status && (
        <p
          className={`${s.status} ${
            status.startsWith('Success!') ? s.success : s.error
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default AccountPage;
