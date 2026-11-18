# Archived case studies

The long-form case studies (Eudo, eFilmHub, LP Wealth Group) that used to live at `/projects/:id`.
They were archived on 2026-11-17 when the portfolio switched to five simple project overviews
(see `src/data/projects.js` and `src/pages/ProjectDetail.js`).

These files are not imported anywhere, so they are not part of the build. To bring a case study back,
move `ProjectDetail.js` to `src/pages/`, fix its relative imports (`../contexts`, `../firebase`) and add a route.
