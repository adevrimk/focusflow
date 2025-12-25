// ===== FocusFlow Translations =====
// Supported: English, Turkish, German, Spanish, French

const translations = {
    en: {
        appName: "FocusFlow",
        sessions: "sessions",
        focus: "Focus",
        shortBreak: "Short Break",
        longBreak: "Long Break",
        ambientSounds: "Ambient Sounds",
        rain: "Rain",
        cafe: "Café",
        forest: "Forest",
        ocean: "Ocean",
        fireplace: "Fireplace",
        wind: "Wind",
        footer: "Made with 💜 for focus lovers",
        timerRunning: "Timer running. Switch?",
        focusComplete: "Focus session complete! 🎉",
        breakTime: "Time for a break!",
        breakOver: "Break over! 💪",
        readyToFocus: "Ready to focus again?"
    },
    tr: {
        appName: "FocusFlow",
        sessions: "oturum",
        focus: "Odaklan",
        shortBreak: "Kısa Mola",
        longBreak: "Uzun Mola",
        ambientSounds: "Ortam Sesleri",
        rain: "Yağmur",
        cafe: "Kafe",
        forest: "Orman",
        ocean: "Okyanus",
        fireplace: "Şömine",
        wind: "Rüzgar",
        footer: "Odaklanmayı sevenler için 💜 ile yapıldı",
        timerRunning: "Zamanlayıcı çalışıyor. Değiştirilsin mi?",
        focusComplete: "Odaklanma tamamlandı! 🎉",
        breakTime: "Mola zamanı!",
        breakOver: "Mola bitti! 💪",
        readyToFocus: "Tekrar odaklanmaya hazır mısın?"
    },
    de: {
        appName: "FocusFlow",
        sessions: "Sitzungen",
        focus: "Fokus",
        shortBreak: "Kurze Pause",
        longBreak: "Lange Pause",
        ambientSounds: "Umgebungsgeräusche",
        rain: "Regen",
        cafe: "Café",
        forest: "Wald",
        ocean: "Ozean",
        fireplace: "Kamin",
        wind: "Wind",
        footer: "Mit 💜 für Fokus-Liebhaber gemacht",
        timerRunning: "Timer läuft. Wechseln?",
        focusComplete: "Fokus-Sitzung abgeschlossen! 🎉",
        breakTime: "Zeit für eine Pause!",
        breakOver: "Pause vorbei! 💪",
        readyToFocus: "Bereit, wieder zu fokussieren?"
    },
    es: {
        appName: "FocusFlow",
        sessions: "sesiones",
        focus: "Enfoque",
        shortBreak: "Descanso Corto",
        longBreak: "Descanso Largo",
        ambientSounds: "Sonidos Ambientales",
        rain: "Lluvia",
        cafe: "Café",
        forest: "Bosque",
        ocean: "Océano",
        fireplace: "Chimenea",
        wind: "Viento",
        footer: "Hecho con 💜 para amantes del enfoque",
        timerRunning: "Temporizador en marcha. ¿Cambiar?",
        focusComplete: "¡Sesión de enfoque completada! 🎉",
        breakTime: "¡Hora de un descanso!",
        breakOver: "¡Descanso terminado! 💪",
        readyToFocus: "¿Listo para enfocarte de nuevo?"
    },
    fr: {
        appName: "FocusFlow",
        sessions: "sessions",
        focus: "Concentration",
        shortBreak: "Courte Pause",
        longBreak: "Longue Pause",
        ambientSounds: "Sons Ambiants",
        rain: "Pluie",
        cafe: "Café",
        forest: "Forêt",
        ocean: "Océan",
        fireplace: "Cheminée",
        wind: "Vent",
        footer: "Fait avec 💜 pour les amoureux de la concentration",
        timerRunning: "Minuteur en cours. Changer?",
        focusComplete: "Session de concentration terminée! 🎉",
        breakTime: "C'est l'heure de la pause!",
        breakOver: "Pause terminée! 💪",
        readyToFocus: "Prêt à vous concentrer à nouveau?"
    }
};

// Detect browser/phone language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Check if we support this language
    if (translations[langCode]) {
        return langCode;
    }

    // Default to English
    return 'en';
}

// Get current language
let currentLang = localStorage.getItem('focusflow_lang') || detectLanguage();

// Get translation
function t(key) {
    return translations[currentLang]?.[key] || translations['en'][key] || key;
}

// Change language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('focusflow_lang', lang);
        updateUI();
    }
}

// Update all UI text
function updateUI() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const mode = btn.dataset.mode;
        if (mode === 'focus') btn.textContent = t('focus');
        if (mode === 'shortBreak') btn.textContent = t('shortBreak');
        if (mode === 'longBreak') btn.textContent = t('longBreak');
    });

    // Section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.innerHTML = `<span class="title-icon">🎵</span> ${t('ambientSounds')}`;
    }

    // Sound names
    const soundNames = {
        rain: t('rain'),
        cafe: t('cafe'),
        forest: t('forest'),
        ocean: t('ocean'),
        fire: t('fireplace'),
        wind: t('wind')
    };

    document.querySelectorAll('.sound-card').forEach(card => {
        const sound = card.dataset.sound;
        const nameEl = card.querySelector('.sound-name');
        if (nameEl && soundNames[sound]) {
            nameEl.textContent = soundNames[sound];
        }
    });

    // Footer
    const footer = document.querySelector('.footer p');
    if (footer) footer.textContent = t('footer');

    // Session counter
    updateSessionText();
}

function updateSessionText() {
    const counter = document.querySelector('.session-counter');
    if (counter) {
        const count = document.getElementById('sessionCount')?.textContent || '0';
        counter.innerHTML = `<span class="session-icon">🔥</span> <span id="sessionCount">${count}</span> ${t('sessions')}`;
    }
}

// Export for use in app.js
window.FocusFlowLang = { t, setLanguage, currentLang, updateUI, detectLanguage };
