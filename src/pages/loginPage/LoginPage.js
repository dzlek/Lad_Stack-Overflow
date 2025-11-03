import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/context/useAuth';
import Button from '../../components/button/Button';
import TextField from '../../components/textField/TextField';
import s from './loginPage.module.scss';
const LoginPage = () => {
    const { login, isAuth } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        }
        catch {
            setError('Invalid username or password');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { onSubmit: handleSubmit, className: s.loginFormWrapper, children: [_jsx("h2", { children: "Login" }), _jsx(TextField, { label: "Username", type: "text", placeholder: "Username", value: username, onChange: (e) => setUsername(e.target.value), required: true }), _jsx(TextField, { label: "Password", type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), error && _jsx("p", { className: s.error, children: error }), _jsx(Button, { type: "submit", children: "Sign in" })] }), _jsx(Button, { variant: "outlined", onClick: () => navigate('/register'), children: "Register" })] }));
};
export default LoginPage;
