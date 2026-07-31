---
layout: default
title: I Like The Me That I Am
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
  content: "Pause";
} */
</style>

<!-- Add this right above your .lyrics container -->
<div class="audio-player">
  <button id="playToggle" aria-label="Play or pause the song">
    <span class="play-icon">▶</span>
    <span class="pause-icon" style="display:none;">⏸</span>
    <!-- <span class="button-label">Play Reference Track</span> -->
  </button>
  <audio id="audioRef" src="{{ 'assets/audio/i-like-the-me.mp3' | relative_url }}" preload="metadata"></audio>

</div>

<div class="lyrics">

  <div class="stanza">
    Verse 1<br>
    You walk in the room, and the spotlight finds you.<br> 
    Laughter follows close like it’s something you do.<br> 
    Everyone’s drawn to your effortless charm<br>
    Like you’ve got the whole world resting in your palm
  </div>

  <div class="stanza">
    Pre-Chorus<br>
    I wanna be your friend, 
    but I ain't gonna bend 
    I'm me. You're you.
  </div>

  <div class="stanza">
    Chorus<br>
    I want you to LIKE me,<br> 
    but I don't wanna be like you<br> 
    'Cause I'm me and I like the me that I am<br> 
    I want you to LIKE me,<br> 
    but I don't wanna be like you<br> 
    'Cause I'm me and I like the me that I am
  </div>

  <div class="stanza">
    Verse 2<br>
    I tried on your smile, wore your style for a day<br> 
    Spoke your lines, walked your way, tried to play<br> 
    But the mirror cracked—I lost my own face<br>
    Turns out imitation just ain’t my grace
  </div>

  <div class="stanza">
    Pre-Chorus<br>
    I wanna be your friend, 
    but I ain't gonna bend 
    I'm me. You're you.
  </div>

  <div class="stanza">
    Chorus<br>
    I want you to LIKE me,<br> 
    but I don't wanna be like you<br> 
    'Cause I'm me and I like the me that I am<br> 
    I want you to LIKE me,<br> 
    but I don't wanna be like you<br> 
    'Cause I'm me and I like the me that I am
  </div>

  <div class="stanza">
    Bridge<br>
    You’ve got your power, the things I could never do<br> 
    I've got my magic, something completely new<br> 
    But put our two worlds together, and that's the key.<br> 
    That's no compromise, that's just synergy!
  </div>

  <div class="stanza">
    Chorus<br>
    I want you to LIKE me,<br> 
    but I don't wanna be like you<br> 
    'Cause I'm me and I like the me that I am<br> 
    I want you to LIKE me,<br> 
    but I don't wanna be like you<br>
    'Cause I'm me and I like the me that I am<br>
    Yeah, I'm me and I like the me that I am
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