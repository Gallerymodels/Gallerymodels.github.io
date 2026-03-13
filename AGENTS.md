# AGENTS.md — dep-upgrade

Guidance for AI agents running the dependency upgrade workflow for Vite + React + React Router + Tailwind + Sanity projects.

---

## What this agent does

Upgrades a frontend project to the latest versions of its core stack in a safe, ordered sequence. It audits first, runs official codemods where available, applies manual fixes for patterns codemods can't catch, and validates at each step before moving on.

**Target versions:**
- Sanity → 4.x
- Tailwind CSS → 4.x
- Vite → 7.x
- React + React DOM → 19.x
- React Router → 7.x (`react-router-dom` no longer exists)

---

## Ground rules

**Never proceed blind.** Always read `package.json` and `vite.config.*` before touching anything. The pre-flight scan in Step 0 is mandatory — it determines whether a phased upgrade is safer than a single-pass one.

**Commit hygiene is the user's responsibility, but warn them.** Before making any changes, check `git status`. If the working tree is dirty, stop and tell the user to commit or stash. Do not proceed past this warning without explicit confirmation.

**Validate after every step.** Run `npm run build` (or `npm run dev` for quick checks) after each package upgrade. Do not batch multiple major upgrades before validating — a build failure is much easier to diagnose when it's scoped to a single step.

**Prefer official codemods over manual edits.** For Tailwind and React, official upgrade CLIs exist. Always run them first. Only do manual fixes for what the codemods miss.

**Upgrade order is not optional.** The sequence Sanity → Tailwind → Vite → React → React Router is deliberate:
- Sanity and Tailwind are independent of React internals — upgrading them first gives you a clean baseline
- Vite must be upgraded before React 19 because `@vitejs/plugin-react` has React 19-specific support in its latest version
- React Router goes last because it imports from React and its types depend on the React version being settled

---

## Step-by-step behaviour

### Step 0 — Pre-flight (always run this)

```bash
git status
node --version        # must be 20+
cat package.json
cat vite.config.ts    # or vite.config.js
```

Then run the risk-pattern grep scan from `references/risk-patterns.md`. Summarise findings to the user. If high-risk patterns are numerous (20+), recommend a phased approach with separate commits per package upgrade.

Do not proceed if Node < 20. All target versions require it.

### Step 1 — Sanity

```bash
npm install sanity@latest @sanity/vision@latest
npm outdated | grep sanity   # catch any other @sanity/* plugins
```

Validate: `npm run build` or `sanity dev` if there is a separate studio directory.

### Step 2 — Tailwind CSS

```bash
npx @tailwindcss/upgrade
```

After the codemod, **manually verify**:
- `vite.config` now uses `@tailwindcss/vite` plugin (not PostCSS)
- If `darkMode: 'class'` was in the old config, add `@variant dark (&:where(.dark, .dark *));` to the CSS entrypoint
- Any CSS files using `@apply` outside the main stylesheet need `@reference "../../app.css";` at the top
- `!important` modifier syntax flipped: `!text-red-500` → `text-red-500!`

Validate: `npm run dev`, spot-check UI visually including dark mode if used.

### Step 3 — Vite

```bash
npm install vite@7 @vitejs/plugin-react@latest
```

Check `vite.config` for:
- `build.target: 'modules'` → rename to `'baseline-widely-available'` or remove to accept new default
- `css.preprocessorOptions.sass.api` or `scss.api` → remove (legacy Sass API gone)
- CJS `require()` calls at the top level of vite.config — migrate to ESM imports

Validate: `npm run build` must succeed cleanly.

### Step 4 — React

Run codemods **before** installing:

```bash
npx codemod@latest react/19/migration-recipe
# if TypeScript:
npx types-react-codemod@latest preset-19 ./src
```

Then install:

```bash
npm install react@19 react-dom@19
npm install -D @types/react@19 @types/react-dom@19   # if TypeScript
```

After install, manually check for anything the codemods can't fix automatically. Consult `references/react-19-breaking-changes.md` for the full list. The most common manual fixes are:
- Class components using `componentWill*` lifecycle methods (codemod won't rewrite these to hooks)
- `ReactDOM.findDOMNode` calls (must be replaced with refs)
- `ReactDOM.unmountComponentAtNode` (replace with `root.unmount()`)
- `defaultProps` on function components (replace with ES6 default params)
- Third-party library type errors — add `"skipLibCheck": true` to `tsconfig.json` as a short-term bridge

Validate: `npm run build` + `npm test` if tests exist. Check browser console for React warnings.

### Step 5 — React Router

**Before upgrading**, if the project uses `BrowserRouter`, enable all v6 future flags and run the app to surface any deprecation warnings. Fix those warnings. Then commit.

```bash
npm uninstall react-router-dom react-router
npm install react-router@latest
```

Rewrite all imports:

```bash
# Linux:
find ./src \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) \
  -exec sed -i 's|from "react-router-dom"|from "react-router"|g' {} +

# macOS:
find ./src \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) \
  -exec sed -i '' 's|from "react-router-dom"|from "react-router"|g' {} +
```

Repeat for single-quote variants. Remove all `v7_*` future flags from the router config — they are now the defaults.

Validate: navigate all major routes, test forms and any data loaders.

### Step 6 — Final pass

```bash
rm -rf node_modules && npm install
npx tsc --noEmit        # if TypeScript
npm run build
npm run dev
npm test                # if a test suite exists
```

Summarise all changes made, any deprecation warnings remaining, and any items that needed manual intervention.

---

## When to recommend a phased upgrade

Recommend separate PRs/commits per package if the pre-flight scan finds any of:
- 6+ files with `forwardRef`
- Any use of `contextTypes` or `getChildContext`
- Any `componentWill*` lifecycle methods
- Any `ReactDOM.findDOMNode` or `unmountComponentAtNode`
- A large codebase (100+ component files)

In a phased approach the order is: **Sanity + Tailwind → Vite → React → React Router**, each with its own commit and passing build before the next begins.

---

## Files in this skill

| File | Purpose |
|------|---------|
| `SKILL.md` | Full step-by-step upgrade playbook with commands |
| `references/react-19-breaking-changes.md` | Every removed/deprecated React 19 API with before/after code examples |
| `references/risk-patterns.md` | All grep patterns for pre-flight risk scanning, organised by package |

---

## Out of scope

- Sanity v2 → v4 migration (v2 uses a completely different studio architecture; this skill targets v3 → v4 only)
- Vite 8 / Rolldown (experimental; only attempt if user explicitly requests it)
- React Router framework mode (`@react-router/dev`) — the skill upgrades the library only, not the build tooling
- CSS-in-JS libraries (styled-components, emotion) — not part of this stack
- Test framework upgrades (Vitest, Jest, Testing Library) — handled separately
