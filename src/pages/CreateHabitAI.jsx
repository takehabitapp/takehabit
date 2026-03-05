import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { generateHabits } from '../services/ai';
import { supabase } from '../lib/supabase';

export default function CreateHabitAI() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedHabits, setGeneratedHabits] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setError(null);

        // Check active habits limit
        const existing = JSON.parse(localStorage.getItem('takehabit_habits') || '[]');
        if (existing.length >= 2) {
            alert("Límite de disciplina alcanzado. Máximo 2 hábitos activos. Elimina uno para continuar.");
            return;
        }

        setLoading(true);

        try {
            const result = await generateHabits(prompt);
            setGeneratedHabits([result]);
        } catch (err) {
            console.error("Error generating habit:", err);
            setError("Error al conectar con la IA. Revisa tu API Key de OpenAI.");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async () => {
        const habit = generatedHabits[0];
        const existing = JSON.parse(localStorage.getItem('takehabit_habits') || '[]');

        const newHabit = {
            id: Date.now(),
            title: habit.title,
            dailyAction: habit.dailyAction,
            duration: habit.duration,
            consequence: habit.consequence,
            tip: habit.tip,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Save to LocalStorage (MVP Persistence / Offline fallack)
        const updatedList = [...existing, newHabit];
        localStorage.setItem('takehabit_habits', JSON.stringify(updatedList));

        // Save to Supabase if logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            try {
                await supabase.from('habits').insert([
                    {
                        user_id: session.user.id,
                        title: habit.title,
                        description: habit.dailyAction,
                        category: 'AI Generated',
                        difficulty: 'Hard',
                        duration_weeks: 3,
                        daily_goal: habit.dailyAction,
                        tips: [habit.tip],
                        motivation: habit.consequence
                    }
                ]);
            } catch (err) {
                console.error("Error saving to Supabase:", err);
            }
        }

        localStorage.setItem('takehabit_streak', '0');
        localStorage.setItem('takehabit_last_active', new Date().toISOString());
        navigate('/dashboard');
    };

    return (
        <MainLayout>
            <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>EL DIAGNÓSTICO</h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                        Dinos qué quieres cambiar. La IA generará un hábito estricto basado en tu objetivo.
                    </p>
                </header>

                {error && (
                    <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                {!generatedHabits ? (
                    <form onSubmit={handleGenerate} style={{ width: '100%' }}>
                        <textarea
                            maxLength={150}
                            rows={3}
                            placeholder="Ej: Procrastino demasiado y quiero ponerme en forma..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            style={{
                                width: '100%',
                                marginBottom: '2rem',
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-main)',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                resize: 'none'
                            }}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            style={{ width: '100%', color: '#F5F5F5', borderColor: '#F5F5F5' }}
                            disabled={!prompt.trim()}
                        >
                            GENERAR DISCIPLINA CON IA
                        </Button>
                    </form>
                ) : (
                    <div style={{ width: '100%', maxWidth: '700px' }} className="animate-fade-in">
                        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem', textTransform: 'uppercase' }}>PROPUESTA DE LA IA</h2>

                        <div style={{
                            padding: '2rem',
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '2rem',
                            textAlign: 'left'
                        }}>
                            {generatedHabits.map((habit, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div>
                                        <div className="text-muted text-xs uppercase tracking-wider mb-1">Nombre del hábito</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{habit.title}</div>
                                    </div>

                                    <div>
                                        <div className="text-muted text-xs uppercase tracking-wider mb-1">Qué hacer cada día</div>
                                        <div style={{ color: 'var(--text-main)' }}>{habit.dailyAction}</div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <div className="text-muted text-xs uppercase tracking-wider mb-1">Duración</div>
                                            <div style={{ color: 'var(--accent)' }}>{habit.duration}</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '12px', backgroundColor: 'rgba(211, 47, 47, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--error)' }}>
                                        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--error)' }}>Si no cambias...</div>
                                        <div style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>"{habit.consequence}"</div>
                                    </div>

                                    <div>
                                        <div className="text-muted text-xs uppercase tracking-wider mb-1">Consejo</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{habit.tip}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button onClick={handleAccept} variant="accent" style={{ width: '100%', color: '#F5F5F5', borderColor: '#F5F5F5' }}>
                                GUARDAR HÁBITO
                            </Button>

                            <button
                                onClick={() => setGeneratedHabits(null)}
                                style={{ color: 'var(--text-muted)', fontSize: '0.9rem', width: '100%', padding: '1rem' }}
                            >
                                Replantear objetivo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
