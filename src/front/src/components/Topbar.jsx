import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

export default function Topbar({ onToggle }) {
  const [userData, setUserData] = useState({
    nome: "Usuário",
    email: "carregando...",
    iniciais: "U"
  });

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    
    if (usuarioSalvo) {
      const usuarioObj = JSON.parse(usuarioSalvo);
      const id = usuarioObj.id_usuario;
      
      // Busca os dados atualizados do banco (igual você faz nas configurações)
      fetchUserData(id);
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`https://backwebdealer.onrender.com/configuracoes/${id}`);
      if (response.ok) {
        const data = await response.json();
        
        // Função para gerar iniciais (ex: "João Silva" -> "JS")
        const nome = data.nome_usuario || "Usuário";
        const iniciais = nome
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);

        setUserData({
          nome: nome,
          email: data.email_usuario || "",
          iniciais: iniciais
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados no Topbar:", error);
    }
  };

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
            <span className="user-name">{userData.nome}</span>
            <span className="user-email">{userData.email}</span>
          </div>
          {/* Avatar dinâmico com as iniciais do banco */}
          <div className="user-avatar">
            {userData.iniciais}
          </div>
        </div>
      </div>
    </header>
  );
}