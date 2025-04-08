import { createContext } from "react";

type Usuario = {
  nome: string;
  email: string;
  cpf?: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
};

// Olha o contexto 
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
