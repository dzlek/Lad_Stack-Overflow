import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/context/useAuth';

import axios from 'axios';

import Button from '../../components/button/Button';
import TextField from '../../components/textField/TextField';

import s from './registerPage.module.scss';
import { useMutation } from '@tanstack/react-query';

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const registerMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      axios.post('https://codelang.vercel.app/api/register', data),
    onSuccess: () => {
      navigate('/login');
    },
    onError: (err) => {
      console.error('Registration error:', err);
      alert('Please try again.');
    },
  });

  const onSubmit = (data: FormData) => {
    registerMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.registerFormWrapper}>
      <h2>Register</h2>

      <TextField
        label="Username"
        type="text"
        placeholder="Enter username"
        {...register('username', { required: 'Username is required' })}
      />
      {errors.username && <p className={s.error}>{errors.username.message}</p>}

      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <p className={s.error}>{errors.password.message}</p>}

      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Repeat password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
      />
      {errors.confirmPassword && (
        <p className={s.error}>{errors.confirmPassword.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>

      <p>
        Already have an account?
        <Link to="/login" className={s.linkWrapper}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
