# My Personal Website

[Personal site](https://seangordon.co.uk) for Sean Gordon (me!), a software engineer based in London. Built with Next.js App Router, React, TypeScript, and styled-components.

I've got a contact form on the deployed site for any questions, or you can raise an issue on GitHub.

## Getting started

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script        | Description            |
| ------------- | ---------------------- |
| `yarn dev`    | Development server     |
| `yarn build`  | Build production       |
| `yarn start`  | Serve production build |
| `yarn lint`   | ESLint                 |
| `yarn format` | Prettier format        |

## Project structure

```
app/            Next.js routes, layout, global CSS
components/     UI (named exports; barrel at index.ts)
hooks/          Client interaction hooks
lib/            Design tokens, media helpers, site nav consts, registry
public/img/     Static images and icons
```

## Conventions

- **Named exports** for shared UI, hooks, and lib helpers.
- **`"use client"`** where interactivity or styled-components require it.
- **Design tokens** in `lib/motion.ts` (timings / distances) and `app/globals.css` (colors, layout variables, etc.).
- **Nav content** in `lib/siteNav.ts`.
- **Breakpoints** in `lib/media.ts`.

## Stack

- Next.js 16 (App Router)
- React 19
- styled-components 6 (SSR via `StyledComponentsRegistry`)
- ESLint (Airbnb + Next) and Prettier
