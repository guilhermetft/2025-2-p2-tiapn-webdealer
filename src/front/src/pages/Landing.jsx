import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Bem-vindo ao WebDealer
        </h2>

        <p className="text-gray-600 max-w-md">
          Aqui você vai encontrar de tudo — desde gerenciamento de tarefas e
          projetos até outras funcionalidades.
        </p>

        <div className="bg-white p-8 rounded-xl shadow">
          <Button
            type="submit" 
            className="default"
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <Button
            type="submit" 
            className="default"
            onClick={() => navigate("/cadastro")}
          >
            Cadastrar-se
          </Button>
        </div>
      </div>
    </div>
  );
}



