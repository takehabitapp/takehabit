import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const MidnightTimer = ({ onMidnight }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setHours(24, 0, 0, 0); // Set to next midnight
            
            const diffMs = tomorrow - now;
            
            if (diffMs <= 1000) {
                // If we hit midnight (with 1s leeway), trigger the callback
                // Small delay to ensure it doesn't trigger multiple times in the same millisecond
                setTimeout(() => {
                    if (onMidnight) onMidnight();
                }, 1000);
            }

            const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diffMs / 1000 / 60) % 60);
            const seconds = Math.floor((diffMs / 1000) % 60);

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [onMidnight]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '9999px',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            width: 'fit-content',
            margin: '0 auto 2rem auto'
        }}>
            <Clock size={16} />
            <span>Reinicio en: <span style={{ fontFamily: 'monospace', color: 'var(--text-main)' }}>{timeLeft}</span></span>
        </div>
    );
};

export default MidnightTimer;
