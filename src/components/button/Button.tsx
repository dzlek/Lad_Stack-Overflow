import s from './button.module.scss';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonSize = 'small' | 'medium' | 'large';

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends HtmlButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export function Button({
  variant = 'contained',
  size = 'medium',
  isLoading = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${s.button} ${s[variant]} ${s[size]} ${className}`}
      {...rest}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
