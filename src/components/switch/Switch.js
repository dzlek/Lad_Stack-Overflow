import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import s from './switch.module.scss';
export function Switch({ disabled = false, className = '', isChecked, onChange, ...rest }) {
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
    return (_jsx("input", { type: "checkbox", role: "switch", className: `${s.switch} ${className}`, disabled: disabled, checked: internalChecked, onChange: handleChange, ...rest }));
}
export default Switch;
