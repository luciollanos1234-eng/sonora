export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  cover: string;
  audioUrl: string;
  duration: number;
}

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface PlayerPrefs {
  volume: number;
  muted: boolean;
  repeat: boolean;
  shuffle: boolean;
  lastSongId?: string;
}
