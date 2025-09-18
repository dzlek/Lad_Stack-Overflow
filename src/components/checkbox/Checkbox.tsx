import { useId, useState, useEffect, ChangeEvent } from 'react';
import s from './checkbox.module.scss';

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface CheckboxProps extends HtmlInputProps {
  label?: string;
  isChecked?: boolean;
}

export function Checkbox({
  label,
  disabled = false,
  className = '',
  isChecked,
  onChange,
  ...rest
}: CheckboxProps) {
  const id = useId();
  const [internalChecked, setInternalChecked] = useState(isChecked ?? false);

  useEffect(() => {
    if (isChecked !== undefined) {
      setInternalChecked(isChecked);
    }
  }, [isChecked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isChecked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  return (
    <div className={s.wrapper}>
      <input
        id={id}
        type="checkbox"
        className={`${s.checkbox} ${className}`}
        disabled={disabled}
        checked={internalChecked}
        onChange={handleChange}
        {...rest}
      />
      {label && (
        <label
          htmlFor={id}
          className={`${s.label} ${disabled ? s.disabled : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
