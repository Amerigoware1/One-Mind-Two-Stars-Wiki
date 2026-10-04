---
layout: default
title: Gallery
permalink: /gallery/
---
<!-- The required stylesheet -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.min.css">

<!-- The two JavaScript files -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/umd/photoswipe.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/umd/photoswipe-lightbox.umd.min.js"></script>
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

<style>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.card-bg img,
.card-bg video {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  background: #000; 
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

.pswp__ui.pswp--ui-visible .pswp__button--close,
.pswp__ui.pswp--ui-visible .pswp__button--arrow--prev,
.pswp__ui.pswp--ui-visible .pswp__button--arrow--next {
  opacity: 1 !important;
  visibility: visible !important;
  display: block !important;
}

.pswp--touch .pswp__button--arrow {
  visibility: visible !important;
}
</style>

<script>
console.log("Gallery script running (v5 Video Fix)");
document.addEventListener("DOMContentLoaded", async () => {
  const galleryEl = document.getElementById("gallery");
  const searchEl = document.getElementById("gallery-search");
  const tagFilterEl = document.getElementById("tag-filter");

  let allItems = [];
  let currentItems = [];
  const baseUrl = "{{ '/assets/images/gallery/' | relative_url }}";

  // Load manifest
  try {
    const res = await fetch("{{ '/assets/images/gallery/manifest.json' | relative_url }}");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allItems = await res.json();
  } catch (err) {
    galleryEl.innerHTML = "<div class='loading'>Failed to load gallery manifest.</div>";
    console.error(err);
    return;
  }

  // Build tag filter
  const allTags = new Set();
  allItems.forEach(i => i.tags.forEach(t => allTags.add(t)));
  [...allTags].sort().forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    tagFilterEl.appendChild(opt);
  });

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] || m));
  }

  function isVideoFile(filename) {
    return /\.(mp4|webm|ogg|mov)$/i.test(filename);
  }

  // Render gallery
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
      if (window.lightbox) window.lightbox.destroy();
      return;
    }

    galleryEl.innerHTML = "";
    currentItems.forEach((item, idx) => {
      const link = document.createElement("a");
      link.href = baseUrl + item.file;
      link.dataset.pswpWidth = item.width;
      link.dataset.pswpHeight = item.height;
      link.dataset.pswpIndex = idx;
      link.className = "card-bg";

      const mediaUrl = baseUrl + item.file;
      let mediaHtml;

      if (isVideoFile(item.file)) {
        // FIX 1: Use the poster attribute so it doesn't show a black box
        const posterUrl = item.poster ? baseUrl + item.poster : '';
        mediaHtml = `<video src="${mediaUrl}" poster="${posterUrl}" muted loop playsinline preload="metadata"></video>`;
      } else {
        mediaHtml = `<img src="${mediaUrl}" alt="${escapeHtml(item.title)}">`;
      }

      link.innerHTML = `
        ${mediaHtml}
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

  // PhotoSwipe v5 lightbox
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

    // FIX 2: Properly intercept video clicks and strip the image source
    lightbox.addFilter('itemData', (itemData, element, index) => {
      const item = currentItems[index];
      
      if (item && isVideoFile(item.file)) {
        const videoUrl = itemData.src; 
        const posterUrl = item.poster ? baseUrl + item.poster : '';
        
        // Tell PhotoSwipe this is HTML, not an image
        itemData.type = 'html';
        itemData.width = window.innerWidth;
        itemData.height = window.innerHeight;
        
        // CRITICAL: Delete the src property so PhotoSwipe stops trying to load the MP4 as an image
        delete itemData.src; 
        
        // Inject the HTML5 Video Player
        itemData.html = `
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: rgba(0,0,0,0.95);">
            <video controls autoplay playsinline poster="${posterUrl}" style="max-width: 95vw; max-height: 90vh; outline: none; background: #000; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
              <source src="${videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
      }
      return itemData;
    });

    // Custom caption
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
                <div style="padding: 1rem; text-align: center; color: #fff; background: rgba(0,0,0,0); position: absolute; bottom: 0; left: 0; right: 0;">
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
    window.lightbox = lightbox;
  }

  searchEl.addEventListener("input", renderGallery);
  tagFilterEl.addEventListener("change", renderGallery);

  renderGallery();
});
</script>