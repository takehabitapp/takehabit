import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('takehabit_email', email);
            setLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="container-auth">
            <div className="animate-fade-in">
                <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>Entrar</h1>

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
