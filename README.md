# GPUs and Model Acceleration with Ben

An interactive learning site for the AI Research Foundations GPUs lecture: six modules, calculators, a quiz, the Choose Your GPU worksheet, the lecture slides and resources.

**Live site:** https://rexsimiloluwah.github.io/gpu-learning-site/

Built with love by Simi Okunowo and Claude Opus 5.5, using [Astro](https://astro.build).

## Run it locally

You need Node.js 22.12 or newer.

```
npm install
npm run dev
```

Then open http://localhost:4321/gpu-learning-site/ in your browser. Pages reload as you edit.

To check the production build:

```
npm run build
npm run preview
```

## Folder structure

```
src/
  pages/                    one file per page; the URL follows the file name
    index.astro             home
    learn/*.astro           the six modules
    slides.astro, quiz.astro, worksheet.astro, resources.astro, 404.astro
  layouts/
    BaseLayout.astro        header, learning path, "On this page" menu, footer, theme and progress
    ModuleLayout.astro      module heading, slide link and previous / next buttons
  components/               Ben's speech bubble, widget frame, icons and other small pieces
  data/                     the content you are most likely to edit (see below)
  scripts/lib.ts            shared helpers for the calculators
  styles/global.css         all the styles
public/assets/
  img/                      Ben, backpack illustrations and the scaling laws paper
  slides/                   the 78 lecture slides as images
  downloads/                slides PDF and worksheet PDF
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

The site is served from `/gpu-learning-site/`. If you rename the repository or use a custom domain, update `site` and `base` in `astro.config.mjs`, and the links in `src/data/site.ts`.

## Notes

- Fonts load from Google Fonts. Everything else is in the repository.
- Progress, quiz answers and the light or dark theme are saved in each visitor's browser (localStorage).
- Old links from the single-page version (such as `/#m3` or `/#quiz`) redirect to the new pages.
