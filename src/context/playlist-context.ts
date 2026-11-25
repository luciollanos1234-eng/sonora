import { createContext } from "react";

export interface PlaylistContextType {
  songIds: string[];
  isInPlaylist: (songId: string) => boolean;
  add: (songId: string, songTitle: string) => void;
  remove: (songId: string, songTitle: string) => void;
  toggle: (songId: string, songTitle: string) => void;
  removeEverywhere: (songId: string) => void;
  playlistCount: (userId: string) => number;
  totalSongs: number;
  removePlaylist: (userId: string) => void;
}

export const PlaylistContext = createContext<PlaylistContextType | null>(null);