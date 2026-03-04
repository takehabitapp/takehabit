import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HabitsList() {
    const navigate = useNavigate();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const storedHabits = JSON.parse(localStorage.getItem('takehabit_habits') || '[]');
        setHabits(storedHabits);
    }, []);

    const handleDelete = (id, e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        if (!window.confirm("¿Seguro que quieres eliminar este hábito? Perderás tu progreso en él.")) return;

        const updated = habits.filter(h => h.id !== id);
        setHabits(updated);
        localStorage.setItem('takehabit_habits', JSON.stringify(updated));
    };

    return (
        <MainLayout>
            <div className="animate-fade-in text-center">
                <h1 style={{ marginBottom: '2rem', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
                    MIS <span style={{ color: 'var(--accent)' }}>HÁBITOS</span> ACTIVOS
                </h1>

                {habits.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No tienes hábitos activos actualmente.</p>
                ) : (
                    <div className="flex flex-col gap-4 max-w-md mx-auto">
                        {habits.map(habit => (
                            <div
                                key={habit.id}
                                onClick={() => navigate(`/habits/${habit.id}`)}
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--surface)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF' }}>{habit.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                        Creado el: {new Date(habit.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => handleDelete(habit.id, e)}
                                    style={{
                                        padding: '8px',
                                        color: 'var(--text-muted)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--error)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                                    title="Eliminar hábito"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
