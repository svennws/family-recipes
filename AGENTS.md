# Repository Guidelines

## Project Structure & Module Organization
The Astro app lives under `src/`. `components/` hosts `.astro` UI fragments (e.g., `BaseHead.astro`), `pages/` exposes routable views, and `styles/global.css` provides sitewide styling. Recipe data is stored as JSON under `src/content/recipes/<category>/<sub>/<slug>.json`, keeping metadata (`title`, `tags`, `steps`, timestamps) next to the copy. `assets/` contains shared media or fallbacks, while `utils/` and `consts.ts` centralize helper code and site metadata. Static files (fonts, favicon, sitemap) belong in `public/`, and build output is emitted to `dist/` via `npm run build`—never edit the latter manually.

## Build, Test, and Development Commands
Run `npm install` once to pull Astro and dependencies. Use `npm run dev` for the local server with hot reload, `npm run build` for a production bundle (also validates the content collections), and `npm run preview` to serve the built artifacts. Before sending a PR, run `npx astro check` to type-check frontmatter and props; it catches most schema issues earlier than CI.

## Coding Style & Naming Conventions
Follow the established Astro style: PascalCase components exporting from `src/components`, ES module syntax, and tab indentation to match existing files. Favor TypeScript for shared utilities, keep imports ordered by module type, and colocate page-specific styles near the page. Recipe filenames are lowercase `kebab-case` slugs (`tomatsuppe-koriander.json`) so URLs stay clean. JSON arrays such as `ingredients` and `steps` should be single-responsibility sentences to ensure clean rendering. Run `npm run build` after content edits to confirm Astro’s content collection schema still passes.

## Testing Guidelines
There is no dedicated Jest/Cypress suite yet, so treat `npx astro check` and `npm run build` as mandatory gates. For content, preview locally and manually spot-check affected routes. When adding layout or component logic, verify both mobile and desktop breakpoints in the responsive devtools, mirroring previous commits that focused on mobile support.

## Commit & Pull Request Guidelines
History shows short, imperative, lower-case messages (`upgrade astro`, `mobile screen support`). Keep following that style, referencing issue IDs when relevant. For pull requests, include: concise summary of the change, affected routes or recipes, manual test notes (`npm run build`, browsers), and screenshots for visual tweaks. Link any related content JSON paths so reviewers can open them quickly.

## Recipe Authoring Tips
Duplicate an existing JSON file if you need a template. Ensure `publishedAt` stays ISO timestamp-like, `tags` reference existing category folders, and ingredient quantities include units (e.g., `2 dl`, `1 ts`). Embed allergen or dietary notes in `description` rather than the title so filters remain clean. EOF
