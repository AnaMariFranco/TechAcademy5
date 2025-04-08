import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type Usuario = {
  nome: string;
  email: string;
  cpf?: string; 
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (usuario: Usuario) => {
    setUsuario({
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf || "", // Armazenou o cpf
    });
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
