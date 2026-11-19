
import { useId, type ReactNode, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  helperText?: string;
  error?: string;
}

export const Input = ({
  label,
  icon,
  helperText,
  error,
  id,
  className = "",
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-[var(--text)]"
      >
        {label}
      </label>

      <div className={`
        flex items-center gap-3 min-h-11 px-4
        rounded-[var(--radius-control)]
        border bg-[var(--surface-2)]
        ${error
          ? "border-[var(--danger)]"
          : "border-[var(--border)]"}
      `}>
        {icon && (
          <span className="text-[var(--text-muted)]">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` :
            helperText ? `${inputId}-helper` : undefined
          }
          className={`
            w-full min-w-0 bg-transparent outline-none
            text-sm text-[var(--text)]
            placeholder:text-[var(--text-muted)]
            focus-visible:outline-none
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert"
          className="text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${inputId}-helper`}
          className="text-sm text-[var(--text-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
};
