import { createContext } from "react";
import type { UserSession } from "../types";

export interface AuthContextType {
  user: UserSession | null;
  login: (email: string, password: string) => UserSession | null;
  register: (name: string, email: string, password: string) => UserSession | null;
  logout: () => void;
  emailExists: (email: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
