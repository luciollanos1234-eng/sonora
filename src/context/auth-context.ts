import { createContext } from "react";
import type { UserSession } from "../types";

export interface AuthContextType {
  user: UserSession | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
