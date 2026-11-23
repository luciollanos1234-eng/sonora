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

  // El registro la usa para avisar antes de enviar
  const emailExists = (email: string) =>
    getUsers().some((u) => cleanEmail(u.email) === cleanEmail(email));

  // Devuelve null si el email ya está registrado
  const register = (name: string, email: string, password: string) => {
    if (emailExists(email)) return null;

    const users = getUsers();

    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: cleanEmail(email),
      password,
      role: "user",
      fechaRegistro: new Date().toISOString(),
    };

    writeStorage(STORAGE_KEYS.users, [...users, newUser]);

    const session = toSession(newUser);
    saveSession(session);
    return session;
  };

  const logout = () => saveSession(null);
https://github.com/luciollanos1234-eng/sonora/pull/13/conflict?name=src%252Fcontext%252FAuthContext.tsx&ancestor_oid=e69de29bb2d1d6434b8b29ae775ad8c2e48c5391&base_oid=5ba9d988d529abf506ec3733c06ca311f116c56b&head_oid=c80a16b82a98c9efbdcca979a4bdc57919032cfc
  return (
    <AuthContext.Provider value={{ user, login, register, logout, emailExists }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
};
