import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  FileArchive,
  Cloud,
  Shield,
  Zap,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  HardDrive,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Cloud,
      title: "Gestão Centralizada",
      description: "Todas as informações da sua empresa em um único lugar",
    },
    {
      icon: Shield,
      title: "Segurança de Dados",
      description: "Proteção avançada para informações sensíveis",
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Automatize processos e ganhe produtividade",
    },
    {
      icon: Users,
      title: "Colaboração em Tempo Real",
      description: "Trabalhe em equipe de forma eficiente",
    },
  ];

  const stats = [
    { value: "500+", label: "Empresas Ativas" },
    { value: "50K+", label: "Tarefas Gerenciadas" },
    { value: "99.9%", label: "Uptime Garantido" },
    { value: "24/7", label: "Suporte Disponível" },
  ];

  return (
    <div className="space-y-12">

      <section className="text-center space-y-6 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl">
            Bem-vindo ao <span className="text-primary">WebDealer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plataforma completa de gestão empresarial para organizar seu negócio
            de forma inteligente
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Features */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl">Por que escolher o WebDealer?</h2>
          <p className="text-muted-foreground">
            Tecnologia de ponta para gestão completa do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg">
                      {feature.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl">Funcionalidades Principais</h2>
          <p className="text-muted-foreground">
            Ferramentas completas para gestão empresarial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FileArchive className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Gestão de Tarefas</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Organize, atribua e acompanhe todas as tarefas da sua equipe
                </p>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <HardDrive className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Controle de Projetos</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gerencie projetos com prazos, marcos e progresso
                </p>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Análise e Relatórios</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Dashboards e métricas para decisões estratégicas
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefícios */}
      <section>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl">
                  Transforme sua gestão empresarial
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      title: "Aumento de Produtividade",
                      desc: "Automatize tarefas e otimize o tempo da equipe",
                    },
                    {
                      title: "Visibilidade Total",
                      desc: "Acompanhe projetos e tarefas em tempo real",
                    },
                    {
                      title: "Comunicação Eficiente",
                      desc: "Chat integrado para manter todos alinhados",
                    },
                    {
                      title: "Decisões Inteligentes",
                      desc: "Dados e métricas para decisões estratégicas",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-center h-64 w-64">
                    <img src="../assets/images/webdeal.png" alt="webdealerlogo" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
