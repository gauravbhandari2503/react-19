# React 19 — Learning & Exploration Project

A hands-on React 19 playground built with **TypeScript**, **Vite 8**, and **Tailwind CSS v4**. It demonstrates core React 19 concepts — the React Compiler, memoization, transitions, optimistic UI updates, and more — through interactive demo pages, along with in-depth markdown documentation in the `docs/` folder.

---

## Tech Stack

| Technology | Version |
|---|---|
| [React](https://react.dev/) | ^19 |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9 |
| [Vite](https://vite.dev/) | ^8 |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 |
| [React Router DOM](https://reactrouter.com/) | ^7 |
| [Axios](https://axios-http.com/) | ^1 |
| Node.js | v22 (see `.nvmrc`) |

---

## Features

- ⚡ **Vite 8** — lightning-fast dev server and optimised production builds
- 🔵 **React Compiler** — automatic memoization via `babel-plugin-react-compiler`
- 🎨 **Tailwind CSS v4** — utility-first styling with the Vite plugin
- 🔀 **React Router v7** — client-side routing with lazy-loaded pages
- 🛠️ **ESLint 9** — flat-config linting with TypeScript and React Hooks rules

---

## Getting Started

### Prerequisites

- Node.js **v22** (use `nvm use` to switch automatically via `.nvmrc`)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app starts at `http://localhost:5173` with Hot Module Replacement (HMR).

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
react-19/
├── docs/                          # In-depth markdown notes on React internals
│   ├── Memoization/               # useMemo & useCallback deep-dives
│   ├── Transitions/               # useTransition & useDeferredValue
│   ├── optimistic-ui-updates/     # useOptimistic hook
│   ├── React-internal-architecture/
│   └── Rendering-&-React-Fibre/   # Fibre tree, reconciliation, lanes
├── public/                        # Static assets
└── src/
    ├── api/                       # Axios API helpers
    ├── common/                    # Shared UI components (aliased as $)
    ├── components/                # Feature components
    ├── data/                      # Static data / fixtures
    ├── hooks/                     # Custom React hooks
    ├── layouts/                   # App-level layout (AppHeader)
    ├── pages/                     # Route-level page components
    ├── routes/                    # React Router configuration
    ├── types/                     # Shared TypeScript types
    ├── utils/                     # Utility functions
    ├── App.tsx                    # Root layout component
    ├── main.tsx                   # Application entry point
    └── index.css                  # Global styles
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Counter | State management with `useReducer` / `useState` |
| `/memo-mania` | MemoMania | Memoization demos (`useMemo`, `useCallback`, `React.memo`) |
| `/poka-moka` | PokaMoka | Pokémon data fetching with Axios |
| `/social-media` | SocialMedia | `useOptimistic` and `useTransition` demo with post creation |
| `/wrong-code` | WrongCode | Common React anti-patterns and how to fix them |

---

## Documentation

The `docs/` folder contains detailed markdown notes organised by topic:

- **Rendering & React Fibre** — Anatomy of a re-render, the Fibre tree, React elements, lanes, event and re-render processes, `useEffect` dependency management, rules for performance
- **React Internal Architecture** — State management & hooks, `useEffect` internals
- **Memoization** — `useMemo` & `useCallback` patterns
- **Transitions** — `useTransition` & `useDeferredValue`
- **Optimistic UI Updates** — `useOptimistic` hook

---

## React Compiler

This project has the **React Compiler** enabled via `babel-plugin-react-compiler` and `@rolldown/plugin-babel`. The compiler automatically inserts memoization, removing the need to manually write `useMemo` / `useCallback` in most cases.

See the [React Compiler docs](https://react.dev/learn/react-compiler) for more information.

> **Note:** Enabling the React Compiler may affect Vite dev server and build performance slightly.

---

## ESLint Configuration

The project uses ESLint 9 flat config (`eslint.config.js`) with:

- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` for hooks rules
- `eslint-plugin-react-refresh` for fast-refresh compatibility

To enable stricter type-aware lint rules, update `eslint.config.js`:

```js
// Replace tseslint.configs.recommended with:
tseslint.configs.recommendedTypeChecked,
// or for even stricter rules:
tseslint.configs.strictTypeChecked,

// Add parserOptions:
languageOptions: {
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: import.meta.dirname,
  },
},
```

You can also add [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for additional React-specific rules.
