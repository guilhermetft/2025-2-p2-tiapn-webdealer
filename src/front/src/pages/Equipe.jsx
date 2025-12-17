import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import {
  Plus,
  Mail,
  MoreVertical,
  Users,
  ArrowLeft,
  Search,
  Trash2,
  UserPlus,
  Shield,
  Building2,
  Phone,
  Calendar
} from "lucide-react";

const initialMembers = [
  { id: "m1", name: "Ana Paula Silva", email: "ana.silva@arquivar.com.br", role: "Gerente de Projetos", department: "Gestão", phone: "(11) 98765-4321", joinedDate: "15 Jan, 2023" },
  { id: "m2", name: "Carlos Eduardo Santos", email: "carlos.santos@arquivar.com.br", role: "Desenvolvedor Sênior", department: "Tecnologia", phone: "(11) 97654-3210", joinedDate: "20 Mar, 2023" },
  { id: "m3", name: "Juliana Oliveira", email: "juliana.oliveira@arquivar.com.br", role: "Especialista em Digitalização", department: "Operações", phone: "(11) 96543-2109", joinedDate: "10 Fev, 2023" },
  { id: "m4", name: "Ricardo Ferreira", email: "ricardo.ferreira@arquivar.com.br", role: "Analista de Sistemas", department: "Tecnologia", phone: "(11) 95432-1098", joinedDate: "05 Abr, 2023" },
  { id: "m5", name: "Mariana Costa", email: "mariana.costa@arquivar.com.br", role: "Coordenadora de Atendimento", department: "Relacionamento", phone: "(11) 94321-0987", joinedDate: "12 Mai, 2023" },
  { id: "m6", name: "Fernando Almeida", email: "fernando.almeida@arquivar.com.br", role: "Especialista em Segurança", department: "Segurança da Informação", phone: "(11) 93210-9876", joinedDate: "08 Jun, 2023" },
  { id: "m7", name: "Beatriz Rodrigues", email: "beatriz.rodrigues@arquivar.com.br", role: "Gestora de Armazenamento", department: "Operações", phone: "(11) 92109-8765", joinedDate: "18 Jul, 2023" },
  { id: "m8", name: "Paulo Henrique Lima", email: "paulo.lima@arquivar.com.br", role: "Analista de Qualidade", department: "Garantia de Qualidade", phone: "(11) 91098-7654", joinedDate: "25 Ago, 2023" },
];

const initialTeams = [
  {
    id: "t1",
    name: "Equipe de Digitalização",
    description: "Responsável por digitalizar e organizar documentos físicos em formato digital",
    department: "Operações",
    leaderId: "m3",
    members: initialMembers.filter(m => ["m3", "m7", "m8"].includes(m.id)),
    createdDate: "10 Fev, 2023"
  },
  {
    id: "t2",
    name: "Equipe de Desenvolvimento",
    description: "Desenvolvimento e manutenção de sistemas e plataformas digitais",
    department: "Tecnologia",
    leaderId: "m2",
    members: initialMembers.filter(m => ["m2", "m4"].includes(m.id)),
    createdDate: "20 Mar, 2023"
  },
  {
    id: "t3",
    name: "Equipe de Segurança",
    description: "Garantir a segurança e integridade dos dados armazenados",
    department: "Segurança da Informação",
    leaderId: "m6",
    members: initialMembers.filter(m => ["m6"].includes(m.id)),
    createdDate: "08 Jun, 2023"
  },
];

