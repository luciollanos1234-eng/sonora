import { useState, type ReactNode } from "react";
import ReactPlayer from "react-player";
import type { Song } from "../types";
import { getSongs } from "../data/initialize";
import { PlayerContext } from "./player-context";

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<Song[]>(() => getSongs());
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  // Pone a sonar una canción y la lista desde donde se eligió
  const playSong = (song: Song, list: Song[] = queue) => {
    setQueue(list);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const play = () => {
    if (currentSong) setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  // En la última canción se detiene
  const next = () => {
    const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex < queue.length - 1) {
      setCurrentSong(queue[currentIndex + 1]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const prev = () => {
    const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setCurrentSong(queue[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        isPlaying,
        volume,
        setVolume,
        playSong,
        play,
        pause,
        next,
        prev,
      }}
    >
      {children}

      {/* Un solo reproductor oculto: los controles son los de Sonora */}
      {currentSong?.audioUrl && (
        <ReactPlayer
          src={currentSong.audioUrl}
          playing={isPlaying}
          volume={volume}
          onEnded={next}
          width={0}
          height={0}
          style={{ display: "none" }}
        />
      )}
    </PlayerContext.Provider>
  );
};
