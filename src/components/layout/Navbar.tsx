import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { TbPlaylist } from "react-icons/tb";
import Logo from "../../assets/Favicon.sonora.png";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg p-2 transition-colors hover:bg-purple-400 ${
      isActive ? "bg-purple-500 text-white" : "text-gray-300"
    }`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="sidebar-nav"
        className="fixed left-4 top-4 z-40 flex items-center gap-2 rounded-lg bg-(--bg) p-2 text-white shadow-lg hover:bg-purple-400 lg:hidden"
      >
        <img src={Logo} alt="sonora" className="h-10 w-10 " />
      </button>

      {isOpen && (
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <section
        id="sidebar-nav"
        className={`fixed inset-y-0 left-0 z-50 flex h-248 w-64 shrink-0 flex-col border-r bg-(--bg) text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col gap-2 p-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="sonora" className="h-16 w-16" />
              <span className="text-xl font-bold">sonora</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="rounded p-2 hover:bg-purple-400 lg:hidden"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          <NavLink to="/" className={linkClass} onClick={closeMenu}>
            <span className="flex items-center gap-2">
              <GoHome className="text-xl" />
              Inicio
            </span>
          </NavLink>
          <NavLink to="/playlist" className={linkClass} onClick={closeMenu}>
            <span className="flex items-center gap-2">
              <TbPlaylist className="text-xl" />
              Mi Playlist
            </span>
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={closeMenu}>
            <span className="flex items-center gap-2">
              <LuUsers className="text-xl" />
              Acerca de Nosotros
            </span>
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass} onClick={closeMenu}>
              <span className="flex items-center gap-2">
                <LuUsers className="text-xl" />
                Administración
              </span>
            </NavLink>
          )}

          <div className="mt-auto text-sm text-gray-400">
            <hr />
            {/* Con sesión: nombre y salir. Sin sesión: menú de visitante */}
            {user ? (
              <div className="mt-6 flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="min-w-0 flex-1 truncate text-white">
                  {user.name}
                </span>
                <button
                  type="button"
                  aria-label="Cerrar sesión"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="rounded p-1 hover:bg-purple-400"
                >
                  <BiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                <span className="mt-4 flex items-center gap-2">
                  <BiLogIn className="text-xl" />
                  Iniciar sesión
                </span>
              </NavLink>
            )}
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
