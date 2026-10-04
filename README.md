# GPUs and Model Acceleration

An interactive learning site for the AI Research Foundations Course GPUs and Model Acceleration lecture at AIMS South Africa. This is designed for educators who might want to reuse the teaching materials.

**Live site:** https://rexsimiloluwah.github.io/aims-gpus-lecture-website/

Built with love by Simi Okunowo and Claude Opus 5.5, using [Astro](https://astro.build).

## Run it locally

You need Node.js 22.12 or newer.

```
npm install
npm run dev
```

Then open http://localhost:4321/aims-gpus-lecture-website/ in your browser. Pages reload as you edit.

To check the production build:

```
npm run build
npm run preview
```

## Editing content

| To change | Edit |
| --- | --- |
| Quiz questions | `src/data/quiz.ts` |
| Worksheet questions and answers | `src/data/worksheet.ts` |
| Resource links and papers | `src/data/resources.ts` |
| Module titles, taglines and slide ranges | `src/data/modules.ts` |
| Slide titles | `src/data/slides.ts` |
| GitHub link and site description | `src/data/site.ts` |
| Module text, equations and widgets | `src/pages/learn/<module>.astro` |

Each module page keeps its interactive widgets in a `<script>` block at the bottom of the file.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`. In the repository settings, under Pages, the source must be **GitHub Actions**.

The site is served from `/aims-gpus-lecture-website/`. If you rename the repository or use a custom domain, update `site` and `base` in `astro.config.mjs`, and the links in `src/data/site.ts`.

## Notes

- Fonts load from Google Fonts. Everything else is in the repository.
- Progress, quiz answers and the light or dark theme are saved in each visitor's browser (localStorage).
- Old links from the single-page version (such as `/#m3` or `/#quiz`) redirect to the new pages.

## Contribute

Feel free to contribute to improve this educational resource. Thank you!

<p align="center"><img src=".github/ben-heart.webp" alt="Ben, the course's stick-figure learner, making a heart with his hands" width="150"></p>
