import Logo from "../../assets/Favicon.sonora.png";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TbPlaylist } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg p-2 transition-colors hover:bg-purple-400 ${
      isActive ? "bg-purple-500 text-white" : "text-gray-300"
    }`;

  return (
    <header className="sticky top-0 h-screen w-64 border-r bg-(--bg) text-white">
      <nav className="flex h-full flex-col gap-2 p-4">
        <div className="mb-4 flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-16 w-16" />
          <p className="text-xl font-bold">sonora</p>
        </div>

        <NavLink to="/Home" className={linkClass}>
          <p className="flex items-center gap-2">
            <GoHome className="text-xl" />
            Inicio
          </p>
        </NavLink>
        <NavLink to="/playlist" className={linkClass}>
          <p className="flex items-center gap-2">
            <TbPlaylist className="text-xl" />
            Mi Playlist
          </p>
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          <p className="flex items-center gap-2">
            <LuUsers className="text-xl" />
            Acerca de Nosotros
          </p>
        </NavLink>
        <div className="mt-auto text-gray-400 text-sm">
          <hr />
          <div className="mt-6 flex items-center gap-3 p-3 justify-end">
            <div
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white"
            >
              <NavLink to="/Admin">U</NavLink>
            </div>
            <span className="min-w-0 flex-1 truncate text-sm text-white">
              Nombre de usuario
            </span>
            <NavLink to="" aria-label="Cerrar sesión">
              <BiLogOut className="text-xl" />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
