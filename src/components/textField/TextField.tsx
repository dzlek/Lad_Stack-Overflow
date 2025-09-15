import { useId } from 'react';
import s from './textField.module.scss';

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface TextFieldProps extends HtmlInputProps {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export function TextField({
  label,
  disabled = false,
  error = false,
  helperText,
  className = '',
  ...rest
}: TextFieldProps) {
  const id = useId();

  return (
    <div className={s.wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={`${s.label} ${disabled ? s.disabled : ''}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${s.input} ${error ? s.errorInput : ''} ${className}`}
        disabled={disabled}
        {...rest}
      />
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

export default TextField;
