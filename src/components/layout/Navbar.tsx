import Logo from "../../assets/Favicon.sonora.png";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TbPlaylist } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg p-2 transition-colors hover:bg-gray-700 ${
      isActive ? "bg-gray-700 text-white" : "text-gray-300"
    }`;

  return (
    <header className="sticky top-0 h-screen w-64 border-r bg-(--bg) text-white">
      <nav className="flex h-full flex-col gap-2 p-4">
        <div className="mb-4 flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-16 w-16" />
          <p className="text-xl font-bold">sonora</p>
        </div>

        <NavLink to="/" className={linkClass}>
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
      </nav>
    </header>
  );
};

export default Navbar;
