import { useState } from "react";
import { FiLock, FiSearch, FiShield, FiTrash2 } from "react-icons/fi";

import { usePlaylist } from "../../context/usePlaylist";
import type { UserSummary } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { getInitials } from "../../utils/getInitials";
import { normalize } from "../../utils/normalize";

const deleteClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--danger)] px-4 text-sm font-semibold text-[var(--danger)] transition hover:bg-[var(--danger)] hover:text-[var(--bg)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]";

const Avatar = ({ name }: { name: string }) => (
  <span
    aria-hidden="true"
    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/30 text-sm font-bold text-[var(--primary-text)]"
  >
    {getInitials(name)}
  </span>
);

const RoleBadge = ({ role }: { role: UserSummary["role"] }) =>
  role === "admin" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/30 px-2.5 py-1 text-xs font-semibold text-[var(--primary-text)]">
      <FiShield aria-hidden="true" />
      Admin
    </span>
  ) : (
    <span className="inline-flex rounded-full bg-[var(--surface-3)] px-2.5 py-1 text-xs font-semibold">
      Usuario
    </span>
  );

interface ActionsProps {
  user: UserSummary;
  onDelete: (user: UserSummary) => void;
  block?: boolean;
}

const Actions = ({ user, onDelete, block = false }: ActionsProps) =>
  user.role === "admin" ? (
    <span
      className={`inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-muted)] ${
        block ? "w-full justify-center" : ""
      }`}
    >
      <FiLock aria-hidden="true" />
      Cuenta protegida
    </span>
  ) : (
    <button
      type="button"
      onClick={() => onDelete(user)}
      aria-label={`Eliminar la cuenta de ${user.name}`}
      className={`${deleteClass} ${block ? "w-full" : ""}`}
    >
      <FiTrash2 aria-hidden="true" />
      Eliminar
    </button>
  );

interface UsersPanelProps {
  users: UserSummary[];
  onDelete: (user: UserSummary) => void;
}

export const UsersPanel = ({ users, onDelete }: UsersPanelProps) => {
  const [search, setSearch] = useState("");
  const { playlistCount } = usePlaylist();

  const filteredUsers = users.filter((user) =>
    normalize(`${user.name} ${user.email}`).includes(normalize(search))
  );

  return (
    <>
      <label className="relative mb-4 block w-full sm:max-w-md">
        <span className="sr-only">Buscar por nombre o email</span>
        <FiSearch
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o email"
          className="min-h-11 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus-visible:border-[var(--primary-light)]"
        />
      </label>

      {filteredUsers.length === 0 && (
        <p className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-sm text-[var(--text-muted)]">
          No hay usuarios que coincidan con "{search}".
        </p>
      )}

      {filteredUsers.length > 0 && (
        <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Usuarios registrados</caption>
            <thead className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className="p-4 font-semibold">Usuario</th>
                <th scope="col" className="p-4 font-semibold">Email</th>
                <th scope="col" className="p-4 font-semibold">Rol</th>
                <th scope="col" className="p-4 font-semibold">En playlist</th>
                <th scope="col" className="p-4 font-semibold">Registrado</th>
                <th scope="col" className="p-4 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} />
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">{user.email}</td>
                  <td className="p-4"><RoleBadge role={user.role} /></td>
                  <td className="p-4 tabular-nums">{playlistCount(user.id)}</td>
                  <td className="p-4 tabular-nums text-[var(--text-muted)]">
                    {formatDate(user.fechaRegistro)}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <Actions user={user} onDelete={onDelete} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col gap-3 md:hidden">
        {filteredUsers.map((user) => (
          <article
            key={user.id}
            className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex items-start gap-3">
              <Avatar name={user.name} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="truncate text-sm text-[var(--text-muted)]">{user.email}</p>
              </div>
              <RoleBadge role={user.role} />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-xs text-[var(--text-muted)]">En playlist</dt>
                <dd className="font-semibold tabular-nums">{playlistCount(user.id)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--text-muted)]">Registrado</dt>
                <dd className="font-semibold tabular-nums">{formatDate(user.fechaRegistro)}</dd>
              </div>
            </dl>

            <div className="mt-3">
              <Actions user={user} onDelete={onDelete} block />
            </div>
          </article>
        ))}
      </div>
    </>
  );
};