import { Link, NavLink } from "react-router-dom";
import { FaCompactDisc } from "react-icons/fa";
import Logo from "../assets/Favicon.sonora.png";

const Home = () => {
  return (
    <div>
      <section className="p-4 sm:p-8">
        <div className="mt-4 flex min-h-40 flex-col gap-6 rounded-lg bg-linear-to-r from-purple-900 via-purple-800 to-fuchsia-700 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Tu musica. Tu espacio. Tu ritmo.
            </h2>
            <p className="text-base sm:text-lg">
              Busca tu música favorita en nuestro catálogo
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 self-center sm:gap-4">
            <img
              src={Logo}
              alt="sonora"
              className="h-20 w-20 sm:h-30 sm:w-30 lg:h-40 lg:w-40"
            />
            <FaCompactDisc className="h-20 w-20 text-4xl text-black transition-transform duration-900 ease-in-out hover:rotate-180 sm:h-30 sm:w-30 sm:text-5xl lg:h-40 lg:w-40 lg:text-6xl" />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
          <img src={Logo} alt="sonora" className="h-32 w-32" />
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example </p>
          <NavLink to="/some-path">Go somewhere</NavLink>
        </div>
      </section>

      {/* ACCESO A UI KIT */}
      <Link
        to="/ui-showcase"
        className="fixed bottom-4 right-4 z-50 rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-(--text) hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-color)"
      >
        Probar UI Kit
      </Link>
    </div>
  );
};

export default Home;
