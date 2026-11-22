import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiDisc, FiCalendar, FiTag, FiClock, FiPause, FiPlay } from "react-icons/fi";
import { getSongs } from "../data/initialize";
import Cover from "../components/songs/Cover";
import { formatTime } from "../utils/formatTime";
import { Button } from "../components/ui/Button";
import { usePlayer } from "../context/usePlayer";

const Detail = () => {
  const { id } = useParams();
  // Busca la canción por el id de la URL en sonora_songs
  const song = getSongs().find((s) => s.id === id);
  const { currentSong, isPlaying, playSong, pause } = usePlayer();
  const isThisPlaying = !!song && currentSong?.id === song.id && isPlaying;

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
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end">
          <div className="relative w-full max-w-xs shrink-0">
            <div aria-hidden="true" className="absolute inset-4 rounded-[var(--radius-card)] bg-[var(--primary)] opacity-40 blur-3xl" />
            <Cover src={song.cover} alt={`Portada de ${song.album}`} className="relative aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-2xl" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-text)]">Canción</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{song.title}</h1>
            <p className="mt-1 text-lg text-[var(--text-muted)]">{song.artist}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-8">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-2)] text-[var(--primary-text)]">
                  <FiDisc />
                </span>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Álbum</dt>
                  <dd className="font-semibold">{song.album}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-2)] text-[var(--primary-text)]">
                  <FiCalendar />
                </span>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Año</dt>
                  <dd className="font-semibold">{song.year}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-2)] text-[var(--primary-text)]">
                  <FiTag />
                </span>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Género</dt>
                  <dd className="font-semibold">{song.genre}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-2)] text-[var(--primary-text)]">
                  <FiClock />
                </span>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Duración</dt>
                  {/* duration viene en milisegundos */}
                  <dd className="font-semibold">{song.duration ? formatTime(song.duration / 1000) : "Sin dato"}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => (isThisPlaying ? pause() : playSong(song))}
                className="rounded-[var(--radius-pill)] px-6"
              >
                {isThisPlaying ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
                {isThisPlaying ? "Pausar" : "Reproducir"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-8 text-[var(--text-muted)]">No encontramos esta canción.</p>
      )}
    </section>
  );
};

export default Detail;
