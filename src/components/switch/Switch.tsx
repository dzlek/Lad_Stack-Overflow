import { useId, useState, useEffect, ChangeEvent } from 'react';
import s from './switch.module.scss';

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface SwitchProps extends Omit<HtmlInputProps, 'onChange'> {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Switch({
  disabled = false,
  className = '',
  checked,
  onChange,
  ...rest
}: SwitchProps) {
  const id = useId();
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
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
