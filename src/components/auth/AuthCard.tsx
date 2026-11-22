import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { Logo } from "../ui/Logo";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

// Tarjeta que comparten Login y Registro
const AuthCard = ({ title, subtitle, children }: AuthCardProps) => (
  <main className="relative min-h-screen bg-[var(--bg)] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--primary)_28%,transparent),transparent_55%)] px-4 py-6 text-[var(--text)]">
    <Link
      to="/"
      className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold hover:bg-[var(--surface-2)] sm:ml-8"
    >
      <FiChevronLeft aria-hidden="true" />
      Volver al inicio
    </Link>

    <section className="mx-auto mt-8 w-full max-w-sm rounded-[var(--radius-modal)] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 shadow-2xl">
      <div className="flex flex-col items-center text-center">
        <Logo className="flex-col gap-2" />
        <h1 className="mt-5 font-[var(--font-display)] text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
      </div>

      {children}
    </section>
  </main>
);

export default AuthCard;
