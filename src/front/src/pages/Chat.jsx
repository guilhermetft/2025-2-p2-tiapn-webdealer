import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import "../assets/css/Chat.css";

const supabaseUrl = "https://covxrtlwqzmnbfixyvun.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdnhydGx3cXptbmJmaXh5dnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NjA5NjIsImV4cCI6MjA3ODUzNjk2Mn0.qZhpyOS4sVG4Zo5daI6DeTP4gV2TveqmLIGdCBzvIWQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function slugify(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teamChannel, setTeamChannel] = useState(null); 
  const [canalAtual, setCanalAtual] = useState("geral");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const canais = [
    { id: "geral", name: "# geral" },
    ...(teamChannel ? [teamChannel] : []),
  ];

  // link de usuario com equipe
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (!stored) return;

    const user = JSON.parse(stored);
    setCurrentUser(user);

    async function loadTeam() {
      try {
        const { data, error } = await supabase
          .from("tb_membros")
          .select("id_usuario, tb_equipes ( titulo_equipe )")
          .eq("id_usuario", user.id_usuario)
          .limit(1);

        if (error) {
          console.error("Erro ao buscar equipe do usuário:", error.message);
          return;
        }

        if (data && data.length > 0 && data[0].tb_equipes) {
          const teamName = data[0].tb_equipes.titulo_equipe;
          const slug = slugify(teamName); 

          setTeamChannel({
            id: slug,            
            name: `# ${slug}`,   
          });
        } else {
          console.log("Usuário não possui equipe em tb_membros");
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar equipe:", err);
      }
    }

    loadTeam();
  }, []);

  // carrega mensagens
  const loadMessages = useCallback(async () => {
    try {
      let canalFiltro = "geral";

      if (canalAtual === "geral") {
        canalFiltro = "geral";
      } else if (teamChannel) {
        canalFiltro = teamChannel.id;
      }

      let query = supabase
        .from("mensagens")
        .select("*")
        .eq("canal", canalFiltro)
        .order("created_at", { ascending: true });

      const { data, error } = await query;

      if (error) {
        console.error("Erro ao carregar mensagens:", error.message);
        return;
      }

      setMessages(data || []);
    } catch (err) {
      console.error("Erro inesperado ao carregar mensagens:", err);
    }
  }, [canalAtual, teamChannel]);

  useEffect(() => {
    if (!currentUser) return;
    loadMessages();
  }, [currentUser, canalAtual, teamChannel, loadMessages]);

  // chat em realtime
  useEffect(() => {
    const channel = supabase
      .channel("mensagens-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mensagens" },
        (payload) => {
          const msg = payload.new;

          let canalFiltro = "geral";
          if (canalAtual === "geral") {
            canalFiltro = "geral";
          } else if (teamChannel) {
            canalFiltro = teamChannel.id;
          }

          const belongsToCurrentChannel = msg.canal === canalFiltro;
          const isFromOtherUser =
            !currentUser || msg.user_id !== currentUser.id_usuario;

          if (belongsToCurrentChannel && isFromOtherUser) {
            setMessages((prev) => [...prev, msg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [canalAtual, teamChannel, currentUser]);

  // scroll automatico
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // envia mensagem
  const sendMessage = useCallback(async () => {
    if (!input.trim() || !currentUser) return;

    let canalSalvar = "geral";
    if (canalAtual === "geral") {
      canalSalvar = "geral";
    } else if (teamChannel) {
      canalSalvar = teamChannel.id;
    }

    const newMessage = {
      canal: canalSalvar,
      author: currentUser.nome_usuario,
      user_id: currentUser.id_usuario,
      content: input,
    };

    const { data, error } = await supabase
      .from("mensagens")
      .insert([newMessage])
      .select();

    if (error) {
      console.error("Erro ao enviar mensagem:", error.message);
      return;
    }

    if (data && data.length > 0) {
      setMessages((prev) => [...prev, data[0]]);
    }

    setInput("");
  }, [input, canalAtual, teamChannel, currentUser]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (!currentUser) {
    return (
      <div className="chat-page-wrapper">
        <h1 className="chat-title">Chat da Equipe</h1>
        <p className="chat-subtitle">
          Para usar o chat, faça login primeiro.
        </p>
      </div>
    );
  }

  return (
    <div className="chat-page-wrapper">
      <h1 className="chat-title">Chat da Equipe</h1>
      <p className="chat-subtitle">
        Olá, {currentUser.nome_usuario}! Converse com sua equipe em tempo real.
      </p>

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
        </div>

        {/* Conteúdo */}
        <div className="chat-main">
          <div className="main-header">
            {canais.find((c) => c.id === canalAtual)?.name || "# geral"}
          </div>

          {/* MENSAGENS */}
          <div className="messages-area">
            {messages.map((msg) => {
              const own =
                String(msg.user_id) === String(currentUser.id_usuario);

              const time = msg.created_at
                ? new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <div key={msg.id} className={"msg-row " + (own ? "own" : "")}>
                  <div className="avatar">
                    {own
                      ? "V"
                      : msg.author
                      ? msg.author.slice(0, 2).toUpperCase()
                      : "?"}
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

          {/* INPUT */}
          <div className="input-area">
            <input
              className="msg-input"
              placeholder="Digite uma mensagem..."
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