export default function Team() {
  const [teams, setTeams] = useState(initialTeams);
  const [availableMembers] = useState(initialMembers);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [teamForm, setTeamForm] = useState({ name: "", description: "", department: "", leaderId: "" });

  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeam = () => {
    if (!teamForm.name || !teamForm.department || !teamForm.leaderId) return;

    const leader = availableMembers.find(m => m.id === teamForm.leaderId);
    if (!leader) return;

    const newTeam = {
      id: `t${Date.now()}`,
      ...teamForm,
      members: [leader],
      createdDate: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setTeams([...teams, newTeam]);
    setIsTeamDialogOpen(false);
    setTeamForm({ name: "", description: "", department: "", leaderId: "" });
  };

  const handleAddMember = (memberId) => {
    if (!selectedTeam) return;

    const memberToAdd = availableMembers.find(m => m.id === memberId);
    if (!memberToAdd) return;

    if (selectedTeam.members.some(m => m.id === memberId)) {
      alert("Este membro já faz parte da equipe!");
      return;
    }

    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        return { ...team, members: [...team.members, memberToAdd] };
      }
      return team;
    });

    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id) || null);
    setIsMemberDialogOpen(false);
  };

  const handleRemoveMember = (memberId) => {
    if (!selectedTeam) return;

    if (memberId === selectedTeam.leaderId) {
      alert("Não é possível remover o líder da equipe!");
      return;
    }

    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        return { ...team, members: team.members.filter(m => m.id !== memberId) };
      }
      return team;
    });

    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id) || null);
  };

  const handleDeleteTeam = () => {
    if (!selectedTeam) return;

    if (window.confirm(`Tem certeza que deseja excluir a equipe "${selectedTeam.name}"?`)) {
      setTeams(teams.filter(t => t.id !== selectedTeam.id));
      setSelectedTeam(null);
    }
  };

  const getAvailableMembersForTeam = () => {
    if (!selectedTeam) return [];
    const teamMemberIds = selectedTeam.members.map(m => m.id);
    return availableMembers.filter(m => !teamMemberIds.includes(m.id));
  };

  // Visualização de Equipe Específica
  if (selectedTeam) {
    const leader = selectedTeam.members.find(m => m.id === selectedTeam.leaderId);

    return (
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedTeam(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1>{selectedTeam.name}</h1>
              <p className="text-muted-foreground">{selectedTeam.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsMemberDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Membro
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeam}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Equipe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Área Principal */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Membros da Equipe ({selectedTeam.members.length})
                </CardTitle>
                <CardDescription>
                  Gerencie os membros que fazem parte desta equipe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedTeam.members.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p>{member.name}</p>
                          {member.id === selectedTeam.leaderId && (
                            <Badge className="bg-purple-100 text-purple-800">
                              <Shield className="mr-1 h-3 w-3" />
                              Líder
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{member.email}</span>
                          </div>
                          {member.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{member.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {member.id !== selectedTeam.leaderId && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remover da Equipe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área Lateral */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Equipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Departamento:</span>
                  </div>
                  <p>{selectedTeam.department}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Líder:</span>
                  </div>
                  {leader && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(leader.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{leader.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Criada em:</span>
                  </div>
                  <p>{selectedTeam.createdDate}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Total de Membros:
                    </span>
                  </div>
                  <p>{selectedTeam.members.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Departamentos Representados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(
                    new Set(selectedTeam.members.map(m => m.department))
                  ).map(dept => (
                    <div
                      key={dept}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{dept}</span>
                      <Badge variant="secondary">
                        {
                          selectedTeam.members.filter(
                            m => m.department === dept
                          ).length
                        }
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal */}
        <Dialog
          open={isMemberDialogOpen}
          onOpenChange={setIsMemberDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Membro à Equipe</DialogTitle>
              <DialogDescription>
                Selecione um membro disponível para adicionar à equipe
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getAvailableMembersForTeam().length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Todos os membros disponíveis já fazem parte desta equipe
                  </p>
                ) : (
                  getAvailableMembersForTeam().map(member => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => handleAddMember(member.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.department}
                        </p>
                      </div>

                      <Button size="sm" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  // Lista de Equipes
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gerenciamento de Equipes</h1>
          <p className="text-muted-foreground">
            Crie e gerencie equipes e seus membros
          </p>
        </div>
        <Button onClick={() => setIsTeamDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Equipe
        </Button>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar equipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid de Equipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map(team => {
          const leader = team.members.find(m => m.id === team.leaderId);

          return (
            <Card
              key={team.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{team.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      <Building2 className="mr-1 h-3 w-3" />
                      {team.department}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{team.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {team.members.length}{" "}
                    {team.members.length === 1 ? "membro" : "membros"}
                  </span>
                </div>

                {leader && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Líder da Equipe:
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(leader.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{leader.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex -space-x-2">
                  {team.members.slice(0, 5).map(member => (
                    <Avatar
                      key={member.id}
                      className="h-8 w-8 border-2 border-background"
                    >
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  ))}

                  {team.members.length > 5 && (
                    <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs">
                      +{team.members.length - 5}
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedTeam(team)}
                >
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma equipe encontrada</p>
        </div>
      )}

      {/* Modal Criar Equipe */}
      <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Equipe</DialogTitle>
            <DialogDescription>
              Preencha as informações para criar uma nova equipe
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Nome da Equipe</Label>
              <Input
                id="teamName"
                value={teamForm.name}
                onChange={(e) =>
                  setTeamForm({ ...teamForm, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamDescription">Descrição</Label>
              <Textarea
                id="teamDescription"
                rows={3}
                value={teamForm.description}
                onChange={(e) =>
                  setTeamForm({ ...teamForm, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Departamento</Label>
              <Select
                value={teamForm.department}
                onValueChange={(value) =>
                  setTeamForm({ ...teamForm, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gestão">Gestão</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Operações">Operações</SelectItem>
                  <SelectItem value="Relacionamento">Relacionamento</SelectItem>
                  <SelectItem value="Segurança da Informação">
                    Segurança da Informação
                  </SelectItem>
                  <SelectItem value="Garantia de Qualidade">
                    Garantia de Qualidade
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Líder da Equipe</Label>
              <Select
                value={teamForm.leaderId}
                onValueChange={(value) =>
                  setTeamForm({ ...teamForm, leaderId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o líder" />
                </SelectTrigger>
                <SelectContent>
                  {availableMembers.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTeamDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateTeam}
              disabled={
                !teamForm.name ||
                !teamForm.department ||
                !teamForm.leaderId
              }
            >
              Criar Equipe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}