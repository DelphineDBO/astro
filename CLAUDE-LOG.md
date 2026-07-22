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

### Corrections Lighthouse (mobile)
- Rapport PageSpeed transmis par Delphine. Scores mobile relevés (Lighthouse local) :
  **Performance 100, SEO 100**, Best Practices 96, Accessibilité 94. Les « rouges » n'étaient
  **pas** de la perf.
- **Erreur console 404 (Best Practices)** : le favicon pointait vers `/astrofavicon.svg` (slash
  manquant) car `BaseLayout.astro` construisait l'URL à la main (`${BASE_URL}favicon.svg`). Corrigé
  en passant par le helper `href('favicon.svg')` → `/astro/favicon.svg`. (Rappel : tous les liens
  internes doivent passer par `href()`.)
- **Contraste insuffisant (Accessibilité)** : texte des tags `#6b7a34` sur `--accent-soft`
  `#eef1e0` = **4.1:1**, sous le seuil AA (4.5:1) pour du 12px. Ajout d'une variable dédiée
  `--tag-color: #5c6a2c` (olive à peine plus foncé, **5.15:1**) utilisée par `.tag` ; le vert
  `--accent` de la marque reste inchangé partout ailleurs. Thème sombre déjà à 7:1, laissé via
  `var(--accent)`.
- **Non corrigés (hors de notre contrôle / non rentables)** : cache TTL court (10 min) imposé par
  les en-têtes GitHub Pages ; CSS bloquant (4,5 Ko, gain estimé « None »).
- Vérifié : `astro build` OK, HTML généré contient `href="/astro/favicon.svg"`, plus aucune
  occurrence de `astrofavicon`. **Reste à redéployer** pour voir l'effet en ligne.

### Ordre manuel des tags sur l'accueil
- Demande de Delphine : pouvoir choisir l'ordre des groupes de tags sur l'accueil (ex. LITTERATURE
  avant GOOGLE-WORKSPACE), au lieu du tri automatique par nombre d'articles.
- `index.astro` : ajout d'une liste `tagOrder = ['LITTERATURE', 'GOOGLE-WORKSPACE']` en haut du
  fichier. Les tags qui y figurent passent en premier dans cet ordre ; les autres suivent, triés
  par nombre d'articles (décroissant) puis alphabétiquement. → Delphine réorganise `tagOrder` à la
  main quand elle veut.
- Documenté dans `README.md` (ligne `pages/index.astro`).

### Rappel — LIT-001 / LIT-002
- Erreur de routing en dev sur ces deux posts : **frontmatter sans champ `reference`** → le slug
  retombait sur le chemin du fichier (`/posts/LIT-002/Livres - Références…`). Fix = ajouter
  `reference: LIT-001` / `reference: LIT-002` (dans Obsidian aussi). Delphine s'en charge.

### Favicon → emoji étoile
- Remplacement du logo Astro par défaut par l'**emoji ⭐**, en **SVG texte** (`<text>` avec l'emoji)
  plutôt qu'une image : ultra-léger (**163 o** contre 749), rendu en couleur par la police emoji du
  système, aucun coût de build. Fichier `public/favicon.svg`.
- `public/favicon.ico` (ancien logo Astro, 655 o) laissé en place mais **non référencé** dans le
  `<head>` (seul le `.svg` l'est via `href('favicon.svg')`) → invisible sur navigateurs modernes ;
  à supprimer un jour pour faire propre.
- Note : favicons très mis en cache → rechargement forcé (Cmd+Shift+R) pour voir le changement.
