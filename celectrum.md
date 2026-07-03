---
layout: default
title: "Celectrum - Electronic Instrument"
origin: "Created by Jaxon"
function: "Musical instrument"
---

<div class="infobox">
  <table>
     <tr>
      <td colspan="2" class="text-center pb-2">
<div class="portrait-container">
    <video id="celectrum-vid" autoplay muted playsinline class="portrait" poster="assets/images/Celectrum.jpg">
      <source src="assets/images/celectrum.mp4" type="video/mp4">
      <img src="assets/images/Celectrum.jpg" title="Your browser does not support the video tag">
    </video>
    
    <div class="video-controls">
        <button onclick="togglePlay()" id="playBtn">⟳ REPLAY</button>
        <button onclick="toggleMute()" id="muteBtn">UNMUTE</button>
    </div>
</div>
      </td>
    </tr>
    <tr><th colspan="2">Specifications</th></tr>
    <tr><th>Origin</th><td>{{ page.origin }}</td></tr>
    <tr><th>Core Function</th><td>{{ page.function }}</td></tr>
  </table>

</div>


<div class="card-bg" markdown="1">

## Contents

- [Contents](#contents)
- [Overview](#overview)
- [Design and Features](#design-and-features)
- [Origins](#origins)
- [Performance Style](#performance-style)
- [Cultural Significance](#cultural-significance)
- [Notable Appearances](#notable-appearances)

</div> <div class="card-bg" markdown="1">

## Overview

The Celectrum is a fictional electronic musical instrument designed to be played without physical strings or keys. Its crescent-shaped body and aurora-like energy effects allow performers to sculpt sound directly from electromagnetic fields, producing ethereal tones and layered textures.

</div> <div class="card-bg" markdown="1">

## Design and Features

  * **Body:** Glossy black crescent, slightly larger than a violin, finished with guitar-like lacquer.
  * **Interface:**
    * **Aurora effects:** Intangible light phenomena resembling storm-globe plasma, responsive to hand gestures.
    * **Proximity antennas:** A shimmering ring that detects motion and distance, controlling pitch and tonal variation.
  * **Operation:**
    * Right hand manipulates pitch through proximity sensors.
    * Left hand triggers pulses and textures via energy fields.
    * No strings or keys; sound emerges from air and light interaction.
    * 
</div> <div class="card-bg" markdown="1">

## Origins

The Celectrum was created by Jaxon, an engineer and musician, as a personal project. The name derives from Celectra, the character who inspired its invention, combined with the suffix “-trum” (from-spectrum), emphasizing resonance and technical accuracy.

</div> <div class="card-bg" markdown="1">

## Performance Style

  * **Sound profile:** Ambient, atmospheric tones reminiscent of a theremin, layered with rhythmic pulses.
  * **Technique:** Gesture-based pitch control combined with aurora-triggered rhythm.
  * **Use case:** Enables real-time layering of sounds without requiring a full ensemble.
  * 
</div> <div class="card-bg" markdown="1">

## Cultural Significance

  * Named after Celectra, symbolizing both her celectricity and emotional resonance.
  * Represents vulnerability and connection, as Jaxon uses it to serenade her.
  * Serves as a metaphor for shaping unseen forces into tangible experiences.
  * 
</div> <div class="card-bg" markdown="1">

## Notable Appearances

  * First introduced in the scene where Jaxon presents the instrument to Celectra, performing an ambient composition with lyrics written for her.
  * Associated with themes of intimacy, innovation, and the blending of science with art.

</div>

  <script>
    const toTopBtn = document.getElementById("toTopBtn");
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 200) {
        toTopBtn.style.display = "block";
      } else {
        toTopBtn.style.display = "none";
      }
    });
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  </script>
  <script>
  const video = document.getElementById('celectrum-vid');
const muteBtn = document.getElementById('muteBtn');

function togglePlay() {
    video.currentTime = 0; // Rewind to start
    video.play();
}

function toggleMute() {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "MUTE";
    } else {
        video.muted = true;
        muteBtn.innerText = "UNMUTE";
    }
}
    </script>
</body>
</html>