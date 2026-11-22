import React, { useState } from 'react';
import { CheckCircle2, XCircle, Calendar, MapPin, ShieldCheck } from 'lucide-react';

/**
 * UI-08: Panel de Revisión y Aprobación de Coordinación (RF-005 a RF-008, RN-003 / COMP-04)
 * Permite aprobar y publicar en cartelera o rechazar registrando motivo obligatorio (RN-003).
 */
export default function UI08_PanelCoordinacion({ eventos, onAprobar, onRechazar }) {
  const [motivos, setMotivos] = useState({});
  const [errorId, setErrorId] = useState('');

  const pendientes = eventos.filter((e) => e.estado === 'PENDIENTE');
  const historial = eventos.filter((e) => e.estado !== 'PENDIENTE');

  const handleRechazar = (idEvento) => {
    const motivo = (motivos[idEvento] || '').trim();
    if (motivo.length < 8) {
      setErrorId(idEvento);
      return;
    }
    setErrorId('');
    onRechazar(idEvento, motivo);
  };

  return (
    <section>
      <div style={{ marginBottom: '1.25rem' }}>
        <span className="badge badge-blue">UI-08 · COMP-04 (Flujo de Aprobación y Publicación)</span>
        <h1 style={{ color: '#003B5C', marginTop: '0.35rem', fontSize: '1.55rem' }}>
          Panel de Coordinación Académica
        </h1>
        <p style={{ color: '#475569', fontSize: '0.92rem' }}>
          Autoriza y publica solicitudes en la cartelera (UI-02) o recházalas especificando un motivo obligatorio (RN-003).
        </p>
      </div>

      <h2 style={{ fontSize: '1.1rem', color: '#003B5C', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <ShieldCheck size={18} /> Solicitudes pendientes ({pendientes.length})
      </h2>

      {pendientes.length === 0 ? (
        <div className="card" style={{ marginBottom: '1.5rem', color: '#475569' }}>
          No hay solicitudes pendientes por revisar. Puedes crear una nueva desde <strong>Proponer Evento (UI-07)</strong>.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.75rem' }}>
          {pendientes.map((ev) => (
            <div key={ev.id_evento} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-amber">PENDIENTE DE REVISIÓN</span>
                <span style={{ fontSize: '0.82rem', color: '#475569' }}>Solicitante: <strong>{ev.organizador}</strong></span>
              </div>

              <h3 style={{ color: '#003B5C', marginBottom: '0.35rem' }}>{ev.titulo}</h3>
              <p style={{ fontSize: '0.88rem', color: '#334155', marginBottom: '0.7rem' }}>{ev.descripcion}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.84rem', color: '#475569', marginBottom: '0.9rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={14} /> {new Date(ev.fecha_inicio).toLocaleString('es-MX')}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <MapPin size={14} /> {ev.espacio_nombre} (Cupo: {ev.cupo_maximo})
                </span>
              </div>

              <div style={{ display: 'grid', gap: '0.65rem' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Motivo de rechazo (obligatorio solo si rechazas, RN-003)..."
                  value={motivos[ev.id_evento] || ''}
                  onChange={(e) => setMotivos({ ...motivos, [ev.id_evento]: e.target.value })}
                />
                {errorId === ev.id_evento && (
                  <span style={{ color: '#B91C1C', fontSize: '0.82rem', fontWeight: 600 }}>
                    Debes escribir un motivo descriptivo (mínimo 8 caracteres) para rechazar la solicitud (RN-003).
                  </span>
                )}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-success" onClick={() => onAprobar(ev.id_evento)}>
                    <CheckCircle2 size={16} /> Aprobar y publicar en cartelera
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRechazar(ev.id_evento)}>
                    <XCircle size={16} /> Rechazar con motivo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ fontSize: '1.05rem', color: '#003B5C', marginBottom: '0.75rem' }}>
        Historial reciente de resoluciones ({historial.length})
      </h2>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left', color: '#003B5C' }}>
              <th style={{ padding: '0.55rem' }}>Evento</th>
              <th style={{ padding: '0.55rem' }}>Auditorio</th>
              <th style={{ padding: '0.55rem' }}>Estado</th>
              <th style={{ padding: '0.55rem' }}>Observación</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((ev) => (
              <tr key={ev.id_evento} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.55rem', fontWeight: 600 }}>{ev.titulo}</td>
                <td style={{ padding: '0.55rem' }}>{ev.espacio_nombre}</td>
                <td style={{ padding: '0.55rem' }}>
                  <span className={`badge ${ev.estado === 'PUBLICADO' ? 'badge-green' : 'badge-red'}`}>
                    {ev.estado}
                  </span>
                </td>
                <td style={{ padding: '0.55rem', color: '#475569' }}>
                  {ev.estado === 'RECHAZADO' ? ev.motivo_rechazo : 'Publicado en cartelera'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
