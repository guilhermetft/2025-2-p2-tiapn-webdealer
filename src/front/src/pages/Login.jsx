import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react";
import logo from "../assets/webdealerlogo.jpeg";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Login({ onLogin, onBackToLanding, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
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

    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="WebDealer Logo" className="h-12 w-12 object-cover rounded-lg" />
              <div>
                <h1 className="text-3xl">WebDealer</h1>
                <p className="text-sm text-muted-foreground">by Arquivar</p>
              </div>
            </div>
            <h2 className="text-4xl">
              Bem-vindo de volta à sua plataforma de gestão
            </h2>
            <p className="text-lg text-muted-foreground">
              Acesse sua conta e continue gerenciando tarefas, projetos e equipes
              da Arquivar com eficiência.
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

        {/* Lado direito - Formulário de Login */}
        <Card className="shadow-2xl">
          <CardHeader className="space-y-3">
            <Button
              variant="ghost"
              className="w-fit -ml-2"
              onClick={onBackToLanding}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="mb-1">E-mail</Label>
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button variant="ghost">Esqueceu a senha?</Button>
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Lembrar de mim
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Ou
                  </span>
                </div>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Não tem uma conta?{" "}
                </span>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={onGoToRegister}
                >
                  Criar conta grátis
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
