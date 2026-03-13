---
layout: character
title: Characters
permalink: /characters/
---

# All Characters

<div class="character-list">
  {% for character in site.characters %}
  <div class="character-card">
    <h2><a href="{{ character.url | relative_url }}">{{ character.title }}</a></h2>
    {% if character.portrait %}
    <img src="{{ character.portrait | relative_url }}" alt="{{ character.title }}" class="character-thumb">
    {% endif %}
    {% if character.status %}
    <p><strong>Status:</strong> {{ character.status }}</p>
    {% endif %}
  </div>
  {% endfor %}
</div>
