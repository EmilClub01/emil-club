# 🚀 Resumen del Proyecto: Emil Club

## � Descripción General
**Emil Club** es una plataforma web interactiva y gamificada diseñada para la comunidad de fans del artista **Emil**. La aplicación permite a los usuarios registrarse como "agentes", ganar experiencia (XP) mediante interacciones (escuchar música, compartir), y competir en un ranking global.

## 🛠️ Stack Tecnológico
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Diseño Cyberpunk/Neon)
*   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
*   **Base de Datos**: [Supabase](https://supabase.com/) (PostgreSQL)
*   **Iconos**: Lucide React

## ✨ Funcionalidades Clave

### 1. Mission Control (Registro)
*   Formulario gamificado paso a paso.
*   Generación automática de una **ID Card** (Tarjeta de Agente) descargable.
*   Asignación de XP inicial al registrarse.

### 2. Sistema de Gamificación (XP)
*   **Leaderboard**: Ranking en tiempo real de los fans con más XP.
*   **Acciones para ganar XP**:
    *   Registrarse (+500 XP).
    *   Escuchar música en el player (+50 XP/día).
    *   Compartir la ID Card o música (+100 XP/día).
*   **Persistencia**: Uso de `localStorage` para rastrear sesiones sin login complejo.

### 3. Reproductor de Música
*   Player persistente en el pie de página (`Footer`).
*   Integración con Spotify (Embed) para escuchar lanzamientos.

### 4. Diseño Visual
*   Estética "Cyberpunk" con paleta neón (Verde `#ccff00`, Azul, Morado).
*   Efectos de vidrio (Glassmorphism), brillos y micro-interacciones.

## 📂 Estructura del Proyecto
*   `src/app/page.js`: Página principal (Landing).
*   `src/app/components/`: Componentes reutilizables (Hero, MissionControl, Leaderboard, Player, etc.).
*   `src/app/lib/supabaseClient.js`: Cliente de conexión a Supabase.
*   `public/`: Assets estáticos (imágenes, logos, música demo).

## ⚙️ Configuración y Despliegue

### Requisitos Previos
*   Node.js (v18+)
*   Cuenta en Supabase (para la base de datos)

### Instalación
```bash
npm install
```

### Ejecución Local
```bash
npm run dev
```
El proyecto correrá en `http://localhost:3000`.

### Variables de Entorno (.env.local)
Necesitas configurar las credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

## 📝 Notas para el Desarrollador
*   **Base de Datos**: La tabla principal es `fans`. Asegúrate de que los tipos de datos coincidan con el formulario en `MissionControl.jsx`.
*   **Estilos**: Las variables globales y fuentes están en `src/app/globals.css`.

*   **Acceso a cuentas**: La web esta tiene una cuenta en hotmailun repositorio en Github, un despliegue en Vercel y la base de datos esta en Supabase, accede a ellas con el usuario: emil.club@hotmail.com y la contraseña es: EMD?Z8wKM%tiWHR  en todas las cuentas