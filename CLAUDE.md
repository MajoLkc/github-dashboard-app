# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (eslint-config-next with TypeScript and Core Web Vitals)
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with PostCSS
- **React**: React 19

## Architecture

This is a Next.js App Router project:
- `app/` - Contains all routes, layouts, and pages
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Homepage
- `app/globals.css` - Global styles with Tailwind CSS import and CSS custom properties for theming

## Path Aliases

Use `@/*` to import from the project root (configured in `tsconfig.json`).

## Styling Notes

- Uses Tailwind CSS v4 (imported via `@import "tailwindcss"`)
- Custom CSS properties defined in `:root` for `--background` and `--foreground`
- Dark mode supported via `prefers-color-scheme` media query
- Geist fonts available via CSS variables: `--font-geist-sans` and `--font-geist-mono`
