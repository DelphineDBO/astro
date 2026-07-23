# Projet — Site personnel de Delphine Bottarlini

Site web personnel : **blog de notes classées par tags**, une section **CV / À propos** et un
**portfolio de projets**. Inspiré du thème [Veka](https://github.com/masmuss/veka) : minimaliste,
typographie soignée, beaucoup d'espace blanc.

## Documentation du projet (à consulter selon le besoin)

- `PUBLISHING.md` — procédure pour **publier un article** depuis Obsidian (workflow de Delphine).
- `README.md` — présentation courte du projet et **rôle de chaque fichier/composant**.

## Principes directeurs

- **Ultra-léger** : aucun composant React, **aucune Astro Island**, 100 % statique.
- **CSS pur** avec variables (pas de Tailwind) — voir `src/styles/global.css`.
- **Interface en français** (une version anglaise existe uniquement pour la page CV).
- Déployé sur **GitHub Pages** — la config `site` + `base: '/astro'` dans `astro.config.mjs`
  ne doit pas être cassée. Tous les liens internes passent par le helper `href()`.

## Façon de travailler avec Delphine

- **Demander validation avant de créer** quelque chose de nouveau (plugin, adaptateur, dépendance,
  nouvelle page/section, abstraction non triviale). Pour les petites modifs évidentes, avancer.
- Être **clair, rapide, efficace** ; donner une recommandation plutôt qu'un catalogue d'options.
- Après chaque création de page, **vérifier l'URL au `curl`** (pas seulement le build).

## Architecture

```
src/
├── content.config.ts       # Collections `posts` et `projects` (même schéma Obsidian tolérant)
├── content/
│   ├── posts/              # Articles (format Obsidian, voir ci-dessous)
│   └── projects/          # Pages de projets (même format ; un projet = un tag)
├── layouts/
│   ├── BaseLayout.astro    # <head>, header, footer, script anti-FOUC du thème
│   └── PostLayout.astro    # Gabarit d'un article
├── components/             # Header, Footer, PostCard
├── pages/
│   ├── index.astro         # Accueil (grille des derniers articles)
│   ├── about.astro         # CV / À propos (FR)
│   ├── en/about.astro      # CV / À propos (EN) + bascule FR/EN
│   ├── posts/[slug].astro  # Page d'un article
│   ├── tags/index.astro    # Nuage de tags
│   ├── tags/[tag].astro    # Articles filtrés par tag
│   └── projects/           # index (liste des projets = tags)
│                           #   + [project]/index (page du projet) + [project]/[page]
├── plugins/
│   └── remark-obsidian.mjs # Convertit les images Obsidian ![[...]] (build-time)
├── lib/url.js              # href() (respecte base), formatDate(), titleOf()
└── styles/global.css       # Design tokens (clair/sombre) + tout le style
```

## Contenu : workflow Obsidian

Les articles sont **écrits dans Obsidian** puis collés tels quels. Convention par article :

- Un dossier nommé par un **code** (ex. `GGWS-001/`) dans `src/content/posts/`.
- Le fichier `.md` à l'intérieur porte le **titre lisible** (pas de champ `title:` : le titre vient
  du nom de fichier, via `titleOf()`).
- Un dossier voisin `CODE_assets/` (ex. `GGWS-001_assets/`) contient les images.
- Frontmatter Obsidian accepté par le schéma tolérant : `reference` (→ slug de l'URL, ex.
  `/posts/ggws-001/`), `publish` (`false` = brouillon), `Date première publication` (→ `pubDate`),
  `tags`. Un champ `description` optionnel alimente l'extrait sur la liste.
- Images en syntaxe Obsidian `![[fichier.png]]` → converties et **optimisées en WebP** par le plugin
  remark. Pour un texte alternatif : `![[fichier.png|texte accessible]]`.

**Publier** : copier le dossier `CODE/` complet dans `src/content/posts/`, puis redémarrer le serveur
de dev (les Content Collections nécessitent un redémarrage pour détecter un nouveau dossier).

> Le plugin remark exige `@astrojs/markdown-remark` (le processeur Markdown par défaut d'Astro 7,
> « Sätteri », ne lance pas les plugins remark sans lui). Dépendance de **build uniquement**.

### Projets : un projet = un tag

La collection `projects` utilise **le même schéma tolérant et le même workflow Obsidian** que les
articles (dossier `CODE/`, `.md` nommé par le titre lisible, `CODE_assets/`, frontmatter
`reference`/`tags`/`publish`/`Date première publication`/`description`). La différence est
**sémantique et dans le routage** :

- **Un projet = un `tag`.** Chaque `.md` est **une page** ; toutes les pages partageant le même tag
  forment un projet. `reference` donne le slug de la page, `tags` désigne le(s) projet(s).
- URLs à 3 niveaux : `/projects/` (liste des projets = tags) → `/projects/<tag>/` (page du projet,
  liste ses pages) → `/projects/<tag>/<reference>/` (une page). Comme pour `/tags/`, le tag sert de
  segment d'URL **brut** (pas de slugification).
- Pas de métadonnée propre au projet : son nom = le tag ; sa date/description sur la liste viennent de
  sa page la plus récente.
- **Fichiers `.json`** : le plugin ne convertit que les **images** (`![[...]]`). Pour proposer un json
  au téléchargement, le placer dans `public/` (les fichiers de `src/content/` ne sont pas servis) et y
  lier via `href()`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
