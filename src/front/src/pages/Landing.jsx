import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bem-vindo ao WebDealer</h2>
      <p>
        Aqui você vai encontrar de tudo — desde gerenciamento de tarefas e
        projetos até outras funcionalidades.
      </p>

      <button onClick={() => navigate("/login")}>Entrar</button>
      <button onClick={() => navigate("/cadastro")}>Cadastre-se</button>
    </div>
  );
}


