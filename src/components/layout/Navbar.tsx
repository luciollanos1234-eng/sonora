import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogIn, BiLogOut, BiUserPlus } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { LuShieldCheck, LuUsers } from "react-icons/lu";
import { MdClose, MdMenu } from "react-icons/md";
import { TbPlaylist } from "react-icons/tb";
import Logo from "../../assets/Favicon.sonora.png";
import { useAuth } from "../../context/useAuth";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-11 items-center rounded-lg p-2 transition-colors ${
    isActive
      ? "bg-[var(--primary)]/20 text-[var(--primary-text)]"
      : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
  }`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="" className="h-9 w-9" />
          <span className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--text)]">sonora</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="sidebar-nav"
          className="flex size-11 items-center justify-center rounded-lg text-[var(--text)] hover:bg-[var(--surface-2)]"
        >
          <MdMenu className="text-2xl" aria-hidden="true" />
        </button>
      </header>

      {isOpen && (
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-[var(--bg)]/70 lg:hidden"
        />
      )}

      <section
        id="sidebar-nav"
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full max-lg:invisible"
        }`}
      >
        <nav className="flex h-full flex-col gap-2 overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="" className="h-16 w-16" />
              <span className="text-xl font-bold uppercase tracking-[0.2em]">sonora</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="flex size-11 items-center justify-center rounded-lg hover:bg-[var(--surface-2)] lg:hidden"
            >
              <MdClose className="text-2xl" aria-hidden="true" />
            </button>
          </div>

          <NavLink to="/" className={linkClass} onClick={closeMenu}>
            <span className="flex items-center gap-2">
              <GoHome className="text-xl" aria-hidden="true" />
              Inicio
            </span>
          </NavLink>

          {user && (
            <NavLink to="/playlist" className={linkClass} onClick={closeMenu}>
              <span className="flex items-center gap-2">
                <TbPlaylist className="text-xl" aria-hidden="true" />
                Mi Playlist
              </span>
            </NavLink>
          )}

          <NavLink to="/about" className={linkClass} onClick={closeMenu}>
            <span className="flex items-center gap-2">
              <LuUsers className="text-xl" aria-hidden="true" />
              Acerca de Nosotros
            </span>
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass} onClick={closeMenu}>
              <span className="flex items-center gap-2">
                <LuShieldCheck className="text-xl" aria-hidden="true" />
                Administración
              </span>
            </NavLink>
          )}

          <div className="mt-auto border-t border-[var(--border)] pt-4 text-sm">
            {user ? (
              <div className="flex items-center gap-3 p-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] font-bold text-[var(--text)]">
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[var(--text)]">{user.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {user.role === "admin" ? "Administrador" : "Usuario"}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar sesión"
                  onClick={handleLogout}
                  className="flex size-11 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                >
                  <BiLogOut className="text-xl" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="font-semibold text-[var(--text)]">Armá tu playlist</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Creá una cuenta gratis para guardar tus canciones.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <NavLink
                    to="/registro"
                    onClick={closeMenu}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--primary)] text-sm font-semibold text-[var(--text)] hover:brightness-110"
                  >
                    <BiUserPlus className="text-lg" aria-hidden="true" />
                    Registrate
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface-2)]"
                  >
                    <BiLogIn className="text-lg" aria-hidden="true" />
                    Iniciar sesión
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
