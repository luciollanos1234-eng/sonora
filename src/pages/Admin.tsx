import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import fallbackCover from "../assets/portadas/respaldo.png";
import { SongsForm } from "../components/songs/SongsForm";
import { getSongs } from "../data/initialize";
import { useToast } from "../context/useToast";
import { STORAGE_KEYS, writeStorage } from "../utils/storage";
import type { Song } from "../types";

const Admin = () => {
  const [songs, setSongs] = useState<Song[]>(() => getSongs());
  const { showToast } = useToast();

  const saveSongs = (nextSongs: Song[]) => {
    if (!writeStorage(STORAGE_KEYS.songs, nextSongs)) return;
    setSongs(nextSongs);
  };

  const addSong = (song: Song) => {
    saveSongs([song, ...songs]);
    showToast("Canción agregada");
  };

  const removeSong = (song: Song) => {
    saveSongs(songs.filter((item) => item.id !== song.id));
    showToast("Canción eliminada");
  };

  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-text)]">
          Panel administrativo
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">Administración</h1>
      </header>

      <SongsForm onSave={addSong} fallbackCover={fallbackCover} />

      <h2 className="mb-4 mt-8 text-xl font-bold">Catálogo ({songs.length})</h2>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]">
        {songs.map((song) => (
          <article
            key={song.id}
            className="flex items-center gap-3 border-b border-[var(--border)] p-4 last:border-b-0"
          >
            <img
              src={song.cover}
              alt=""
              className="size-12 rounded-[var(--radius-cover)] object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">{song.title}</h3>
              <p className="truncate text-sm text-[var(--text-muted)]">
                {song.artist} · {song.album}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeSong(song)}
              aria-label={`Eliminar ${song.title}`}
              className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-[var(--danger)] text-[var(--danger)] transition hover:bg-[var(--danger)] hover:text-[var(--bg)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
            >
              <FiTrash2 aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Admin;