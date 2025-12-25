// ===== FocusFlow v2.0 - Pomodoro & Ambient Sounds =====

const TIMER_CONFIG = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

// 30 Ambient Sounds organized by category
const SOUNDS = {
    // 🌿 Nature (10)
    rain: { name: 'Rain', icon: '🌧️', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce99.mp3' },
    thunderstorm: { name: 'Thunderstorm', icon: '⛈️', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_ce642e3479.mp3' },
    thunder: { name: 'Thunder', icon: '🌩️', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_cce27fd045.mp3' },
    wind: { name: 'Wind', icon: '💨', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/01/20/audio_0f8c1e4302.mp3' },
    forest: { name: 'Forest', icon: '🌲', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263fc12.mp3' },
    birds: { name: 'Birds', icon: '🐦', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/03/09/audio_c610232c26.mp3' },
    river: { name: 'River', icon: '🏞️', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/02/07/audio_a1bd1ed4c8.mp3' },
    waterfall: { name: 'Waterfall', icon: '🌊', category: 'nature', url: 'https://cdn.pixabay.com/audio/2021/09/08/audio_a6aee5c58c.mp3' },
    ocean: { name: 'Ocean', icon: '🌅', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3' },
    beach: { name: 'Beach', icon: '🏖️', category: 'nature', url: 'https://cdn.pixabay.com/audio/2022/05/31/audio_c0917daeb3.mp3' },

    // ☕ Ambience (8)
    cafe: { name: 'Café', icon: '☕', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3' },
    office: { name: 'Office', icon: '🏢', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/08/04/audio_ade65c7d0a.mp3' },
    library: { name: 'Library', icon: '📚', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/05/17/audio_407815a5a6.mp3' },
    restaurant: { name: 'Restaurant', icon: '🍽️', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/10/25/audio_610c9d2bbb.mp3' },
    city: { name: 'City', icon: '🌆', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/04/27/audio_64ed5f7a08.mp3' },
    train: { name: 'Train', icon: '🚂', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/10/30/audio_1cee19040e.mp3' },
    airplane: { name: 'Airplane', icon: '✈️', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_ecd63d7e19.mp3' },
    crowd: { name: 'Crowd', icon: '👥', category: 'ambience', url: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb630e7de5.mp3' },

    // 🏠 Home (6)
    fireplace: { name: 'Fireplace', icon: '🔥', category: 'home', url: 'https://cdn.pixabay.com/audio/2022/10/30/audio_f2dcc9399d.mp3' },
    fan: { name: 'Fan', icon: '🌀', category: 'home', url: 'https://cdn.pixabay.com/audio/2022/03/12/audio_f0d3a142e1.mp3' },
    ac: { name: 'Air Conditioner', icon: '❄️', category: 'home', url: 'https://cdn.pixabay.com/audio/2022/11/17/audio_dc06f5aa3c.mp3' },
    clock: { name: 'Clock', icon: '🕐', category: 'home', url: 'https://cdn.pixabay.com/audio/2022/01/27/audio_5c496e4396.mp3' },
    rainwindow: { name: 'Rain Window', icon: '🪟', category: 'home', url: 'https://cdn.pixabay.com/audio/2022/09/06/audio_5b9c452eb8.mp3' },
    keyboard: { name: 'Keyboard', icon: '⌨️', category: 'home', url: 'https://cdn.pixabay.com/audio/2022/11/09/audio_c4e64a487a.mp3' },

    // 🎧 White Noise (6)
    whitenoise: { name: 'White Noise', icon: '📻', category: 'noise', url: 'https://cdn.pixabay.com/audio/2022/03/13/audio_3e8f4a4d05.mp3' },
    pinknoise: { name: 'Pink Noise', icon: '🩷', category: 'noise', url: 'https://cdn.pixabay.com/audio/2022/08/23/audio_a076aeb5bc.mp3' },
    brownnoise: { name: 'Brown Noise', icon: '🤎', category: 'noise', url: 'https://cdn.pixabay.com/audio/2022/08/23/audio_76a1e20e18.mp3' },
    static: { name: 'TV Static', icon: '📺', category: 'noise', url: 'https://cdn.pixabay.com/audio/2022/03/23/audio_6c5247000b.mp3' },
    dryer: { name: 'Dryer', icon: '🧺', category: 'noise', url: 'https://cdn.pixabay.com/audio/2022/10/09/audio_2c84ad9a74.mp3' },
    shower: { name: 'Shower', icon: '🚿', category: 'noise', url: 'https://cdn.pixabay.com/audio/2021/08/09/audio_8a2c08ccae.mp3' }
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
    activeCategory: 'all'
};

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
        elements.statsDisplay.textContent = `${hours}h ${mins}m focused | 🔥 ${state.streak} day streak`;
    }
}

// ===== Notification =====
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '🍅' });
    }
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

        const card = document.createElement('div');
        card.className = `sound-card ${isPlaying ? 'active' : ''}`;
        card.dataset.sound = soundId;

        card.innerHTML = `
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-fav="${soundId}">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
            <div class="sound-icon">${sound.icon}</div>
            <div class="sound-name">${sound.name}</div>
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

    // Add favorites tab
    const favTab = document.createElement('button');
    favTab.className = `category-tab ${state.activeCategory === 'favorites' ? 'active' : ''}`;
    favTab.dataset.category = 'favorites';
    favTab.innerHTML = '❤️ Favorites';
    favTab.addEventListener('click', () => {
        state.activeCategory = 'favorites';
        updateCategoryTabs();
        renderFavoriteSounds();
    });
    container.appendChild(favTab);

    Object.keys(CATEGORIES).forEach(catId => {
        const cat = CATEGORIES[catId];
        const tab = document.createElement('button');
        tab.className = `category-tab ${state.activeCategory === catId ? 'active' : ''}`;
        tab.dataset.category = catId;
        tab.innerHTML = `${cat.icon} ${cat.name}`;
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

    // Initialize Status Bar (Capacitor)
    initStatusBar();

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

document.addEventListener('DOMContentLoaded', init);

