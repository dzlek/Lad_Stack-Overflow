import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState, useEffect } from 'react';
import s from './checkbox.module.scss';
export function Checkbox({ label, disabled = false, className = '', isChecked, onChange, ...rest }) {
    const id = useId();
    const [internalChecked, setInternalChecked] = useState(isChecked ?? false);
    useEffect(() => {
        if (isChecked !== undefined) {
            setInternalChecked(isChecked);
        }
    }, [isChecked]);
    const handleChange = (e) => {
        if (isChecked === undefined) {
            setInternalChecked(e.target.checked);
        }
        onChange?.(e);
    };
    return (_jsxs("div", { className: s.wrapper, children: [_jsx("input", { id: id, type: "checkbox", className: `${s.checkbox} ${className}`, disabled: disabled, checked: internalChecked, onChange: handleChange, ...rest }), label && (_jsx("label", { htmlFor: id, className: `${s.label} ${disabled ? s.disabled : ''}`, children: label }))] }));
}
export default Checkbox;
