# CLAUDE-LOG

Historique des actions réalisées sur le projet. À jour au **2026-07-19**.

---

## 2026-07-19 — Mise en place du site

### Idéation & décisions
- Analyse du thème de référence **Veka** (minimaliste, statique, typo soignée).
- Choix validés avec Delphine :
  - Style : **CSS pur + variables** (pas de Tailwind).
  - **Dark mode** avec bouton bascule (vanilla JS inline, sans island).
  - **Interface en français**.
  - Objectif : **blog par tags + CV/profil + portfolio projets**.

### Fondations
- Nettoyage des fichiers du tutoriel Astro (anciens `Navigation`, `Menu`, `Social`, `blog.astro`,
  `posts/post-*.md`, etc.).
- Passage aux **Content Collections** (`src/content.config.ts`) avec schémas Zod pour `posts` et
  `projects`.
- Design tokens clair/sombre + tout le style dans `src/styles/global.css`.
- `BaseLayout` (script anti-FOUC du thème), `Header` (nav + toggle), `Footer` (LinkedIn + email),
  `PostCard`.
- Helper `src/lib/url.js` : `href()` (respecte `base: '/astro'`), `formatDate()`.
- Pages : accueil, article `posts/[slug]`, `tags/index` + `tags/[tag]`, `projects/index` +
  `projects/[slug]`, `about`.
- Contenus d'exemple créés puis supprimés une fois le design validé.

### Design
- Couleur d'accent passée en **vert olive** (`#6b7a34` clair / `#aeb86a` sombre).
- Article et projet de démonstration étoffés pour juger le confort de lecture.
- Choix : pas d'images d'illustration ; screenshots pour les tutoriels → bordure fine sur les images.

### Page CV / À propos
- Page `about.astro` construite à partir du CV (PDF) : version **condensée** en français.
- Poste affiché : **IT Director**. Contact (LinkedIn + email) déplacé en haut. Section
  « Programmes marquants » retirée. Bouton **Télécharger le CV** (fichiers `public/cv-fr.pdf` /
  `public/cv-en.pdf` à ajouter par Delphine — non fournis pour l'instant, boutons en 404 en attendant).
- **Version anglaise** `en/about.astro` + bascule FR/EN.
- Coordonnées privées (adresse, téléphone) volontairement omises.

### Workflow Obsidian (adaptateur)
- Constat : les articles viennent d'**Obsidian** (frontmatter spécifique + images `![[...]]`).
- Créé `src/plugins/remark-obsidian.mjs` : convertit `![[fichier]]` → image standard depuis
  `CODE_assets`, optimisée en WebP par Astro.
- Schéma `posts` rendu **tolérant** : `generateId` via `reference` (URL `/posts/ggws-001/`), mapping
  `Date première publication`→`pubDate`, `publish:false`→brouillon ; titre repli via `titleOf()`
  (nom de fichier).
- Installé **`@astrojs/markdown-remark`** (requis pour les plugins remark avec Astro 7).
- Testé sur le vrai article `GGWS-001` : URL, titre et 7 captures optimisées → OK.

### Documentation & mémoire
- `AGENTS.md` (cible du lien `CLAUDE.md`) rempli avec le contexte du projet.
- Création de ce `CLAUDE-LOG.md`.
- Mémoires enregistrées : workflow de publication Obsidian ; règle « demander validation avant de
  créer ».

### Cartes d'articles façon Veka + regroupement par tag
- Constat : le rendu avait perdu le **principe de carte** de Veka — les articles s'affichaient en
  simple liste verticale (séparateurs `border-bottom`) au lieu de vraies cartes.
- Analyse du code source Veka (`wiki/NoteCard.astro` + `tag/[tag].astro`) : carte = **bloc
  entièrement cliquable**, encadré (bordure + rayon + ombre/ring), en **grille 2 colonnes**, survol
  accent, structure titre → description tronquée → badge. **Pas d'image de couverture** (choix
  conservé, fidèle à Veka).
