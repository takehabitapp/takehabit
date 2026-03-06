import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../lib/supabase';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            if (data.user) {
                localStorage.setItem('takehabit_email', data.user.email);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Email o contraseña incorrectos. Si no tienes cuenta, debes registrarte.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-auth">
            <div className="animate-fade-in">
                <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>Entrar</h1>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" variant="primary" loading={loading} style={{ marginTop: '1rem', color: '#F5F5F5', borderColor: '#F5F5F5' }}>
                        ENTRAR
                    </Button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    ¿No tienes cuenta? <Link to="/register" style={{ color: '#F5F5F5', textDecoration: 'underline' }}>Regístrate</Link>
                </div>

                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Volver</Link>
                </div>
            </div>
        </div>
    );
}
