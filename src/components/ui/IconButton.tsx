import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "primary" | "secondary" | "outline";
}

const variants = {
  primary: "bg-[var(--primary)] text-[var(--text)]",
  secondary: "bg-[var(--surface-3)] text-[var(--text)]",
  outline: "bg-transparent border-[var(--border)] text-[var(--primary-text)]",
};

export const IconButton = ({
  variant = "secondary",
  className = "",
  children,
  ...props
}: IconButtonProps) => (
  <button
    type="button"
    className={`
      inline-flex items-center justify-center
      size-11 shrink-0 rounded-full border border-transparent
      transition-all hover:brightness-125
      focus-visible:outline-2
      focus-visible:outline-offset-2
      focus-visible:outline-[var(--focus-color)]
      disabled:opacity-[var(--disabled-opacity)]
      disabled:cursor-not-allowed
      ${variants[variant]}
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);
