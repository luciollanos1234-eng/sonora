import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import {
  STORAGE_KEYS,
  readStorage,
  writeStorage,
} from "../utils/storage";

type Playlists = Record<string, string[]>;

interface PlaylistContextType {
  songIds: string[];
  isInPlaylist: (songId: string) => boolean;
  add: (songId: string, songTitle: string) => void;
  remove: (songId: string, songTitle: string) => void;
  toggle: (songId: string, songTitle: string) => void;
}

const isPlaylists = (value: unknown): value is Playlists => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (ids) =>
      Array.isArray(ids) &&
      ids.every((id) => typeof id === "string")
  );
};

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [playlists, setPlaylists] = useState<Playlists>(() =>
    readStorage<Playlists>(STORAGE_KEYS.playlists, {}, isPlaylists)
  );

  const songIds = useMemo(
    () => (user ? playlists[user.userId] ?? [] : []),
    [playlists, user]
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.playlists, playlists);
  }, [playlists]);

  const isInPlaylist = (songId: string) => songIds.includes(songId);

  const add = (songId: string, songTitle: string) => {
    if (!user || songIds.includes(songId)) return;

    setPlaylists((previous) => ({
      ...previous,
      [user.userId]: [...(previous[user.userId] ?? []), songId],
    }));

    showToast(`Agregaste ${songTitle} a Mi Playlist`);
  };

  const remove = (songId: string, songTitle: string) => {
    if (!user || !songIds.includes(songId)) return;

    setPlaylists((previous) => ({
      ...previous,
      [user.userId]: (previous[user.userId] ?? []).filter(
        (id) => id !== songId
      ),
    }));

    showToast(`Quitaste ${songTitle} de Mi Playlist`);
  };

  const toggle = (songId: string, songTitle: string) => {
    if (isInPlaylist(songId)) {
      remove(songId, songTitle);
    } else {
      add(songId, songTitle);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{ songIds, isInPlaylist, add, remove, toggle }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error(
      "usePlaylist debe utilizarse dentro de PlaylistProvider"
    );
  }

  return context;
};
