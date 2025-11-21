import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// 🔹 MIDDLEWARE PARA PROTEGER ROTAS
function autenticar(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const token = header.split(" ")[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

// 🔹 ROTA DE TESTE
app.get("/ping", async (req, res) => {
  const { data, error } = await supabase.from("tb_usuario").select("*").limit(1);

  if (error) return res.status(500).json({ conectado: false, erro: error.message });
  res.json({ conectado: true, exemplo: data });
});

// 🔹 CADASTRO DE USUÁRIO (com HASH)
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
    .select();

  if (error) {
    if (error.message.includes("duplicate")) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: data[0] });
});

// 🔹 LOGIN COM JWT
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

  // Validar senha
  const senhaValida = await bcrypt.compare(senha_usuario, usuario.senha_usuario);

  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  // Gerar token JWT
  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome_usuario,
      email: usuario.email_usuario,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({
    message: "Login realizado com sucesso!",
    token,
    usuario,
  });
});

// 🔹 ROTA PROTEGIDA DE EXEMPLO
app.get("/dashboard", autenticar, (req, res) => {
  res.json({
    message: "Acesso autorizado! Usuário logado.",
    usuario: req.usuario,
  });
});

// 🔸 INICIAR SERVIDOR
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Servidor rodando na porta ${port}`));