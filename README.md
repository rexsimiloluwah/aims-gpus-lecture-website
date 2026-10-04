# GPUs and Model Acceleration with Ben

An interactive learning site for the AI Research Foundations GPUs lecture: six modules, calculators, a quiz, the Choose Your GPU worksheet, the lecture slides and resources.

Built with love by Simi Okunowo and Claude Opus 5.5.

## Folder structure

```
gpu-learning-site/
  index.html                 the whole site (HTML, CSS and JavaScript)
  assets/img/                Ben, backpack illustrations and the scaling laws paper
  assets/slides/             the 78 lecture slides as images
  assets/downloads/          slides PDF and worksheet PDF
```

It is a static site: no build step, no server code and no dependencies to install.

## Preview locally

From inside this folder, run:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploy

Any static host works. Upload the whole folder, keeping its structure.

- **GitHub Pages:** push the folder to a repository, then in Settings, Pages, choose the branch and the root folder.
- **Netlify:** drag and drop the folder onto https://app.netlify.com/drop
- **Vercel:** run `npx vercel` inside the folder and follow the prompts.
- **Firebase Hosting or Google Cloud Storage:** set index.html as the main page and upload the folder.

## Notes

- Fonts load from Google Fonts. Everything else is in the folder.
- Progress, quiz answers and the light or dark theme are saved in each visitor's browser (localStorage).
- To update a resource link or quiz question, edit index.html and search for the text you want to change.
