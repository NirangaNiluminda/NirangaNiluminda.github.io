# niranganiluminda.github.io

Source of my portfolio: **https://niranganiluminda.github.io**

Static site built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions:

```
push to main → npm ci → astro build → offline link check (lychee) → deploy to Pages
```

Pull requests run the same build and link check without deploying.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
```

## Where things live

| Path | Contents |
|---|---|
| `src/data/projects.ts` | All project content (featured case studies + more projects) |
| `src/pages/` | Home, one case-study page per featured project, 404 |
| `public/img/` | Screenshots (WebP) |
| `public/cv/` | CV PDFs |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
