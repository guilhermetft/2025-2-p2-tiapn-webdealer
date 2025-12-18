"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function TaskRequest() {
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [requests, setRequests] = useState([]);

  const API_BASE = "https://backwebdealer.onrender.com/solicitacoes";
  const USUARIOS_URL = `${API_BASE}/usuarios`;

  // 1. Buscar dados iniciais
  useEffect(() => {
    // Buscar Usuários
    fetch(USUARIOS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar usuários");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Erro front usuários:", err));

    // Buscar Solicitações
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map(item => {
          // Busca o nome do usuário correspondente ao ID que veio do banco
          const userObj = usuarios.find(u => u.id_usuario.toString() === item.responsavel_tarefa?.toString());
          
          return {
            id: item.id_tarefa,
            title: item.titulo_tarefa,
            description: item.descricao_tarefa,
            // Exibe o nome se encontrar, senão exibe o ID ou "Não atribuído"
            requester: userObj ? userObj.nome_usuario : (item.responsavel_tarefa || "Não atribuído"),
            priority: item.prioridade_tarefa,
            status: item.status_tarefa,
            date: item.prazo_tarefa || item.criacao_tarefa
          };
        });
        setRequests(formattedData);
      })
      .catch((err) => console.error("Erro front solicitações:", err));
  }, [usuarios]); // Recalcula a lista de nomes quando 'usuarios' for carregado

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaSolicitacao = {
      titulo: title,
      descricao: description,
      prioridade: priority,
      responsavel_tarefa: assignee, // Aqui vai o ID (String) que o back dará parseInt
      prazo_tarefa: date ? date.toISOString() : null
    };

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaSolicitacao),
      });

      if (response.ok) {
        const itemSalvo = await response.json();
        
        // Buscar nome do usuário para a atualização imediata da lista na tela
        const userObj = usuarios.find(u => u.id_usuario.toString() === itemSalvo.responsavel_tarefa?.toString());

        setRequests([{
          id: itemSalvo.id_tarefa,
          title: itemSalvo.titulo_tarefa,
          description: itemSalvo.descricao_tarefa,
          requester: userObj ? userObj.nome_usuario : itemSalvo.responsavel_tarefa,
          priority: itemSalvo.prioridade_tarefa,
          status: itemSalvo.status_tarefa,
          date: itemSalvo.prazo_tarefa
        }, ...requests]);

        // Limpar formulário
        setTitle("");
        setDescription("");
        setPriority("");
        setAssignee("");
        setDate(null);
        alert("Solicitação enviada com sucesso!");
      } else {
        const errorData = await response.json();
        alert("Erro ao enviar: " + errorData.error);
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  // Funções de estilo
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-orange-600" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-orange-100 text-orange-800";
      default: return "bg-orange-100 text-orange-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Solicitações de Tarefas</h1>
        <p className="text-muted-foreground">Envie e revise solicitações</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enviar Nova Solicitação</CardTitle>
          <CardDescription>Preencha o formulário abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nome da Solicitação</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select onValueChange={setPriority} value={priority} required>
                  <SelectTrigger><SelectValue placeholder="Prioridade" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignee">Atribuir Para</Label>
                <Select onValueChange={setAssignee} value={assignee} required>
                  <SelectTrigger><SelectValue placeholder="Selecione um membro" /></SelectTrigger>
                  <SelectContent>
                    {usuarios.map((user) => (
                      <SelectItem key={user.id_usuario} value={user.id_usuario.toString()}>
                        {user.nome_usuario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prazo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? new Date(date).toLocaleDateString("pt-BR") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button type="submit" className="w-full">Enviar Solicitação</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Solicitações Recentes</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="mt-1">{getStatusIcon(request.status)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{request.title}</p>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Para: {request.requester} • {request.date ? new Date(request.date).toLocaleDateString("pt-BR") : "Sem prazo"}
                  </div>
                </div>
              </div>
            ))}
            {requests.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-4">Carregando solicitações...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}