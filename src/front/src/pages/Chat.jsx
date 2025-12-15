import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../../../back/routes/chat.js";
import "../assets/css/Chat.css";
import { teams } from "../assets/teams.js";

export default function Chat() {
  const canais = [
    { id: "geral", name: "# geral" },
    { id: "projeto-redesign", name: "# projeto-redesign" },
    { id: "marketing", name: "# marketing" },
    { id: "engenharia", name: "# engenharia" },
    { id: "design", name: "# design" },
  ];

  // Equipe
  const [teamAtual, setTeamAtual] = useState(teams[0]);

  // Usuário
  const [currentUser, setCurrentUser] = useState(teams[0].users[0]);

  // Canal
  const [canalAtual, setCanalAtual] = useState("geral");

  // Mensagens
  const [messages, setMessages] = useState([]);

  // Scroll ref + estado
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const [input, setInput] = useState("");

  // CARREGAR MENSAGENS

  async function loadMessages() {
    // Adicionado tratamento de erro para debug
    try {
      const { data, error } = await supabase
        .from("mensagens")
        .select("*")
        .eq("canal", canalAtual)
        .eq("team_id", teamAtual.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error.message);
    }
  }

  useEffect(() => {
    loadMessages();
  }, [canalAtual, teamAtual]);

  // REALTIME 

  useEffect(() => {
    const channel = supabase
      .channel("mensagens-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mensagens" },
        (payload) => {
          // 1. Verifica se a mensagem é do canal/equipe atual
          const belongsToCurrentChat =
            payload.new.canal === canalAtual &&
            payload.new.team_id === teamAtual.id;

 
          const isFromOtherUser = payload.new.user_id !== currentUser.id;

          if (belongsToCurrentChat && isFromOtherUser) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [canalAtual, teamAtual, currentUser.id]); 


  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  // ✉ ENVIAR MENSAGEM (ATUALIZADO)

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    // Objeto da mensagem
    const newMessage = {
      canal: canalAtual,
      author: currentUser.name,
      user_id: currentUser.id,
      content: input,
      team_id: teamAtual.id,
    };

    const { data, error } = await supabase
      .from("mensagens")
      .insert([newMessage])
      .select();

    if (error) {
      console.error("Erro ao enviar mensagem:", error);
      return;
    }

    if (data && data.length > 0) {
      setMessages((prev) => [...prev, data[0]]);
    }

    setInput("");
  }, [input, canalAtual, currentUser, teamAtual]); 

  // Trocar equipe → trocar usuário também
  function changeTeam(team) {
    setTeamAtual(team);
    setCurrentUser(team.users[0]);
  }
  
  // envio cm Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // NÃO quebra linha(IMPORTANTEEEEE)
      sendMessage();
    }
  };

  return (
    <div className="chat-page-wrapper">
      <h1 className="chat-title">Chat da Equipe</h1>
      <p className="chat-subtitle">
        Comunique-se com sua equipe em tempo real
      </p>

      {/* Equipes */}
      <div className="team-header">
        <h3>Equipes de Teste</h3>
        <p className="team-info">
          Este chat é um protótipo. Cada equipe possui seus próprios usuários e
          mensagens.
        </p>

        <div className="team-switcher">
          {teams.map((t) => (
            <button
              key={t.id}
              className={t.id === teamAtual.id ? "team-btn active" : "team-btn"}
              onClick={() => changeTeam(t)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <h3 className="sidebar-title">Canais</h3>

          {canais.map((c) => (
            <button
              key={c.id}
              className={
                "sidebar-channel " + (c.id === canalAtual ? "active" : "")
              }
              onClick={() => setCanalAtual(c.id)}
            >
              {c.name}
            </button>
          ))}

          <h3 className="user-title">Usuários de TESTE</h3>
          <div className="user-switcher">
            {teamAtual.users.map((u) => (
              <button
                key={u.id}
                className={u.id === currentUser.id ? "user-btn active" : "user-btn"}
                onClick={() => setCurrentUser(u)}
              >
                {u.name}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="chat-main">
          <div className="main-header">
            {canais.find((c) => c.id === canalAtual).name}
          </div>

          {/* MENSAGENS */}
          <div className="messages-area">
            {messages.map((msg) => {
              const own = String(msg.user_id) === String(currentUser.id);
            
              const time = new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            
              return (
                <div key={msg.id} className={"msg-row " + (own ? "own" : "")}>
                  {/* Avatar */}
                  <div className="avatar">
                    {own ? "V" : msg.author[0] + (msg.author[1] || "")}
                  </div>
              
                  {/* Conteúdo */}
                  <div className="msg-content">
                    <div className="msg-header">
                      <span className="author-name">{own ? "Você" : msg.author}</span>
                      <span className="msg-time">{time}</span>
                    </div>
              
                    <div className={own ? "bubble own-bubble" : "bubble other-bubble"}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="input-area">
            <input
              className="msg-input"
              placeholder={`Mensagem para ${canais.find((c) => c.id === canalAtual).name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} // Adicionado para enviar com Enter
            />
            <button className="send-btn" onClick={sendMessage} disabled={!input.trim()}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
