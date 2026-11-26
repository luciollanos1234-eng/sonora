import { useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import ReactPlayer from "react-player";
import type { PlayerPrefs, Song } from "../types";
import { getSongs } from "../data/initialize";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import { PlayerContext } from "./player-context";

const readPrefs = () => readStorage<PlayerPrefs | null>(STORAGE_KEYS.prefs, null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<Song[]>(() => getSongs());
  const [currentSong, setCurrentSong] = useState<Song | null>(
    () => getSongs().find((s) => s.id === readPrefs()?.lastSongId) ?? null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => readPrefs()?.volume ?? 0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

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

  const playSong = (song: Song, list: Song[] = getSongs()) => {
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

  const seek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = seconds;
    }
    setProgress(seconds);
  };

  const updateSong = (song: Song) => {
    setQueue(queue.map((s) => (s.id === song.id ? song : s)));
    if (currentSong?.id === song.id) setCurrentSong(song);
  };

  const removeSong = (songId: string) => {
    setQueue(queue.filter((s) => s.id !== songId));
    if (currentSong?.id === songId) {
      setCurrentSong(null);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const simulated = !currentSong?.audioUrl || audioError;
  const simulatedDuration = currentSong?.duration ? Math.round(currentSong.duration / 1000) : 30;

  const playNext = useEffectEvent(() => next());

  useEffect(() => {
    if (!isPlaying || !simulated) return;

    const timer = setTimeout(() => {
      if (progress + 1 >= simulatedDuration) {
        playNext();
      } else {
        setProgress(progress + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
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
        duration: !currentSong ? 0 : simulated ? simulatedDuration : duration,
        seek,
        updateSong,
        removeSong,
      }}
    >
      {children}

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
