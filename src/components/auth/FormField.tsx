import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  autoComplete: string;
  // Lo que devuelve register("campo") de React Hook Form
  registration: UseFormRegisterReturn;
  error?: string;
  // Borde rojo sin mensaje (por ejemplo, el error general del login)
  invalid?: boolean;
  helper?: string;
}

// Campo con etiqueta, borde rojo, mensaje de error y "Mostrar" para contraseñas
const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  registration,
  error,
  invalid = false,
  helper,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasError = invalid || !!error;

  let describedBy: string | undefined;
  if (error) describedBy = `${id}-error`;
  else if (helper) describedBy = `${id}-helper`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>

      <div
        className={`flex min-h-11 items-center gap-3 rounded-[var(--radius-control)] border bg-[var(--surface-2)] px-4 ${
          hasError
            ? "border-[var(--danger)]"
            : "border-[var(--border)] focus-within:border-[var(--primary-light)]"
        }`}
      >
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus-visible:outline-none"
          {...registration}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--primary-text)]"
          >
            {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-[var(--danger)]">
          <FiAlertCircle aria-hidden="true" className="shrink-0" />
          {error}
        </p>
      )}

      {!error && helper && (
        <p id={`${id}-helper`} className="text-xs text-[var(--text-muted)]">
          {helper}
        </p>
      )}
    </div>
  );
};

export default FormField;
