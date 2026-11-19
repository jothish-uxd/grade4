# Grade 4 Learning Hub

Illustrated practice quizzes for a Grade 4 student in BC, organised by subject.

| Subject | Page | Status |
|---|---|---|
| Social Studies | [`social-studies/`](social-studies/) | Regions of Canada, two versions: **Full quiz** (21 questions) and **Landforms only** (19 questions, at `social-studies/#landforms`) |
| Math | — | Coming soon |
| Science | — | Coming soon |
| Language Arts | — | Coming soon |

## Run it

It's a plain static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish it, turn on GitHub Pages under **Settings → Pages**: deploy from the `main` branch, `/ (root)`.

## Structure

```
index.html              Home page and subject menu
assets/site.css         Shared fonts and the subject nav
assets/fonts/           Andika (body) and Fredoka (headings), bundled under the SIL OFL
social-studies/
  index.html            Regions of Canada quiz with a version picker: Full quiz (Q_FULL) or
                        Landforms only (LQ). Tap answers; worksheet view for printing
  mapdata.js            Pre-projected Canada map geometry
tools/build-map.mjs     Script that generated mapdata.js
```

To add a subject, create a folder (for example `math/index.html`), link `../assets/site.css`, copy the `<nav class="site-nav">` block, and change its "soon" entry to a link in every page's nav.

## Regenerating the map

`tools/build-map.mjs` projects [Natural Earth](https://www.naturalearthdata.com/) 1:50m data (public domain) with `d3-geo`. It expects `ne50.geojson` (admin-1 provinces), `ne_50m_admin_0.geojson`, `ne_50m_lakes.geojson` and `ne_50m_rivers_lake_centerlines.geojson` next to it, and writes `mapdata.json`. Wrap that output as `const D = …;` in `social-studies/mapdata.js`. The landform region borders are simplified for Grade 4.

## Curriculum

Social Studies follows [BC Curriculum, Social Studies 4](https://curriculum.gov.bc.ca/curriculum/social-studies/4/core) (*First Peoples and European Contact*), which covers Canada's landforms and natural resources.
