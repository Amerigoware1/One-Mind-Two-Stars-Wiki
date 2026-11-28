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

  <select id="group-by">
    <option value="none">No Grouping</option>
    <option value="category" selected>Group by Category</option>
    <option value="book">Group by Book</option>
    <option value="year">Group by Year</option>
  </select>

</div>

<!-- Gallery Grid -->
<div id="gallery" class="gallery-grid">
  <div class="loading">Loading gallery...</div>

</div>

<style>
.gallery-grid {
  display: block;
  margin-top: 1.5rem;
}

.gallery-grid.is-flat {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.gallery-section {
  margin-bottom: 2.5rem;
}

.gallery-section-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  border-bottom: 1px solid #1e0a47;
  padding-bottom: 0.4rem;
  margin-bottom: 1rem;
}

.gallery-section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #b79aff;
  text-transform: capitalize;
}

.gallery-section-count {
  font-size: 0.75rem;
  color: #777;
}

.gallery-section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>

<style>

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

/* Video Modal Styles */
.video-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 10000;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.video-modal.active {
  display: flex;
}

.video-modal video {
  max-width: 95vw;
  max-height: 85vh;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  outline: none;
}

.video-modal-caption {
  margin-top: 1rem;
  text-align: center;
  color: #fff;
  padding: 0 1rem;
}

.video-modal-caption .title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.video-modal-caption .description {
  font-size: 0.9rem;
  color: #aaa;
}

.video-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.video-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}
/* Custom background color for video cards */
.video-card {
  background-color: #2a124d !important; /* Adjust hex color to preference */
  border: 1px solid #7b4fd4; /* Optional border accent */
}
</style>

