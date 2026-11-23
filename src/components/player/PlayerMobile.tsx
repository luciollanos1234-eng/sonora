import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiPause,
  FiPlay,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
} from "react-icons/fi";
import Cover from "../songs/Cover";
import { IconButton } from "../ui/IconButton";
import { usePlayer } from "../../context/usePlayer";
import { formatTime } from "../../utils/formatTime";

// Reproductor para celular: barra compacta que abre la pantalla completa
const PlayerMobile = () => {
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
  const [isOpen, setIsOpen] = useState(false);

  // Porcentaje para la línea de progreso de la barra compacta
  const percent = duration ? Math.min(progress / duration, 1) * 100 : 0;

  return (
    <>
      {/* Barra compacta */}
      <section
        aria-label="Reproductor"
        className="relative flex items-center gap-3 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2 md:hidden"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-[var(--surface-3)]">
          <div
            className="h-full bg-[image:var(--gradient-progress)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {currentSong ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Abrir reproductor: ${currentSong.title}`}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
          >
            <Cover
              src={currentSong.cover}
              alt=""
              className="size-10 shrink-0 rounded-[var(--radius-cover)] object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate font-semibold text-[var(--text)]">
                {currentSong.title}
              </span>
              <span className="block truncate text-xs text-[var(--text-muted)]">
                {currentSong.artist}
              </span>
            </span>
          </button>
        ) : (
          <p className="flex-1 text-sm text-[var(--text-muted)]">
            Elegí una canción para empezar
          </p>
        )}

        <IconButton
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
          variant="primary"
          onClick={isPlaying ? pause : play}
          disabled={!currentSong}
          className="bg-[image:var(--gradient-button)]"
        >
          {isPlaying ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
        </IconButton>
      </section>

      {/* Pantalla completa */}
      {isOpen && currentSong && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reproductor"
          className="fixed inset-0 z-50 flex flex-col gap-6 overflow-y-auto bg-[var(--bg)] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--primary)_35%,transparent),transparent_60%)] px-6 py-5 md:hidden"
        >
          <div className="flex items-center">
            <IconButton
              aria-label="Cerrar reproductor"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              <FiChevronDown aria-hidden="true" className="text-xl" />
            </IconButton>
            <p className="flex-1 text-center text-xs font-semibold tracking-[0.2em] text-[var(--primary-text)]">
              REPRODUCIENDO
            </p>
            <span className="size-11" aria-hidden="true" />
          </div>

          <Cover
            src={currentSong.cover}
            alt={`Portada de ${currentSong.album}`}
            className="mx-auto aspect-square w-full max-w-sm rounded-[var(--radius-card)] object-cover shadow-2xl"
          />

          <div className="min-w-0">
            <Link
              to={`/detalle/${currentSong.id}`}
              onClick={() => setIsOpen(false)}
              className="block truncate text-2xl font-extrabold text-[var(--text)] hover:underline"
            >
              {currentSong.title}
            </Link>
            <p className="truncate text-[var(--text-muted)]">{currentSong.artist}</p>
          </div>

          <div>
            <input
              type="range"
              aria-label="Progreso"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(progress, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full accent-[var(--primary-light)]"
            />
            <div className="mt-1 flex justify-between text-xs tabular-nums text-[var(--text-muted)]">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            {currentSong.audioUrl && (
              <p className="mt-2 text-center text-[11px] text-[var(--text-muted)]">
                Vista previa de 30 s · cortesía de iTunes
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-6">
            <IconButton aria-label="Canción anterior" variant="outline" onClick={prev}>
              <FiSkipBack aria-hidden="true" />
            </IconButton>
            <IconButton
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              variant="primary"
              onClick={isPlaying ? pause : play}
              className="size-16 bg-[image:var(--gradient-button)] text-2xl"
            >
              {isPlaying ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
            </IconButton>
            <IconButton aria-label="Canción siguiente" variant="outline" onClick={next}>
              <FiSkipForward aria-hidden="true" />
            </IconButton>
          </div>

          <div className="flex items-center gap-3 text-[var(--text-muted)]">
            <FiVolume2 aria-hidden="true" />
            <input
              type="range"
              aria-label="Volumen"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[var(--primary-light)]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerMobile;
