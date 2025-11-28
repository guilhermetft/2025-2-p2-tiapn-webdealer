import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// 🔹 ROTA DE TESTE
app.get("/ping", async (req, res) => {
  const { data, error } = await supabase
    .from("tb_usuario")
    .select("*")
    .limit(1);

  if (error) {
    return res
      .status(500)
      .json({ conectado: false, erro: error.message });
  }

  res.json({ conectado: true, exemplo: data });
});

// CADASTRO DE USUÁRIO
app.post("/usuarios", async (req, res) => {
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

  res.status(201).json({
    message: "Usuário cadastrado com sucesso!",
    usuario: data,
  });
});

// LISTAR USUÁRIOS
app.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase
    .from("tb_usuario")
    .select("id_usuario, nome_usuario, email_usuario");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// BUSCAR USUÁRIO POR ID
app.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("tb_usuario")
    .select("id_usuario, nome_usuario, email_usuario")
    .eq("id_usuario", id)
    .single();

  if (error) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  res.json(data);
});

// ATUALIZAR USUÁRIO
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome_usuario, email_usuario, senha_usuario } = req.body;

  let dadosAtualizados = {};
  if (nome_usuario) dadosAtualizados.nome_usuario = nome_usuario;
  if (email_usuario) dadosAtualizados.email_usuario = email_usuario;
  if (senha_usuario) dadosAtualizados.senha_usuario = await bcrypt.hash(senha_usuario, 10);

  const { data, error } = await supabase
    .from("tb_usuario")
    .update(dadosAtualizados)
    .eq("id_usuario", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({
    message: "Usuário atualizado com sucesso!",
    usuario: data,
  });
});

// REMOVER USUÁRIO
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tb_usuario")
    .delete()
    .eq("id_usuario", id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "Usuário removido com sucesso!" });
});

// LOGIN
app.post("/login", async (req, res) => {
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

  const senhaValida = await bcrypt.compare(
    senha_usuario,
    usuario.senha_usuario
  );

  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  res.json({
    message: "Login realizado com sucesso!",
    usuario: {
      id_usuario: usuario.id_usuario,
      nome_usuario: usuario.nome_usuario,
      email_usuario: usuario.email_usuario,
    },
  });
});

// 🔸 INICIAR SERVIDOR
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`✅ Servidor rodando na porta ${port}`)
);