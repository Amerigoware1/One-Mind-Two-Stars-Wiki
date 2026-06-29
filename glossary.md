---
layout: default
title: Glossary
---

<style>
/* ==========================================================================
   INTERACTIVE SEARCH, TABS & CATEGORY UTILITIES
   ========================================================================== */
.search-container {
  max-width: 700px;
  margin: 2rem auto;
  position: relative;
  z-index: 100;
}

.search-wrapper {
  position: relative;
}

#glossarySearch {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--neon-violet);
  border-radius: 8px;
  background: rgba(12, 0, 40, 0.8);
  color: white;
  outline: none;
  box-shadow: 0 0 10px var(--glow-violet);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
}

#glossarySearch:focus {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 15px var(--glow-cyan);
}

#glossarySearch::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  display: none;
}

.clear-search:hover {
  color: var(--neon-magenta);
  text-shadow: 0 0 8px var(--neon-magenta);
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: rgba(10, 0, 34, 0.95);
  border: 2px solid var(--neon-cyan);
  border-top: none;
  border-radius: 0 0 8px 8px;
  display: none;
  z-index: 101;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 232, 255, 0.2);
}

.search-dropdown.show {
  display: block;
}

.search-result {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-glow);
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-result:hover {
  background: rgba(0, 232, 255, 0.15);
}

.result-category {
  font-size: 0.75rem;
  color: var(--neon-cyan);
  background: rgba(193, 60, 255, 0.2);
  border: 1px solid var(--neon-violet);
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  font-family: 'Orbitron', sans-serif;
}

.result-name {
  flex: 1;
  color: var(--text-heading);
  font-weight: 500;
}

.result-link {
  color: var(--neon-cyan);
  font-size: 0.875rem;
  text-decoration: none;
}

.result-link:hover {
  color: var(--neon-magenta);
  text-shadow: 0 0 5px var(--glow-cyan);
}

/* -------- TABS -------- */
.tab-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1.5rem 0 1rem;
  padding: 0.75rem;
  background: var(--bg-card-dark);
  border: 1px solid var(--border-glow);
  border-radius: 8px;
}

.tab-btn {
  padding: 0.375rem 0.75rem;
  background: rgba(12, 0, 40, 0.4);
  border: 1px solid var(--border-glow);
  border-radius: 4px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.875rem;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(193, 60, 255, 0.2);
  border-color: var(--neon-violet);
  color: var(--neon-cyan);
  box-shadow: 0 0 10px var(--glow-violet);
}

.tab-btn.active {
  background: rgba(193, 60, 255, 0.3);
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  box-shadow: 0 0 12px var(--glow-cyan);
}

