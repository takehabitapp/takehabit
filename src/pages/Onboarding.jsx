import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Droplets, BookOpen, Footprints, Flame, Timer, Plus } from 'lucide-react';
import Button from '../components/Button';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const navigate = useNavigate();

    const nextStep = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            navigate('/dashboard');
        }
    };

    const progress = `${step}/5`;

    const habitSuggestions = [
        { id: 1, label: 'Beber un vaso de agua', icon: <Droplets size={18} /> },
        { id: 2, label: 'Leer 2 páginas', icon: <BookOpen size={18} /> },
        { id: 3, label: 'Caminar 5 minutos', icon: <Footprints size={18} /> },
        { id: 4, label: 'Meditar 1 minuto', icon: <Timer size={18} /> },
        { id: 5, label: 'Crear hábito personalizado', icon: <Plus size={18} /> },
    ];

    const containerVariants = {
        initial: { opacity: 0, scale: 0.95, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 1.05, y: -10 },
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-core)',
            backgroundImage: 'var(--bg-gradient)',
            color: 'var(--text-main)',
            padding: 'var(--spacing-lg)',
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Top Section */}
            <div style={{
                textAlign: 'center',
                paddingTop: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <h2 style={{
                    fontSize: '1rem',
                    letterSpacing: '0.3em',
                    color: 'var(--text-main)',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    margin: 0
                }}>TAKEHABIT</h2>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        {progress}
                    </div>
                    {/* Progress Bar Container */}
                    <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        maxWidth: '200px'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--accent) 0%, #34D399 100%)',
                                boxShadow: '0 0 10px var(--accent-glow)'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Middle Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '240px',
                                height: '240px',
                                margin: '0 auto 2.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'var(--glass-bg)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--glass-border)',
                                position: 'relative',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    width: '150%',
                                    height: '150%',
                                    background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                                    opacity: 0.3,
                                    zIndex: 0
                                }} />

                                <div style={{ display: 'flex', gap: '24px', zIndex: 1, alignItems: 'flex-end' }}>
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <Droplets size={32} color="var(--accent)" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, 15, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', transform: 'translateY(-20px)' }}
                                    >
                                        <BookOpen size={40} color="var(--accent)" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <Footprints size={32} color="var(--accent)" />
                                    </motion.div>
                                </div>
                            </div>
                            <h1 className="text-2xl mb-4" style={{ letterSpacing: '-0.02em' }}>Todo empieza pequeño</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.5', maxWidth: '300px', margin: '0 auto' }}>
                                Los grandes cambios en la vida suelen comenzar con pequeñas acciones repetidas cada día.
                            </p>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            <div className="glass-panel" style={{
                                width: '100%',
                                height: '260px',
                                margin: '0 auto 2.5rem',
                                padding: '2rem',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}>
                                <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
                                                <stop offset="100%" stopColor="var(--accent)" />
                                            </linearGradient>
                                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="var(--accent-glow)" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>

                                        {/* Area under the path */}
                                        <motion.path
                                            d="M 0,90 Q 25,85 50,60 T 100,10 L 100,90 L 0,90 Z"
                                            fill="url(#areaGradient)"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.3 }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                        />

                                        <motion.path
                                            d="M 0,90 Q 25,85 50,60 T 100,10"
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />

                                        {[0, 20, 40, 60, 80, 100].map((dot, i) => {
                                            const x = dot;
                                            const y = 90 - (Math.pow(dot / 100, 1.8) * 80);
                                            return (
                                                <motion.circle
                                                    key={i}
                                                    cx={x}
                                                    cy={y}
                                                    r="2.5"
                                                    fill="var(--accent)"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.2) }}
                                                    style={{ filter: 'drop-shadow(0 0 5px var(--accent))' }}
                                                />
                                            );
                                        })}
                                    </svg>
                                    <div style={{ position: 'absolute', bottom: '-25px', right: '0', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>DÍAS / ACCIONES</div>
                                    <div style={{ position: 'absolute', left: '-40px', top: '0', transform: 'rotate(-90deg) translateX(-100%)', transformOrigin: 'left top', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>PROGRESO</div>
                                </div>
                            </div>
                            <h1 className="text-2xl mb-4">Pequeñas acciones, grandes resultados</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>Las pequeñas acciones repetidas cada día generan resultados con el tiempo.</p>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '100%',
                                margin: '0 auto 2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.8rem'
                            }}>
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass-panel"
                                    style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-md)', width: '220px', border: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1rem', letterSpacing: '0.05em' }}>ACCIÓN PEQUEÑA</div>
                                </motion.div>

                                <motion.div initial={{ height: 0 }} animate={{ height: 24 }} transition={{ delay: 0.3 }}>
                                    <ArrowRight style={{ transform: 'rotate(90deg)' }} color="var(--text-muted)" size={20} />
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="glass-panel"
                                    style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-md)', width: '220px', border: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1rem', letterSpacing: '0.05em' }}>REPETICIÓN</div>
                                </motion.div>

                                <motion.div initial={{ height: 0 }} animate={{ height: 24 }} transition={{ delay: 0.7 }}>
                                    <ArrowRight style={{ transform: 'rotate(90deg)' }} color="var(--text-muted)" size={20} />
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="glass-panel"
                                    style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-md)', width: '220px', border: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1rem', letterSpacing: '0.05em' }}>HÁBITO</div>
                                </motion.div>

                                <motion.div initial={{ height: 0 }} animate={{ height: 24 }} transition={{ delay: 1.1 }}>
                                    <ArrowRight style={{ transform: 'rotate(90deg)' }} color="var(--text-muted)" size={20} />
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1.3 }}
                                    className="glass-panel"
                                    style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-md)', width: '220px', background: 'var(--accent)', border: 'none', boxShadow: '0 0 20px var(--accent-glow)' }}
                                >
                                    <div style={{ color: 'white', fontWeight: '900', fontSize: '1.1rem', letterSpacing: '0.05em' }}>RESULTADOS</div>
                                </motion.div>
                            </div>
                            <h1 className="text-2xl mb-4">Tu cerebro ama los hábitos pequeños</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Cuando una acción es fácil, es más probable que la repitas.<br />
                                <strong>La repetición convierte las acciones en hábitos.</strong>
                            </p>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            <div className="glass-panel" style={{
                                width: '100%',
                                margin: '0 auto 2.5rem',
                                padding: '2rem',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.2rem',
                                border: '1px solid rgba(255,255,255,0.05)',
                                background: 'rgba(255,255,255,0.02)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: 'spring', damping: 12 }}
                                        style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px var(--accent-glow)' }}
                                    >
                                        <Check size={18} color="white" strokeWidth={4} />
                                    </motion.div>
                                    <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: '500' }}>Beber agua</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.8, type: 'spring', damping: 12 }}
                                        style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px var(--accent-glow)' }}
                                    >
                                        <Check size={18} color="white" strokeWidth={4} />
                                    </motion.div>
                                    <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: '500' }}>Leer 2 páginas</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}></div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Caminar 5 minutos</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}></div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Meditar 1 minuto</span>
                                </div>
                            </div>
                            <h1 className="text-2xl mb-4">Para eso existe TAKEHABIT</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>Crea micro-hábitos simples que puedas completar cada día.</p>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            <h1 className="text-2xl mb-4">Empieza tu primer micro-hábito</h1>
                            <p className="text-muted mb-8" style={{ fontSize: '1.1rem' }}>Elige algo pequeño que puedas hacer hoy.</p>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.8rem',
                                marginBottom: '2.5rem'
                            }}>
                                {habitSuggestions.map((habit) => (
                                    <motion.div
                                        key={habit.id}
                                        whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.06)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedHabit(habit.id)}
                                        style={{
                                            padding: '1.2rem 1.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid',
                                            borderColor: selectedHabit === habit.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                            backgroundColor: selectedHabit === habit.id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                                            color: selectedHabit === habit.id ? 'white' : 'var(--text-main)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.3s ease, background-color 0.3s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <span style={{ color: selectedHabit === habit.id ? 'var(--accent)' : 'var(--text-muted)' }}>
                                                {habit.icon}
                                            </span>
                                            <span style={{ fontWeight: selectedHabit === habit.id ? '700' : '400' }}>{habit.label}</span>
                                        </div>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            border: '2px solid',
                                            borderColor: selectedHabit === habit.id ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedHabit === habit.id ? 'var(--accent)' : 'transparent'
                                        }}>
                                            {selectedHabit === habit.id && <Check size={12} color="white" strokeWidth={4} />}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            <div style={{
                marginTop: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                paddingBottom: 'var(--spacing-md)'
            }}>
                <Button
                    onClick={nextStep}
                    variant="accent"
                    style={{
                        width: '100%',
                        padding: '20px',
                        fontSize: '1.1rem',
                        fontWeight: '800',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: step === 5 ? '0 10px 30px var(--accent-glow)' : '0 10px 20px rgba(0,0,0,0.2)',
                        letterSpacing: '0.05em'
                    }}
                >
                    {step === 5 ? 'CREAR MI PRIMER HÁBITO' : 'CONTINUAR'}
                </Button>

                {step === 5 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="ghost"
                            style={{
                                width: '100%',
                                color: 'var(--text-muted)',
                                padding: '10px',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}
                        >
                            Inicio
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
