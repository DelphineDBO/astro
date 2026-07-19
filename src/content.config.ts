import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const toSlug = (s: unknown) =>
  String(s).toLowerCase().trim().replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '');

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    // URL = code `reference` (ex. GGWS-001 → ggws-001) si présent, sinon nom de fichier/dossier.
    generateId: ({ entry, data }) =>
      data?.reference ? toSlug(data.reference) : entry.replace(/\.[^.]+$/, '').replace(/\/index$/, ''),
  }),
  // Schéma tolérant : accepte le frontmatter Obsidian ET le format simple.
  schema: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),
      pubDate: z.coerce.date().optional(),
      'Date première publication': z.coerce.date().optional(),
      date: z.coerce.date().optional(),
      publish: z.boolean().optional(),
      draft: z.boolean().optional(),
    })
    .passthrough()
    .transform((d) => ({
      ...d,
      pubDate: d.pubDate ?? d['Date première publication'] ?? d.date,
      draft: d.draft ?? d.publish === false,
    })),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
