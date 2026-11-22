import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * UI-03: Detalle de Evento e Inscripción (RF-012, RF-014, RN-002, RFG-002 / COMP-05)
 * Descuenta cupo en tiempo real y bloquea automáticamente cuando cupo_disponible === 0.
 */
export default function UI03_DetalleInscripcion({
  evento,
  usuario,
  yaInscrito,
  onInscribir,
  onVolver,
  onIrALogin,
}) {
  const [folio, setFolio] = useState('');

  if (!evento) {
    return (
      <div className="card">
        <p>No se seleccionó ningún evento.</p>
        <button className="btn btn-secondary" onClick={onVolver} style={{ marginTop: '0.8rem' }}>
          Volver a la cartelera
        </button>
      </div>
    );
  }

  const lleno = evento.cupo_disponible <= 0;
  const ocupados = evento.cupo_maximo - evento.cupo_disponible;
  const porcentaje = Math.round((ocupados / evento.cupo_maximo) * 100);

  const handleConfirmar = () => {
    if (!usuario) {
      onIrALogin();
      return;
    }
    const ok = onInscribir(evento.id_evento);
    if (ok) {
      setFolio(`EV-${evento.id_evento}-${usuario.matricula || 'BUAP'}`);
    }
  };

  return (
    <section style={{ maxWidth: 820, margin: '0 auto' }}>
      <button className="btn btn-secondary" onClick={onVolver} style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Volver a Cartelera (UI-02)
      </button>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <span className="badge badge-blue">UI-03 · COMP-05 ({evento.categoria} · {evento.modalidad})</span>
          {lleno ? (
            <span className="badge badge-red">Bloqueado por sobrecupo (RN-002)</span>
          ) : (
            <span className="badge badge-green">Inscripciones abiertas</span>
          )}
        </div>

        <h1 style={{ color: '#003B5C', fontSize: '1.55rem', marginBottom: '0.75rem' }}>
          {evento.titulo}
        </h1>
        <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{evento.descripcion}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem', background: '#F8FAFC', padding: '1rem', borderRadius: 10, border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
          <div>
            <strong style={{ color: '#003B5C', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.86rem' }}>
              <Calendar size={15} /> Fecha y hora
            </strong>
            <span style={{ fontSize: '0.9rem' }}>
              {new Date(evento.fecha_inicio).toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' })}
            </span>
          </div>
          <div>
            <strong style={{ color: '#003B5C', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.86rem' }}>
              <MapPin size={15} /> Sede / Auditorio
            </strong>
            <span style={{ fontSize: '0.9rem' }}>{evento.espacio_nombre}</span>
          </div>
          <div>
            <strong style={{ color: '#003B5C', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.86rem' }}>
              <Users size={15} /> Organizador
            </strong>
            <span style={{ fontSize: '0.9rem' }}>{evento.organizador}</span>
          </div>
        </div>

        {/* Control de cupo */}
        <div style={{ marginBottom: '1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Cupo ocupado: {ocupados} de {evento.cupo_maximo}</span>
            <span style={{ color: lleno ? '#B91C1C' : '#15803D' }}>
              {evento.cupo_disponible} lugares disponibles
            </span>
          </div>
          <div className="progress-track" style={{ height: 11 }}>
            <div className={`progress-fill ${lleno ? 'full' : ''}`} style={{ width: `${porcentaje}%` }} />
          </div>
        </div>

        {/* Estado de acción */}
        {yaInscrito ? (
          <div className="alert alert-success" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
            <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>¡Inscripción confirmada!</strong> Tu lugar fue descontado del cupo disponible.
              <div style={{ fontSize: '0.84rem', marginTop: 4 }}>
                Folio simulado: <code>{folio || `EV-${evento.id_evento}-${usuario?.matricula || 'BUAP'}`}</code> ·
                Participante: {usuario?.nombre || 'Usuario Institucional'}
              </div>
            </div>
          </div>
        ) : lleno ? (
          <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={20} />
            <span>
              <strong>Cupo agotado (RN-002):</strong> El registro se bloqueó automáticamente al alcanzarse el límite de lugares del auditorio.
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              {usuario
                ? `Registrando como ${usuario.nombre} (${usuario.correo})`
                : 'Inicia sesión institucional para completar tu registro en 1 clic.'}
            </span>
            <button className="btn btn-primary" onClick={handleConfirmar}>
              Confirmar inscripción (Descontar 1 lugar)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
