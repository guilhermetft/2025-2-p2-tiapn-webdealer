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
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
