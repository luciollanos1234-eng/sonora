import type { Song } from "../types";

interface ITunesResult {
  trackName: string;
  artistName: string;
  previewUrl?: string;
  trackTimeMillis?: number;
}

interface ITunesResponse {
  results: ITunesResult[];
}

export const getITunesPreview = async (
  song: Song
): Promise<Pick<Song, "audioUrl" | "duration">> => {
  try {
    const searchTerm = encodeURIComponent(
      `${song.title} ${song.artist}`
    );

    const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=song&country=AR&limit=1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No se pudo consultar iTunes");
    }

    const data: ITunesResponse = await response.json();

    const result = data.results[0];

    if (!result?.previewUrl) {
      return {
        audioUrl: "",
        duration: 0,
      };
    }

    return {
      audioUrl: result.previewUrl,
      duration: result.trackTimeMillis ?? 0,
    };
  } catch (error) {
    console.error(
      `No se pudo obtener el audio de ${song.title}:`,
      error
    );

    return {
      audioUrl: "",
      duration: 0,
    };
  }
};

export const completeSongsWithITunes = async (
  songs: Song[]
): Promise<Song[]> => {
  return Promise.all(
    songs.map(async (song) => {
      const audioData = await getITunesPreview(song);

      return {
        ...song,
        ...audioData,
      };
    })
  );
};
