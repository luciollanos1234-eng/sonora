import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { UserSession } from "../types";
import { STORAGE_KEYS, readStorage, writeStorage } from "../utils/storage";

interface AuthContextType {
  session: UserSession | null;
  isAuthenticated: boolean;
  setSession: (session: UserSession | null) => void;
  logout: () => void;
}

const isUserSession = (value: unknown): value is UserSession => {
  if (typeof value !== "object" || value === null) return false;

  const session = value as Record<string, unknown>;

  return (
    typeof session.userId === "string" &&
    typeof session.name === "string" &&
    typeof session.email === "string" &&
    (session.role === "admin" || session.role === "user")
  );
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSessionState] = useState<UserSession | null>(() =>
    readStorage<UserSession | null>(
      STORAGE_KEYS.session,
      null,
      (value): value is UserSession | null =>
        value === null || isUserSession(value)
    )
  );

  const setSession = (newSession: UserSession | null) => {
    setSessionState(newSession);
    writeStorage(STORAGE_KEYS.session, newSession);
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        setSession,
        logout,
      }}
    >
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
