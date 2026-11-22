import { useState, useRef, type ReactNode } from "react";
import ReactPlayer from "react-player";
import type { Song } from "../types";
import { getSongs } from "../data/initialize";
import { PlayerContext } from "./player-context";

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<Song[]>(() => getSongs());
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  // useRef guarda el elemento de audio del ReactPlayer para leer y mover el tiempo
  // (no está en el temario: solo se usa acá)
  const playerRef = useRef<HTMLVideoElement>(null);

  // Pone a sonar una canción y la lista desde donde se eligió
  const playSong = (song: Song, list: Song[] = queue) => {
    setQueue(list);
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
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
      setProgress(0);
    } else {
      setIsPlaying(false);
    }
  };

  const prev = () => {
    const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setCurrentSong(queue[currentIndex - 1]);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  // Mueve el audio al segundo elegido en la barra de progreso
  const seek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = seconds;
    }
    setProgress(seconds);
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
        progress,
        duration,
        seek,
      }}
    >
      {children}

      {/* Un solo reproductor oculto: los controles son los de Sonora */}
      {currentSong?.audioUrl && (
        <ReactPlayer
          ref={playerRef}
          src={currentSong.audioUrl}
          playing={isPlaying}
          volume={volume}
          onEnded={next}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          width={0}
          height={0}
          style={{ display: "none" }}
        />
      )}
    </PlayerContext.Provider>
  );
};
