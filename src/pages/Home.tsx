
import { useState } from "react";
import {
  FaCompactDisc,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import { GenreFilters } from "../components/songs/GenreFilters";
import { SongGrid } from "../components/songs/SongGrid";
import Logo from "../assets/Favicon.sonora.png";
import { getSongs } from "../data/initialize";
import { normalize } from "../utils/normalize";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  // Lee las canciones guardadas, no solamente las del seed.
  const songs = getSongs();

  // Los géneros se generan a partir del catálogo actual.
  const genres = [
    ...new Set(songs.map((song) => song.genre).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b, "es"));

  const normalizedSearch = normalize(search);

  // La búsqueda y el género se aplican al mismo tiempo.
  const filteredSongs = songs.filter((song) => {
    const matchesGenre =
      selectedGenre === "Todos" || song.genre === selectedGenre;

    const searchableText = normalize(
      `${song.title} ${song.artist}`
    );

    const matchesSearch = searchableText.includes(normalizedSearch);

    return matchesGenre && matchesSearch;
  });

  const hasActiveFilters =
    search.trim() !== "" || selectedGenre !== "Todos";

  const clearFilters = () => {
    setSearch("");
    setSelectedGenre("Todos");
  };

  const resultDescription = () => {
    const count = filteredSongs.length;
    const resultWord = count === 1 ? "resultado" : "resultados";

    if (!hasActiveFilters) {
      return `${count} ${count === 1 ? "canción" : "canciones"}`;
    }

    const searchDescription = search.trim()
      ? ` para "${search.trim()}"`
      : "";

    const genreDescription =
      selectedGenre !== "Todos" ? ` en ${selectedGenre}` : "";

    return `${count} ${resultWord}${searchDescription}${genreDescription}`;
  };

  return (
    <div>
      {/* Banner principal */}
      <section className="px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-lg bg-[image:var(--gradient-button)] p-6 text-[var(--text)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="relative z-10">
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Tu música. Tu espacio. Tu ritmo.
            </h2>

            <p className="text-base sm:text-lg">
              Buscá tu música favorita en nuestro catálogo
            </p>
          </div>

          {/* En celular el disco queda de fondo, atrás del texto */}
          <div className="absolute -bottom-4 -right-4 flex items-center gap-2 opacity-40 sm:static sm:gap-4 sm:opacity-100">
            <img
              src={Logo}
              alt="sonora"
              className="hidden sm:block sm:h-24 sm:w-24 lg:h-28 lg:w-28"
            />

            <FaCompactDisc aria-hidden="true" className="h-28 w-28 text-[var(--bg)] transition-transform duration-900 ease-in-out hover:rotate-180 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section
        aria-labelledby="catalog-title"
        className="mt-8 space-y-5 px-4 pb-10 sm:px-8"
      >
        {/* Título y buscador */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1
            id="catalog-title"
            className="text-2xl font-bold text-[var(--text)] sm:text-3xl"
          >
            Catálogo
          </h1>

          <div className="relative w-full md:max-w-sm lg:max-w-md">
            <label htmlFor="song-search" className="sr-only">
              Buscar por canción o artista
            </label>

            <FaSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              id="song-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por canción o artista..."
              className="min-h-11 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-2 pl-11 pr-11 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus-visible:border-[var(--primary-light)] focus-visible:ring-2 focus-visible:ring-[var(--primary)] [&::-webkit-search-cancel-button]:hidden"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Borrar búsqueda"
                className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--surface-3)] hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
              >
                <FaTimes aria-hidden="true" />
              </button>
            )}
          </div>
        </header>

        {/* Cantidad de resultados */}
        <div
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]"
        >
          <p>{resultDescription()}</p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-semibold text-[var(--primary-text)] underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Filtros por género */}
        <GenreFilters
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />

        {/* Resultados o estado vacío */}
        {filteredSongs.length > 0 ? (
          <SongGrid songs={filteredSongs} />
        ) : (
          <section
            aria-labelledby="empty-title"
            className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-5 py-10 text-center"
          >
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--primary-text)]">
              <FaSearch size={21} aria-hidden="true" />
            </div>

            <h2
              id="empty-title"
              className="text-lg font-bold text-[var(--text)] sm:text-xl"
            >
              No encontramos canciones
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              {search.trim() || selectedGenre !== "Todos"
                ? `No hay resultados para "${search.trim()}"${
                    selectedGenre !== "Todos"
                      ? ` en ${selectedGenre}`
                      : ""
                  }. Probá con otro nombre o artista, o buscá en todos los géneros.`
                : "Todavía no hay canciones disponibles en el catálogo."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedGenre("Todos")}
                className="min-h-11 rounded-full bg-[var(--surface-3)] px-5 py-2 text-sm font-semibold text-[var(--text)] transition hover:brightness-125 focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
              >
                Buscar en todos los géneros
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="min-h-11 rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-[var(--text)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--focus-color)]"
              >
                Limpiar filtros
              </button>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Home;
