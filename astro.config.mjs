// @ts-check
import { defineConfig } from 'astro/config';
import remarkObsidian from './src/plugins/remark-obsidian.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://delphinedbo.github.io',
  base: '/astro',
  markdown: {
    remarkPlugins: [remarkObsidian],
  },
});
