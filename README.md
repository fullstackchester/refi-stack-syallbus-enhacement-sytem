# Refi Stack

Refi Stack is a React application built with strict TypeScript and Vite.

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm (use the committed lockfile with `npm ci`)

## Commands

- `npm run dev` starts the Vite development server.
- `npm start` is a compatibility alias for the development server.
- `npm run typecheck` runs the strict TypeScript project build without emitting files.
- `npm test` runs the Vitest suite once in jsdom.
- `npm run test:watch` runs Vitest in watch mode.
- `npm run build` type-checks first, then writes the production application to `dist/`.
- `npm run tailwind` rebuilds Tailwind CSS in watch mode.

Vite prints the local development URL when it starts. Its default is `http://localhost:5173`.

## Deployment

Serve the generated `dist/` directory. Because routing is handled in the browser, the host must rewrite unknown application paths to `/index.html`. The Firebase Hosting configuration already provides this fallback while allowing public files such as the manifest, icons, and robots file to resolve directly.

Migration details and the manual regression checklist are in [docs/typescript-migration.md](docs/typescript-migration.md).
