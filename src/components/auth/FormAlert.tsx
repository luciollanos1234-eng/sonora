import type { ReactNode } from "react";
import { FiAlertCircle } from "react-icons/fi";

interface FormAlertProps {
  title?: string;
  children: ReactNode;
}

// Aviso de error arriba del formulario; role="alert" lo anuncia el lector de pantalla
const FormAlert = ({ title, children }: FormAlertProps) => (
  <div
    role="alert"
    className="mt-6 flex gap-3 rounded-[var(--radius-control)] border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-4 text-sm"
  >
    <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--danger)]" />
    <div>
      {title && <p className="font-semibold">{title}</p>}
      <p className={title ? "mt-1 text-[var(--text-muted)]" : ""}>{children}</p>
    </div>
  </div>
);

export default FormAlert;
