import { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { AuthContext, User } from './AuthContext';
import { STORAGE_KEYS } from './storageKeys';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (err) {
        console.error('Failed to parse user from localStorage:', err);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(
        'https://codelang.vercel.app/api/auth/login',
        { username, password },
      );

      const { data } = res.data;
      setUser(data);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
