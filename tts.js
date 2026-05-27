// tts.js – Floating TTS panel with highlighting and auto‑scroll
(function() {
    const CONFIG = {
        highlightBg: 'rgba(255, 235, 59, 0.4)',
        storageKey: 'ttsSettings',
        voiceLangPattern: /^en-/i
    };

    let currentUtterance = null;
    let voicesList = [];

    // ----- Create floating panel HTML -----
    const panel = document.createElement('div');
    panel.id = 'ttsFloatingPanel';
    panel.innerHTML = `
        <div style="background: #1e1e2f; border-radius: 12px; padding: 10px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 1px solid #bb86fc; backdrop-filter: blur(8px); display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-family: sans-serif; font-size: 0.8rem;">
            <select id="ttsVoiceSelect" style="background:#0c0028; color:white; border:1px solid #bb86fc; border-radius:4px; padding:4px 6px;"></select>
            <button id="ttsPlayBtn" style="background:#bb86fc; color:#0c0028; border:none; border-radius:4px; padding:4px 12px; cursor:pointer;">▶ Play</button>
            <button id="ttsPauseBtn" style="background:#555; color:white; border:none; border-radius:4px; padding:4px 12px; cursor:pointer;">⏸ Pause</button>
            <button id="ttsStopBtn" style="background:#555; color:white; border:none; border-radius:4px; padding:4px 12px; cursor:pointer;">■ Stop</button>
            <label style="color:white; display:flex; align-items:center; gap:4px;">Speed:
                <input type="range" id="ttsRateSlider" min="0.5" max="2" step="0.1" value="1" style="width:80px;">
                <span id="ttsRateValue" style="color:#bb86fc;">1.0</span>
            </label>
        </div>
    `;
    panel.style.position = 'fixed';
    panel.style.bottom = '20px';
    panel.style.right = '20px';
    panel.style.zIndex = '9999';
    document.body.appendChild(panel);

    // DOM elements
    const voiceSelect = document.getElementById('ttsVoiceSelect');
    const playBtn = document.getElementById('ttsPlayBtn');
    const pauseBtn = document.getElementById('ttsPauseBtn');
    const stopBtn = document.getElementById('ttsStopBtn');
    const rateSlider = document.getElementById('ttsRateSlider');
    const rateValue = document.getElementById('ttsRateValue');

    // ----- Helper: get main text to read (exclude navigation, panel, etc.) -----
    function getMainText() {
        const excludeSelectors = '#ttsFloatingPanel, .top-banner, .home-button, #toTopBtn, .quick-jump, .search-container, nav, header, footer';
        const mainElem = document.querySelector('main') || document.querySelector('article') || document.body;
        const clone = mainElem.cloneNode(true);
        clone.querySelectorAll(excludeSelectors).forEach(el => el.remove());
        return clone.innerText.replace(/\s+/g, ' ').trim();
    }

    // ----- Highlight and scroll -----
    function highlightCurrentSentence(sentenceText) {
        document.querySelectorAll('.tts-highlight').forEach(el => {
            el.style.backgroundColor = '';
            el.classList.remove('tts-highlight');
        });
        if (!sentenceText) return;
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    if (node.parentElement.closest('#ttsFloatingPanel')) return NodeFilter.FILTER_REJECT;
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
                span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    }

    // ----- Voice list -----
    function populateVoices() {
        voicesList = speechSynthesis.getVoices();
        const englishVoices = voicesList.filter(v => CONFIG.voiceLangPattern.test(v.lang));
        if (!englishVoices.length) return;
        voiceSelect.innerHTML = englishVoices.map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`).join('');
        const saved = localStorage.getItem(CONFIG.storageKey);
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                if (settings.voiceName && englishVoices.some(v => v.name === settings.voiceName))
                    voiceSelect.value = settings.voiceName;
                if (settings.rate) rateSlider.value = settings.rate;
                rateValue.textContent = rateSlider.value;
            } catch(e) {}
        }
    }

    function saveSettings() {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify({
            voiceName: voiceSelect.value,
            rate: rateSlider.value
        }));
    }

    // ----- Speech -----
    function speak() {
        if (currentUtterance) speechSynthesis.cancel();
        const text = getMainText();
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voicesList.find(v => v.name === voiceSelect.value);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = parseFloat(rateSlider.value);
        utterance.lang = 'en-US';

        let lastSentence = '';
        // utterance.onboundary = (event) => {
            // if (event.name === 'sentence' || event.name === 'word') {
                // const currentText = text.substring(event.charIndex, event.charIndex + event.charLength);
                // if (currentText && currentText !== lastSentence) {
                   //  highlightCurrentSentence(currentText);
                    // lastSentence = currentText;
                // }
            // }
        // };
        utterance.onend = () => {
            currentUtterance = null;
            document.querySelectorAll('.tts-highlight').forEach(el => {
                el.style.backgroundColor = '';
                el.classList.remove('tts-highlight');
            });
        };
        utterance.onerror = (err) => console.warn('TTS error:', err);
        currentUtterance = utterance;
        speechSynthesis.speak(utterance);
    }

    // ----- Event listeners -----
    playBtn.addEventListener('click', () => {
        if (speechSynthesis.paused) speechSynthesis.resume();
        else speak();
    });
    pauseBtn.addEventListener('click', () => {
        if (speechSynthesis.speaking && !speechSynthesis.paused) speechSynthesis.pause();
    });
    stopBtn.addEventListener('click', () => {
        if (currentUtterance) speechSynthesis.cancel();
        currentUtterance = null;
        document.querySelectorAll('.tts-highlight').forEach(el => {
            el.style.backgroundColor = '';
            el.classList.remove('tts-highlight');
        });
    });
    rateSlider.addEventListener('input', () => {
        rateValue.textContent = rateSlider.value;
        saveSettings();
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
    });
    voiceSelect.addEventListener('change', () => {
        saveSettings();
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
    });

    if (speechSynthesis.onvoiceschanged !== undefined)
        speechSynthesis.onvoiceschanged = populateVoices;
    populateVoices();
})();