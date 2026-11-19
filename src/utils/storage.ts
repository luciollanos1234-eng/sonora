export const STORAGE_KEYS = {
  songs: "sonora_songs",
  users: "sonora_users",
  session: "sonora_session",
  playlists: "sonora_playlists",
  prefs: "sonora_prefs",
} as const;

export function readStorage<T>(
  key: string,
  fallback: T,
  validate?: (value: unknown) => value is T
): T {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return fallback;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (validate && !validate(parsedValue)) {
      return fallback;
    }

    return parsedValue as T;
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return fallback;
  }
}

export function hasValidStorage(
  key: string,
  validate: (value: unknown) => boolean
): boolean {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) return false;

    return validate(JSON.parse(storedValue));
  } catch {
    return false;
  }
}

export function writeStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
    return false;
  }
}
