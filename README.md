# Learning Hub

Illustrated practice quizzes for students in BC, organised by subject. It covers **Grade 4** for now, with room to add other grades later.

| Subject | Page | Status |
|---|---|---|
| Social Studies | [`social-studies/`](social-studies/) | Regions of Canada, two versions: **Full quiz** (21 questions) and **Landforms only** (19 questions, at `social-studies/#landforms`) |
| Math | — | Coming soon |
| Science | [`science/`](science/) | Topics menu. **Matter** (`science/matter/`): 30 lessons shown one at a time (arrows, trackpad swipe, ← → keys, `#q5` links), each with an answer, pictures, a "Remember this!" box and a test question |
| Language Arts | — | Coming soon |

## Run it

It's a plain static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

It publishes to GitHub Pages through `.github/workflows/pages.yml` on every push to `main`. Under **Settings → Pages**, **Source** must be set to **GitHub Actions**.

## Structure

```
index.html              Home page and subject menu
assets/site.css         Shared fonts and the subject nav
assets/fonts/           Andika (body) and Fredoka (headings), bundled under the SIL OFL
social-studies/
  index.html            Regions of Canada quiz with a version picker: Full quiz (Q_FULL) or
                        Landforms only (LQ). Tap answers; worksheet view for printing
  mapdata.js            Pre-projected Canada map geometry
science/
  index.html            Science topics menu (add a card per topic)
  matter/index.html     Matter page: one-question-at-a-time carousel
  matter/lessons.js     Matter questions (the LESSONS array)
  matter/art.js         Watercolour-style SVG drawings for the lessons
  matter/images/        Lesson illustrations
assets/lesson.css       Shared styles for learn-then-test lesson pages
tools/build-map.mjs     Script that generated mapdata.js
```

To add a subject, create a folder (for example `math/index.html`), link `../assets/site.css`, copy the `<nav class="site-nav">` block, and change its "soon" entry to a link in every page's nav.

## Regenerating the map

`tools/build-map.mjs` projects [Natural Earth](https://www.naturalearthdata.com/) 1:50m data (public domain) with `d3-geo`. It expects `ne50.geojson` (admin-1 provinces), `ne_50m_admin_0.geojson`, `ne_50m_lakes.geojson` and `ne_50m_rivers_lake_centerlines.geojson` next to it, and writes `mapdata.json`. Wrap that output as `const D = …;` in `social-studies/mapdata.js`. The landform region borders are simplified for Grade 4.

## Curriculum

Social Studies follows [BC Curriculum, Social Studies 4](https://curriculum.gov.bc.ca/curriculum/social-studies/4/core) (*First Peoples and European Contact*), which covers Canada's landforms and natural resources.
