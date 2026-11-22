import React, { useMemo, useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { CATEGORIAS_EVENTO } from '../data/mockData';

/**
 * UI-02: Cartelera Pública de Eventos (RF-011, RF-012, RFG-002 / COMP-05)
 * Permite búsqueda en tiempo real, filtros por categoría/disponibilidad y paso en 1 clic a UI-03.
 */
export default function UI02_Cartelera({ eventos, inscripcionesUsuario, onVerDetalle }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const eventosPublicados = useMemo(() => {
    return eventos
      .filter((ev) => ev.estado === 'PUBLICADO')
      .filter((ev) => {
        const q = busqueda.trim().toLowerCase();
        const matchTexto =
          !q ||
          ev.titulo.toLowerCase().includes(q) ||
          ev.espacio_nombre.toLowerCase().includes(q) ||
          ev.organizador.toLowerCase().includes(q);
        const matchCat = categoria === 'Todas' || ev.categoria === categoria;
        const matchCupo = !soloDisponibles || ev.cupo_disponible > 0;
        return matchTexto && matchCat && matchCupo;
      });
  }, [eventos, busqueda, categoria, soloDisponibles]);

  const formatFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section>
      <div style={{ marginBottom: '1.25rem' }}>
        <span className="badge badge-blue">UI-02 · COMP-05 (Cartelera Pública)</span>
        <h1 style={{ color: '#003B5C', marginTop: '0.35rem', fontSize: '1.65rem' }}>
          Cartelera de Eventos BUAP
        </h1>
        <p style={{ color: '#475569', fontSize: '0.94rem' }}>
          Explora eventos académicos autorizados e inscríbete en un máximo de 3 clics (RFG-002).
        </p>
      </div>

      {/* Barra de buscador y filtros */}
      <div className="card" style={{ marginBottom: '1.35rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', alignItems: 'end' }}>
          <div>
            <label className="form-label" htmlFor="buscador">Buscar evento, auditorio u organizador</label>
            <div style={{ position: 'relative' }}>
              <input
                id="buscador"
                type="text"
                className="input"
                placeholder="Ej. Arquitecturas, Einstein, Datos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="filtro-cat">Categoría</label>
            <select
              id="filtro-cat"
              className="select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {CATEGORIAS_EVENTO.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.55rem' }}>
            <input
              id="solo-disponibles"
              type="checkbox"
              checked={soloDisponibles}
              onChange={(e) => setSoloDisponibles(e.target.checked)}
              style={{ width: 17, height: 17, accentColor: '#003B5C' }}
            />
            <label htmlFor="solo-disponibles" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
              Mostrar solo con cupo disponible
            </label>
          </div>
        </div>
      </div>

      {/* Listado de tarjetas */}
      {eventosPublicados.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <Search size={32} color="#64748B" style={{ marginBottom: '0.5rem' }} />
          <p style={{ color: '#475569' }}>No se encontraron eventos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid-cards">
          {eventosPublicados.map((ev) => {
            const lleno = ev.cupo_disponible <= 0;
            const yaInscrito = inscripcionesUsuario.includes(ev.id_evento);
            const ocupados = ev.cupo_maximo - ev.cupo_disponible;
            const porcentaje = Math.round((ocupados / ev.cupo_maximo) * 100);

            return (
              <article key={ev.id_evento} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <span className="badge badge-blue">{ev.categoria}</span>
                    {yaInscrito ? (
                      <span className="badge badge-green">Inscrito</span>
                    ) : lleno ? (
                      <span className="badge badge-red">Cupo lleno (RN-002)</span>
                    ) : (
                      <span className="badge badge-green">{ev.cupo_disponible} lugares libres</span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.08rem', color: '#003B5C', marginBottom: '0.55rem' }}>
                    {ev.titulo}
                  </h2>

                  <p style={{ fontSize: '0.86rem', color: '#475569', marginBottom: '0.85rem' }}>
                    {ev.descripcion}
                  </p>

                  <div style={{ fontSize: '0.84rem', color: '#334155', display: 'grid', gap: '0.35rem', marginBottom: '0.85rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={15} color="#003B5C" /> {formatFecha(ev.fecha_inicio)}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={15} color="#003B5C" /> {ev.espacio_nombre}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Users size={15} color="#003B5C" /> Ocupación: {ocupados} / {ev.cupo_maximo} ({porcentaje}%)
                    </span>
                  </div>

                  <div className="progress-track">
                    <div className={`progress-fill ${lleno ? 'full' : ''}`} style={{ width: `${porcentaje}%` }} />
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.9rem' }}
                  onClick={() => onVerDetalle(ev.id_evento)}
                >
                  {yaInscrito ? 'Ver comprobante' : lleno ? 'Ver detalle (Sin cupo)' : 'Ver detalle e inscribirme'}
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
