import { STORAGE_KEYS, readStorage, writeStorage } from "./storage";

// { [userId]: [songId] }
type Playlists = Record<string, string[]>;

const readPlaylists = (): Playlists => readStorage<Playlists>(STORAGE_KEYS.playlists, {});

// Devuelve los ids de las canciones de la playlist del usuario
export const getPlaylist = (userId: string): string[] => readPlaylists()[userId] ?? [];

// Si la canción está la saca; si no está la agrega. Devuelve la lista nueva
export const toggleSongInPlaylist = (userId: string, songId: string): string[] => {
  const playlists = readPlaylists();
  const current = playlists[userId] ?? [];

  const updated = current.includes(songId)
    ? current.filter((id) => id !== songId)
    : [...current, songId];

  writeStorage(STORAGE_KEYS.playlists, { ...playlists, [userId]: updated });
  return updated;
};
