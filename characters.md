---
layout: character
title: Characters
permalink: /characters/
---

# All Characters

<input
  type="text"
  id="character-search"
  placeholder="Search characters…"
  autocomplete="off"
>

<div class="character-list" id="character-list">
  {% for character in site.characters %}
  <div class="character-card" data-name="{{ character.title | downcase }}">
    <a href="{{ character.url | relative_url }}">
      <img
        src="{{ character.portrait | default: '/assets/images/portrait-placeholder.png' | relative_url }}"
        alt="{{ character.title }}"
        class="character-thumb"
        onerror="this.onerror=null;this.src='{{ '/assets/images/portrait-placeholder.png' | relative_url }}';"
      >
      <h2>{{ character.title }}</h2>
    </a>
    {% if character.status %}
    <p><strong>Status:</strong> {{ character.status }}</p>
    {% endif %}
  </div>
  {% endfor %}
</div>

<p id="no-results" style="display:none;">No characters match your search.</p>

<script>
  const search = document.getElementById('character-search');
  const cards  = document.querySelectorAll('.character-card');
  const none   = document.getElementById('no-results');

  search.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const match = card.dataset.name.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    none.style.display = visible === 0 ? '' : 'none';
  });
</script>

<style>
  #character-search {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0 0 1.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #1e0a47;
    border-radius: 6px;
    background: #0c0028;
    color: inherit;
  }

  #character-search:focus {
    outline: none;
    border-color: #7b4fd4;
  }

  .character-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
  }

  .character-card {
    text-align: center;
  }

  .character-card a {
    text-decoration: none;
    color: inherit;
  }

  .character-card .character-thumb {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: 6px;
    display: block;
    margin-bottom: 0.5rem;
  }

  .character-card h2 {
    font-size: 1rem;
    margin: 0 0 0.25rem;
  }

  .character-card p {
    font-size: 0.85rem;
    margin: 0;
    opacity: 0.75;
  }
</style>
