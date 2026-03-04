import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Activity, Calendar } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <PlusCircle size={20} />, label: 'Nuevo Hábito (IA)', path: '/create-habit' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                borderRight: '1px solid var(--border-color)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 0,
                height: '100vh',
                backgroundColor: 'var(--surface-color)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                    <Activity color="var(--primary-color)" size={28} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>TakeHabit</span>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                color: location.pathname === item.path ? 'var(--text-main)' : 'var(--text-muted)',
                                backgroundColor: location.pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'var(--transition)'
                            }}
                        >
                            {item.icon}
                            <span style={{ fontWeight: 500 }}>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        color: 'var(--text-muted)',
                        marginTop: 'auto',
                        borderRadius: 'var(--radius-md)',
                        transition: 'var(--transition)'
                    }}
                    className="hover:text-primary"
                >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
