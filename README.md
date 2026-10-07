# moves

Howard Homecoming events in one place.

## Current MVP

Mobile-first discovery experience inspired by Posh's restraint:
- manually curated Featured events
- Tonight / 18+ / Free quick filters
- deeper date, age, price, type and music filters
- chronological event feed
- searchable events and venues
- shareable hash-based event detail views
- direct ticket / RSVP links

The current event set is a representative launch subset while the cleaned masterlist is being normalized into the canonical data model.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy from your phone

Every push to `main` triggers the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`.

If Pages is not enabled yet, open the repository on GitHub:
**Settings → Pages → Build and deployment → Source → GitHub Actions**

After that, edits or commits made from GitHub on your phone will automatically rebuild and deploy the site.

## Product rule

The homepage is for deciding. The event page is for understanding.

If data is unknown, show less. Never invent it.
