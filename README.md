# Barbearia Stilo — Site institucional

Site institucional premium da **Barbearia Stilo** (R. Paraná, 5246 — Centro, Cascavel/PR), com conversão principal no **agendamento online** (AppBarber) e apoio de **WhatsApp**, Instagram e Facebook.
Projeto **LDT Negócios & Soluções**, segundo o Framework LDT v1.0.

- **Tipo:** Site Institucional — 5 páginas comerciais + 2 legais (+ 404).
- **Stack:** HTML, CSS e JavaScript estáticos, sem dependências e sem build.
  **Exceção documentada à stack padrão (Next.js):** o ambiente de desenvolvimento não tinha acesso ao registro do npm, então não foi possível instalar dependências nem validar `npm run build`. O site não precisa de backend. Mesma solução dos projetos "Atacado Bella Rô" e "IA na Prática". Uma versão Next.js pode ser feita depois reaproveitando design, textos e SEO.
- **Hospedagem:** qualquer host estático (Cloudflare Pages recomendado).
- **Identidade:** preto profundo + amarelo extraído da logo (`#efc61c`), tipografia Inter / Inter Display (fontes locais, subset latin), faixa "barber pole" e anel tipográfico em torno do selo.

## Páginas

| URL | Função |
|---|---|
| `/` | Início: hero, sobre, diferenciais, serviços, como funciona, galeria com lightbox, redes, equipe, FAQ, localização, CTA |
| `/sobre/` | Institucional, valores, equipe, localização |
| `/servicos/` | Serviços, passo a passo, FAQ (schema FAQPage) |
| `/barbeiros/` | Equipe: Asafe, Bruno, Daniel Duarte, Gustavo e Vagner, com botão de agendamento |
| `/contato/` | Canais, formulário que continua no WhatsApp, mapa |
| `/politica-de-privacidade/` · `/termos-de-uso/` | Páginas legais (texto-base a revisar) |

## Estrutura

```
index.html · sobre/ · servicos/ · barbeiros/ · contato/ · politica-de-privacidade/ · termos-de-uso/
404.html · robots.txt · _headers · wrangler.jsonc · .assetsignore · deploy.bat
assets/css/styles.css     Design system (tokens em :root)
assets/js/config.js       WhatsApp, link de agendamento e Google Analytics
assets/js/main.js         Menu, reveal, formulário→WhatsApp, GA com consentimento
assets/fonts · assets/img Fontes WOFF, logo, ícones (sprite SVG) e fotos em WebP
assets/img/equipe/        Fotos dos 5 barbeiros
scripts/set-domain.mjs    Define domínio: canonical, Open Graph, JSON-LD, sitemap.xml e robots.txt
docs/                     Escopo, pesquisa, estratégia e design
```

## Rodar localmente

```bash
python -m http.server 8000     # ou: npx serve .
```
Abra http://localhost:8000. Não há `npm install` nem build. (Sirva a partir da raiz: os links usam caminhos absolutos como `/sobre/`.)

## Pendências antes de publicar

1. **Domínio (nenhum domínio provisório foi usado, a seu pedido):** quando o domínio definitivo existir, rode
   `node scripts/set-domain.mjs https://www.seudominio.com.br`. Isso preenche canonical, `og:url`, `og:image`, JSON-LD e **gera `sitemap.xml` e a linha `Sitemap` do `robots.txt`**. Até lá o site funciona, mas sem esses itens.
2. **Galeria:** 9 fotos (em `assets/img/galeria/`) vieram do Instagram oficial da Stilo (@barbeariastilo_), baixadas com autorização do responsável. Elas mostram clientes e barbeiros: confirme com a barbearia o uso de imagem. Para trocar/adicionar, edite `galOrder` no gerador ou os botões `.tile` em `index.html`.
3. **Resolução das fotos dos barbeiros:** foram recortadas de um print (~130 px) e aparecem levemente suaves. Substitua por fotos originais em `assets/img/equipe/<nome>.webp` (360×360) para nitidez total.
4. **Dados a confirmar com o cliente** (o site **não inventa**): lista oficial de serviços, valores, horário de atendimento, história detalhada, depoimentos (o "+8 anos de tradição" e o endereço com "sala 1" vieram da bio do Instagram). Hoje os textos remetem ao agendamento online/WhatsApp. O link do Facebook foi montado a partir de `@barbeariastilocvel` (`facebook.com/barbeariastilocvel`) e não pôde ser testado.
5. **Páginas legais:** preencher `[razão social e CNPJ]` e `[e-mail de contato]` e **revisar com advogado**.
6. **Google Analytics 4 (opcional):** `assets/js/config.js` → `gaId: "G-XXXXXXXXXX"`. O GA só carrega após "Aceitar" no aviso de cookies (o aviso só aparece quando há `gaId`). Depois cadastre o site no Google Search Console e envie `/sitemap.xml`.
7. **Google Business Profile:** garanta nome, endereço e telefone idênticos ao do site (maior ganho de SEO local).

## SEO implementado

Title e description únicos por página, H1 único, Open Graph/Twitter Cards, schema.org (`BarberShop` com endereço, geo, telefone e redes, `WebSite`, `FAQPage`, `BreadcrumbList`, `ContactPage`), URLs limpas, links internos, imagens WebP com dimensões, fontes locais com `font-display: swap` e preload, `noindex` na 404.
Palavras-chave trabalhadas: barbearia em Cascavel, barbearia no Centro de Cascavel, corte de cabelo e barba em Cascavel, agendamento online.

## Deploy (Cloudflare Pages)

Build command: vazio · Output directory: `/` (raiz). O `.assetsignore` evita publicar README, scripts e docs.
Para enviar ao GitHub (`Lucas12es/Barbearia-stilo`), dê dois cliques em `deploy.bat`. Nada é enviado automaticamente.

## Validação realizada

Chromium (Playwright) em 1366 px e 390 px: 8 páginas sem erros de console, sem recursos 404 e sem rolagem horizontal; menu mobile, FAQ e validação/envio do formulário testados. Métricas de LCP/CLS medidas no navegador (ver resposta de entrega). **Lighthouse não foi executado** (ferramenta indisponível no ambiente): rode no Chrome (DevTools → Lighthouse) após publicar e registre os resultados. O mapa do Google e os links externos (agendamento, Instagram, Facebook) não puderam ser abertos pelo ambiente de desenvolvimento.
