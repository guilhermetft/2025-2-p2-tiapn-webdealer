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
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import "./App.css";

// 🔐 Função para verificar autenticação
function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Landing />} />
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
                  <Route
                    path="/home"
                    element={<PrivateRoute element={<Home />} />}
                  />
                  <Route
                    path="/painel"
                    element={<PrivateRoute element={<Painel />} />}
                  />
                  <Route
                    path="/tarefas"
                    element={<PrivateRoute element={<Tarefas />} />}
                  />
                  <Route
                    path="/projetos"
                    element={<PrivateRoute element={<Projetos />} />}
                  />
                  <Route
                    path="/equipe"
                    element={<PrivateRoute element={<Equipe />} />}
                  />
                  <Route
                    path="/chat"
                    element={<PrivateRoute element={<Chat />} />}
                  />
                  <Route
                    path="/calendario"
                    element={<PrivateRoute element={<Calendario />} />}
                  />
                  <Route
                    path="/solicitacao"
                    element={<PrivateRoute element={<Solicitacao />} />}
                  />
                  <Route
                    path="/configuracao"
                    element={<PrivateRoute element={<Configuracao />} />}
                  />

                  {/* Caso tente acessar rota inexistente */}
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
