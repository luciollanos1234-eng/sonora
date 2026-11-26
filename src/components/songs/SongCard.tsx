import { Link } from "react-router-dom";
import { FaCheck, FaPause, FaPlay, FaPlus } from "react-icons/fa";

import type { Song } from "../../types";
import { usePlayer } from "../../context/usePlayer";
import { usePlaylist } from "../../context/usePlaylist";
import Cover from "./Cover";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  const { currentSong, isPlaying, playSong, pause } = usePlayer();
  const { isInPlaylist, toggle } = usePlaylist();

  const isCurrent = currentSong?.id === song.id;
  const isPlayingThisSong = isCurrent && isPlaying;
  const isAdded = isInPlaylist(song.id);

  const handlePlay = () => {
    if (isPlayingThisSong) {
      pause();
    } else {
      playSong(song);
    }
  };

  const handlePlaylist = () => toggle(song.id, song.title);

  return (
    <article
      className={`group h-full rounded-[var(--radius-card)] border bg-[var(--surface)] p-4 transition duration-200 hover:-translate-y-1 hover:bg-[var(--surface-2)] sm:p-5 ${
        isPlayingThisSong
          ? "border-2 border-[var(--primary)]"
          : "border-[var(--border)]"
      }`}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Cover
          src={song.cover}
          alt={`Portada de ${song.album}`}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={handlePlay}
          aria-label={
            isPlayingThisSong
              ? `Pausar ${song.title}`
              : `Reproducir ${song.title}`
          }
          className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--text)] shadow-lg transition hover:scale-105 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
        >
          {isPlayingThisSong ? <FaPause /> : <FaPlay />}
        </button>

        {isPlayingThisSong && (
          <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-[var(--bg)]/80 px-3 py-2 text-xs font-semibold text-[var(--text)]">
            <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
              <span className="h-2 w-0.5 animate-pulse bg-[var(--primary-text)]" />
              <span className="h-3 w-0.5 animate-pulse bg-[var(--primary-text)] [animation-delay:150ms]" />
              <span className="h-1.5 w-0.5 animate-pulse bg-[var(--primary-text)] [animation-delay:300ms]" />
            </span>
            Sonando
          </span>
        )}
      </div>

      <div className="mt-4 flex min-w-0 flex-col items-start gap-2">
        <div className="w-full min-w-0">
          <h2
            className="font-semibold text-[var(--text)]"
            title={song.title}
          >
            <Link
              to={`/detalle/${song.id}`}
              className="-my-3 block truncate rounded-sm py-3 hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
            >
              {song.title}
            </Link>
          </h2>

          <p
            className="mt-1 truncate text-sm text-[var(--text-muted)]"
            title={song.artist}
          >
            {song.artist}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-[var(--surface-3)] px-2.5 py-1 text-xs text-[var(--primary-text)]">
          {song.genre}
        </span>
      </div>

      <button
        type="button"
        onClick={handlePlaylist}
        aria-pressed={isAdded}
        className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)] ${
          isAdded
            ? "border-[var(--primary)] bg-[var(--primary)]/15 text-[var(--primary-text)]"
            : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--text)]"
        }`}
      >
        {isAdded ? (
          <>
            <FaCheck aria-hidden="true" />
            En Mi Playlist
            <span className="sr-only">: {song.title}</span>
          </>
        ) : (
          <>
            <FaPlus aria-hidden="true" />
            Agregar
            <span className="sr-only"> {song.title} a Mi Playlist</span>
          </>
        )}
      </button>
    </article>
  );
};
