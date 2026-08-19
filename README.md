# CyberSpace Local

Official website for **CyberSpace Local** — professional websites and digital presence for local businesses in Southwest Florida.

Production domain: [https://cyberspacelocal.com](https://cyberspacelocal.com)

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

The site is a static Vite project. There is no backend. GitHub Pages can serve the `dist` output via the included workflow.

## Updating launch pricing

Edit `src/data/site.js`:

```js
pricing: {
  website: { amount: 499, display: "$499", cadence: "One-time" },
  management: { amount: 149, display: "$149", cadence: "/month" },
}
```

Also update any price mentions in FAQ copy in `index.html` if the public-facing language should stay in sync.

## Portfolio concept URLs

Concept sites are configured in `src/data/site.js`. Leave `url` empty until the destination is live — the **View Website** button stays disabled so visitors are never sent to a broken page.

```js
portfolio: [
  { id: "pressure-washing", url: "" }, // https://pressurewashing.cyberspacelocal.com
  { id: "landscaping", url: "" },      // https://landscaping.cyberspacelocal.com
  { id: "plumbing", url: "" },         // https://plumbing.cyberspacelocal.com
]
```

## Logo

Place the official logo at:

- `public/logo.svg` (used in the header and footer)
- `public/favicon.svg` (browser icon)

If the official file is a full horizontal lockup, set `logo.showWordmark` to `false` in `src/data/site.js` so the HTML wordmark is hidden.

## Preview form

The homepage form is wired for a future endpoint. Set `formEndpoint` in `src/data/site.js` to a Formspree, Getform, Basin, or custom URL when it exists. Until then, the form validates locally and shows a success state without sending data.

## GitHub Pages

`.github/workflows/pages.yml` builds the site and deploys `dist` on pushes to `main`.

In the GitHub repository:

1. Settings → Pages
2. Source: **GitHub Actions**

Do not add a `CNAME` file until the custom domain is ready to connect. DNS and GoDaddy remain a separate step.

Relative asset paths (`base: './'`) keep the site working from a repository Pages URL and from `cyberspacelocal.com`.
