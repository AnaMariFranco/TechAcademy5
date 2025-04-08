import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    if (senha.length < 4) {
      setErro("A senha precisa ter pelo menos 4 caracteres.");
      return;
    }

    try {
      // Coloca aqui a API tonga
      const response = {
        ok: true,
        token: "fake-jwt-token",
      };

      if (response.ok) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard"); // Tá mandando de volta
      } else {
        setErro("Email ou senha incorretos.");
      }
    } catch {
      setErro("Erro ao conectar com o servidor. Tente novamente.");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <img
          src="/assets/user-icon.jpg"
          alt="Ícone de usuário"
          className="user-icon"
        />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Card;
