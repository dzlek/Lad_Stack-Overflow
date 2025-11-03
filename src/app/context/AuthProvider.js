import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { STORAGE_KEYS } from './storageKeys';
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.USER);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUser(parsed);
            }
            catch (err) {
                console.error('Failed to parse user from localStorage:', err);
                localStorage.removeItem(STORAGE_KEYS.USER);
            }
        }
    }, []);
    const login = async (username, password) => {
        try {
            const res = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
            const { data } = res.data;
            setUser(data);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
        }
        catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.USER);
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout, isAuth: !!user }, children: children }));
};
