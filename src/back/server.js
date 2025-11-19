import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 🔹 Rota de teste
app.get("/ping", async (req, res) => {
  const { data, error } = await supabase.from("tb_usuario").select("*").limit(1);

  if (error) return res.status(500).json({ conectado: false, erro: error.message });
  res.json({ conectado: true, exemplo: data });
});

// 🔹 Rota de cadastro de usuário
app.post("/usuarios", async (req, res) => {
  const { nome_usuario, email_usuario, senha_usuario } = req.body;

  if (!nome_usuario || !email_usuario || !senha_usuario) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { data, error } = await supabase
    .from("tb_usuario")
    .insert([{ nome_usuario, email_usuario, senha_usuario }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: data[0] });
});

// 🔹 ROTA DE LOGIN (NOVA)
app.post("/login", async (req, res) => {
  const { email_usuario, senha_usuario } = req.body;

  if (!email_usuario || !senha_usuario) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  // Buscar usuário por email
  const { data: usuarios, error } = await supabase
    .from("tb_usuario")
    .select("*")
    .eq("email_usuario", email_usuario)
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Se não encontrou usuário
  if (!usuarios || usuarios.length === 0) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  const usuario = usuarios[0];

  // Validar senha
  if (usuario.senha_usuario !== senha_usuario) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  res.status(200).json({
    message: "Login realizado com sucesso!",
    usuario,
  });
});

// 🔸 Iniciar servidor
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Servidor rodando na porta ${port}`));
