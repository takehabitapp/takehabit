import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, X, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('choice'); // 'choice', 'logout', 'delete'
    const profileRef = useRef(null);
    const email = localStorage.getItem('takehabit_email') || 'usuario@takehabit.com';

    // Click outside to close profile dropdown
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
        setShowModal(false);
        navigate('/');
    };

    const handleDeleteAccount = () => {
        // Here you would normally call an API to delete the account
        localStorage.removeItem('takehabit_email');
        setShowModal(false);
        navigate('/');
    };

    const openModal = () => {
        setModalType('choice');
        setShowModal(true);
        setShowProfile(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-core)', display: 'flex', flexDirection: 'column' }}>
            {/* Modal Overlay */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '24px'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            style={{
                                backgroundColor: 'var(--bg-core)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '2.5rem',
                                maxWidth: '400px',
                                width: '100%',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                textAlign: 'center'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {modalType === 'choice' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Gestión de Cuenta</h3>
                                    <Button
                                        variant="primary"
                                        onClick={() => setModalType('logout')}
                                        style={{ width: '100%', display: 'flex', gap: '10px' }}
                                    >
                                        <LogOut size={18} /> CERRAR SESIÓN
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => setModalType('delete')}
                                        style={{ width: '100%', display: 'flex', gap: '10px' }}
                                    >
                                        <Trash2 size={18} /> ELIMINAR CUENTA
                                    </Button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                                    >
                                        CANCELAR
                                    </button>
                                </div>
                            )}

                            {modalType === 'logout' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <AlertCircle size={48} color="var(--accent)" style={{ margin: '0 auto' }} />
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Quiero cerrar mi sesión</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <Button variant="accent" onClick={handleLogout}>SÍ</Button>
                                        <Button variant="primary" onClick={() => setShowModal(false)}>NO</Button>
                                    </div>
                                </div>
                            )}

                            {modalType === 'delete' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <AlertCircle size={48} color="var(--error)" style={{ margin: '0 auto' }} />
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Quiere eliminar mi cuenta</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Esta acción es permanente y se perderán todos tus hábitos.</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <Button variant="danger" onClick={handleDeleteAccount}>SÍ</Button>
                                        <Button variant="primary" onClick={() => setShowModal(false)}>NO</Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                onClick={openModal}
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
