// @ts-check
import { defineConfig } from 'astro/config';
import remarkObsidian from './src/plugins/remark-obsidian.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://delphinedbo.github.io',
  base: '/astro',
  markdown: {
    remarkPlugins: [remarkObsidian],
    shikiConfig: {
      // Double thème : suit le mode clair/sombre du site (voir global.css).
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
