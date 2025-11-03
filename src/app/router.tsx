import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppRouter';
import LoginPage from '../pages/loginPage/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';

import HomePage from '../pages/homePage/HomePage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import PostPage from '../pages/postPage/PostPage';
import AccountPage from '../pages/accountPage/AccountPage';
import PostsPage from '../pages/postsPage/PostsPage';
import CreatePostPage from '../pages/createPostPage/CreatePostPage';
import EditPostPage from '../pages/editPostPage/EditPostPage';
import QuestionsPage from '../pages/questionsPage/QuestionsPage';
import UsersPage from '../pages/usersPage/UsersPage';
import UserPage from '../pages/userPage/UserPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '', element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'post/:id', element: <PostPage /> },
      { path: 'edit/:id', element: <EditPostPage /> },
      { path: 'user/:id', element: <UserPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'my-account', element: <AccountPage /> },
          { path: 'my-snippets', element: <PostsPage /> },
          { path: 'post-snippet', element: <CreatePostPage /> },
          { path: 'questions', element: <QuestionsPage /> },
          { path: 'users', element: <UsersPage /> },
        ],
      },
    ],
  },
]);
