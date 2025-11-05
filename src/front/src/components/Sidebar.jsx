import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Painel from "./pages/Painel";
import Tarefas from "./pages/Tarefas";
import Projetos from "./pages/Projetos";
import Equipe from "./pages/Equipe";
import Chat from "./pages/Chat";  
import Calendario from "./pages/Calendario";  
import Solicitacao from "./pages/Solicitacao";
import Configuracao from "./pages/Configuracao";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

function sidebar() {
    return (
    <BrowserRouter>
      <nav>
        <Link to="/"><FaHome/>Início</Link> |{" "}
        <Link to="/painel"><LuLayoutDashboard/>Painel</Link> |{" "}
        <Link to="/tarefas">Tarefas</Link> |{" "}
        <Link to="/projetos">Projetos</Link> |{" "}
        <Link to="/equipe">Equipe</Link> |{" "}
        <Link to="/chat">Chat</Link> |{" "}
        <Link to="/calendario">Calendario</Link> |{" "}
        <Link to="/solicitacao">Solicitações</Link> |{" "}
        <Link to="/configuracao">Configurações</Link>
      </nav>

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
    </BrowserRouter>
    )
}

export default sidebar;