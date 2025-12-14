# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (flat config, .ts/.tsx)
npm run typecheck    # TypeScript strict check (tsc --noEmit)
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Architecture

Single-page travel portfolio built with **Next.js 16 App Router**, **React 19**, and **TypeScript**. Every component uses `'use client'` — there are no Server Components.

### External Libraries (CDN-loaded)

GSAP, ScrollTrigger, and Lenis are loaded via `<Script>` tags in `src/app/layout.tsx`, not from npm. They're accessed through `window.gsap`, `window.ScrollTrigger`, and `window.Lenis`. Type declarations live in `src/types/globals.d.ts`.

p5.js is the exception — it's an npm dependency, dynamically imported in the Preloader to avoid SSR issues.

### Page Composition

`src/app/page.tsx` renders all sections in order: Preloader → CustomCursor → FixedControls → HeroSection → PhilosophySection → WorksSection → JournalSection → MapSection → NewsletterSection → ContactSection. A hidden `<audio id="bg-music">` element lives here for the music player.

### State Patterns

- **Music player** (`src/lib/useMusicPlayer.ts`): Singleton pattern sharing one `HTMLAudioElement` across components via a listener Set. Playlist is a hardcoded array; shuffle happens on first play.
- **Theme**: `body.dark-mode` class toggled via `FixedControls`, persisted in localStorage.
- **Smooth scroll** (`src/lib/useLenis.ts`): Instantiates Lenis from `window.Lenis` with a RAF loop.
- **Scroll animations** (`src/lib/useScrollReveal.ts`): Wraps GSAP ScrollTrigger for card reveals.

### Styling

Pure vanilla CSS in `src/styles/globals.css` (~1500 lines). No Tailwind despite what README says. All styles scoped under `.travel-scope`. CSS variables define spacing (`--spacing-page`, `--spacing-section`, `--spacing-element`, `--spacing-grid`) and theme colors that swap on `.dark-mode`.

### Assets

- `public/core/` — travel images (.webp) and videos (.mp4)
- `public/music/` — mp3 playlist (23+ tracks)
- Fonts: "Avant Garde Gothic Pro" as primary typeface

## Conventions

- Prettier: single quotes, semicolons, 2-space indent, 100-char width, trailing commas (es5)
- One component per file, PascalCase filenames
- Hooks prefixed with `use`, stored in `src/lib/`
- CSS classes use kebab-case; animation-heavy components rely on GSAP rather than CSS transitions
- Performance: CustomCursor caches link rect positions with debounced recalculation; Preloader cleans up p5 canvas on completion
