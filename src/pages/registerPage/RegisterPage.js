import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/context/useAuth';
import axios from 'axios';
import Button from '../../components/button/Button';
import TextField from '../../components/textField/TextField';
import s from './registerPage.module.scss';
import { useMutation } from '@tanstack/react-query';
const RegisterPage = () => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm();
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);
    const registerMutation = useMutation({
        mutationFn: (data) => axios.post('https://codelang.vercel.app/api/register', data),
        onSuccess: () => {
            navigate('/login');
        },
        onError: (err) => {
            console.error('Registration error:', err);
            alert('Please try again.');
        },
    });
    const onSubmit = (data) => {
        registerMutation.mutate({
            username: data.username,
            password: data.password,
        });
    };
    const password = watch('password');
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: s.registerFormWrapper, children: [_jsx("h2", { children: "Register" }), _jsx(TextField, { label: "Username", type: "text", placeholder: "Enter username", ...register('username', { required: 'Username is required' }) }), errors.username && _jsx("p", { className: s.error, children: errors.username.message }), _jsx(TextField, { label: "Password", type: "password", placeholder: "Enter password", ...register('password', { required: 'Password is required' }) }), errors.password && _jsx("p", { className: s.error, children: errors.password.message }), _jsx(TextField, { label: "Confirm Password", type: "password", placeholder: "Repeat password", ...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                }) }), errors.confirmPassword && (_jsx("p", { className: s.error, children: errors.confirmPassword.message })), _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? 'Registering...' : 'Register' }), _jsxs("p", { children: [`Already have an account? `, _jsx(Link, { to: "/login", className: s.linkWrapper, children: "Login" })] })] }));
};
export default RegisterPage;