<script>
console.log("Gallery script running (v5 with Video Modal)");
document.addEventListener("DOMContentLoaded", async () => {
  const galleryEl = document.getElementById("gallery");
  const searchEl = document.getElementById("gallery-search");
  const tagFilterEl = document.getElementById("tag-filter");
  const groupByEl = document.getElementById("group-by");

  let allItems = [];
  let currentItems = [];
  const baseUrl = "{{ '/assets/images/gallery/' | relative_url }}";

  // ---- Category detection -------------------------------------------------
  // Priority order matters: the first matching rule wins.
  // You can re-order or edit these lists without touching the manifest.
  const CATEGORY_RULES = [
    { name: "Characters & Portraits", tags: ["portrait", "sketch", "drawing", "paint", "femme", "anatomy"] },
    { name: "Places & Environments",  tags: ["building", "environment", "landscape", "town", "home", "house", "grotto", "cave", "museum", "observatory", "new eden", "utopis", "nexus", "samaya", "wayfarer", "pacifier", "central buildings", "living quarters", "town square", "pison river", "geothermal"] },
    { name: "Technology & Science",   tags: ["technology", "science", "schematic", "diagram", "map", "computer lab", "tech lab", "holopad", "interface", "cryo-silk", "celectrum", "celectra", "bismuth", "minerals", "geology", "rocks", "stones", "material", "robot", "bot", "auto otto", "glide pod", "pod chair", "resonance chamber", "medical", "medicine", "medical bay", "surgery", "biology", "psychology", "hydoponics", "gardening", "chemistry"] },
    { name: "Space",                  tags: ["space", "planet", "planets", "moon", "moons", "stars", "orbit", "sun", "chaos", "demeter", "ares", "galinstanian", "species", "alien", "spacecraft", "transport", "space station"] },
    { name: "Culture & Daily Life",   tags: ["activity", "food", "cooking", "drink", "dining", "music", "instrument", "dance", "dancing", "yoga", "karate", "dojo", "soccer", "swim", "swimming", "pool", "gym", "exercise", "exercize", "acrobatics", "flexibility", "athletic activities", "gymnastics", "reading", "study", "homework", "cleaning", "relaxation", "relaxing", "playing", "wedding", "birthday", "government", "council", "organization", "security", "listener corps", "elite", "education", "clothing", "sun hat"] },
    { name: "Family & Childhood",     tags: ["family", "baby", "babies", "newborn", "toddler", "toddlers", "childhood", "childhood home", "youth", "pregnancy", "pregnant", "mother", "daughter", "twins", "babysitting", "kiss", "reminiscence", "social"] },
    { name: "Books & Anthology",      tags: ["anthology", "book 1", "book 2", "book 3", "book 4", "book 4.5", "book 5", "book 6", "book 7", "book 8", "book1", "book2", "book3", "book4", "book5", "pre-series", "gallery", "collection"] },
  ];
  const FALLBACK_CATEGORY = "Other";

  // Character names (manifest tags) that should land in Characters & Portraits.
  const CHARACTER_TAGS = new Set([
    "aditi ming","alex","ananya","aulii","auto otto","bowers","bonzi","carisco",
    "chen wei","chentel","chime","dee","dr. troy","duska","duška","elara","emma",
    "ethan","glockenspiel","hiro","indigo","jasmine","jasper","jaxon","jenni",
    "jenni jo","jia","jia kiran","kael","kalea","keahi-calder","kiri","kisa",
    "kowan","kret","leila","lira","maya","mei","morris","nhial","nia","nyanhial",
    "oxi","ripple","roan","sam","samir","saoirse","shawanna","sofia","stan",
    "strider","tara hui","vance","xan","xara","xara zo","zahara","zoe","zoë","zuri"
  ]);

  function detectCategory(item) {
    // 1. An explicit field in manifest.json always wins:
    //    { "file": "...", "category": "Characters & Portraits", ... }
    if (item.category) return item.category;
    // 2. Otherwise match against the tag rules above.
    const tags = new Set((item.tags || []).map(t => t.toLowerCase()));
    for (const rule of CATEGORY_RULES) {
      if (rule.tags.some(t => tags.has(t))) return rule.name;
    }
    // 3. Character-name tags fall back into Characters & Portraits.
    for (const t of tags) {
      if (CHARACTER_TAGS.has(t)) return "Characters & Portraits";
    }
    // 4. Fallback.
    return FALLBACK_CATEGORY;
  }

  function detectBook(item) {
    if (item.book) return item.book;
    for (const t of item.tags || []) {
      const m = /^book\s*([0-9]+(?:\.5)?)$/i.exec(t.trim());
      if (m) return "Book " + m[1];
    }
    if ((item.tags || []).some(t => /^pre-series$/i.test(t))) return "Pre-Series";
    return "General Artwork";
  }

  function detectYear(item) {
    return String(item.year || "Undated");
  }

  const BOOK_ORDER = ["Pre-Series", "Book 1", "Book 2", "Book 3", "Book 4", "Book 4.5", "Book 5", "Book 6", "Book 7", "Book 8"];

  function sortGroupNames(mode, names) {
    if (mode === "book") {
      return names.sort((a, b) => {
        const ia = BOOK_ORDER.indexOf(a), ib = BOOK_ORDER.indexOf(b);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.localeCompare(b);
      });
    }
    if (mode === "year") return names.sort((a, b) => b.localeCompare(a));
    return names.sort((a, b) => {
      if (a === FALLBACK_CATEGORY) return 1;
      if (b === FALLBACK_CATEGORY) return -1;
      return a.localeCompare(b);
    });
  }

  // Create video modal
  const videoModal = document.createElement("div");
  videoModal.className = "video-modal";
  videoModal.innerHTML = `
    <button class="video-modal-close" aria-label="Close video">&times;</button>
    <video controls playsinline></video>
    <div class="video-modal-caption">
      <div class="title"></div>
      <div class="description"></div>
    </div>
  `;
  document.body.appendChild(videoModal);

  const modalVideo = videoModal.querySelector("video");
  const modalClose = videoModal.querySelector(".video-modal-close");
  const modalTitle = videoModal.querySelector(".title");
  const modalDesc = videoModal.querySelector(".description");

  // Close modal functions
  function closeVideoModal() {
    videoModal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
  }

  modalClose.addEventListener("click", closeVideoModal);
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.classList.contains("active")) {
      closeVideoModal();
    }
  });

  // Load manifest and handle chaos/demeter toggle merge
  try {
    const res = await fetch("{{ '/assets/images/gallery/manifest.json' | relative_url }}");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allItems = await res.json();

    const dayFile = "chaos-demeter-view-from-ares.webp";
    const twilightFile = "chaos-demeter-view-twilight.webp";
    const dayIdx = allItems.findIndex(i => i.file === dayFile);
    const twiIdx = allItems.findIndex(i => i.file === twilightFile);

    if (dayIdx !== -1 && twiIdx !== -1) {
      const dayItem = allItems[dayIdx];
      const twiItem = allItems[twiIdx];
      
      const isDayFirst = Math.random() < 0.5;
      const combined = {
        ...(isDayFirst ? dayItem : twiItem),
        file: isDayFirst ? dayFile : twilightFile,
        title: isDayFirst ? dayItem.title : twiItem.title,
        description: isDayFirst ? dayItem.description : twiItem.description,
        altFile: isDayFirst ? twilightFile : dayFile,
        altTitle: isDayFirst ? twiItem.title : dayItem.title,
        altDescription: isDayFirst ? twiItem.description : dayItem.description
      };

      allItems.splice(Math.max(dayIdx, twiIdx), 1);
      allItems.splice(Math.min(dayIdx, twiIdx), 1, combined);
    }
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

  // Build a single gallery card (link element) for an item
  function createCard(item, idx) {
    const link = document.createElement("a");
    link.className = "card-bg";

    const mediaUrl = baseUrl + item.file;
    let mediaHtml;

    if (isVideoFile(item.file)) {
      link.className = "card-bg video-card";
      const posterUrl = item.poster ? baseUrl + item.poster : '';
      mediaHtml = `<video src="${mediaUrl}" poster="${posterUrl}" muted loop playsinline preload="metadata"></video>`;

      link.dataset.videoUrl = mediaUrl;
      link.dataset.posterUrl = posterUrl;
      link.dataset.title = item.title;
      link.dataset.description = item.description;
      link.dataset.index = idx;
      link.style.cursor = "pointer";

      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalVideo.src = baseUrl + item.file;
        modalVideo.poster = posterUrl;
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.description;
        videoModal.classList.add("active");
        modalVideo.play();
      });
    } else {
      link.href = baseUrl + item.file;
      link.dataset.pswpWidth = item.width;
      link.dataset.pswpHeight = item.height;
      link.dataset.pswpIndex = idx;
      link.dataset.title = item.title;
      link.dataset.description = item.description;
      mediaHtml = `<img src="${baseUrl + item.file}" alt="${escapeHtml(item.title)}">`;

      // If an alternate file exists, swap images & text on hover
      if (item.altFile) {
        link.addEventListener("mouseenter", () => {
          const img = link.querySelector("img");
          const titleEl = link.querySelector(".card-title");
          const descEl = link.querySelector(".card-description");
          if (img) img.src = baseUrl + item.altFile;
          if (titleEl) titleEl.textContent = item.altTitle;
          if (descEl) descEl.textContent = item.altDescription;
          link.href = baseUrl + item.altFile;
        });
        link.addEventListener("mouseleave", () => {
          const img = link.querySelector("img");
          const titleEl = link.querySelector(".card-title");
          const descEl = link.querySelector(".card-description");
          if (img) img.src = baseUrl + item.file;
          if (titleEl) titleEl.textContent = item.title;
          if (descEl) descEl.textContent = item.description;
          link.href = baseUrl + item.file;
        });
      }
    }

    link.innerHTML = `
      ${mediaHtml}
      <div class="card-title">${escapeHtml(item.title)}</div>
      <div class="card-description">${escapeHtml(item.description)}</div>
      <div class="card-tags">
        ${item.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
    `;

    return link;
  }

  // Render gallery (optionally grouped by category / book / year)
  function renderGallery() {
    const query = searchEl.value.toLowerCase().trim();
    const selectedTag = tagFilterEl.value;
    const mode = groupByEl ? groupByEl.value : "none";

    currentItems = allItems.filter(item => {
      const matchesText =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);
      return matchesText && matchesTag;
    });

    if (currentItems.length === 0) {
      galleryEl.classList.remove("is-flat");
      galleryEl.innerHTML = "<div id='no-results'>No results found.</div>";
      if (window.lightbox) window.lightbox.destroy();
      return;
    }

    galleryEl.innerHTML = "";

    if (mode === "none") {
      // Flat grid - original layout
      galleryEl.classList.add("is-flat");
      currentItems.forEach((item, idx) => {
        galleryEl.appendChild(createCard(item, idx));
      });
    } else {
      // Grouped sections with headers
      galleryEl.classList.remove("is-flat");
      const groupFn = mode === "book" ? detectBook : mode === "year" ? detectYear : detectCategory;

      const groups = new Map();
      currentItems.forEach(item => {
        const key = groupFn(item);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(item);
      });

      const names = sortGroupNames(mode, [...groups.keys()]);
      let idx = 0; // running index so lightbox order follows visual order
      names.forEach(name => {
        const section = document.createElement("section");
        section.className = "gallery-section";
        section.dataset.group = name;

        const header = document.createElement("div");
        header.className = "gallery-section-header";
        header.innerHTML = `
          <h2 class="gallery-section-title">${escapeHtml(name)}</h2>
          <span class="gallery-section-count">${groups.get(name).length}</span>
        `;
        section.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "gallery-section-grid";
        groups.get(name).forEach(item => {
          grid.appendChild(createCard(item, idx++));
        });
        section.appendChild(grid);

        galleryEl.appendChild(section);
      });
    }

    initLightbox();
  }

  // PhotoSwipe v5 lightbox (images only)
  let lightbox = null;
  function initLightbox() {
    if (lightbox) lightbox.destroy();

    lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a[href]',
      pswpModule: PhotoSwipe,
      wheelToZoom: true,
      pinchToClose: true,
      showHideAnimationType: 'zoom',
      closeOnVerticalDrag: true,
    });

    lightbox.on('uiRegister', () => {
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isCustomElement: true,
        appendTo: 'root',
        onInit: (el, pswpInstance) => {
          const updateCaption = () => {
            const slideEl = pswpInstance.currSlide?.data?.element;
            if (!slideEl || !el) {
              if (el) el.innerHTML = '';
              return;
            }
            const title = slideEl.dataset.title
              || slideEl.querySelector('.card-title')?.textContent
              || '';
            const description = slideEl.dataset.description
              || slideEl.querySelector('.card-description')?.textContent
              || '';
            el.innerHTML = `
              <div style="padding: 1rem; text-align: center; color: #fff; background: rgba(0,0,0,0); position: absolute; bottom: 0; left: 0; right: 0;">
                <div style="font-weight: bold; margin-bottom: 0.25rem;">${escapeHtml(title)}</div>
                <div style="font-size: 0.85rem;">${escapeHtml(description)}</div>
              </div>
            `;
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
  if (groupByEl) groupByEl.addEventListener("change", renderGallery);

  renderGallery();
});
</script>