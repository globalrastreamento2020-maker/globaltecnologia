# 🗺️ Global Rastreamento — Site Institucional

Site institucional e comercial da **Global Rastreamento**, empresa especializada em rastreamento veicular e gestão de frotas com foco em **autonomia com tecnologia** — o cliente acompanha seu veículo ou frota diretamente pelo aplicativo, sem depender de central de monitoramento.

---

## ✅ Funcionalidades Implementadas

- **Hero Section** com mockup animado de app de rastreamento, indicadores em tempo real simulados e CTAs principais
- **Seção "Como Funciona"** com 4 etapas passo a passo
- **Seção "O Que Inclui"** detalhando o kit completo (rastreador, chip M2M, plataforma, app, suporte)
- **Seção "Para Quem"** diferenciando uso pessoal e empresarial/frotas
- **Seção "Diferenciais"** com 6 cards de vantagens competitivas
- **Aviso de Posicionamento** transparente sobre o modelo sem central 24h
- **Formulário de Contato** com validação, máscara de telefone e redirecionamento automático para WhatsApp
- **Botão WhatsApp Flutuante** com tooltip
- **Botão "Voltar ao Topo"**
- **Header fixo** com backdrop blur e shadow ao scrollar
- **Menu mobile** com hamburger animado
- **Animações de scroll** com Intersection Observer (fade in escalonado)
- **Mockup de app** com estatísticas atualizadas dinamicamente
- **Nav link ativo** conforme seção visível
- **Footer completo** com links, redes sociais e nota sobre o serviço

---

## 📁 Estrutura de Arquivos

```
index.html          → Página principal (única página)
css/
  style.css         → Todos os estilos (responsivo, variáveis CSS)
js/
  main.js           → Interatividade, animações, validação, WhatsApp
README.md           → Documentação do projeto
```

---

## 🔗 Páginas e Âncoras

| Âncora             | Seção                        |
|--------------------|------------------------------|
| `#hero`            | Topo / Hero                  |
| `#como-funciona`   | Como Funciona (4 passos)     |
| `#o-que-inclui`    | O Que Inclui (kit completo)  |
| `#para-quem`       | Para Quem (pessoal/empresa)  |
| `#diferenciais`    | Nossos Diferenciais          |
| `#contato`         | Formulário de Contato        |

---

## ✏️ Personalização Necessária

Antes de publicar, substitua as informações de contato reais:

1. **`index.html`** — Substitua `5500000000000` pelo número de WhatsApp real nos links `wa.me`
2. **`index.html`** — Substitua `contato@globalrastreamento.com.br` pelo e-mail real
3. **`index.html`** — Substitua `@globalrastreamento` pelo @ do Instagram real
4. **`js/main.js`** — Substitua a constante `numero` (linha ~110) pelo WhatsApp real
5. **Logo** — Se desejar substituir o ícone atual por uma imagem/logo oficial

---

## 🚀 Próximos Passos Recomendados

- [ ] Adicionar página de planos/preços com tabela comparativa
- [ ] Criar seção de FAQ (perguntas frequentes)
- [ ] Adicionar depoimentos/cases de clientes reais
- [ ] Integrar Google Analytics / Meta Pixel
- [ ] Adicionar imagens reais de equipamentos e app
- [ ] Criar página de política de privacidade
- [ ] Otimizar SEO (meta tags Open Graph, Schema.org)

---

## 🎨 Identidade Visual

| Elemento         | Valor                  |
|------------------|------------------------|
| Cor primária     | `#1a56db` (azul)       |
| Cor destaque     | `#10b981` (verde)      |
| Fundo principal  | `#f8fafc`              |
| Fonte            | Inter (Google Fonts)   |
| Ícones           | Font Awesome 6         |

---

## 🛠️ Tecnologias Usadas

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript vanilla (ES6+)
- Google Fonts — Inter
- Font Awesome 6 (CDN jsDelivr)
- Intersection Observer API (animações de scroll)
