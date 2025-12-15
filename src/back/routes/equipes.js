import dotenv from "dotenv";
dotenv.config();


import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// Conexão com o Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// LISTAR USUÁRIOS
router.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase
    .from("tb_usuario")
    .select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// LISTAR EQUIPES
router.get("/equipes", async (req, res) => {
  const { data, error } = await supabase
    .from("tb_equipes")
    .select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// CRIAR VÍNCULO (MEMBROS)
router.post("/membros", async (req, res) => {
  const { id_usuario, id_equipe } = req.body;

  if (!id_usuario || !id_equipe) {
    return res
      .status(400)
      .json({ error: "Usuário e equipe são obrigatórios." });
  }

  const { error } = await supabase
    .from("tb_membros")
    .insert([
      {
        id_usuario,
        id_equipes: id_equipe,
      },
    ]);

  if (error) {
    console.error("Erro ao salvar no Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Sucesso! Membro vinculado.",
  });
});

// LISTAR MEMBROS COM JOIN
router.get("/membros", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tb_membros")
      .select(`
        *,
        tb_usuario ( * ),
        tb_equipes ( * )
      `);

    if (error) {
      console.error("Erro ao buscar no Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    const listaFormatada = data.map(item => {
      const usuario = item.tb_usuario || {};
      const equipe = item.tb_equipes || {};

      return {
        id_vinculo: item.id || item.id_membros || item.id_membro,
        nome_usuario:
          usuario.nome_usuario || usuario.nome || "Usuário desconhecido",
        email_usuario:
          usuario.email_usuario || usuario.email || "Sem e-mail",
        nome_equipe:
          equipe.titulo_equipe ||
          equipe.nome_equipe ||
          equipe.nome ||
          "Sem equipe",
      };
    });

    res.json(listaFormatada);
  } catch (err) {
    console.error("Erro crítico:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});



// EQUIPE DO USUÁRIO LOGADO
router.get("/usuarios/:id/equipe", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("tb_membros")
    .select(`
      id_equipes,
      tb_equipes (
        id_equipe,
        titulo_equipe
      )
    `)
    .eq("id_usuario", id)
    .single();

  if (error) {
    console.error("Erro ao buscar equipe do usuário:", error.message);
    return res.status(500).json({ error: error.message });
  }

  const equipe = data?.tb_equipes;

  return res.json({
    id_equipe: equipe?.id_equipe ?? data.id_equipes,
    titulo_equipe: equipe?.titulo_equipe ?? "Sem equipe",
    // canal para usar na tabela `mensagens`
    canal: (equipe?.titulo_equipe || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/\s+/g, "-"), 
  });
});


export default router;
