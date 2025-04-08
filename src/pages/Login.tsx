import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth"; 
import "./Card.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const validarEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!validarEmail(email)) {
      setErro("Email inválido");
      return;
    }

    try {
      const resposta = await fetch("SUA_API/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao fazer login");
      }

      localStorage.setItem("token", dados.token);

      login({ nome: dados.nome, email: dados.email, cpf: dados.cpf }); 
      navigate("/perfil"); // tá mando pro perfil
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setErro(erro.message);
      } else {
        setErro("Erro desconhecido ao conectar à API");
      }
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <img src="/assets/user-icon.jpg" alt="Ícone de usuário" className="user-icon" />
        <h2>Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
