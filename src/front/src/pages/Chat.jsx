import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import "../assets/css/Chat.css";

const supabaseUrl = "https://covxrtlwqzmnbfixyvun.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdnhydGx3cXptbmJmaXh5dnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NjA5NjIsImV4cCI6MjA3ODUzNjk2Mn0.qZhpyOS4sVG4Zo5daI6DeTP4gV2TveqmLIGdCBzvIWQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Chat() {
  const canais = [
    { id: "geral", name: "# geral" },
    { id: "projeto-redesign", name: "# projeto-redesign" },
    { id: "marketing", name: "# marketing" },
    { id: "engenharia", name: "# engenharia" },
    { id: "design", name: "# design" },
  ];

  const [teams, setTeams] = useState([]);
  const [teamAtual, setTeamAtual] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [canalAtual, setCanalAtual] = useState("geral");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [input, setInput] = useState("");

  // EQUIPES e USUÁRIOS DIRETO DO SUPABASE
  useEffect(() => {
    async function loadTeamsAndUsers() {
      try {
        const { data: equipes, error: eqError } = await supabase
          .from("tb_equipes")
          .select("id_equipe, titulo_equipe");
        if (eqError) throw eqError;

        const { data: usuarios, error: usError } = await supabase
          .from("tb_usuario")
          .select("id_usuario, nome_usuario");
        if (usError) throw usError;

        const usuariosFormatados = (usuarios || []).map((u) => ({
          id: u.id_usuario,
          name: u.nome_usuario,
        }));

        const teamsFormatados = (equipes || []).map((e) => ({
          id: e.id_equipe,
          name: e.titulo_equipe,
          users: usuariosFormatados,
        }));

        setTeams(teamsFormatados);

        if (teamsFormatados.length > 0) {
          setTeamAtual(teamsFormatados[0]);
          if (teamsFormatados[0].users.length > 0) {
            setCurrentUser(teamsFormatados[0].users[0]);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar equipes/usuarios:", err.message);
      }
    }

    loadTeamsAndUsers();
  }, []);

  // MENSAGENS PELO BACKEND
  async function loadMessages() {
    if (!teamAtual) return;
    try {
      const params = new URLSearchParams({
        canal: canalAtual,
        team_id: String(teamAtual.id),
      });

      const res = await fetch(
        `http://localhost:5000/api/chat/mensagens?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar mensagens");
      }

      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Erro ao carregar mensagens:", err.message);
    }
  }

  useEffect(() => {
    loadMessages();
  }, [canalAtual, teamAtual]);

  // CHAT VAI DIRETO NO SUPABASE 
  useEffect(() => {
    if (!currentUser || !teamAtual) return;

    const channel = supabase
      .channel("mensagens-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mensagens" },
        (payload) => {
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
  }, [canalAtual, teamAtual, currentUser]);

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  // ENVIAR MENSAGEM PELO BACKEND
  const sendMessage = useCallback(async () => {
    if (!input.trim() || !currentUser || !teamAtual) return;

    const payload = {
      canal: canalAtual,
      author: currentUser.name,
      user_id: currentUser.id,
      content: input,
      team_id: teamAtual.id,
    };

    try {
      const res = await fetch("http://localhost:5000/api/chat/mensagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar mensagem");
      }

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
      setInput("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err.message);
    }
  }, [input, canalAtual, currentUser, teamAtual]);

  function changeTeam(team) {
    setTeamAtual(team);
    if (team.users && team.users.length > 0) {
      setCurrentUser(team.users[0]);
    } else {
      setCurrentUser(null);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page-wrapper">
      <h1 className="chat-title">Chat da Equipe</h1>
      <p className="chat-subtitle">
        Comunique-se com sua equipe em tempo real
      </p>

      <div className="team-header">
        <h3>Equipes</h3>
        <p className="team-info">
          Cada equipe possui seus próprios usuários e mensagens.
        </p>

        <div className="team-switcher">
          {teams.map((t) => (
            <button
              key={t.id}
              className={
                teamAtual && t.id === teamAtual.id ? "team-btn active" : "team-btn"
              }
              onClick={() => changeTeam(t)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-container">
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

          <h3 className="user-title">Usuários</h3>
          <div className="user-switcher">
            {teamAtual &&
              teamAtual.users &&
              teamAtual.users.map((u) => (
                <button
                  key={u.id}
                  className={
                    currentUser && u.id === currentUser.id
                      ? "user-btn active"
                      : "user-btn"
                  }
                  onClick={() => setCurrentUser(u)}
                >
                  {u.name}
                </button>
              ))}
          </div>
        </div>

        <div className="chat-main">
          <div className="main-header">
            {canais.find((c) => c.id === canalAtual).name}
          </div>

          <div className="messages-area">
            {messages.map((msg) => {
              const own =
                currentUser && String(msg.user_id) === String(currentUser.id);

              const time = new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={msg.id} className={"msg-row " + (own ? "own" : "")}>
                  <div className="avatar">
                    {own ? "V" : msg.author[0] + (msg.author[1] || "")}
                  </div>

                  <div className="msg-content">
                    <div className="msg-header">
                      <span className="author-name">
                        {own ? "Você" : msg.author}
                      </span>
                      <span className="msg-time">{time}</span>
                    </div>

                    <div
                      className={
                        own ? "bubble own-bubble" : "bubble other-bubble"
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <input
              className="msg-input"
              placeholder={`Mensagem para ${
                canais.find((c) => c.id === canalAtual).name
              }...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
