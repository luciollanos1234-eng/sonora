import type { ButtonHTMLAttributes } from "react";

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

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[image:var(--gradient-button)] text-[var(--text)]",
  secondary: "bg-[var(--surface-3)] text-[var(--text)]",
  outline: "bg-transparent border-[var(--border)] text-[var(--primary-text)]",
  added: "bg-[var(--primary-text)] text-[var(--surface)]",
  danger: "bg-[var(--danger)] text-[var(--bg)]",
  "danger-outline": "bg-transparent border-[var(--danger)] text-[var(--danger)]",
};

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`
      inline-flex items-center justify-center gap-2
      min-h-[44px] px-4 rounded-[var(--radius-control)]
      border border-transparent
      text-sm font-semibold
      transition-all duration-200
      hover:brightness-110
      focus-visible:outline-2
      focus-visible:outline-offset-2
      focus-visible:outline-[var(--focus-color)]
      disabled:opacity-[var(--disabled-opacity)]
      disabled:cursor-not-allowed
      disabled:hover:brightness-100
      ${variants[variant]}
      ${className}
    `}
    {...props}
  >
    {variant === "added" && <span aria-hidden="true">✓</span>}
    {children}
  </button>
);
