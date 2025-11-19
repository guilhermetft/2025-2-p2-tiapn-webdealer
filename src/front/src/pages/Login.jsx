import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react";
import logo from "../assets/webdealerlogo.jpeg";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 LOGIN REAL VALIDANDO COM O BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, insira um e-mail válido");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_usuario: email,
          senha_usuario: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      console.log("✅ Login bem-sucedido:", data);

      // Se quiser salvar o usuário logado:
      // localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/home");
    } catch (err) {
      console.error("Erro:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Lado esquerdo */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="WebDealer Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-3xl">WebDealer</h1>
                <p className="text-sm text-muted-foreground">by Arquivar</p>
              </div>
            </div>
            <h2 className="text-4xl">Bem-vindo de volta à sua plataforma de gestão</h2>
            <p className="text-lg text-muted-foreground">
              Acesse sua conta e continue gerenciando tarefas, projetos e equipes da Arquivar com eficiência.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Acesso Seguro</p>
                <p className="text-sm text-muted-foreground">
                  Seus dados protegidos com criptografia de ponta a ponta
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Suporte 24/7</p>
                <p className="text-sm text-muted-foreground">
                  Estamos sempre prontos para ajudar você
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado direito */}
        <Card className="shadow-2xl">
          <CardHeader className="space-y-3">
            {/* Botão Voltar */}
            <Button
              variant="ghost"
              className="w-fit -ml-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>

            <div className="lg:hidden flex items-center gap-3 justify-center">
              <img src={logo} alt="WebDealer Logo" className="h-10 w-10" />
              <div>
                <h2 className="text-xl">WebDealer</h2>
                <p className="text-xs text-muted-foreground">by Arquivar</p>
              </div>
            </div>

            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>Digite suas credenciais para acessar o sistema</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Lembrar de mim */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Lembrar de mim
                </label>
              </div>

              {/* Botão */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              {/* Separador */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              {/* Botão Cadastro */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Não tem uma conta? </span>
                <button
                  type="button"
                  onClick={() => navigate("/cadastro")}
                  className="text-primary hover:underline"
                >
                  Criar conta grátis
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
