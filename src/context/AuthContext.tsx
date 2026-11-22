import { useState, type ReactNode } from "react";
import type { User, UserSession } from "../types";
import { getUsers } from "../data/initialize";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import { AuthContext } from "./auth-context";

// Arma la sesión sin la contraseña
const toSession = (user: User): UserSession => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const cleanEmail = (email: string) => email.trim().toLowerCase();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Al recargar, arranca con la sesión guardada
  const [user, setUser] = useState<UserSession | null>(() =>
    readStorage<UserSession | null>(STORAGE_KEYS.session, null)
  );

  const saveSession = (session: UserSession | null) => {
    writeStorage(STORAGE_KEYS.session, session);
    setUser(session);
  };

  const login = (email: string, password: string) => {
    const found = getUsers().find(
      (u) => cleanEmail(u.email) === cleanEmail(email) && u.password === password
    );

    if (!found) return null;

    const session = toSession(found);
    saveSession(session);
    return session;
  };

  const logout = () => saveSession(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
