import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 
import { FiCheckSquare } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { IoIosGitPullRequest } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

// Recebemos isOpen como prop vinda do App.jsx
export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav>
        <div className="sidebar-header">
          {/* O nome só aparece se estiver aberta. O botão sumiu daqui. */}
          {isOpen && <h3>WebDealer</h3>}
        </div>

        <NavLink to="/home" end title="Início">
          <FaHome /> {isOpen && "Início"}
        </NavLink>
        
        <NavLink to="/tarefas" title="Tarefas">
          <FiCheckSquare /> {isOpen && "Tarefas"}
        </NavLink>
        
        <NavLink to="/projetos" title="Projetos">
          <LuFolderKanban /> {isOpen && "Projetos"}
        </NavLink>
        
        <NavLink to="/equipe" title="Equipe">
          <RiTeamLine /> {isOpen && "Equipe"}
        </NavLink>
        
        <NavLink to="/chat" title="Chat">
          <IoChatboxEllipsesOutline /> {isOpen && "Chat"}
        </NavLink>
        
        <NavLink to="/calendario" title="Calendário">
          <CiCalendar /> {isOpen && "Calendário"}
        </NavLink>
        
        <NavLink to="/solicitacao" title="Solicitações">
          <IoIosGitPullRequest /> {isOpen && "Solicitações"}
        </NavLink>
        
        <NavLink to="/configuracao" title="Configurações">
          <IoSettingsOutline /> {isOpen && "Configurações"}
        </NavLink>
      </nav>
    </aside>
  );
}