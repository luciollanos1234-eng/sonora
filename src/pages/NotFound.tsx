import { Link } from "react-router-dom";
import { FaCompactDisc } from "react-icons/fa";
import { FiHome, FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <section className="flex min-h-[calc(100vh-7rem)] items-start justify-center px-4 pt-16 text-center sm:pt-20 lg:pt-24">
      <div className="w-full max-w-2xl">

        {/* Ilustración 404 */}
        <div className="mb-6 flex items-center justify-center gap-3 sm:gap-5">
          <span className="text-7xl font-extrabold leading-none text-[var(--primary-text)] sm:text-8xl lg:text-9xl">
            4
          </span>

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-2xl sm:h-28 sm:w-28">
            <div className="absolute inset-2 rounded-full border border-[var(--border)]" />
            <div className="absolute inset-4 rounded-full border border-[var(--border)]" />
            <div className="absolute inset-6 rounded-full border border-[var(--border)]" />

            <FaCompactDisc className="relative z-10 text-4xl text-[var(--primary)]" />

            <div className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 rotate-12 rounded-full bg-[var(--bg)]" />
          </div>

          <span className="text-7xl font-extrabold leading-none text-[var(--primary-text)] sm:text-8xl lg:text-9xl">
            4
          </span>
        </div>

        {/* Mensaje */}
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          Este tema no está en el disco
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          La dirección no existe o la cambiaron.
          Volvé al inicio o seguí buscando en el catálogo.
        </p>

        {/* Acciones */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-button)] px-6 py-3 text-sm font-semibold text-[var(--text)] shadow-lg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
          >
            <FiHome />
            Volver al inicio
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--surface-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
          >
            <FiSearch />
            Explorar el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
