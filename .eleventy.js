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

  eleventyConfig.addFilter("formatDate", function (dateObj) {
    if (!dateObj) return "";
    const d = typeof dateObj === "string" ? new Date(dateObj) : dateObj;
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const day = d.getUTCDate();
    const localSameDay = new Date(y, m, day);
    return localSameDay.toLocaleDateString("pt-BR");
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
    "src/blog/img": "img",
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

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
  };
};
