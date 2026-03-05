export async function generateHabits(goal) {
    const response = await fetch(
        "https://sremvevezmfbroqyxkon.supabase.co/functions/v1/super-action",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                goal: goal
            })
        }
    )

    const data = await response.json()
    return data
}
