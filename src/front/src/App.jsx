import { useState } from 'react'
import './App.css'
import { Sidebar } from "./components/sidebar";

export default function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="flex">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1 p-6">
        {currentView === "home" && <h1>Página Inicial</h1>}
        {currentView === "dashboard" && <h1>Painel de Controle</h1>}
        {currentView === "tasks" && <h1>Tarefas</h1>}
        {currentView === "projects" && <h1>Projetos</h1>}
        {currentView === "team" && <h1>Equipes</h1>}
        {currentView === "goals" && <h1>Metas</h1>}
        {currentView === "chat" && <h1>Chat</h1>}
        {currentView === "calendar" && <h1>Calendario</h1>}
        {currentView === "requests" && <h1>Solicitações</h1>}
        {currentView === "settings" && <h1>Configurações</h1>}
      </main>
    </div>
  );
}
