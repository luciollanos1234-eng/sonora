import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Song } from "../types";

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    setIsPlaying((previous) => !previous);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider
      value={{ currentSong, isPlaying, playSong, togglePlay, pause }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer debe utilizarse dentro de PlayerProvider");
  }

  return context;
};
