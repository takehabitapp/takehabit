import React from 'react';
import { Check } from 'lucide-react';

const HabitCard = ({ habit, onToggle }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '24px',
                backgroundColor: 'var(--glass-bg)', // Always use glass bg as they are incomplete in this view
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.2s ease',
                marginBottom: '1rem',
                justifyContent: 'space-between'
            }}
            className="group hover:border-accent"
        >
            <div style={{ flex: 1 }}>
                <h3
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        margin: 0,
                        color: 'var(--text-main)'
                    }}
                >
                    {habit.title}
                </h3>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle(habit.id);
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid var(--text-muted)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-muted)'
                }}
                className="hover-btn-success"
                title="Marcar como realizado"
            >
                <Check size={20} />
            </button>
        </div>
    );
};

export default HabitCard;
