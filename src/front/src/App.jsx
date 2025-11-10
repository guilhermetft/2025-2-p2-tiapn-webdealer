import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Painel from "./pages/Painel";
import Tarefas from "./pages/Tarefas";
import Projetos from "./pages/Projetos";
import Equipe from "./pages/Equipe";
import Chat from "./pages/Chat";
import Calendario from "./pages/Calendario";
import Solicitacao from "./pages/Solicitacao";
import Configuracao from "./pages/Configuracao";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import "./App.css";
import "./Cadastro.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/painel" element={<Painel />} />
                  <Route path="/tarefas" element={<Tarefas />} />
                  <Route path="/projetos" element={<Projetos />} />
                  <Route path="/equipe" element={<Equipe />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/calendario" element={<Calendario />} />
                  <Route path="/solicitacao" element={<Solicitacao />} />
                  <Route path="/configuracao" element={<Configuracao />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
