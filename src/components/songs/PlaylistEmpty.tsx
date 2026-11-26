import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";

export const PlaylistEmpty = () => (
  <div className="mt-6 flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
    <span
      aria-hidden="true"
      className="flex size-16 items-center justify-center rounded-full bg-[var(--surface-3)] text-2xl text-[var(--primary-text)]"
    >
      <FaMusic />
    </span>

    <h2 className="mt-5 text-xl font-bold">Todavía no agregaste canciones</h2>

    <p className="mt-2 max-w-md text-sm leading-loose text-[var(--text-muted)]">
      Tocá
      <span className="mx-1.5 inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--border)] px-3 py-0.5 font-semibold text-[var(--text)]">
        <FiPlus aria-hidden="true" />
        Agregar
      </span>
      en cualquier canción del catálogo o del detalle y va a aparecer acá.
    </p>

    <Link
      to="/"
      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] bg-[image:var(--gradient-button)] px-6 text-sm font-semibold text-[var(--text)] shadow-lg shadow-[var(--primary)]/30 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
    >
      <FiSearch aria-hidden="true" />
      Explorar el catálogo
    </Link>
  </div>
);