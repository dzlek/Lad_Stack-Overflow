import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppRouter';
import LoginPage from '../pages/loginPage/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';

import HomePage from '../pages/homePage/HomePage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import PostPage from '../pages/postPage/PostPage';
import AccountPage from '../pages/accountPage/AccountPage';
import EditPostPage from '../pages/editPostPage/EditPostPage';

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
          { path: 'my-snippets', element: <div>My Snippets</div> },
          { path: 'questions', element: <div>Questions</div> },
          { path: 'users', element: <div>Users</div> },
          { path: 'edit/:id', element: <EditPostPage /> },
        ],
      },
    ],
  },
]);
