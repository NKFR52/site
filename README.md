# Terminal Portfolio (Next.js)

Single-page portfolio website with terminal/IDE aesthetics built using:

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React

## Run locally

1. Install Node.js (LTS).
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

## Quick customization

Edit everything from `src/data/portfolio-data.ts`:

- `FONT_FAMILY` for typography
- `THEME` for primary colors and accents
- `MUSIC_TRACKS` to change audio title/artist/src
- `CONTENT` for all text and headings
- `SKILLS` for graph nodes
- `TIMEZONE` for clock timezone

## Asset placeholders

- Add your music file to `public/audio/` and update the `src` in `MUSIC_TRACKS`
- Add your CV file as `public/cv.pdf` (or change `CONTENT.cvLink`)
