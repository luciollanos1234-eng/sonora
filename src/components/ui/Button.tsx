import type { ButtonHTMLAttributes } from "react";
import "../../styles/global.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "added"
  | "danger"
  | "danger-outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button button--${variant} ${className}`}
      {...props}
    >
      {variant === "added" && (
        <span aria-hidden="true">✓</span>
      )}

      {children}
    </button>
  );
};
