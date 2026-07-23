import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const toSlug = (s: unknown) =>
  String(s).toLowerCase().trim().replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '');

// URL = code `reference` (ex. GGWS-001 → ggws-001) si présent, sinon nom de fichier/dossier.
const idFromReference = ({ entry, data }: { entry: string; data: Record<string, unknown> }) =>
  data?.reference ? toSlug(data.reference) : entry.replace(/\.[^.]+$/, '').replace(/\/index$/, '');

// Schéma tolérant partagé : accepte le frontmatter Obsidian ET le format simple.
// Utilisé par `posts` ET `projects` (un projet = un tag, chaque .md est une page).
const obsidianSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date().optional(),
    'Date première publication': z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    url: z.string().url().optional(),
    publish: z.boolean().optional(),
    draft: z.boolean().optional(),
  })
  .passthrough()
  .transform((d) => ({
    ...d,
    pubDate: d.pubDate ?? d['Date première publication'] ?? d.date,
    draft: d.draft ?? d.publish === false,
  }));

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts', generateId: idFromReference }),
  schema: obsidianSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: idFromReference }),
  schema: obsidianSchema,
});

export const collections = { posts, projects };
