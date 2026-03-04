import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar as CalendarIcon, Trophy, Flame } from 'lucide-react';

export default function DailyTracking() {
    const { id } = useParams();
    const [completed, setCompleted] = useState(false);

    // Mock data based on ID (simplified)
    const habit = {
        id,
        title: 'Meditar 10 minutos',
        description: 'Enfócate en tu respiración y despeja tu mente.',
        streak: 5,
        totalCompletions: 42,
        history: Array.from({ length: 30 }, (_, i) => Math.random() > 0.3) // Random boolean for last 30 days
    };

    const toggleCompletion = () => {
        setCompleted(!completed);
    };

    return (
        <DashboardLayout>
            <div className="animate-fade-in">
                <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={16} /> Volver al Dashboard
                </Link>

                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>{habit.title}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>{habit.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Badge icon={<Flame size={18} />} value={`${habit.streak} días`} label="Racha" color="#f59e0b" />
                        <Badge icon={<Trophy size={18} />} value={habit.totalCompletions} label="Total" color="#8b5cf6" />
                    </div>
                </header>

                <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>{completed ? '¡Hábito Completado!' : '¿Completaste tu hábito hoy?'}</h2>

                    <button
                        onClick={toggleCompletion}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: completed ? 'var(--accent-color)' : 'var(--surface-hover)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'var(--transition)',
                            transform: completed ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: completed ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none'
                        }}
                    >
                        <CheckCircle size={40} color={completed ? 'white' : 'var(--text-muted)'} />
                    </button>

                    <p style={{ color: 'var(--text-muted)' }}>
                        {completed ? '¡Gran trabajo! Sigue así.' : 'Marca el círculo para registrar tu progreso.'}
                    </p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <CalendarIcon size={20} color="var(--primary-color)" />
                        <h3 style={{ margin: 0 }}>Historial (Últimos 30 días)</h3>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {habit.history.map((done, index) => (
                            <div
                                key={index}
                                title={done ? 'Completado' : 'No completado'}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '4px',
                                    backgroundColor: done ? 'var(--accent-color)' : 'var(--surface-hover)',
                                    opacity: done ? 0.8 + (Math.random() * 0.2) : 1
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function Badge({ icon, value, label, color }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: color, marginBottom: '0.25rem' }}>
                {icon}
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{value}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</span>
        </div>
    );
}
