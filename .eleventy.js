module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("conteudos", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/conteudos/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};

const nunjucks = require("nunjucks");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("participants", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/equipe/*.md").sort((a, b) => {
      const A = (
        a.data && a.data.title ? String(a.data.title) : ""
      ).toLowerCase();
      const B = (
        b.data && b.data.title ? String(b.data.title) : ""
      ).toLowerCase();
      return A.localeCompare(B);
    });
  });

  eleventyConfig.addFilter("stripHtml", function (value) {
    if (!value) return "";
    return String(value).replace(/<\/?[^>]+(>|$)/g, "");
  });

  eleventyConfig.addFilter("excerpt", function (value, length = 140) {
    if (!value) return "";
    const clean = String(value)
      .replace(/<\/?[^>]+(>|$)/g, "")
      .trim();
    if (clean.length <= length) return clean;
    return clean.slice(0, length).trim() + "...";
  });

  eleventyConfig.addFilter("nextWednesday", function () {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const diasAteQuarta = (3 - diaSemana + 7) % 7 || 7;
    const proxima = new Date();
    proxima.setDate(hoje.getDate() + diasAteQuarta);
    return proxima.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  });

eleventyConfig.addFilter("formatDate", function(date) {
  if (!date) return '';

  let d;
  if (date instanceof Date) {
    d = date;
  } else {
    d = new Date(date);
    if (isNaN(d)) return String(date); // fallback se não for data válida
  }

  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0'); // meses começam do 0
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano}`;
});


  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addCollection(
    "participantsFiltered",
    function (collectionApi) {
      try {
        const byTag =
          collectionApi.getFilteredByTag &&
          collectionApi.getFilteredByTag("participants");
        if (byTag && byTag.length) {
          return byTag.filter((p) => p.url !== "/equipe/");
        }
      } catch (e) {
        /* ignora */
      }

      if (collectionApi.getAll && collectionApi.getFilteredByGlob) {
        const maybe = collectionApi.getAll().filter((item) => {
          const layout =
            item.data && item.data.layout
              ? String(item.data.layout).toLowerCase()
              : "";
          const inParticipantsFolder = (item.inputPath || "")
            .toLowerCase()
            .includes("/participants/");
          return (
            (layout.includes("participant") || inParticipantsFolder) &&
            item.url !== "/equipe/"
          );
        });
        if (maybe.length) return maybe;
      }

      return collectionApi.getAll().filter((item) => item.url !== "/equipe/");
    }
  );

  eleventyConfig.addPassthroughCopy({
    "src/img": "img",
    "src/blog/img": "blog/img",
  });
  eleventyConfig.addFilter("date", function (dateInput, format) {
    const d =
      dateInput === "now"
        ? new Date()
        : dateInput instanceof Date
        ? dateInput
        : new Date(dateInput);

    if (isNaN(d.getTime())) return "";

    if (format === "YYYY") {
      return String(d.getFullYear());
    }
    if (format === "DD/MM/YYYY") {
      return d.toLocaleDateString("pt-BR");
    }

    return d.toISOString();
  });
  
  eleventyConfig.addPassthroughCopy({
    "src/js": "js", 
  });

  eleventyConfig.addFilter("jsonify", function(value) {
    return JSON.stringify(value);
  });

  eleventyConfig.addNunjucksFilter("jsonify", function(value) {
    return new nunjucks.runtime.SafeString(JSON.stringify(value));
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
  };
};
