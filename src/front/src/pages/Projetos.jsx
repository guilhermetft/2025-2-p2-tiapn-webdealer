import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Plus,
  Calendar,
  Users,
  Search,
  ArrowLeft,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  X,
  UserPlus
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";

const initialProjects = [
  {
    id: "1",
    name: "Digitalização Arquivo Histórico",
    description: "Digitalização completa do acervo histórico municipal",
    progress: 75,
    status: "active",
    participants: ["Juliana Oliveira", "Beatriz Rodrigues", "Paulo Henrique Lima", "Fernando Almeida", "Carlos Eduardo Santos"],
    deadline: "2025-11-15",
    createdDate: "15 Ago, 2025",
    tasks: [
      { id: "t1", title: "Catalogar documentos físicos", description: "Criar inventário completo de todos os documentos", status: "done", priority: "high" },
      { id: "t2", title: "Configurar scanners profissionais", description: "Instalar e calibrar equipamentos de digitalização", status: "done", priority: "high" },
      { id: "t3", title: "Digitalizar lote 1 (1950-1970)", description: "Escanear documentos do primeiro período", status: "inprogress", priority: "high" },
      { id: "t4", title: "Revisar qualidade das imagens", description: "Verificar resolução e legibilidade", status: "inprogress", priority: "medium" },
      { id: "t5", title: "Digitalizar lote 2 (1971-1990)", description: "Escanear documentos do segundo período", status: "todo", priority: "high" },
      { id: "t6", title: "Indexação e metadados", description: "Adicionar tags e informações de busca", status: "todo", priority: "medium" },
      { id: "t7", title: "Backup em múltiplos servidores", description: "Garantir redundância dos arquivos digitalizados", status: "todo", priority: "high" },
    ]
  },
  {
    id: "2",
    name: "Sistema de Gestão Documental",
    description: "Implementação de novo GED para clientes corporativos",
    progress: 45,
    status: "active",
    participants: ["Carlos Eduardo Santos", "Ricardo Ferreira", "Ana Paula Silva", "Mariana Costa"],
    deadline: "2025-12-30",
    createdDate: "01 Set, 2025",
    tasks: [
      { id: "t8", title: "Levantamento de requisitos", description: "Reuniões com stakeholders", status: "done", priority: "high" },
      { id: "t9", title: "Desenvolvimento do módulo de upload", description: "Criar interface de envio de documentos", status: "inprogress", priority: "high" },
      { id: "t10", title: "Sistema de permissões", description: "Controle de acesso por usuário e grupo", status: "inprogress", priority: "high" },
      { id: "t11", title: "Módulo de busca avançada", description: "Implementar filtros e busca full-text", status: "todo", priority: "medium" },
      { id: "t12", title: "Dashboard de relatórios", description: "Criar visualizações e estatísticas", status: "todo", priority: "low" },
    ]
  },
  {
    id: "3",
    name: "Migração Cloud Storage",
    description: "Migração de servidores físicos para infraestrutura em nuvem",
    progress: 90,
    status: "active",
    participants: ["Fernando Almeida", "Ricardo Ferreira", "Carlos Eduardo Santos"],
    deadline: "2025-10-31",
    createdDate: "10 Set, 2025",
    tasks: [
      { id: "t13", title: "Contratar serviço cloud", description: "Definir fornecedor e plano", status: "done", priority: "high" },
      { id: "t14", title: "Migração de dados fase 1", description: "Transferir 50% dos arquivos", status: "done", priority: "high" },
      { id: "t15", title: "Migração de dados fase 2", description: "Transferir restante dos arquivos", status: "inprogress", priority: "high" },
      { id: "t16", title: "Testes de integridade", description: "Validar todos os arquivos migrados", status: "todo", priority: "high" },
    ]
  },
  {
    id: "4",
    name: "Portal Autoatendimento",
    description: "Portal web para clientes acessarem documentos digitalizados",
    progress: 30,
    status: "active",
    participants: ["Carlos Eduardo Santos", "Mariana Costa"],
    deadline: "2026-01-20",
    createdDate: "20 Set, 2025",
    tasks: [
      { id: "t17", title: "Design da interface", description: "Criar wireframes e mockups", status: "done", priority: "medium" },
      { id: "t18", title: "Desenvolvimento frontend", description: "Implementar páginas em React", status: "inprogress", priority: "high" },
      { id: "t19", title: "Integração com API", description: "Conectar com backend existente", status: "todo", priority: "high" },
      { id: "t20", title: "Sistema de autenticação", description: "Login seguro para clientes", status: "todo", priority: "high" },
    ]
  },
  {
    id: "5",
    name: "Certificação ISO 27001",
    description: "Implementação de normas de segurança da informação",
    progress: 100,
    status: "completed",
    participants: ["Fernando Almeida", "Ana Paula Silva", "Paulo Henrique Lima", "Beatriz Rodrigues"],
    deadline: "2025-10-01",
    createdDate: "15 Jul, 2025",
    tasks: [
      { id: "t21", title: "Auditoria inicial", description: "Avaliação do estado atual", status: "done", priority: "high" },
      { id: "t22", title: "Implementar controles", description: "Aplicar requisitos da norma", status: "done", priority: "high" },
      { id: "t23", title: "Auditoria de certificação", description: "Avaliação final", status: "done", priority: "high" },
    ]
  },
  {
    id: "6",
    name: "App Mobile Arquivar",
    description: "Aplicativo para consulta de documentos via smartphone",
    progress: 15,
    status: "planning",
    participants: ["Carlos Eduardo Santos", "Ricardo Ferreira", "Mariana Costa"],
    deadline: "2026-03-15",
    createdDate: "25 Set, 2025",
    tasks: [
      { id: "t24", title: "Pesquisa de mercado", description: "Analisar concorrentes e necessidades", status: "inprogress", priority: "medium" },
      { id: "t25", title: "Definir stack tecnológica", description: "Escolher framework mobile", status: "todo", priority: "high" },
      { id: "t26", title: "Protótipo navegável", description: "Criar MVP para validação", status: "todo", priority: "medium" },
    ]
  },
];

