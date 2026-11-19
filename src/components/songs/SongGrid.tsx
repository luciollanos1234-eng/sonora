import type { Song } from "../../types";
import { SongCard } from "./SongCard";

interface SongGridProps {
  songs: Song[];
}

export const SongGrid = ({ songs }: SongGridProps) => {
  if (songs.length === 0) {
    return (
      <p
        role="status"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-[var(--text-muted)]"
      >
        No encontramos canciones con esos filtros.
      </p>
    );
  }

  return (
    <section
      aria-label="Catálogo de canciones"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </section>
  );
};