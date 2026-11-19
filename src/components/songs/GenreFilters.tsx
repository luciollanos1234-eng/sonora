interface GenreFiltersProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export const GenreFilters = ({
  genres,
  selectedGenre,
  onGenreChange,
}: GenreFiltersProps) => (
  <div
    role="group"
    aria-label="Filtrar canciones por género"
    className="flex flex-wrap gap-2"
  >
    {["Todos", ...genres].map((genre) => {
      const isSelected = selectedGenre === genre;

      return (
        <button
          key={genre}
          type="button"
          aria-pressed={isSelected}
          onClick={() => onGenreChange(genre)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            isSelected
              ? "border-transparent bg-[var(--primary)] text-[var(--text)]"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
          }`}
        >
          {genre}
        </button>
      );
    })}
  </div>
);