import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    senha: "",
    confirmarSenha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Dados:", formData);
    alert("Conta criada com sucesso!");
    navigate("/login");
  };

  return (
    <div className="cadastro-container">
      {/* Lado esquerdo */}
      <div className="cadastro-info">
        <h1 className="logo">WebDealer</h1>
        <p className="subtitulo">by Arquivar</p>

        <h2>Junte-se a centenas de empresas</h2>
        <p>
          Comece a gerenciar sua empresa de forma mais eficiente hoje mesmo.
          Configure sua conta em minutos.
        </p>

        <ul>
          <li>✔ Acesso completo a todas as funcionalidades</li>
          <li>✔ Gestão ilimitada de tarefas e projetos</li>
          <li>✔ Colaboração em tempo real com sua equipe</li>
          <li>✔ Relatórios e análises detalhadas</li>
          <li>✔ Suporte técnico em português</li>
          <li>✔ Atualizações automáticas e gratuitas</li>
        </ul>

        <img
          src="https://unsplash.com/pt-br/fotografias/uma-pessoa-esta-escrevendo-em-um-laptop-em-uma-mesa-Mx-u0nHMxjs"
          alt="Exemplo do sistema"
          className="cadastro-img"
        />
      </div>

      {/* Lado direito */}
      <div className="cadastro-form">
        <button onClick={() => navigate("/")} className="voltar-btn">
          ← Voltar
        </button>

        <h2>Criar sua conta</h2>
        <p>Preencha os dados abaixo para começar gratuitamente</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail corporativo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="empresa"
            placeholder="Nome da empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha (mínimo 6 caracteres)"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />

          <label className="termos">
            <input type="checkbox" required /> Eu aceito os termos de uso e a
            política de privacidade
          </label>

          <button type="submit" className="criar-conta">
            Criar conta grátis
          </button>
        </form>

        <p className="login-link">
          Já tem uma conta?{" "}
          <span onClick={() => navigate("/login")}>Fazer login</span>
        </p>
      </div>
    </div>
  );
}
