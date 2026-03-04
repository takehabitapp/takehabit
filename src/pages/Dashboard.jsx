import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import StreakCounter from '../components/StreakCounter';
import HabitCard from '../components/HabitCard';
import Button from '../components/Button';
import confetti from 'canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [habits, setHabits] = useState([]);
    const [streak, setStreak] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Basic Persistence Logic
        const storedHabits = JSON.parse(localStorage.getItem('takehabit_habits') || 'null');
        const storedStreak = parseInt(localStorage.getItem('takehabit_streak') || '0', 10);
        const lastActive = localStorage.getItem('takehabit_last_active');

        if (!storedHabits || storedHabits.length === 0) {
            // No habits, redirect to onboarding if strict flow, or show empty state
            // Strict flow:
            // navigate('/create-habit');
            // Let's allow empty state for better UX if they deleted everything or just arrived
        } else {
            setHabits(storedHabits);
        }

        // Strict Streak Logic Placeholder (Simple version)
        // In a real app, we compare dates.
        // For now we just load the number.
        setStreak(storedStreak);
        setLoading(false);
    }, []);

    const handleToggle = (id) => {
        const updatedHabits = habits.map(h => {
            if (h.id === id) {
                return { ...h, completed: true }; // One-way toggle for strictness (or toggleable)
            }
            return h;
        });
        setHabits(updatedHabits);
        localStorage.setItem('takehabit_habits', JSON.stringify(updatedHabits));

        // Check completion
        const allCompleted = updatedHabits.every(h => h.completed);
        if (allCompleted) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FABEFF', '#00C853', '#ffffff']
            });

            // Increment streak if not already incremented today
            // simplified logic: just +1 and save
            const newStreak = streak + 1;
            setStreak(newStreak);
            localStorage.setItem('takehabit_streak', newStreak.toString());
            localStorage.setItem('takehabit_last_active', new Date().toISOString());
        }
    };

    const allDone = habits.length > 0 && habits.every(h => h.completed);

    if (loading) return <MainLayout><div className="text-center p-10">Cargando...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="animate-fade-in">
                <StreakCounter count={streak} />

                {/* Section: Today's Tasks */}
                {!allDone && (
                    <div style={{ margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-main)',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.03em',
                            borderBottom: '1px solid var(--border)',
                            paddingBottom: '0.5rem'
                        }}>
                            HOY
                        </h2>

                        {habits.length === 0 ? (
                            <div className="text-center py-10 border border-dashed border-gray-700 rounded-lg">
                                <p className="mb-4 text-muted">No tienes hábitos activos.</p>
                                <Button
                                    variant="accent"
                                    onClick={() => navigate('/create-habit')}
                                    style={{ color: '#F5F5F5', borderColor: '#F5F5F5' }}
                                >
                                    CREAR HÁBITO
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {habits.filter(h => !h.completed).map(habit => (
                                    <HabitCard
                                        key={habit.id}
                                        habit={habit}
                                        onToggle={handleToggle}
                                    />
                                ))}

                                {habits.length < 2 && (
                                    <div style={{ marginTop: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>Nuevo Hábito</div>
                                        <button
                                            onClick={() => navigate('/create-habit')}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                border: '1px solid #FFFFFF',
                                                backgroundColor: 'transparent',
                                                color: '#FFFFFF',
                                                fontSize: '1.5rem',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease',
                                                opacity: 0.8
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.opacity = '1';
                                                e.target.style.transform = 'scale(1.1)';
                                                e.target.style.boxShadow = '0 0 10px rgba(255,255,255,0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.opacity = '0.8';
                                                e.target.style.transform = 'scale(1)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                            title="Añadir otro hábito"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {allDone && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            color: 'var(--success)',
                            letterSpacing: '-0.03em'
                        }}>
                            DISCIPLINA EN ACCIÓN.
                        </h2>
                        <div style={{
                            padding: '1.5rem',
                            color: '#FFFFFF',
                            fontSize: '1rem',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--surface)',
                            display: 'inline-block'
                        }}>
                            <p style={{ marginBottom: '0.5rem' }}>Has cumplido todas tus tareas de hoy.</p>
                            <p style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Vuelve mañana. No rompas la racha.</p>
                        </div>

                        {habits.length < 2 && (
                            <div style={{ marginTop: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>Nuevo Hábito</div>
                                <button
                                    onClick={() => navigate('/create-habit')}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        border: '1px solid #FFFFFF',
                                        backgroundColor: 'transparent',
                                        color: '#FFFFFF',
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease',
                                        opacity: 0.8
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.opacity = '1';
                                        e.target.style.transform = 'scale(1.1)';
                                        e.target.style.boxShadow = '0 0 10px rgba(255,255,255,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.opacity = '0.8';
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    title="Añadir otro hábito"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Debug / Reset for MVP testing */}
                <div style={{ marginTop: '4rem', opacity: 0.3, textAlign: 'center' }}>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{ fontSize: '10px', textDecoration: 'underline' }}
                    >
                        [RESET APP DATA]
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
