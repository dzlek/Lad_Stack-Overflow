import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import s from './select.module.scss';
export function Select({ label, error = false, disabled = false, helperText, options, value: externalValue, onChange, }) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(externalValue || '');
    useEffect(() => {
        setInternalValue(externalValue ?? '');
    }, [externalValue]);
    const selectedOption = options.find((opt) => opt.value === internalValue);
    const handleSelect = (val) => {
        setInternalValue(val);
        onChange?.(val);
        setIsOpen(false);
    };
    return (_jsxs("div", { className: s.wrapper, children: [label && (_jsx("label", { className: `${s.label} ${disabled ? s.disabled : ''}`, children: label })), _jsxs("div", { className: `${s.select} ${error ? s.errorSelect : ''} ${disabled ? s.disabled : ''}`, onClick: () => !disabled && setIsOpen((isOpen) => !isOpen), children: [_jsx("span", { className: s.selectedValue, children: selectedOption ? selectedOption.label : '' }), _jsx("span", { className: s.arrow, children: isOpen ? '▲' : '▼' })] }), isOpen && !disabled && (_jsx("ul", { className: s.options, role: "listbox", children: options.map((opt) => (_jsx("li", { className: `${s.option} ${internalValue === opt.value ? s.selectedOption : ''}`, role: "option", "aria-selected": internalValue === opt.value, onClick: () => handleSelect(opt.value), children: opt.label }, opt.value))) })), helperText && (_jsx("span", { className: `${s.helperText} ${error ? s.errorHelperText : ''} ${disabled ? s.disabled : ''}`, children: helperText }))] }));
}
export default Select;
