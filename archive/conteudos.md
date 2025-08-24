---
layout: base.njk
title: Conteúdos Preparatórios
pagination:
  data: collections.conteudos
  size: 5
  alias: conteudos
---

<h1>Conteúdos Preparatórios</h1>
<p>Aqui estão todos os conteúdos do Clube de Astronomia:</p>

<div class="cards-list">
{% for conteudo in conteudos %}
  <div class="card">
    <h2><a href="{{ conteudo.url }}">{{ conteudo.data.title }}</a></h2>
    <p>{{ conteudo.data.description | truncate(150, "...") }}</p>
  </div>
{% endfor %}
</div>

<nav class="pagination">
  {% if pagination.href.previous %}
    <a href="{{ pagination.href.previous }}" class="btn">⬅ Página anterior</a>
  {% endif %}
  {% if pagination.href.next %}
    <a href="{{ pagination.href.next }}" class="btn">Próxima página ➡</a>
  {% endif %}
</nav>
