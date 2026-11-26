import { UsersPanel } from "../components/auth/UsersPanel";
import { useState, type KeyboardEvent } from "react";
import Swal from "sweetalert2";
import {
  FiEdit2,
  FiList,
  FiMusic,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

import Cover from "../components/songs/Cover";
import { SongsForm } from "../components/songs/SongsForm";
import { Modal } from "../components/ui/Modal";
import { getSongs, getUsers } from "../data/initialize";
import { useToast } from "../context/useToast";
import { usePlayer } from "../context/usePlayer";
import { usePlaylist } from "../context/usePlaylist";
import { normalize } from "../utils/normalize";
import { STORAGE_KEYS, writeStorage } from "../utils/storage";
import type { Song, User, UserSummary } from "../types";

type Tab = "canciones" | "usuarios";

const editClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--surface-3)] px-4 text-sm font-semibold text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]";
const deleteClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--danger)] px-4 text-sm font-semibold text-[var(--danger)] transition hover:bg-[var(--danger)] hover:text-[var(--bg)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]";

const confirmDelete = async (options: {
  title: string;
  text: string;
  confirmText: string;
}) => {
  const css = getComputedStyle(document.documentElement);
  const result = await Swal.fire({
    icon: "warning",
    titleText: options.title,
    text: options.text,
    showCancelButton: true,
    confirmButtonText: options.confirmText,
    cancelButtonText: "Cancelar",
    focusCancel: true,
    background: css.getPropertyValue("--surface"),
    color: css.getPropertyValue("--text"),
    confirmButtonColor: css.getPropertyValue("--danger"),
    cancelButtonColor: css.getPropertyValue("--surface-3"),
  });

  return result.isConfirmed;
};

