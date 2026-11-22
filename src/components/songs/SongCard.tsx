import type { Song } from "../../types";
import Cover from "./Cover";
import { FiPause, FiPlay } from "react-icons/fi";
import { usePlayer } from "../../context/usePlayer";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  const { currentSong, isPlaying, playSong, pause } = usePlayer();
  const isCurrent = currentSong?.id === song.id;

  return (
    <article
      className={`group h-full rounded-[var(--radius-card)] border ${
        isCurrent ? "border-[var(--primary-light)]" : "border-[var(--border)]"
      } bg-[var(--surface)] p-5 transition duration-200 hover:-translate-y-1 hover:bg-[var(--surface-2)] sm:p-6`}
    >
      <div className="relative">
        <Cover src={song.cover} alt={`Portada de ${song.album}`} />
        {isCurrent && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-2.5 py-1 text-xs font-semibold text-[var(--text)]">
            Sonando
          </span>
        )}
        {/* Si ya suena la pausa; si no, la pone a sonar */}
        <button
          type="button"
          onClick={() => (isCurrent && isPlaying ? pause() : playSong(song))}
          aria-label={(isCurrent && isPlaying ? "Pausar " : "Reproducir ") + song.title}
          className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-[image:var(--gradient-button)] text-[var(--text)] shadow-lg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
        >
          {isCurrent && isPlaying ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-[var(--text)]" title={song.title}>
            {song.title}
          </h3>
          <p className="mt-2 truncate text-sm text-[var(--text-muted)]" title={song.artist}>
            {song.artist}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--surface-3)] px-2.5 py-1 text-xs text-[var(--primary-text)]">
          {song.genre}
        </span>
      </div>
      <p className="mt-4 truncate text-sm text-[var(--text-muted)]" title={song.album}>
        {song.album}
      </p>
    </article>
  );
};
