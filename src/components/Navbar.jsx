import React from 'react';
import { Calendar, LogIn, PlusCircle, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ vistaActual, setVistaActual, usuario, onLogout, pendientesCount }) {
  return (
    <header className="navbar">
      <div className="brand" onClick={() => setVistaActual('UI-02')}>
        <span className="brand-badge">BUAP</span>
        <div>
          <span className="brand-title">EVENTIA</span>
          <span className="brand-sub">Gestión de Eventos Universitarios · Demo P3</span>
        </div>
      </div>

      <nav className="nav-links" aria-label="Navegación principal">
        <button
          className={`nav-btn ${vistaActual === 'UI-02' || vistaActual === 'UI-03' ? 'active' : ''}`}
          onClick={() => setVistaActual('UI-02')}
        >
          <Calendar size={16} /> Cartelera (UI-02)
        </button>

        <button
          className={`nav-btn ${vistaActual === 'UI-07' ? 'active' : ''}`}
          onClick={() => setVistaActual('UI-07')}
        >
          <PlusCircle size={16} /> Proponer Evento (UI-07)
        </button>

        <button
          className={`nav-btn ${vistaActual === 'UI-08' ? 'active' : ''}`}
          onClick={() => setVistaActual('UI-08')}
        >
          <ShieldCheck size={16} /> Coordinación (UI-08)
          {pendientesCount > 0 && (
            <span className="badge badge-amber" style={{ marginLeft: 4 }}>
              {pendientesCount}
            </span>
          )}
        </button>

        {usuario ? (
          <button className="nav-btn" onClick={onLogout} title="Cambiar de cuenta o cerrar sesión">
            <LogOut size={16} /> {usuario.rol}
          </button>
        ) : (
          <button
            className={`nav-btn ${vistaActual === 'UI-01' ? 'active' : ''}`}
            onClick={() => setVistaActual('UI-01')}
          >
            <LogIn size={16} /> Acceso (UI-01)
          </button>
        )}
      </nav>
    </header>
  );
}
