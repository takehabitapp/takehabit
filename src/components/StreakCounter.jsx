import React from 'react';

const StreakCounter = ({ count }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 w-full text-center" style={{ margin: '0 auto' }}>
            <div
                style={{
                    fontSize: '6rem',
                    fontWeight: '800',
                    lineHeight: '1',
                    color: 'var(--text-main)',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {count}
            </div>
            <div
                style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    letterSpacing: '0.2em',
                    color: 'var(--text-muted)',
                    marginTop: '1rem',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                }}
            >
                Días seguidos
            </div>
        </div>
    );
};

export default StreakCounter;
