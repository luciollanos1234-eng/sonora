import { Link, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { getSongs } from "../data/initialize";

const Detail = () => {
  const { id } = useParams();
  // Busca la canción por el id de la URL en sonora_songs
  const song = getSongs().find((s) => s.id === id);

  return (
    <section className="px-4 py-6 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold hover:bg-[var(--surface-2)]"
      >
        <FiChevronLeft aria-hidden="true" />
        Volver al catálogo
      </Link>

      {song ? (
        <>
          <h1 className="mt-8 text-4xl font-extrabold">{song.title}</h1>
          <p className="text-[var(--text-muted)]">{song.artist}</p>
        </>
      ) : (
        <p className="mt-8 text-[var(--text-muted)]">No encontramos esta canción.</p>
      )}
    </section>
  );
};

export default Detail;
