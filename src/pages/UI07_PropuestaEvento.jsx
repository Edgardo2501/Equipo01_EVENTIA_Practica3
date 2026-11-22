import React, { useState } from 'react';
import { Clock, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AUDITORIOS_BUAP, CATEGORIAS_EVENTO } from '../data/mockData';

/**
 * UI-07: Formulario de Propuesta de Evento (RF-002 a RF-004, RN-001, RN-005 / COMP-02, COMP-03)
 * Valida en tiempo real la regla RN-005 (anticipación >= 72 horas) y RN-001 (sin empalme de espacio).
 */
export default function UI07_PropuestaEvento({ eventos, usuario, onCrearPropuesta }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS_EVENTO[0]);
  const [modalidad, setModalidad] = useState('Presencial');
  const [idEspacio, setIdEspacio] = useState(AUDITORIOS_BUAP[0].id_espacio);
  const [fechaInicio, setFechaInicio] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState(40);
  const [descripcion, setDescripcion] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [exitoMsg, setExitoMsg] = useState('');

  const espacioSeleccionado = AUDITORIOS_BUAP.find((a) => a.id_espacio === idEspacio);

  // Cálculo en tiempo real de horas de anticipación (RN-005)
  const horasAnticipacion = fechaInicio
    ? (new Date(fechaInicio).getTime() - Date.now()) / (1000 * 60 * 60)
    : null;

  const cumple72h = horasAnticipacion !== null && horasAnticipacion >= 72;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setExitoMsg('');

    if (!fechaInicio) {
      setErrorMsg('Selecciona la fecha y hora de inicio del evento.');
      return;
    }

    // Validación estricta RN-005: mínimo 72 horas de anticipación
    if (horasAnticipacion < 72) {
      setErrorMsg(
        `Regla RN-005 incumplida: la solicitud debe registrarse con al menos 72 horas de anticipación (actualmente faltan ${Math.max(0, horasAnticipacion).toFixed(1)} h).`
      );
      return;
    }

    // Validación RN-001: evitar empalme de espacio en misma fecha/hora (ventana de 2 horas)
    const inicioMs = new Date(fechaInicio).getTime();
    const empalme = eventos.find((ev) => {
      if (ev.estado === 'RECHAZADO' || ev.id_espacio !== idEspacio) return false;
      const diffHoras = Math.abs(new Date(ev.fecha_inicio).getTime() - inicioMs) / (1000 * 60 * 60);
      return diffHoras < 2;
    });

    if (empalme) {
      setErrorMsg(
        `Conflicto de espacio (RN-001): "${espacioSeleccionado.nombre}" ya está reservado cerca de ese horario por "${empalme.titulo}".`
      );
      return;
    }

    if (Number(cupoMaximo) > espacioSeleccionado.capacidad_max) {
      setErrorMsg(
        `El cupo solicitado (${cupoMaximo}) excede la capacidad máxima del espacio (${espacioSeleccionado.capacidad_max} personas).`
      );
      return;
    }

    onCrearPropuesta({
      titulo: titulo.trim(),
      categoria,
      modalidad,
      id_espacio: idEspacio,
      espacio_nombre: espacioSeleccionado.nombre,
      fecha_inicio: fechaInicio,
      duracion_horas: 2,
      cupo_maximo: Number(cupoMaximo),
      cupo_disponible: Number(cupoMaximo),
      organizador: usuario?.nombre || 'Organizador Estudiantil BUAP',
      descripcion: descripcion.trim(),
    });

    setExitoMsg('Propuesta enviada correctamente a Coordinación (UI-08) con estado PENDIENTE.');
    setTitulo('');
    setDescripcion('');
    setFechaInicio('');
  };

  return (
    <section style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.15rem' }}>
        <span className="badge badge-blue">UI-07 · COMP-02 / COMP-03 (Propuesta de Eventos)</span>
        <h1 style={{ color: '#003B5C', marginTop: '0.35rem', fontSize: '1.55rem' }}>
          Proponer Nuevo Evento Universitario
        </h1>
        <p style={{ color: '#475569', fontSize: '0.92rem' }}>
          Todas las solicitudes validan anticipación mínima de 72 horas (RN-005) y disponibilidad del auditorio (RN-001).
        </p>
      </div>

      <div className="card">
        {errorMsg && (
          <div className="alert alert-error" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <AlertCircle size={18} /> <span>{errorMsg}</span>
          </div>
        )}
        {exitoMsg && (
          <div className="alert alert-success" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <CheckCircle2 size={18} /> <span>{exitoMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="titulo">Título del evento</label>
            <input
              id="titulo"
              type="text"
              className="input"
              placeholder="Ej. Taller de Introducción a PostgreSQL y Concurrencia"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="cat">Categoría</label>
              <select id="cat" className="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                {CATEGORIAS_EVENTO.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mod">Modalidad</label>
              <select id="mod" className="select" value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="En línea">En línea</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="espacio">Auditorio / Espacio</label>
              <select
                id="espacio"
                className="select"
                value={idEspacio}
                onChange={(e) => setIdEspacio(e.target.value)}
              >
                {AUDITORIOS_BUAP.map((a) => (
                  <option key={a.id_espacio} value={a.id_espacio}>
                    {a.nombre} (Máx. {a.capacidad_max})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cupo">Cupo máximo solicitado</label>
              <input
                id="cupo"
                type="number"
                min={5}
                max={espacioSeleccionado?.capacidad_max || 250}
                className="input"
                value={cupoMaximo}
                onChange={(e) => setCupoMaximo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="fecha">Fecha y hora de inicio (Regla RN-005: mínimo 72 h)</label>
            <input
              id="fecha"
              type="datetime-local"
              className="input"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
            {horasAnticipacion !== null && (
              <div
                style={{
                  marginTop: '0.45rem',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: cumple72h ? '#15803D' : '#B91C1C',
                  fontWeight: 600,
                }}
              >
                <Clock size={15} />
                {cumple72h
                  ? `Validación RN-005 aprobada: ${horasAnticipacion.toFixed(1)} horas de anticipación.`
                  : `Anticipación insuficiente: ${Math.max(0, horasAnticipacion).toFixed(1)} h (se requieren mínimo 72 h).`}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="desc">Descripción académica</label>
            <textarea
              id="desc"
              rows={3}
              className="textarea"
              placeholder="Describe brevemente el objetivo, ponentes y público dirigido..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <Send size={16} /> Enviar solicitud a Coordinación
          </button>
        </form>
      </div>
    </section>
  );
}
