import { useState, type ReactNode } from "react";
import type { UserSession } from "../types";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Al recargar, arranca con la sesión guardada
  const [user, setUser] = useState<UserSession | null>(() =>
    readStorage<UserSession | null>(STORAGE_KEYS.session, null)
  );

  const saveSession = (session: UserSession | null) => {
    writeStorage(STORAGE_KEYS.session, session);
    setUser(session);
  };

  const logout = () => saveSession(null);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
