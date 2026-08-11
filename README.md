# Portfolio

Next.js + Sanity portfolio. Live site builds to GitHub Pages.

## Structure

```
web/                 # Next.js site (Sanity-powered projects)
studio-portfolio/    # Sanity Studio (projects only)
.github/workflows/   # GitHub Pages deploy
```

## Local

```powershell
cd web
npm install
npm run dev
```

```powershell
cd studio-portfolio
npm install
npm run dev
```

## GitHub Pages

Pushes to `main` build `web` as a static site and deploy.

Site: https://elmst87.github.io/Portfolio/

In repo **Settings → Pages**, set Source to **GitHub Actions**.

Sanity project publishes show live without redeploying (browser fetch).
