---
layout: default
title: Gallery
permalink: /gallery/
---
<link rel="stylesheet" href="{{ '/photoswipe.css' | relative_url }}">
<script src="/One-Mind-Two-Stars-Wiki/photoswipe-umd.min.js"></script>
<script src="/One-Mind-Two-Stars-Wiki/photoswipe-lightbox-umd.min.js"></script>
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

    <div class="pswp__ui pswp--ui-visible">
      <div class="pswp__top-bar">
        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
        <button class="pswp__button pswp__button--arrow--prev" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--next" title="Next (arrow right)"></button>
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

  /* Ensure PhotoSwipe UI is always visible */
  .pswp__ui.pswp--ui-visible .pswp__button--close,
  .pswp__ui.pswp--ui-visible .pswp__button--arrow--prev,
  .pswp__ui.pswp--ui-visible .pswp__button--arrow--next {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
  }

  /* Override touch behavior to always show arrows */
  .pswp--touch .pswp__button--arrow {
    visibility: visible !important;
  }
</style>

<!-- PhotoSwipe v5 UMD -->
<script>
console.log("Gallery script is running");
document.addEventListener("DOMContentLoaded", async () => {
  const galleryEl = document.getElementById("gallery");
  const searchEl = document.getElementById("gallery-search");
  const tagFilterEl = document.getElementById("tag-filter");

  let allItems = [];        // original unfiltered items
  let currentItems = [];    // filtered items shown in grid

  // 1. Load manifest
  try {
    const res = await fetch("{{ '/assets/images/gallery/manifest.json' | relative_url }}");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allItems = await res.json();
  } catch (err) {
    galleryEl.innerHTML = "<div class='loading'>Failed to load gallery manifest.</div>";
    console.error("Manifest load error:", err);
    return;
  }

  // 2. Build tag filter dropdown
  const allTags = new Set();
  allItems.forEach(i => i.tags.forEach(t => allTags.add(t)));
  [...allTags].sort().forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    tagFilterEl.appendChild(opt);
  });

  // 3. Render gallery (and re‑init lightbox)
  function renderGallery() {
    const query = searchEl.value.toLowerCase().trim();
    const selectedTag = tagFilterEl.value;

    currentItems = allItems.filter(item => {
      const matchesText =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);
      return matchesText && matchesTag;
    });

    if (currentItems.length === 0) {
      galleryEl.innerHTML = "<div id='no-results'>No results found.</div>";
      if (window.lightboxInstance) window.lightboxInstance.destroy();
      return;
    }

    // Build grid
    galleryEl.innerHTML = "";
    currentItems.forEach((item, idx) => {
      const link = document.createElement("a");
      link.href = "{{ '/assets/images/gallery/' | relative_url }}" + item.file;
      link.dataset.pswpWidth = item.width;
      link.dataset.pswpHeight = item.height;
      link.dataset.pswpIndex = idx;
      link.className = "card-bg";

      link.innerHTML = `
        <img src="{{ '/assets/images/gallery/' | relative_url }}${item.file}" alt="${item.title}">
        <div class="card-title">${escapeHtml(item.title)}</div>
        <div class="card-description">${escapeHtml(item.description)}</div>
        <div class="card-tags">
          ${item.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
      `;
      galleryEl.appendChild(link);
    });

    initLightbox();
  }

  // 4. PhotoSwipe v5 initialization (with correct filtered items)
  let lightbox = null;
  function initLightbox() {
    if (lightbox) lightbox.destroy();

    lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: PhotoSwipe,
      wheelToZoom: true,
      pinchToClose: true,
      showHideAnimationType: 'zoom',
      closeOnVerticalDrag: true,
    });

    // Custom caption using currentItems (filtered)
    lightbox.on('uiRegister', () => {
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isCustomElement: true,
        appendTo: 'root',
        onInit: (el, pswpInstance) => {
          const updateCaption = () => {
            const idx = pswpInstance.currSlide.index;
            const item = currentItems[idx];
            if (item && el) {
              el.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: #fff; background: rgba(0,0,0,0.7); position: absolute; bottom: 0; left: 0; right: 0;">
                  <div style="font-weight: bold; margin-bottom: 0.25rem;">${escapeHtml(item.title)}</div>
                  <div style="font-size: 0.85rem;">${escapeHtml(item.description)}</div>
                </div>
              `;
            } else if (el) {
              el.innerHTML = '';
            }
          };
          pswpInstance.on('change', updateCaption);
          pswpInstance.on('afterInit', updateCaption);
        }
      });
    });

    lightbox.init();
    window.lightboxInstance = lightbox;
  }

  // Helper to prevent XSS from manifest text
  function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // 5. Event listeners for search / filter
  searchEl.addEventListener("input", () => renderGallery());
  tagFilterEl.addEventListener("change", () => renderGallery());

  // Initial render
  renderGallery();
});
</script>
<script>
  // Test if PhotoSwipeLightbox exists
  window.addEventListener('load', function() {
    if (typeof PhotoSwipeLightbox !== 'undefined') {
      console.log("✅ PhotoSwipeLightbox is loaded globally");
    } else {
      console.error("❌ PhotoSwipeLightbox is NOT defined");
    }
  });
</script>