.tab-panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.tab-panel.active {
  display: block;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* -------- HIGHLIGHT -------- */
.glossary-highlight {
  animation: highlight-pulse 2s ease-in-out;
  border-left: 4px solid var(--neon-cyan) !important;
  padding-left: 0.75rem !important;
}

@keyframes highlight-pulse {
  0%, 100% { background: rgba(0, 232, 255, 0); }
  50% { background: rgba(0, 232, 255, 0.15); }
}

/* Mobile */
@media (max-width: 768px) {
  .search-container {
    margin: 1rem auto;
  }
  .tab-bar {
    overflow-x: auto;
    justify-content: flex-start;
    white-space: nowrap;
    flex-wrap: nowrap;
  }
}
</style>

<div class="search-container">
  <div class="search-wrapper">
    <input
      type="text"
      id="glossarySearch"
      placeholder="Search glossary terms, categories, or descriptions..."
      autocomplete="off"
    >
    <button class="clear-search" id="clearSearch">×</button>
    <div class="search-dropdown" id="searchDropdown"></div>
  </div>

</div>

<!-- ========== TAB BAR ========== -->
<div class="tab-bar" id="tabBar">
  <button class="tab-btn active" data-tab="tech">⚙️Technology</button>
  <button class="tab-btn" data-tab="astronomy">🌌Heavenly Bodies</button>
  <button class="tab-btn" data-tab="characters">👨🏻‍👩🏻‍👦🏻‍👦🏻Characters</button>
  <button class="tab-btn" data-tab="slang">🌬️Slang</button>
  <button class="tab-btn" data-tab="aliens">🪔Galinstanians</button>
  <button class="tab-btn" data-tab="medical">⚕️Medical</button>
  <button class="tab-btn" data-tab="locations">🏯Locations</button>
  <button class="tab-btn" data-tab="politics">🏛️Politics &amp; Organizations</button>
  <button class="tab-btn" data-tab="arts">🖼️Arts &amp; 🎼Culture</button>

</div>

<!-- ========== TAB PANELS ========== -->

<!-- TECHNOLOGY -->
<div class="tab-panel active" id="panel-tech">
  <h2 class="category-header">Technology</h2>

  <div class="card-bg glossary-item" data-name="Artificial Gills" data-category="tech" data-search="gills underwater breathing wetsuit">
    <h2><a href="{{ '/artificial-gills.html' | relative_url }}">Artificial Gills</a></h2>
    <p><strong>Pronunciation:</strong> /ˌɑːrtɪˈfɪʃəl ɡɪlz/<button class="speak-button">🔊</button></p>
    <p>Device to extract air from water integrated with a wetsuit.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Artificial Neural Interface" data-category="tech" data-search="ANI brain interface communication telepathy galinstanian">
    <h2><a href="{{ '/ani.html' | relative_url }}">Artificial Neural Interface</a></h2>
    <p><strong>Pronunciation:</strong> /ˌɑːrtɪˈfɪʃəl ˈnjʊərəl ˈɪntərfeɪs/ or commonly: ANI /ˌeɪ ɛn ˈaɪ/<button class="speak-button">🔊</button></p>
    <p>A device designed to allow normal humans to transmit thoughts to the Galinstanians. Soon after, it was exapted as a device to communicate with the AI for medical monitoring and proactive environmental controls.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Bismuth Veins" data-category="tech" data-search="bismuth network waveguide elf electromagnetic galinstanian communication">
    <h2><a href="{{ '/bismuth-network.html' | relative_url }}">Bismuth Veins / Bismuth Network</a></h2>
    <p><strong>Pronunciation:</strong> /ˈbɪzməθ veɪnz/<button class="speak-button">🔊</button></p>
    <p>Naturally occurring (but cultivated by galinstanians) deposits of bismuth that act as a waveguide for electromagnetic frequencies in the ELF range. Carries Galinstanian communication and human radio signals.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Celectrum" data-category="tech" data-search="instrument music electronic crescent">
    <h2><a href="{{ '/celectrum.html' | relative_url }}">Celectrum</a></h2>
    <p><strong>Pronunciation:</strong> /sɛˈlɛktrəm/<button class="speak-button">🔊</button></p>
    <p>A crescent-shaped electronic instrument played through gesture and proximity, generating ambient sound via aurora-like energy fields. Designed to layer music without strings or keys, it symbolizes emotional resonance and unseen forces made audible.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Chronometer" data-category="tech" data-search="time clock measurement duration">
    <h2>Chronometer</h2>
    <p><strong>Pronunciation:</strong> /krəˈnɒmɪtər/<button class="speak-button">🔊</button></p>
    <p>Standard timekeeping device. Used throughout to mark times and durations.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Cryo-Silk" data-category="tech" data-search="cryo-silk textile material garment lyocell modal graphene fiber-optic MRE">
    <h2><a href="{{ '/cryo-silk.html' | relative_url }}">Cryo-Silk</a></h2>
    <p><strong>Pronunciation:</strong> /ˈkraɪoʊ sɪlk/<button class="speak-button">🔊</button></p>
    <p>An open-source advanced smart-apparel material blending graphene-infused high-denier lyocell with a plush MicroModal lining and flexible polymer optical fibers. Originally engineered by Dr. Alex Cruiz and Amerigo Carisco to soothe infant Celectra’s hypersensitive skin, its exceptional thermoregulation, durability, and phone-controlled, color-shifting aesthetic have made it the mainstream garment standard across the planetary and station networks.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Disintegrator (portable)" data-category="tech" data-search="handheld vaporize rock atom bore mining">
    <h2><a href="{{ '/mining-disintegrator.html' | relative_url }}">Disintegrator (portable)</a></h2>
    <p><strong>Pronunciation:</strong> /pɔːrtəbəl dɪsˈɪntɪɡreɪtər/<button class="speak-button">🔊</button></p>
    <p>A hand‑held directed‑energy tool that vaporizes rock atom by atom. Used for mining, cave access, and by Kret to create his unauthorized borehole.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Galinstan" data-category="tech" data-search="eutectic alloy gallium indium tin liquid metal">
    <h2>Galinstan</h2>
    <p><strong>Pronunciation:</strong> /ɡəˈlɪnstæn/<button class="speak-button">🔊</button></p>
    <p>The eutectic alloy (gallium, indium, tin) that forms the bodies of the Galinstanians. Liquid at room temperature, non‑toxic, with high electrical conductivity.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Hardline Network" data-category="tech" data-search="cable communication wired colony">
    <h2>Hardline Network</h2>
    <p><strong>Pronunciation:</strong> /ˈhɑːrdlaɪn ˈnɛtwɜːrk/<button class="speak-button">🔊</button></p>
    <p>A colony communication system using physical cables rather than wireless. Installed by Roan post‑disclosure to maintain contact during flares or jamming.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Lead Barrier Panels" data-category="tech" data-search="mobile x-ray shields signal interruption electromagnetic">
    <h2>Lead Barrier Panels</h2>
    <p><strong>Pronunciation:</strong> /lɛd ˈbæriər ˈpænəlz/<button class="speak-button">🔊</button></p>
    <p>Mobile X‑ray shields on wheeled frames, originally for medical imaging, used by Kret to create electromagnetic signal interruption between Celectra’s bodies.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Memory Veins" data-category="tech" data-search="bismuth historical record resonance galinstanian consciousness">
    <h2><a href="{{ '/bismuth-network.html' | relative_url }}">Memory Veins</a></h2>
    <p><strong>Pronunciation:</strong> /ˈmɛməri veɪnz/<button class="speak-button">🔊</button></p>
    <p>Bismuth veins that record the electromagnetic resonance‑patterns of Galinstanian consciousness over time. A historical archive embedded in the stone.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Mining Disintegrator" data-category="tech" data-search="mining excavation atomize materials MRE reclamation portable">
    <h2><a href="{{ '/mining-disintegrator.html' | relative_url }}">Mining Disintegrator</a></h2>
    <p><strong>Pronunciation:</strong> /ˈmaɪnɪŋ dɪsˈɪntɪɡreɪtər/<button class="speak-button">🔊</button></p>
    <p>Large-scale excavation device that atomizes materials into base components for sorting and storage, based on MRE reclamation principles. Portable variant available for precision work.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Molecular Reconfiguration Engine" data-category="tech" data-search="MRE matter synthesis reclamation atom">
    <h2><a href="{{ '/mre.html' | relative_url }}">Molecular Reconfiguration Engine (mre)</a></h2>
    <p><strong>Pronunciation:</strong> /məˈlɛkjələr ˌriːkənˌfɪɡjʊˈreɪʃən ˈɛndʒɪn/<button class="speak-button">🔊</button></p>
    <p>Advanced device for matter synthesis and reclamation. See full entry → <a href="{{ '/mre.html' | relative_url }}">MRE page</a></p>
  </div>

  <div class="card-bg glossary-item" data-name="Portable MRE" data-category="tech" data-search="field mre matter recycler extractor synthesis food equipment">
    <h2><a href="{{ '/mre.html' | relative_url }}">Portable MRE (field-mre)</a></h2>
    <p><strong>Pronunciation:</strong> /ˈpɔːrtəbəl ɛm ɑːr iː/<button class="speak-button">🔊</button></p>
    <p>A portable version of the colony’s Matter Recycler/Extractor. Can synthesize food, equipment, and clothing from raw materials and stored blueprints. Celectra steals one from Kret’s office.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Reclamatics" data-category="tech" data-search="cleaning bot sterilization drone molecular disintegration">
    <h2><a href="{{ '/reclamatics.html' | relative_url }}">Reclamatics</a></h2>
    <p><strong>Pronunciation:</strong> /ˌrɛkləˈmætɪks/<button class="speak-button">🔊</button></p>
    <p>Automated cleaning and sterilization drones that utilize molecular disintegration technology to break down contaminants, dust, and biological residues into base components for recycling or safe disposal. Commonly deployed in habitats, spacecraft, and research facilities.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Resonance Chamber" data-category="tech" data-search="resonance chamber standing wave resonator bismuth vein frequency neural signal amplifier galinstanian">
    <h2><a href="{{ '/resonance-chamber.html' | relative_url }}">Resonance Chamber</a></h2>
    <p><strong>Pronunciation:</strong> /ˈrɛzənəns ˈtʃeɪmbər/<button class="speak-button">🔊</button></p>
    <p>A subterranean architectural node constructed by the Galinstanians using a specific geometric bismuth configuration. It functions as a physical standing wave resonator and neural amplifier, using constructive interference to sharpen cross-body synchronicity at an exact field frequency of 21.7 Hz.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Standing Wave Resonator" data-category="tech" data-search="chamber bismuth vein frequency neural signal">
    <h2><a href="{{ '/bismuth-network.html' | relative_url }}">Standing Wave Resonator</a></h2>
    <p><strong>Pronunciation:</strong> /ˈstændɪŋ weɪv ˈrɛzəneɪtər/<button class="speak-button">🔊</button></p>
    <p>The chamber the Galinstanians built to amplify Celectra’s neural signal using bismuth vein geometry tuned to her interbody frequency (~21.7-hz).</p>
  </div>

  <!-- NEW: Strider -->
  <div class="card-bg glossary-item" data-name="Strider" data-category="tech" data-search="maglev buggy vehicle all-terrain mlv-01 dust-skimmer glider-kart">
    <h2><a href="{{ '/strider.html' | relative_url }}">MLV‑01 "Strider" Maglev Buggy</a></h2>
    <p><strong>Pronunciation:</strong> /ˈstraɪdər/<button class="speak-button">🔊</button></p>
    <p>A high‑mobility recreational all‑terrain vehicle using hubless maglev drive and kinetic harvesting. Known as Strider, Dust‑Skimmer, or Glider‑Kart. Seats 1–2 in twin recumbent positions, top speed 85 km/h.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Utara" data-category="tech" data-search="ai sentient unified thought resource architecture">
    <h2><a href="{{ '/utara.html' | relative_url }}">Utara</a></h2>
    <p><strong>Pronunciation:</strong> /uːˈtɑːrə/<button class="speak-button">🔊</button></p>
    <p>Unified Thought and Resource Architecture—sentient AI of the system.</p>
  </div>

</div><!-- end panel-tech -->

<!-- ASTRONOMY -->
<div class="tab-panel" id="panel-astronomy">
  <h2 class="category-header">Heavenly Bodies</h2>

  <div class="card-bg glossary-item" data-name="Ares" data-category="astronomy" data-search="mars moon chaos">
    <h2><a href="{{ '/ares-wiki.html' | relative_url }}">Ares</a></h2>
    <p><strong>Pronunciation:</strong> /ˈɛəriːz/<button class="speak-button">🔊</button></p>
    <p>Mars-like moon of Chaos, slightly warmer and more massive than Mars.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Barycenter" data-category="astronomy" data-search="gravitational center orbit binary bodies">
    <h2>Barycenter</h2>
    <p><strong>Pronunciation:</strong> /ˈbærɪˌsɛntər/<button class="speak-button">🔊</button></p>
    <p>The gravitational center around which two celestial bodies orbit. Celectra uses it as a metaphor for her two bodies orbiting her single consciousness.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Chaos" data-category="astronomy" data-search="super-jupiter planet orbit binary">
    <h2>Chaos</h2>
    <p><strong>Pronunciation:</strong> /ˈkeɪ.ɒs/<button class="speak-button">🔊</button></p>
    <p>Warm super-Jupiter orbiting the binary stars Ciara and Niamh.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Ciara" data-category="astronomy" data-search="star orange dwarf binary">
    <h2>Ciara</h2>
    <p><strong>Pronunciation:</strong> /ˈkɪərə/ or /ˈkɪrə/<button class="speak-button">🔊</button></p>
    <p>Dimmer K-type orange dwarf star in the binary system.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Great Resonance" data-category="astronomy" data-search="coronal mass ejection niamh ionized galinstanian consciousness">
    <h2>Great Resonance</h2>
    <p><strong>Pronunciation:</strong> /ɡreɪt ˈrɛzənəns/<button class="speak-button">🔊</button></p>
    <p>The ancient coronal mass ejection from Niamh that ionized the Galinstanians’ ancestral pools and gave them collective consciousness.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Niamh" data-category="astronomy" data-search="star yellow dwarf binary">
    <h2>Niamh</h2>
    <p><strong>Pronunciation:</strong> /niːv/<button class="speak-button">🔊</button></p>
    <p>Brighter G-type yellow star in the binary system.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Oisín" data-category="astronomy" data-search="planet tidally locked niamh">
    <h2>Oisín</h2>
    <p><strong>Pronunciation:</strong> /ˈɒʃiːn/ or /ˈoʊʃiːn/<button class="speak-button">🔊</button></p>
    <p>Closest planet to Niamh, tidally locked.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Oscar" data-category="astronomy" data-search="moon rocky oisin">
    <h2>Oscar</h2>
    <p><strong>Pronunciation:</strong> /ˈɒskər/<button class="speak-button">🔊</button></p>
    <p>Rocky moon orbiting Oisín.</p>
  </div>

</div><!-- end panel-astronomy -->

<!-- CHARACTERS -->
<div class="tab-panel" id="panel-characters">
  <h2 class="category-header">Characters &amp; Conditions</h2>

  <div class="card-bg glossary-item" data-name="Bridge" data-category="characters" data-search="celectra role connection galinstanian human transmitter">
    <h2>Bridge</h2>
    <p><strong>Pronunciation:</strong> /brɪdʒ/<button class="speak-button">🔊</button></p>
    <p>Celectra’s self‑described role as the only human who can transmit thoughts to the Galinstanians and relay their communications back. Not ambassador – a connection between places always meant to be reached.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Celectricity" data-category="characters" data-search="celectra neural signals brains">
    <h2><a href="{{ '/mononous-disomas.html' | relative_url }}">Celectricity</a></h2>
    <p><strong>Pronunciation:</strong> /sɛˈlɛktrɪsɪti/<button class="speak-button">🔊</button></p>
    <p>Celectra’s name for the neural signal that connects her two brains across distance. The “hum” she feels between her bodies. Distinct from “Celectrics” (the condition).</p>
  </div>

  <div class="card-bg glossary-item" data-name="Celectrics" data-category="characters" data-search="mononous disomas condition twin bodies">
    <h2><a href="{{ '/mononous-disomas.html' | relative_url }}">Celectrics</a></h2>
    <p><strong>Pronunciation:</strong> /sɛˈlɛktrɪks/<button class="speak-button">🔊</button></p>
    <p>Celectra's informal name for her condition, Mononous Disomas.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Mononous Disomas" data-category="characters" data-search="condition twin bodies one consciousness">
    <h2><a href="{{ '/mononous-disomas.html' | relative_url }}">Mononous Disomas</a></h2>
    <p><strong>Pronunciation:</strong> /ˈmɒnənəs dɪˈsoʊməs/<button class="speak-button">🔊</button></p>
    <p>Celectra's condition: one consciousness spanning identical twin bodies. Clinical Greek‑derived term: “one mind, two bodies.” She dislikes it because it sounds like a disease.</p>
  </div>

</div><!-- end panel-characters -->

<!-- SLANG -->
<div class="tab-panel" id="panel-slang">
  <h2 class="category-header">Slang</h2>
  <div class="card-bg">
    <p>Common informal terminology used by teens and young adults on Ares and Utopis, often rooted in astronomy or orbital life.</p>

    <h3>Positive / Affectionate</h3>

    <div class="card-bg glossary-item" data-name="Aurora" data-category="slang" data-search="slang calming soothing presence">
      <h2>Aurora</h2>
      <p><strong>Pronunciation:</strong> /ɔːˈrɔːrə/<button class="speak-button">🔊</button></p>
      <p>Someone with a calming, soft, or visually soothing presence.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Constellating" data-category="slang" data-search="slang working together harmony">
      <h2>Constellating</h2>
      <p><strong>Pronunciation:</strong> /ˈkɒnstəˌleɪtɪŋ/<button class="speak-button">🔊</button></p>
      <p>Working together in harmony; forming a cohesive group or moment.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Full-Spectrum" data-category="slang" data-search="slang emotionally honest open">
      <h2>Full-Spectrum</h2>
      <p><strong>Pronunciation:</strong> /fʊl ˈspɛktrəm/<button class="speak-button">🔊</button></p>
      <p>Emotionally honest and open in a healthy, balanced way.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Hard-Dock" data-category="slang" data-search="slang collision trip embarrassing">
      <h2>Hard-Dock</h2>
      <p><strong>Pronunciation:</strong> /hɑːrd dɒk/<button class="speak-button">🔊</button></p>
      <p>A slang term for an unintended collision with the ground, wall, or another person—usually embarrassing, occasionally painful.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Orbit Buddy" data-category="slang" data-search="slang buddy friend pal">
      <h2>Orbit Buddy</h2>
      <p><strong>Pronunciation:</strong> /ˈɔːrbɪt ˌbʌdi/<button class="speak-button">🔊</button></p>
      <p>A close friend whose life naturally aligns with one's own.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Perihelion" data-category="slang" data-search="slang closeness joy happiness">
      <h2>Perihelion</h2>
      <p><strong>Pronunciation:</strong> /ˌpɛriˈhiːliən/<button class="speak-button">🔊</button></p>
      <p>A peak moment of closeness, joy, or emotional warmth.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Solar" data-category="slang" data-search="slang attractive hot sexy charismatic">
      <h2>Solar</h2>
      <p><strong>Pronunciation:</strong> /ˈsoʊlər/<button class="speak-button">🔊</button></p>
      <p>Attractive, warm, charismatic; someone who lights up a room.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Starborn" data-category="slang" data-search="slang gifted genius brilliant">
      <h2>Starborn</h2>
      <p><strong>Pronunciation:</strong> /ˈstɑːrˌbɔːrn/<button class="speak-button">🔊</button></p>
      <p>Gifted or exceptionally talented; someone seen as destined for greatness.</p>
    </div>

    <h3>Neutral / Descriptive</h3>

    <div class="card-bg glossary-item" data-name="Aphelion" data-category="slang" data-search="slang distant withdrawn space">
      <h2>Aphelion</h2>
      <p><strong>Pronunciation:</strong> /æfˈhiːliən/<button class="speak-button">🔊</button></p>
      <p>Emotionally distant; needing space or pulling away to recharge.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Gravity Check" data-category="slang" data-search="slang reminder reality ground">
      <h2>Gravity Check</h2>
      <p><strong>Pronunciation:</strong> /ˈɡrævɪti tʃɛk/<button class="speak-button">🔊</button></p>
      <p>A grounding reminder or reality check from a friend.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Moonphase" data-category="slang" data-search="slang mood shift cycle emotional">
      <h2>Moonphase</h2>
      <p><strong>Pronunciation:</strong> /ˈmuːnˌfeɪz/<button class="speak-button">🔊</button></p>
      <p>Shifting moods; natural emotional cycling.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Nebular" data-category="slang" data-search="slang confused foggy mixed signals">
      <h2>Nebular</h2>
      <p><strong>Pronunciation:</strong> /ˈnɛbjələr/<button class="speak-button">🔊</button></p>
      <p>Confused, foggy, or giving mixed emotional signals.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Nebulous" data-category="slang" data-search="slang dreamy spacey scatterbrained charming">
      <h2>Nebulous</h2>
      <p><strong>Pronunciation:</strong> /ˈnɛbjələs/<button class="speak-button">🔊</button></p>
      <p>Pretty but spacey, dreamy, or scatterbrained in a charming way.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Neutron Star" data-category="slang" data-search="slang memorial deceased grief influence">
      <h2>Neutron Star</h2>
      <p><strong>Pronunciation:</strong> /ˈnjuː.trɒn stɑːr/<button class="speak-button">🔊</button></p>
      <p>(colloquial, memorial) A term used for a deceased loved one whose presence has diminished in physical space but not in influence. Though the body is gone, their emotional gravity remains—dense, bright, and inescapable. Survivors are warned not to "orbit too close," lest memory collapse into obsession.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Orbital Load" data-category="slang" data-search="slang workload busy responsibilities stress">
      <h2>Orbital Load</h2>
      <p><strong>Pronunciation:</strong> /ˈɔːrbɪtəl loʊd/<button class="speak-button">🔊</button></p>
      <p>A heavy workload or piled-up responsibilities.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Retrograde" data-category="slang" data-search="slang setback backward slide unproductive">
      <h2>Retrograde</h2>
      <p><strong>Pronunciation:</strong> /rɛtroʊˌɡreɪd/<button class="speak-button">🔊</button></p>
      <p>A setback or backward slide; an unproductive day.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Stellar Drift" data-category="slang" data-search="slang growing apart relationship distance shift">
      <h2>Stellar Drift</h2>
      <p><strong>Pronunciation:</strong> /ˈstɛlər drɪft/<button class="speak-button">🔊</button></p>
      <p>Growing apart from someone; a natural shift in relationships.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Shade-beast" data-category="slang" data-search="trauma fear therapeutic metaphor walk toward">
      <h2>Shade-beast</h2>
      <p><strong>Pronunciation:</strong> /ʃeɪd biːst/<button class="speak-button">🔊</button></p>
      <p>A therapeutic metaphor from Zoë’s sessions: the thing you must walk toward rather than away from to realize it can’t hurt you. Represents trauma and fear.</p>
    </div>

    <h3>Negative / Critical</h3>

    <div class="card-bg glossary-item" data-name="Black Hole" data-category="slang" data-search="slang negative draining selfish empty">
      <h2>Black Hole</h2>
      <p><strong>Pronunciation:</strong> /blæk hoʊl/<button class="speak-button">🔊</button></p>
      <p>An emotionally draining person or institution; takes everything, gives nothing.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Cold Fusion" data-category="slang" data-search="slang manipulation pressure fake calm">
      <h2>Cold Fusion</h2>
      <p><strong>Pronunciation:</strong> /koʊld ˈfjuːʒən/<button class="speak-button">🔊</button></p>
      <p>A calm, polite exterior hiding pressure or manipulation.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Coronal Flare" data-category="slang" data-search="slang anger outburst temper explosive">
      <h2>Coronal Flare</h2>
      <p><strong>Pronunciation:</strong> /kəˈroʊnəl flɛər/<button class="speak-button">🔊</button></p>
      <p>An explosive outburst of anger or intense emotion.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Dark Matter" data-category="slang" data-search="slang mystery hidden influence secret">
      <h2>Dark Matter</h2>
      <p><strong>Pronunciation:</strong> /dɑːrk ˈmætər/<button class="speak-button">🔊</button></p>
      <p>Someone who works behind the scenes or influences things mysteriously.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Dead Satellite" data-category="slang" data-search="slang unavailable disengaged cold silent">
      <h2>Dead Satellite</h2>
      <p><strong>Pronunciation:</strong> /dɛd ˈsætəˌlaɪt/<button class="speak-button">🔊</button></p>
      <p>Emotionally unavailable or completely disengaged.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Event Horizon" data-category="slang" data-search="slang trap bureaucracy point no return">
      <h2>Event Horizon</h2>
      <p><strong>Pronunciation:</strong> /ɪˈvɛnt həˈraɪzən/<button class="speak-button">🔊</button></p>
      <p>A bureaucratic or personal point of no return; once you're in, you're trapped.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Faultline" data-category="slang" data-search="slang volatile unpredictable danger unstable">
      <h2>Faultline</h2>
      <p><strong>Pronunciation:</strong> /ˈfɔːltlaɪn/<button class="speak-button">🔊</button></p>
      <p>A volatile, unpredictable person likely to cause emotional disruption.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Gamma-Brained" data-category="slang" data-search="slang smart reckless dangerous brilliant">
      <h2>Gamma-Brained</h2>
      <p><strong>Pronunciation:</strong> /ˈɡæmə breɪnd/<button class="speak-button">🔊</button></p>
      <p>Highly intelligent but dangerously reckless; brilliant without caution.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Red Giant" data-category="slang" data-search="slang ego dominant overbearing loud">
      <h2>Red Giant</h2>
      <p><strong>Pronunciation:</strong> /rɛd ˈdʒaɪənt/<button class="speak-button">🔊</button></p>
      <p>An ego-dominating person who expands to take over every situation.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Ringlord" data-category="slang" data-search="slang rules rigid bossy authority">
      <h2>Ringlord</h2>
      <p><strong>Pronunciation:</strong> /ˈrɪŋlɔːrd/<button class="speak-button">🔊</button></p>
      <p>A rigid rule-enforcer who prioritizes procedures over people.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Telemetry" data-category="slang" data-search="slang watching prying supervisor spying">
      <h2>Telemetry</h2>
      <p><strong>Pronunciation:</strong> /təˈlɛmɪtri/<button class="speak-button">🔊</button></p>
      <p>Someone who watches others closely, especially in a supervisory or prying way.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Tidal-Locked" data-category="slang" data-search="slang stubborn mindset rigid unwilling">
      <h2>Tidal-Locked</h2>
      <p><strong>Pronunciation:</strong> /ˈtaɪdəl lɒkt/<button class="speak-button">🔊</button></p>
      <p>Stuck in one mindset; unwilling or unable to change perspective.</p>
    </div>

    <h3>Age &amp; Experience</h3>

    <div class="card-bg glossary-item" data-name="Baby Star" data-category="slang" data-search="slang young child kid youth">
      <h2>Baby Star</h2>
      <p><strong>Pronunciation:</strong> /ˈbeɪbi stɑːr/<button class="speak-button">🔊</button></p>
      <p>A very young person; affectionate term for a kid or pre-teen.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Comet-Tailed" data-category="slang" data-search="slang teen messy fast chaos energetic">
      <h2>Comet-Tailed</h2>
      <p><strong>Pronunciation:</strong> /ˈkɒmɪt teɪld/<button class="speak-button">🔊</button></p>
      <p>A kid or teen who rushes into things enthusiastically but leaves chaos behind.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Launchling" data-category="slang" data-search="slang newbie beginner trainee start">
      <h2>Launchling</h2>
      <p><strong>Pronunciation:</strong> /ˈlɔːntʃlɪŋ/<button class="speak-button">🔊</button></p>
      <p>A newbie; someone just starting a job, class, or responsibility.</p>
    </div>

    <div class="card-bg glossary-item" data-name="Old Star" data-category="slang" data-search="slang elder respect experienced steady">
      <h2>Old Star</h2>
      <p><strong>Pronunciation:</strong> /oʊld stɑːr/<button class="speak-button">🔊</button></p>
      <p>An older person still respected; someone whose experience "burns steady."</p>
    </div>

    <div class="card-bg glossary-item" data-name="Rust-Belted" data-category="slang" data-search="slang outdated old worn system">
      <h2>Rust-Belted</h2>
      <p><strong>Pronunciation:</strong> /rʌst ˈbɛltɪd/<button class="speak-button">🔊</button></p>
      <p>An older system, rule, or person seen as outdated or worn out.</p>
    </div>

    <div class="card-bg glossary-item" data-name="White Dwarf" data-category="slang" data-search="slang elderly sharp small wise quiet">
      <h2>White Dwarf</h2>
      <p><strong>Pronunciation:</strong> /waɪt dwɔːrf/<button class="speak-button">🔊</button></p>
      <p>An elderly person who's small, quiet, but still sharp and dense with experience.</p>
    </div>
  </div><!-- end card-bg wrapper for slang -->

</div><!-- end panel-slang -->

<!-- GALINSTANIANS -->
<div class="tab-panel" id="panel-aliens">
  <h2 class="category-header">Galinstanians</h2>
  <div class="card-bg glossary-item" data-name="Galinstanians" data-category="aliens" data-search="alien metal intelligent life">
    <h2><a href="{{ '/galinstanians.html' | relative_url }}">Galinstanians</a></h2>
    <p><strong>Pronunciation:</strong> /ˌɡælɪnˈstæni.ənz/<button class="speak-button">🔊</button></p>
    <p>Intelligent life based on the metal alloy galinstan. The indigenous, sentient, liquid‑metal beings living beneath Ares. Communicate via ELF electromagnetic fields. No collective name for themselves; named by Celectra.</p>
  </div>

</div><!-- end panel-aliens -->

<!-- MEDICAL -->
<div class="tab-panel" id="panel-medical">
  <h2 class="category-header">Medical Terms</h2>

  <div class="card-bg glossary-item" data-name="Biogenic Mineralization" data-category="medical" data-search="magnesium iron oxide skull waveguide galinstanian frequency">
    <h2>Biogenic Mineralization</h2>
    <p><strong>Pronunciation:</strong> /ˌbaɪoʊˈdʒɛnɪk ˌmɪnərəlaɪˈzeɪʃən/<button class="speak-button">🔊</button></p>
    <p>The unique magnesium and iron-oxide lacing in Celectra’s skull bones that acts as a biogenic waveguide, allowing her to broadcast on Galinstanian frequencies.</p>
  </div>

  <div class="card-bg glossary-item" data-name="CMS-1 Formula" data-category="medical" data-search="milkshake nutritional suspension metabolic bridge coconut">
    <h2>CMS-1 Formula (milkshake)</h2>
    <p><strong>Pronunciation:</strong> /siː ɛm ɛs wʌn ˈfɔːrmjʊlə/<button class="speak-button">🔊</button></p>
    <p>A high‑calorie, high‑fat nutritional suspension developed by Dr. Alex Cruiz specifically to fuel Celectra’s metabolic bridge. Tastes like coconut. Also called “milkshake.”</p>
  </div>

  <div class="card-bg glossary-item" data-name="Congenital Atrichia Universalis" data-category="medical" data-search="hairlessness complete alopecia congenital condition sam calder">
    <h2><a href="{{ '/atrichia-dossier.html' | relative_url }}">Congenital Atrichia Universalis</a></h2>
    <p><strong>Pronunciation:</strong> /kənˈdʒɛnɪtəl əˈtrɪkiə ˌjuːnɪˈvɜːrsəlɪs/<button class="speak-button">🔊</button></p>
    <p>A rare genetic condition resulting in complete absence of body hair, including scalp hair, eyebrows, and eyelashes, present from birth. Unlike alopecia areata, it is non‑scarring and non‑progressive. Individuals with this condition have smooth, often reflective skin on the scalp and elsewhere, and may be more sensitive to temperature extremes or UV exposure. In the Niamh‑Ciara system, the condition is managed with protective headwear, moisturising oils, and regular dermatological screening – not as a disability, but as a natural variation of human appearance.</p>
    <p><strong>Notable individual:</strong> <a href="{{'/_characters/sam.html' | relative_url }}">Sam Calder</a>, audio engineer and co‑founder of the Samaya Gallery.</p>
    <p><small>📖 <em>Real‑world context:</em> See <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4594399/" target="_blank" rel="noopener noreferrer">Wikipedia</a> for clinical details.</small></p>
  </div>

  <div class="card-bg glossary-item" data-name="Cryo-Silk" data-category="medical" data-search="cryo silk graphene lyocell thermal discharge heat pipe alex cruiz celectra albino skin neural damage onesies crib sheets">
    <h2><a href="{{ '/cryo-silk.html' | relative_url }}">Cryo-Silk</a></h2>
    <p><strong>Pronunciation:</strong> /ˈkraɪoʊ sɪlk/<button class="speak-button">🔊</button></p>
    <p><strong>Origin:</strong> Dr. Alex Cruiz, Orbital Medical Log 2225.10.14</p>
    <p><strong>Description:</strong> Originally prescribed as “Graphene-Infused High-Denier Lyocell (protocol-8)” for the infant Celectra. Alex began calling it “cryo‑silk” in his daily rounds because the graphene lattice provided the necessary thermal discharge (“cryo”), while the lyocell provided the sub‑micron smoothness required for her sensitive albino skin (“silk”).</p>
    <p><strong>History:</strong> The material was first used to manufacture onesies and crib sheets. Because her bodies were so small and their surface‑area‑to‑volume ratio was so high, her physiology threatened to cause heat‑induced neural damage. The cryo‑silk acts as a passive heat‑pipe, drawing thermal energy away from her spine and skulls and discharging it into the mattress or air. Celectra continues to use bedsheets and wear clothing made from cryo‑silk throughout her life.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Mononous Disomas" data-category="medical" data-search="medical condition twin bodies consciousness">
    <h2>Mononous Disomas</h2>
    <p><strong>Pronunciation:</strong> /ˈmɒnənəs dɪˈsoʊməs/<button class="speak-button">🔊</button></p>
    <p>Celectra's condition: one consciousness spanning identical twin bodies.</p>
  </div>

</div><!-- end panel-medical -->

<!-- LOCATIONS -->
<div class="tab-panel" id="panel-locations">
  <h2 class="category-header">Locations</h2>

  <div class="card-bg glossary-item" data-name="Bore Shaft" data-category="locations" data-search="vertical tunnel disintegrator cave system biometric door">
    <h2>Bore Shaft</h2>
    <p><strong>Pronunciation:</strong> /bɔːr ʃæft/<button class="speak-button">🔊</button></p>
    <p>A vertical tunnel created by a directed‑energy disintegrator. Used to access the cave system. The main bore shaft is secured with a biometric door.</p>
  </div>

  <div class="card-bg glossary-item" data-name="New Eden" data-category="locations" data-search="colony settlement ares pison river">
    <h2><a href="{{ '/new-eden.html' | relative_url }}">New Eden</a></h2>
    <p><strong>Pronunciation:</strong> /ˈnuː ˈiːdən/<button class="speak-button">🔊</button></p>
    <p>The first surface settlement established by colonists in the Niamh-Ciara system. Nestled in a crook of the north–south-running Pison River, New Eden blends modular colony units with newer stone, steel, and glass structures.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Pison River" data-category="locations" data-search="river ares swimming cave entrance">
    <h2>Pison River</h2>
    <p><strong>Pronunciation:</strong> /ˈpaɪsɒn ˈrɪvər/<button class="speak-button">🔊</button></p>
    <p>The river on Ares where Celectra went swimming on her birthday and where the cave entrance is located. Key location.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Plenum" data-category="locations" data-search="council chamber administrative building new eden">
    <h2><a href="{{ '/council.html' | relative_url }}">Plenum</a></h2>
    <p><strong>Pronunciation:</strong> /ˈpliːnəm/<button class="speak-button">🔊</button></p>
    <p>The council chamber and administrative building in New Eden’s town square.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Squeeze, The" data-category="locations" data-search="narrow passage crawl cave system half meter">
    <h2>The Squeeze</h2>
    <p><strong>Pronunciation:</strong> /ðə skwiːz/<button class="speak-button">🔊</button></p>
    <p>The narrow passage (approx. half a meter wide) that Celectra crawled through to enter the deep cave system. She scraped herself passing through.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Utopis" data-category="locations" data-search="space station orbit ares">
    <h2><a href="{{ '/utopis.html' | relative_url }}">Utopis</a></h2>
    <p><strong>Pronunciation:</strong> /ˈjuːtəpɪs/<button class="speak-button">🔊</button></p>
    <p>Space station orbiting Ares, home to Celectra and her father for the first seven years of her life.</p>
  </div>

</div><!-- end panel-locations -->

<!-- POLITICS -->
<div class="tab-panel" id="panel-politics">
  <h2 class="category-header">Politics &amp; Organizations</h2>

  <div class="card-bg glossary-item" data-name="First Contact Committee" data-category="politics" data-search="council protocol coexistence galinstanian santos roan alex cruiz amerigo zoë">
    <h2>First Contact Committee</h2>
    <p><strong>Pronunciation:</strong> /fɜːrst ˈkɒntækt kəˈmɪti/<button class="speak-button">🔊</button></p>
    <p>The council‑sanctioned body responsible for developing protocols for coexistence with the Galinstanians. Members: Santos, Roan, Alex Cruiz, Amerigo, Zoë.</p>
  </div>

  <div class="card-bg glossary-item" data-name="Tribunal" data-category="politics" data-search="legal proceeding guilty probation demotion kret">
    <h2>Tribunal</h2>
    <p><strong>Pronunciation:</strong> /traɪˈbjuːnəl/<button class="speak-button">🔊</button></p>
    <p>The formal legal proceeding that found Dr. Kret guilty of unauthorized medical procedures and endangerment, leading to his probation and demotion.</p>
  </div>

</div><!-- end panel-politics -->

<!-- ARTS -->
<div class="tab-panel" id="panel-arts">
  <h2 class="category-header">Arts &amp; Culture</h2>

  <div class="card-bg glossary-item" data-name="Parisian Promise" data-category="arts" data-search="song amerigo jenni memory love">
    <h2><a href="{{ '/parisian-promise.html' | relative_url }}">Parisian Promise</a></h2>
    <p><strong>Pronunciation:</strong> /pəˈrɪziən ˈprɒmɪs/<button class="speak-button">🔊</button></p>
    <p>A song written by Amerigo for his late wife Jenni. He hums it when he thinks no one can hear. Represents enduring love and memory.</p>
  </div>

</div><!-- end panel-arts -->

<!-- ==========================================================================
     JAVASCRIPT: Search + Tabs
     ========================================================================== -->
<script>
(function() {
  'use strict';

  // -------- DOM refs --------
  const searchInput = document.getElementById('glossarySearch');
  const clearBtn = document.getElementById('clearSearch');
  const dropdown = document.getElementById('searchDropdown');
  const allItems = document.querySelectorAll('.glossary-item');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const tabBtns = document.querySelectorAll('.tab-btn');
// linked from external url
window.addEventListener('DOMContentLoaded', () => {
  // 1. Get the hash from the URL (e.g., "#characters") and remove the "#"
  const currentHash = window.location.hash.substring(1);

  if (currentHash) {
    // 2. Find the tab button that matches the hash
    // (Adjust the selector attribute depending on how your HTML is structured)
    const targetTabBtn = document.querySelector(`.tab-btn[data-tab="${currentHash}"]`) || 
                          document.getElementById(currentHash);

    if (targetTabBtn) {
      // 3. Programmatically click it to switch tabs automatically
      targetTabBtn.click();
      
      // Optional: Smooth scroll to the glossary container if it's lower on the page
      targetTabBtn.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
  // -------- Tab switching --------
  function switchTab(tabId) {
    // Update panels
    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === 'panel-' + tabId);
    });
    // Update buttons
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    // Clear search input and dropdown when switching tabs
    searchInput.value = '';
    dropdown.classList.remove('show');
    clearBtn.style.display = 'none';
    // Remove any highlights
    allItems.forEach(item => item.classList.remove('glossary-highlight'));
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const tab = this.dataset.tab;
      switchTab(tab);
    });
  });

  // -------- Search logic --------
  function getSearchableText(item) {
    // data-search + name + description (innerText)
    const searchAttr = item.dataset.search || '';
    const name = (item.dataset.name || '').toLowerCase();
    // get all paragraph text except buttons
    const desc = item.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    return (searchAttr + ' ' + name + ' ' + desc).toLowerCase();
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      dropdown.classList.remove('show');
      clearBtn.style.display = 'none';
      // remove highlights
      allItems.forEach(item => item.classList.remove('glossary-highlight'));
      return;
    }

    // Gather matches
    const matches = [];
    allItems.forEach(item => {
      const text = getSearchableText(item);
      if (text.includes(q)) {
        // Determine which tab this item belongs to
        const parentPanel = item.closest('.tab-panel');
        const tabId = parentPanel ? parentPanel.id.replace('panel-', '') : null;
        const category = item.dataset.category || 'unknown';
        const name = item.dataset.name || 'Unknown';
        // find link or just name
        const linkEl = item.querySelector('a');
        const link = linkEl ? linkEl.getAttribute('href') : '#';
        const displayName = linkEl ? linkEl.textContent : name;
        matches.push({
          item: item,
          tabId: tabId,
          category: category,
          name: displayName,
          link: link
        });
      }
    });

    if (matches.length === 0) {
      dropdown.innerHTML = '<div class="search-result" style="color: var(--text-muted); justify-content:center;">No results found</div>';
      dropdown.classList.add('show');
      clearBtn.style.display = 'block';
      return;
    }

    // Build dropdown
    let html = '';
    matches.forEach(m => {
      html += `<div class="search-result" data-tab="${m.tabId}" data-link="${m.link}">
        <span class="result-category">${m.category}</span>
        <span class="result-name">${m.name}</span>
        <a href="${m.link}" class="result-link">↗</a>
      </div>`;
    });
    dropdown.innerHTML = html;
    dropdown.classList.add('show');
    clearBtn.style.display = 'block';

    // Click on a result: switch tab, highlight item, scroll to it
    dropdown.querySelectorAll('.search-result').forEach(resultDiv => {
      resultDiv.addEventListener('click', function(e) {
        // If click is on the link itself, let it navigate normally
        if (e.target.tagName === 'A') return;
        const tab = this.dataset.tab;
        const link = this.dataset.link;
        if (tab) {
          switchTab(tab);
          // Find the corresponding item and highlight
          const targetItem = document.querySelector(`.glossary-item[data-name="${this.querySelector('.result-name').textContent}"]`);
          if (targetItem) {
            // Remove previous highlights
            allItems.forEach(el => el.classList.remove('glossary-highlight'));
            targetItem.classList.add('glossary-highlight');
            // Scroll to it
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          // Close dropdown
          dropdown.classList.remove('show');
          clearBtn.style.display = 'none';
          searchInput.value = '';
        } else if (link && link !== '#') {
          window.location.href = link;
        }
      });
    });
  }

  // -------- Input events --------
  searchInput.addEventListener('input', function() {
    performSearch(this.value);
  });

  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      dropdown.classList.remove('show');
      clearBtn.style.display = 'none';
      allItems.forEach(item => item.classList.remove('glossary-highlight'));
    }
  });

  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    dropdown.classList.remove('show');
    this.style.display = 'none';
    allItems.forEach(item => item.classList.remove('glossary-highlight'));
    searchInput.focus();
  });

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-wrapper')) {
      dropdown.classList.remove('show');
    }
  });

// -------- Speech synthesis (speak buttons) --------
document.querySelectorAll('.speak-button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Find the parent glossary-item or card-bg
    const item = this.closest('.glossary-item, .card-bg');
    if (!item) return;
    
    // Get the actual word from the <h2> tag. 
    // .textContent naturally strips out HTML, so it works whether the text 
    // is plain or wrapped inside an <a> tag.
    const h2 = item.querySelector('h2');
    let text = '';
    
    if (h2) {
      text = h2.textContent.trim();
    } else if (item.dataset.name) {
      // Fallback to the data-name attribute if the <h2> is missing
      text = item.dataset.name.trim();
    }
    
    if (!text) return;

    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  });
});

})();
</script>