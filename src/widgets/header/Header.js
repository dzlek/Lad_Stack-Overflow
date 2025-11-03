import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useAuth } from '../../app/context/useAuth';
import s from './header.module.scss';
import { CodeXml } from 'lucide-react';
const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const createQuestion = () => {
        navigate(`/questions/create`);
    };
    return (_jsxs("header", { className: s.header, children: [_jsx(Link, { to: "", className: s.logo, children: _jsxs("span", { children: [_jsx(CodeXml, { size: 20 }), "CODELANG"] }) }), _jsxs("div", { className: s.controls, children: [location.pathname.startsWith('/questions') && (_jsx(Button, { onClick: createQuestion, children: "Ask Question" })), user && _jsx(Button, { onClick: logout, children: "SIGN OUT" }), _jsxs("div", { className: s.langSwitch, children: [_jsx("button", { children: "\u6587A" }), _jsx("button", { children: "EN" })] })] })] }));
};
export default Header;
