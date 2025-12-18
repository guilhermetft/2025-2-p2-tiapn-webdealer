import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Plus,
  Users,
  ArrowLeft,
  Search,
  Trash2,
  UserPlus,
  Shield
} from "lucide-react";

const API_URL = "https://backwebdealer.onrender.com/api";

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [teamForm, setTeamForm] = useState({ name: "", description: "", department: "", leaderId: "" });

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_URL}/equipes`);
      const data = await response.json();
      setTeams(data);
      if (selectedTeam) {
        const updated = data.find(t => t.id === selectedTeam.id);
        if (updated) setSelectedTeam(updated);
      }
    } catch (error) {
      console.error("Erro ao carregar equipes:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      const data = await response.json();
      const formatted = data.map(u => ({
        id: u.id_usuario,
        name: u.nome_usuario,
        email: u.email_usuario,
        role: u.cargo,
        department: u.departamento,
        phone: u.telefone
      }));
      setAvailableMembers(formatted);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamForm.name || !teamForm.department || !teamForm.leaderId) return;
    try {
      const response = await fetch(`${API_URL}/equipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamForm)
      });
      if (response.ok) {
        await fetchTeams();
        setIsTeamDialogOpen(false);
        setTeamForm({ name: "", description: "", department: "", leaderId: "" });
      }
    } catch (error) {
      alert("Erro ao salvar equipe no banco.");
    }
  };

  const handleDeleteTeam = async () => {
    if (!selectedTeam) return;
    if (window.confirm(`Tem certeza que deseja excluir a equipe "${selectedTeam.name}"?`)) {
      try {
        const response = await fetch(`${API_URL}/equipes/${selectedTeam.id}`, { method: "DELETE" });
        if (response.ok) {
          await fetchTeams();
          setSelectedTeam(null);
        }
      } catch (error) {
        alert("Erro ao excluir do banco.");
      }
    }
  };

  const handleAddMember = async (memberId) => {
    if (!selectedTeam) return;
    try {
      const response = await fetch(`${API_URL}/equipes/${selectedTeam.id}/membros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario: memberId })
      });
      if (response.ok) {
        await fetchTeams();
        setIsMemberDialogOpen(false);
        setMemberSearchTerm("");
      }
    } catch (error) {
      alert("Erro ao adicionar membro.");
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!selectedTeam) return;
    try {
      const response = await fetch(`${API_URL}/equipes/${selectedTeam.id}/membros/${memberId}`, { method: "DELETE" });
      if (response.ok) await fetchTeams();
    } catch (error) {
      console.error(error);
    }
  };

  const getInitials = (name) => name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??";

  const filteredTeams = teams.filter(team =>
    team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableMembers = availableMembers.filter(m => {
    const isAlreadyInTeam = selectedTeam?.members?.some(tm => tm.id === m.id);
    if (isAlreadyInTeam) return false;
    const searchLower = memberSearchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(searchLower) ||
      m.role?.toLowerCase().includes(searchLower) ||
      m.department?.toLowerCase().includes(searchLower)
    );
  });

  if (selectedTeam) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedTeam(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedTeam.name}</h1>
              <p className="text-muted-foreground">{selectedTeam.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsMemberDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Adicionar Membro
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeam}>
              <Trash2 className="mr-2 h-4 w-4" /> Excluir Equipe
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Membros da Equipe ({selectedTeam.members?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedTeam.members?.map(member => (
                <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.id === selectedTeam.leaderId && (
                        <Badge className="bg-purple-100 text-purple-800"><Shield className="mr-1 h-3 w-3" /> Líder</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  {member.id !== selectedTeam.leaderId && (
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(member.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MODAL COM CORREÇÃO DE SCROLL FORÇADA */}
        <Dialog open={isMemberDialogOpen} onOpenChange={(open) => {
          setIsMemberDialogOpen(open);
          if (!open) setMemberSearchTerm("");
        }}>
          <DialogContent 
            className="sm:max-w-[550px] p-0 overflow-hidden flex flex-col"
            style={{ height: '80vh' }}
          >
            {/* CABEÇALHO FIXO */}
            <div className="p-6 border-b bg-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <UserPlus className="h-5 w-5 text-primary" />
                  Adicionar Membro à Equipe
                </DialogTitle>
                <DialogDescription>
                  Selecione um colaborador da lista abaixo.
                </DialogDescription>
              </DialogHeader>

              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  placeholder="Buscar por nome, cargo ou setor..." 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={memberSearchTerm}
                  onChange={(e) => setMemberSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* ÁREA DE LISTA COM SCROLL ATIVO */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 bg-slate-50/50">
              {filteredAvailableMembers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>Nenhum usuário disponível encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {filteredAvailableMembers.map(member => (
                    <div key={member.id} className="group flex items-center justify-between p-3 border rounded-xl bg-white hover:border-primary/50 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar className="h-10 w-10 border flex-shrink-0">
                          <AvatarFallback className="bg-slate-100 text-primary font-bold">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate text-slate-900">{member.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 uppercase border-blue-100 text-blue-700 bg-blue-50">
                              {member.department || "SETOR"}
                            </Badge>
                            <span className="text-[11px] text-muted-foreground truncate italic">
                              {member.role || "Colaborador"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="rounded-full h-8 w-8 p-0 hover:bg-primary hover:text-white transition-colors flex-shrink-0"
                        onClick={() => handleAddMember(member.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* RODAPÉ FIXO */}
            <div className="p-4 bg-white border-t text-center">
               <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                {filteredAvailableMembers.length} Usuários Encontrados
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gerenciamento de Equipes</h1>
          <p className="text-muted-foreground">Gerencie equipes e pessoas</p>
        </div>
        <Button onClick={() => setIsTeamDialogOpen(true)} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Nova Equipe
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar equipes por nome ou departamento..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="pl-10 h-11" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map(team => (
          <Card key={team.id} className="hover:shadow-lg transition-all border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  {team.department}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2 min-h-[40px] pt-1">
                {team.description || "Sem descrição definida."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4 text-slate-600">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">{team.members?.length || 0} membros</span>
              </div>
              <Button variant="outline" className="w-full font-semibold" onClick={() => setSelectedTeam(team)}>
                Gerenciar Equipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader><DialogTitle>Criar Nova Equipe</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome da Equipe</Label>
              <Input placeholder="Ex: Time de Infraestrutura" value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea placeholder="Objetivo da equipe..." value={teamForm.description} onChange={e => setTeamForm({...teamForm, description: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select onValueChange={v => setTeamForm({...teamForm, department: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Operações">Operações</SelectItem>
                    <SelectItem value="Gestão">Gestão</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Líder</Label>
                <Select onValueChange={v => setTeamForm({...teamForm, leaderId: v})}>
                  <SelectTrigger><SelectValue placeholder="Escolher" /></SelectTrigger>
                  <SelectContent>
                    {availableMembers.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleCreateTeam}>Confirmar Criação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}