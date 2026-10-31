# Dumb Charades — iPhone PWA

Bright cinema-themed app with the approved purple mime logo, Hindi/English selectors, three year eras (1960–1979, 1980–1999, 2000+), popular/tricky modes, principal cast and director, optional sourced trivia, scores and persistent no-repeat history.

## Publish to GitHub Pages
1. Create a **public** GitHub repository, e.g. `dumb-charades`.
2. Upload **all six app files at the repository root**: `index.html`, `movies.json`, `manifest.webmanifest`, `sw.js`, `icon.png`, `apple-touch-icon.png`. (This README is optional.)
3. In repository Settings → Pages → Build and deployment, choose **Deploy from a branch**, `main`, `/ (root)`, Save.
4. Open `https://YOURUSERNAME.github.io/dumb-charades/` in Safari on your iPhone. Share → Add to Home Screen → Open as Web App → Add.

## Important limits
- The bundled starter library includes 106 Hindi and 80 English film entries, **not** the proposed 1,000 + 200 titles. Only four sourced fun facts are currently bundled. No invented trivia is displayed for other movies.
- Imported CSV files are not independently verified. Keep only originally Hindi-language Bollywood films in the Hindi category; do not import regional films dubbed into Hindi.
- The no-repeat history uses localStorage, which survives ordinary launches but can be lost by clearing site data or deleting the web app. It does not sync across devices.
- The optional CSV importer supports UTF-8 columns `title,year,cast,director,language`. Importers must independently verify facts and language; imported films are marked tricky by default.
