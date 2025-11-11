import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";

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

      <div className="bg-white p-8">
        <Button variant="ghost">Teste Ghost</Button>
      </div>
    </div>
  );
}


