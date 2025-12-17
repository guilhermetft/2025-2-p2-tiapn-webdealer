import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// GET → buscar usuários para adicionar em projetos
router.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase
    .from("tb_usuarios")
    .select("id_usuario, nome_usuario")
    .order("nome_usuario", { ascending: true });

  if (error) {
    console.error("Erro Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

export default router;
