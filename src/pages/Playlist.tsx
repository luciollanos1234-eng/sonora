import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";
import { getSongs } from "../data/initialize";
import { getPlaylist, toggleSongInPlaylist } from "../utils/playlists";
import { SongCard } from "../components/songs/SongCard";

const Playlist = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [songIds, setSongIds] = useState<string[]>(() =>
    user ? getPlaylist(user.userId) : []
  );

  const songs = getSongs().filter((song) => songIds.includes(song.id));

  const removeSong = (songId: string) => {
    if (!user) return;
    setSongIds(toggleSongInPlaylist(user.userId, songId));
    showToast("Quitada de Mi Playlist");
  };

  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-text)]">
            Tu biblioteca
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">Mi Playlist</h1>
        </div>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text-muted)]">
          {songs.length} {songs.length === 1 ? "canción" : "canciones"}
        </span>
      </header>

      {songs.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {songs.map((song) => (
            <div key={song.id} className="relative">
              <SongCard song={song} />
              <button
                type="button"
                onClick={() => removeSong(song.id)}
                aria-label={`Quitar ${song.title} de Mi Playlist`}
                className="absolute right-7 top-7 z-10 flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--danger)] shadow-lg transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
              >
                <FiTrash2 aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--primary-text)]">
            <FaMusic aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Tu playlist está vacía</h2>
          <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
            Agregá canciones desde el catálogo para encontrarlas acá.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[image:var(--gradient-button)] px-5 text-sm font-semibold text-white"
          >
            Explorar canciones
          </Link>
        </div>
      )}
    </section>
  );
};

export default Playlist;
