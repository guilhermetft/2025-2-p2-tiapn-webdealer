import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 
import { FiCheckSquare } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { IoIosGitPullRequest } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import logoImg from "../assets/images/webdeal.png";

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav>
        <div className="sidebar-header">
          {/* A logo aparece sempre (mesmo fechada) para identificar o sistema */}
          <img 
            src={logoImg} 
            alt="Logo WebDealer" 
            className="sidebar-logo" 
          />
          
          {isOpen && (
            <div className="brand-info">
              <h3 className="brand-name">WebDealer</h3>
              <span className="brand-subtitle">by arquivar</span>
            </div>
          )}
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