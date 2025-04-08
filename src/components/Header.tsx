import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <header style={{ padding: "10px", background: "#f0f0f0", textAlign: "center" }}>
      <h1>Meu Sistema</h1>
      {auth?.usuario ? <p>Bem-vindo, {auth.usuario.nome}!</p> : <p>Carregando...</p>}
    </header>
  );
};

export default Header;
