const App = {
    zIndexCounter: 2100,
    state: {
        lang: localStorage.getItem('mm_lang') || 'tr',
        theme: localStorage.getItem('mm_theme') || 'theme-modern',
        volume: localStorage.getItem('mm_vol') !== null ? parseFloat(localStorage.getItem('mm_vol')) : 1.0,
        currentSlot: null,
        g: null
    },

    init: () => {
        document.body.className = App.state.theme;
        StateManager.migrateLegacy();
        App.navigate('start');
        
        // Auto-save loop (every 30 seconds)
        setInterval(() => {
            if(App.state.currentSlot && App.state.g) {
                App.saveGame(false);
            }
        }, 30000);
    },

    navigate: (viewId) => {
        const root = document.getElementById('app-root');
        if(viewId === 'start') root.innerHTML = UI.renderStartScreen();
        if(viewId === 'careers') root.innerHTML = UI.renderCareers();
        if(viewId === 'settings') root.innerHTML = UI.renderSettings();
        if(viewId === 'game') {
            root.innerHTML = UI.renderGameLayout();
            UI.switchTab('tab-shop');
            UI.update();
        }
    },

    loadCareer: (slotId) => {
        App.state.currentSlot = slotId;
        let rawState = StateManager.getSlots()[slotId];
        App.state.g = StateManager.getSafeState(rawState);
        App.navigate('game');
        App.showNotify("Kariyer Yüklendi!", "success");
    },
    newCareer: (slotId) => {
        App.state.currentSlot = slotId;
        App.state.g = StateManager.getInitialGameState();
        App.saveGame(false);
        App.navigate('game');
    },
    deleteCareer: (slotId) => {
        if(confirm(t('delete') + "?")) { StateManager.deleteSlot(slotId); App.navigate('careers'); }
    },
    saveGame: (showMsg = false) => {
        if(App.state.currentSlot && App.state.g) {
            StateManager.saveSlot(App.state.currentSlot, App.state.g);
            if(showMsg) App.showNotify("💾 Oyun Kaydedildi", "success");
        }
    },

    setTheme: (th) => { App.state.theme = th; localStorage.setItem('mm_theme', th); document.body.className = th; if(UI.currentTab) UI.update(); else App.navigate('settings'); },
    setLang: (ln) => { App.state.lang = ln; localStorage.setItem('mm_lang', ln); if(UI.currentTab) UI.update(); else App.navigate('settings'); },
    setVolume: (v) => { 
        App.state.volume = parseFloat(v); 
        localStorage.setItem('mm_vol', v); 
        if(typeof AudioSys !== 'undefined') AudioSys.globalVol = App.state.volume;
        if(typeof AudioSys !== 'undefined') AudioSys.click();
    },

    formatMoney: (m) => '$' + Math.floor(m).toLocaleString('en-US'),
    showNotify: (msg, type='info') => {
        if(type==='error' && typeof AudioSys !== 'undefined') AudioSys.error();
        if(type==='success' && typeof AudioSys !== 'undefined') AudioSys.success();
        
        const c = document.getElementById('toast-container');
        if(!c) return;
        c.innerHTML = ''; 
        
        const t = document.createElement('div'); t.className = 'toast'; t.innerText = msg;
        c.appendChild(t); requestAnimationFrame(() => { t.classList.add('show'); });
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2500);
    },
    showModal: (title, desc) => {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerHTML = desc;
        document.getElementById('modal-overlay').classList.remove('hidden');
    },
    closeModal: () => { document.getElementById('modal-overlay').classList.add('hidden'); }
};

window.onload = () => App.init();
