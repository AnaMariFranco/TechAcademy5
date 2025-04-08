import { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "", 
  });

  useEffect(() => {
    if (usuario) {
      setForm({
        nome: usuario.nome,
        cpf: usuario.cpf || "", // API mano
        email: usuario.email,
      });
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      setForm({
        nome: usuario.nome,
        cpf: usuario.cpf || "", 
        email: usuario.email,
      });
    }
  }, [usuario]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perfil atualizado (mock)");
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Perfil</h2>
        <form onSubmit={handleSalvar}>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>CPF:</label>
            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={form.email} readOnly />
          </div>

          <button className="btn" type="submit">Salvar</button>
          <button className="btn" type="button" onClick={() => {
            logout();
            navigate("/");
          }}>
            Sair
          </button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
