import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Landing() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // Background is handled by body in index.css (Dark Slate + Gradient)
            padding: '2rem',
            textAlign: 'center',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Ambient Background Glows to match the 'Game of Colors' aesthetic */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '30vw',
                height: '30vw',
                background: 'radial-gradient(circle, rgba(58, 134, 255, 0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '40vw',
                height: '40vw',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>

            {/* Main Content Container - enhanced with subtle glass effect but keeping original structure */}
            <div className="animate-fade-in glass-panel" style={{
                maxWidth: '800px',
                width: '100%',
                padding: '4rem 2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1 style={{
                    fontSize: 'clamp(3rem, 10vw, 8rem)',
                    lineHeight: '0.9',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.05em', // Tighter tracking like the reference
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #A0A0A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)' // Inter
                }}>
                    TakeHabit
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-muted)',
                    marginBottom: '3.5rem',
                    maxWidth: '450px',
                    lineHeight: '1.6'
                }}>
                    Construye disciplina. Empieza de cero. <br />
                    <span style={{ color: 'var(--accent)' }}>Sin excusas.</span>
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', width: '100%' }}>
                    <Link to="/register" style={{ width: '100%', maxWidth: '320px' }}>
                        <Button
                            variant="accent"
                            style={{
                                width: '100%',
                                fontSize: '1.1rem',
                                padding: '18px',
                                color: '#FFFFFF',
                                background: 'var(--accent)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: '0 0 20px rgba(58, 134, 255, 0.4)' // Stronger glow
                            }}>
                            EMPEZAR AHORA
                        </Button>
                    </Link>

                    <Link to="/login" style={{
                        color: 'var(--text-muted)',
                        fontSize: '1rem',
                        textDecoration: 'none',
                        padding: '10px',
                        transition: 'color 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                    >
                        Ya tengo cuenta
                    </Link>
                </div>
            </div>

            <footer style={{
                position: 'absolute',
                bottom: '2rem',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                opacity: 0.4,
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
            }}>
                MANTÉN LA RACHA
            </footer>
        </div>
    );
}
