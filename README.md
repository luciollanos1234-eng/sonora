# Sonora

Aplicacion musical creada con React, TypeScript, Vite y Tailwind CSS.

## Requisitos

- Node.js 20 o superior
- pnpm

## Instalar

Desde la raiz del proyecto:

```bash
pnpm install
```

## Ejecutar

```bash
pnpm dev
```

Vite mostrara en la terminal la URL local, normalmente:

```text
http://localhost:5173
```


## Sesión y rutas protegidas

- La sesión se guarda en `localStorage` con la clave `sonora_session` y no incluye la contraseña
- La ruta `/playlist` requiere sesión; sin ella, se redirige a `/login` y luego vuelve a la página solicitada
- `/admin` solo permite acceso al rol admin; los usuarios comunes son redirigidos al inicio con el aviso: "No tenés permiso para entrar ahí"
- La cuenta admin de prueba es: **admin@sonora.com / admin123**
- Como no hay backend, es una protección de navegación, no de seguridad real: los datos se pueden ver y modificar desde las herramientas del navegador
