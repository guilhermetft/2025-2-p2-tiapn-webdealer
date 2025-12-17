// src/back/api/cadastro.js
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    // 🔹 ROTA DE TESTE
    if (req.method === "GET" && req.url.endsWith("/ping")) {
      const { data, error } = await supabase
        .from("tb_usuario")
        .select("*")
        .limit(1);

      if (error)
        return res.status(500).json({ conectado: false, erro: error.message });

      return res.json({ conectado: true, exemplo: data });
    }

    // CADASTRO DE USUÁRIO
    if (req.method === "POST" && req.url.endsWith("/usuarios")) {
      const { nome_usuario, email_usuario, senha_usuario } = req.body;

      if (!nome_usuario || !email_usuario || !senha_usuario) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email_usuario)) {
        return res.status(400).json({ error: "E-mail inválido." });
      }

      const senhaHash = await bcrypt.hash(senha_usuario, 10);

      const { data, error } = await supabase
        .from("tb_usuario")
        .insert([{ nome_usuario, email_usuario, senha_usuario: senhaHash }])
        .select()
        .single();

      if (error) {
        if (error.message.includes("duplicate")) {
          return res.status(400).json({ error: "E-mail já cadastrado." });
        }
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        usuario: data,
      });
    }

    // Aqui você pode adicionar GET, PUT, DELETE para /usuarios/:id e login
    // usando if (req.method === "...") e req.url.includes("/usuarios")

    return res.status(404).json({ message: "Rota não encontrada" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
