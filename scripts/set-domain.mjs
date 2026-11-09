// Define o domínio definitivo do site: canonical, Open Graph, JSON-LD, sitemap.xml e robots.txt.
// Uso: node scripts/set-domain.mjs https://www.seudominio.com.br
// Pode ser executado de novo quando o domínio mudar (é idempotente).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const arg = process.argv[2];
if (!arg || !/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(arg.replace(/\/$/, ""))) {
  console.error("Informe o domínio com https, sem caminho. Ex.: node scripts/set-domain.mjs https://www.seudominio.com.br");
  process.exit(1);
}
const base = arg.replace(/\/$/, "");
const pages = [
  ["/", "index.html", "1.0"],
  ["/sobre/", "sobre/index.html", "0.7"],
  ["/servicos/", "servicos/index.html", "0.9"],
  ["/barbeiros/", "barbeiros/index.html", "0.7"],
  ["/contato/", "contato/index.html", "0.8"],
  ["/politica-de-privacidade/", "politica-de-privacidade/index.html", "0.3"],
  ["/termos-de-uso/", "termos-de-uso/index.html", "0.3"],
];
const img = `${base}/assets/img/og-image.jpg`;
const today = new Date().toISOString().slice(0, 10);

for (const [path, file] of pages) {
  const f = join(root, file);
  if (!existsSync(f)) { console.warn("ignorado (não existe):", file); continue; }
  let html = readFileSync(f, "utf8");
  const block = `<!--LDT:DOMAIN-->
<link rel="canonical" href="${base}${path}">
<meta property="og:url" content="${base}${path}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logo da Barbearia Stilo">
<meta name="twitter:image" content="${img}">
<!--/LDT:DOMAIN-->`;
  html = html.replace(/<!--LDT:DOMAIN-->[\s\S]*?<!--\/LDT:DOMAIN-->/, block);
  html = html.replace(/"@type":"BarberShop",(?:"url":"[^"]*","image":"[^"]*",)?/, `"@type":"BarberShop","url":"${base}/","image":"${img}",`);
  writeFileSync(f, html);
}

const urls = pages.map(([p, , prio]) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`).join("\n");
writeFileSync(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`Domínio definido: ${base}\nAtualizados: ${pages.length} páginas, sitemap.xml e robots.txt.`);
