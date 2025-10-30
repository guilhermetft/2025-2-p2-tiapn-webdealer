import { useState } from "react";
import { Home, LayoutDashboard, CheckSquare, FolderKanban, Users, Target, MessageSquare, Calendar, ClipboardList, SettingsIcon, Menu} from "lucide-react";

export function Sidebar({ currentView, setCurrentView }) {
  const [open, setOpen] = useState(true);

  const navigation = [
    { name: "Início", icon: Home, view: "home"},
    { name: "Painel", icon: LayoutDashboard, view: "dashboard"},
    { name: "Tarefas", icon: CheckSquare, view: "tasks"},
    { name: "Projetos", icon: FolderKanban, view: "projects"},
    { name: "Equipe", icon: Users, view: "team"},
    { name: "Metas", icon: Target, view: "goals"},
    { name: "Chat", icon: MessageSquare, view: "chat"},
    { name: "Calendário", icon: Calendar, view: "calendar"},
    { name: "Solicitações", icon: ClipboardList, view: "requests"},
    { name: "Configurações", icon: SettingsIcon, view: "settings"},
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-16"
      } bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Header da sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className={`font-bold text-lg ${!open && "hidden"}`}>WebDealer</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Itens de navegação */}
      <nav className="flex-1 mt-4 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`flex items-center w-full px-4 py-2 gap-3 hover:bg-gray-800 ${
              currentView === item.view ? "bg-gray-800" : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            {open && <span>{item.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
