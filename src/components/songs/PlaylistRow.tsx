import { Link } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import type { Song } from "../../types";
import { usePlayer } from "../../context/usePlayer";
import { usePlaylist } from "../../context/usePlaylist";
import { formatTime } from "../../utils/formatTime";
import { IconButton } from "../ui/IconButton";
import Cover from "./Cover";

export const rowColumns =
  "grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[2rem_minmax(0,1.4fr)_minmax(0,1fr)_3.5rem_9.5rem]";

const Equalizer = () => (
  <span className="flex h-4 items-end gap-0.5" aria-hidden="true">
    <span className="h-2 w-0.5 animate-pulse bg-[var(--primary-text)]" />
    <span className="h-4 w-0.5 animate-pulse bg-[var(--primary-text)] [animation-delay:150ms]" />
    <span className="h-3 w-0.5 animate-pulse bg-[var(--primary-text)] [animation-delay:300ms]" />
  </span>
);

interface PlaylistRowProps {
  song: Song;
  index: number;
  queue: Song[];
}

export const PlaylistRow = ({ song, index, queue }: PlaylistRowProps) => {
  const { currentSong, isPlaying, playSong, pause } = usePlayer();
  const { remove } = usePlaylist();

  const isPlayingThisSong = currentSong?.id === song.id && isPlaying;

  const handlePlay = () => {
    if (isPlayingThisSong) {
      pause();
    } else {
      playSong(song, queue);
    }
  };

  return (
    <li
      aria-current={isPlayingThisSong ? "true" : undefined}
      className={`grid ${rowColumns} items-center gap-3 rounded-[var(--radius-control)] px-3 py-2 md:gap-4 ${
        isPlayingThisSong
          ? "bg-[var(--primary)]/20"
          : "hover:bg-[var(--surface-2)]"
      }`}
    >
      <span className="hidden justify-center text-sm tabular-nums text-[var(--text-muted)] md:flex">
        {isPlayingThisSong ? <Equalizer /> : index + 1}
      </span>

      <div className="flex min-w-0 items-center gap-3">
        <Cover
          src={song.cover}
          alt={`Portada de ${song.album}`}
          className="size-12 shrink-0 rounded-[var(--radius-cover)] object-cover"
        />
        <div className="min-w-0">
          <Link
            to={`/detalle/${song.id}`}
            className={`block truncate font-semibold hover:text-[var(--primary-text)] ${
              isPlayingThisSong ? "text-[var(--primary-text)]" : ""
            }`}
          >
            {song.title}
          </Link>
          <p className="truncate text-xs text-[var(--text-muted)]">
            {song.artist}
          </p>
        </div>
      </div>

      <p className="hidden truncate text-sm text-[var(--text-muted)] md:block">
        {song.album}
      </p>

      <span className="hidden text-right text-sm tabular-nums text-[var(--text-muted)] md:block">
        {song.duration ? formatTime(song.duration / 1000) : "—"}
      </span>

      <div className="flex items-center justify-end gap-2">
        <IconButton
          aria-label={
            isPlayingThisSong
              ? `Pausar ${song.title}`
              : `Reproducir ${song.title}`
          }
          onClick={handlePlay}
        >
          {isPlayingThisSong ? (
            <FaPause aria-hidden="true" />
          ) : (
            <FaPlay aria-hidden="true" />
          )}
        </IconButton>

        <button
          type="button"
          onClick={() => remove(song.id, song.title)}
          aria-label={`Quitar ${song.title} de Mi Playlist`}
          className="inline-flex size-11 shrink-0 items-center justify-center gap-1 rounded-[var(--radius-pill)] border border-[var(--danger)] text-sm font-semibold text-[var(--danger)] transition hover:bg-[var(--danger)] hover:text-[var(--bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)] md:w-auto md:px-4"
        >
          <FiX aria-hidden="true" />
          <span className="hidden md:inline">Quitar</span>
        </button>
      </div>
    </li>
  );
};