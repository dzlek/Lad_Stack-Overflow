import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '../../app/context/useAuth';
import { STORAGE_KEYS } from '../../app/context/storageKeys';
import { QUERY_KEYS } from '../../app/context/queryKeys';

import s from './accountPage.module.scss';
import Button from '../../components/button/Button';
import { LogOut, Trash2, User } from 'lucide-react';
import TextField from '../../components/textField/TextField';

type UsernameFormData = { username: string };
type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

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

  const handleLogout = () => {
    logout();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setStatus('Success! Account deleted');
      logout();
    },
    onError: () => setStatus('Failed to delete account'),
  });

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      deleteMutation.mutate();
    }
  };

  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.USER_STATS(user?.id || ''),
    queryFn: () => fetchUserStatistic(user!.id),
    enabled: !!user?.id,
  });

  const onUsernameSubmit = (data: UsernameFormData) =>
    usernameMutation.mutate(data);

  const onPasswordSubmit = (data: PasswordFormData) => {
    if (data.newPassword.trim().length < 6) {
      setStatus('Password must be at least 6 characters long');
      return;
    }
    passwordMutation.mutate(data);
  };

  if (!isAuth) return <p>You must be logged in to view this page.</p>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div className={s.accountPageWrapper}>
      <h2>
        Welcome, <span className={s.username}>{user.username}</span>
      </h2>

      {stats && (
        <div className={s.stats}>
          <div className={s.statsInfo}>
            <User size={150} />
            <div>
              <p>
                <strong>{user.username}</strong>
              </p>
              <p>id: {user.id}</p>
              <p>Role: {user.role}</p>

              <div className={s.actions}>
                <Button onClick={handleLogout} className={s.signOutBtn}>
                  <LogOut size={18} />
                </Button>

                <Button onClick={handleDeleteAccount} className={s.deleteBtn}>
                  {deleteMutation.isPending ? '...' : <Trash2 size={18} />}
                </Button>
              </div>
            </div>
          </div>
          <div className={s.statsData}>
            <p>
              <b>Rating:</b> {stats.rating}
            </p>
            <p>
              <b>Snippets:</b> {stats.snippetsCount}
            </p>
            <p>
              <b>Comments:</b> {stats.commentsCount}
            </p>
            <p>
              <b>Likes:</b> {stats.likesCount}
            </p>
            <p>
              <b>Dislikes:</b> {stats.dislikesCount}
            </p>
            <p>
              <b>Questions:</b> {stats.questionsCount}
            </p>
            <p>
              <b>Correct Answers:</b> {stats.correctAnswersCount}
            </p>
            <p>
              <b>Regular Answers:</b> {stats.regularAnswersCount}
            </p>
          </div>
        </div>
      )}

      <div className={s.formsWrapper}>
        <div className={s.forms}>
          <form
            onSubmit={usernameForm.handleSubmit(onUsernameSubmit)}
            className={s.form}
          >
            <h3>Change Username</h3>
            <TextField
              {...usernameForm.register('username', { required: true })}
              placeholder="Enter new username"
              className={s.textfield}
            />
            <Button
              type="submit"
              disabled={usernameMutation.isPending}
              className={s.button}
            >
              {usernameMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </form>

          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className={s.form}
          >
            <h3>Change Password</h3>

            <TextField
              type="password"
              {...passwordForm.register('oldPassword', { required: true })}
              placeholder="Old password"
              className={s.textfield}
            />

            <TextField
              type="password"
              {...passwordForm.register('newPassword', { required: true })}
              placeholder="New password"
              className={s.textfield}
            />

            <TextField
              type="password"
              placeholder="Confirm new password"
              {...passwordForm.register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === passwordForm.getValues('newPassword') ||
                  'Passwords do not match',
              })}
              className={s.textfield}
            />

            <Button
              type="submit"
              disabled={passwordMutation.isPending}
              className={s.button}
            >
              {passwordMutation.isPending ? 'Updating...' : 'Change'}
            </Button>
          </form>
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
    </div>
  );
};

export default AccountPage;
