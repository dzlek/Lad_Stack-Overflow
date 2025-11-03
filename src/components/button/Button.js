import { jsx as _jsx } from "react/jsx-runtime";
import s from './Button.module.scss';
export function Button({ variant = 'contained', size = 'medium', isLoading = false, children, className = '', ...rest }) {
    return (_jsx("button", { className: `${s.button} ${s[variant]} ${s[size]} ${className}`, ...rest, children: isLoading ? 'Loading...' : children }));
}
export default Button;
