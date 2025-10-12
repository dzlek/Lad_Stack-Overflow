import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppRouter';
import LoginPage from '../pages/loginPage/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import RegisterPage from '../pages/registerPage/registerPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '', element: <div>Home Page</div> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'my-account', element: <div>My Account Page</div> },
          { path: 'post-snippet', element: <div>Post Snippet</div> },
          { path: 'my-snippets', element: <div>My Snippets</div> },
          { path: 'questions', element: <div>Questions</div> },
          { path: 'users', element: <div>Users</div> },
        ],
      },
    ],
  },
]);
