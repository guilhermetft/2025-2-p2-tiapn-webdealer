import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    const { method, url } = req;

    // LISTAR TAREFAS
    if (method === "GET" && url.endsWith("/tarefas")) {
      const { data, error } = await supabase
        .from("tb_tarefas")
        .select("*")
        .order("criacao_tarefa", { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.json(data);
    }

    // CRIAR TAREFA
    if (method === "POST" && url.endsWith("/tarefas")) {
      const {
        titulo,
        prioridade,
        status,
        prazo_tarefa,
        responsavel_tarefa,
      } = req.body;

      const { data: newTask, error } = await supabase
        .from("tb_tarefas")
        .insert([
          {
            titulo_tarefa: titulo,
            prioridade_tarefa: prioridade,
            status_tarefa: status,
            prazo_tarefa,
            responsavel_tarefa,
          },
        ])
        .select();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(newTask[0]);
    }

    // ATUALIZAR TAREFA
    if (method === "PUT" && url.includes("/tarefas/")) {
      const id = url.split("/").pop();
      const { titulo, prioridade, status, prazo_tarefa, responsavel_tarefa } =
        req.body;

      const updates = {};
      if (titulo) updates.titulo_tarefa = titulo;
      if (prioridade) updates.prioridade_tarefa = prioridade;
      if (status) updates.status_tarefa = status;
      if (prazo_tarefa) updates.prazo_tarefa = prazo_tarefa;
      if (responsavel_tarefa) updates.responsavel_tarefa = responsavel_tarefa;

      const { error } = await supabase
        .from("tb_tarefas")
        .update(updates)
        .eq("id_tarefa", id);

      if (error) return res.status(500).json({ error: error.message });
      return res.json({ message: "Tarefa atualizada com sucesso" });
    }

    // DELETAR TAREFA
    if (method === "DELETE" && url.includes("/tarefas/")) {
      const id = url.split("/").pop();

      const { error } = await supabase
        .from("tb_tarefas")
        .delete()
        .eq("id_tarefa", id);

      if (error) return res.status(500).json({ error: error.message });
      return res.json({ message: "Deletado com sucesso" });
    }

    // Se a rota não for reconhecida
    res.status(404).json({ message: "Rota não encontrada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
