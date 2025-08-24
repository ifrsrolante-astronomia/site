# 🌌 Site do Clube de Astronomia IFRS

## 🔗 Links Temporários

- Blog principal: [blog.diegooilv.xyz](https://blog.diegooilv.xyz)
- Versão Cloudflare Pages: [blogclube.pages.dev](https://blogclube.pages.dev)

---

## 📝 Como adicionar posts no blog

Adicionar novos posts é simples:

1. Crie um arquivo Markdown (`.md`) dentro da pasta [`src/blog/`](src/blog/).
2. Confira os exemplos existentes para entender a estrutura.
3. Para imagens, **lembre-se** de começar o caminho com `../` para que apareçam corretamente.

> ⚠️ A aba **Conteúdos** ainda está em desenvolvimento e não é possível adicionar materiais por lá no momento.

---

## 🎨 Alterações de estilo (CSS)

O CSS do site é **modular** para facilitar manutenção. O arquivo principal é:

- [`src/css/style.css`](src/css/style.css)

Ele importa os seguintes módulos:

```css
@import url("css/variables.css");
@import url("css/reset.css");
@import url("css/base.css");
@import url("css/header.css");
@import url("css/cta.css");
@import url("css/grid.css");
@import url("css/card.css");
@import url("css/hero.css");
@import url("css/sections.css");
@import url("css/footer.css");
@import url("css/responsive.css");
```

> ⚠️ Faça alterações com cuidado, pois mudanças podem impactar várias partes do layout.

---

## 👥 Colaboração

A criação de posts no blog tende a ser feita pelo bolsista, mas qualquer colaborador pode contribuir com melhorias no site.

---

## 🚀 Próximos passos

- Implementar a aba **Conteúdos** para disponibilizar materiais didáticos.
