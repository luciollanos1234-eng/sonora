# Sonora

Sonora es una aplicación web musical para explorar un catálogo de canciones, escuchar previews y guardar canciones en playlists personales. Es un proyecto frontend desarrollado con React, TypeScript, Vite y Tailwind CSS.

## Enlaces del proyecto

- **Repositorio:** [luciollanos1234-eng/sonora](https://github.com/luciollanos1234-eng/sonora)
- **Aplicación desplegada:** Pendiente de publica.
- **Tablero Trello:** https://trello.com/invite/b/6af7f76ce83e57d36d39625c/ATTI1f95e379451c8dd95c0a0c787e69ef7e7570324A/sonora.
- **Mockups / diseño:**
- <img width="1440" height="1240" alt="mockup-01-inicio" src="https://github.com/user-attachments/assets/70627219-3d39-4467-b468-cda43828d263" />
  



## Tecnologías y herramientas

### Aplicación

- **React 19** para la interfaz y componentes.
- **React DOM 19** para renderizar la aplicación en el navegador.
- **TypeScript 6** para tipado estático.
- **Vite 8** para desarrollo local y compilación.
- **Tailwind CSS 4** para estilos utilitarios, integrado con `@tailwindcss/vite`.
- **`@vitejs/plugin-react`** para la integración de React con Vite.
- **React Router DOM 7** para navegación y rutas.
- **React Context API** para estado compartido de autenticación, reproductor, playlists y notificaciones.
- **React Hook Form** para formularios y validaciones.
- **React Player** para reproducir URLs de audio.
- **React Icons** para iconografía.
- **SweetAlert2** para confirmaciones de eliminación.
- **localStorage** para persistir datos localmente en el navegador.
- **iTunes Search API** para buscar previews de audio de hasta 30 segundos y duración de canciones.
- **Google Fonts:** Inter y Plus Jakarta Sans.

### Desarrollo

- **ESLint** y `typescript-eslint` para análisis estático y linting.
- **Prettier** como herramienta de formato.
- **Husky**, **Commitlint** y **Commitizen** con `cz-conventional-changelog` para hooks y flujo de commits convencionales.
- Tipos de desarrollo para Node.js, React y React DOM (`@types/node`, `@types/react`, `@types/react-dom`).
- **pnpm** como gestor de paquetes (incluye `pnpm-lock.yaml`).
- **Vercel** como destino de despliegue previsto; `vercel.json` configura el fallback de rutas de la SPA.

## Requisitos

- Node.js 20 o superior.
- pnpm.
- Conexión a Internet para descargar dependencias y consultar iTunes. La aplicación puede iniciarse sin obtener previews; en ese caso el reproductor simula el progreso, pero no reproduce audio real.

## Instalación y ejecución local

Cloná el repositorio y entrá a la carpeta del proyecto:

```bash
git clone https://github.com/luciollanos1234-eng/sonora.git
cd sonora
```

Si todavía no tenés pnpm, instalalo con npm:

```bash
npm install --global pnpm
```

Instalá las dependencias y ejecutá el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

Vite muestra la dirección local en la terminal, normalmente <http://localhost:5173>.

## Comandos

| Comando | Descripción |
| --- | --- |
| `pnpm install` | Instala las dependencias del proyecto. |
| `pnpm dev` | Inicia el servidor de desarrollo de Vite. |
| `pnpm build` | Ejecuta la verificación de TypeScript y genera la versión de producción en `dist/`. |
| `pnpm preview` | Sirve localmente la compilación de producción; ejecutá antes `pnpm build`. |
| `pnpm lint` | Analiza el código con ESLint. |

## Funcionalidades por perfil

### Visitante (sin iniciar sesión)

- Consultar el catálogo y las fichas de canciones.
- Buscar por nombre de canción o artista y filtrar por género.
- Reproducir previews cuando iTunes encuentra audio disponible.
- Ver información de álbum, año, género, duración y recomendaciones.
- Registrarse e iniciar sesión.
- Al intentar agregar una canción a una playlist, se solicita iniciar sesión.

### Usuario registrado

- Usar las funciones disponibles para visitantes.
- Crear una cuenta e iniciar/cerrar sesión.
- Agregar o quitar canciones de **Mi Playlist**.
- Mantener una playlist independiente por cuenta en ese navegador.
- Acceder a `/playlist`; si intenta entrar sin sesión, se lo redirige al login y luego vuelve a la ruta solicitada.

### Administrador

- Acceder al panel `/admin`.
- Consultar totales de canciones, usuarios y canciones guardadas en playlists.
- Buscar, agregar, editar y eliminar canciones del catálogo.
- Al eliminar una canción, quitarla también de todas las playlists y detenerla si se está reproduciendo.
- Consultar la lista de cuentas registradas. La pantalla de usuarios es de solo lectura; no incluye acciones de administración de cuentas.

La cuenta de prueba inicial es:

| Perfil | Email | Contraseña |
| --- | --- | --- |
| Administrador | `admin@sonora.com` | `admin123` |

El usuario inicial se carga desde los datos semilla cuando no hay datos de usuarios válidos guardados en el navegador. Si estas credenciales no funcionan, revisá el `localStorage` del sitio y eliminá específicamente `sonora_users` para volver a inicializar las cuentas; esto borra las cuentas guardadas en ese navegador.

> **Importante:** las cuentas y la contraseña de prueba son solo para desarrollo y demostración. No hay backend ni autenticación segura: los roles, las cuentas y los datos residen en el navegador y pueden inspeccionarse o modificarse desde las herramientas de desarrollo. No uses credenciales reales ni publiques esta cuenta como acceso de producción.

## Páginas y rutas

| Ruta | Página | Acceso |
| --- | --- | --- |
| `/` | Inicio y catálogo | Público |
| `/detalle/:id` | Detalle de una canción | Público |
| `/about` | Información del equipo y tecnologías | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Registro de cuenta | Visitantes; con sesión redirige al inicio |
| `/playlist` | Playlist personal | Requiere sesión |
| `/admin` | Administración del catálogo | Requiere rol administrador |
| `/ui-showcase` | Muestra de componentes y estilos | Público; acceso directo, no aparece en el menú principal |

Las rutas no reconocidas muestran la página de error 404.

## Reproductor y catálogo

- Los datos iniciales del catálogo están en `src/data/seed.ts`.
- Durante la inicialización, la aplicación consulta iTunes para intentar completar cada canción con una URL de preview y duración. Si no se encuentra audio o la consulta falla, la canción conserva el catálogo pero no tiene reproducción real; el progreso se simula en la interfaz.
- Las previews disponibles son fragmentos provistos por iTunes, no canciones completas.
- El reproductor tiene una barra fija para escritorio/tablet y una vista compacta con controles ampliados para celular.
- El volumen y la última canción se guardan en las preferencias locales; la sesión se restaura al recargar la página.

## Datos y persistencia

No existe una API propia ni una base de datos remota. La aplicación guarda estos datos en `localStorage`:

| Clave | Contenido |
| --- | --- |
| `sonora_songs` | Catálogo de canciones. |
| `sonora_users` | Cuentas registradas y datos de usuario. |
| `sonora_session` | Sesión actual, sin contraseña. |
| `sonora_playlists` | Canciones guardadas, organizadas por identificador de usuario. |
| `sonora_prefs` | Preferencias del reproductor y última canción. |

Los datos son propios de cada navegador y origen (localhost o dominio desplegado); no se sincronizan entre dispositivos ni usuarios. Limpiar los datos del sitio puede borrar cuentas, playlists, cambios del catálogo y sesión.

## Despliegue en Vercel

El proyecto está preparado como una Single Page Application: `vercel.json` redirige las rutas al `index.html` para que las páginas internas funcionen al abrirlas directamente.

1. Subí el repositorio a GitHub.
2. En [Vercel](https://vercel.com/), elegí **Add New Project** e importá `luciollanos1234-eng/sonora`.
3. Configurá el framework como **Vite** (o dejá que Vercel lo detecte).
4. Usá estos valores de compilación:
   - **Install command:** `pnpm install --frozen-lockfile`
   - **Build command:** `pnpm build`
   - **Output directory:** `dist`
5. Desplegá y probá las rutas `/`, `/playlist`, `/admin` y `/detalle/bohemian-rhapsody`.

No se requieren variables de entorno para la configuración actual del frontend. La URL pública del despliegue se agregará aquí cuando esté disponible.

## Estructura del proyecto

```text
sonora/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── assets/             # Logos, favicon y portadas de álbumes
│   ├── components/
│   │   ├── auth/           # Tarjetas, campos y alertas de autenticación
│   │   ├── layout/         # Layout, navegación y protección de rutas
│   │   ├── player/         # Reproductores de escritorio y celular
│   │   ├── songs/          # Catálogo, tarjetas, filtros y formulario de canciones
│   │   └── ui/             # Componentes reutilizables de interfaz
│   ├── context/            # Contextos, proveedores y hooks de estado
│   ├── data/               # Inicialización del almacenamiento y datos semilla
│   ├── hooks/              # Hooks reutilizables
│   ├── pages/              # Páginas de la aplicación
│   ├── routes/             # Definición de rutas
│   ├── styles/             # Estilos globales, variables y UI showcase
│   ├── types/              # Tipos TypeScript compartidos
│   ├── utils/              # Almacenamiento, iTunes, validaciones y utilidades
│   ├── App.tsx              # Proveedores y router
│   └── main.tsx             # Inicialización y punto de entrada
├── index.html               # Documento HTML de entrada
├── eslint.config.js         # Configuración de ESLint
├── package.json             # Dependencias y scripts
├── pnpm-lock.yaml           # Versiones resueltas de dependencias
├── tsconfig*.json           # Configuración de TypeScript
├── vercel.json              # Rewrites para el enrutamiento SPA en Vercel
└── vite.config.ts           # Plugins y configuración de Vite
```

## Equipo

- **Lionel Debortoli** — Scrum Master y Developer · [GitHub](https://github.com/lioneldebortoli).
- **Lucio Llanos** — Líder técnico y Developer · [GitHub](https://github.com/luciollanos1234-eng).
- **Facundo Alvarez** — Developer · [GitHub](https://github.com/facualvarez829-afk).


