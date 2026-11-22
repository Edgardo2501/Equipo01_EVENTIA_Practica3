import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UI01_Login from './pages/UI01_Login';
import UI02_Cartelera from './pages/UI02_Cartelera';
import UI03_DetalleInscripcion from './pages/UI03_DetalleInscripcion';
import UI07_PropuestaEvento from './pages/UI07_PropuestaEvento';
import UI08_PanelCoordinacion from './pages/UI08_PanelCoordinacion';
import { EVENTOS_INICIALES } from './data/mockData';

export default function App() {
  const [vistaActual, setVistaActual] = useState('UI-02');
  const [usuario, setUsuario] = useState(null);
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState(null);
  const [inscripcionesUsuario, setInscripcionesUsuario] = useState([]);

  const eventoActual = eventos.find((e) => e.id_evento === eventoSeleccionadoId);
  const pendientesCount = eventos.filter((e) => e.estado === 'PENDIENTE').length;

  const handleLogin = (userObj) => {
    setUsuario(userObj);
    if (eventoSeleccionadoId) {
      setVistaActual('UI-03');
    } else if (userObj.rol === 'Coordinación') {
      setVistaActual('UI-08');
    } else if (userObj.rol === 'Organizador') {
      setVistaActual('UI-07');
    } else {
      setVistaActual('UI-02');
    }
  };

  const handleVerDetalle = (idEvento) => {
    setEventoSeleccionadoId(idEvento);
    setVistaActual('UI-03');
  };

  const handleInscribir = (idEvento) => {
    if (inscripcionesUsuario.includes(idEvento)) return false;
    let exito = false;
    setEventos((prev) =>
      prev.map((ev) => {
        if (ev.id_evento === idEvento && ev.cupo_disponible > 0) {
          exito = true;
          return { ...ev, cupo_disponible: ev.cupo_disponible - 1 };
        }
        return ev;
      })
    );
    if (exito) {
      setInscripcionesUsuario((prev) => [...prev, idEvento]);
    }
    return exito;
  };

  const handleCrearPropuesta = (nueva) => {
    const nuevoEvento = {
      ...nueva,
      id_evento: `EVT-${100 + eventos.length + 1}`,
      estado: 'PENDIENTE',
      motivo_rechazo: '',
    };
    setEventos((prev) => [nuevoEvento, ...prev]);
  };

  const handleAprobar = (idEvento) => {
    setEventos((prev) =>
      prev.map((ev) => (ev.id_evento === idEvento ? { ...ev, estado: 'PUBLICADO' } : ev))
    );
  };

  const handleRechazar = (idEvento, motivo) => {
    setEventos((prev) =>
      prev.map((ev) =>
        ev.id_evento === idEvento ? { ...ev, estado: 'RECHAZADO', motivo_rechazo: motivo } : ev
      )
    );
  };

  return (
    <div>
      <Navbar
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        usuario={usuario}
        onLogout={() => {
          setUsuario(null);
          setVistaActual('UI-01');
        }}
        pendientesCount={pendientesCount}
      />

      <main className="container">
        <div className="demo-banner">
          <span>
            <strong>Modo Prototipo Frontend (Práctica 3):</strong> Datos simulados en <code>src/data/mockData.js</code>. Sin conexión a API REST ni PostgreSQL (R-01).
          </span>
          <span>
            Sesión: <strong>{usuario ? `${usuario.nombre} (${usuario.rol})` : 'Invitado'}</strong>
          </span>
        </div>

        {vistaActual === 'UI-01' && <UI01_Login onLoginSuccess={handleLogin} />}

        {vistaActual === 'UI-02' && (
          <UI02_Cartelera
            eventos={eventos}
            inscripcionesUsuario={inscripcionesUsuario}
            onVerDetalle={handleVerDetalle}
          />
        )}

        {vistaActual === 'UI-03' && (
          <UI03_DetalleInscripcion
            evento={eventoActual}
            usuario={usuario}
            yaInscrito={inscripcionesUsuario.includes(eventoSeleccionadoId)}
            onInscribir={handleInscribir}
            onVolver={() => setVistaActual('UI-02')}
            onIrALogin={() => setVistaActual('UI-01')}
          />
        )}

        {vistaActual === 'UI-07' && (
          <UI07_PropuestaEvento
            eventos={eventos}
            usuario={usuario}
            onCrearPropuesta={handleCrearPropuesta}
          />
        )}

        {vistaActual === 'UI-08' && (
          <UI08_PanelCoordinacion
            eventos={eventos}
            onAprobar={handleAprobar}
            onRechazar={handleRechazar}
          />
        )}
      </main>
    </div>
  );
}
