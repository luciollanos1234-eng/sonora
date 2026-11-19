import type { Song } from "../../types";
import { Cover } from "./Cover";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => (
  <article className="group h-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-200 hover:-translate-y-1 hover:bg-[var(--surface-2)] sm:p-6">
    <Cover src={song.cover} alt={`Portada de ${song.album}`} />
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