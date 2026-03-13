---
layout: character
title: Jinan 'Jenni' Carisco
portrait: "/assets/images/jenni-book1.webp"
portrait-book1: "/assets/images/jenni-book1.webp"
affiliation: Utopis-Lab 3; Exogeologist; Carisco Family
status: Deceased
birthday: January 20, 2105
birthplace: Earth
death_date: October 11, 2225
death_place: Utopis, Ares Orbit
book1_age: "30.7 in prologue"
book2_age: "Deceased"
book3_age: "Deceased"
book4_age: "Deceased"
book5_age: "Deceased"
book1_title: "Legacy in Memory"
book1_arc: >
  Jenni does not appear alive in Book 1 beyond the prologue, but her presence is felt throughout. Amerigo keeps her photograph in his bedroom, and the poem he wrote for her (discovered when the frame breaks) reveals the depth of his love and grief. Dr. Yuki Chen's diagnosis of Jenni's radiation-exposed twin pregnancy in 2225 sets in motion the events that lead to Celectra's unique condition. Jenni's mitochondrial DNA anomaly—unusual repair enzyme expression—becomes a key factor in Celectra's survival and the development of her "Celectricity."

book2_title: "The Foundation"
book2_arc: >
  Jenni remains a presence in memory and legacy. When Celectra struggles with the weight of being the bridge, Zoë sometimes references Jenni's resilience as a model: "Your birth mother faced impossible odds and chose hope. You inherited that." The poem on the back of Jenni's photograph—"You were a giant once…"—becomes a touchstone for the family, reminding them that legacy is not about being remembered personally, but about building things that outlast you.

book3_title: "Echoes of Choice"
book3_arc: >
  As Celectra navigates her own pregnancy and the ethical complexities of using Dr. Kret's research, she reflects on Jenni's choice to continue her pregnancy despite radiation risks. "She didn't know if we'd survive. She chose to try anyway." This parallel helps Celectra frame her own decisions about legacy, risk, and the cost of progress. Jenni's story becomes a quiet anchor: sometimes the most important choices are made in uncertainty, with love as the only compass.

book4_title: "Names and Memory"
book4_arc: >
  When Celectra and Jaxon name their twins, they choose Xara (after Zoë's mother) and Jenni (after Celectra's birth mother). The moment is deeply emotional: Amerigo sees his second wife holding a grandchild named after his first wife, and breaks down. Jenni's name becomes a living tribute—not to grief, but to the love that persists across loss. Her legacy is no longer just a photograph or a poem; it's a child who will grow up in a world Jenni helped make possible.

book5_title: "The Bridge She Built"
book5_arc: >
  By 2262, Jenni is remembered as the pioneer whose sacrifice made human–Galinstanian integration possible. When the twins lead the rescue of the Resonant Echo cluster, Celectra reflects: "Jenni chose to carry us forward when she didn't know if we'd survive. I chose to build bridges so others wouldn't have to carry that weight alone." Jenni's story is taught in colony schools as an example of maternal courage and scientific integrity. Her mitochondrial anomaly—once a medical curiosity—becomes a symbol of resilience: sometimes the smallest differences make the biggest impact.
---

<div class="infobox" id="portrait-container"
     data-title="{{ page.title }}"
     data-birthyear="{{ page.birthday | date: '%Y' }}"
     data-deathdate="{{ page.death_date }}"
     data-status="{{ page.status | default: '' }}">
  <!-- IMAGE BOX: only this element gets the tombstone visual -->
  <div class="portrait-box portrait-deceased" id="portrait-box"
       data-epitaph="{{ page.title }} • {{ page.birthday | date: '%Y' }} – {{ page.death_date | split: ' ' | first }}">
    <img id="character-portrait" src="{{ page.portrait | relative_url }}" alt="{{ page.title }}" class="portrait">
  </div>

  <table>
    <tr><th>Affiliation</th><td>{{ page.affiliation }}</td></tr>
    <tr><th>Status</th><td>{{ page.status }}</td></tr>
    <tr><th>Birthday</th><td>{{ page.birthday }}</td></tr>
    <tr><th>Death</th><td>{{ page.death_date }}</td></tr>
  </table>

  {%- for i in (1..5) -%}
    <span class="sr-only" aria-hidden="true"
          data-book-index="{{ i }}"
          data-book-age="{{ page["book" | append: i | append: "_age"] | default: '' | escape }}"
          data-book-image="{{ page["portrait-book" | append: i ] | default: page.portrait | relative_url }}"></span>
  {%- endfor -%}
</div>

<div class="article-content">
<div class="card-bg">
## Overview
Jinan "Jenni" Carisco was an exogeologist stationed on Utopis-Lab 3, orbiting the moon Oscar in the Ares system. She discovered she was pregnant during a survey mission and chose to keep the news secret until she could tell her husband, Amerigo Carisco, in person. However, a coronal mass ejection from the star Niamh caused a propulsion anomaly on the station, exposing the crew—and Jenni—to high levels of radiation during the critical early stages of her twin pregnancy.

Despite dire medical prognoses, Jenni carried the pregnancy to term, giving birth to Celectra Carisco—a unique child manifesting as one consciousness in two separate bodies due to prenatal radiation exposure that fused the twins' neural development. Jenni's health deteriorated after the birth, and she died on October 11, 2225, at age 30.7. Her legacy lives on through Celectra's existence and the bridge she unintentionally helped create between humans and Galinstanians.
</div>
<div class="card-bg">
## Physical Description
Jenni is remembered through photographs and Amerigo's memories as a woman with warm eyes, practical field attire, and the confident posture of someone comfortable in both lab coats and expedition gear. She favored functional clothing with pockets for samples and datapads, and often wore her hair pulled back for safety during fieldwork. Her hands were steady from years of geological surveying, and she carried herself with the quiet determination of a pioneer.
</div>
<div class="card-bg">
## Personality & Skills
Jenni is defined by:

- resilient pragmatism in the face of uncertainty
- protective maternal instinct that overrides fear
- analytical, data-driven approach to crisis
- quiet optimism that fuels perseverance
- pioneering curiosity about extraterrestrial geology

Her strengths include:

- exogeological surveying and field analysis
- risk assessment under extreme conditions
- methodical documentation and observation
- emotional steadiness during medical uncertainty

Her weaknesses include:

- tendency to internalize stress rather than seek support
- reluctance to share vulnerability, even with loved ones
- carrying the weight of impossible choices alone
</div>
<div class="card-bg">
## Relationships
- **Amerigo Carisco** — husband; deep, loving partnership built on shared dreams of family and exploration
- **Celectra Carisco** — daughter; Jenni's protective actions during the flare directly shaped Celectra's unique physiology and destiny
- **Dr. Yuki Chen** — colleague and physician; provided honest medical assessments with compassion during Jenni's pregnancy
- **Utopis-Lab 3 Crew** — professional peers who relied on her geological expertise during survey missions
</div>
<div class="card-bg">
## Story Overview (Non-Spoiler)
Jenni's arc is brief but foundational: a scientist who becomes a mother under impossible circumstances, choosing hope over certainty when faced with a prognosis that offered neither. Her story is not about grand heroics, but about the quiet courage of carrying forward when the odds are stacked against you. Her legacy is not in what she accomplished in life, but in what she made possible after her death—a daughter who would become a bridge between worlds.
</div>

---

<div class="card-bg">
{% include story-arcs.html %}
</div>
</div>
