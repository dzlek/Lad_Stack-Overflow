import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import s from './textField.module.scss';
export function TextField({ label, disabled = false, error = false, helperText, className = '', ...rest }) {
    const id = useId();
    return (_jsxs("div", { className: s.wrapper, children: [label && (_jsx("label", { htmlFor: id, className: `${s.label} ${disabled ? s.disabled : ''}`, children: label })), _jsx("input", { id: id, className: `${s.input} ${error ? s.errorInput : ''} ${className}`, disabled: disabled, ...rest }), helperText && (_jsx("span", { className: `${s.helperText} ${error ? s.errorHelperText : ''} ${disabled ? s.disabled : ''}`, children: helperText }))] }));
}
export default TextField;
