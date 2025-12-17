"use client";

import { useState } from "react";
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

  const [requests] = useState([
    {
      id: "1",
      title: "Digitalizar documentos contábeis 2024",
      description: "Digitalizar e indexar todos os documentos contábeis do exercício 2024",
      requester: "Ana Paula Silva",
      priority: "high",
      status: "pending",
      date: "2025-10-18",
    },
    {
      id: "2",
      title: "Expandir capacidade de armazenamento",
      description: "Adicionar 20TB de capacidade nos servidores de backup",
      requester: "Carlos Eduardo Santos",
      priority: "medium",
      status: "approved",
      date: "2025-10-17",
    },
    {
      id: "3",
      title: "Otimização sistema de busca",
      description: "Melhorar velocidade de busca e indexação de documentos",
      requester: "Ricardo Ferreira",
      priority: "high",
      status: "approved",
      date: "2025-10-16",
    },
    {
      id: "4",
      title: "Atualizar política de retenção",
      description: "Revisar e atualizar política de retenção de documentos",
      requester: "Juliana Oliveira",
      priority: "low",
      status: "pending",
      date: "2025-10-19",
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-orange-600" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-orange-100 text-orange-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high": return "alta";
      case "medium": return "média";
      case "low": return "baixa";
      default: return priority;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved": return "aprovada";
      case "pending": return "pendente";
      case "rejected": return "rejeitada";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Solicitações de Tarefas</h1>
        <p className="text-muted-foreground">Envie e revise solicitações de tarefas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enviar Nova Solicitação</CardTitle>
          <CardDescription>Preencha o formulário abaixo para solicitar uma nova tarefa</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Tarefa</Label>
                <Input id="title" placeholder="Digite o título da tarefa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select>
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
                placeholder="Forneça uma descrição detalhada da tarefa"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignee">Atribuir Para</Label>
                <Select>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Selecione um membro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ana">Ana Paula Silva</SelectItem>
                    <SelectItem value="carlos">Carlos Eduardo Santos</SelectItem>
                    <SelectItem value="juliana">Juliana Oliveira</SelectItem>
                    <SelectItem value="ricardo">Ricardo Ferreira</SelectItem>
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
                        {getPriorityLabel(request.priority)}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusLabel(request.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Solicitado por: {request.requester}</span>
                    <span>•</span>
                    <span>{new Date(request.date).toLocaleDateString("pt-BR")}</span>
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