import { useContext } from "react";
import { PlaylistContext } from "./playlist-context";

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error("usePlaylist debe utilizarse dentro de PlaylistProvider");
  }

  return context;
};