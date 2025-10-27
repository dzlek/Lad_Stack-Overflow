import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppRouter';
import LoginPage from '../pages/loginPage/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';

import HomePage from '../pages/homePage/HomePage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import PostPage from '../pages/postPage/PostPage';
import AccountPage from '../pages/accountPage/AccountPage';
import PostsPage from '../pages/postsPage/PostsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '', element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'post/:id', element: <PostPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'my-account', element: <AccountPage /> },
          { path: 'post-snippet', element: <div>Post Snippet</div> },
          { path: 'my-snippets', element: <PostsPage /> },
          { path: 'questions', element: <div>Questions</div> },
          { path: 'users', element: <div>Users</div> },
        ],
      },
    ],
  },
]);
