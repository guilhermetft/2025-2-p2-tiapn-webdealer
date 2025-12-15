import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  User,
  Bell,
  Shield,
  Palette,
  HardDrive,
  Mail,
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    tasks: true,
    projects: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="storage" className="gap-2">
            <HardDrive className="h-4 w-4" />
            Armazenamento
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                  UA
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Alterar Foto
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG ou GIF. Máx 5MB
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" defaultValue="Usuário" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" defaultValue="Admin" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@webdealer.com.br"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+55 11 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  defaultValue="Arquivar - Cliente WebDealer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input id="position" defaultValue="Administrador" />
              </div>

              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por e-mail
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real no navegador
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações de Tarefas</Label>
                  <p className="text-sm text-muted-foreground">
                    Alertas sobre novas tarefas e atualizações
                  </p>
                </div>
                <Switch
                  checked={notifications.tasks}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, tasks: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações de Projetos</Label>
                  <p className="text-sm text-muted-foreground">
                    Atualizações sobre progresso de projetos
                  </p>
                </div>
                <Switch
                  checked={notifications.projects}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, projects: checked })
                  }
                />
              </div>

              <Button>Salvar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Gerencie sua senha e configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button>Atualizar Senha</Button>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg">Autenticação de Dois Fatores</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança à sua conta
                </p>
                <Button variant="outline">Ativar 2FA</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg">Sessões Ativas</h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie dispositivos onde você está conectado
                </p>
                <div className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chrome - Windows</p>
                      <p className="text-sm text-muted-foreground">
                        São Paulo, Brasil • Ativo agora
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Encerrar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Tab */}
        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Uso de Armazenamento</CardTitle>
              <CardDescription>
                Monitore e gerencie seu espaço de armazenamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Espaço Utilizado</span>
                  <span className="font-medium">6.5 TB de 10 TB</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg">Distribuição por Tipo</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Documentos</p>
                        <p className="text-sm text-muted-foreground">
                          PDFs, DOCs, etc
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">3.2 TB</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Imagens</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, etc
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">2.1 TB</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Outros</p>
                        <p className="text-sm text-muted-foreground">
                          Vídeos, áudios, etc
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">1.2 TB</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg">Opções de Armazenamento</h3>
                <Button variant="outline" className="w-full">
                  Fazer Upgrade do Plano
                </Button>
                <Button variant="outline" className="w-full">
                  Gerenciar Arquivos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalização</CardTitle>
              <CardDescription>
                Personalize a aparência da interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <div className="w-full aspect-video bg-white border rounded mb-2"></div>
                    <p className="text-sm">Claro</p>
                  </button>
                  <button className="p-4 border-2 border-primary rounded-lg">
                    <div className="w-full aspect-video bg-gray-900 rounded mb-2"></div>
                    <p className="text-sm">Escuro</p>
                  </button>
                  <button className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <div className="w-full aspect-video bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
                    <p className="text-sm">Automático</p>
                  </button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Tamanho da Fonte</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Pequeno
                  </Button>
                  <Button variant="default" size="sm">
                    Médio
                  </Button>
                  <Button variant="outline" size="sm">
                    Grande
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar animações na interface
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Compacto</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduzir espaçamento entre elementos
                  </p>
                </div>
                <Switch />
              </div>

              <Button>Salvar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
