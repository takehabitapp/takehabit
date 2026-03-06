import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function PrivacyPolicy() {
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
            </header>

            <main className="glass-panel" style={{
                maxWidth: '800px',
                width: '100%',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                lineHeight: '1.6'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Política de Privacidad</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Última actualización: 6 de marzo de 2026</p>

                <p>Bienvenido a TakeHabit. En esta Política de Privacidad explicamos cómo recopilamos, utilizamos y protegemos la información personal de los usuarios que utilizan la aplicación web disponible en https://takehabit.com.</p>
                <p>El uso de nuestros servicios implica la aceptación de esta Política de Privacidad.</p>

                <h3 style={{ marginTop: '2rem' }}>1. Datos que Recopilamos</h3>
                <p>Podemos recopilar los siguientes tipos de información:</p>
                <h4 style={{ color: 'var(--text-muted)' }}>1.1 Información proporcionada por el usuario</h4>
                <p>Cuando creas una cuenta o utilizas la aplicación:</p>
                <ul>
                    <li>Nombre o alias</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Contraseña cifrada</li>
                    <li>Información sobre hábitos, objetivos o progreso introducida por el usuario</li>
                </ul>

                <h4 style={{ color: 'var(--text-muted)' }}>1.2 Información recopilada automáticamente</h4>
                <p>Cuando accedes a la webapp podemos recopilar:</p>
                <ul>
                    <li>Dirección IP</li>
                    <li>Tipo de navegador</li>
                    <li>Sistema operativo</li>
                    <li>Páginas visitadas</li>
                    <li>Fecha y hora de acceso</li>
                    <li>Información de uso de la aplicación</li>
                </ul>

                <h4 style={{ color: 'var(--text-muted)' }}>1.3 Cookies y tecnologías similares</h4>
                <p>Utilizamos cookies y tecnologías similares para:</p>
                <ul>
                    <li>Recordar preferencias</li>
                    <li>Mejorar el rendimiento del servicio</li>
                    <li>Analizar el uso de la plataforma</li>
                </ul>
                <p>Puedes configurar tu navegador para rechazar cookies, aunque algunas funciones pueden dejar de funcionar correctamente.</p>

                <h3 style={{ marginTop: '2rem' }}>2. Finalidad del Tratamiento de los Datos</h3>
                <p>Utilizamos la información recopilada para:</p>
                <ul>
                    <li>Proporcionar y mantener el servicio</li>
                    <li>Gestionar cuentas de usuario</li>
                    <li>Permitir el seguimiento de hábitos y progreso</li>
                    <li>Mejorar la funcionalidad y experiencia del usuario</li>
                    <li>Detectar fraude o uso indebido del servicio</li>
                    <li>Cumplir obligaciones legales</li>
                </ul>

                <h3 style={{ marginTop: '2rem' }}>3. Base Legal del Tratamiento (RGPD)</h3>
                <p>Procesamos los datos personales bajo las siguientes bases legales:</p>
                <ul>
                    <li>Ejecución de un contrato: para proporcionar el servicio solicitado.</li>
                    <li>Interés legítimo: para mejorar la aplicación y prevenir abusos.</li>
                    <li>Consentimiento: cuando el usuario acepta el uso de cookies o determinadas funcionalidades.</li>
                </ul>

                <h3 style={{ marginTop: '2rem' }}>4. Conservación de los Datos</h3>
                <p>Los datos personales se conservarán:</p>
                <ul>
                    <li>Mientras el usuario mantenga una cuenta activa</li>
                    <li>Hasta que el usuario solicite su eliminación</li>
                    <li>Durante el tiempo necesario para cumplir obligaciones legales</li>
                </ul>

                <h3 style={{ marginTop: '2rem' }}>5. Compartición de Datos</h3>
                <p>No vendemos ni alquilamos datos personales.</p>
                <p>Podemos compartir información con proveedores tecnológicos necesarios para operar el servicio, por ejemplo:</p>
                <ul>
                    <li>Servicios de hosting</li>
                    <li>Infraestructura en la nube</li>
                    <li>herramientas de análisis</li>
                    <li>proveedores de pago (si aplica)</li>
                </ul>
                <p>Estos proveedores solo procesan datos bajo nuestras instrucciones y con medidas de seguridad adecuadas.</p>

                <h3 style={{ marginTop: '2rem' }}>6. Derechos del Usuario (GDPR)</h3>
                <p>Los usuarios tienen derecho a:</p>
                <ul>
                    <li>Acceder a sus datos personales</li>
                    <li>Rectificar datos incorrectos</li>
                    <li>Solicitar la eliminación de datos</li>
                    <li>Limitar el tratamiento</li>
                    <li>Solicitar portabilidad de datos</li>
                    <li>Retirar el consentimiento</li>
                </ul>
                <p>Para ejercer estos derechos puedes escribir a: takehabit.app@gmail.com</p>
                <p>También tienes derecho a presentar una reclamación ante la autoridad de protección de datos correspondiente. En España: Agencia Española de Protección de Datos (AEPD)</p>

                <h3 style={{ marginTop: '2rem' }}>7. Seguridad de los Datos</h3>
                <p>Implementamos medidas técnicas y organizativas razonables para proteger los datos personales contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún sistema en internet es completamente seguro.</p>

                <h3 style={{ marginTop: '2rem' }}>8. Privacidad de Menores</h3>
                <p>TakeHabit no está dirigido a menores de 13 años. No recopilamos deliberadamente información personal de menores. Si detectamos que se han recopilado datos de menores sin consentimiento parental, eliminaremos dicha información.</p>

                <h3 style={{ marginTop: '2rem' }}>9. Cambios en la Política de Privacidad</h3>
                <p>Podemos actualizar esta Política de Privacidad periódicamente. Cuando se realicen cambios significativos, notificaremos a los usuarios mediante la web o correo electrónico.</p>

                <h3 style={{ marginTop: '2rem' }}>10. Contacto</h3>
                <p>Si tienes preguntas sobre esta Política de Privacidad puedes contactarnos en: takehabit.app@gmail.com</p>
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
