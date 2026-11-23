import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaPause, FaPlay, FaPlus } from "react-icons/fa";

import type { Song } from "../../types";
import { useAuth } from "../../context/useAuth";
import { usePlayer } from "../../context/usePlayer";
import { useToast } from "../../context/useToast";
import { getPlaylist, toggleSongInPlaylist } from "../../utils/playlists";
import Cover from "./Cover";
import { Modal } from "../ui/Modal";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  const { user } = useAuth();
  const { currentSong, isPlaying, playSong, pause } = usePlayer();
  const { showToast } = useToast();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>(() =>
    user ? getPlaylist(user.userId) : []
  );

  const isCurrent = currentSong?.id === song.id;
  const isPlayingThisSong = isCurrent && isPlaying;
  const isAdded = !!user && playlist.includes(song.id);

  const handlePlay = () => {
    if (isPlayingThisSong) {
      pause();
    } else {
      playSong(song);
    }
  };

  const handlePlaylist = () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    const updated = toggleSongInPlaylist(user.userId, song.id);
    setPlaylist(updated);
    showToast(
      isAdded ? "Quitada de Mi Playlist" : "Agregada a Mi Playlist"
    );
  };

  return (
    <>
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
            className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg transition hover:scale-105 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPlayingThisSong ? <FaPause /> : <FaPlay />}
          </button>

          {isPlayingThisSong && (
            <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/75 px-3 py-2 text-xs font-semibold text-white">
              <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
                <span className="h-2 w-0.5 animate-pulse bg-purple-300" />
                <span className="h-3 w-0.5 animate-pulse bg-purple-300 [animation-delay:150ms]" />
                <span className="h-1.5 w-0.5 animate-pulse bg-purple-300 [animation-delay:300ms]" />
              </span>
              Sonando
            </span>
          )}
        </div>

        <div className="mt-4 flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="truncate font-semibold text-[var(--text)]"
              title={song.title}
            >
              <Link
                to={`/detalle/${song.id}`}
                className="rounded-sm hover:text-[var(--primary-text)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
              >
                {song.title}
              </Link>
            </h3>

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
          aria-label={
            isAdded
              ? `Quitar ${song.title} de Mi Playlist`
              : `Agregar ${song.title} a Mi Playlist`
          }
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
            </>
          ) : (
            <>
              <FaPlus aria-hidden="true" />
              Agregar
            </>
          )}
        </button>
      </article>

      <Modal
        open={loginModalOpen}
        title="Iniciá sesión"
        onClose={() => setLoginModalOpen(false)}
      >
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
          Para agregar canciones a Mi Playlist necesitás iniciar sesión.
        </p>

        <Link
          to="/login"
          onClick={() => setLoginModalOpen(false)}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Ir a iniciar sesión
        </Link>
      </Modal>
    </>
  );
};
