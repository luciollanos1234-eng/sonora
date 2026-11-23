import { useForm } from "react-hook-form";
import type { Song } from "../../types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface SongFormValues {
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  cover: string;
  audioUrl: string;
}

interface SongsFormProps {
  onSave: (song: Song) => void;
  fallbackCover: string;
}

export const SongsForm = ({ onSave, fallbackCover }: SongsFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SongFormValues>();

  const submit = (values: SongFormValues) => {
    const id = `${values.title}-${Date.now()}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    onSave({
      id,
      title: values.title.trim(),
      artist: values.artist.trim(),
      album: values.album.trim(),
      year: Number(values.year),
      genre: values.genre.trim(),
      cover: values.cover.trim() || fallbackCover,
      audioUrl: values.audioUrl.trim(),
      duration: 0,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:grid-cols-2"
    >
      <Input
        label="Título"
        error={errors.title?.message}
        {...register("title", { required: "Ingresá el título." })}
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
        type="number"
        error={errors.year?.message}
        {...register("year", {
          required: "Ingresá el año.",
          valueAsNumber: true,
          min: { value: 1900, message: "Ingresá un año válido." },
        })}
      />
      <Input
        label="Género"
        error={errors.genre?.message}
        {...register("genre", { required: "Ingresá el género." })}
      />
      <Input
        label="URL de portada"
        placeholder="Opcional"
        {...register("cover")}
      />
      <Input
        label="URL de audio"
        placeholder="Opcional"
        className="sm:col-span-2"
        {...register("audioUrl")}
      />
      <div className="sm:col-span-2">
        <Button type="submit" className="w-full sm:w-auto">
          Agregar canción
        </Button>
      </div>
    </form>
  );
};