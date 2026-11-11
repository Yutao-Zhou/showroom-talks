# Showroom Talks

Yutao Zhou’s personal driving journal, published at https://yutaozhou.com/showroom-talks/.

The current site is a responsive static website in `site/`. It preserves the two original reviews and photos, with a vehicle index, powertrain filters, search, browser-local bookmarks, and dedicated reading pages. English and Simplified Chinese are available throughout, including both full reviews. The header also provides light and dark themes.

Language initially follows the browser and theme follows the operating system. Manual choices are remembered in localStorage under `showroom-language` and `showroom-theme`. The theme is applied before styles load to avoid a bright flash. The site still works for the current visit when browser storage is unavailable.

## Run locally

Node.js 18 or newer is sufficient; no package installation is needed for preview or build.

```sh
npm start
```

Open http://127.0.0.1:4175/showroom-talks/. The preview server includes the production subpath and legacy redirects.

## Build and publish

```sh
npm run build
```

This copies `site/` into `build/`. GitHub Pages serves the root of the `gh-pages` branch. Publish the build output to that branch; the existing `npm run deploy` command does this when the repository’s npm dependencies are installed.

## Content

- Full reviews: `site/reviews.json`
- Chinese review translations: `site/reviews.zh.json`
- Interface translations and preference controls: `site/i18n.js`
- Card metadata, article headings, vehicle index, and interaction logic: `site/app.js`
- Layout and styles: `site/index.html` and `site/styles.css`
- Photos, self-hosted fonts, and font licenses: `site/assets/`

To add a review, add its full text to `reviews.json`, add presentation metadata in `app.js`, and place the photo in `site/assets/`. Empty original entries are explicitly labeled “Awaiting notes.” Bookmarks are stored only in the visitor’s browser.

Old links at `post/1`, `post/2`, and `about` redirect to their new destinations through `404.html`. URLs created by the old SPA’s query-string redirect are also supported.

## Original React version

The original Create React App code remains in `src/` and `public/`, and the full publication history is preserved in Git. Its scripts are available as `npm run start:legacy` and `npm run build:legacy` after installing its original dependencies. `npm test` still runs the legacy React test suite.
