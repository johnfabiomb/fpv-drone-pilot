# Deployment Guide

## TL;DR

| Goal | Command | Pushes to live? |
|---|---|---|
| Dev server (local only) | `npm start` | No |
| Test a build locally (staging) | `npm run preview` | No |
| Deploy to staging (`/test/`) | `npm run staging` → push | Yes — `/test/` only |
| Deploy to production | `npm run deploy` → push | Yes — root site |

---

## Environments

### Production — `johnfabiomb.com/`
- Output folder: `docs/`
- Minified, prerendered, Analytics + AdSense active
- Version auto-bumped on each deploy (patch: `1.1.1` → `1.1.2`)

### Staging — `johnfabiomb.com/test/`
- Output folder: `docs/test/`
- Not minified, prerendered (same routes as production), **no Analytics, no AdSense**
- `noindex` on every page — Google cannot crawl or index it
- Version is **not** bumped
- Deep-link refresh works (each route has its own `index.html`)

---

## Development → Staging

```bash
npm start                  # 1. code & test locally (dev flags, nothing written to docs/)
npm run preview:staging    # 2. optional — build + serve staging locally at localhost:4201/test/
npm run staging            # 3. build → docs/test/ using staging flags
git add docs/test
git commit -m "chore: staging build"
git push                   # 4. live at johnfabiomb.com/test/ in ~1 min
```

Feature flags file: `src/environments/feature-flags.staging.ts`

---

## Development → Production

```bash
npm start                  # 1. code & test locally (dev flags, nothing written to docs/)
npm run preview            # 2. optional — build + serve prod locally to verify before shipping
npm run deploy             # 3. bumps version + builds → docs/ using production flags
git add docs package.json
git commit -m "chore: deploy vX.X.X"
git push                   # 4. live at johnfabiomb.com/ in ~1 min
```

Feature flags file: `src/environments/feature-flags.production.ts`

> `npm run deploy` auto-bumps the patch version. If you already edited `package.json` manually it detects that and skips the bump.

---

## What NOT to do

| Don't | Why |
|---|---|
| `npm run build` or `ng build` for a live deploy | Both default to **staging** — output goes to `docs/test/`, never `docs/`. Safe locally, wrong for production. |
| `git add docs` after `npm run staging` only | Would push staging output to `docs/test/` — fine, but make sure you didn't accidentally build prod at the same time |
| `git push` after `npm start` | `npm start` never touches `docs/`, so nothing changes — but double-check `git status` before every push |
| Run `npm run deploy` while testing locally | It bumps the version and overwrites `docs/` — only run it when you're actually ready to ship |

---

## Checking what's about to go live

Before any `git push`, run:

```bash
git status
git diff --stat HEAD
```

- Only `docs/` and `package.json` (version bump) should appear for a production deploy
- Only `docs/test/` should appear for a staging deploy
- Source files (`src/`) should **never** be the only thing you push — a build must always accompany them if the live site needs to change

---

## Build outputs at a glance

```
docs/                  ← production (johnfabiomb.com/)
docs/test/             ← staging   (johnfabiomb.com/test/)
```

Both folders are committed to git and served by GitHub Pages.

---

## Version history

The version lives in `package.json` → `"version"`. `npm run deploy` bumps the patch
number automatically. If you need a minor or major bump, edit it manually **before**
running deploy (the script will detect the change and skip the auto-bump).

```
1.0.x  — patch: bug fixes, content updates, small tweaks
1.x.0  — minor: new features (e.g. provider cards, staging env)
x.0.0  — major: full redesigns or architecture changes
```
