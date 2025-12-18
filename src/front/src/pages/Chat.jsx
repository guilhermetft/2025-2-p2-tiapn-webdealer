import { useEffect, useState, useRef } from "react";
import "../assets/css/Chat.css";

const API_URL = "https://backwebdealer.onrender.com";

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [canalAtual, setCanalAtual] = useState("geral");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const canais = [{ id: "geral", name: "# geral" }];

  /* ===============================
     USUÁRIO LOGADO
  ================================ */
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  /* ===============================
     CARREGAR MENSAGENS
  ================================ */
  const loadMessages = async () => {
    try {
      const response = await fetch(
        `${API_URL}/chat/mensagens?canal=${canalAtual}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar mensagens");
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error("Erro ao carregar mensagens:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadMessages();
    }
  }, [currentUser, canalAtual]);

  /* ===============================
     SCROLL AUTOMÁTICO
  ================================ */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     ENVIAR MENSAGEM
  ================================ */
  const sendMessage = async () => {
    if (!input.trim() || !currentUser) return;

    try {
      const response = await fetch(`${API_URL}/chat/mensagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_canal: canalAtual,
          author_mensagem: currentUser.nome_usuario,
          user_id: currentUser.id_usuario,
          content: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      setInput("");
      loadMessages();
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!currentUser) {
    return (
      <div className="chat-page-wrapper">
        <h1 className="chat-title">Chat</h1>
        <p>Faça login para acessar o chat.</p>
      </div>
    );
  }

  return (
    <div className="chat-page-wrapper">
      <h1 className="chat-title">Chat</h1>

      <div className="chat-container">
        {/* SIDEBAR */}
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

        {/* CHAT */}
        <div className="chat-main">
          <div className="main-header"># {canalAtual}</div>

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
                <div
                  key={msg.id}
                  className={"msg-row " + (own ? "own" : "")}
                >
                  <div className="msg-content">
                    <div className="msg-header">
                      <span className="author-name">
                        {own ? "Você" : msg.author_mensagem}
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
              placeholder="Digite uma mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-btn" onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}