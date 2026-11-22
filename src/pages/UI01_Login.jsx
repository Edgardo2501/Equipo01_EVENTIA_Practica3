import React, { useState } from 'react';
import { Lock, Mail, UserCheck } from 'lucide-react';
import { USUARIOS_DEMO } from '../data/mockData';

/**
 * UI-01: Inicio de Sesión Institucional (RF-001, RNF-012 / COMP-01)
 */
export default function UI01_Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('edgardo.flores@alumno.buap.mx');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailNorm = correo.trim().toLowerCase();
    if (!emailNorm.endsWith('@alumno.buap.mx') && !emailNorm.endsWith('@correo.buap.mx')) {
      setError('Acceso restringido: ingresa un correo institucional válido (@alumno.buap.mx o @correo.buap.mx).');
      return;
    }
    const found = USUARIOS_DEMO.find((u) => u.correo === emailNorm) || {
      id_usuario: 'USR-CUSTOM',
      nombre: emailNorm.split('@')[0],
      correo: emailNorm,
      matricula: '202500000',
      rol: emailNorm.endsWith('@correo.buap.mx') ? 'Coordinación' : 'Participante',
    };
    setError('');
    onLoginSuccess(found);
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span className="badge badge-blue">UI-01 · COMP-01 (Acceso Institucional)</span>
          <h1 style={{ color: '#003B5C', marginTop: '0.5rem', fontSize: '1.5rem' }}>
            Iniciar sesión en EVENTIA
          </h1>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Utiliza tu cuenta universitaria BUAP para inscribirte o gestionar eventos.
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="correo">Correo institucional</label>
            <div style={{ position: 'relative' }}>
              <input
                id="correo"
                type="email"
                className="input"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="nombre.apellido@alumno.buap.mx"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Lock size={16} /> Entrar a la plataforma
          </button>
        </form>

        <div style={{ marginTop: '1.4rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.6rem', fontWeight: 600 }}>
            Acceso rápido de demostración por rol (RF-001):
          </p>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {USUARIOS_DEMO.map((u) => (
              <button
                key={u.id_usuario}
                type="button"
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between', fontSize: '0.84rem' }}
                onClick={() => onLoginSuccess(u)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <UserCheck size={15} /> {u.rol}: {u.nombre}
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>{u.correo}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
