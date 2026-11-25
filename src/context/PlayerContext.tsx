import { useEffect, useRef, useState, type ReactNode } from "react";
import ReactPlayer from "react-player";
import type { PlayerPrefs, Song } from "../types";
import { getSongs } from "../data/initialize";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import { PlayerContext } from "./player-context";

const readPrefs = () => readStorage<PlayerPrefs | null>(STORAGE_KEYS.prefs, null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<Song[]>(() => getSongs());
  // Al recargar vuelve la última canción, en pausa
  const [currentSong, setCurrentSong] = useState<Song | null>(
    () => getSongs().find((s) => s.id === readPrefs()?.lastSongId) ?? null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => readPrefs()?.volume ?? 0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  // useRef guarda el elemento de audio del ReactPlayer para leer y mover el tiempo
  // (no está en el temario: solo se usa acá)
  const playerRef = useRef<HTMLVideoElement>(null);

  // Guarda volumen y última canción (nunca el audio)
  useEffect(() => {
    const prefs = readPrefs();
    writeStorage(STORAGE_KEYS.prefs, {
      muted: false,
      repeat: false,
      shuffle: false,
      ...prefs,
      volume,
      lastSongId: currentSong?.id,
    });
  }, [volume, currentSong]);

  // Pone a sonar una canción y la lista desde donde se eligió
  // La lista se lee de nuevo para incluir lo que se agregó o borró desde Admin
  const playSong = (song: Song, list: Song[] = getSongs()) => {
    // Usa la versión guardada de la canción, que es la que tiene el audio de iTunes
    const saved = getSongs().find((s) => s.id === song.id) ?? song;
    setQueue(list);
    setCurrentSong(saved);
    setIsPlaying(true);
    setProgress(0);
    setAudioError(false);
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
      setAudioError(false);
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
      setAudioError(false);
    }
  };

  // Mueve el audio al segundo elegido en la barra de progreso
  const seek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = seconds;
    }
    setProgress(seconds);
  };

  // Si la canción editada está en la lista o sonando, muestra los datos nuevos
  const updateSong = (song: Song) => {
    setQueue(queue.map((s) => (s.id === song.id ? song : s)));
    if (currentSong?.id === song.id) setCurrentSong(song);
  };

  // Si se borra la canción que suena, el reproductor se detiene y queda vacío
  const removeSong = (songId: string) => {
    setQueue(queue.filter((s) => s.id !== songId));
    if (currentSong?.id === songId) {
      setCurrentSong(null);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  // Sin archivo o con error de audio, el progreso se simula con la duración de la canción
  const simulated = !currentSong?.audioUrl || audioError;
  // duration de la canción viene en milisegundos; si no hay, usamos 30 s
  const simulatedDuration = currentSong?.duration ? Math.round(currentSong.duration / 1000) : 30;

  // Cada segundo suma 1 al progreso; al llegar al final pasa a la siguiente
  useEffect(() => {
    if (!isPlaying || !simulated) return;

    const timer = setTimeout(() => {
      if (progress + 1 >= simulatedDuration) {
        next();
      } else {
        setProgress(progress + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
    // next cambia en cada render; el efecto ya se vuelve a correr cuando cambia progress
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, simulated, progress, simulatedDuration]);

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
        isPreview: !simulated,
        // Sin canción elegida no hay duración que mostrar
        duration: !currentSong ? 0 : simulated ? simulatedDuration : duration,
        seek,
        updateSong,
        removeSong,
      }}
    >
      {children}

      {/* Un solo reproductor oculto: los controles son los de Sonora */}
      {currentSong?.audioUrl && !audioError && (
        <ReactPlayer
          ref={playerRef}
          src={currentSong.audioUrl}
          playing={isPlaying}
          volume={volume}
          onEnded={next}
          onTimeUpdate={() => setProgress(playerRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(playerRef.current?.duration ?? 0)}
          width={0}
          height={0}
          style={{ display: "none" }}
          onError={() => setAudioError(true)}
        />
      )}
    </PlayerContext.Provider>
  );
};
