# AGENTS.md — react-counter

Coding agent instructions for the `react-counter` repository. This file documents
build/test commands, code style guidelines, and conventions to follow when making
changes to this project.

---

## Project Overview

A minimal React 19 demo showcasing an animated counter component implemented in
two styles: a class-based component (`Counter`) and a functional component
(`CounterFunc`). Built with Vite 6. No TypeScript; plain JavaScript throughout.

---

## Build / Dev Commands

All scripts are run via `npm run <script>` from the repository root.

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `npm run dev`      | Start the Vite dev server (hot reload)       |
| `npm run build`    | Production build into `dist/`                |
| `npm run preview`  | Preview the production build locally         |

### Lint

ESLint is not configured. To surface any build-time errors manually:

```bash
npm run build 2>&1
```

No `.eslintrc`, `eslint.config.*`, or `prettier.config.*` files exist.

---

## Technology Stack

- **React 19** — explicit `import React from 'react'` is kept for consistency but
  is no longer required (React 19 uses the automatic JSX transform via Vite).
- **Vite 6 / `@vitejs/plugin-react`** — handles JSX transform and HMR. Config
  lives in `vite.config.js` at the project root. Do not add a separate
  `webpack.config.js` or `babel.config.js`.
- **Plain JavaScript** — no TypeScript. Do not add `.ts`/`.tsx` files or a
  `tsconfig.json` without first converting the whole project.
- **No test runner** — no Jest, no Vitest. No test files currently exist. If
  adding tests, Vitest is the recommended choice for Vite projects.

---

## File & Directory Conventions

```
index.html            # Vite entry HTML (project root — NOT in public/)
vite.config.js        # Vite configuration
src/
  index.jsx           # App entry point, mounts root component
  components/
    Counter.jsx       # Class-based counter component
    CounterFunc.jsx   # Functional counter component
    *.test.jsx        # Tests live next to the component they test (if added)
```

- Source files use the `.jsx` extension for any file containing JSX.
- Non-JSX modules (utilities, hooks with no JSX) use `.js`.
- Component files are **PascalCase** (`Counter.jsx`, `CounterFunc.jsx`).
- Non-component modules (utilities, hooks) use **camelCase** (`useCounter.js`,
  `formatNumber.js`).

---

## Code Style Guidelines

### General Formatting

- **Indentation**: 2 spaces (the inconsistency in `src/index.jsx` at 4 spaces is a
  known quirk; new files should use 2 spaces).
- **Semicolons**: Required — end every statement with `;`.
- **Quotes**: Single quotes for all string literals; JSX attribute values use
  double quotes.
- **Line length**: Keep lines under ~100 characters.
- **Trailing commas**: ES5 trailing commas where valid.
- Do not use `var`; use `const` and `let` instead.

### Imports

- `React` is still explicitly imported at the top of JSX files for consistency,
  though it is no longer required in React 19:
  ```js
  import React from 'react';
  ```
- Named hooks/utilities come from the same `react` import:
  ```js
  import React, { useState, useEffect, useRef } from 'react';
  ```
- For the app entry point, mount using `createRoot` from `react-dom/client`:
  ```js
  import { createRoot } from 'react-dom/client';
  createRoot(document.getElementById('root')).render(<App />);
  ```
- Order: external packages first, then local modules.
- Use **default exports** for components; named exports for utilities.

### Component Style

Both styles are present in this repo and either is acceptable:

**Functional component (preferred for new code) — use destructured props with
ES default parameters instead of `defaultProps`:**
```js
const MyComponent = ({ initialValue = 0 }) => {
  const [value, setValue] = useState(initialValue);
  // ...
  return <span>{value}</span>;
};

export default MyComponent;
```

> Note: `defaultProps` on function components was removed in React 19. Always use
> ES default parameters for functional components.

**Class-based component (legacy, used for `Counter`) — `defaultProps` on the
class is still valid in React 19:**
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
  }
  render() {
    return <span>{this.state.value}</span>;
  }
}
MyComponent.defaultProps = { initialValue: 0 };
export default MyComponent;
```

### Naming Conventions

| Kind                | Convention                        | Example                          |
|---------------------|-----------------------------------|----------------------------------|
| Components          | PascalCase                        | `Counter`, `CounterFunc`         |
| Hooks               | camelCase with `use` prefix       | `useCounter`                     |
| Variables/functions | camelCase                         | `stepTime`, `countUp`            |
| Props               | camelCase                         | `countFrom`, `countTo`, `durationMs` |
| Constants           | camelCase (local) or UPPER_SNAKE_CASE (module-level) | `minTimer`, `MAX_DURATION` |
| Files               | PascalCase for components, camelCase for others | `Counter.jsx`, `utils.js` |

### Hooks

- Prefer `useRef` to hold mutable values that should not trigger re-renders (e.g.,
  timer IDs, prop snapshots inside `setInterval` callbacks).
- Always return a cleanup function from `useEffect` when it creates a timer or
  subscription:
  ```js
  useEffect(() => {
    const timer = setInterval(() => { /* ... */ }, 100);
    return () => clearInterval(timer);
  }, []);
  ```

### Error Handling

- No error boundaries currently exist. If adding async logic, handle errors
  explicitly (try/catch or `.catch()`).
- Guard against component unmounting before async/interval callbacks complete by
  clearing timers in `componentWillUnmount` / `useEffect` cleanup.

### Styling

- No CSS or styling framework is used. Do not introduce one without discussion.
  Inline styles or a CSS file co-located with the component are acceptable if
  needed.

---

## Testing Guidelines

No tests exist yet and no test runner is configured. If tests are added:

- Vitest is the recommended test runner for Vite projects (Jest-compatible API).
- Test files should be named `ComponentName.test.jsx` and placed next to the
  component under `src/components/`.
- Use `@testing-library/react` (v16+) for rendering; prefer queries that reflect
  user behavior (`getByText`, `getByRole`) over implementation queries.
- Wrap timer-based tests in `vi.useFakeTimers()` / `vi.runAllTimers()` since
  both components use `setInterval` internally.

---

## Things to Avoid

- Do not use `defaultProps` on function components — it was removed in React 19.
  Use ES default parameters instead.
- Do not use `ReactDOM.render` — it was removed in React 19. Use `createRoot`.
- Do not add TypeScript without converting the entire project.
- Do not add a separate Babel or Webpack config — Vite manages these.
- Do not use `var`; use `const` and `let` instead.
- Do not add dependencies without a clear need; keep the bundle small.
- Do not put `index.html` inside `public/` — in Vite it must live at the project root.
