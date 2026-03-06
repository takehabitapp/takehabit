import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, X } from 'lucide-react';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);
    const email = localStorage.getItem('takehabit_email') || 'usuario@takehabit.com';

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('takehabit_email');
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-core)', display: 'flex', flexDirection: 'column' }}>
            {/* Absolute Minimalist Navbar */}
            <header style={{
                position: 'relative',
                zIndex: 50,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '800px',
                width: '100%',
                margin: '0 auto',
                marginBottom: '2rem'
            }}>
                {/* Profile Top Left */}
                <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 50 }} ref={profileRef}>
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        style={{
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: showProfile ? 'var(--surface)' : 'transparent',
                            border: showProfile ? '1px solid var(--border)' : '1px solid transparent',
                            transition: 'all 0.2s'
                        }}
                    >
                        {showProfile ? <X size={20} /> : <User size={20} />}
                    </button>

                    {showProfile && (
                        <div className="glass-panel" style={{
                            position: 'absolute',
                            top: '50px',
                            left: '0',
                            width: '260px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Conectado como</div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link to="/privacy-policy" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', padding: '0.5rem 0' }} onClick={() => setShowProfile(false)}>Políticas de Privacidad</Link>
                                <Link to="/terms-and-conditions" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', padding: '0.5rem 0' }} onClick={() => setShowProfile(false)}>Términos y Condiciones</Link>
                            </div>

                            <button
                                onClick={handleLogout}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--error)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    width: '100%'
                                }}
                            >
                                <LogOut size={16} />
                                CERRAR SESIÓN
                            </button>
                        </div>
                    )}
                </div>

                {/* Logo Centered Top */}
                <div style={{ fontWeight: 900, fontSize: '48px', letterSpacing: '-2px', marginBottom: '8px', color: '#F5F5F5', textAlign: 'center' }}>
                    TakeHabit
                </div>

                {/* Dashboard / Nav Link below Logo */}
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                    {location.pathname !== '/' && (
                        <>
                            <Link to="/dashboard" style={{
                                color: location.pathname === '/dashboard' ? 'var(--text-main)' : 'var(--text-muted)',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                INICIO
                            </Link>

                            <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--border)' }}></div>

                            <Link to="/habits" style={{
                                color: location.pathname === '/habits' ? 'var(--text-main)' : 'var(--text-muted)',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                HÁBITOS
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main style={{ flex: 1, padding: '0 24px 48px 24px', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
