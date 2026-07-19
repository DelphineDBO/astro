# 📝 Publier un article sur le site

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
