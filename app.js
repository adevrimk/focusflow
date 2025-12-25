// ===== FocusFlow v2.0 - Pomodoro & Ambient Sounds =====

const TIMER_CONFIG = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

// 30 Ambient Sounds organized by category
// Using jsDelivr CDN for GitHub hosted sounds
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/adevrimk/focusflow@main/sounds/';

const SOUNDS = {
    // 🌿 Nature (10)
    rain: { name: 'Rain', icon: '🌧️', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce99.mp3' },
    thunderstorm: { name: 'Thunderstorm', icon: '⛈️', category: 'nature', url: CDN_BASE + 'thunderstorm.mp3' },
    thunder: { name: 'Thunder', icon: '🌩️', category: 'nature', url: CDN_BASE + 'thunder.mp3' },
    wind: { name: 'Wind', icon: '💨', category: 'nature', url: CDN_BASE + 'wind.mp3' },
    forest: { name: 'Forest', icon: '🌲', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263fc12.mp3' },
    birds: { name: 'Birds', icon: '🐦', category: 'nature', url: CDN_BASE + 'birds.mp3' },
    river: { name: 'River', icon: '🏞️', category: 'nature', url: CDN_BASE + 'river.mp3' },
    waterfall: { name: 'Waterfall', icon: '🌊', category: 'nature', url: CDN_BASE + 'waterfall.mp3' },
    ocean: { name: 'Ocean', icon: '🌅', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3' },
    beach: { name: 'Beach', icon: '🏖️', category: 'nature', url: CDN_BASE + 'beach.mp3' },

    // ☕ Ambience (8)
    cafe: { name: 'Café', icon: '☕', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3' },
    office: { name: 'Office', icon: '🏢', category: 'ambience', url: CDN_BASE + 'office.mp3' },
    library: { name: 'Library', icon: '📚', category: 'ambience', url: CDN_BASE + 'library.mp3' },
    restaurant: { name: 'Restaurant', icon: '🍽️', category: 'ambience', url: CDN_BASE + 'restaurant.mp3' },
    city: { name: 'City', icon: '🌆', category: 'ambience', url: CDN_BASE + 'city.mp3' },
    train: { name: 'Train', icon: '🚂', category: 'ambience', url: CDN_BASE + 'train.mp3' },
    airplane: { name: 'Airplane', icon: '✈️', category: 'ambience', url: CDN_BASE + 'airplane.mp3' },
    crowd: { name: 'Crowd', icon: '👥', category: 'ambience', url: CDN_BASE + 'crowd.mp3' },

    // 🏠 Home (6)
    fireplace: { name: 'Fireplace', icon: '🔥', category: 'home', url: CDN_BASE + 'fireplace.mp3' },
    fan: { name: 'Fan', icon: '🌀', category: 'home', url: CDN_BASE + 'fan.mp3' },
    ac: { name: 'Air Conditioner', icon: '❄️', category: 'home', url: CDN_BASE + 'ac.mp3' },
    clock: { name: 'Clock', icon: '🕐', category: 'home', url: CDN_BASE + 'clock.mp3' },
    rainwindow: { name: 'Rain Window', icon: '🪟', category: 'home', url: CDN_BASE + 'rainwindow.mp3' },
    keyboard: { name: 'Keyboard', icon: '⌨️', category: 'home', url: CDN_BASE + 'keyboard.mp3' },

    // 🎧 White Noise (6)
    whitenoise: { name: 'White Noise', icon: '📻', category: 'noise', url: CDN_BASE + 'whitenoise.mp3' },
    pinknoise: { name: 'Pink Noise', icon: '🩷', category: 'noise', url: CDN_BASE + 'pinknoise.mp3' },
    brownnoise: { name: 'Brown Noise', icon: '🤎', category: 'noise', url: CDN_BASE + 'brownnoise.mp3' },
    static: { name: 'TV Static', icon: '📺', category: 'noise', url: CDN_BASE + 'static.mp3' },
    dryer: { name: 'Hair Dryer', icon: '<svg viewBox="0 0 48 48" fill="none"><path d="M11 12.14c0-.08.06-.15.14-.16l20.94-2.7C37.34 8.6 42 12.7 42 18s-4.66 9.4-9.92 8.72l-20.94-2.7a.16.16 0 01-.14-.16V12.14z" stroke="currentColor" stroke-width="3"/><path d="M11 12L4 8v20l7-4" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 25l-6.69 15.9a4.5 4.5 0 01-4.67 2.1 4.5 4.5 0 01-3.33-5.04L27 25" stroke="currentColor" stroke-width="3"/><circle cx="35" cy="18" r="7" fill="#ff6b6b" stroke="currentColor" stroke-width="3"/></svg>', category: 'noise', url: CDN_BASE + 'dryer.mp3', isSvg: true },
    shower: { name: 'Shower', icon: '🚿', category: 'noise', url: CDN_BASE + 'shower.mp3' }
};

// Lo-fi Music Streams
const MUSIC_STREAMS = {
    lofi: { name: 'Lo-fi Beats', icon: '🎵', url: 'https://streams.ilovemusic.de/iloveradio17.mp3' },
    jazz: { name: 'Jazz', icon: '🎷', url: 'https://streams.ilovemusic.de/iloveradio10.mp3' },
    piano: { name: 'Piano', icon: '🎹', url: 'https://streams.ilovemusic.de/iloveradio16.mp3' },
    chillout: { name: 'Chill', icon: '😌', url: 'https://streams.ilovemusic.de/iloveradio9.mp3' }
};

const CATEGORIES = {
    all: { name: 'All', icon: '🎵' },
    nature: { name: 'Nature', icon: '🌿' },
    ambience: { name: 'Ambience', icon: '☕' },
    home: { name: 'Home', icon: '🏠' },
    noise: { name: 'Noise', icon: '🎧' },
    music: { name: 'Music', icon: '🎶' }
};

let state = {
    currentMode: 'focus',
    timeRemaining: TIMER_CONFIG.focus,
    totalTime: TIMER_CONFIG.focus,
    isRunning: false,
    sessionCount: parseInt(localStorage.getItem('focusflow_sessions') || '0'),
    totalFocusTime: parseInt(localStorage.getItem('focusflow_totaltime') || '0'),
    streak: parseInt(localStorage.getItem('focusflow_streak') || '0'),
    lastActiveDate: localStorage.getItem('focusflow_lastdate') || '',
    favorites: JSON.parse(localStorage.getItem('focusflow_favorites') || '[]'),
    interval: null,
    sounds: {},
    music: {},
    activeMusicId: null,
    activeCategory: 'all',
    sleepTimerInterval: null,
    sleepTimerRemaining: 0,
    theme: localStorage.getItem('focusflow_theme') || 'dark',
    customFocusTime: parseInt(localStorage.getItem('focusflow_customtime') || '25')
};

// Make state accessible globally for i18n
window.state = state;

const elements = {};

// ===== Timer Functions =====
function updateDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    elements.minutes.textContent = minutes.toString().padStart(2, '0');
    elements.seconds.textContent = seconds.toString().padStart(2, '0');
    const circumference = 2 * Math.PI * 90;
    const progress = state.timeRemaining / state.totalTime;
    elements.progressRing.style.strokeDasharray = circumference;
    elements.progressRing.style.strokeDashoffset = circumference * (1 - progress);
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - FocusFlow`;
}

function startTimer() {
    if (state.isRunning) { pauseTimer(); return; }
    state.isRunning = true;
    updateButtonState();
    state.interval = setInterval(() => {
        if (state.timeRemaining > 0) {
            state.timeRemaining--;
            if (state.currentMode === 'focus') {
                state.totalFocusTime++;
                localStorage.setItem('focusflow_totaltime', state.totalFocusTime.toString());
            }
            updateDisplay();
        }
        else { timerComplete(); }
    }, 1000);
}

function pauseTimer() {
    state.isRunning = false;
    clearInterval(state.interval);
    updateButtonState();
}

function resetTimer() { pauseTimer(); state.timeRemaining = state.totalTime; updateDisplay(); }
function skipTimer() { timerComplete(); }

function timerComplete() {
    pauseTimer();
    elements.notificationSound.currentTime = 0;
    elements.notificationSound.play().catch(() => { });

    if (state.currentMode === 'focus') {
        state.sessionCount++;
        localStorage.setItem('focusflow_sessions', state.sessionCount.toString());
        elements.sessionCount.textContent = state.sessionCount;
        updateStreak();
        showNotification('Focus complete! 🎉', 'Time for a break!');
        switchMode(state.sessionCount % 4 === 0 ? 'longBreak' : 'shortBreak');

        // Show interstitial ad every 2 sessions
        maybeShowInterstitial();
    } else {
        showNotification('Break over! 💪', 'Ready to focus?');
        switchMode('focus');
    }
    updateStats();
}

function switchMode(mode) {
    state.currentMode = mode;
    state.totalTime = TIMER_CONFIG[mode];
    state.timeRemaining = state.totalTime;
    elements.tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    const colors = { focus: '#ff6b6b', shortBreak: '#4ecdc4', longBreak: '#ffe66d' };
    elements.progressRing.style.stroke = colors[mode];
    updateDisplay();
}

function updateButtonState() {
    elements.playIcon.classList.toggle('hidden', state.isRunning);
    elements.pauseIcon.classList.toggle('hidden', !state.isRunning);
}

// ===== Streak System =====
function updateStreak() {
    const today = new Date().toDateString();
    if (state.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (state.lastActiveDate === yesterday) {
            state.streak++;
        } else if (state.lastActiveDate !== '') {
            state.streak = 1;
        } else {
            state.streak = 1;
        }
        state.lastActiveDate = today;
        localStorage.setItem('focusflow_streak', state.streak.toString());
        localStorage.setItem('focusflow_lastdate', today);
    }
}

// ===== Stats =====
function updateStats() {
    const hours = Math.floor(state.totalFocusTime / 3600);
    const mins = Math.floor((state.totalFocusTime % 3600) / 60);
    if (elements.statsDisplay) {
        const t = window.FocusFlowLang ? window.FocusFlowLang.t : (k) => k;
        elements.statsDisplay.textContent = `${hours}h ${mins}m ${t('focused')} | 🔥 ${state.streak} ${t('dayStreak')}`;
    }
}

// ===== Notification =====
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '🍅' });
    }
}

// ===== Custom Timer =====
function setCustomTimer(minutes) {
    state.customFocusTime = minutes;
    localStorage.setItem('focusflow_customtime', minutes.toString());
    TIMER_CONFIG.focus = minutes * 60;
    if (state.currentMode === 'focus' && !state.isRunning) {
        state.timeRemaining = TIMER_CONFIG.focus;
        state.totalTime = TIMER_CONFIG.focus;
        updateDisplay();
    }
}

function initCustomTimer() {
    const slider = document.getElementById('customTimerSlider');
    const valueDisplay = document.getElementById('customTimerValue');
    if (slider && valueDisplay) {
        slider.value = state.customFocusTime;
        valueDisplay.textContent = `${state.customFocusTime} min`;
        TIMER_CONFIG.focus = state.customFocusTime * 60;

        slider.addEventListener('input', (e) => {
            const mins = parseInt(e.target.value);
            valueDisplay.textContent = `${mins} min`;
            setCustomTimer(mins);
        });
    }
}

// ===== Sleep Timer =====
function startSleepTimer(minutes) {
    if (state.sleepTimerInterval) {
        clearInterval(state.sleepTimerInterval);
    }

    if (minutes === 0) {
        state.sleepTimerRemaining = 0;
        updateSleepTimerStatus();
        return;
    }

    state.sleepTimerRemaining = minutes * 60;
    updateSleepTimerStatus();

    state.sleepTimerInterval = setInterval(() => {
        state.sleepTimerRemaining--;
        updateSleepTimerStatus();

        if (state.sleepTimerRemaining <= 0) {
            clearInterval(state.sleepTimerInterval);
            stopAllSounds();
            stopAllMusic();
            showNotification('😴 Sleep Timer', 'Sounds stopped');
        }
    }, 1000);
}

function updateSleepTimerStatus() {
    const status = document.getElementById('sleepTimerStatus');
    if (status) {
        if (state.sleepTimerRemaining > 0) {
            const mins = Math.floor(state.sleepTimerRemaining / 60);
            const secs = state.sleepTimerRemaining % 60;
            status.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        } else {
            status.textContent = '';
        }
    }
}

function initSleepTimer() {
    const select = document.getElementById('sleepTimerSelect');
    if (select) {
        select.addEventListener('change', (e) => {
            startSleepTimer(parseInt(e.target.value));
        });
    }
}

// ===== Theme Toggle =====
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('focusflow_theme', state.theme);
    applyTheme();
}

function applyTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-theme');
        const icon = document.querySelector('.theme-icon');
        if (icon) icon.textContent = '☀️';
    } else {
        document.body.classList.remove('light-theme');
        const icon = document.querySelector('.theme-icon');
        if (icon) icon.textContent = '🌙';
    }
}

function initTheme() {
    applyTheme();
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', toggleTheme);
    }
}

// ===== Web Audio API - Pro Audio Effects =====
let audioContext = null;
let masterGain = null;
let bassFilter = null;
let trebleFilter = null;
let convolver = null;  // For reverb
let panner = null;     // For surround

// Audio effect settings
const audioEffects = {
    bass: parseFloat(localStorage.getItem('focusflow_bass') || '0'),
    treble: parseFloat(localStorage.getItem('focusflow_treble') || '0'),
    reverb: parseFloat(localStorage.getItem('focusflow_reverb') || '0'),
    surround: localStorage.getItem('focusflow_surround') === 'true'
};

function initAudioContext() {
    if (audioContext) return audioContext;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Master gain
    masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);

    // Bass filter (low shelf)
    bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 200;
    bassFilter.gain.value = audioEffects.bass;

    // Treble filter (high shelf)
    trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = audioEffects.treble;

    // Convolver for reverb
    convolver = audioContext.createConvolver();
    createReverbImpulse();

    // Panner for surround
    panner = audioContext.createStereoPanner();
    panner.pan.value = 0;

    // Connect chain: source -> bass -> treble -> panner -> convolver mix -> master
    bassFilter.connect(trebleFilter);
    trebleFilter.connect(panner);
    panner.connect(masterGain);

    console.log('🎛️ Audio effects initialized');
    return audioContext;
}

// Create reverb impulse response
function createReverbImpulse() {
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * 2; // 2 seconds reverb
    const impulse = audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
        }
    }

    convolver.buffer = impulse;
}

// Set bass level (-12 to +12 dB)
function setBass(value) {
    audioEffects.bass = value;
    localStorage.setItem('focusflow_bass', value.toString());
    if (bassFilter) bassFilter.gain.value = value;
    updateEQDisplay();
}

// Set treble level (-12 to +12 dB)
function setTreble(value) {
    audioEffects.treble = value;
    localStorage.setItem('focusflow_treble', value.toString());
    if (trebleFilter) trebleFilter.gain.value = value;
    updateEQDisplay();
}

// Set reverb amount (0 to 1)
function setReverb(value) {
    audioEffects.reverb = value;
    localStorage.setItem('focusflow_reverb', value.toString());
    // Reverb is applied by mixing dry/wet signals
    updateEQDisplay();
}

// Toggle surround effect
function toggleSurround() {
    audioEffects.surround = !audioEffects.surround;
    localStorage.setItem('focusflow_surround', audioEffects.surround.toString());

    if (audioEffects.surround) {
        // Create subtle panning animation
        startSurroundEffect();
    } else {
        stopSurroundEffect();
    }
    updateEQDisplay();
}

let surroundInterval = null;
function startSurroundEffect() {
    if (surroundInterval) return;
    let phase = 0;
    surroundInterval = setInterval(() => {
        if (panner) {
            // Gentle left-right panning
            panner.pan.value = Math.sin(phase) * 0.3;
            phase += 0.05;
        }
    }, 100);
}

function stopSurroundEffect() {
    if (surroundInterval) {
        clearInterval(surroundInterval);
        surroundInterval = null;
    }
    if (panner) panner.pan.value = 0;
}

function updateEQDisplay() {
    const bassEl = document.getElementById('bassValue');
    const trebleEl = document.getElementById('trebleValue');
    const reverbEl = document.getElementById('reverbValue');
    const surroundEl = document.getElementById('surroundToggle');

    if (bassEl) bassEl.textContent = `${audioEffects.bass > 0 ? '+' : ''}${audioEffects.bass}dB`;
    if (trebleEl) trebleEl.textContent = `${audioEffects.treble > 0 ? '+' : ''}${audioEffects.treble}dB`;
    if (reverbEl) reverbEl.textContent = `${Math.round(audioEffects.reverb * 100)}%`;
    if (surroundEl) surroundEl.textContent = audioEffects.surround ? '🔊' : '🔇';
}

function initAudioEffects() {
    initAudioContext();

    // Bass slider
    const bassSlider = document.getElementById('bassSlider');
    if (bassSlider) {
        bassSlider.value = audioEffects.bass;
        bassSlider.addEventListener('input', (e) => setBass(parseFloat(e.target.value)));
    }

    // Treble slider
    const trebleSlider = document.getElementById('trebleSlider');
    if (trebleSlider) {
        trebleSlider.value = audioEffects.treble;
        trebleSlider.addEventListener('input', (e) => setTreble(parseFloat(e.target.value)));
    }

    // Reverb slider
    const reverbSlider = document.getElementById('reverbSlider');
    if (reverbSlider) {
        reverbSlider.value = audioEffects.reverb;
        reverbSlider.addEventListener('input', (e) => setReverb(parseFloat(e.target.value)));
    }

    // Surround toggle
    const surroundBtn = document.getElementById('surroundToggle');
    if (surroundBtn) {
        surroundBtn.addEventListener('click', toggleSurround);
    }

    updateEQDisplay();

    // Start surround if was enabled
    if (audioEffects.surround) startSurroundEffect();
}

// ===== Favorites =====
function toggleFavorite(soundId) {
    const index = state.favorites.indexOf(soundId);
    if (index > -1) {
        state.favorites.splice(index, 1);
    } else {
        state.favorites.push(soundId);
    }
    localStorage.setItem('focusflow_favorites', JSON.stringify(state.favorites));
    renderSounds();
}

// ===== Sound Functions =====
function initializeSounds() {
    // Initialize ambient sounds
    Object.keys(SOUNDS).forEach(soundId => {
        const sound = SOUNDS[soundId];
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.src = sound.url;
        audio.loop = true;
        audio.volume = 0.5;
        audio.preload = 'auto';
        state.sounds[soundId] = { audio, isPlaying: false };
    });

    // Initialize music streams
    Object.keys(MUSIC_STREAMS).forEach(musicId => {
        const music = MUSIC_STREAMS[musicId];
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.src = music.url;
        audio.volume = 0.5;
        state.music[musicId] = { audio, isPlaying: false };
    });
}

function toggleSound(soundId) {
    const sound = state.sounds[soundId];
    if (!sound) return;
    const card = document.querySelector(`[data-sound="${soundId}"]`);
    if (sound.isPlaying) {
        sound.audio.pause();
        sound.audio.currentTime = 0;
        sound.isPlaying = false;
        card?.classList.remove('active');
        updateMediaSession();
    } else {
        sound.audio.play().then(() => {
            sound.isPlaying = true;
            card?.classList.add('active');
            updateMediaSession();
        }).catch(err => console.log('Play failed:', err.message));
    }
}

function setVolume(soundId, volume) {
    if (state.sounds[soundId]) state.sounds[soundId].audio.volume = volume / 100;
}

function stopAllSounds() {
    Object.keys(state.sounds).forEach(soundId => {
        const sound = state.sounds[soundId];
        if (sound.isPlaying) {
            sound.audio.pause();
            sound.audio.currentTime = 0;
            sound.isPlaying = false;
        }
    });
    document.querySelectorAll('.sound-card.active').forEach(card => card.classList.remove('active'));
    updateMediaSession();
}

// ===== Music Functions =====
function toggleMusic(musicId) {
    const music = state.music[musicId];
    if (!music) return;

    const card = document.querySelector(`[data-music="${musicId}"]`);

    // If this music is playing, stop it
    if (music.isPlaying) {
        music.audio.pause();
        music.isPlaying = false;
        state.activeMusicId = null;
        card?.classList.remove('active');
        updateMediaSession();
        return;
    }

    // Stop any other playing music first
    Object.keys(state.music).forEach(id => {
        const m = state.music[id];
        if (m.isPlaying) {
            m.audio.pause();
            m.isPlaying = false;
            document.querySelector(`[data-music="${id}"]`)?.classList.remove('active');
        }
    });

    // Play this music
    music.audio.play().then(() => {
        music.isPlaying = true;
        state.activeMusicId = musicId;
        card?.classList.add('active');
        updateMediaSession();
    }).catch(err => console.log('Music play failed:', err.message));
}

function setMusicVolume(musicId, volume) {
    if (state.music[musicId]) state.music[musicId].audio.volume = volume / 100;
}

function stopAllMusic() {
    Object.keys(state.music).forEach(musicId => {
        const music = state.music[musicId];
        if (music.isPlaying) {
            music.audio.pause();
            music.isPlaying = false;
        }
    });
    state.activeMusicId = null;
    document.querySelectorAll('.music-card.active').forEach(card => card.classList.remove('active'));
    updateMediaSession();
}

// ===== Media Session API (Notification Bar Controls) =====
function updateMediaSession() {
    if (!('mediaSession' in navigator)) return;

    const activeSounds = Object.keys(state.sounds).filter(id => state.sounds[id].isPlaying);

    if (activeSounds.length === 0) {
        navigator.mediaSession.playbackState = 'none';
        return;
    }

    const firstSound = SOUNDS[activeSounds[0]];
    const soundNames = activeSounds.map(id => SOUNDS[id].name).join(', ');

    navigator.mediaSession.metadata = new MediaMetadata({
        title: soundNames,
        artist: 'FocusFlow',
        album: 'Ambient Sounds',
        artwork: [
            { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
    });

    navigator.mediaSession.playbackState = 'playing';

    // Set up action handlers
    navigator.mediaSession.setActionHandler('play', () => {
        // Resume all paused sounds
        Object.keys(state.sounds).forEach(id => {
            const sound = state.sounds[id];
            if (sound.wasPlaying) {
                sound.audio.play();
                sound.isPlaying = true;
                sound.wasPlaying = false;
            }
        });
        updateMediaSession();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        // Pause all playing sounds
        Object.keys(state.sounds).forEach(id => {
            const sound = state.sounds[id];
            if (sound.isPlaying) {
                sound.audio.pause();
                sound.isPlaying = false;
                sound.wasPlaying = true;
            }
        });
        navigator.mediaSession.playbackState = 'paused';
    });

    navigator.mediaSession.setActionHandler('stop', () => {
        stopAllSounds();
    });
}

// ===== Render Sounds =====
function renderSounds() {
    const grid = document.getElementById('soundsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // If music category is selected, render music cards
    if (state.activeCategory === 'music') {
        renderMusicCards(grid);
        return;
    }

    Object.keys(SOUNDS).forEach(soundId => {
        const sound = SOUNDS[soundId];

        // Filter by category
        if (state.activeCategory !== 'all' && sound.category !== state.activeCategory) return;

        const isFavorite = state.favorites.includes(soundId);
        const isPlaying = state.sounds[soundId]?.isPlaying || false;
        const translatedName = window.FocusFlowLang ? window.FocusFlowLang.getSoundName(soundId) : sound.name;

        const card = document.createElement('div');
        card.className = `sound-card ${isPlaying ? 'active' : ''}`;
        card.dataset.sound = soundId;

        card.innerHTML = `
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-fav="${soundId}">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
            <div class="sound-icon">${sound.icon}</div>
            <div class="sound-name">${translatedName}</div>
            <input type="range" class="volume-slider" min="0" max="100" value="50">
            <div class="sound-active-indicator"></div>
        `;

        grid.appendChild(card);
    });

    // Re-attach event listeners
    attachSoundListeners();
}

function renderMusicCards(grid) {
    Object.keys(MUSIC_STREAMS).forEach(musicId => {
        const music = MUSIC_STREAMS[musicId];
        const isPlaying = state.music[musicId]?.isPlaying || false;

        const card = document.createElement('div');
        card.className = `sound-card music-card ${isPlaying ? 'active' : ''}`;
        card.dataset.music = musicId;

        card.innerHTML = `
            <div class="sound-icon">${music.icon}</div>
            <div class="sound-name">${music.name}</div>
            <div class="live-badge">LIVE</div>
            <input type="range" class="volume-slider" min="0" max="100" value="50">
            <div class="sound-active-indicator"></div>
        `;

        grid.appendChild(card);
    });

    // Attach music event listeners
    attachMusicListeners();
}

function attachMusicListeners() {
    document.querySelectorAll('.music-card').forEach(card => {
        const musicId = card.dataset.music;

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('volume-slider')) return;
            toggleMusic(musicId);
        });

        const slider = card.querySelector('.volume-slider');
        if (slider) {
            slider.addEventListener('input', (e) => setMusicVolume(musicId, e.target.value));
            slider.addEventListener('click', (e) => e.stopPropagation());
        }
    });
}

function attachSoundListeners() {
    document.querySelectorAll('.sound-card').forEach(card => {
        const soundId = card.dataset.sound;

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('volume-slider') || e.target.classList.contains('favorite-btn')) return;
            toggleSound(soundId);
        });

        const slider = card.querySelector('.volume-slider');
        if (slider) {
            slider.addEventListener('input', (e) => setVolume(soundId, e.target.value));
            slider.addEventListener('click', (e) => e.stopPropagation());
        }

        const favBtn = card.querySelector('.favorite-btn');
        if (favBtn) {
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(soundId);
            });
        }
    });
}

function renderCategories() {
    const container = document.getElementById('categoryTabs');
    if (!container) return;

    container.innerHTML = '';

    const t = window.FocusFlowLang ? window.FocusFlowLang.t : (k) => k;

    // Add favorites tab
    const favTab = document.createElement('button');
    favTab.className = `category-tab ${state.activeCategory === 'favorites' ? 'active' : ''}`;
    favTab.dataset.category = 'favorites';
    favTab.innerHTML = `❤️ ${t('favorites')}`;
    favTab.addEventListener('click', () => {
        state.activeCategory = 'favorites';
        updateCategoryTabs();
        renderFavoriteSounds();
    });
    container.appendChild(favTab);

    Object.keys(CATEGORIES).forEach(catId => {
        const cat = CATEGORIES[catId];
        const translatedName = t(catId) || cat.name;
        const tab = document.createElement('button');
        tab.className = `category-tab ${state.activeCategory === catId ? 'active' : ''}`;
        tab.dataset.category = catId;
        tab.innerHTML = `${cat.icon} ${translatedName}`;
        tab.addEventListener('click', () => {
            state.activeCategory = catId;
            updateCategoryTabs();
            renderSounds();
        });
        container.appendChild(tab);
    });
}

function updateCategoryTabs() {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === state.activeCategory);
    });
}

function renderFavoriteSounds() {
    const grid = document.getElementById('soundsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (state.favorites.length === 0) {
        grid.innerHTML = '<p class="no-favorites">No favorites yet. Tap ❤️ to add!</p>';
        return;
    }

    state.favorites.forEach(soundId => {
        const sound = SOUNDS[soundId];
        if (!sound) return;

        const isPlaying = state.sounds[soundId]?.isPlaying || false;

        const card = document.createElement('div');
        card.className = `sound-card ${isPlaying ? 'active' : ''}`;
        card.dataset.sound = soundId;

        card.innerHTML = `
            <button class="favorite-btn active" data-fav="${soundId}">❤️</button>
            <div class="sound-icon">${sound.icon}</div>
            <div class="sound-name">${sound.name}</div>
            <input type="range" class="volume-slider" min="0" max="100" value="50">
            <div class="sound-active-indicator"></div>
        `;

        grid.appendChild(card);
    });

    attachSoundListeners();
}

// ===== Event Listeners =====
function initializeEventListeners() {
    elements.startBtn.addEventListener('click', startTimer);
    elements.resetBtn.addEventListener('click', resetTimer);
    elements.skipBtn.addEventListener('click', skipTimer);

    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.isRunning && !confirm('Timer running. Switch?')) return;
            if (state.isRunning) pauseTimer();
            switchMode(btn.dataset.mode);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') { e.preventDefault(); startTimer(); }
        if (e.code === 'KeyR' && e.target.tagName !== 'INPUT') resetTimer();
        if (e.code === 'Escape') stopAllSounds();
    });
}

// ===== Initialize =====
function init() {
    elements.minutes = document.getElementById('minutes');
    elements.seconds = document.getElementById('seconds');
    elements.startBtn = document.getElementById('startBtn');
    elements.resetBtn = document.getElementById('resetBtn');
    elements.skipBtn = document.getElementById('skipBtn');
    elements.sessionCount = document.getElementById('sessionCount');
    elements.progressRing = document.getElementById('progressRing');
    elements.tabBtns = document.querySelectorAll('.tab-btn');
    elements.notificationSound = document.getElementById('notificationSound');
    elements.playIcon = document.querySelector('.play-icon');
    elements.pauseIcon = document.querySelector('.pause-icon');
    elements.langSelector = document.getElementById('langSelector');
    elements.statsDisplay = document.getElementById('statsDisplay');

    elements.sessionCount.textContent = state.sessionCount;
    updateDisplay();
    initializeSounds();
    initializeEventListeners();
    renderCategories();
    renderSounds();
    updateStats();

    // Initialize language
    if (window.FocusFlowLang) {
        elements.langSelector.value = window.FocusFlowLang.currentLang;
        elements.langSelector.addEventListener('change', (e) => {
            window.FocusFlowLang.setLanguage(e.target.value);
        });
        window.FocusFlowLang.updateUI();
    }

    // Initialize new features
    initCustomTimer();
    initSleepTimer();
    initTheme();
    initAudioEffects();

    // Initialize Status Bar (Capacitor)
    initStatusBar();
    initAdMob();
    initBackgroundMode();

    if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
    console.log('🍅 FocusFlow v2.0 ready!');
}

// ===== Status Bar (Android) =====
async function initStatusBar() {
    try {
        if (window.Capacitor && window.Capacitor.isNativePlatform()) {
            const { StatusBar } = await import('@capacitor/status-bar');
            await StatusBar.setBackgroundColor({ color: '#0f0f23' });
            await StatusBar.setStyle({ style: 'DARK' });
        }
    } catch (e) {
        // StatusBar not available (web browser)
    }
}

// ===== Background Mode (Audio continues when app minimized) =====
async function initBackgroundMode() {
    try {
        if (!window.Capacitor || !window.Capacitor.isNativePlatform()) return;

        const { BackgroundMode } = await import('@capacitor-community/background-mode');

        // Enable background mode when sounds are playing
        BackgroundMode.enable();

        // Configure background mode
        BackgroundMode.setSettings({
            title: 'FocusFlow',
            text: 'Playing ambient sounds',
            icon: 'ic_launcher',
            color: '#ff6b6b',
            resume: true,
            hidden: false,
            silence: false
        });

        console.log('🔊 Background mode enabled');
    } catch (e) {
        console.log('Background mode not available:', e.message);
    }
}

// ===== AdMob Integration =====
// AdMob App ID: ca-app-pub-1214355369421942~4507221566
const ADMOB_CONFIG = {
    // Test IDs (for development)
    testBannerId: 'ca-app-pub-3940256099942544/6300978111',
    testInterstitialId: 'ca-app-pub-3940256099942544/1033173712',
    testRewardedId: 'ca-app-pub-3940256099942544/5224354917',

    // REAL IDs - Your AdMob account
    bannerId: 'ca-app-pub-1214355369421942/7019487224',
    interstitialId: 'ca-app-pub-1214355369421942/5620992689',
    rewardedId: 'ca-app-pub-1214355369421942/3630906554',           // Ödüllü reklam
    rewardedInterstitialId: 'ca-app-pub-1214355369421942/4943988228', // Ödüllü geçiş
    nativeId: 'ca-app-pub-1214355369421942/8929682305',             // Yerel gelişmiş
    appOpenId: 'ca-app-pub-1214355369421942/3080242211',            // Uygulama açıkken

    useTestAds: false  // Set to true for testing, false for production
};

let admobInitialized = false;
let interstitialLoaded = false;
let rewardedLoaded = false;

async function initAdMob() {
    try {
        if (!window.Capacitor || !window.Capacitor.isNativePlatform()) return;

        const { AdMob, BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob');

        // Initialize AdMob
        await AdMob.initialize({
            initializeForTesting: ADMOB_CONFIG.useTestAds
        });

        admobInitialized = true;

        // Show banner ad at bottom
        await AdMob.showBanner({
            adId: ADMOB_CONFIG.useTestAds ? ADMOB_CONFIG.testBannerId : ADMOB_CONFIG.bannerId,
            adSize: BannerAdSize.ADAPTIVE_BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0
        });

        // Prepare interstitial for between sessions
        await prepareInterstitial();

        console.log('📢 AdMob initialized');
    } catch (e) {
        console.log('AdMob not available:', e.message);
    }
}

async function prepareInterstitial() {
    try {
        if (!admobInitialized) return;

        const { AdMob } = await import('@capacitor-community/admob');

        await AdMob.prepareInterstitial({
            adId: ADMOB_CONFIG.useTestAds ? ADMOB_CONFIG.testInterstitialId : ADMOB_CONFIG.interstitialId
        });

        interstitialLoaded = true;
    } catch (e) {
        console.log('Interstitial prep failed:', e.message);
    }
}

async function showInterstitial() {
    try {
        if (!admobInitialized || !interstitialLoaded) return;

        const { AdMob } = await import('@capacitor-community/admob');

        await AdMob.showInterstitial();
        interstitialLoaded = false;

        // Prepare next interstitial
        setTimeout(() => prepareInterstitial(), 1000);
    } catch (e) {
        console.log('Interstitial show failed:', e.message);
    }
}

// Call this after every 2 pomodoro sessions
function maybeShowInterstitial() {
    if (state.sessionCount > 0 && state.sessionCount % 2 === 0) {
        showInterstitial();
    }
}

// ===== Rewarded Video Ads =====
async function prepareRewarded() {
    try {
        if (!admobInitialized) return;

        const { AdMob } = await import('@capacitor-community/admob');

        await AdMob.prepareRewardVideoAd({
            adId: ADMOB_CONFIG.useTestAds ? ADMOB_CONFIG.testRewardedId : ADMOB_CONFIG.rewardedId
        });

        rewardedLoaded = true;
    } catch (e) {
        console.log('Rewarded prep failed:', e.message);
    }
}

// Show rewarded ad - user watches video for bonus (e.g., extra focus time, unlock sound)
async function showRewardedAd(onReward) {
    try {
        if (!admobInitialized || !rewardedLoaded) {
            console.log('Rewarded ad not ready');
            return false;
        }

        const { AdMob } = await import('@capacitor-community/admob');

        // Listen for reward
        AdMob.addListener('onRewardedVideoAdReward', (reward) => {
            console.log('User earned reward:', reward);
            if (onReward) onReward(reward);
        });

        await AdMob.showRewardVideoAd();
        rewardedLoaded = false;

        // Prepare next rewarded ad
        setTimeout(() => prepareRewarded(), 1000);

        return true;
    } catch (e) {
        console.log('Rewarded show failed:', e.message);
        return false;
    }
}

// Example: Watch ad to get bonus session
function watchAdForBonus() {
    showRewardedAd((reward) => {
        // Give user a bonus - e.g., +1 session count
        state.sessionCount++;
        localStorage.setItem('focusflow_sessions', state.sessionCount.toString());
        elements.sessionCount.textContent = state.sessionCount;
        showNotification('Bonus! 🎁', 'You earned +1 session!');
    });
}

document.addEventListener('DOMContentLoaded', init);



