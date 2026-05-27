// tts.js – Text‑to‑Speech with header controls and highlighting
(function() {
    const CONFIG = {
        highlightBg: 'rgba(255, 235, 59, 0.4)',
        scrollPadding: 20,
        storageKey: 'ttsSettings',
        voiceLangPattern: /^en-/i
    };

    // DOM elements (will be found after page load)
    let voiceSelect, playBtn, pauseBtn, stopBtn, rateSlider, rateValue;
    let currentUtterance = null;
    let voicesList = [];

    function getMainTextNodes() {
        // Exclude navigation, header, footer, and the TTS controls themselves
        const excludeSelectors = '.tts-controls, .top-banner, .home-button, #toTopBtn, .quick-jump, .search-container, nav, header, footer';
        const mainElement = document.querySelector('main') || document.querySelector('article') || document.body;
        const clone = mainElement.cloneNode(true);
        clone.querySelectorAll(excludeSelectors).forEach(el => el.remove());
        let text = clone.innerText.replace(/\s+/g, ' ').trim();
        return text;
    }

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
                acceptNode: function(node) {
                    if (node.parentElement.closest('.tts-controls')) return NodeFilter.FILTER_REJECT;
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
                span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    }

    function autoScrollToHighlight() {
        const highlighted = document.querySelector('.tts-highlight');
        if (highlighted) highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

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
                updateRateDisplay();
            } catch(e) {}
        }
    }

    function updateRateDisplay() {
        if (rateValue) rateValue.textContent = rateSlider.value;
    }

    function saveSettings() {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify({
            voiceName: voiceSelect.value,
            rate: rateSlider.value
        }));
    }

    function speak() {
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
        const text = getMainTextNodes();
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voicesList.find(v => v.name === voiceSelect.value);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = parseFloat(rateSlider.value);
        utterance.lang = 'en-US';

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
            document.querySelectorAll('.tts-highlight').forEach(el => {
                el.style.backgroundColor = '';
                el.classList.remove('tts-highlight');
            });
        };
        utterance.onerror = (err) => console.warn('TTS error:', err);
        currentUtterance = utterance;
        speechSynthesis.speak(utterance);
    }

    function init() {
        voiceSelect = document.getElementById('ttsVoiceSelect');
        playBtn = document.getElementById('ttsPlayBtn');
        pauseBtn = document.getElementById('ttsPauseBtn');
        stopBtn = document.getElementById('ttsStopBtn');
        rateSlider = document.getElementById('ttsRateSlider');
        rateValue = document.getElementById('ttsRateValue');
        if (!voiceSelect) return; // controls not in DOM yet? Wait.

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
            updateRateDisplay();
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();