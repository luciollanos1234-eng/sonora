import Logo from "../assets/Favicon.sonora.png";
import { FaCompactDisc } from "react-icons/fa";

const Home = () => {
  return (
    <div className="m-4 flex min-h-40 flex-col gap-6 rounded-lg bg-purple-500 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
          Tu musica. Tu espacio. Tu ritmo.
        </h1>
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
        <FaCompactDisc className="h-20 w-20 text-4xl text-black transition-transform duration-700 ease-in-out hover:rotate-180 sm:h-30 sm:w-30 sm:text-5xl lg:h-40 lg:w-40 lg:text-6xl" />
      </div>
    </div>
  );
};

export default Home;
