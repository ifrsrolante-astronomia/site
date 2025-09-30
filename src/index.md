---
layout: base.njk
title: Clube de Astronomia IFRS - Campus Rolante
---

<section class="home-hero">
  <h1 class="home-hero__title">🌌 Clube de Astronomia IFRS</h1>
  <p class="home-hero__subtitle">Sua jornada pelo cosmos começa aqui. Explore, aprenda e observe conosco.</p>
  <div class="home-hero__cta-buttons">
    <a class="btn" href="/blog/">📰 Últimas Notícias</a>
    <a class="btn" href="/conteudos/">📚 Nossos Materiais</a>
  </div>
</section>

<section class="home-intro">
  <div class="home-intro__grid">
    <div class="home-about">
      <h2 class="home-about__title">Sobre o Clube</h2>
      <p class="home-about__text">O Clube de Astronomia do IFRS Campus Rolante é um ponto de encontro para estudantes e entusiastas do universo. Nossa missão é desmistificar a astronomia, tornando-a acessível e fascinante para todos.</p>
      <p class="home-about__text">Promovemos observações, debates sobre descobertas recentes e preparamos nossos membros para competições como a <strong>Olimpíada Brasileira de Astronomia (OBA)</strong>.</p>
    </div>
    <div class="home-latest">
      <h3 class="home-latest__title">Fique por Dentro</h3>
      <ul class="home-latest__list">
        {% for post in collections.postsRecentes %}
        <li class="home-latest__item">
          <a class="home-latest__link" href="{{ post.url }}" title="{{ post.data.title }}">
            <span class="home-latest__post-title">{{ post.data.title }}</span>
            <p class="home-latest__post-preview">{{ post.data.excerpt or post.templateContent | excerpt(80) }}</p>
          </a>
        </li>
        {% endfor %}
      </ul>
      <a href="/blog/" class="home-latest__all-posts-link">Ver todas as notícias →</a>
    </div>
  </div>
</section>

<section class="home-features">
  <h2 class="home-features__title">Nossas Atividades Principais</h2>
  <p class="home-features__subtitle">Vamos além dos livros com encontros dinâmicos e projetos práticos.</p>
  <div class="home-features__grid">
    <div class="feature-item">
      <div class="feature-icon">🔭</div>
      <h3 class="feature-item__title">Observações do Céu</h3>
      <p class="feature-item__text">Encontros práticos para observar planetas, estrelas e galáxias.</p>
    </div>
    <div class="feature-item">
      <div class="feature-icon">🏆</div>
      <h3 class="feature-item__title">Preparo para a OBA</h3>
      <p class="feature-item__text">Materiais de estudo e aulões focados na Olimpíada de Astronomia.</p>
    </div>
    <div class="feature-item">
      <div class="feature-icon">🚀</div>
      <h3 class="feature-item__title">Projetos e Oficinas</h3>
      <p class="feature-item__text">Desenvolvemos projetos de iniciação científica e instrumentos práticos.</p>
    </div>
  </div>
</section>

<section class="home-contact">
  <h2 class="home-contact__title">Participe do Clube!</h2>
  <p class="home-contact__subtitle">Nossos encontros são abertos a todos. Siga-nos e venha para a próxima reunião!</p>
  <div class="home-contact__links">
      <a href="https://instagram.com/clube_astronomia_rolante/" class="contact-button-ig" target="_blank" rel="noopener noreferrer">
        <svg class="contact-button-ig__icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2zm5.1-.8a0.9.9 0 1 1-0.9-0.9 0.9.9 0 0 1 0.9.9z"></path></svg>
        <span class="contact-button-ig__text">@clube_astronomia_rolante</span>
      </a>
      <div class="next-meeting">
          <span class="next-meeting__label">Próximo encontro:</span>
          <span class="next-meeting__date">{{ "" | nextWednesday }}</span>
      </div>
  </div>
</section>