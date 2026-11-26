
import { FaCheck } from "react-icons/fa";

interface GenreFiltersProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export const GenreFilters = ({
  genres,
  selectedGenre,
  onGenreChange,
}: GenreFiltersProps) => {
  const allGenres = ["Todos", ...genres];

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-color:var(--surface-3)_transparent] [scrollbar-width:thin] sm:mx-0 sm:px-0">
      <div
        role="group"
        aria-label="Filtrar canciones por género"
        className="flex w-max min-w-full gap-2"
      >
        {allGenres.map((genre) => {
          const isSelected = selectedGenre === genre;

          return (
            <button
              key={genre}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onGenreChange(genre)}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)] ${
                isSelected
                  ? "border-transparent bg-[var(--primary-text)] text-[var(--bg)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
              }`}
            >
              {isSelected && <FaCheck size={10} aria-hidden="true" />}
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};
