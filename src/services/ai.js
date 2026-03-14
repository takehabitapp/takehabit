export async function generateHabits(goal) {
    try {
        const response = await fetch('/api/generate-habit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ problem: goal })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.habit;
    } catch (error) {
        console.error("Error en la llamada al backend proxy:", error);
        throw error;
    }
}
