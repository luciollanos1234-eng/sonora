import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiDisc, FiCalendar, FiTag, FiClock, FiPause, FiPlay, FiSearch } from "react-icons/fi";
import { getSongs } from "../data/initialize";
import Cover from "../components/songs/Cover";
import { formatTime } from "../utils/formatTime";
import { Button } from "../components/ui/Button";
import { usePlayer } from "../context/usePlayer";
import { SongCard } from "../components/songs/SongCard";

const Detail = () => {
  const { id } = useParams();
  const songs = getSongs();
  // Busca la canción por el id de la URL en sonora_songs
  const song = songs.find((s) => s.id === id);

  // Primero las del mismo género o artista, sin repetir la actual
  const similar = song
    ? songs.filter((s) => s.id !== song.id && (s.genre === song.genre || s.artist === song.artist))
    : [];
  // Después el resto, para completar hasta 5
  const others = song ? songs.filter((s) => s.id !== song.id && !similar.includes(s)) : [];
  const recommended = [...similar, ...others].slice(0, 5);

  // El título de la pestaña es el nombre de la canción; al cambiar de detalle vuelve arriba
  const songTitle = song?.title;
  useEffect(() => {
    document.title = songTitle ? `${songTitle} · Sonora` : "Canción no encontrada · Sonora";
    window.scrollTo(0, 0);
  }, [id, songTitle]);
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
      ) : null}

      {song && (
        <section aria-labelledby="recomendadas" className="mt-12">
          <h2 id="recomendadas" className="mb-5 text-xl font-bold">
            También te puede gustar
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {recommended.map((item) => (
              <SongCard key={item.id} song={item} />
            ))}
          </div>
        </section>
      )}

      {!song && (
        /* Canción inexistente o borrada desde Admin */
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center text-center">
          <div aria-hidden="true" className="relative flex size-32 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
            <div className="absolute inset-3 rounded-full border border-[var(--border)]" />
            <div className="absolute inset-6 rounded-full border border-[var(--border)]" />
            <span className="size-8 rounded-full bg-[var(--primary)]" />
            <span className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full bg-[var(--surface-3)] text-lg font-bold text-[var(--primary-text)]">?</span>
          </div>
          <h1 className="mt-8 text-2xl font-extrabold sm:text-3xl">No encontramos esta canción</h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">Puede que la hayan quitado del catálogo o que el enlace esté mal escrito.</p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[image:var(--gradient-button)] px-6 text-sm font-semibold text-[var(--text)] hover:brightness-110"
            >
              Volver al catálogo
            </Link>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--surface-2)] px-6 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface-3)]"
            >
              <FiSearch aria-hidden="true" />
              Buscar otra canción
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Detail;