export default function Projects() {
  const [usuarios, setUsuarios] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isViewProjectDialogOpen, setIsViewProjectDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [newTaskColumn, setNewTaskColumn] = useState("todo");
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    deadline: "",
    participants: []
  });

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await fetch("http://localhost:5000/usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        console.error("Erro ao buscar usuários", err);
      }
    }

    carregarUsuarios();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "planning": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed": return "Concluído";
      case "active": return "Ativo";
      case "planning": return "Planejamento";
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high": return "Alta";
      case "medium": return "Média";
      case "low": return "Baixa";
      default: return priority;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === "done").length;
    return Math.round((completed / tasks.length) * 100);
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setProjectForm({
      name: "",
      description: "",
      deadline: "",
      participants: []
    });
    setIsProjectDialogOpen(true);
  };


  // UPDATE - Editar projeto
  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      deadline: project.deadline,
      participants: [...project.participants]
    });
    setIsProjectDialogOpen(true);
  };

  // READ - Visualizar projeto
  const handleViewProject = (project) => {
    setViewingProject(project);
    setIsViewProjectDialogOpen(true);
  };

  // SAVE - Salvar projeto
  const handleSaveProject = () => {
    if (!projectForm.name || !projectForm.deadline || projectForm.participants.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (editingProject) {
      // Atualizar projeto existente
      const updatedProjects = projects.map(project =>
        project.id === editingProject.id
          ? {
            ...project,
            ...projectForm,
            progress: calculateProgress(project.tasks)
          }
          : project
      );
      setProjects(updatedProjects);

      // Atualizar projeto selecionado se for o mesmo
      if (selectedProject?.id === editingProject.id) {
        setSelectedProject(
          updatedProjects.find(p => p.id === editingProject.id) || null
        );
      }
    } else {
      // Criar novo projeto
      const newProject = {
        id: `proj-${Date.now()}`,
        ...projectForm,
        progress: 0,
        status: "planning",
        tasks: [],
        createdDate: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      };
      setProjects([newProject, ...projects]);
    }

    setIsProjectDialogOpen(false);
    setEditingProject(null);
  };

  // DELETE - Deletar projeto
  const handleDeleteProject = (projectId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este projeto? Todas as tarefas associadas serão perdidas."
      )
    ) {
      setProjects(projects.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
    }
  };

  // Gerenciamento de Participantes
  const handleAddParticipant = (user) => {
    if (!projectForm.participants.includes(user)) {
      setProjectForm({
        ...projectForm,
        participants: [...projectForm.participants, user],
      });
    }
  };

  const handleRemoveParticipant = (user) => {
    setProjectForm({
      ...projectForm,
      participants: projectForm.participants.filter(p => p !== user),
    });
  };

  // Gerenciamento de Tarefas
  const openTaskDialog = (column, task) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        priority: task.priority
      });
    } else {
      setEditingTask(null);
      setTaskForm({
        title: "",
        description: "",
        priority: "medium"
      });
      setNewTaskColumn(column);
    }
    setIsTaskDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!selectedProject || !taskForm.title) return;

    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        if (editingTask) {
          // Editar tarefa existente
          const updatedTasks = project.tasks.map(task =>
            task.id === editingTask.id
              ? { ...task, ...taskForm }
              : task
          );
          return {
            ...project,
            tasks: updatedTasks,
            progress: calculateProgress(updatedTasks)
          };
        } else {
          // Criar nova tarefa
          const newTask = {
            id: `t${Date.now()}`,
            ...taskForm,
            status: newTaskColumn
          };
          const updatedTasks = [...project.tasks, newTask];
          return {
            ...project,
            tasks: updatedTasks,
            progress: calculateProgress(updatedTasks)
          };
        }
      }
      return project;
    });

    setProjects(updatedProjects);
    setSelectedProject(
      updatedProjects.find(p => p.id === selectedProject.id) || null
    );
    setIsTaskDialogOpen(false);
    setTaskForm({
      title: "",
      description: "",
      priority: "medium"
    });
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (!selectedProject) return;

    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          const updatedTasks = project.tasks.filter(task => task.id !== taskId);
          return {
            ...project,
            tasks: updatedTasks,
            progress: calculateProgress(updatedTasks)
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      setSelectedProject(
        updatedProjects.find(p => p.id === selectedProject.id) || null
      );
    }
  };

  const moveTask = (taskId, newStatus) => {
    if (!selectedProject) return;

    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        return {
          ...project,
          tasks: updatedTasks,
          progress: calculateProgress(updatedTasks)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setSelectedProject(
      updatedProjects.find(p => p.id === selectedProject.id) || null
    );
  };

  const getColumnIcon = (column) => {
    switch (column) {
      case "todo":
        return <Clock className="h-5 w-5 text-gray-500" />;
      case "inprogress":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "done":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getColumnTitle = (column) => {
    switch (column) {
      case "todo":
        return "A Fazer";
      case "inprogress":
        return "Em Progresso";
      case "done":
        return "Concluído";
      default:
        return column;
    }
  };

  // Visualização do Kanban Board (Projeto Selecionado)
  if (selectedProject) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="space-y-6">
          {/* Cabeçalho do Kanban */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1>{selectedProject.name}</h1>
                <p className="text-muted-foreground">
                  {selectedProject.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleEditProject(selectedProject)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar Projeto
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteProject(selectedProject.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir Projeto
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Área Principal - Kanban */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["todo", "inprogress", "done"].map((columnId) => (
                  <KanbanColumn
                    key={columnId}
                    columnId={columnId}
                    title={getColumnTitle(columnId)}
                    icon={getColumnIcon(columnId)}
                    tasks={selectedProject.tasks.filter(
                      task => task.status === columnId
                    )}
                    onAddTask={() => openTaskDialog(columnId)}
                    onEditTask={(task) => openTaskDialog(columnId, task)}
                    onDeleteTask={handleDeleteTask}
                    onMoveTask={moveTask}
                    getPriorityColor={getPriorityColor}
                    getPriorityLabel={getPriorityLabel}
                  />
                ))}
              </div>
            </div>

            {/* Área Lateral - Resumo do Projeto */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Progresso Geral
                      </span>
                      <span className="font-medium">
                        {selectedProject.progress}%
                      </span>
                    </div>
                    <Progress value={selectedProject.progress} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        className={getStatusColor(selectedProject.status)}
                      >
                        {getStatusLabel(selectedProject.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Prazo
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedProject.deadline)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Participantes
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4" />
                        {selectedProject.participants.length} membros
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="mb-3">Equipe do Projeto</h4>
                    <div className="space-y-2">
                      {selectedProject.participants
                        .slice(0, 5)
                        .map((participant, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(participant)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">
                              {participant}
                            </span>
                          </div>
                        ))}
                      {selectedProject.participants.length > 5 && (
                        <p className="text-xs text-muted-foreground">
                          +
                          {selectedProject.participants.length - 5}
                          {" "}
                          mais
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <h4>Estatísticas de Tarefas</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          A Fazer
                        </span>
                        <span className="font-medium">
                          {
                            selectedProject.tasks.filter(
                              t => t.status === "todo"
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Em Progresso
                        </span>
                        <span className="font-medium">
                          {
                            selectedProject.tasks.filter(
                              t => t.status === "inprogress"
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Concluídas
                        </span>
                        <span className="font-medium">
                          {
                            selectedProject.tasks.filter(
                              t => t.status === "done"
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-muted-foreground">
                          Total
                        </span>
                        <span className="font-medium">
                          {selectedProject.tasks.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Modal de Tarefa */}
          <Dialog
            open={isTaskDialogOpen}
            onOpenChange={setIsTaskDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
                </DialogTitle>
                <DialogDescription>
                  {editingTask
                    ? "Atualize as informações da tarefa"
                    : "Adicione uma nova tarefa ao projeto"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Tarefa</Label>
                  <Input
                    id="title"
                    placeholder="Digite o título da tarefa"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        title: e.target.value
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva os detalhes da tarefa"
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        description: e.target.value
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={taskForm.priority}
                    onValueChange={(value) =>
                      setTaskForm({
                        ...taskForm,
                        priority: value
                      })
                    }
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsTaskDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveTask}
                  disabled={!taskForm.title}
                >
                  {editingTask
                    ? "Salvar Alterações"
                    : "Criar Tarefa"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DndProvider>
    );
  }

  // Lista de Projetos
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Meus Projetos</h1>
          <p className="text-muted-foreground">
            Monitore e gerencie todos os projetos da equipe
          </p>
        </div>
        <Button onClick={handleCreateProject}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="planning">Planejamento</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleViewProject(project)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleDeleteProject(project.id)
                      }
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardDescription>
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progresso
                  </span>
                  <span className="font-medium">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {project.participants.length} membros
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(project.deadline)}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedProject(project)}
              >
                Ver Kanban
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum projeto encontrado com os filtros aplicados.
          </p>
        </div>
      )}

      {/* Modal Criar / Editar Projeto */}
      <Dialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
      >
        <DialogContent className="max-w-2xl h-[90vh] flex flex-col overflow-hidden">
          {/* HEADER */}
          <DialogHeader className="shrink-0">
            <DialogTitle>
              {editingProject ? "Editar Projeto" : "Novo Projeto"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Atualize as informações do projeto"
                : "Preencha os campos para criar um novo projeto"}
            </DialogDescription>
          </DialogHeader>

          {/* BODY */}
          <div className="flex-1 min-h-0 flex flex-col gap-4 py-4 overflow-hidden">
            <div className="space-y-2">
              <Label htmlFor="projectName">Nome do Projeto *</Label>
              <Input
                id="projectName"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Descrição *</Label>
              <Textarea
                id="projectDescription"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDeadline">Prazo Final *</Label>
              <Input
                id="projectDeadline"
                type="date"
                value={projectForm.deadline}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    deadline: e.target.value,
                  })
                }
              />
            </div>

            {/* PARTICIPANTES */}
            <div className="flex flex-col space-y-2 flex-shrink-0">
              <Label>
                Participantes do Projeto * ({projectForm.participants.length} selecionados)
              </Label>

              <div className="h-48 border rounded-lg overflow-y-auto">
                {usuarios.map((user) => (
                  <div
                    key={user.id_usuario}
                    className="flex items-center justify-between px-3 py-2 hover:bg-accent"
                  >
                    <span className="text-sm">{user.nome_usuario}</span>

                    {projectForm.participants.includes(user.id_usuario) ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveParticipant(user.id_usuario)}
                      >
                        Remover
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddParticipant(user.id_usuario)}
                      >
                        Adicionar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="shrink-0">
            <Button
              variant="outline"
              onClick={() => setIsProjectDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveProject}>
              {editingProject ? "Salvar Alterações" : "Criar Projeto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );

  // Componente de Coluna Kanban
  function KanbanColumn({
    columnId,
    title,
    icon,
    tasks,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onMoveTask,
    getPriorityColor,
    getPriorityLabel,
  }) {

    const [{ isOver }, drop] = useDrop({
      accept: "TASK",
      drop: (item) => {
        onMoveTask(item.id, columnId);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`bg-muted/50 rounded-lg p-4 min-h-[500px] transition-colors ${isOver ? "bg-muted" : ""
          }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {icon}
            <h3>{title}</h3>
            <Badge variant="secondary">{tasks.length}</Badge>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mb-4"
          onClick={onAddTask}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              getPriorityColor={getPriorityColor}
              getPriorityLabel={getPriorityLabel}
            />
          ))}
        </div>
      </div>
    );
  }

  // Componente de Card de Tarefa
  function TaskCard({
    task,
    onEdit,
    onDelete,
    getPriorityColor,
    getPriorityLabel,
  }) {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <Card
        ref={drag}
        className={`cursor-move hover:shadow-md transition-all ${isDragging ? "opacity-50" : ""
          }`}
      >
        <CardHeader className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-2">
              <CardTitle className="text-sm">{task.title}</CardTitle>
              <CardDescription className="text-xs">
                {task.description}
              </CardDescription>
              <Badge
                className={getPriorityColor(task.priority)}
                variant="secondary"
              >
                {getPriorityLabel(task.priority)}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      </Card>
    );
  }
}