- `PostCard` réécrit en carte (`.card`) : date, titre, `excerpt` en `line-clamp: 2`, tags en bas.
  **Stretched link** (`.stretched::after`) pour rendre toute la carte cliquable tout en gardant les
  tags cliquables au-dessus (évite l'imbrication de `<a>`).
- `.post-list` transformé en **grille responsive** (1 col mobile / 2 col ≥640px) ; `.card` doté d'une
  ombre + léger *lift* au survol. Cartes de hauteur égale (`height:100%` + tags en `margin-top:auto`).
- Carte projet (`projects/index`) rendue elle aussi entièrement cliquable.
- **Page d'accueil rangée par tag** (demande de Delphine) : sections `#tag` (triées par nombre
  d'articles puis alpha), en-tête cliquable + compteur « N articles → », grille de cartes dessous.
  Un article multi-tags apparaît sous chacun de ses tags ; repli « Divers » pour les articles sans tag.

### Correctif images + doc de publication
- **Ratio des images** : les captures étaient déformées (largeur réduite mais hauteur figée). Corrigé
  en ajoutant `height: auto` à la règle `img, svg` de `global.css`.
- Créé `PUBLISHING.md` (mémo autonome pour publier un article depuis Obsidian, à copier dans Obsidian).

### GitHub Pages
- Vérifié la config de déploiement : repo `github.com/DelphineDBO/astro`, déploiement via GitHub
  Actions (`withastro/action`) sur push `main`. URL : `https://delphinedbo.github.io/astro/`.
- **Décision : garder `base: '/astro'`** pendant le dev (obligatoire car le repo s'appelle `astro`).
  Migration vers un **domaine perso** prévue plus tard (→ `base: '/'`, changera toutes les URLs).
  Consigné en mémoire.

### Audit & nettoyage
- Audit complet : architecture saine, **aucune classe CSS morte**, pas de doublon ni de fichier du
  tuto restant, git propre.
- Nettoyages appliqués (validés par Delphine) : suppression des gabarits `article-modele` +
  `projet-modele` (ils étaient `draft:false` donc publics) ; `package.json` `name` → `astro-website` ;
  `README.md` réécrit ; suppression des `.DS_Store`.
- **Piège rencontré** : après suppression, `projet-modele` réapparaissait au build à cause d'un cache
  de la Content Layer dans `node_modules/.astro` / `node_modules/.vite` (le `.astro` racine ne suffit
  pas). Purge complète : `rm -rf .astro dist node_modules/.astro node_modules/.vite` → build propre à
  **7 pages**.

### Refonte visuelle : typo + géométrie plate/anguleuse
- Retour de Delphine : couleurs OK, mais rendu **trop arrondi** et envie d'une **typo plus moderne**.
- **Typo** : introduction d'une vraie police web, **auto-hébergée via Fontsource** (compatible GitHub
  Pages : les `.woff2` sont émis dans `dist/_astro/`, servis depuis le site, sans appel externe, RGPD-safe).
  Après essai de **Sora** (rejetée), choix final = **Hanken Grotesk** (`@fontsource-variable/hanken-grotesk`),
  **police unique** titres + corps. Import dans `BaseLayout.astro`, `--font-body`/`--font-head` mis à jour.
- **Géométrie plate & acérée** : `--radius` **12px → 3px** ; fini les pastilles rondes (tags, boutons,
  bouton thème passent en `--radius`). Cartes **aplaties** : suppression de l'ombre + du *lift* au survol,
  remplacés par un **liseré accent net** (`box-shadow: inset 0 0 0 1px accent`).
- Titres resserrés (`font-weight: 700`, `letter-spacing: -.02em`) ; tags en **petites capitales espacées**.

### Lien permanent copiable (articles + projets)
- Demande de Delphine : afficher en tête de chaque article/projet une ligne
  **« Lien permanent : <url complète> »** avec un **bouton copier**, pour partager le lien vite.
- Créé `src/components/Permalink.astro` : l'URL complète est calculée **au build** via
  `new URL(Astro.url.pathname, Astro.site)` → inclut bien `base` (`/astro/…`). Bouton copier en
  **vanilla JS bundlé** (pas d'island, fidèle au principe ultra-léger) : `navigator.clipboard` avec
  repli `execCommand('copy')`, icône qui passe à ✓ pendant 2 s.
- Intégré **sous l'en-tête** (titre/date/tags, avant le contenu) dans `PostLayout.astro` et
  `pages/projects/[slug].astro`. Styles ajoutés dans `global.css` (section « Lien permanent »,
  tokens du thème, mode clair/sombre).
- Portée validée avec Delphine : **articles + projets** uniquement (pas l'accueil / À propos / tags).
- Vérifié : `astro build` OK ; HTML généré de `GGWS-001` contient bien
  `https://delphinedbo.github.io/astro/posts/ggws-001/`.

### Reste à faire / en attente
- Delphine dépose les PDF `public/cv-fr.pdf` et `public/cv-en.pdf` (plus tard).
- Choix d'un **domaine perso** (puis bascule `base` sur `/`), avant de diffuser les liens.
- Remplir le contenu réel (À propos, premiers articles).
