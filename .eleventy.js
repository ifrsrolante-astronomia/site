const nunjucks = require("nunjucks");

module.exports = function (eleventyConfig) {
  // --- COLEÇÕES ---
  // Coleção principal para todos os posts, ordenados do mais novo para o mais antigo.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Coleção específica para a página inicial, contendo apenas os 3 posts mais recentes.
  eleventyConfig.addCollection("postsRecentes", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date)
      .slice(0, 3); // Pega os 3 primeiros itens
  });

  // Coleção para os conteúdos, também ordenados por data.
  eleventyConfig.addCollection("conteudos", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/conteudos/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Coleção para a equipe, ordenada alfabeticamente.
  eleventyConfig.addCollection("participants", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/equipe/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title));
  });


  // --- FILTROS (FILTERS) ---
  // Formata a data para o padrão brasileiro (dd/mm/aaaa).
  eleventyConfig.addFilter("formatDate", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return String(date);
    
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  });

  // Remove tags HTML de uma string.
  eleventyConfig.addFilter("stripHtml", function (value) {
    return value ? String(value).replace(/<\/?[^>]+(>|$)/g, "") : "";
  });

  // Cria um resumo (excerpt) de um texto.
  eleventyConfig.addFilter("excerpt", function (content, length = 140) {
    if (!content) return "";
    const clean = String(content).replace(/<\/?[^>]+(>|$)/g, "").trim();
    if (clean.length <= length) return clean;
    return clean.slice(0, length).trim() + "...";
  });

  // Calcula e formata a data da próxima quinta-feira.
  eleventyConfig.addFilter("nextWednesday", function () {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const diasAteQuinta = (4 - diaSemana + 7) % 7 || 7; // Ajustado para Quinta Feira
    const proxima = new Date();
    proxima.setDate(hoje.getDate() + diasAteQuinta);
    return proxima.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  });


  // --- CÓPIA DE ARQUIVOS ESTÁTICOS ---
  // Copia as pastas necessárias para o site final.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({
    "src/img": "img",
    "src/blog/img": "blog/img",
  });


  // --- CONFIGURAÇÃO DE DIRETÓRIOS ---
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
