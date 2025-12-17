import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
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
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
