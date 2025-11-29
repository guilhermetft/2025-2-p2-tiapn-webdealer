import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function Configuracao() {
  const navigate = useNavigate();

  function handleSair() {
    navigate("/"); 
  }

  return (
    <div> 

      <h1>Configuração</h1>

      <Button
      onClick={handleSair}>
        Sair
      </Button>
      
    </div>
  );
}

export default Configuracao;
