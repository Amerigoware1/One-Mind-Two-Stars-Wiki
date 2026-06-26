---
layout: character-list
title: Characters
permalink: /_characters/
---
<div><input
  type="text"
  id="character-search"
  placeholder="Search characters…"
  autocomplete="off"
></div>

<div class="character-list" id="character-list">
  {% for character in site.characters %}
  <div class="character-card" data-name="{{ character.title | downcase }}">
    <a href="{{ character.url | relative_url }}">
{% assign portrait_url = character.portrait %}

{% if portrait_url.first %}
  <!-- Check if it's an array [[24]] -->
  {% assign portrait_url = portrait_url.first %}
{% endif %}

<img
  src="{{ portrait_url | default: '/assets/images/portrait-placeholder.png' | relative_url }}"
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

