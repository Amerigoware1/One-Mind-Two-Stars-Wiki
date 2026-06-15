---
layout: default
title: Gallery
permalink: /gallery/
---

<div class="card-bg">
  <h1>Gallery</h1>
  <p>A collection of artifacts, environments, and curiosities from <em>One Mind Two Stars</em>.</p>
</div>

<!-- Search + Tag Filter -->
<div class="gallery-controls">
  <input
    type="text"
    id="gallery-search"
    placeholder="Search by title, description, or tags…"
    autocomplete="off"
  >
  
  <select id="tag-filter">
    <option value="">All Tags</option>
  </select>
</div>

<!-- Gallery Grid -->
<div id="gallery" class="gallery-grid">
  <div class="loading">Loading gallery...</div>
</div>

<!-- PhotoSwipe Root -->
<div class="pswp" id="pswp" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="pswp__bg"></div>
  <div class="pswp__scroll-wrap">
    <div class="pswp__container">
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
    </div>

    <div class="pswp__ui pswp__hide-on-close">
      <div class="pswp__top-bar">
        <button class="pswp__button pswp__button--close"></button>
        <button class="pswp__button pswp__button--arrow--prev"></button>
        <button class="pswp__button pswp__button--arrow--next"></button>
        <div class="pswp__counter"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .card-bg img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
  }

  .card-title {
    margin-top: 0.5rem;
    font-weight: bold;
    color: #fff;
    font-size: 0.95rem;
  }

  .card-description {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: #aaa;
    line-height: 1.3;
  }

  .card-tags {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    justify-content: center;
  }

  .tag {
    background: #1e0a47;
    color: #b79aff;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.65rem;
    text-transform: lowercase;
  }

  #gallery-search,
  #tag-filter {
    background: #0c0028;
    border: 1px solid #1e0a47;
    color: inherit;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
  }

  #gallery-search:focus,
  #tag-filter:focus {
    outline: none;
    border-color: #7b4fd4;
  }

  .loading,
  #no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: #aaa;
  }

  /* Force close button visible */
  .pswp__button--close {
    opacity: 1 !important;
    visibility: visible !important;
  }
</style>

<!-- PhotoSwipe v5 UMD -->
<script src="{{ '/photoswipe.umd.min.js' | relative_url }}"></script>
<script src="{{ '/photoswipe-lightbox.umd.min.js' | relative_url }}"></script>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const galleryEl = document.getElementById("gallery");
  const searchEl = document.getElementById("gallery-search");
  const tagFilterEl = document.getElementById("tag-filter");

  let items = [];
  try {
    const res = await fetch("{{ '/assets/images/gallery/manifest.json' | relative_url }}");
    items = await res.json();
  } catch (err) {
    galleryEl.innerHTML = "<div class='loading'>Failed to load gallery.</div>";
    console.error("Gallery JSON load error:", err);
    return;
  }

  // Build tag list
  const allTags = new Set();
  items.forEach(i => i.tags.forEach(t => allTags.add(t)));
  [...allTags].sort().forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    tagFilterEl.appendChild(opt);
  });

  function renderGallery() {
    const query = searchEl.value.toLowerCase().trim();
    const tag = tagFilterEl.value;

    const filtered = items.filter(item => {
      const matchesText =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      const matchesTag = !tag || item.tags.includes(tag);

      return matchesText && matchesTag;
    });

    if (filtered.length === 0) {
      galleryEl.innerHTML = "<div id='no-results'>No results found.</div>";
      return;
    }

    galleryEl.innerHTML = "";
    filtered.forEach((item, index) => {
      const link = document.createElement("a");
      link.href = "{{ '/assets/images/gallery/' | relative_url }}" + item.file;
      link.dataset.pswpWidth = item.width;
      link.dataset.pswpHeight = item.height;
      link.dataset.pswpIndex = index;
      link.className = "card-bg";

      link.innerHTML = `
        <img src="{{ '/assets/images/gallery/' | relative_url }}${item.file}" alt="${item.title}">
        <div class="card-title">${item.title}</div>
        <div class="card-description">${item.description}</div>
        <div class="card-tags">
          ${item.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      `;

      galleryEl.appendChild(link);
    });

    initLightbox();
  }

  let lightbox;
  function initLightbox() {
    if (lightbox) lightbox.destroy();

    lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: PhotoSwipe,

      wheelToZoom: true,
      showHideAnimationType: 'zoom',
      closeOnVerticalDrag: true,

      captionContent: (slide) => {
        const item = items[slide.data.index];
        return {% raw %}`
          <div style="padding: 1rem; text-align: center;">
            <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem;">
              ${item.title}
            </div>
            <div style="font-size: 0.9rem; opacity: 0.8;">
              ${item.description}
            </div>
          </div>
        `{% endraw %};
      }
    });

    lightbox.init();
  }

  renderGallery();
  searchEl.addEventListener("input", renderGallery);
  tagFilterEl.addEventListener("change", renderGallery);
});
</script>
