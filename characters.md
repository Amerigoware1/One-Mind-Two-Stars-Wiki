---
layout: default
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

<style>
  .character-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .character-card {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  .character-card h2 a {
    color: #428bca;
    text-decoration: none;
  }
  .character-thumb {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin: 1rem 0;
  }
</style>
