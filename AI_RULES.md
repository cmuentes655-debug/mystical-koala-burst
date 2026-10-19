# Tech Stack

- You are building a React application.
- Use TypeScript.
- Use React Router. KEEP the routes in src/App.tsx
- Always put source code in the src folder.
- Put pages into src/pages/
- Put components into src/components/
- The main page (default page) is src/pages/Index.tsx
- UPDATE the main page to include the new components. OTHERWISE, the user can NOT see any components!
- ALWAYS try to use the shadcn/ui library.
- Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.

Available packages and libraries:

- The lucide-react package is installed for icons.
- You ALREADY have ALL the shadcn/ui components and their dependencies installed. So you don't need to install them again.
- You have ALL the necessary Radix UI components installed.
- Use prebuilt components from the shadcn/ui library after importing them. Note that these files shouldn't be edited, so make new components if you need to change them.

# Diseño

- Paleta turquesa en tokens `komite.*` (`deep`, `base`, `mid`, `turquoise`, `glow`, `accent`, `ink`, `soft`, `faint`) definidos en `tailwind.config.ts`. Acento naranja `komite-accent`, siempre con texto oscuro para cumplir contraste AA.
- Tipografías: `font-display` (Space Grotesk), `font-sans` (Inter), `font-mono` (JetBrains Mono).
- Utilidades propias en `src/globals.css`: `.glass`, `.glass-strong`, `.no-scrollbar`, `.particles-bg`, `.content-veil`.

# Fondo de partículas (tsParticles v4)

- El fondo de la landing es una red de partículas tsParticles montada por `src/components/site/ParticlesBackground.tsx` (fijo, `z-0`, `aria-hidden`, `pointer-events: none`).
- API v4 (importante): usa `ParticlesProvider` (no `initParticlesEngine`) con `init={loadSlim}`, y el color de partícula se define en `particles.paint.color.value` (NO en `particles.color`).
- El contenedor y su `canvas` deben llevar `.particles-bg` para no capturar clics; el contenido va en `z-10` y `TopBar` en `z-30`.
- Convención de tagger: los componentes de terceros de nombre simple se renderizan mediante expresión de miembro (p. ej. `import * as tsparticlesReact` y `<tsparticlesReact.Particles />`) para que el plugin `@dyad-sh/react-vite-component-tagger` no inyecte `data-dyad-*`.
- `three`, `@react-three/fiber` y `@react-three/drei` ya no forman parte del proyecto.

