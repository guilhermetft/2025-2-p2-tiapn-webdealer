import { useNavigate } from "react-router-dom";

function Configuracao() {
  const navigate = useNavigate();

  function handleSair() {
    navigate("/cadastro"); // 👉 redireciona para a página de cadastro
  }

  return (
    <div> 
      <h1>Configuração</h1>
      <button className="sair" onClick={handleSair}>
        Sair
      </button>
    </div>
  );
}

export default Configuracao;
