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

//Rota de cadastro de usuário
app.post("/usuarios", async (req, res) => {
  const { nome_usuario, email_usuario, senha_usuario } = req.body;

  // Validação simples
  if (!nome_usuario || !email_usuario || !senha_usuario) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Inserir no Supabase
  const { data, error } = await supabase
    .from("tb_usuario")
    .insert([{ nome_usuario, email_usuario, senha_usuario }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: data[0] });
});

// 🔸 Iniciar servidor
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Servidor rodando na porta ${port}`));
