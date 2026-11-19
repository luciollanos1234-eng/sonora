
import { Link } from "react-router";

export const Home = () => {
  return (
    <main>
      {/* Contenido existente de Home */}

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
    </main>
  );
};
