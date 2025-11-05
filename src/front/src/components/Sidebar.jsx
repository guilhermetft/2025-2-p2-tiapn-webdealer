import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiCheckSquare } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { IoIosGitPullRequest } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <h3>WebDealer</h3>
        <NavLink to="/" end>
          <FaHome /> Início
        </NavLink>
        <NavLink to="/painel">
          <LuLayoutDashboard /> Painel
        </NavLink>
        <NavLink to="/tarefas">
          <FiCheckSquare /> Tarefas
        </NavLink>
        <NavLink to="/projetos">
          <LuFolderKanban /> Projetos
        </NavLink>
        <NavLink to="/equipe">
          <RiTeamLine /> Equipe
        </NavLink>
        <NavLink to="/chat">
          <IoChatboxEllipsesOutline /> Chat
        </NavLink>
        <NavLink to="/calendario">
          <CiCalendar /> Calendário
        </NavLink>
        <NavLink to="/solicitacao">
          <IoIosGitPullRequest /> Solicitações
        </NavLink>
        <NavLink to="/configuracao">
          <IoSettingsOutline /> Configurações
        </NavLink>
      </nav>
    </aside>
  );
}
