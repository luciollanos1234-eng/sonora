import { Link } from "react-router-dom";
import { FaCompactDisc } from "react-icons/fa";
import { FiHome, FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <section className="flex min-h-[calc(100vh-7rem)] items-start justify-center px-4 pt-16 text-center sm:pt-20 lg:pt-24">
      <div className="w-full max-w-2xl">

        {/* Ilustración 404 */}
        <div className="mb-6 flex items-center justify-center gap-3 sm:gap-5">
          <span className="text-7xl font-extrabold leading-none text-violet-300 sm:text-8xl lg:text-9xl">
            4
          </span>

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-violet-500/20 bg-[radial-gradient(circle,#38245f_0%,#171321_55%,#0b0a12_100%)] shadow-[0_0_30px_rgba(124,58,237,0.12)] sm:h-28 sm:w-28">
            <div className="absolute inset-2 rounded-full border border-violet-400/10" />
            <div className="absolute inset-4 rounded-full border border-violet-400/10" />
            <div className="absolute inset-6 rounded-full border border-violet-400/10" />

            <FaCompactDisc className="relative z-10 text-4xl text-violet-500/70" />

            <div className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 rotate-12 rounded-full bg-black/70" />
          </div>

          <span className="text-7xl font-extrabold leading-none text-violet-300 sm:text-8xl lg:text-9xl">
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
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
          >
            <FiHome />
            Volver al inicio
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--surface-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
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
