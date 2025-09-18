import { useId, useState, useEffect, ChangeEvent } from 'react';
import s from './switch.module.scss';

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface SwitchProps extends HtmlInputProps {
  isChecked?: boolean;
}

export function Switch({
  disabled = false,
  className = '',
  isChecked,
  onChange,
  ...rest
}: SwitchProps) {
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
    <input
      id={id}
      type="checkbox"
      role="switch"
      className={`${s.switch} ${className}`}
      disabled={disabled}
      checked={internalChecked}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default Switch;
