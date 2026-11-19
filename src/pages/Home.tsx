
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="p-8">
        <h1 className="text-3xl font-bold">
          Inicio
        </h1>
      </section>

      <Link
        to="/ui-showcase"
        className="
          fixed bottom-4 right-4 z-50
          rounded-xl
          bg-[var(--primary)]
          px-4 py-3
          text-sm font-semibold
          text-[var(--text)]
          hover:brightness-110
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-[var(--focus-color)]
        "
      >
        Probar UI Kit
      </Link>
    </div>
  );
};

export default Home;

