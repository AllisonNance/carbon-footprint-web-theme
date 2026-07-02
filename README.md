# Carbonish Theme

A componentized React design system built with **Next.js**, **TypeScript**, and **CSS Modules**. Organized using atomic design with a dedicated design-tokens layer powered by CSS custom properties.

## Getting started

```bash
npm install
npm run dev           # run the demo site on http://localhost:3000
npm run storybook     # run Storybook on http://localhost:6006
```

## Scripts

| Command                  | Description                             |
| ------------------------ | --------------------------------------- |
| `npm run dev`            | Start the Next.js demo site             |
| `npm run build`          | Production build of the demo site       |
| `npm run start`          | Serve the production build              |
| `npm run storybook`      | Start Storybook for component previews  |
| `npm run build-storybook`| Build a static Storybook site           |
| `npm run lint`           | Run ESLint                              |
| `npm run typecheck`      | Run the TypeScript compiler (no emit)   |

## Project structure

```
src/
  app/                    # Next.js App Router (demo site)
    layout.tsx
    page.tsx
  components/             # Atomic design layers
    atoms/                # Button, TextInput, Tile, Tag...
    molecules/            # (empty — reserved for composite patterns)
    organisms/            # UI Shell Header, ...
    templates/            # PageLayout...
    index.ts              # Barrel export
  tokens/                 # Design tokens as CSS variables
    primitives.css        # Full Carbon v11 color scale
    theme.css             # Semantic theme tokens (White / G10 / G100)
    typography.css
    spacing.css           # Carbon v11 spacing scale
    radii.css
    shadows.css
    index.css             # Imports all token files
  styles/
    reset.css             # Modern CSS reset
    globals.css           # Imports tokens + reset
.storybook/               # Storybook configuration
```

## Design tokens

Tokens live in `src/tokens/*.css` as CSS custom properties. Components reference them via `var(--token-name)`; never hard-code colors, spacing, or type values in a component stylesheet.

Two layers exist:

- **Primitives** (`primitives.css`) — raw palette values like `--gray-60`, `--blue-40`. Don't reference these in components.
- **Semantic theme tokens** (`theme.css`) — like `--text-primary`, `--layer-01`, `--button-primary`. These automatically switch across White, G10, and G100 themes.

Switch themes on the root element:

```tsx
<html data-theme="white">  {/* default */}
<html data-theme="g10">
<html data-theme="g100">
```

## Adding a component

1. Pick the right atomic layer (`atoms`, `molecules`, `organisms`, `templates`).
2. Create a folder named after the component, e.g. `src/components/atoms/Badge/`.
3. Add these files:
   - `Badge.tsx` — the component
   - `Badge.module.css` — styles using design tokens
   - `Badge.stories.tsx` — Storybook stories
   - `index.ts` — re-export the component
4. Export it from `src/components/index.ts`.

## Conventions

- **Styling**: CSS Modules + design tokens. No inline color/spacing values.
- **Types**: Every public component exports a `Props` interface.
- **A11y**: Components must pass keyboard and screen-reader checks before merging.
- **Naming**: PascalCase for components, camelCase for CSS Module class names.
