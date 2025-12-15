import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas dentro do layout */}
        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/tarefas" element={<Tarefas />} />
                  <Route path="/projetos" element={<Projetos />} />
                  <Route path="/equipe" element={<Equipe />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/calendario" element={<Calendario />} />
                  <Route path="/solicitacao" element={<Solicitacao />} />
                  <Route path="/configuracao" element={<Configuracao />} />

                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
