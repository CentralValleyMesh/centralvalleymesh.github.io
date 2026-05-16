# Central Valley Mesh — Website

The community website for [centralvalleymesh.net](https://centralvalleymesh.net) — a volunteer-run Meshtastic mesh radio network covering the Central Valley of California from Stockton and Manteca down through Fresno and beyond. Free, encrypted, no internet required.

## About the Site

Plain HTML/CSS/JS — no framework, no build step, no CMS. Every page is a finished HTML file you can open directly in a browser. Hosted on Netlify, deployed automatically on push to `main`.

## Site Structure

```
index.html           ← Home page with live network widgets
about.html           ← About CVM and the network
docs.html            ← Documentation hub
builds.html          ← Community build posts listing
community.html       ← Discord, events, bounties
events.html          ← Upcoming community events
bounties.html        ← Hardware bounty board (coverage gaps needing nodes)
stats.html           ← Live network stats (MeshInfo API)
map.html             ← Live node map embed (MeshInfo)
contact.html         ← Contact and privacy info
contribute.html      ← Full guide to contributing to the site
found.html           ← QR code landing page for deployed nodes
404.html             ← Custom 404 page

docs/
  getting-started.html   ← New user guide: hardware, firmware, joining CVM
  faq.html               ← Frequently asked questions
  tools.html             ← Curated tools and resources
  config-wizard.html     ← Interactive CLI config generator

builds/
  _template/
    index.html           ← Copy this folder to add a new build post
  magnetic-sticky-node/
    index.html
    magnet-build-1.jpg
    magnet-build-2.jpg

css/
  style.css              ← Global styles (all pages)
  home.css               ← Home page only

js/
  main.js                ← Nav, announce bar, mobile menu, theme toggle
  stats.js               ← Live node and traceroute widgets (index page)
  meshinfo-config.js     ← API toggle (live vs mock data)

images/                  ← Site-wide images and logos
mock_api_data/           ← Dev only: sample API responses for local testing
```

## Features

- **Live network stats** — active nodes, online ratio, hardware breakdown, traceroutes, recent chat and MQTT messages, telemetry — all pulled from the MeshInfo API
- **Live node map** — embedded MeshInfo map showing current node positions across the Central Valley
- **Node name resolution** — stats widgets display long/short names where available, falling back to node IDs
- **Community builds** — self-contained build posts with photos, parts lists, and build notes; each build lives in its own folder
- **Bounty board** — open requests for node deployments in coverage gaps
- **Config wizard** — interactive tool that generates exact Meshtastic CLI commands for CVM settings
- **Announce bar** — dismissable sitewide banner for network announcements
- **Fully responsive** — mobile-first design, tested down to 375px
- **Dark mode default** — matches Meshtastic's aesthetic; light mode toggle available
- **Mock data mode** — dev toggle to run the site with sample API data locally without needing API access

## Contributing

No build tools required. To contribute:

1. Fork the repo
2. Make your changes directly to the HTML/CSS/JS files
3. Open a pull request

See [contribute.html](contribute.html) for the full guide including how to add build posts, events, and bounties.

### Adding a Build Post

Copy the `builds/_template/` folder, rename it to your build name, add your photos to the same folder, edit `index.html`, then add a card to `builds.html`.

### Adding an Event

Open `events.html`, copy an existing `event-card` block, paste it, fill in the details.

### Adding a Bounty

Open `bounties.html`, copy an existing bounty card, paste it, fill in the location and description.

## Live Data

Stats and map pages use the [MeshInfo](https://meshinfo.cvme.sh) API at `meshinfo.cvme.sh`.

**CORS requirement:** `meshinfo.cvme.sh` must have `centralvalleymesh.net` in its `ALLOW_ORIGINS` list or the stats page will show loading spinners on the live site.

To run locally with live data, serve the site from a local web server (e.g. `python3 -m http.server 8000`) — the API requires a proper origin header that `file://` URLs don't provide.

To run locally with mock data, set `USE_MOCK_MESHINFO = true` in `js/meshinfo-config.js`.

## Deployment

Netlify watches this repo. Push to `main` → live in under a minute. No build command — Netlify serves the repo root directly. Configuration is in `netlify.toml`.

The `CNAME` file must remain in the repo root. It maps `centralvalleymesh.net` to this repo. Deleting it breaks the domain.

## License

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0) — Central Valley Mesh, 2018–2025
