import { useForm } from "react-hook-form";
import type { Song } from "../../types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import FormAlert from "../auth/FormAlert";

interface SongFormValues {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

interface SongsFormProps {
  onSave: (song: Song) => void;
  // Si viene una canción, el formulario sirve para editarla
  song?: Song;
  genres: string[];
}

// Acepta URLs completas o rutas locales como las portadas del seed
const URL_PATTERN = {
  value: /^(https?:\/\/|\/)\S+$/,
  message: "La URL tiene que empezar con http://, https:// o /.",
};

// 222000 ms -> "3:42"
const msToTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${Math.floor(totalSeconds / 60)}:${seconds}`;
};

export const SongsForm = ({ onSave, song, genres }: SongsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SongFormValues>({
    defaultValues: {
      title: song?.title ?? "",
      artist: song?.artist ?? "",
      album: song?.album ?? "",
      year: song ? String(song.year) : "",
      genre: song?.genre ?? "",
      duration: song?.duration ? msToTime(song.duration) : "",
      cover: song?.cover ?? "",
      audioUrl: song?.audioUrl ?? "",
    },
  });

  const currentYear = new Date().getFullYear();
  const errorCount = Object.keys(errors).length;

  const submit = (values: SongFormValues) => {
    // "3:42" -> 222000 ms; sin duración queda en 0
    let duration = 0;
    if (values.duration) {
      const [minutes, seconds] = values.duration.split(":");
      duration = (Number(minutes) * 60 + Number(seconds)) * 1000;
    }

    onSave({
      id: song ? song.id : crypto.randomUUID(),
      title: values.title.trim(),
      artist: values.artist.trim(),
      album: values.album.trim(),
      year: Number(values.year),
      genre: values.genre,
      cover: values.cover.trim(),
      audioUrl: values.audioUrl.trim(),
      duration,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="mt-4 grid gap-4 sm:grid-cols-2">
      {errorCount > 0 && (
        <div className="sm:col-span-2">
          <FormAlert>
            {errorCount === 1
              ? "Revisá el campo marcado para guardar la canción."
              : `Revisá los ${errorCount} campos marcados para guardar la canción.`}
          </FormAlert>
        </div>
      )}

      <Input
        label="Nombre"
        error={errors.title?.message}
        {...register("title", { required: "Ingresá el nombre." })}
      />
      <Input
        label="Artista"
        error={errors.artist?.message}
        {...register("artist", { required: "Ingresá el artista." })}
      />
      <Input
        label="Álbum"
        error={errors.album?.message}
        {...register("album", { required: "Ingresá el álbum." })}
      />
      <Input
        label="Año"
        inputMode="numeric"
        error={errors.year?.message}
        {...register("year", {
          required: "Ingresá el año.",
          validate: (value) => {
            const year = Number(value);
            return (
              (Number.isInteger(year) && year >= 1900 && year <= currentYear) ||
              `El año va de 1900 a ${currentYear}.`
            );
          },
        })}
      />

      {/* Género: lista con los géneros del catálogo */}
      <div className="flex flex-col gap-2">
        <label htmlFor="song-genre" className="text-sm font-semibold text-[var(--text)]">
          Género
        </label>
        <select
          id="song-genre"
          aria-invalid={!!errors.genre}
          aria-describedby={errors.genre ? "song-genre-error" : undefined}
          className={`min-h-11 rounded-[var(--radius-control)] border bg-[var(--surface-2)] px-4 text-sm text-[var(--text)] ${
            errors.genre ? "border-[var(--danger)]" : "border-[var(--border)]"
          }`}
          {...register("genre", { required: "Elegí un género." })}
        >
          <option value="">Elegí un género</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <p id="song-genre-error" role="alert" className="text-sm text-[var(--danger)]">
            {errors.genre.message}
          </p>
        )}
      </div>

      <Input
        label="Duración"
        placeholder="3:42"
        error={errors.duration?.message}
        {...register("duration", {
          pattern: { value: /^\d{1,2}:[0-5]\d$/, message: "Usá el formato mm:ss, por ejemplo 3:42." },
        })}
      />

      <div className="sm:col-span-2">
        <div>
          <Input
            label="URL de la portada"
            placeholder="https://..."
            error={errors.cover?.message}
            {...register("cover", { required: "Ingresá la URL de la portada.", pattern: URL_PATTERN })}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <Input
          label="URL del audio"
          placeholder="Opcional"
          error={errors.audioUrl?.message}
          {...register("audioUrl", { pattern: URL_PATTERN })}
        />
      </div>

      <Button type="submit" className="sm:col-span-2">
        {song ? "Guardar cambios" : "Guardar canción"}
      </Button>
    </form>
  );
};
