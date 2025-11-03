import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../app/context/useAuth';
import { STORAGE_KEYS } from '../../app/context/storageKeys';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import s from './accountPage.module.scss';
import Button from '../../components/button/Button';
import { LogOut, Trash2, User } from 'lucide-react';
import TextField from '../../components/textField/TextField';
import { passwordSchema } from '../../app/schemas/schema';
const updateUsername = async (data) => {
    const res = await axios.patch('/api/me', data, { withCredentials: true });
    return res.data;
};
const updatePassword = async (data) => {
    const res = await axios.patch('/api/me/password', data, {
        withCredentials: true,
    });
    return res.data;
};
const deleteUser = async () => {
    const res = await axios.delete('/api/me', { withCredentials: true });
    return res.data;
};
const fetchUserStatistic = async (userId) => {
    const res = await axios.get(`/api/users/${userId}/statistic`, {
        withCredentials: true,
    });
    return res.data.data.statistic;
};
const AccountPage = () => {
    const { user, isAuth, logout } = useAuth();
    const [status, setStatus] = useState('');
    const usernameForm = useForm({
        defaultValues: { username: user?.username || '' },
    });
    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
    });
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
        queryKey: user
            ? [...QUERY_KEYS.USER_STATS, user.id]
            : QUERY_KEYS.USER_STATS,
        queryFn: () => fetchUserStatistic(user.id),
        enabled: !!user?.id,
    });
    const onUsernameSubmit = (data) => usernameMutation.mutate(data);
    const onPasswordSubmit = (data) => passwordMutation.mutate(data);
    if (!isAuth)
        return _jsx("p", { children: "You must be logged in to view this page." });
    if (!user)
        return _jsx("p", { children: "Loading user..." });
    return (_jsxs("div", { className: s.accountPageWrapper, children: [_jsxs("h2", { children: ["Welcome, ", _jsx("span", { className: s.username, children: user.username })] }), stats && (_jsxs("div", { className: s.stats, children: [_jsxs("div", { className: s.statsInfo, children: [_jsx(User, { size: 150 }), _jsxs("div", { children: [_jsx("p", { children: _jsx("strong", { children: user.username }) }), _jsxs("p", { children: ["id: ", user.id] }), _jsxs("p", { children: ["Role: ", user.role] }), _jsxs("div", { className: s.actions, children: [_jsx(Button, { onClick: handleLogout, className: s.signOutBtn, children: _jsx(LogOut, { size: 18 }) }), _jsx(Button, { onClick: handleDeleteAccount, className: s.deleteBtn, children: deleteMutation.isPending ? '...' : _jsx(Trash2, { size: 18 }) })] })] })] }), _jsxs("div", { className: s.statsData, children: [_jsxs("p", { children: [_jsx("b", { children: "Rating:" }), " ", stats.rating] }), _jsxs("p", { children: [_jsx("b", { children: "Snippets:" }), " ", stats.snippetsCount] }), _jsxs("p", { children: [_jsx("b", { children: "Comments:" }), " ", stats.commentsCount] }), _jsxs("p", { children: [_jsx("b", { children: "Likes:" }), " ", stats.likesCount] }), _jsxs("p", { children: [_jsx("b", { children: "Dislikes:" }), " ", stats.dislikesCount] }), _jsxs("p", { children: [_jsx("b", { children: "Questions:" }), " ", stats.questionsCount] }), _jsxs("p", { children: [_jsx("b", { children: "Correct Answers:" }), " ", stats.correctAnswersCount] }), _jsxs("p", { children: [_jsx("b", { children: "Regular Answers:" }), " ", stats.regularAnswersCount] })] })] })), _jsxs("div", { className: s.formsWrapper, children: [_jsxs("div", { className: s.forms, children: [_jsxs("form", { onSubmit: usernameForm.handleSubmit(onUsernameSubmit), className: s.form, children: [_jsx("h3", { children: "Change Username" }), _jsx(TextField, { ...usernameForm.register('username', { required: true }), placeholder: "Enter new username", className: s.textfield }), _jsx(Button, { type: "submit", disabled: usernameMutation.isPending, className: s.button, children: usernameMutation.isPending ? 'Saving...' : 'Save' })] }), _jsxs("form", { onSubmit: passwordForm.handleSubmit(onPasswordSubmit), className: s.form, children: [_jsx("h3", { children: "Change Password" }), _jsx(TextField, { type: "password", ...passwordForm.register('oldPassword'), placeholder: "Old password", className: s.textfield }), passwordForm.formState.errors.oldPassword && (_jsx("p", { className: s.error, children: passwordForm.formState.errors.oldPassword.message })), _jsx(TextField, { type: "password", ...passwordForm.register('newPassword'), placeholder: "New password", className: s.textfield }), passwordForm.formState.errors.newPassword && (_jsx("p", { className: s.error, children: passwordForm.formState.errors.newPassword.message })), _jsx(TextField, { type: "password", placeholder: "Confirm new password", ...passwordForm.register('confirmPassword'), className: s.textfield }), passwordForm.formState.errors.confirmPassword && (_jsx("p", { className: s.error, children: passwordForm.formState.errors.confirmPassword.message })), _jsx(Button, { type: "submit", disabled: passwordMutation.isPending, className: s.button, children: passwordMutation.isPending ? 'Updating...' : 'Change' })] })] }), status && (_jsx("p", { className: `${s.status} ${status.startsWith('Success!') ? s.success : s.error}`, children: status }))] })] }));
};
export default AccountPage;
