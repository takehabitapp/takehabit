import OpenAI from "openai";

export default async function handler(req, res) {
  // Configuración de CORS para desarrollo local opcional
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API Key no configurada en el servidor" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { problem } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un experto coach de disciplina y formación de hábitos."
        },
        {
          role: "user",
          content: `El usuario tiene el siguiente objetivo: "${problem}". Tu tarea es diseñar un hábito estricto y efectivo. RESPONDE EXCLUSIVAMENTE EN FORMATO JSON con la siguiente estructura (no añadas explicaciones fuera del JSON): {"title": "Título del hábito", "dailyAction": "Descripción clara de la acción diaria", "duration": "Duración recomendada", "consequence": "Una consecuencia dura", "tip": "Un consejo práctico"}`
        }
      ],
      response_format: { type: "json_object" }
    });

    res.status(200).json({
      habit: JSON.parse(completion.choices[0].message.content),
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
