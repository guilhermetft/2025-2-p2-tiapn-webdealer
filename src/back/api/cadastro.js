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

      if (error) return res.status(500).json({ conectado: false, erro: error.message });

      return res.json({ conectado: true, exemplo: data });
    }

    // CADASTRO DE USUÁRIO
    if (req.method === "POST" && req.url.endsWith("/usuarios")) {
      const { nome_usuario, email_usuario, senha_usuario } = req.body;

      if (!nome_usuario || !email_usuario || !senha_usuario) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
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

    // LOGIN DE USUÁRIO
    if (req.method === "POST" && req.url.endsWith("/login")) {
      const { email_usuario, senha_usuario } = req.body;

      if (!email_usuario || !senha_usuario) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
      }

      const { data: usuarios, error } = await supabase
        .from("tb_usuario")
        .select("*")
        .eq("email_usuario", email_usuario)
        .limit(1);

      if (error) return res.status(500).json({ error: error.message });
      if (!usuarios || usuarios.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const usuario = usuarios[0];
      const senhaValida = await bcrypt.compare(senha_usuario, usuario.senha_usuario);

      if (!senhaValida) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      return res.json({
        message: "Login realizado com sucesso!",
        usuario: {
          id_usuario: usuario.id_usuario,
          nome_usuario: usuario.nome_usuario,
          email_usuario: usuario.email_usuario,
        },
      });
    }

    return res.status(404).json({ message: "Rota não encontrada" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
