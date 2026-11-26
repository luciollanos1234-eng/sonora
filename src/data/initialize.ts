import type {
  Song,
  User,
  UserSession,
  PlayerPrefs,
} from "../types";

import { seedSongs, seedUsers } from "./seed";
import { completeSongsWithITunes } from "../utils/itunes";

import {
  STORAGE_KEYS,
  readStorage,
  writeStorage,
  hasValidStorage,
} from "../utils/storage";

const isSongArray = (value: unknown): value is Song[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (song) =>
        typeof song.id === "string" &&
        typeof song.title === "string" &&
        typeof song.artist === "string" &&
        typeof song.cover === "string" &&
        typeof song.audioUrl === "string"
    )
  );
};

const isUserArray = (value: unknown): value is User[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (user) =>
        typeof user.id === "string" &&
        typeof user.name === "string" &&
        typeof user.email === "string" &&
        typeof user.password === "string" &&
        (user.role === "admin" || user.role === "user")
    )
  );
};

const isSession = (value: unknown): value is UserSession | null => {
  return (
    value === null ||
    (
      typeof value === "object" &&
      value !== null &&
      "userId" in value &&
      "email" in value &&
      "role" in value
    )
  );
};

const isPlaylists = (value: unknown): value is Record<string, string[]> => {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  return Object.values(value).every(
    (ids) =>
      Array.isArray(ids) &&
      ids.every((id) => typeof id === "string")
  );
};

const isPlayerPrefs = (value: unknown): value is PlayerPrefs => {
  return (
    typeof value === "object" &&
    value !== null &&
    "volume" in value &&
    "muted" in value &&
    "repeat" in value &&
    "shuffle" in value &&
    typeof value.volume === "number" &&
    typeof value.muted === "boolean" &&
    typeof value.repeat === "boolean" &&
    typeof value.shuffle === "boolean"
  );
};

const defaultPrefs: PlayerPrefs = {
  volume: 0.8,
  muted: false,
  repeat: false,
  shuffle: false,
};

export const initializeStorage = async (): Promise<void> => {

  const validSongs = hasValidStorage(
    STORAGE_KEYS.songs,
    isSongArray
  );

  if (!validSongs) {
    const songsWithAudio = await completeSongsWithITunes(seedSongs);
    writeStorage(STORAGE_KEYS.songs, songsWithAudio);
  }

  const validUsers = hasValidStorage(
    STORAGE_KEYS.users,
    isUserArray
  );

  if (!validUsers) {
    writeStorage(STORAGE_KEYS.users, seedUsers);
  }

  const validSession = hasValidStorage(
    STORAGE_KEYS.session,
    isSession
  );

  if (!validSession) {
    writeStorage<UserSession | null>(STORAGE_KEYS.session, null);
  }

  const validPlaylists = hasValidStorage(
    STORAGE_KEYS.playlists,
    isPlaylists
  );

  if (!validPlaylists) {
    writeStorage(STORAGE_KEYS.playlists, {});
  }

  const validPrefs = hasValidStorage(
    STORAGE_KEYS.prefs,
    isPlayerPrefs
  );

  if (!validPrefs) {
    writeStorage(STORAGE_KEYS.prefs, defaultPrefs);
  }
};

export const getSongs = (): Song[] => {
  return readStorage(STORAGE_KEYS.songs, seedSongs, isSongArray);
};

export const getUsers = (): User[] => {
  return readStorage(STORAGE_KEYS.users, seedUsers, isUserArray);
};
