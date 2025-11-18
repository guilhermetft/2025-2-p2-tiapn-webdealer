import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Ghost } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bem-vindo ao WebDealer</h2>
      <p>
        Aqui você vai encontrar de tudo — desde gerenciamento de tarefas e
        projetos até outras funcionalidades.
      </p>

      <div className="bg-white p-8">
        <Button 
        variant="ghost"
        onClick={() => navigate("/login")}>Entrar</Button>
      </div>

      <div className="bg-white p-8">
        <Button 
        variant="ghost"
        onClick={() => navigate("/cadastro")}>Cadastrar-se</Button>
      </div>

      <div className="bg-white p-8">
        <Button variant="ghost">Teste Ghost</Button>
      </div>

    </div>
  );
}


