# Travel Portfolio - Next.js

A modern Next.js 16 App Router implementation of the travel portfolio, migrated from vanilla HTML/CSS/JS with full parity.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: React 19 + TypeScript (strict mode)
- **Styling**: Plain CSS (migrated from original)
- **Animations**: GSAP 3.12.2, ScrollTrigger, Lenis (via CDN)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata and CDN scripts
│   └── page.tsx        # Main page component
├── components/         # React components
├── lib/                # Custom hooks
├── styles/             # Global CSS
└── types/              # TypeScript declarations
```

## Features

- ✨ Smooth scrolling (Lenis)
- 🎨 Light/Dark theme toggle with persistence
- 🎵 Full music player with shuffle, prev/next
- 📸 Parallax image effects
- 🖱️ Custom cursor with mix-blend-mode
- 📜 Scroll reveal animations
- ♾️ Infinite scroll gallery

## Migration Notes

This project was migrated from a vanilla HTML/CSS/JS site. See [MIGRATION_REPORT.md](./MIGRATION_REPORT.md) for detailed mapping and parity checklist.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier format |

## License

© 2026 Yash Dogra
