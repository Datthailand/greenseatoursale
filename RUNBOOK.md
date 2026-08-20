# Green Sea Webapp Runbook

## Location

- Windows: `D:\Dat\webapp greensea`
- WSL: `/mnt/d/Dat/webapp greensea`

## Stack

- React 19
- Vite 7
- Git repo present in this folder

## Commands

```bash
cd "/mnt/d/Dat/webapp greensea"
npm install
npm run dev
npm run build
```

## Current checks

- `npm run build`: passed
- `npm audit --omit=dev`: 0 vulnerabilities
- Data/assets check:
  - Regions: 4
  - Tours: 23
  - FIT: 9
  - GIT: 14
  - Unique sales kit asset sets: 8
  - Public PDFs: 8
  - Covers: 8
  - Thumbs: 8
  - Missing referenced assets: 0

## Important note

If running from WSL and build fails with missing Rollup native package, run:

```bash
npm install
```

Reason: `node_modules` may have been installed from Windows first, so Rollup optional native package for Linux may be absent.

## Dev server

Current checked port: `http://127.0.0.1:5174/`

Use the Codex in-app Browser plugin first for rendered UI QA when it is available. If Browser cannot attach to the local tab, use Playwright CLI/script as the fallback and record the reason.
