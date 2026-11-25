import { useMemo } from "react";
import { FiClock } from "react-icons/fi";

import { PlaylistEmpty } from "../components/songs/PlaylistEmpty";
import { PlaylistHeader } from "../components/songs/PlaylistHeader";
import {
  PlaylistRow,
  rowColumns,
} from "../components/songs/PlaylistRow";
import { useAuth } from "../context/useAuth";
import { usePlayer } from "../context/usePlayer";
import { usePlaylist } from "../context/usePlaylist";
import { getSongs } from "../data/initialize";

const Playlist = () => {
  const { user } = useAuth();
  const { songIds } = usePlaylist();
  const { playSong } = usePlayer();

  const songs = useMemo(() => {
    const catalog = new Map(getSongs().map((song) => [song.id, song]));
    return songIds.flatMap((id) => {
      const song = catalog.get(id);
      return song ? [song] : [];
    });
  }, [songIds]);

  const handlePlayAll = () => {
    if (songs.length > 0) playSong(songs[0], songs);
  };

  return (
    <section className="px-4 pb-10 pt-6 sm:px-8 lg:pt-8">
      <PlaylistHeader
        songs={songs}
        userName={user?.name ?? ""}
        onPlayAll={handlePlayAll}
      />

      {songs.length > 0 ? (
        <div className="mt-6">
          <div
            aria-hidden="true"
            className={`hidden ${rowColumns} gap-4 border-b border-[var(--border)] px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] md:grid`}
          >
            <span className="text-center">#</span>
            <span>Canción</span>
            <span>Álbum</span>
            <span className="flex justify-end">
              <FiClock />
            </span>
            <span />
          </div>

          <ol className="mt-2 flex flex-col gap-1">
            {songs.map((song, index) => (
              <PlaylistRow
                key={song.id}
                song={song}
                index={index}
                queue={songs}
              />
            ))}
          </ol>
        </div>
      ) : (
        <PlaylistEmpty />
      )}
    </section>
  );
};

export default Playlist;