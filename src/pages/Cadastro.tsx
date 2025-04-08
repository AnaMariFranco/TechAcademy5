import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCPF, validarEmail, validarSenha } from "../utilitario/Validaçoes";

const Cadastro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cpf: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!form.nome || !form.email || !form.senha || !form.confirmarSenha || !form.cpf) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!validarEmail(form.email)) {
      setErro("Email inválido.");
      return;
    }

    if (!validarCPF(form.cpf)) {
      setErro("CPF inválido.");
      return;
    }

    if (!validarSenha(form.senha)) {
      setErro("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.");
      return;

    }

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const resposta = await fetch("tararara", { //atenção aqui porra
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar");
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
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
        <h2>Cadastro</h2>
        {erro && <p className="erro">{erro}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>CPF:</label>
            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input type="password" name="senha" value={form.senha} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Confirmar Senha:</label>
            <input type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} />
          </div>

          <button className="btn" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
