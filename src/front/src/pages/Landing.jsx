import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  FileArchive,
  Shield,
  Users,
  Zap,
  CheckCircle2,
  BarChart3,
  Clock,
  Cloud,
  Lock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import logo from "../assets/images/webdeal.png";
import landingImg from "../assets/images/landing.jpg";
import landingImg1 from "../assets/images/landing1.jpg";

export default function LandingPage() {
  const features = [
    { icon: FileArchive, title: "Gestão de Arquivos Digitais", description: "Organize e gerencie todos os arquivos digitais da Arquivar com eficiência máxima" },
    { icon: Users, title: "Colaboração em Equipe", description: "Trabalhe em conjunto com sua equipe em tempo real, mantendo todos alinhados" },
    { icon: Shield, title: "Segurança Avançada", description: "Proteção de dados de nível empresarial para manter suas informações seguras" },
    { icon: Zap, title: "Automação Inteligente", description: "Automatize processos repetitivos e ganhe produtividade instantaneamente" },
    { icon: BarChart3, title: "Relatórios Detalhados", description: "Análises completas e dashboards intuitivos para tomada de decisões" },
    { icon: Clock, title: "Gestão de Tempo", description: "Acompanhe prazos, metas e entregas com calendários integrados" },
  ];

  const benefits = [
    "Aumente a produtividade da equipe em até 40%",
    "Reduza o tempo gasto em tarefas administrativas",
    "Melhore a comunicação interna",
    "Tenha visibilidade total dos projetos",
    "Tome decisões baseadas em dados reais",
    "Integre todos os processos em uma única plataforma",
  ];

  const stats = [
    { value: "500+", label: "Empresas Ativas" },
    { value: "50K+", label: "Tarefas Gerenciadas" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Suporte" },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="WebDealer Logo" className="h-10 w-10" />
            <div>
              <h1 className="text-xl">WebDealer</h1>
              <p className="text-xs text-muted-foreground">by Arquivar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>Entrar</Button>
            <Button onClick={() => navigate("/cadastro")}>Criar Conta</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-sm text-primary">✨ Plataforma de Gestão Empresarial</p>
            </div>
            <h1 className="text-5xl lg:text-6xl">
              Gestão completa para sua <span className="text-primary">empresa digital</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              O WebDealer é a solução completa para gerenciar tarefas, projetos, equipes e metas da Arquivar. Tudo em uma única plataforma moderna e intuitiva.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={() => navigate("/cadastro")} className="gap-2">
                Começar Gratuitamente <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>Fazer Login</Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm">Sem cartão de crédito</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm">Configuração em minutos</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-3xl" />
            <Card className="relative overflow-hidden">
              <img
                src={landingImg1}
                alt="Workspace"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-card/50">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-4xl text-primary mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl">Tudo que você precisa em um só lugar</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas para gerenciar todos os aspectos da sua operação na Arquivar
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="space-y-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{f.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <Card className="overflow-hidden">
              <img
                src={landingImg}
                alt="Workspace"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </Card>
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl">Transforme a gestão da sua empresa</h2>
            <p className="text-lg text-muted-foreground">
              Aumente a eficiência operacional da Arquivar com nossa plataforma completa de gestão empresarial.
            </p>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p>{b}</p>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => navigate("/cadastro")} className="gap-2 mt-6">
              Começar Agora <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center space-y-12">
          <div>
            <h2 className="text-4xl">Por que escolher o WebDealer?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desenvolvido especificamente para empresas de armazenamento digital como a Arquivar
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>100% Cloud</CardTitle>
                <p className="text-sm text-muted-foreground pt-2">
                  Acesse de qualquer lugar, a qualquer momento. Seus dados sempre sincronizados e seguros na nuvem.
                </p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Segurança Total</CardTitle>
                <p className="text-sm text-muted-foreground pt-2">
                  Criptografia de ponta a ponta e conformidade com LGPD para proteger seus dados empresariais.
                </p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Resultados Reais</CardTitle>
                <p className="text-sm text-muted-foreground pt-2">
                  Empresas aumentam em média 40% sua produtividade nos primeiros 3 meses de uso.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10">
        <div className="container mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-12 text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-4xl">Pronto para transformar sua gestão?</h2>
              <p className="text-xl text-muted-foreground">
                Junte-se a centenas de empresas que já estão usando o WebDealer para gerenciar seus negócios com mais eficiência
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => navigate("/cadastro")} className="gap-2">
                  Criar Conta Grátis <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Já tenho conta
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Não é necessário cartão de crédito • Configuração em 5 minutos • Suporte em português
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="WebDealer Logo" className="h-8 w-8" />
              <div>
                <h3>WebDealer</h3>
                <p className="text-xs text-muted-foreground">by Arquivar</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma completa de gestão empresarial para empresas de armazenamento digital.
            </p>
          </div>
          <div>
            <h4 className="mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Funcionalidades</li>
              <li>Preços</li>
              <li>Segurança</li>
              <li>Integrações</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sobre</li>
              <li>Blog</li>
              <li>Carreiras</li>
              <li>Contato</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Central de Ajuda</li>
              <li>Documentação</li>
              <li>Status</li>
              <li>API</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 WebDealer by Arquivar. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
