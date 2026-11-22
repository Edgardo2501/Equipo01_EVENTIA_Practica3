# Equipo01_EVENTIA_Practica3

Prototipo funcional del frontend de **EVENTIA** (Plataforma de Gestión de Eventos Universitarios — FCC BUAP), desarrollado para la **Práctica 3: Proceso de Desarrollo y Prototipo Funcional Asistido por IA** de la asignatura *Ingeniería de Software I* (Otoño 2026).

> **Aviso de alcance (Mitigación R-01):** Este repositorio contiene únicamente un **prototipo funcional estático del frontend** con datos simulados en memoria (`src/data/mockData.js`). **No** incluye servidor backend, API REST, base de datos PostgreSQL 16 ni soporte real para 500 usuarios concurrentes; dichos módulos corresponden a los Incrementos 1c, 2 y 3 del plan de trabajo.

## Integrantes — Equipo 01 (FCC BUAP)
- **Jonathan Araiza Guzmán** (202501620)
- **Edgardo Flores Gutiérrez** (202511900)
- **José Gael Leyva Alvarado** (202510481)
- **Ibrahim García Ibañez** (202508576)

## Vistas Implementadas (Paleta institucional BUAP `#003B5C`)
1. **`UI-01` (`src/pages/UI01_Login.jsx`)**: Acceso institucional con validación de dominio `@alumno.buap.mx` / `@correo.buap.mx` y cambio rápido de rol demo (Participante, Organizador, Coordinación).
2. **`UI-02` (`src/pages/UI02_Cartelera.jsx`)**: Cartelera pública con buscador en tiempo real, filtro por categoría y disponibilidad de cupo.
3. **`UI-03` (`src/pages/UI03_DetalleInscripcion.jsx`)**: Detalle del evento e inscripción en <= 3 clics (`RFG-002`) con descuento inmediato de cupo y bloqueo automático al llegar a 0 (`RN-002`).
4. **`UI-07` (`src/pages/UI07_PropuestaEvento.jsx`)**: Formulario de solicitud con validación en tiempo real de anticipación mínima de 72 horas (`RN-005`) y prevención de empalmes de auditorio (`RN-001`).
5. **`UI-08` (`src/pages/UI08_PanelCoordinacion.jsx`)**: Panel de Coordinación para aprobar y publicar solicitudes directamente en la cartelera o rechazar con motivo obligatorio (`RN-003`).

## Estructura del Proyecto
```text
Equipo01_EVENTIA_Practica3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── docs/
│   └── diagrama_despliegue_eventia.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── theme.css
    ├── data/
    │   └── mockData.js
    ├── components/
    │   └── Navbar.jsx
    └── pages/
        ├── UI01_Login.jsx
        ├── UI02_Cartelera.jsx
        ├── UI03_DetalleInscripcion.jsx
        ├── UI07_PropuestaEvento.jsx
        └── UI08_PanelCoordinacion.jsx
```

## Ejecución Local
```bash
npm install
npm run dev
```

## Despliegue Rápido (Vercel o GitHub Pages)
- **Vercel:** Importa el repositorio `Equipo01_EVENTIA_Practica3` en [vercel.com](https://vercel.com), framework `Vite`, comando `npm run build`, carpeta `dist`.
- **GitHub Pages:** Ejecuta `npm run build` y publica la carpeta `dist` (o activa GitHub Actions para Vite).

## Módulos Pendientes (Semanas 12–16)
- Backend API REST bajo Monolito Modular en Capas (`ADR-01`).
- Base de datos PostgreSQL 16 (`ENT-01` a `ENT-08`) y bloqueos de concurrencia (`ADR-02`).
- Incremento 2: Pase de lista con privacidad (`UI-05`/`COMP-06`) y cola SMTP Outbox (`ADR-03`/`COMP-07`).
- Incremento 3: Reportes de ocupación y bitácora inmutable particionada (`UI-06`/`COMP-08`/`RNF-008`).
