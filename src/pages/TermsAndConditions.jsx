import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function TermsAndConditions() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4rem 24px',
            backgroundColor: 'var(--bg-core)',
            color: 'var(--text-main)'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        fontWeight: 900,
                        fontSize: '48px',
                        letterSpacing: '-2px',
                        color: '#F5F5F5',
                        margin: 0
                    }}>
                        TakeHabit
                    </h1>
                </Link>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', justifyContent: 'center', marginTop: '1rem' }}>
                    <Link to="/dashboard" style={{
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textDecoration: 'none'
                    }}>
                        INICIO
                    </Link>
                    <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--border)' }}></div>
                    <Link to="/habits" style={{
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textDecoration: 'none'
                    }}>
                        HÁBITOS
                    </Link>
                </div>
            </header>

            <main className="glass-panel" style={{
                maxWidth: '800px',
                width: '100%',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                lineHeight: '1.6'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Términos y Condiciones</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Última actualización: 6 de marzo de 2026</p>

                <p>Estos Términos y Condiciones regulan el acceso y uso de TakeHabit, disponible en https://takehabit.com.</p>
                <p>Al utilizar el servicio aceptas estos términos.</p>

                <h3 style={{ marginTop: '2rem' }}>1. Descripción del Servicio</h3>
                <p>TakeHabit es una aplicación web diseñada para ayudar a los usuarios a crear, seguir y gestionar hábitos personales y objetivos de productividad con pequeños cambios.</p>
                <p>El servicio puede actualizarse, modificarse o suspenderse en cualquier momento.</p>

                <h3 style={{ marginTop: '2rem' }}>2. Registro de Usuario</h3>
                <p>Para utilizar determinadas funcionalidades es necesario crear una cuenta.</p>
                <p>El usuario se compromete a:</p>
                <ul>
                    <li>Proporcionar información veraz.</li>
                    <li>Mantener la confidencialidad de su contraseña.</li>
                    <li>No compartir su cuenta con terceros.</li>
                </ul>
                <p>El usuario es responsable de toda actividad realizada con su cuenta.</p>

                <h3 style={{ marginTop: '2rem' }}>3. Uso Aceptable</h3>
                <p>Los usuarios se compromete a no utilizar la plataforma para:</p>
                <ul>
                    <li>Actividades ilegales.</li>
                    <li>Distribuir malware o software malicioso.</li>
                    <li>Intentar acceder a sistemas sin autorización.</li>
                    <li>Interferir con el funcionamiento del servicio.</li>
                    <li>Copiar o explotar el software sin autorización.</li>
                </ul>
                <p>Nos reservamos el derecho de suspender cuentas que incumplan estas normas.</p>

                <h3 style={{ marginTop: '2rem' }}>4. Propiedad Intelectual</h3>
                <p>Todo el contenido de TakeHabit, incluyendo diseño, código, logotipos, funcionalidades y contenido visual, pertenece a TakeHabit o a sus licenciantes y está protegido por leyes de propiedad intelectual.</p>
                <p>No se permite copiar, modificar o redistribuir sin autorización.</p>

                <h3 style={{ marginTop: '2rem' }}>5. Disponibilidad del Servicio</h3>
                <p>Aunque nos esforzamos por mantener la plataforma disponible, no garantizamos disponibilidad continua, ausencia de errores o funcionamiento ininterrumpido.</p>
                <p>Podemos realizar mantenimiento o actualizaciones en cualquier momento.</p>

                <h3 style={{ marginTop: '2rem' }}>6. Limitación de Responsabilidad</h3>
                <p>TakeHabit se proporciona "tal cual". No somos responsables de pérdidas de datos, interrupciones del servicio o daños indirectos derivados del uso de la plataforma, en la medida permitida por la ley aplicable.</p>

                <h3 style={{ marginTop: '2rem' }}>7. Terminación de Cuenta</h3>
                <p>Podemos suspender o cancelar cuentas si:</p>
                <ul>
                    <li>se violan estos términos</li>
                    <li>se detecta uso fraudulento</li>
                    <li>se compromete la seguridad del servicio</li>
                </ul>
                <p>Los usuarios pueden eliminar su cuenta en cualquier momento.</p>

                <h3 style={{ marginTop: '2rem' }}>8. Cambios en los Términos</h3>
                <p>Podemos modificar estos términos cuando sea necesario. Las versiones actualizadas se publicarán en la web con la fecha correspondiente. El uso continuado del servicio implica la aceptación de los cambios.</p>

                <h3 style={{ marginTop: '2rem' }}>9. Legislación Aplicable</h3>
                <p>Estos términos se rigen por la legislación aplicable del titular del servicio. Cualquier disputa se resolverá ante los tribunales competentes de dicha jurisdicción.</p>

                <h3 style={{ marginTop: '2rem' }}>10. Contacto</h3>
                <p>Para consultas legales o soporte puedes escribir a: takehabit.app@gmail.com</p>
            </main>

            <footer style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" style={{ padding: '12px 32px' }}>
                        INICIO
                    </Button>
                </Link>
            </footer>
        </div>
    );
}
