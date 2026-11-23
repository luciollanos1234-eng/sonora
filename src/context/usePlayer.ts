import { useContext } from "react";
import { PlayerContext } from "./player-context";

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer debe utilizarse dentro de PlayerProvider");
  }

  return context;
};
