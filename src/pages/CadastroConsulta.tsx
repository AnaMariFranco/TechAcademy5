import { useState } from "react";
import InputMask from "react-input-mask";
import { validarCPF, validarData } from "../utilitario/Validaçoes";
import "./Card.css"; 

const CadastroConsulta = () => {
  const [form, setForm] = useState({
    nomePaciente: "",
    cpf: "",
    especialidade: "",
    medico: "",
    dataConsulta: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const { nomePaciente, cpf, especialidade, medico, dataConsulta } = form;

    if (!nomePaciente || !cpf || !especialidade || !medico || !dataConsulta) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!validarCPF(cpf)) {
      setErro("CPF inválido.");
      return;
    }

    if (!validarData(dataConsulta)) {
      setErro("Data inválida. Use o formato AAAA-MM-DD.");
      return;
    }

    // APi
    console.log("Consulta cadastrada:", form);
    setSucesso("Consulta cadastrada com sucesso!");
    setForm({
      nomePaciente: "",
      cpf: "",
      especialidade: "",
      medico: "",
      dataConsulta: "",
    });
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Cadastro de Consulta</h2>
        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">{sucesso}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Paciente:</label>
            <input type="text" name="nomePaciente" value={form.nomePaciente} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>CPF do Paciente:</label>
            <InputMask
              mask="999.999.999-99"
              value={form.cpf}
              onChange={handleChange}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...inputProps} type="text" name="cpf" />
)}
            </InputMask>
          </div>

          <div className="form-group">
            <label>Especialidade:</label>
            <select name="especialidade" value={form.especialidade} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Clínico Geral">Clínico Geral</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Dermatologia">Dermatologia</option>
              <option value="Ortopedia">Ortopedia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Médico:</label>
            <input type="text" name="medico" value={form.medico} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Data da Consulta:</label>
            <InputMask
              mask="9999-99-99" // data americana gata
              value={form.dataConsulta}
              onChange={handleChange}
            >
             {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...inputProps} type="text" name="dataConsulta" />
)}
            </InputMask>
          </div>

          <button type="submit" className="btn">Agendar Consulta</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroConsulta;
