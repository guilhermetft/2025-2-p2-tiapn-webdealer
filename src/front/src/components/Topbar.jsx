import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Topbar({ onToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button onClick={onToggle} className="toggle-btn">
          <FaBars />
        </button>
      </div>

      <div className="topbar-right">
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Usuário Admin</span>
            <span className="user-email">admin@webdealer.com.br</span>
          </div>
          <div className="user-avatar">UA</div>
        </div>
      </div>
    </header>
  );
}