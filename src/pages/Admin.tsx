import { useState } from "react";
import { FiList, FiMusic, FiTrash2, FiUsers } from "react-icons/fi";

import fallbackCover from "../assets/portadas/respaldo.png";
import { SongsForm } from "../components/songs/SongsForm";
import { getSongs, getUsers } from "../data/initialize";
import { useToast } from "../context/useToast";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import type { Song } from "../types";

const Admin = () => {
  const [songs, setSongs] = useState<Song[]>(() => getSongs());
  const { showToast } = useToast();

  // Los totales se calculan con lo guardado, no se guardan aparte
  const users = getUsers();
  const playlists = readStorage<Record<string, string[]>>(STORAGE_KEYS.playlists, {});
  let inPlaylists = 0;
  Object.values(playlists).forEach((list) => {
    inPlaylists += list.length;
  });

  const totals = [
    { label: "Canciones", value: songs.length, icon: <FiMusic aria-hidden="true" /> },
    { label: "Usuarios", value: users.length, icon: <FiUsers aria-hidden="true" /> },
    { label: "Canciones en playlists", value: inPlaylists, icon: <FiList aria-hidden="true" /> },
  ];

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
    <section className="px-4 pb-10 pt-6 sm:px-8 lg:pt-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Panel de administración</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Gestioná el catálogo y las cuentas de Sonora.
        </p>
      </header>

      {/* Totales */}
      <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">
        {totals.map((total) => (
          <article
            key={total.label}
            className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-3 sm:p-5"
          >
            <span className="mb-3 hidden size-9 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-3)] text-[var(--primary-text)] sm:flex">
              {total.icon}
            </span>
            <p className="text-2xl font-extrabold sm:text-3xl">{total.value}</p>
            <p className="text-xs text-[var(--text-muted)] sm:text-sm">{total.label}</p>
          </article>
        ))}
      </div>

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
