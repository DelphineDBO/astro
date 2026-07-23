Aj# 📝 Publier un article sur le site

Mémo : de la note Obsidian à la mise en ligne. **1 code = 1 article = 1 URL permanente.**

---

## 1. Préparer la note dans Obsidian

Garder la convention habituelle :

- Un **dossier au nom de code** : `GGWS-002/`
- La note `.md` dedans, **nommée avec le titre lisible** → c'est ce titre qui s'affiche sur le site
- Les images dans le dossier voisin **`GGWS-002_assets/`**

Dans le **frontmatter** de la note, les champs utilisés par le site :

```yaml
reference: GGWS-002                    # → l'URL : /posts/ggws-002/  (à ne plus jamais changer)
tags:
  - GOOGLE-WORKSPACE                   # → classe l'article (accueil + page du tag)
Date première publication: 2026-07-20  # → date affichée et tri des articles
publish: true                          # false = brouillon masqué
description: "Résumé en une phrase."    # (optionnel) → extrait affiché sous le titre
```

**Images** : la syntaxe Obsidian `![[capture.png]]` fonctionne telle quelle (converties et
optimisées automatiquement). Pour un texte alternatif (accessibilité) :
`![[capture.png|Écran de connexion Google]]`.

## 2. Copier dans le site

Copier le **dossier `GGWS-002/` complet** (avec son `_assets/`) dans :

```
src/content/posts/
```

## 3. Vérifier en local

Si le serveur de dev tourne, le **redémarrer** (un nouveau dossier n'est pas détecté à chaud) :

```
astro dev stop
astro dev --background
```

Puis ouvrir : `http://localhost:4321/astro/posts/ggws-002/`

## 4. Mettre en ligne (GitHub Pages)

```
git add .
git commit -m "Article GGWS-002"
git push
```

Le déploiement se met à jour automatiquement.

---

## 🔗 À propos de l'URL

- L'adresse en ligne : `https://delphinedbo.github.io/astro/posts/ggws-002/`
- Elle dépend **uniquement de `reference`**. On peut renommer le titre, changer le contenu, les
  tags ou la date sans casser le lien.
- **Ne jamais modifier `reference`** une fois l'article publié → le lien reste valable pour toujours.

## ✅ En résumé

> **Copier le dossier → redémarrer le dev → vérifier → commit/push.**
> Les images, l'URL, le titre et le classement par tag se font tout seuls.

---

# 🗂️ Publier un projet

**Même méthode que pour un article** (dossier de code, `.md` au titre lisible, `_assets/`,
frontmatter Obsidian). La seule différence : **un projet = un tag**, et chaque `.md` est **une page**
du projet. Il suffit de donner le **même tag** à plusieurs `.md` pour qu'ils forment un seul projet.

## 1. Structurer le projet dans Obsidian

Un dossier de code **par page** du projet, chacun avec son `_assets/` :

```
MON-PROJET-intro/
  Présentation.md
  MON-PROJET-intro_assets/
MON-PROJET-techno/
  Détails techniques.md
  MON-PROJET-techno_assets/
```

Frontmatter de chaque page :

```yaml
reference: mon-projet-techno           # → slug de CETTE page (à ne plus changer)
tags:
  - Mon Projet                         # → LE projet (même tag = même projet)
Date première publication: 2026-07-23  # → date affichée et tri
publish: true                          # false = brouillon masqué
description: "Résumé de la page."        # (optionnel) → extrait dans la liste
url: https://exemple.com               # (optionnel) → bouton « Voir le projet ↗ »
```

## 2. Copier dans le site

Copier les dossiers de code (avec leurs `_assets/`) dans :

```
src/content/projects/
```

## 3. Vérifier en local

Redémarrer le dev (nouveau dossier non détecté à chaud), puis ouvrir :

- La liste des projets : `http://localhost:4321/astro/projects/`
- Le projet : `http://localhost:4321/astro/projects/Mon Projet/`
- Une page : `http://localhost:4321/astro/projects/Mon Projet/mon-projet-techno/`

## 📎 Ajouter un fichier `.json` (ou autre) à télécharger

Les **images** fonctionnent comme dans un article (`![[capture.png]]`). Pour un **`.json` à
télécharger**, le plugin ne le prend pas en charge : le placer dans `public/` (ex.
`public/projets/mon-projet/data.json`) et y faire un lien dans le `.md` :
`[Télécharger les données](/astro/projets/mon-projet/data.json)`.
Un fichier laissé dans `_assets/` n'est **pas** accessible par URL.

## ✅ En résumé (projet)

> **Même tag = même projet.** Une page = un `.md`. Copier → redémarrer le dev → vérifier → commit/push.
