import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { FiPause, FiPlay, FiSkipBack, FiSkipForward, FiVolume2 } from "react-icons/fi";
import Cover from "../songs/Cover";
import { IconButton } from "../ui/IconButton";
import { usePlayer } from "../../context/usePlayer";
import { formatTime } from "../../utils/formatTime";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    play,
    pause,
    next,
    prev,
    progress,
    duration,
    seek,
    volume,
    setVolume,
  } = usePlayer();

  const percent = duration ? Math.min(progress / duration, 1) * 100 : 0;

  return (
    <section
      aria-label="Reproductor"
      className="hidden grid-cols-[1fr_2fr_1fr] items-center gap-6 border-t border-[var(--border)] bg-[var(--surface)] px-6 py-3 md:grid"
    >
      <div className="flex min-w-0 items-center gap-3">
        {currentSong ? (
          <>
            <Cover
              src={currentSong.cover}
              alt={`Portada de ${currentSong.album}`}
              className="size-12 shrink-0 rounded-[var(--radius-cover)] object-cover"
            />
            <div className="min-w-0">
              <Link
                to={`/detalle/${currentSong.id}`}
                className="-my-2.5 block truncate py-2.5 font-semibold text-[var(--text)] hover:underline"
                title={currentSong.title}
              >
                {currentSong.title}
              </Link>
              <p className="truncate text-sm text-[var(--text-muted)]" title={currentSong.artist}>
                {currentSong.artist}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Elegí una canción para empezar</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <IconButton aria-label="Canción anterior" variant="outline" onClick={prev} disabled={!currentSong}>
            <FiSkipBack aria-hidden="true" />
          </IconButton>
          <IconButton
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            variant="primary"
            onClick={isPlaying ? pause : play}
            disabled={!currentSong}
            className="bg-[image:var(--gradient-button)]"
          >
            {isPlaying ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
          </IconButton>
          <IconButton aria-label="Canción siguiente" variant="outline" onClick={next} disabled={!currentSong}>
            <FiSkipForward aria-hidden="true" />
          </IconButton>
        </div>

        <div className="flex w-full items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="w-10 text-right tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            aria-label="Progreso"
            min={0}
            max={duration || 0}
            step={1}
            value={Math.min(progress, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            disabled={!currentSong}
            style={{ "--fill": `${percent}%` } as CSSProperties}
            className="range w-full"
          />
          <span className="w-10 tabular-nums">{formatTime(duration)}</span>
        </div>

      </div>

      <div className="flex items-center justify-end gap-2 text-[var(--text-muted)]">
        <FiVolume2 aria-hidden="true" />
        <input
          type="range"
          aria-label="Volumen"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          disabled={!currentSong}
          style={{ "--fill": `${volume * 100}%` } as CSSProperties}
          className="range w-28"
        />
      </div>
    </section>
  );
};

export default Player;
