// ===== FocusFlow - Pomodoro & Ambient Sounds =====

const TIMER_CONFIG = { focus: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 };

const SOUND_URLS = {
    rain: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce99.mp3',
    cafe: 'https://cdn.pixabay.com/audio/2024/11/04/audio_49aboremfr.mp3',
    forest: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263fc12.mp3',
    ocean: 'https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3',
    fire: 'https://cdn.pixabay.com/audio/2021/08/09/audio_a7884f5562.mp3',
    wind: 'https://cdn.pixabay.com/audio/2022/03/24/audio_f180bba883.mp3'
};

let state = {
    currentMode: 'focus',
    timeRemaining: TIMER_CONFIG.focus,
    totalTime: TIMER_CONFIG.focus,
    isRunning: false,
    sessionCount: parseInt(localStorage.getItem('focusflow_sessions') || '0'),
    interval: null,
    sounds: {}
};

const elements = {};

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
        if (state.timeRemaining > 0) { state.timeRemaining--; updateDisplay(); }
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
        showNotification('Focus session complete! 🎉', 'Time for a break!');
        switchMode(state.sessionCount % 4 === 0 ? 'longBreak' : 'shortBreak');
    } else {
        showNotification('Break over! 💪', 'Ready to focus again?');
        switchMode('focus');
    }
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

function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '🍅' });
    }
}

function initializeSounds() {
    Object.keys(SOUND_URLS).forEach(soundName => {
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.src = SOUND_URLS[soundName];
        audio.loop = true;
        audio.volume = 0.5;
        audio.preload = 'auto';
        state.sounds[soundName] = { audio, isPlaying: false };
    });
}

function toggleSound(soundName) {
    const sound = state.sounds[soundName];
    if (!sound) return;
    const card = document.querySelector(`[data-sound="${soundName}"]`);
    if (sound.isPlaying) {
        sound.audio.pause();
        sound.audio.currentTime = 0;
        sound.isPlaying = false;
        card.classList.remove('active');
    } else {
        sound.audio.play().then(() => {
            sound.isPlaying = true;
            card.classList.add('active');
        }).catch(err => console.log('Play failed:', err.message));
    }
}

function setVolume(soundName, volume) {
    if (state.sounds[soundName]) state.sounds[soundName].audio.volume = volume / 100;
}

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
    elements.soundCards.forEach(card => {
        const soundName = card.dataset.sound;
        card.addEventListener('click', (e) => { if (!e.target.classList.contains('volume-slider')) toggleSound(soundName); });
        const slider = card.querySelector('.volume-slider');
        slider.addEventListener('input', (e) => setVolume(soundName, e.target.value));
        slider.addEventListener('click', (e) => e.stopPropagation());
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') { e.preventDefault(); startTimer(); }
        if (e.code === 'KeyR' && e.target.tagName !== 'INPUT') resetTimer();
    });
}

function init() {
    elements.minutes = document.getElementById('minutes');
    elements.seconds = document.getElementById('seconds');
    elements.startBtn = document.getElementById('startBtn');
    elements.resetBtn = document.getElementById('resetBtn');
    elements.skipBtn = document.getElementById('skipBtn');
    elements.sessionCount = document.getElementById('sessionCount');
    elements.progressRing = document.getElementById('progressRing');
    elements.tabBtns = document.querySelectorAll('.tab-btn');
    elements.soundCards = document.querySelectorAll('.sound-card');
    elements.notificationSound = document.getElementById('notificationSound');
    elements.playIcon = document.querySelector('.play-icon');
    elements.pauseIcon = document.querySelector('.pause-icon');

    elements.sessionCount.textContent = state.sessionCount;
    updateDisplay();
    initializeSounds();
    initializeEventListeners();
    if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
    console.log('🍅 FocusFlow ready!');
}

document.addEventListener('DOMContentLoaded', init);
