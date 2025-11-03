import { jsx as _jsx } from "react/jsx-runtime";
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
import CreateQuestionPage from '../pages/createQuestionPage/CreateQuestionPage';
import EditQuestionPage from '../pages/editQuestionPage/EditQuestionPage';
export const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(AppLayout, {}),
        children: [
            { path: 'login', element: _jsx(LoginPage, {}) },
            { path: '', element: _jsx(HomePage, {}) },
            { path: 'register', element: _jsx(RegisterPage, {}) },
            { path: 'post/:id', element: _jsx(PostPage, {}) },
            { path: 'edit/:id', element: _jsx(EditPostPage, {}) },
            { path: 'user/:id', element: _jsx(UserPage, {}) },
            {
                element: _jsx(ProtectedRoute, {}),
                children: [
                    { path: 'my-account', element: _jsx(AccountPage, {}) },
                    { path: 'my-snippets', element: _jsx(PostsPage, {}) },
                    { path: 'post-snippet', element: _jsx(CreatePostPage, {}) },
                    { path: 'questions', element: _jsx(QuestionsPage, {}) },
                    { path: 'users', element: _jsx(UsersPage, {}) },
                    { path: 'questions/create', element: _jsx(CreateQuestionPage, {}) },
                    { path: 'questions/edit/:id', element: _jsx(EditQuestionPage, {}) },
                ],
            },
        ],
    },
]);
