import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{ 
      padding: '1.5rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
        <Activity color="var(--primary-color)" />
        <span>TakeHabit</span>
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login" className="btn btn-ghost">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-primary">Registrarse</Link>
      </div>
    </nav>
  );
}
