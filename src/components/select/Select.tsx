import { useEffect, useState } from 'react';
import s from './select.module.scss';

interface SelectProps {
  label?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Select({
  label,
  error = false,
  disabled = false,
  helperText,
  options,
  value: externalValue,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(externalValue || '');

  useEffect(() => {
    setInternalValue(externalValue ?? '');
  }, [externalValue]);

  const selectedOption = options.find((opt) => opt.value === internalValue);

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className={s.wrapper}>
      {label && (
        <label className={`${s.label} ${disabled ? s.disabled : ''}`}>
          {label}
        </label>
      )}

      <div
        className={`${s.select} ${error ? s.errorSelect : ''} ${
          disabled ? s.disabled : ''
        }`}
        onClick={() => !disabled && setIsOpen((isOpen) => !isOpen)}
      >
        <span className={s.selectedValue}>
          {selectedOption ? selectedOption.label : ''}
        </span>
        <span className={s.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && !disabled && (
        <ul className={s.options} role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${s.option} ${
                internalValue === opt.value ? s.selectedOption : ''
              }`}
              role="option"
              aria-selected={internalValue === opt.value}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {helperText && (
        <span
          className={`${s.helperText} ${error ? s.errorHelperText : ''} ${
            disabled ? s.disabled : ''
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Select;
