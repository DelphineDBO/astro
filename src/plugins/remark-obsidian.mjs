import { visit } from 'unist-util-visit';
import path from 'node:path';

// Convertit les images Obsidian ![[fichier.png]] (ou ![[fichier.png|texte]])
// en images Markdown standard pointant vers le dossier <CODE>_assets voisin,
// pour qu'Astro les optimise automatiquement.
const EMBED = /!\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g;

export default function remarkObsidian() {
  return (tree, file) => {
    const code = file.dirname ? path.basename(file.dirname) : '';
    const assets = code ? `${code}_assets` : '';

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || !EMBED.test(node.value)) return;
      EMBED.lastIndex = 0;

      const out = [];
      let last = 0;
      let m;
      while ((m = EMBED.exec(node.value)) !== null) {
        if (m.index > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
        const fname = m[1].trim();
        const alt = (m[2] || fname).trim();
        out.push({ type: 'image', url: `./${assets}/${fname}`, alt });
        last = m.index + m[0].length;
      }
      if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });

      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}
