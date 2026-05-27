// tts.js – Text‑to‑Speech with floating controls and highlighting
(function() {
    // ========================
    // 1. CONFIGURATION
    // ========================
    const CONFIG = {
        highlightColor: '#ffeb3b',       // yellow highlight
        highlightBg: 'rgba(255, 235, 59, 0.4)',
        scrollPadding: 20,               // pixels above highlighted element
        storageKey: 'ttsSettings',
        voiceLangPattern: /^en-/i       // English voices only
    };

    // ========================
    // 2. CREATE FLOATING CONTROLS
    // ========================
    const controlsHTML = `
        <div id="ttsPanel" style="position: fixed; top: 20px; right: 20px; z-index: 9999; background: #1e1e2f; border-radius: 12px; padding: 12px 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 1px solid #bb86fc; backdrop-filter: blur(10px); font-family: sans-serif; font-size: 0.9rem; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <select id="ttsVoiceSelect" style="background: #0c0028; color: white; border: 1px solid #bb86fc; border-radius: 4px; padding: 4px 8px;"></select>
            <button id="ttsPlayBtn" style="background: #bb86fc; color: #0c0028; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;">▶ Play</button>
            <button id="ttsPauseBtn" style="background: #555; color: white; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;">⏸ Pause</button>
            <button id="ttsStopBtn" style="background: #555; color: white; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;">■ Stop</button>
            <label style="color: white; display: flex; align-items: center; gap: 4px;">Speed:
                <input type="range" id="ttsRateSlider" min="0.5" max="2" step="0.1" value="1" style="width: 80px;">
                <span id="ttsRateValue" style="color: #bb86fc;">1.0</span>
            </label>
        </div>
    `;

    // Insert controls into the page
    document.body.insertAdjacentHTML('beforeend', controlsHTML);

    // DOM elements
    const voiceSelect = document.getElementById('ttsVoiceSelect');
    const playBtn = document.getElementById('ttsPlayBtn');
    const pauseBtn = document.getElementById('ttsPauseBtn');
    const stopBtn = document.getElementById('ttsStopBtn');
    const rateSlider = document.getElementById('ttsRateSlider');
    const rateValue = document.getElementById('ttsRateValue');

    // Speech synthesis globals
    let currentUtterance = null;
    let currentRange = null;          // current text node range being spoken (optional)
    let voicesList = [];
    let pendingResume = false;

    // ========================
    // 3. HELPER: GET TEXT TO READ
    // ========================
    function getMainTextNodes() {
        // You can customise which parts of the page to read.
        // Default: exclude navigation, controls, header, footer
        const excludeSelectors = '#ttsPanel, .top-banner, .home-button, #toTopBtn, .quick-jump, .search-container';
        const mainElement = document.querySelector('main') || document.querySelector('article') || document.body;
        const clone = mainElement.cloneNode(true);
        // Remove excluded elements from clone
        clone.querySelectorAll(excludeSelectors).forEach(el => el.remove());
        // Get text content
        let text = clone.innerText;
        // Clean up excessive whitespace
        text = text.replace(/\s+/g, ' ').trim();
        return text;
    }

    // ========================
    // 4. HIGHLIGHT & SCROLL LOGIC
    // ========================
    function highlightCurrentSentence(sentenceText) {
        // Remove previous highlights
        document.querySelectorAll('.tts-highlight').forEach(el => {
            el.style.backgroundColor = '';
            el.classList.remove('tts-highlight');
        });
        if (!sentenceText) return;
        // Find the paragraph/element containing this sentence (naive but effective)
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip hidden elements and our own panel
                    if (node.parentElement.closest('#ttsPanel')) return NodeFilter.FILTER_REJECT;
                    if (node.parentElement.style.display === 'none') return NodeFilter.FILTER_REJECT;
                    if (node.textContent.trim().length === 0) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(sentenceText)) {
                const span = document.createElement('span');
                span.className = 'tts-highlight';
                span.style.backgroundColor = CONFIG.highlightBg;
                span.style.transition = 'background-color 0.2s';
                span.textContent = node.textContent;
                node.parentNode.replaceChild(span, node);
                // Scroll to this element
                span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    }

    function autoScrollToHighlight() {
        const highlighted = document.querySelector('.tts-highlight');
        if (highlighted) {
            highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // ========================
    // 5. VOICE POPULATION
    // ========================
    function populateVoices() {
        voicesList = speechSynthesis.getVoices();
        const englishVoices = voicesList.filter(voice => CONFIG.voiceLangPattern.test(voice.lang));
        if (englishVoices.length === 0) return;
        voiceSelect.innerHTML = englishVoices.map(voice =>
            `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
        ).join('');
        // Restore saved voice preference
        const saved = localStorage.getItem(CONFIG.storageKey);
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                if (settings.voiceName && englishVoices.some(v => v.name === settings.voiceName)) {
                    voiceSelect.value = settings.voiceName;
                }
                if (settings.rate) rateSlider.value = settings.rate;
            } catch(e) {}
        }
        updateRateDisplay();
    }

    // ========================
    // 6. SPEAK FUNCTION
    // ========================
    function speak() {
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
        const text = getMainTextNodes();
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoiceName = voiceSelect.value;
        const voice = voicesList.find(v => v.name === selectedVoiceName);
        if (voice) utterance.voice = voice;
        utterance.rate = parseFloat(rateSlider.value);
        utterance.lang = 'en-US';

        // Highlighting: use boundary event to get approximate sentence chunk
        let lastSentence = '';
        utterance.onboundary = (event) => {
            if (event.name === 'sentence' || event.name === 'word') {
                const currentText = text.substring(event.charIndex, event.charIndex + event.charLength);
                if (currentText && currentText !== lastSentence) {
                    highlightCurrentSentence(currentText);
                    autoScrollToHighlight();
                    lastSentence = currentText;
                }
            }
        };

        utterance.onend = () => {
            currentUtterance = null;
            // Remove highlights when done
            document.querySelectorAll('.tts-highlight').forEach(el => {
                el.style.backgroundColor = '';
                el.classList.remove('tts-highlight');
            });
        };

        utterance.onerror = (err) => {
            console.warn('TTS error:', err);
            currentUtterance = null;
        };

        currentUtterance = utterance;
        speechSynthesis.speak(utterance);
    }

    // ========================
    // 7. CONTROLS EVENT HANDLERS
    // ========================
    playBtn.addEventListener('click', () => {
        // If paused, resume
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        } else {
            speak();
        }
    });

    pauseBtn.addEventListener('click', () => {
        if (speechSynthesis.speaking && !speechSynthesis.paused) {
            speechSynthesis.pause();
        }
    });

    stopBtn.addEventListener('click', () => {
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
        document.querySelectorAll('.tts-highlight').forEach(el => {
            el.style.backgroundColor = '';
            el.classList.remove('tts-highlight');
        });
    });

    rateSlider.addEventListener('input', () => {
        updateRateDisplay();
        // Save rate preference
        saveSettings();
        if (currentUtterance) {
            // Rate change only applies to new utterances; we can restart if needed
            // For simplicity, we stop and require replay
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
                currentUtterance = null;
            }
        }
    });

    voiceSelect.addEventListener('change', () => {
        saveSettings();
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
    });

    function updateRateDisplay() {
        rateValue.textContent = rateSlider.value;
    }

    function saveSettings() {
        const settings = {
            voiceName: voiceSelect.value,
            rate: rateSlider.value
        };
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(settings));
    }

    // ========================
    // 8. INITIALISE
    // ========================
    // Voices may be loaded asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }
    populateVoices(); // call immediately in case voices already available

    // Ensure controls don't cover back-to-top button (adjust CSS if needed)
    // The back-to-top button (if already present) probably has bottom:20px right:20px; our panel is top-right.
})();