const Admin = () => {
  const [songs, setSongs] = useState<Song[]>(() => getSongs());
  const [tab, setTab] = useState<Tab>("canciones");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const { showToast } = useToast();
  const player = usePlayer();

  const { removeEverywhere, playlistCount, removePlaylist, totalSongs } = usePlaylist();
  const [users, setUsers] = useState<User[]>(() => getUsers());

  const userSummaries: UserSummary[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    fechaRegistro: user.fechaRegistro,
  }));

  const totals = [
    { label: "Canciones", value: songs.length, icon: <FiMusic aria-hidden="true" /> },
    { label: "Usuarios", value: users.length, icon: <FiUsers aria-hidden="true" /> },
    { label: "Canciones en playlists", value: totalSongs, icon: <FiList aria-hidden="true" /> },
  ];

  const genres = [...new Set(songs.map((song) => song.genre))].sort((a, b) => a.localeCompare(b, "es"));

  const filteredSongs = songs.filter((song) =>
    normalize(`${song.title} ${song.artist} ${song.album}`).includes(normalize(search))
  );

  const saveSongs = (nextSongs: Song[]) => {
    if (!writeStorage(STORAGE_KEYS.songs, nextSongs)) return;
    setSongs(nextSongs);
  };

  const addSong = (song: Song) => {
    saveSongs([song, ...songs]);
    setFormOpen(false);
    showToast("Canción agregada");
  };

  const saveEdit = (song: Song) => {
    saveSongs(songs.map((item) => (item.id === song.id ? song : item)));
    player.updateSong(song);
    setEditingSong(null);
    showToast("Cambios guardados");
  };

  const removeSong = async (song: Song) => {
    const confirmed = await confirmDelete({
      title: `¿Eliminar ${song.title}?`,
      text: "Se borra del catálogo y de las playlists de todos los usuarios. No se puede deshacer.",
      confirmText: "Eliminar canción",
    });

    if (!confirmed) return;

    saveSongs(songs.filter((item) => item.id !== song.id));
    removeEverywhere(song.id);
    player.removeSong(song.id);
    showToast(`Eliminaste ${song.title}`);
  };

  const removeUser = async (target: UserSummary) => {
    const stored = getUsers().find((item) => item.id === target.id);
    if (!stored || stored.role === "admin") return;

    const count = playlistCount(stored.id);
    const confirmed = await confirmDelete({
      title: `¿Eliminar la cuenta de ${stored.name}?`,
      text: `Se borra la cuenta y su playlist (${count} ${count === 1 ? "canción" : "canciones"}). Ya no va a poder iniciar sesión. No se puede deshacer.`,
      confirmText: "Eliminar cuenta",
    });

    if (!confirmed) return;

    const nextUsers = getUsers().filter((item) => item.id !== stored.id);
    if (!writeStorage(STORAGE_KEYS.users, nextUsers)) return;

    setUsers(nextUsers);
    removePlaylist(stored.id);
    showToast(`Eliminaste la cuenta de ${stored.name}`);
  };

  const handleTabKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const nextTab: Tab = tab === "canciones" ? "usuarios" : "canciones";
    setTab(nextTab);
    document.getElementById(`tab-${nextTab}`)?.focus();
  };

  const tabClass = (name: Tab) =>
    `flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-4 text-sm font-semibold transition ${
      tab === name
        ? "bg-[var(--surface-3)] text-[var(--text)]"
        : "text-[var(--text-muted)] hover:text-[var(--text)]"
    }`;

  return (
    <section className="px-4 pb-10 pt-6 sm:px-8 lg:pt-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Panel de administración</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Gestioná el catálogo y las cuentas de Sonora.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
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

      <div
        role="tablist"
        aria-label="Secciones del panel"
        onKeyDown={handleTabKeys}
        className="mt-6 inline-flex gap-1 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-1"
      >
        <button
          type="button"
          role="tab"
          id="tab-canciones"
          aria-selected={tab === "canciones"}
          aria-controls="panel-canciones"
          tabIndex={tab === "canciones" ? 0 : -1}
          onClick={() => setTab("canciones")}
          className={tabClass("canciones")}
        >
          <FiMusic aria-hidden="true" />
          Canciones
          <span className="rounded-full bg-[var(--primary)]/30 px-2 text-xs">{songs.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          id="tab-usuarios"
          aria-selected={tab === "usuarios"}
          aria-controls="panel-usuarios"
          tabIndex={tab === "usuarios" ? 0 : -1}
          onClick={() => setTab("usuarios")}
          className={tabClass("usuarios")}
        >
          <FiUsers aria-hidden="true" />
          Usuarios
          <span className="rounded-full bg-[var(--surface-3)] px-2 text-xs">{users.length}</span>
        </button>
      </div>

      {tab === "canciones" ? (
        <div id="panel-canciones" role="tabpanel" aria-labelledby="tab-canciones" className="mt-5">
          <div className="mb-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative w-full sm:max-w-sm">
              <span className="sr-only">Buscar en canciones</span>
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar en canciones"
                className="min-h-11 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus-visible:border-[var(--primary-light)]"
              />
            </label>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[image:var(--gradient-button)] px-5 text-sm font-semibold text-[var(--text)] hover:brightness-110"
            >
              <FiPlus aria-hidden="true" />
              Agregar canción
            </button>
          </div>

          {filteredSongs.length === 0 && (
            <p className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-sm text-[var(--text-muted)]">
              No hay canciones que coincidan con "{search}".
            </p>
          )}

          {filteredSongs.length > 0 && (
            <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] md:block">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  <tr className="border-b border-[var(--border)]">
                    <th className="p-3 font-semibold">Canción</th>
                    <th className="p-3 font-semibold">Álbum</th>
                    <th className="p-3 font-semibold">Año</th>
                    <th className="p-3 font-semibold">Género</th>
                    <th className="p-3 text-right font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSongs.map((song) => (
                    <tr key={song.id} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Cover
                            src={song.cover}
                            alt=""
                            className="size-10 shrink-0 rounded-[var(--radius-cover)] object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{song.title}</p>
                            <p className="truncate text-xs text-[var(--text-muted)]">{song.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{song.album}</td>
                      <td className="p-3 tabular-nums">{song.year}</td>
                      <td className="p-3">
                        <span className="rounded-full bg-[var(--surface-3)] px-2.5 py-1 text-xs">{song.genre}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setEditingSong(song)} aria-label={`Editar ${song.title}`} className={editClass}>
                            <FiEdit2 aria-hidden="true" />
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSong(song)}
                            aria-label={`Eliminar ${song.title}`}
                            className={deleteClass}
                          >
                            <FiTrash2 aria-hidden="true" />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col gap-3 md:hidden">
            {filteredSongs.map((song) => (
              <article
                key={song.id}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-start gap-3">
                  <Cover
                    src={song.cover}
                    alt=""
                    className="size-14 shrink-0 rounded-[var(--radius-cover)] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {song.artist} · {song.album} · {song.year}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--surface-3)] px-2.5 py-1 text-xs">{song.genre}</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setEditingSong(song)} aria-label={`Editar ${song.title}`} className={editClass}>
                    <FiEdit2 aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSong(song)}
                    aria-label={`Eliminar ${song.title}`}
                    className={deleteClass}
                  >
                    <FiTrash2 aria-hidden="true" />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
            ) : (
        <div id="panel-usuarios" role="tabpanel" aria-labelledby="tab-usuarios" className="mt-5">
          <UsersPanel users={userSummaries} onDelete={removeUser} />
        </div>
      )}

      <Modal open={formOpen} title="Agregar canción" onClose={() => setFormOpen(false)}>
        <SongsForm onSave={addSong} genres={genres} />
      </Modal>

      <Modal open={editingSong !== null} title="Editar canción" onClose={() => setEditingSong(null)}>
        {editingSong && (
          <SongsForm key={editingSong.id} song={editingSong} onSave={saveEdit} genres={genres} />
        )}
      </Modal>
    </section>
  );
};

export default Admin;
