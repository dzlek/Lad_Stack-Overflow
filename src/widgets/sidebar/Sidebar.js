import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { Home, User, FileText, Users, HelpCircle } from 'lucide-react';
import s from './sidebar.module.scss';
import { useAuth } from '../../app/context/useAuth';
const Sidebar = () => {
    const { user } = useAuth();
    return (_jsxs("aside", { className: s.sidebar, children: [user && (_jsxs("div", { className: s.user, children: [_jsx("img", { className: s.avatar, src: "/user.jpeg", alt: "User avatar" }), user.username] })), _jsx("nav", { children: _jsxs("ul", { className: s.navLinksList, children: [_jsx("li", { children: _jsxs(NavLink, { to: "/", children: [' ', _jsx(Home, { size: 18 }), "Home"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/my-account", children: [_jsx(User, { size: 18 }), " My Account"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/post-snippet", children: [_jsx(FileText, { size: 18 }), " Post snippet"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/my-snippets", children: [_jsx(FileText, { size: 18 }), " My snippets"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/questions", children: [_jsx(HelpCircle, { size: 18 }), " Questions"] }) }), _jsx("li", { children: _jsxs(NavLink, { to: "/users", children: [_jsx(Users, { size: 18 }), " Users"] }) })] }) })] }));
};
export default Sidebar;
