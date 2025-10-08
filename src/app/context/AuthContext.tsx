import { createContext } from 'react';

export type User = {
  id: string;
  username: string;
  role: string;
} | null;

export type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
