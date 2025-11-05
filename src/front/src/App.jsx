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
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
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
    </BrowserRouter>
  );
}
