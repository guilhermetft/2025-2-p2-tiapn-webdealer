import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/webdealerlogo.jpeg";
import { Alert, AlertDescription } from "../components/ui/alert";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor, insira um e-mail válido");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("Você precisa aceitar os termos de uso");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_usuario: formData.name,
          email_usuario: formData.email,
          senha_usuario: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      console.log("✅ Usuário criado:", data);
      navigate("/login");
    } catch (err) {
      console.error("Erro:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Acesso completo a todas as funcionalidades",
    "Gestão ilimitada de tarefas e projetos",
    "Colaboração em tempo real com sua equipe",
    "Relatórios e análises detalhadas",
    "Suporte técnico em português",
    "Atualizações automáticas e gratuitas",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Lado esquerdo - Benefícios */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="WebDealer Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-3xl">WebDealer</h1>
                <p className="text-sm text-muted-foreground">by Arquivar</p>
              </div>
            </div>
            <h2 className="text-4xl">Crie sua conta gratuita</h2>
            <p className="text-lg text-muted-foreground">
              Comece a gerenciar seus projetos e tarefas de forma mais eficiente.
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="relative rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1616861771635-49063a4636ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Digital Files"
              className="w-full h-48 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <Card className="shadow-2xl">
          <CardHeader className="space-y-3">
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
            <CardTitle className="text-2xl">Criar sua conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para começar gratuitamente
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="João Silva"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Confirmar senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Termos */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  disabled={isLoading}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer">
                  Eu aceito os{" "}
                  <button type="button" className="text-primary hover:underline">
                    termos de uso
                  </button>{" "}
                  e a{" "}
                  <button type="button" className="text-primary hover:underline">
                    política de privacidade
                  </button>
                </label>
              </div>

              {/* Botão */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar conta grátis"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Já tem uma conta? </span>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline"
                >
                  Fazer login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
