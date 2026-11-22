import { createContext } from "react";
import type { Song } from "../types";

export interface PlayerContextType {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  setVolume: (value: number) => void;
  playSong: (song: Song, list?: Song[]) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  progress: number;
  duration: number;
  seek: (seconds: number) => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);
