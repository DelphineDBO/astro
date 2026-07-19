# Site personnel — Delphine Bottarlini

Site web personnel (blog de notes par tags, CV/À propos, portfolio) construit avec **Astro**.
Ultra-léger : aucun composant React, aucune Astro Island, 100 % statique. Inspiré du thème
[Veka](https://github.com/masmuss/veka).

Déployé sur **GitHub Pages** à chaque push sur `main` (voir `.github/workflows/deploy.yml`).
URL : https://delphinedbo.github.io/astro/

## Fonctionnement

Le contenu (articles, projets) est écrit en **Markdown** dans `src/content/` et géré par les
**Content Collections** d'Astro (frontmatter validé par un schéma Zod). Chaque page est générée
statiquement au build. Les articles sont rédigés dans **Obsidian** puis collés tels quels : un
plugin maison convertit le format Obsidian (voir [`PUBLISHING.md`](PUBLISHING.md)).

## Structure & composants

```
src/
├── content.config.ts   → Schémas des collections `posts` et `projects` (Zod).
│                          Schéma `posts` tolérant au frontmatter Obsidian.
├── content/
│   ├── posts/          → Articles (1 dossier par article : CODE/ + CODE_assets/).
│   └── projects/       → Projets du portfolio (fichiers .md).
│
├── layouts/
│   ├── BaseLayout.astro → Squelette commun : <head> (SEO), header, footer,
│   │                       script anti-FOUC du thème clair/sombre.
│   └── PostLayout.astro  → Mise en page d'un article (titre, date, tags,
│                            lien permanent, contenu).
│
├── components/
│   ├── Header.astro     → Barre de navigation + bouton bascule thème (vanilla JS).
│   ├── Footer.astro     → Réseaux (LinkedIn, email) + mention de bas de page.
│   ├── PostCard.astro    → Carte d'article (style Veka), entièrement cliquable.
│   └── Permalink.astro   → Ligne « Lien permanent » + bouton copier (vanilla JS).
│                            Affichée en tête des articles et des projets.
│
├── pages/               → Une route = un fichier :
│   ├── index.astro       → Accueil : articles regroupés par tag. L'ordre des groupes se
│   │                        règle à la main via `tagOrder` en haut du fichier ; les tags
│   │                        absents suivent, triés par nombre d'articles.
│   ├── about.astro       → CV / À propos (français).
│   ├── en/about.astro    → CV / À propos (anglais) + bascule FR/EN.
│   ├── posts/[slug].astro   → Page d'un article.
│   ├── tags/index.astro     → Nuage de tags.
│   ├── tags/[tag].astro     → Articles filtrés par tag.
│   └── projects/            → index.astro (liste) + [slug].astro (détail projet).
│
├── plugins/
│   └── remark-obsidian.mjs → Convertit les images Obsidian `![[...]]` en images
│                             optimisées (build-time uniquement).
│
├── lib/url.js           → Helpers : href() (respecte le base /astro),
│                          formatDate() (dates en français), titleOf() (titre de repli).
│
└── styles/global.css    → Design tokens (thème clair/sombre) + tout le style du site.
```

## Documentation du projet

- [`AGENTS.md`](AGENTS.md) — contexte, architecture et conventions (lié depuis `CLAUDE.md`)
- [`PUBLISHING.md`](PUBLISHING.md) — comment publier un article depuis Obsidian
- [`CLAUDE-LOG.md`](CLAUDE-LOG.md) — historique des travaux

## Commandes

| Commande              | Action                                          |
| :-------------------- | :---------------------------------------------- |
| `npm install`         | Installe les dépendances                        |
| `astro dev --background` | Lance le serveur de dev (voir `AGENTS.md`)   |
| `npm run build`       | Construit le site dans `./dist/`                |
| `npm run preview`     | Prévisualise le build en local                  |
