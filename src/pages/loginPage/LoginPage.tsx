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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.loginFormWrapper}>
        <h2>Login</h2>
        <TextField
          label="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={s.error}>{error}</p>}
        <Button type="submit">Sign in</Button>
      </form>
      <Button variant="outlined" onClick={() => navigate('/register')}>
        Register
      </Button>
    </>
  );
};

export default LoginPage;
