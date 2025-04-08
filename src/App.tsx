import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import CadastroConsulta from "./pages/CadastroConsulta";
import { AuthProvider } from "./contexts/Autenticacao";
import Header from "./components/Header"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header /> {}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/consulta" element={<CadastroConsulta />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
