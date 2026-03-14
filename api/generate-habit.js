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
          content: `Eres un experto coach de disciplina, creatividad y formación de hábitos.
          
REGLAS PARA EL RETO:
1. El hábito a diseñar debe ser EXTREMADAMENTE DIRECTO, PRÁCTICO y ESPECÍFICO. No des consejos vagos, da órdenes de acciones físicas concretas.
2. Está PROHIBIDO usar metas difusas como "duerme mejor", "come sano" o "reduce el uso del móvil". Debes dar el paso físico exacto para lograrlo.
3. Ejemplos de estilo directo:
  - "Deja el móvil apagado en la habitación más alejada a la que duermas desde las 22:00." (En lugar de "duerme mejor")
  - "Prueba un deporte diferente cada semana practicándolo al menos 20 min."
  - "Haz 10 min de movilidad o estiramientos en el suelo cada vez que termines de trabajar."
  - "Durante 10 días, reemplaza 15 minutos de redes sociales por lectura obligatoria."
4. La duración debe ser concreta, pero variable (adaptada al peso del reto, ej. 7 días, 14 días, 21 días).

REGLAS PARA EL CASTIGO (consecuencia):
Elige ALEATORIAMENTE uno de estos castigos o inventa uno muy similar de este estilo para que no se repitan:
  - Donar dinero a una causa que no apoyes.
  - Hacer 100 burpees o 200 sentadillas.
  - Levantarte una hora antes durante 3 días.
  - Prohibirte redes sociales durante 48 horas.
  - Escribir públicamente en redes o amigos que fallaste el reto.
  - Hacer una tarea doméstica pesada extra.
  - No consumir nada de café o azúcar durante 3 días.

REGLAS PARA EL CONSEJO (tip):
El consejo debe ser EXTREMADAMENTE BREVE (1 o 2 frases máximo), útil y motivador, explicando cómo hacerlo fácil o por qué es importante (ej: "Empieza poco a poco. La clave no es la intensidad sino la consistencia").`
        },
        {
          role: "user",
          content: `El usuario tiene el siguiente problema/objetivo: "${problem}".  RESPONDE EXCLUSIVAMENTE EN FORMATO JSON con la estructura: {"title": "Título llamativo", "dailyAction": "Acción diaria específica", "duration": "Duración (ej: 14 días)", "consequence": "Castigo duro", "tip": "Consejo ultra breve"}`
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
