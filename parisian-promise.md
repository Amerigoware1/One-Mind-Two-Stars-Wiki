---
layout: default
title: Parisian Promise
---

<style>
.lyrics {
  display: flex;
  flex-direction: column;   /* Stacks the stanzas vertically in a column */
  align-items: center;      /* Centers each stanza block horizontally */
  margin: 2rem auto;
}

/* Style for each stanza (verse/chorus/bridge) */
.lyrics .stanza {
  text-align: left;         /* Keeps the lyrics flush left inside their block */
  width: 100%;              /* Allows max-width to govern the sizing */
  max-width: 24em;          /* Shrink this slightly so the vertical alignment is tight and clean */
  padding: 0 1rem; 
  margin: 1.5rem 0; 
  line-height: 1.9;
  font-size: 1.1rem;
  box-sizing: border-box;
}

/* If you want the Chorus text to be fully center-aligned for drama */
.lyrics .stanza.chorus {
  text-align: center;       /* Overrides the left-align just for choruses */
}
.audio-player {
  text-align: center;
  margin: 1.5rem 0 2.5rem 0;
}

#playToggle {
  background: none;
  border: 2px solid currentColor;
  border-radius: 50px;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: #333; /* or match your theme */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
}

#playToggle:hover {
  background: #333;
  color: #fff;
  border-color: #333;
}

#playToggle .play-icon,
#playToggle .pause-icon {
  font-size: 1.2rem;
  line-height: 1;
}

/* #playToggle .button-label {
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* When playing, subtly change the button text */
/* #playToggle.playing .button-label {
  content: "Pause"; */
} */
</style>

<!-- Add this right above your .lyrics container -->
<div class="audio-player">
  <button id="playToggle" aria-label="Play or pause the song">
    <span class="play-icon">▶</span>
    <span class="pause-icon" style="display:none;">⏸</span>
    <!-- <span class="button-label">Play Reference Track</span> -->
  </button>
  "
  <audio id="audioRef" src="{{ 'assets/audio/parisian-promise.mp3' | relative_url }}" preload="metadata"></audio>
</div>

<div class="lyrics">

  <div class="stanza">
    Verse 1<br>
    Sitting out on the terrace,<br>
    Deep in the heart of Paris,<br>
    Sharing a bottle of wine,<br>
    With the one I cherish.
  </div>

  <!-- Add the "chorus" class here to center it completely -->
  <div class="stanza">
    Chorus<br>
    Parisian nights, champagne bright,<br>
    With you by my side, the world feels right!<br>
    From Eiffel's glow to the Seine's gentle sway,<br>
    Love's in the air, come what may!
  </div>

  <div class="stanza">
    Verse 2<br>
    A gentle breeze, a soft perfume,<br>
    Chasing shadows with jasmine bloom.<br>
    The city hums, a distant sound,<br>
    Making plans for a day in June.
  </div>

  <div class="stanza">
    Chorus<br>
    Parisian nights, champagne bright,<br>
    With you by my side, the world feels right!<br>
    From Eiffel's glow to the Seine's gentle sway,<br>
    Love's in the air, come what may!
  </div>

  <div class="stanza">
    Verse 3<br>
    The streetlights shimmer, a golden glow,<br>
    As quiet moments softly flow.<br>
    Every whisper, every glance we share,<br>
    A timeless memory, as I row.
  </div>

  <div class="stanza">
    Bridge<br>
    Beyond the monuments, the grand display,<br>
    It's just your hand in mine, guiding the way.<br>
    This feeling deeper than the Seine runs deep,<br>
    A sacred promise that our hearts will keep.<br>
  </div>

  <div class="stanza">
    Chorus<br>
    Parisian nights, champagne bright,<br>
    With you by my side, the world feels right!<br>
    From Eiffel's glow to the Seine's gentle sway,<br>
    Love's in the air, come what may!
  </div>

  <div class="stanza">
    Outro<br>
    Love's in the air, come what may...<br>
    In the City of Love...<br>
    With you — beneath Paris skies, always
  </div>

</div>

<script>
  (function() {
    const audio = document.getElementById('audioRef');
    const toggle = document.getElementById('playToggle');
    const playIcon = toggle.querySelector('.play-icon');
    const pauseIcon = toggle.querySelector('.pause-icon');
    // const label = toggle.querySelector('.button-label');

    // Toggle play/pause on click
    toggle.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        toggle.classList.add('playing');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        // label.textContent = 'Pause';
      } else {
        audio.pause();
        toggle.classList.remove('playing');
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        // label.textContent = 'Play Reference Track';
      }
    });

    // When the song ends, reset the button automatically
    audio.addEventListener('ended', function() {
      toggle.classList.remove('playing');
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      // label.textContent = 'Play Reference Track';
      // Optionally rewind to start
      audio.currentTime = 0;
    });

    // Optional: handle errors gracefully (e.g., file not found)
    audio.addEventListener('error', function() {
      alert('Audio file not found. Please check the file path: audioRef');
      toggle.style.opacity = '0.5';
      toggle.style.cursor = 'not-allowed';
    });
  })();
</script>