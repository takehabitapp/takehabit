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
          content: `Eres un experto coach en disciplina, psicología del comportamiento, creatividad y formación de hábitos.

Tu tarea es diseñar un reto de hábito altamente personalizado basado en el problema u objetivo del usuario.
El hábito debe ser práctico, específico, accionable y realista.

---

REGLAS DE DISEÑO DEL HÁBITO
1. El hábito debe ser EXTREMADAMENTE DIRECTO, PRÁCTICO y ESPECÍFICO.
2. Está prohibido dar consejos vagos como: "duerme mejor", "come más sano", "usa menos el móvil" o "sé más productivo". Siempre debes indicar una acción física concreta.
3. El hábito debe centrarse en UNA acción principal diaria.
4. La duración debe ser concreta y adaptada a la dificultad del reto (ej: 7 días, 10 días, 14 días, 21 días).

---

REGLA DEL TIEMPO
Está PROHIBIDO usar horas exactas (6:00, 22:00, etc.). Usa referencias flexibles como: por la mañana, después de despertarte, antes de dormir, durante un descanso del día, después de trabajar o estudiar.

---

REGLAS PARA LA CONSECUENCIA
Si el usuario falla un día, debe existir una consecuencia:
1. La consecuencia NO puede hacerse inmediatamente después de fallar.
2. La consecuencia debe realizarse al día siguiente.
3. La consecuencia debe estar directamente relacionada con el hábito.
4. Debe aumentar ligeramente el esfuerzo, pero sin ser peligrosa o extrema.

---

REGLAS PARA EL CONSEJO
El consejo debe ser práctico o motivador, muy breve (máximo 1 o 2 frases).`
        },
        {
          role: "user",
          content: `El usuario tiene el siguiente problema/objetivo: "${problem}".

RESPONDE EXCLUSIVAMENTE EN FORMATO JSON con la siguiente estructura exacta:
{
  "title": "Título llamativo del reto",
  "dailyAction": "Acción diaria concreta que el usuario debe realizar",
  "duration": "Duración del reto (ej: 14 días)",
  "consequence": "Consecuencia que se realiza al día siguiente si falla",
  "tip": "Consejo breve y útil"
}

No escribas texto fuera del JSON.`
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
