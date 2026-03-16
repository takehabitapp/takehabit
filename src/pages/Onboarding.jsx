import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Droplets, BookOpen, Footprints, Flame, Timer, Plus } from 'lucide-react';
import Button from '../components/Button';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const navigate = useNavigate();

    const nextStep = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            navigate('/dashboard');
        }
    };

    const problemsToImprove = [
        { id: 1, label: 'Uso demasiado el móvil' },
        { id: 2, label: 'No hago suficiente deporte' },
        { id: 3, label: 'Me cuesta concentrarme' },
        { id: 4, label: 'Leo muy poco' },
        { id: 5, label: 'Me cuesta mantener rutinas' },
        { id: 6, label: 'Generar hábito personalizado', isCustom: true },
    ];

    const containerVariants = {
        initial: { opacity: 0, scale: 0.98, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 1.02, y: -10 },
    };

    // Style constants for reuse
    const titleStyle = {
        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
        lineHeight: '0.9',
        letterSpacing: '-0.05em',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #A0A0A0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: '800',
        textTransform: 'uppercase',
        margin: '0 auto'
    };

    // Full screen container that blends with the app's core design
    const mainContainerStyle = {
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
        overflow: 'hidden',
    };

    const contentWrapperStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'transparent', // Unified background as requested
    };

    return (
        <div style={mainContainerStyle}>
            {/* Top Section */}
            <div style={{
                textAlign: 'center',
                paddingTop: '3rem',
                marginBottom: 'var(--spacing-xl)',
            }}>
                <h2 style={titleStyle}>TAKEHABIT</h2>
            </div>

            {/* Middle Content */}
            <div style={contentWrapperStyle}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '2rem',
                                marginBottom: '3rem'
                            }}>
                                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                                    <Droplets size={50} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-glow))' }} />
                                </motion.div>
                                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                                    <BookOpen size={60} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-glow))' }} />
                                </motion.div>
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                                    <Footprints size={50} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-glow))' }} />
                                </motion.div>
                            </div>
                            <h1 className="text-2xl mb-4 font-bold">Todo empieza pequeño</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
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
                            transition={{ duration: 0.4 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '100%',
                                height: '240px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '40px',
                                padding: '1.5rem 2.5rem 3.5rem 3.5rem', // More space for labels
                                marginBottom: '2.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'visible'
                            }}>
                                <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                                        {/* Exponential Curve Line */}
                                        <motion.path
                                            d="M 0,100 Q 50,100 100,0"
                                            fill="none"
                                            stroke="var(--accent)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                            style={{ filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' }}
                                        />
                                        
                                        {/* Exponential Dots (x^2) */}
                                        {[0, 20, 40, 60, 80, 100].map((dot, i) => {
                                            const x = dot;
                                            // y = 100 - (x/100)^2 * 100
                                            const y = 100 - (Math.pow(dot / 100, 2) * 100);
                                            return (
                                                <motion.circle
                                                    key={i}
                                                    cx={x}
                                                    cy={y}
                                                    r="4"
                                                    fill="var(--accent)"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.2), type: 'spring' }}
                                                    style={{ filter: 'drop-shadow(0 0 5px var(--accent))' }}
                                                />
                                            );
                                        })}
                                    </svg>
                                    {/* Labels integrated into the coordinate space */}
                                    <div style={{ position: 'absolute', bottom: '-22px', right: '0', fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.1em' }}>TIEMPO</div>
                                    <div style={{ position: 'absolute', left: '-35px', top: '0', transform: 'rotate(-90deg) translateX(-100%)', transformOrigin: 'left top', fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.1em' }}>PROGRESO</div>
                                </div>
                            </div>
                            <h1 className="text-2xl mb-4 font-bold">Pequeñas acciones, grandes resultados</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                                Las pequeñas acciones repetidas cada día generan resultados con el tiempo.
                            </p>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '2.5rem'
                            }}>
                                {['Acción pequeña', 'Repetición', 'Hábito'].map((text, i) => (
                                    <React.Fragment key={text}>
                                        <div className="glass-panel" style={{ padding: '1rem 2rem', borderRadius: '24px', width: '220px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                            <div style={{ color: 'var(--accent)', fontWeight: '700', letterSpacing: '0.05em', fontSize: '0.9rem' }}>{text.toUpperCase()}</div>
                                        </div>
                                        {i < 2 && <ArrowRight style={{ transform: 'rotate(90deg)', opacity: 0.3 }} color="var(--text-muted)" size={20} />}
                                    </React.Fragment>
                                ))}
                                <ArrowRight style={{ transform: 'rotate(90deg)', opacity: 0.3 }} color="var(--text-muted)" size={20} />
                                <div className="glass-panel" style={{ padding: '1.2rem 2rem', borderRadius: '24px', width: '220px', backgroundColor: 'var(--accent)', border: 'none', boxShadow: '0 0 20px var(--accent-glow)' }}>
                                    <div style={{ color: 'white', fontWeight: '900', letterSpacing: '0.05em', fontSize: '1.1rem' }}>RESULTADOS</div>
                                </div>
                            </div>
                            <h1 className="text-2xl mb-4 font-bold">Tu cerebro ama los hábitos pequeños</h1>
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
                            transition={{ duration: 0.4 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div className="glass-panel" style={{
                                padding: '2.5rem',
                                borderRadius: '40px',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                marginBottom: '2.5rem',
                                background: 'rgba(255, 255, 255, 0.03)'
                            }}>
                                {[
                                    { text: 'Beber agua', checked: true, delay: 0.2 },
                                    { text: 'Leer 2 páginas', checked: true, delay: 0.4 },
                                    { text: 'Caminar 5 minutos', checked: false },
                                    { text: 'Meditar 1 minuto', checked: false }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {item.checked ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: item.delay, type: 'spring' }}
                                                style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Check size={18} color="white" strokeWidth={4} />
                                            </motion.div>
                                        ) : (
                                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.1)' }} />
                                        )}
                                        <span style={{ color: item.checked ? 'white' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: item.checked ? '600' : '400' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-2xl mb-4 font-bold">Para eso existe TAKEHABIT</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Crea micro-hábitos simples que puedas completar cada día.</p>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            style={{ textAlign: 'center' }}
                        >
                            <h1 className="text-2xl mb-4 font-bold">Empieza tu primer micro-hábito</h1>
                            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                                Elige algo pequeño que puedas mejorar hoy.
                            </p>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.8rem',
                                width: '100%',
                            }}>
                                {problemsToImprove.map((problem) => (
                                    <motion.div
                                        key={problem.id}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedProblem(problem.id)}
                                        style={{
                                            padding: '1.2rem 1.5rem',
                                            borderRadius: '24px',
                                            border: '1px solid',
                                            borderColor: selectedProblem === problem.id ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                                            backgroundColor: selectedProblem === problem.id ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                                            color: selectedProblem === problem.id ? 'white' : 'var(--text-main)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                        }}
                                    >
                                        <span style={{ fontWeight: selectedProblem === problem.id ? '700' : '400', color: problem.isCustom ? 'var(--accent)' : 'inherit' }}>
                                            {problem.label}
                                        </span>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            border: '2px solid',
                                            borderColor: selectedProblem === problem.id ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedProblem === problem.id ? 'var(--accent)' : 'transparent',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {selectedProblem === problem.id && <Check size={12} color="white" strokeWidth={4} />}
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
                paddingBottom: '3rem'
            }}>
                <Button
                    onClick={nextStep}
                    disabled={step === 5 && !selectedProblem}
                    variant="accent"
                    style={{
                        width: '100%',
                        padding: '1.2rem',
                        fontSize: '1.1rem',
                        fontWeight: '800',
                        backgroundColor: step === 5 && !selectedProblem ? 'rgba(255, 255, 255, 0.05)' : 'var(--accent)',
                        color: step === 5 && !selectedProblem ? 'var(--text-muted)' : 'white',
                        border: 'none',
                        borderRadius: '24px',
                        boxShadow: step === 5 && !selectedProblem ? 'none' : '0 10px 30px rgba(16, 185, 129, 0.3)',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        opacity: step === 5 && !selectedProblem ? 0.5 : 1,
                        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                >
                    {step === 5 ? 'Continuar' : 'Continuar'}
                </Button>

                {step === 5 && (
                    <Button
                        onClick={() => navigate('/dashboard')}
                        variant="ghost"
                        style={{
                            width: '100%',
                            color: 'var(--text-muted)',
                            padding: '0.5rem',
                            fontWeight: '600'
                        }}
                    >
                        Inicio
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
