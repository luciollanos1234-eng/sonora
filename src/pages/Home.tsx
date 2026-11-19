import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCompactDisc } from "react-icons/fa";
import { GenreFilters } from "../components/songs/GenreFilters";
import { SongGrid } from "../components/songs/SongGrid";
import Logo from "../assets/Favicon.sonora.png";
import { seedSongs } from "../data/seed";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const genres = [
    ...new Set(seedSongs.map((song) => song.genre)),
  ].sort((a, b) => a.localeCompare(b, "es"));
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredSongs = seedSongs.filter((song) => {
    const matchesGenre =
      selectedGenre === "Todos" || song.genre === selectedGenre;
    const searchableText =
      `${song.title} ${song.artist} ${song.album}`.toLocaleLowerCase();

    return matchesGenre && searchableText.includes(normalizedSearch);
  });

  return (
    <div>
      <section className="px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="flex min-h-40 flex-col gap-6 rounded-lg bg-linear-to-r from-purple-900 via-purple-800 to-fuchsia-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Tu musica. Tu espacio. Tu ritmo.
            </h2>
            <p className="text-base sm:text-lg">
              Busca tu música favorita en nuestro catálogo
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 self-center sm:gap-4">
            <img
              src={Logo}
              alt="sonora"
              className="h-20 w-20 sm:h-30 sm:w-30 lg:h-40 lg:w-40"
            />
            <FaCompactDisc className="h-20 w-20 text-4xl text-black transition-transform duration-900 ease-in-out hover:rotate-180 sm:h-30 sm:w-30 sm:text-5xl lg:h-40 lg:w-40 lg:text-6xl" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="catalog-title"
        className="mt-8 space-y-6 px-4 pb-10 sm:px-8"
      >
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1
              id="catalog-title"
              className="text-2xl font-bold text-[var(--text)] sm:text-3xl"
            >
              Catálogo de canciones
            </h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {filteredSongs.length}{" "}
              {filteredSongs.length === 1 ? "canción" : "canciones"}
            </p>
          </div>
          <label className="flex w-full flex-col gap-3 text-sm text-[var(--text-muted)] lg:max-w-md">
            Buscar por canción, artista o álbum
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej. Soda Stereo"
              className="min-h-11 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] outline-none transition focus-visible:border-[var(--primary-light)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            />
          </label>
        </header>

        <GenreFilters
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
        <SongGrid songs={filteredSongs} />
      </section>

      <Link
        to="/ui-showcase"
        className="fixed bottom-4 right-4 z-50 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--text)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
      >
        Probar UI Kit
      </Link>
    </div>
  );
};

export default Home;
