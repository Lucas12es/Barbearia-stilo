# Barbearia Stilo — Escopo, estratégia e design (Framework LDT v1.0)

## Escopo
- **Tipo:** Site Institucional (5 páginas comerciais: Início, Sobre, Serviços, Barbeiros, Contato) + Política de Privacidade e Termos de Uso.
- **Objetivo comercial:** converter visitantes em agendamentos (link AppBarber) e conversas no WhatsApp.
- **Público:** homens de Cascavel/PR e região que buscam corte e barba com hora marcada, acessando principalmente pelo celular.
- **Canais:** agendamento https://sites.appbarber.com.br/barbeariastilo-45gt · WhatsApp (45) 99852-5862 · Instagram @barbeariastilo_ · Facebook @barbeariastilocvel.
- **Endereço (NAP):** R. Paraná, 5246 — Centro, Cascavel/PR, 85807-040.
- **Restrições:** sem domínio provisório; sem push automático ao GitHub; stack estática por indisponibilidade do npm.
- **Template por nicho:** não solicitado; pasta TEMPLATES/barbearia não foi usada como base.

## Pesquisa e benchmark (hipóteses registradas)
Não houve acesso à web aberta para benchmark de concorrentes na sessão de desenvolvimento (Instagram bloqueado). Hipóteses adotadas a partir do Módulo 5 ("barbearias enfatizam galeria e agendamento") e de padrões do nicho: estética escura, tipografia forte em caixa-alta, CTA de agendamento sempre visível, equipe com nome e rosto, mapa e redes sociais. **Recomenda-se complementar** com benchmark de 5 a 10 barbearias de Cascavel/PR.

## Persona
Homem de 18 a 45 anos, mora ou trabalha no Centro de Cascavel, usa o celular, quer resolver o horário rápido, valoriza pontualidade e um resultado consistente. Objeções: preço, disponibilidade de horário, saber quem vai atender.

## Estratégia
- **Promessa:** barbearia no Centro de Cascavel com equipe identificada e agendamento online.
- **Hero:** "Barbearia em Cascavel com estilo de verdade." (H1 com intenção local de busca).
- **Conversão:** CTA primário "Agendar horário" (AppBarber) em header, hero, cards, CTA final e barra fixa mobile; CTA secundário WhatsApp (botão flutuante no desktop).
- **SEO:** palavras-chave locais, schema BarberShop, FAQ, breadcrumbs.

## Design system
- **Cores:** fundo `#0a0a0b`, superfícies `#151517/#1c1c1f`, texto `#f4f1ea`, apoio `#a9a59c`, destaque `#efc61c` (amarelo da logo). Contrastes AA/AAA (texto claro sobre preto; texto preto sobre amarelo).
- **Tipografia:** Inter Display 900/800 (títulos, caixa-alta) e Inter 400/600 (texto); WOFF locais.
- **Espaçamento:** escala de 8 px; container 1200 px; raios 10–32 px.
- **Motion:** 300 ms `cubic-bezier(.22,.8,.24,1)`; reveal ao rolar; respeita `prefers-reduced-motion`.
- **Ícones:** única biblioteca (traço estilo Lucide) em sprite SVG.
- **Assinatura visual:** anel de texto girando ao redor do selo, faixa "barber pole" e contorno "STILO" ao fundo do hero.
