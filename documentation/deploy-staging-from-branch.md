# Deploy Staging Build from a Feature Branch

Use this when you want to test a feature branch at **johnfabiomb.com/test/** without
merging the source code into `page-final`.

Only `docs/test/` is touched. Production files (`docs/` root) and all source code
in `page-final` stay exactly as they are.

---

## When to use this

- You've finished work on a feature branch and want to preview it live before approving it.
- You don't want to merge anything into `page-final` yet — just the built output for testing.

---

## Steps

### 1. Build staging on your feature branch

Make sure you're on the feature branch and the build is clean:

```bash
# You should already be on your feature branch, e.g. feature/auth-firebase
npm run staging          # builds → docs/test/
```

Fix any warnings or errors before continuing.

### 2. Switch to page-final

```bash
git checkout page-final
```

> This will NOT overwrite your feature branch work — it only changes your working directory
> to the page-final state. Source files in page-final will load, but docs/test/ will
> still contain the build you just ran (build output isn't tracked as a branch diff until committed).

### 3. Bring only docs/test/ from the feature branch

```bash
git checkout <feature-branch> -- docs/test/
```

Example:
```bash
git checkout feature/auth-firebase -- docs/test/
```

This stages the entire `docs/test/` folder from the feature branch into `page-final`.
Nothing outside `docs/test/` is touched.

### 4. Verify only docs/test/ changed

```bash
git status
```

Every line should start with `docs/test/`. If you see any `src/` files or `docs/` root
files, something went wrong — reset with `git checkout HEAD -- .` before continuing.

### 5. Commit and push

```bash
git add docs/test/
git commit -m "chore: deploy staging build from <feature-branch>"
git push
```

Site is live at **johnfabiomb.com/test/** within ~1 minute.

---

## Switching back to your feature branch

After testing, go back to your feature branch to continue working:

```bash
git checkout <feature-branch>
```

---

## Important rules

| Rule | Why |
|---|---|
| Never `git add .` or `git add docs/` | Would pull in production output or source diffs you don't want |
| Always run `git status` before committing | Confirms only `docs/test/` files are staged |
| Never merge source code into `page-final` this way | `git checkout <branch> -- <path>` only brings files at that path — but double-check |
| `page-final` is the live production branch | Treat it carefully — source code changes go through review and explicit approval |

---

## Related

- General build/deploy reference: [`DEPLOYMENT.md`](./DEPLOYMENT.md)
