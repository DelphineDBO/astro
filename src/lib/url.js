// Génère des liens internes qui respectent le `base` de GitHub Pages (/astro).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (p = '/') => base + (p.startsWith('/') ? p : '/' + p);

export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

// Titre d'un article : champ `title` si présent, sinon le nom du fichier .md, sinon l'id.
export const titleOf = (post) => {
  if (post.data?.title) return post.data.title;
  const fp = post.filePath;
  if (fp) return fp.split('/').pop().replace(/\.[^.]+$/, '');
  return post.id;
};
