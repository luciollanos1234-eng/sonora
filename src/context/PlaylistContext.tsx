import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserPlaylist } from "../types";
import { useAuth } from "./AuthContext";
import {
  STORAGE_KEYS,
  readStorage,
  writeStorage,
} from "../utils/storage";

interface PlaylistContextType {
  songIds: string[];
  isInPlaylist: (songId: string) => boolean;
  toggleSong: (songId: string) => void;
  removeSong: (songId: string) => void;
}

const isPlaylistArray = (value: unknown): value is UserPlaylist[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (playlist) =>
        typeof playlist.userId === "string" &&
        Array.isArray(playlist.songIds) &&
        playlist.songIds.every((id: unknown) => typeof id === "string")
    )
  );
};

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();

  const [playlists, setPlaylists] = useState<UserPlaylist[]>(() =>
    readStorage<UserPlaylist[]>(
      STORAGE_KEYS.playlists,
      [],
      isPlaylistArray
    )
  );

  const userId = session?.userId ?? null;

  const songIds = useMemo(
    () =>
      playlists.find((playlist) => playlist.userId === userId)?.songIds ?? [],
    [playlists, userId]
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.playlists, playlists);
  }, [playlists]);

  const isInPlaylist = (songId: string) => songIds.includes(songId);

  const updatePlaylist = (updater: (ids: string[]) => string[]) => {
    if (!userId) return;

    setPlaylists((previous) => {
      const current = previous.find((playlist) => playlist.userId === userId);
      const currentIds = current?.songIds ?? [];
      const updatedIds = updater(currentIds);

      const withoutUser = previous.filter(
        (playlist) => playlist.userId !== userId
      );

      return [...withoutUser, { userId, songIds: updatedIds }];
    });
  };

  const toggleSong = (songId: string) => {
    updatePlaylist((ids) =>
      ids.includes(songId)
        ? ids.filter((id) => id !== songId)
        : [...ids, songId]
    );
  };

  const removeSong = (songId: string) => {
    updatePlaylist((ids) => ids.filter((id) => id !== songId));
  };

  return (
    <PlaylistContext.Provider
      value={{ songIds, isInPlaylist, toggleSong, removeSong }}
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
