import { Link, useLocation } from "react-router-dom";

import { Modal } from "../ui/Modal";

interface LoginRequiredModalProps {
  open: boolean;
  onClose: () => void;
}

const MoonIcon = () => (
  <span
    aria-hidden="true"
    className="flex size-20 items-center justify-center rounded-[var(--radius-card)] bg-[image:var(--gradient-button)]"
  >
    <svg viewBox="0 0 24 24" className="size-10 text-[var(--primary-text)]">
      <path
        fill="currentColor"
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
      />
    </svg>
  </span>
);

const linkBase =
  "inline-flex min-h-11 w-full items-center justify-center rounded-[var(--radius-pill)] px-6 text-sm font-semibold text-[var(--text)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]";

export const LoginRequiredModal = ({
  open,
  onClose,
}: LoginRequiredModalProps) => {
  const location = useLocation();

  return (
    <Modal
      open={open}
      title="Guardá esta canción en tu playlist"
      onClose={onClose}
      showCancel={false}
      centered
      icon={<MoonIcon />}
    >
      <p className="text-center text-sm leading-relaxed text-[var(--text-muted)]">
        Para agregar canciones a Mi Playlist necesitás una cuenta. Escuchar
        sigue siendo libre, con o sin sesión.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/registro"
          onClick={onClose}
          className={`${linkBase} bg-[image:var(--gradient-button)]`}
        >
          Crear cuenta gratis
        </Link>

        <Link
          to="/login"
          state={{ from: location.pathname }}
          onClick={onClose}
          className={`${linkBase} bg-[var(--surface-3)]`}
        >
          Ya tengo cuenta · Iniciar sesión
        </Link>
      </div>
    </Modal>
  );
};