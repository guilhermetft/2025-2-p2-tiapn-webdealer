import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { User, Shield, LogOut } from "lucide-react"; 

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome_usuario: "",
    email_usuario: "",
    telefone: "",
    empresa_usuario: "",
    cargo: "",
  });

  const [securityData, setSecurityData] = useState({
    senha_atual: "",
    nova_senha: "",
    confirmar_senha: "",
  });

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    
    if (usuarioSalvo) {
      const usuarioObj = JSON.parse(usuarioSalvo);
      const id = usuarioObj.id_usuario;
      setUserId(id);
      fetchUserData(id);
    } else {
      navigate("/"); 
      setIsLoading(false);
    }
  }, [navigate]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/configuracoes/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setFormData({
          nome_usuario: data.nome_usuario || "",
          email_usuario: data.email_usuario || "",
          telefone: data.telefone || "",
          empresa_usuario: data.empresa_usuario || "",
          cargo: data.cargo || "",
        });
      } else {
        console.error("Erro ao carregar dados do usuário");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      firstName: "nome_usuario",
      email: "email_usuario",
      phone: "telefone",
      company: "empresa_usuario",
      position: "cargo"
    };

    if (fieldMap[id]) {
      setFormData((prev) => ({ ...prev, [fieldMap[id]]: value }));
    }
  };

  const handleSecurityChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      currentPassword: "senha_atual",
      newPassword: "nova_senha",
      confirmPassword: "confirmar_senha"
    };

    if (fieldMap[id]) {
      setSecurityData((prev) => ({ ...prev, [fieldMap[id]]: value }));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair da conta?")) {
      localStorage.removeItem("usuario");
      navigate("/");
    }
  };

  const handleSaveProfile = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/configuracoes/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        const usuarioAtualizado = { ...usuarioLocal, ...formData };
        localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
      } else {
        const result = await response.json();
        alert(`Erro ao salvar: ${result.error}`);
      }
    } catch (error) {
      alert("Erro de conexão ao salvar.");
    }
  };

  const handleSaveSecurity = async () => {
    if (!userId) return;

    if (securityData.nova_senha !== securityData.confirmar_senha) {
      alert("As senhas não coincidem.");
      return;
    }
    
    if (!securityData.senha_atual || !securityData.nova_senha) {
      alert("Preencha todos os campos de senha.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/configuracoes/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senha_atual: securityData.senha_atual,
          nova_senha: securityData.nova_senha
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Senha alterada com sucesso!");
        setSecurityData({ senha_atual: "", nova_senha: "", confirmar_senha: "" });
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao alterar senha.");
    }
  };

  if (isLoading) {
    return <div className="p-8">Carregando informações...</div>;
  }

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
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

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
                  {formData.nome_usuario ? formData.nome_usuario.substring(0, 2).toUpperCase() : "UA"}
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

              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input 
                  id="firstName" 
                  value={formData.nome_usuario} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email_usuario}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.empresa_usuario}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input 
                  id="position" 
                  value={formData.cargo} 
                  onChange={handleInputChange}
                />
              </div>

              {/* 4. ÁREA DOS BOTÕES ATUALIZADA */}
              <div className="flex items-center gap-4">
                <Button onClick={handleSaveProfile}>
                  Salvar Alterações
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Gerencie sua senha
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input 
                  id="currentPassword" 
                  type="password"
                  value={securityData.senha_atual}
                  onChange={handleSecurityChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={securityData.nova_senha}
                  onChange={handleSecurityChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={securityData.confirmar_senha}
                  onChange={handleSecurityChange}
                />
              </div>

              <Button onClick={handleSaveSecurity}>Atualizar Senha</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}