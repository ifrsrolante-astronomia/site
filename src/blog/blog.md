---
layout: base.njk
title: Blog do Clube
pagination:
  data: collections.posts
  size: 5
  alias: posts
---

<h1>📰 Blog do Clube</h1>

<div class="blog-list">
{% for post in posts %}
  <div class="blog-card">
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <p class="post-date">Publicado em {{ post.data.date | formatDate }}</p>
    <p>{{ post.templateContent | excerpt }}</p>
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
