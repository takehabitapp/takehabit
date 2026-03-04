import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
    console.error('Falta la variable de entorno de OpenAI. Revisa tu archivo .env')
}

export const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Necesario para llamar a OpenAI desde el frontend (Vite)
})
