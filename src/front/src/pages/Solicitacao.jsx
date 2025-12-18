"use client";

import { useState, useEffect } from "react"; // Adicionado useEffect
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
  // --- ESTADOS PARA O FORMULÁRIO ---
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  
  // --- ESTADO PARA A LISTA (Vindo do Banco) ---
  const [requests, setRequests] = useState([]);

  const API_URL = "https://SEU-PROJETO-NO-RENDER.onrender.com/solicitacoes";

  // 1. BUSCAR DADOS DO BACK-END
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Mapeamos os nomes do banco para os nomes que o front usa
        const formattedData = data.map(item => ({
          id: item.id_tarefa,
          title: item.titulo_tarefa,
          description: item.descricao_tarefa,
          requester: item.responsavel_tarefa || "Não atribuído",
          priority: item.prioridade_tarefa,
          status: item.status_tarefa,
          date: item.prazo_tarefa || item.criacao_tarefa
        }));
        setRequests(formattedData);
      })
      .catch((err) => console.error("Erro ao carregar:", err));
  }, []);

  // 2. ENVIAR PARA O BACK-END
  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaSolicitacao = {
      titulo: title,
      descricao: description,
      prioridade: priority,
      responsavel_tarefa: assignee,
      prazo_tarefa: date ? date.toISOString() : null,
      solicitante: "Usuário Logado" // Aqui você pode pegar o nome do usuário
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaSolicitacao),
      });

      if (response.ok) {
        const itemSalvo = await response.json();
        // Atualiza a lista na tela sem precisar dar F5
        setRequests([{
          id: itemSalvo.id_tarefa,
          title: itemSalvo.titulo_tarefa,
          description: itemSalvo.descricao_tarefa,
          requester: itemSalvo.responsavel_tarefa,
          priority: itemSalvo.prioridade_tarefa,
          status: itemSalvo.status_tarefa,
          date: itemSalvo.prazo_tarefa
        }, ...requests]);

        // Limpa o formulário
        setTitle("");
        setDescription("");
        setDate(null);
        alert("Solicitação enviada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  // --- FUNÇÕES DE ESTILO (Mantidas) ---
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
        <h1>Solicitações de Tarefas</h1>
        <p className="text-muted-foreground">Envie e revise solicitações</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enviar Nova Solicitação</CardTitle>
          <CardDescription>Preencha o formulário abaixo para solicitar uma nova tarefa</CardDescription>
        </CardHeader>
        <CardContent>
          {/* ADICIONADO O ONSUBMIT */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nome da Solicitação</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Digite o título da tarefa" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select onValueChange={setPriority} value={priority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
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
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Forneça uma descrição detalhada da tarefa"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignee">Atribuir Para</Label>
                <Select onValueChange={setAssignee} value={assignee}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Selecione um membro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ana Paula Silva">Ana Paula Silva</SelectItem>
                    <SelectItem value="Carlos Eduardo Santos">Carlos Eduardo Santos</SelectItem>
                    <SelectItem value="Juliana Oliveira">Juliana Oliveira</SelectItem>
                    <SelectItem value="Ricardo Ferreira">Ricardo Ferreira</SelectItem>
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

      {/* LISTAGEM DE TAREFAS (Mantida, mas agora usa dados do banco) */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="mt-1">
                  {getStatusIcon(request.status)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{request.title}</p>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Solicitado para: {request.requester}</span>
                    <span>•</span>
                    <span>{request.date ? new Date(request.date).toLocaleDateString("pt-BR") : "Sem prazo"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}