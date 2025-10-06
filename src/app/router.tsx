import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <div>Home Page</div> },
      { path: 'my-account', element: <div>My Account Page</div> },
      { path: 'post-snippet', element: <div>Post Snippet</div> },
      { path: 'my-snippets', element: <div>My Snippets</div> },
      { path: 'questions', element: <div>Questions</div> },
      { path: 'users', element: <div>Users</div> },
    ],
  },
]);
