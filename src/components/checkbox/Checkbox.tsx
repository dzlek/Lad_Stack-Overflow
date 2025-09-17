import { useId } from 'react';
import s from './checkbox.module.scss';

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface CheckboxProps extends HtmlInputProps {
  label?: string;
}

export function Checkbox({
  label,
  disabled = false,
  className = '',
  ...rest
}: CheckboxProps) {
  const id = useId();

  return (
    <div className={s.wrapper}>
      <input
        id={id}
        type="checkbox"
        className={`${s.checkbox}  ${className}`}
        disabled={disabled}
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
