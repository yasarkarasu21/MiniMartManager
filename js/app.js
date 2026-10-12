const App = {
    zIndexCounter: 2100,
    state: {
        lang: localStorage.getItem('mm_lang') || 'tr',
        theme: localStorage.getItem('mm_theme') || 'theme-modern',
        volume: localStorage.getItem('mm_vol') !== null ? parseFloat(localStorage.getItem('mm_vol')) : 1.0,
        currentSlot: null,
        g: null
    },

    init: async () => {
        document.body.className = App.state.theme;
        if (typeof GameData !== 'undefined' && GameData.loadSettingsAsync) {
            await GameData.loadSettingsAsync();
        }
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
        if (typeof Engine !== 'undefined' && Engine.checkDailyLoginBonus) {
            Engine.checkDailyLoginBonus();
        }
    },
    newCareer: (slotId) => {
        App.state.currentSlot = slotId;
        App.state.g = StateManager.getInitialGameState();
        App.saveGame(false);
        App.navigate('game');
        if (typeof Engine !== 'undefined' && Engine.checkDailyLoginBonus) {
            Engine.checkDailyLoginBonus();
        }
    },
    deleteCareer: (slotId) => {
        App.showModal("Kariyeri Sil", "Bu kariyeri tamamen silmek istediğine emin misin? Bu işlem geri alınamaz.", `
            <button class="btn btn-danger" onclick="App.doDeleteCareer(${slotId})">Evet, Sil</button>
            <button class="btn" onclick="App.closeModal()">Vazgeç</button>
        `);
    },
    doDeleteCareer: (slotId) => {
        StateManager.deleteSlot(slotId); App.closeModal(); App.navigate('careers');
    },
    saveGame: (showMsg = false) => {
        if(App.state.currentSlot && App.state.g) {
            StateManager.saveSlot(App.state.currentSlot, App.state.g);
            if(showMsg) App.showNotify("💾 Oyun Kaydedildi", "success");
        }
    },

    setTheme: (th) => { App.state.theme = th; localStorage.setItem('mm_theme', th); document.body.className = th; if(UI.currentTab) UI.update(); else App.navigate('settings'); },
    setLang: (ln) => { 
        App.state.lang = ln; 
        localStorage.setItem('mm_lang', ln); 
        if(App.state.g && UI.currentTab) {
            let activeTab = UI.currentTab;
            App.navigate('game');
            UI.switchTab(activeTab);
            UI.openPanel('settings');
        } else {
            App.navigate('settings');
        }
    },
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
    showModal: (title, desc, buttonsHTML) => {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerHTML = desc;
        let actions = document.getElementById('modal-actions');
        if(actions) actions.innerHTML = buttonsHTML || `<button class="btn btn-primary" onclick="App.closeModal()">Tamam</button>`;
        document.getElementById('modal-overlay').classList.remove('hidden');
    },
    closeModal: () => { document.getElementById('modal-overlay').classList.add('hidden'); }
};

window.onload = () => App.init();
