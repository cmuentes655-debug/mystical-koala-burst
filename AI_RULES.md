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
- Utilidades propias en `src/globals.css`: `.glass`, `.glass-strong`, `.no-scrollbar`.

# Three.js / React Three Fiber

- Los elementos de three.js se referencian como expresiones de miembro desde `src/components/globe/r3f.ts`: `<r3f.mesh>`, `<r3f.group>`, `<r3f.points>`, `<r3f.Line>`, etc. NUNCA como etiquetas simples (`<mesh>`).
- Motivo: el plugin de desarrollo `@dyad-sh/react-vite-component-tagger` inyecta `data-dyad-id` y `data-dyad-name` en todo elemento JSX con nombre simple; React Three Fiber intenta aplicarlos a los objetos de three.js y falla con `R3F: Cannot set "data-dyad-name"`. Las expresiones de miembro (`objeto.propiedad`) se saltan esa inyección.
- El tipado se conserva: `<r3f.sphereGeometry args={[1, 4, 4]} />` sigue validando `args` contra los tipos de R3F. Al añadir un elemento nuevo, agrégalo primero al objeto `r3f`.

