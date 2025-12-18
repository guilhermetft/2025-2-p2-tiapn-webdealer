import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar"; 
import Home from "./pages/Home";
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
  // Estado centralizado para controlar a Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Função para alternar o estado
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas (sem Sidebar/Topbar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas com Layout Dashboard */}
        <Route
          path="/*"
          element={
            <div className="app-container">
              {/* Passamos o estado para a Sidebar saber se deve encolher */}
              <Sidebar isOpen={sidebarOpen} />
              
              <div className="main-wrapper">
                {/* Passamos a função toggle para o botão que agora está na Topbar */}
                <Topbar onToggle={toggleSidebar} />
                
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

                    {/* Redirecionamento padrão para rotas não encontradas logadas */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}