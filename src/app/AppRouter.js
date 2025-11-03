import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Header from '../widgets/header/Header';
import Sidebar from '../widgets/sidebar/Sidebar';
import s from './appRouter.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const AppLayout = () => {
    return (_jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(Header, {}), _jsxs("div", { className: s.wrapper, children: [_jsx(Sidebar, {}), _jsx("main", { className: s.mainWrapper, children: _jsx(Outlet, {}) })] })] }));
};
export default AppLayout;
