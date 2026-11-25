import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LoginRequiredModal } from "../components/songs/LoginRequiredModal";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import { PlaylistContext } from "./playlist-context";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";

type Playlists = Record<string, string[]>;

const isPlaylists = (value: unknown): value is Playlists => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (ids) => Array.isArray(ids) && ids.every((id) => typeof id === "string"),
  );
};

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const userId = user?.userId ?? null;

  const [playlists, setPlaylists] = useState<Playlists>(() =>
    readStorage<Playlists>(STORAGE_KEYS.playlists, {}, isPlaylists),
  );
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  // Cada usuario ve solo su lista; sin sesión no hay lista
  const songIds = useMemo(
    () => (userId ? (playlists[userId] ?? []) : []),
    [playlists, userId],
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.playlists, playlists);
  }, [playlists]);

  const isInPlaylist = useCallback(
    (songId: string) => songIds.includes(songId),
    [songIds],
  );

  const add = useCallback(
    (songId: string, songTitle: string) => {
      // Visitante: en vez de agregar, abre el modal
      if (!userId) {
        setLoginPromptOpen(true);
        return;
      }

      // Sin duplicados
      if (songIds.includes(songId)) return;

      setPlaylists((previous) => {
        const current = previous[userId] ?? [];
        if (current.includes(songId)) return previous;
        return { ...previous, [userId]: [...current, songId] };
      });

      showToast(`Agregaste ${songTitle} a Mi Playlist`);
    },
    [userId, songIds, showToast],
  );

  const remove = useCallback(
    (songId: string, songTitle: string) => {
      if (!userId || !songIds.includes(songId)) return;

      setPlaylists((previous) => ({
        ...previous,
        [userId]: (previous[userId] ?? []).filter((id) => id !== songId),
      }));

      showToast(`Quitaste ${songTitle} de Mi Playlist`);
    },
    [userId, songIds, showToast],
  );

  const toggle = useCallback(
    (songId: string, songTitle: string) => {
      if (songIds.includes(songId)) {
        remove(songId, songTitle);
      } else {
        add(songId, songTitle);
      }
    },
    [songIds, add, remove],
  );

  // Saca una canción borrada desde Admin de las playlists de todos los usuarios
  const removeEverywhere = useCallback((songId: string) => {
    setPlaylists((previous) => {
      const next: Playlists = {};
      Object.keys(previous).forEach((id) => {
        next[id] = previous[id].filter((item) => item !== songId);
      });
      return next;
    });
  }, []);

  const playlistCount = useCallback(
    (id: string) => playlists[id]?.length ?? 0,
    [playlists],
  );

  const totalSongs = useMemo(
    () =>
      Object.values(playlists).reduce((total, list) => total + list.length, 0),
    [playlists],
  );

  const removePlaylist = useCallback((id: string) => {
    setPlaylists((previous) => {
      if (!(id in previous)) return previous;
      const next = { ...previous };
      delete next[id];
      return next;
    });
  }, []);

  const closeLoginPrompt = useCallback(() => setLoginPromptOpen(false), []);

  const value = useMemo(
    () => ({
      songIds,
      isInPlaylist,
      add,
      remove,
      toggle,
      removeEverywhere,
      playlistCount,
      totalSongs,
      removePlaylist,
    }),
    [
      songIds,
      isInPlaylist,
      add,
      remove,
      toggle,
      removeEverywhere,
      playlistCount,
      totalSongs,
      removePlaylist,
    ],
  );

  return (
    <PlaylistContext.Provider value={value}>
      {children}
      <LoginRequiredModal
        open={loginPromptOpen && !userId}
        onClose={closeLoginPrompt}
      />
    </PlaylistContext.Provider>
  );
};
