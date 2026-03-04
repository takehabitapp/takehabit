import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { Trash2, ArrowLeft } from 'lucide-react';

export default function HabitDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habit, setHabit] = useState(null);

    useEffect(() => {
        const storedHabits = JSON.parse(localStorage.getItem('takehabit_habits') || '[]');
        const found = storedHabits.find(h => h.id.toString() === id);
        if (found) {
            setHabit(found);
        } else {
            // Not found, redirect back
            navigate('/habits');
        }
    }, [id, navigate]);

    const handleDelete = () => {
        if (!window.confirm("¿Seguro que quieres eliminar este hábito?")) return;

        const storedHabits = JSON.parse(localStorage.getItem('takehabit_habits') || '[]');
        const updated = storedHabits.filter(h => h.id.toString() !== id);
        localStorage.setItem('takehabit_habits', JSON.stringify(updated));
        navigate('/habits');
    };

    if (!habit) return <MainLayout><div className="text-center p-10">Cargando...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="animate-fade-in">
                <button
                    onClick={() => navigate('/habits')}
                    style={{
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        fontSize: '0.9rem'
                    }}
                >
                    <ArrowLeft size={16} /> Volver a la lista
                </button>

                <div style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: 'var(--accent)'
                    }}></div>

                    <h1 style={{
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                        color: '#FFFFFF'
                    }}>
                        {habit.title}
                    </h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)'
                        }}>
                            <div className="text-sm uppercase tracking-wider text-muted mb-2">Acción Diaria</div>
                            <div className="text-lg text-white font-medium">{habit.title}</div>
                        </div>

                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)'
                        }}>
                            <div className="text-sm uppercase tracking-wider text-muted mb-2">Fecha de Inicio</div>
                            <div className="text-lg text-white font-medium">
                                {new Date(habit.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)'
                        }}>
                            <div className="text-sm uppercase tracking-wider text-muted mb-2">Estado Hoy</div>
                            <div style={{
                                color: habit.completed ? 'var(--success)' : 'var(--text-muted)',
                                fontWeight: 'bold',
                                fontSize: '1.125rem'
                            }}>
                                {habit.completed ? 'COMPLETADO' : 'PENDIENTE'}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Trash2 size={18} />
                            ELIMINAR HÁBITO
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
