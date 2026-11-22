/**
 * Datos simulados desacoplados de las vistas (Mitigación R-02).
 * Nombres de campos alineados con el modelo relacional PostgreSQL (ENT-01 a ENT-08) del DAS/SDD.
 */

export const AUDITORIOS_BUAP = [
  { id_espacio: 'ESP-01', nombre: 'Auditorio Albert Einstein (FCC)', edificio: 'CCO1', capacidad_max: 120 },
  { id_espacio: 'ESP-02', nombre: 'Sala de Usos Múltiples FCC', edificio: 'CCO2', capacidad_max: 60 },
  { id_espacio: 'ESP-03', nombre: 'Auditorio de la Arena BUAP', edificio: 'CU', capacidad_max: 250 },
  { id_espacio: 'ESP-04', nombre: 'Laboratorio de Ciencia de Datos 104', edificio: 'CCO3', capacidad_max: 35 },
];

export const CATEGORIAS_EVENTO = [
  'Conferencia',
  'Taller Técnico',
  'Seminario',
  'Hackathon',
  'Cultural',
];

export const USUARIOS_DEMO = [
  {
    id_usuario: 'USR-001',
    nombre: 'Edgardo Flores Gutiérrez',
    correo: 'edgardo.flores@alumno.buap.mx',
    matricula: '202511900',
    rol: 'Participante',
  },
  {
    id_usuario: 'USR-002',
    nombre: 'Jonathan Araiza Guzmán',
    correo: 'jonathan.araiza@alumno.buap.mx',
    matricula: '202501620',
    rol: 'Organizador',
  },
  {
    id_usuario: 'USR-003',
    nombre: 'Dra. Coordinación Académica FCC',
    correo: 'coordinacion.fcc@correo.buap.mx',
    matricula: 'EMP-4012',
    rol: 'Coordinación',
  },
];

// Fechas relativas futuras (>72h) para mantener validez temporal en pruebas
const addDaysISO = (days, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
};

export const EVENTOS_INICIALES = [
  {
    id_evento: 'EVT-101',
    titulo: 'Taller de Arquitecturas Limpias y Monolitos Modulares',
    categoria: 'Taller Técnico',
    modalidad: 'Presencial',
    id_espacio: 'ESP-01',
    espacio_nombre: 'Auditorio Albert Einstein (FCC)',
    fecha_inicio: addDaysISO(5, 11),
    duracion_horas: 2,
    cupo_maximo: 40,
    cupo_disponible: 3,
    estado: 'PUBLICADO',
    organizador: 'Jonathan Araiza Guzmán',
    descripcion: 'Sesión práctica sobre diseño modular en capas, control de concurrencia y patrones REST orientados a sistemas institucionales.',
    motivo_rechazo: '',
  },
  {
    id_evento: 'EVT-102',
    titulo: 'Seminario de Ciencia de Datos Aplicada a la Agricultura',
    categoria: 'Seminario',
    modalidad: 'Híbrido',
    id_espacio: 'ESP-04',
    espacio_nombre: 'Laboratorio de Ciencia de Datos 104',
    fecha_inicio: addDaysISO(7, 13),
    duracion_horas: 2,
    cupo_maximo: 35,
    cupo_disponible: 1,
    estado: 'PUBLICADO',
    organizador: 'Equipo SocieData FCC',
    descripcion: 'Uso de imágenes satelitales, series fenológicas y ensambles Random Forest + SVR para estimación de rendimiento agrícola.',
    motivo_rechazo: '',
  },
  {
    id_evento: 'EVT-103',
    titulo: 'Conferencia: Seguridad en Aplicaciones Web Universitarias',
    categoria: 'Conferencia',
    modalidad: 'Presencial',
    id_espacio: 'ESP-02',
    espacio_nombre: 'Sala de Usos Múltiples FCC',
    fecha_inicio: addDaysISO(9, 10),
    duracion_horas: 1.5,
    cupo_maximo: 60,
    cupo_disponible: 0,
    estado: 'PUBLICADO',
    organizador: 'Academia de Ingeniería de Software',
    descripcion: 'Revisión de controles RBAC, bitácoras de auditoría inmutables y mitigación de vulnerabilidades OWASP Top 10.',
    motivo_rechazo: '',
  },
  {
    id_evento: 'EVT-104',
    titulo: 'Hackathon FCC Otoño 2026: Soluciones Campus Inteligente',
    categoria: 'Hackathon',
    modalidad: 'Presencial',
    id_espacio: 'ESP-03',
    espacio_nombre: 'Auditorio de la Arena BUAP',
    fecha_inicio: addDaysISO(14, 9),
    duracion_horas: 6,
    cupo_maximo: 120,
    cupo_disponible: 28,
    estado: 'PUBLICADO',
    organizador: 'José Gael Leyva Alvarado',
    descripcion: 'Maratón de desarrollo colaborativo de prototipos funcionales para servicios universitarios con mentoría docente.',
    motivo_rechazo: '',
  },
  {
    id_evento: 'EVT-105',
    titulo: 'Foro Estudiantil de Pruebas de Software y Cobertura >80%',
    categoria: 'Seminario',
    modalidad: 'Presencial',
    id_espacio: 'ESP-02',
    espacio_nombre: 'Sala de Usos Múltiples FCC',
    fecha_inicio: addDaysISO(6, 16),
    duracion_horas: 2,
    cupo_maximo: 50,
    cupo_disponible: 50,
    estado: 'PENDIENTE',
    organizador: 'Ibrahim García Ibañez',
    descripcion: 'Estrategias prácticas para pruebas unitarias, pruebas de carga con 500 usuarios concurrentes y automatización CI.',
    motivo_rechazo: '',
  },
];
