import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {label && (
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>
                    {label}
                </label>
            )}
            <input
                style={{
                    backgroundColor: 'var(--surface)',
                    border: error ? '1px solid var(--error)' : '1px solid var(--border)',
                    color: 'var(--text-main)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    width: '100%',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                }}
                {...props}
            />
            {error && (
                <span style={{ color: 'var(--error)', fontSize: '12px' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
