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

// Componente para o Card Arrastável
const TaskCard = ({ task, onEditTask, onDeleteTask, getPriorityColor, getPriorityLabel }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={`mb-3 cursor-grab active:cursor-grabbing ${isDragging ? "opacity-50 border-dashed border-primary" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getPriorityColor(task.priority)}>
            {getPriorityLabel(task.priority)}
          </Badge>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEditTask(task)}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => onDeleteTask(task.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <h4 className="font-medium text-sm mb-1">{task.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
      </CardContent>
    </Card>
  );
};

// Componente para a Coluna (Alvo do Drop)
const KanbanColumn = ({ columnId, title, icon, tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask, getPriorityColor, getPriorityLabel }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onMoveTask(item.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`flex flex-col h-full rounded-lg p-2 transition-colors ${isOver ? "bg-muted/50 border-2 border-dashed border-primary/20" : "bg-muted/30"}`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{title}</h3>
          <Badge variant="secondary" className="ml-1">{tasks.length}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onAddTask}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            getPriorityColor={getPriorityColor}
            getPriorityLabel={getPriorityLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default function Projects() {
  const [usuarios, setUsuarios] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [projects, setProjects] = useState([]);
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
    participants: [],
    status: "planning" // novo
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resProj] = await Promise.all([
          fetch("https://backwebdealer.onrender.com/usuarios"),
          fetch("https://backwebdealer.onrender.com/projetos")
        ]);

        const usersData = await resUsers.json();
        const projData = await resProj.json();

        // Recalcula o progresso de cada projeto baseado nas tarefas reais
        const projectsWithCalculatedProgress = projData.map(projeto => ({
          ...projeto,
          progress: calculateProgress(projeto.tasks || [])
        }));

        setUsuarios(usersData);
        setProjects(projectsWithCalculatedProgress);
      } catch (err) {
        console.error("Erro ao carregar dados do servidor:", err);
      }
    };

    fetchData();
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
      (project.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchTerm.toLowerCase());

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
      participants: project.participants || [],
      status: project.status,
      progress: project.progress
    });
    setIsProjectDialogOpen(true);
  };

  // READ - Visualizar projeto
  const handleViewProject = (project) => {
    setViewingProject(project);
    setIsViewProjectDialogOpen(true);
  };

  // SAVE - Salvar projeto
  const handleSaveProject = async () => {
    if (!projectForm.name || !projectForm.deadline || projectForm.participants.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      const isEditing = !!editingProject;
      const url = isEditing
        ? `https://backwebdealer.onrender.com/projetos/${editingProject.id_projeto}`
        : "https://backwebdealer.onrender.com/projetos";

      // --- ALTERAÇÃO AQUI: Criamos um objeto apenas com os dados, sem o ID antigo ---
      const payload = {
        name: projectForm.name,
        description: projectForm.description,
        deadline: projectForm.deadline,
        status: projectForm.status,
        participants: projectForm.participants,
        progress: projectForm.progress || 0 // Garante que o progresso vá como número
      };

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Enviamos o payload limpo
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro detalhado do servidor:", errorData);
        throw new Error("Erro na resposta do servidor");
      }

      const savedProject = await response.json();

      if (isEditing) {
        setProjects(projects.map(p => p.id_projeto === savedProject.id_projeto ? savedProject : p));
      } else {
        setProjects([savedProject, ...projects]);
      }

      setIsProjectDialogOpen(false);
      setEditingProject(null);
      setProjectForm({ name: "", description: "", deadline: "", participants: [], status: "planning", progress: 0 });

    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Falha ao salvar. Verifique o console do servidor para detalhes.");
    }
  };

  // DELETE - Deletar projeto
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este projeto e todas as suas tarefas?")) return;

    try {
      const response = await fetch(`https://backwebdealer.onrender.com/projetos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir no servidor");

      // Remove da lista local para sumir da tela na hora
      setProjects(prev => prev.filter(p => p.id_projeto !== id));
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir projeto");
    }
  };

  // Gerenciamento de Participantes
  const handleAddParticipant = (userId) => {
    if (!projectForm.participants.includes(userId)) {
      setProjectForm({
        ...projectForm,
        participants: [...projectForm.participants, userId],
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

  const handleSaveTask = async () => {
    if (!selectedProject || !taskForm.title) return;

    try {
      const isEditing = !!editingTask;
      const url = isEditing
        ? `https://backwebdealer.onrender.com/projetos/tarefas/${editingTask.id}`
        : `https://backwebdealer.onrender.com/${selectedProject.id_projeto}/tarefas`;

      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST", // Patch para status/edit, POST para criar
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskForm.title,
          description: taskForm.description,
          priority: taskForm.priority,
          status: isEditing ? editingTask.status : newTaskColumn
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar tarefa");

      const savedTaskFromDb = await response.json();

      // Mapear para o formato do seu Front-end
      const mappedTask = {
        id: savedTaskFromDb.id_tarefa,
        title: savedTaskFromDb.titulo,
        description: savedTaskFromDb.descricao,
        status: savedTaskFromDb.status,
        priority: savedTaskFromDb.prioridade
      };

      const updatedProjects = projects.map(project => {
        if (project.id_projeto === selectedProject.id_projeto) {
          let newTasks;
          if (isEditing) {
            newTasks = project.tasks.map(t => t.id === mappedTask.id ? mappedTask : t);
          } else {
            newTasks = [...project.tasks, mappedTask];
          }
          return { ...project, tasks: newTasks, progress: calculateProgress(newTasks) };
        }
        return project;
      });

      setProjects(updatedProjects);
      setSelectedProject(updatedProjects.find(p => p.id_projeto === selectedProject.id_projeto));
      setIsTaskDialogOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Erro ao salvar tarefa no banco:", err);
      alert("Erro ao salvar tarefa");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!selectedProject) return;

    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        // CHAMADA PARA O BACKEND (Faltava esta parte)
        const response = await fetch(`https://backwebdealer.onrender.com/projetos/tarefas/${taskId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao deletar tarefa no servidor");

        // Atualização do Estado (UI)
        const updatedProjects = projects.map(project => {
          if (project.id_projeto === selectedProject.id_projeto) {
            const updatedTasks = project.tasks.filter(task => task.id !== taskId);
            return { ...project, tasks: updatedTasks, progress: calculateProgress(updatedTasks) };
          }
          return project;
        });

        setProjects(updatedProjects);
        setSelectedProject(updatedProjects.find(p => p.id_projeto === selectedProject.id_projeto));
      } catch (err) {
        console.error("Erro ao deletar tarefa:", err);
        alert("Não foi possível excluir a tarefa.");
      }
    }
  };

  const moveTask = async (taskId, newStatus) => {
    if (!selectedProject) return;

    try {
      const response = await fetch(`https://backwebdealer.onrender.com/projetos/tarefas/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar status no servidor");

      const updatedProjects = projects.map(project => {
        if (project.id_projeto === selectedProject.id_projeto) {
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

      const currentProj = updatedProjects.find(p => p.id_projeto === selectedProject.id_projeto);
      setSelectedProject(currentProj);

    } catch (err) {
      console.error("Erro ao arrastar tarefa:", err);
      alert("Não foi possível salvar o movimento da tarefa.");
    }
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
                    tasks={selectedProject?.tasks?.filter(
                      task => task.status === columnId
                    ) || []}
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
                      {selectedProject.participants.slice(0, 5).map((participantId, idx) => {
                        const user = usuarios.find(u => u.id_usuario === participantId);
                        const name = user ? user.nome_usuario : "??";
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{name}</span>
                          </div>
                        );
                      })}
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
            <SelectItem value="planning">Planejamento</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Card
            key={project.id_projeto} // Identificador único do banco de dados
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
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleDeleteProject(project.id_projeto) // Referência correta ao banco
                      }
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardDescription className="line-clamp-2">
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
                    {(project.participants || []).length} membros
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
              <Label htmlFor="projectStatus">Status *</Label>
              <Select
                value={projectForm.status}
                onValueChange={(value) =>
                  setProjectForm({ ...projectForm, status: value })
                }
              >
                <SelectTrigger id="projectStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planejamento</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
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