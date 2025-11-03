import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import axios from 'axios';
import s from './usersPage.module.scss';
import { Link } from 'react-router-dom';
const UsersPage = () => {
    const { data: users, isLoading, isError, } = useQuery({
        queryKey: QUERY_KEYS.USERS,
        queryFn: async () => {
            const res = await axios.get('/api/users', { withCredentials: true });
            return res.data.data.data;
        },
    });
    if (isLoading)
        return _jsx("div", { children: "Loading users..." });
    if (isError)
        return _jsx("div", { children: "Failed to load users" });
    return (_jsxs("div", { className: s.usersPageWrapper, children: [_jsx("h2", { children: "All Users" }), _jsx("ul", { className: s.userListWrapper, children: users?.map((user) => (_jsxs("li", { children: [_jsx(Link, { to: `/user/${user.id}`, children: _jsx("strong", { children: user.username }) }), _jsxs("div", { children: ["role: ", user.role, ", id:", user.id] })] }, user.id))) })] }));
};
export default UsersPage;
