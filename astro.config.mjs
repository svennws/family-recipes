// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'static',                       // pre-render everything by default
    prefetch: true,                         // links is prefetched on every page
    site: 'https://kjokken.salvesens.net',  // adjust later
    trailingSlash: 'never',                 // pick 'never' or 'always'
    build: { format: 'directory' },         // default: .../page/index.html
});
