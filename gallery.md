---
layout: default
title: Gallery
permalink: /gallery/
---
<link rel="stylesheet" href="{{ '/photoswipe.css' | relative_url }}">
<script src="{{ '/photoswipe-lightbox-umd.min.js' | relative_url }}"></script>
<script src="{{ '/photoswipe-umd.min.js' | relative_url }}"></script>
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
<script>
console.log("Gallery script is running");
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

    // 2. Initialize the v5 Lightbox
    lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: PhotoSwipe, // Points to the core UMD module script

      wheelToZoom: true,
      showHideAnimationType: 'zoom',
      closeOnVerticalDrag: true,
    });

    // 3. Custom v5 UI Hook to render Captions dynamically
    lightbox.on('uiRegister', function() {
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isCustomElement: true,
        appendTo: 'root',
        onInit: (el, pswpInstance) => {
          // Listen for slide changes to swap text
          lightbox.pswp.on('change', () => {
            const currSlide = lightbox.pswp.currSlide;
            // Fetch item data using the slide index
            const itemData = items[currSlide.index]; 
            
            if (itemData) {
              el.innerHTML = `
                <div style="padding: 1.5rem; text-align: center; color: #fff; background: rgba(0, 0, 0, 0.75); position: absolute; bottom: 0; left: 0; right: 0; z-index: 9999;">
                  <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.4rem;">${itemData.title}</div>
                  <div style="font-size: 0.95rem; opacity: 0.85;">${itemData.description}</div>
                </div>
              `;
            } else {
              el.innerHTML = '';
            }
          });
        }
      });
    });

    lightbox.init();
  }
</script>
