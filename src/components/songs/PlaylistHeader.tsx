import { FaMusic, FaPlay } from "react-icons/fa";

import type { Song } from "../../types";
import { formatTotalDuration } from "../../utils/formatTime";
import Cover from "../songs/Cover";

interface PlaylistHeaderProps {
  songs: Song[];
  userName: string;
  onPlayAll: () => void;
}

export const PlaylistHeader = ({
  songs,
  userName,
  onPlayAll,
}: PlaylistHeaderProps) => {
  const isEmpty = songs.length === 0;
  const totalDuration = formatTotalDuration(
    songs.reduce((total, song) => total + song.duration, 0)
  );

  // Mosaico de 4: lo que falta se rellena con un recuadro vacío
  const mosaic = Array.from({ length: 4 }, (_, index) => songs[index]);

  const count = `${songs.length} ${songs.length === 1 ? "canción" : "canciones"}`;
  const details = [userName, count, totalDuration].filter(Boolean).join(" · ");

  return (
    <header className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-linear-to-r from-[var(--primary)]/30 to-[var(--surface)] p-5 sm:flex-row sm:items-end sm:gap-6 sm:p-6">
      {isEmpty ? (
        <div
          aria-hidden="true"
          className="flex size-32 shrink-0 items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-[var(--border)] bg-[var(--surface)] text-4xl text-[var(--primary-text)] sm:size-40"
        >
          <FaMusic />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="grid size-32 shrink-0 grid-cols-2 overflow-hidden rounded-[var(--radius-card)] shadow-2xl sm:size-40"
        >
          {mosaic.map((song, index) =>
            song ? (
              <Cover
                key={song.id}
                src={song.cover}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div key={`vacio-${index}`} className="bg-[var(--surface-3)]" />
            )
          )}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-text)]">
          Playlist
        </p>
        <h1 className="mt-1 font-[var(--font-display)] text-4xl font-extrabold sm:text-5xl">
          Mi Playlist
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{details}</p>

        {!isEmpty && (
          <button
            type="button"
            onClick={onPlayAll}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] bg-[image:var(--gradient-button)] px-6 text-sm font-semibold text-[var(--text)] shadow-lg shadow-[var(--primary)]/30 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
          >
            <FaPlay aria-hidden="true" />
            Reproducir todo
          </button>
        )}
      </div>
    </header>
  );
};