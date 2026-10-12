const UI = {
    currentTab: 'tab-shop',
    
    renderGameLayout: () => `
        <header style="position: relative; padding-top: 10px; padding-bottom: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); z-index: 100;">
            <div class="top-row">
                <div class="header-stat"><span class="stat-icon">🗓️</span><span class="stat-text" id="s-date"></span></div>
                <div class="header-stat money"><span class="stat-icon">💵</span><span class="stat-text" id="s-money"></span></div>
            </div>
            <div class="top-row mt-2">
                <div class="header-stat" style="cursor:pointer;" onclick="UI.openPanel('reviews')"><span class="stat-icon">⭐</span><span class="stat-text">%<span id="s-pop"></span> ${t('headerPop')}</span></div>
                <div class="header-stat" style="background:rgba(231,76,60,0.3); cursor:pointer;" onclick="UI.openPanel('cargo')"><span class="stat-icon">🚚</span><span class="stat-text">${t('headerCargo')}: <span id="s-truck"></span></span></div>
                <div class="header-stat" style="background:rgba(52,152,219,0.3); cursor:pointer;" onclick="UI.openPanel('market')"><span class="stat-icon">📊</span><span class="stat-text">${t('headerMarket')}: %<span id="s-market-share"></span></span></div>
                <div class="header-stat" id="s-morale-box" style="background:rgba(155,89,182,0.2); cursor:pointer;" onclick="App.showNotify(t('headerMorale') + ': %' + (App.state.g.bossMorale || 80))"><span class="stat-icon" id="s-morale-icon">😎</span><span class="stat-text">%<span id="s-morale">80</span></span></div>
            </div>
            <div class="storage-container mt-2">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:800; margin-bottom:5px;"><span>📦 ${t('headerStorage')}</span><span id="s-storage"></span></div>
                <div class="progress-bar"><div class="progress-fill" id="storage-fill" style="width: 0%;"></div></div>
            </div>
            <div class="top-row mt-2" id="trend-bar" style="display:none; width:100%;"><div class="trend-badge" style="width:100%; text-align:center;">🌍 ${t('headerTrend')}: <span id="s-trend"></span> (<span id="s-trend-days"></span> ${t('day')})</div></div>
            <div class="top-row mt-2" style="gap:6px;">
                <button class="btn btn-outline" style="flex:1; padding:5px 8px; font-size:0.75rem; border-color:#3498db; color:#2980b9; font-weight:bold; background:rgba(52,152,219,0.1);" onclick="UI.showWalkthroughModal()">📖 ${t('walkthroughBtn')}</button>
                <button class="btn btn-outline" id="header-autopilot-btn" style="flex:1; padding:5px 8px; font-size:0.75rem; border-color:#9b59b6; color:#8e44ad; font-weight:bold; background:rgba(155,89,182,0.1);" onclick="Engine.toggleAutoPilot()">🤖 ${t('autopilotBtn')}</button>
            </div>
        </header>

        <div class="game-scroll-area">
            <main id="main-content" style="padding-bottom: 20px;">
                <section id="tab-shop" class="tab-content hidden"><div id="shop-view"></div></section>
                <section id="tab-inv" class="tab-content hidden"><div id="inv-view"></div></section>
                <section id="tab-staff" class="tab-content hidden"><div id="staff-view"></div></section>
                <section id="tab-b2b" class="tab-content hidden"><div id="b2b-view"></div></section>
                <section id="tab-manage" class="tab-content hidden">
                    <div class="page-header">👔 ${t('manage')}</div>

                    <div class="manage-card" onclick="UI.showWalkthroughModal()" style="border-left: 4px solid #3498db; background: linear-gradient(135deg, rgba(52,152,219,0.1), rgba(41,128,185,0.05));">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #2980b9, #3498db);">📖</div>
                        <div class="mc-content"><div class="mc-title">${t('walkthroughTitle')}</div><div class="mc-desc">${App.state.lang==='tr'?'Adım Adım Level 1-10 Rehberi':'Step-by-Step Level 1-10 Guide'}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" id="mc-autopilot" onclick="Engine.toggleAutoPilot()" style="border-left: 4px solid #9b59b6; background: linear-gradient(135deg, rgba(155,89,182,0.1), rgba(142,68,173,0.05));">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #8e44ad, #9b59b6);">🤖</div>
                        <div class="mc-content"><div class="mc-title" id="mc-autopilot-title">${(typeof Engine !== 'undefined' && Engine.isAutoPilot) ? t('autopilotActive') : t('autopilotBtn')}</div><div class="mc-desc">${App.state.lang==='tr'?'Yapay zeka dükkanı otomatik yönetsin':'Let AI manage the store automatically'}</div></div>
                        <div class="mc-arrow" id="mc-autopilot-icon">${(typeof Engine !== 'undefined' && Engine.isAutoPilot) ? '⏹️' : '▶'}</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('penthouse')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #f1c40f, #d4ac0d);">👑</div>
                        <div class="mc-content"><div class="mc-title">${t('penthouseTitle')}</div><div class="mc-desc">${t('penthouseSub')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('espionage')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #2c3e50, #1a252f);">🕵️‍♂️</div>
                        <div class="mc-content"><div class="mc-title">${t('espionageTitle')}</div><div class="mc-desc">${t('espionageSub')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('finance')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #27ae60, #2ecc71);">🏦</div>
                        <div class="mc-content"><div class="mc-title">${t('finance')}</div><div class="mc-desc">${t('financeTitle')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('rd')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #2980b9, #3498db);">🧪</div>
                        <div class="mc-content"><div class="mc-title">${t('rd')}</div><div class="mc-desc">${t('rdTitle')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('upgrades')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #d35400, #e67e22);">🏢</div>
                        <div class="mc-content"><div class="mc-title">${t('upgrades')}</div><div class="mc-desc">${t('upgradesTitle')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('factory')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #8e44ad, #9b59b6);">🏭</div>
                        <div class="mc-content"><div class="mc-title">${t('factory')}</div><div class="mc-desc">${t('factorySub')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('calendar')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #16a085, #1abc9c);">📅</div>
                        <div class="mc-content"><div class="mc-title">${t('calendarTitle')}</div><div class="mc-desc">${t('noHistory')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('law')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #c0392b, #e74c3c);">🧑‍⚖️</div>
                        <div class="mc-content"><div class="mc-title">${t('lawTitle')}</div><div class="mc-desc">${t('lawSub')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('relations')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #8e44ad, #2c3e50);">🤝</div>
                        <div class="mc-content"><div class="mc-title">${t('relationsTitle')}</div><div class="mc-desc">${t('relationsSub')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="page-header mt-2">${t('settings')}</div>
                    <div class="manage-card" onclick="UI.openPanel('roadmap')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #f39c12, #e67e22);">🗺️</div>
                        <div class="mc-content"><div class="mc-title">${t('roadmapTitle')}</div><div class="mc-desc">${t('roadmapSub')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    <div class="manage-card" onclick="UI.openPanel('settings')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #34495e, #7f8c8d);">⚙️</div>
                        <div class="mc-content"><div class="mc-title">${t('settings')}</div><div class="mc-desc">${t('theme')}, ${t('lang')}, ${t('vol')}</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px; padding-bottom:30px;">
                        <button class="btn btn-green btn-massive" onclick="App.saveGame(true)">💾 ${t('saveGame')}</button>
                        <button class="btn btn-danger btn-massive" onclick="App.navigate('start')">🚪 ${t('mainMenu')}</button>
                    </div>
                </section>
            </main>
        </div>

        <nav class="bottom-nav">
            <button class="nav-btn" onclick="UI.switchTab('tab-shop')" id="btn-tab-shop"><span class="nav-icon">🛒</span><span class="nav-text">${t('shop')}</span></button>
            <button class="nav-btn" onclick="UI.switchTab('tab-inv')" id="btn-tab-inv"><span class="nav-icon">🏪</span><span class="nav-text">${t('inv')}</span></button>
            <button class="nav-btn" onclick="UI.switchTab('tab-staff')" id="btn-tab-staff"><span class="nav-icon">👥</span><span class="nav-text">${t('staff')}</span></button>
            <button class="nav-btn" onclick="UI.switchTab('tab-b2b')" id="btn-tab-b2b"><span class="nav-icon">🤝</span><span class="nav-text">${t('b2b')}</span></button>
            <button class="nav-btn" onclick="UI.switchTab('tab-manage')" id="btn-tab-manage"><span class="nav-icon">👔</span><span class="nav-text">${t('manage')}</span></button>
        </nav>

        <!-- Draggable Floating Panels Container -->
        <div class="floating-panel" id="panel-penthouse"><div class="panel-header"><span class="panel-title">👑 ${t('penthouseTitle')}</span><button class="btn-close" onclick="UI.closePanel('penthouse')">X</button></div><div class="panel-body" id="penthouse-view"></div></div>
        <div class="floating-panel" id="panel-espionage"><div class="panel-header"><span class="panel-title">🕵️ ${t('espionageTitle')}</span><button class="btn-close" onclick="UI.closePanel('espionage')">X</button></div><div class="panel-body" id="espionage-view"></div></div>
        <div class="floating-panel" id="panel-finance"><div class="panel-header"><span class="panel-title">🏦 ${t('finance')}</span><button class="btn-close" onclick="UI.closePanel('finance')">X</button></div><div class="panel-body" id="finance-view"></div></div>
        <div class="floating-panel" id="panel-rd"><div class="panel-header"><span class="panel-title">🧪 ${t('rd')}</span><button class="btn-close" onclick="UI.closePanel('rd')">X</button></div><div class="panel-body" id="rd-view"></div></div>
        <div class="floating-panel" id="panel-upgrades"><div class="panel-header"><span class="panel-title">🏢 ${t('upgrades')}</span><button class="btn-close" onclick="UI.closePanel('upgrades')">X</button></div><div class="panel-body" id="upgrades-view"></div></div>
        <div class="floating-panel" id="panel-factory"><div class="panel-header"><span class="panel-title">🏭 ${t('factory')}</span><button class="btn-close" onclick="UI.closePanel('factory')">X</button></div><div class="panel-body" id="factory-view"></div></div>
        <div class="floating-panel" id="panel-settings"><div class="panel-header"><span class="panel-title">⚙️ ${t('settings')}</span><button class="btn-close" onclick="UI.closePanel('settings')">X</button></div><div class="panel-body" id="settings-view"></div></div>
        <div class="floating-panel" id="panel-roadmap"><div class="panel-header"><span class="panel-title">🗺️ ${t('roadmapTitle')}</span><button class="btn-close" onclick="UI.closePanel('roadmap')">X</button></div><div class="panel-body" id="roadmap-view"></div></div>
        <div class="floating-panel" id="panel-calendar"><div class="panel-header"><span class="panel-title">📅 ${t('calendarTitle')}</span><button class="btn-close" onclick="UI.closePanel('calendar')">X</button></div><div class="panel-body" id="calendar-view"></div></div>
        <div class="floating-panel" id="panel-law"><div class="panel-header"><span class="panel-title">🧑‍⚖️ ${t('lawTitle')}</span><button class="btn-close" onclick="UI.closePanel('law')">X</button></div><div class="panel-body" id="law-view"></div></div>
        <div class="floating-panel" id="panel-relations"><div class="panel-header"><span class="panel-title">🤝 ${t('relationsTitle')}</span><button class="btn-close" onclick="UI.closePanel('relations')">X</button></div><div class="panel-body" id="relations-view"></div></div>
        <div class="floating-panel" id="panel-reviews"><div class="panel-header"><span class="panel-title">⭐ ${t('reviewsTitle')}</span><button class="btn-close" onclick="UI.closePanel('reviews')">X</button></div><div class="panel-body" id="reviews-view"></div></div>
        <div class="floating-panel" id="panel-cargo"><div class="panel-header"><span class="panel-title">🚚 ${t('cargoTitle')}</span><button class="btn-close" onclick="UI.closePanel('cargo')">X</button></div><div class="panel-body" id="cargo-view"></div></div>
        <div class="floating-panel" id="panel-market"><div class="panel-header"><span class="panel-title">📊 ${t('marketTitle')}</span><button class="btn-close" onclick="UI.closePanel('market')">X</button></div><div class="panel-body" id="market-view"></div></div>

        <div class="fab-container"><button onclick="Engine.endDay()" class="btn btn-primary btn-massive">${t('endDay')}</button></div>
    `,
    
    renderStartScreen: () => `
        <div class="start-screen">
            <div class="floating-bg">
                <span class="float-item" style="left:10%; animation-delay: 0s;">🛒</span>
                <span class="float-item" style="left:80%; animation-delay: 3s; font-size:4rem;">💵</span>
                <span class="float-item" style="left:30%; animation-delay: 7s;">📦</span>
                <span class="float-item" style="left:60%; animation-delay: 1s; font-size:3rem;">🏬</span>
                <span class="float-item" style="left:45%; animation-delay: 10s; font-size:5rem;">📈</span>
            </div>
            
            <div class="title-container">
                <h1 class="game-logo">MEGA<br><span class="logo-accent">MART</span></h1>
                <div class="logo-subtitle">TYCOON</div>
            </div>
            
            <div class="action-grid start-menu-actions">
                <button class="btn btn-massive btn-play" onclick="App.navigate('careers')"><span class="btn-icon">▶️</span> ${t('play')}</button>
                <button class="btn btn-massive" style="background:linear-gradient(135deg, #2980b9, #3498db); color:white; box-shadow: 0 6px 0px #1f618d, 0 15px 25px rgba(52,152,219,0.4);" onclick="UI.showWalkthroughModal()"><span class="btn-icon">📖</span> ${t('walkthroughBtn')}</button>
                <button class="btn btn-massive btn-settings" onclick="App.navigate('settings')"><span class="btn-icon">⚙️</span> ${t('settings')}</button>
            </div>
            <div class="version-text">v1.7.0 • Premium OS Edition</div>
        </div>
    `,
    
    renderCareers: () => {
        let slots = StateManager.getSlots();
        let html = `<div class="start-screen">
            <div class="floating-bg">
                <span class="float-item" style="left:10%; animation-delay: 0s;">🛒</span>
                <span class="float-item" style="left:80%; animation-delay: 3s; font-size:4rem;">💵</span>
                <span class="float-item" style="left:30%; animation-delay: 7s;">📦</span>
                <span class="float-item" style="left:60%; animation-delay: 1s; font-size:3rem;">🏬</span>
                <span class="float-item" style="left:45%; animation-delay: 10s; font-size:5rem;">📈</span>
            </div>
            <h2 class="page-title-glow" style="z-index:10;">🎮 ${t('loadCareer')}</h2>
            <div class="slots-container" style="z-index:10;">`;
        for(let i=1; i<=3; i++) {
            if(slots[i]) {
                html += `<div class="slot-card used-slot">
                    <div class="slot-header"><span class="slot-name">${t('slotUsed')} ${i}</span><span class="slot-rep">⭐ ${t('rep')}: ${slots[i].corporateRep||0}</span></div>
                    <div class="slot-details">
                        <div class="detail"><span class="icon">💵</span> ${App.formatMoney(slots[i].money)}</div>
                        <div class="detail"><span class="icon">🗓️</span> ${t('month')} ${slots[i].month} / ${t('day')} ${slots[i].day}</div>
                        <div class="detail"><span class="icon">🏢</span> ${t('level')}: ${slots[i].buildingLevel}</div>
                    </div>
                    <div class="slot-actions">
                        <button class="btn btn-green btn-flex" onclick="App.loadCareer(${i})">${t('playBtn')}</button>
                        <button class="btn btn-danger btn-flex-small" onclick="App.deleteCareer(${i})">🗑️</button>
                    </div>
                </div>`;
            } else {
                html += `<div class="slot-card empty-slot" onclick="App.newCareer(${i})">
                    <span class="empty-icon">+</span>
                    <span class="empty-text">${t('slotEmpty')} ${i} <span style="font-size:0.85rem; opacity:0.8; font-weight:600; text-transform:none; margin-left:10px;">(${t('newCareer')})</span></span>
                </div>`;
            }
        }
        html += `</div><button class="btn btn-danger mt-2" style="width:100%; max-width:400px; font-size:1.1rem; padding:15px; z-index:10;" onclick="App.navigate('start')">⬅ ${t('back')}</button></div>`;
        return html;
    },
    
    renderSettings: () => `
        <div class="start-screen">
            <h2 class="page-title-glow">⚙️ ${t('settings')}</h2>
            <div class="panel settings-panel">
                <div class="settings-row"><label>🔊 ${t('vol')}</label><input type="range" min="0" max="1" step="0.1" value="${App.state.volume}" oninput="App.setVolume(this.value)"></div>
                <div class="settings-row mt-2"><label>🎨 ${t('theme')}</label>
                    <select class="fancy-select" onchange="App.setTheme(this.value)">
                        <option value="theme-modern" ${App.state.theme === 'theme-modern' ? 'selected' : ''}>${t('themeModern')}</option>
                        <option value="theme-dark" ${App.state.theme === 'theme-dark' ? 'selected' : ''}>${t('themeDark')}</option>
                        <option value="theme-classic" ${App.state.theme === 'theme-classic' ? 'selected' : ''}>${t('themeClassic')}</option>
                        <option value="theme-medieval" ${App.state.theme === 'theme-medieval' ? 'selected' : ''}>${t('themeMedieval')}</option>
                    </select>
                </div>
                <div class="settings-row mt-2 mb-2"><label>🌍 ${t('lang')}</label>
                    <select class="fancy-select" onchange="App.setLang(this.value)">
                        <option value="tr" ${App.state.lang === 'tr' ? 'selected' : ''}>Türkçe</option>
                        <option value="en" ${App.state.lang === 'en' ? 'selected' : ''}>English</option>
                    </select>
                </div>
                <button class="btn btn-danger mt-2" style="width:100%; font-size:1.1rem; padding:15px;" onclick="App.navigate('start')">⬅ ${t('back')}</button>
            </div>
        </div>
    `,

    switchTab: (id) => {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
        let target = document.getElementById(id); if(target) target.classList.remove('hidden');
        let btn = document.getElementById('btn-' + id); if(btn) btn.classList.add('active');
        UI.currentTab = id;
        UI.update();
    },
    
    openPanel: (id) => {
        if(typeof AudioSys !== 'undefined') AudioSys.tap();
        let p = document.getElementById('panel-' + id);
        if(!p.classList.contains('open')) {
            p.classList.add('open');
            if(!p.dataset.placed) {
                p.dataset.placed = "true";
                let w = Math.min(window.innerWidth * 0.9, 650);
                p.style.width = w + "px";
                p.style.left = Math.max(10, (window.innerWidth - w) / 2) + 'px';
                p.style.top = '10vh';
            }
        }
        if(App.zIndexCounter) p.style.zIndex = ++App.zIndexCounter;
        UI.update();
    },
    closePanel: (id) => {
        if(typeof AudioSys !== 'undefined') AudioSys.tap();
        document.getElementById('panel-' + id).classList.remove('open');
    },

    update: () => {
        try {
            if(!App.state.g) return;
            let g = App.state.g; 
            if(!g.tutorialDone && document.getElementById('main-content')) {
                g.tutorialDone = true;
                App.saveGame(false);
                setTimeout(() => { if(typeof Tutorial !== 'undefined') { Tutorial.step = 0; Tutorial.show(); } }, 500);
            }
            Engine.checkQuests();
            
            document.getElementById('s-date').innerText = `${t('month')} ${g.month} / ${t('week')} ${g.week} / ${t('day')} ${g.day}`;
            document.getElementById('s-money').innerText = App.formatMoney(g.money);
            
            let mBoost = g.marketingBoost; if(g.skills && g.skills.marketingPro && g.skills.marketingPro.unlocked) mBoost *= 1.5;
            let currentPop = Math.min(200, Math.max(1, Engine.getBasePop() + (g.marketingDaysLeft > 0 ? mBoost : 0)));
            document.getElementById('s-pop').innerText = Math.floor(currentPop);
            
            let trCap = Engine.getTotalTransportCap();
            document.getElementById('s-truck').innerText = `${g.currentTransportUsed}/${trCap}`;
            document.getElementById('s-market-share').innerText = (g.marketShare || 5.0).toFixed(1);
            
            let morale = (g.bossMorale !== undefined) ? g.bossMorale : 80;
            let mEl = document.getElementById('s-morale');
            if (mEl) mEl.innerText = morale;
            let mIcon = document.getElementById('s-morale-icon');
            if (mIcon) mIcon.innerText = morale >= 80 ? '😎' : (morale >= 50 ? '🙂' : (morale >= 25 ? '😐' : '🤬'));
            let mBox = document.getElementById('s-morale-box');
            if (mBox) {
                mBox.style.background = morale >= 70 ? 'rgba(46,204,113,0.25)' : (morale >= 40 ? 'rgba(241,196,15,0.25)' : 'rgba(231,76,60,0.25)');
            }
            
            let actStore = g.storageCapacity; if(g.skills && g.skills.storageOpt && g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
            document.getElementById('s-storage').innerText = `${g.currentStorage}/${actStore}`;
            let pct = (g.currentStorage / actStore) * 100;
            let sf = document.getElementById('storage-fill'); sf.style.width = `${Math.min(100,pct)}%`; sf.style.background = pct>90?'var(--danger)':'var(--success)';
            
            let tBar = document.getElementById('trend-bar');
            if(g.trendDaysLeft > 0 && g.trendActive) { tBar.style.display = 'flex'; document.getElementById('s-trend').innerText = g.trendActive.name; document.getElementById('s-trend-days').innerText = g.trendDaysLeft; } 
            else tBar.style.display = 'none';

            let apBtn = document.getElementById('header-autopilot-btn');
            if (apBtn) {
                if (typeof Engine !== 'undefined' && Engine.isAutoPilot) {
                    apBtn.innerText = `🤖 ${t('autopilotActive')}`;
                    apBtn.classList.add('pulse-active');
                    apBtn.style.background = 'var(--danger)';
                    apBtn.style.color = '#fff';
                    apBtn.style.borderColor = 'var(--danger)';
                } else {
                    apBtn.innerText = `🤖 ${t('autopilotBtn')}`;
                    apBtn.classList.remove('pulse-active');
                    apBtn.style.background = 'rgba(155,89,182,0.1)';
                    apBtn.style.color = '#8e44ad';
                    apBtn.style.borderColor = '#9b59b6';
                }
            }
            let mcApTitle = document.getElementById('mc-autopilot-title');
            let mcApIcon = document.getElementById('mc-autopilot-icon');
            if (mcApTitle && typeof Engine !== 'undefined') {
                mcApTitle.innerText = Engine.isAutoPilot ? t('autopilotActive') : t('autopilotBtn');
            }
            if (mcApIcon && typeof Engine !== 'undefined') {
                mcApIcon.innerText = Engine.isAutoPilot ? '⏹️' : '▶';
            }

            if (UI.currentTab === 'tab-shop') UI.renderShopTab();
            if (UI.currentTab === 'tab-inv') UI.renderInvTab();
            if (UI.currentTab === 'tab-staff') UI.renderStaffTab();
            if (UI.currentTab === 'tab-b2b') UI.renderB2BTab();
            
            if (document.getElementById('panel-penthouse') && document.getElementById('panel-penthouse').classList.contains('open')) UI.renderPenthousePanel();
            if (document.getElementById('panel-espionage') && document.getElementById('panel-espionage').classList.contains('open')) UI.renderEspionagePanel();
            if (document.getElementById('panel-finance') && document.getElementById('panel-finance').classList.contains('open')) UI.renderFinancePanel();
            if (document.getElementById('panel-rd') && document.getElementById('panel-rd').classList.contains('open')) UI.renderRDPanel();
            if (document.getElementById('panel-upgrades') && document.getElementById('panel-upgrades').classList.contains('open')) UI.renderUpgradesPanel();
            if (document.getElementById('panel-factory') && document.getElementById('panel-factory').classList.contains('open')) UI.renderFactoryPanel();
            if (document.getElementById('panel-settings') && document.getElementById('panel-settings').classList.contains('open')) UI.renderSettingsPanel();
            if (document.getElementById('panel-roadmap') && document.getElementById('panel-roadmap').classList.contains('open')) UI.renderRoadmapPanel();
            if (document.getElementById('panel-calendar') && document.getElementById('panel-calendar').classList.contains('open')) UI.renderCalendarPanel();
            if (document.getElementById('panel-law') && document.getElementById('panel-law').classList.contains('open')) UI.renderLawPanel();
            if (document.getElementById('panel-relations') && document.getElementById('panel-relations').classList.contains('open')) UI.renderRelationsPanel();
            if (document.getElementById('panel-reviews') && document.getElementById('panel-reviews').classList.contains('open')) UI.renderReviewsPanel();
            if (document.getElementById('panel-cargo') && document.getElementById('panel-cargo').classList.contains('open')) UI.renderCargoPanel();
            if (document.getElementById('panel-market') && document.getElementById('panel-market').classList.contains('open')) UI.renderMarketPanel();
        } catch(e) { console.error("UI Update Hata:", e); }
    },

    renderShopTab: () => {
        let g = App.state.g; let h = `<div class="page-header">${t('shopTitle')}</div>`;

        // Kasa Rush Mini-Oyunu Banner
        h += `<div class="panel mb-2" style="background:linear-gradient(135deg, rgba(241,196,15,0.18), rgba(243,156,18,0.12)); border:1px solid rgba(243,156,18,0.4);">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div>
                    <div style="font-weight:900; font-size:1.05rem; color:#d35400;">${t('cashierRushTitle')}</div>
                    <div style="font-size:0.8rem; color:var(--text-dark); margin-top:2px;">${t('cashierRushSub')}</div>
                </div>
                <button class="btn btn-warning" onclick="Engine.startCashierRushMinigame()" style="font-weight:bold; white-space:nowrap; padding:8px 12px;">${t('cashierRushBtn')}</button>
            </div>
        </div>`;

        if (g.blackMarketActive && g.blackMarketItem) {
            let p = GameData.products[g.blackMarketItem]; let price = Math.floor(p.buy * 0.2); 
            let pName = tProduct(g.blackMarketItem);
            h += `<div class="panel" style="border:2px solid #e74c3c; background:#ffeaa7;"><h3 style="color:#c0392b;">${t('blackMarketTitle')}</h3><div style="font-size:0.8rem; color:#7f1d1d; margin-bottom:8px;">${t('blackMarketDesc')}</div><div class="item-row blackmarket"><div class="item-info"><span class="item-title">${pName}</span><span class="item-sub">${t('costUnit')}: ${App.formatMoney(price)}</span></div><div class="item-action"><button class="btn btn-danger" onclick="Engine.buyBlackMarket(10)">10 ${t('wholesaleBuy')}</button></div></div></div>`;
        }
        for (let k in GameData.products) {
            if (!g.unlocked[k]) continue;
            let p = GameData.products[k]; 
            let basePrice = Engine.getProductBuyPrice(k);
            let sellWholesale = Math.floor(basePrice * 0.5);
            let stock = g.inventory[k] || 0;
            let pName = tProduct(k);
            h += `<div class="item-row" style="flex-wrap: wrap; gap: 10px;">
                <div class="item-info" style="flex: 1; min-width: 140px;">
                    <span class="item-title">${pName} (${t('stockLabel')}: ${stock})</span>
                    <span class="item-sub">${t('costUnit')}: ${App.formatMoney(basePrice)} | ${t('refundUnit')}: ${App.formatMoney(sellWholesale)}</span>
                    <span class="item-sub">${t('spaceUnit')}: ${p.space} br</span>
                </div>
                <div class="item-action" style="flex-direction:row; flex-wrap:wrap; gap:5px; justify-content:flex-end;">
                    <button class="btn btn-danger" onclick="Engine.sellProductWholesale('${k}', 10)" ${stock < 10 ? 'disabled' : ''}>10 ${t('wholesaleSell')}</button>
                    <button class="btn" onclick="Engine.buyProduct('${k}', 1)">1 ${t('wholesaleBuy')}</button>
                    <button class="btn btn-purple" onclick="Engine.buyProduct('${k}', 10)">10 ${t('wholesaleBuy')}</button>
                </div>
            </div>`;
        }
        document.getElementById('shop-view').innerHTML = h;
    },
    
    renderInvTab: () => {
        let g = App.state.g; let h = `<div class="page-header">${t('invTitle')}</div>`;
        for (let k in GameData.products) {
            if(g.unlocked[k]) {
                let p = GameData.products[k];
                let baseSell = Engine.getProductBaseSellPrice(k);
                let currentPrice = baseSell;
                if (g.customPrice && g.customPrice[k] !== undefined) currentPrice = g.customPrice[k];
                else if (g.pricing && g.pricing[k]) {
                    if (g.pricing[k] === 'cheap') currentPrice = Math.floor(baseSell * 0.7);
                    else if (g.pricing[k] === 'expensive') currentPrice = Math.floor(baseSell * 1.5);
                }
                let pName = tProduct(k);

                h += `<div class="panel mb-2">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid rgba(0,0,0,0.05); padding-bottom:8px; margin-bottom:12px;">
                        <span style="font-weight:900; font-size:1.2rem; color:var(--primary-dark); text-shadow:0 1px 2px rgba(0,0,0,0.1);">${pName} ${t('aisleTitle')}</span>
                        <span style="background:var(--primary); color:white; padding:6px 12px; border-radius:12px; font-size:0.9rem; font-weight:bold; box-shadow:0 2px 5px rgba(0,0,0,0.2);">📦 ${t('stockLabel')}: ${g.inventory[k]}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.02); padding:10px; border-radius:12px; border: 1px solid rgba(0,0,0,0.05);">
                        <div style="display:flex; flex-direction:column; gap:4px;">
                            <span style="font-size:0.8rem; font-weight:800; color:var(--text-light);">${t('unitCost')}: <b style="color:var(--danger);">${App.formatMoney(Engine.getProductBuyPrice(k))}</b></span>
                            <span style="font-size:0.8rem; font-weight:800; color:var(--text-light);">${t('recPrice')}: <b>${App.formatMoney(baseSell)}</b></span>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px; background:white; padding:5px 8px; border-radius:12px; border:2px solid var(--primary); box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                            <button class="btn btn-danger" style="padding:4px 12px; font-size:1.4rem; font-weight:900; border-radius:8px; line-height:1;" onclick="Engine.adjustPrice('${k}', -1)">-</button>
                            <span style="font-weight:900; font-size:1.15rem; width:55px; text-align:center; color:var(--primary-dark);">${App.formatMoney(currentPrice)}</span>
                            <button class="btn btn-green" style="padding:4px 12px; font-size:1.4rem; font-weight:900; border-radius:8px; line-height:1;" onclick="Engine.adjustPrice('${k}', 1)">+</button>
                        </div>
                    </div>
                </div>`;
            }
        }
        h += `<div class="page-header mt-2">${t('newAisleTitle')}</div>`;
        for (let k in GameData.products) {
            if (!g.unlocked[k]) {
                let p = GameData.products[k];
                let pName = tProduct(k);
                let questReq = p.reqQuest && (!g.quests[p.reqQuest] || !g.quests[p.reqQuest].done);
                if (p.reqBuild > g.buildingLevel) {
                    h += `<div class="item-row" style="opacity:0.6;"><div class="item-info"><span class="item-title">🔒 ${pName} ${t('aisleTitle')}</span><span class="item-sub" style="color:var(--danger);">${t('reqBuilding').replace('{n}', p.reqBuild)}</span></div></div>`;
                } else if (questReq) {
                    h += `<div class="item-row" style="opacity:0.6;"><div class="item-info"><span class="item-title">🔒 ${pName} ${t('aisleTitle')}</span><span class="item-sub" style="color:var(--danger);">"${g.quests[p.reqQuest].title}" ${t('reqQuestDone')}</span></div></div>`;
                } else {
                    h += `<div class="item-row upgrade"><div class="item-info"><span class="item-title">🛒 ${pName} ${t('aisleTitle')}</span><span class="item-sub">${t('installCost')}: ${App.formatMoney(p.unlock)}</span></div><div class="item-action"><button class="btn btn-warning" onclick="Engine.unlockDept('${k}')">${t('buildAisleBtn')}</button></div></div>`;
                }
            }
        }
        document.getElementById('inv-view').innerHTML = h;
    },

    renderStaffTab: () => {
        let g = App.state.g;
        let total = Engine.getTotalStaffCount();
        let maxLimit = Engine.getMaxStaffLimit();
        let fillPct = Math.min(100, (total / maxLimit) * 100);

        let h = `<div class="page-header">${t('staffTitle')}</div>`;

        // Capacity Progress Card
        h += `<div class="panel mb-2">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span style="font-weight:900; font-size:1.1rem; color:var(--primary-dark);">👥 ${t('staffLimit')}</span>
                <span style="font-weight:bold; font-size:1rem; color:${total >= maxLimit ? 'var(--danger)' : 'var(--primary)'};">${total} / ${maxLimit}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${fillPct}%; background:${total >= maxLimit ? 'var(--danger)' : 'var(--primary)'};"></div></div>
            <div style="font-size:0.75rem; color:var(--text-light); margin-top:4px;">${t('level')} ${g.buildingLevel} (${t('staffLimitSub')})</div>
        </div>`;

        // SGK Insurance Toggle Card
        h += `<div class="panel mb-2" style="background:${g.staffInsurance ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.08)'}; border:1px solid ${g.staffInsurance ? 'rgba(46, 204, 113, 0.4)' : 'rgba(231, 76, 60, 0.3)'};">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div>
                    <div style="font-weight:900; font-size:1.05rem; color:${g.staffInsurance ? 'var(--success)' : 'var(--danger)'};">${t('staffInsuranceTitle')}</div>
                    <div style="font-size:0.8rem; color:var(--text-dark); margin-top:2px;">${t('staffInsuranceCost')} | <b>${g.staffInsurance ? t('staffInsuranceActive') : t('staffInsuranceInactive')}</b></div>
                    <div style="font-size:0.75rem; color:var(--text-light); margin-top:2px;">${g.staffInsurance ? t('staffInsuranceDescOn') : t('staffInsuranceDescOff')}</div>
                </div>
                <button class="btn ${g.staffInsurance ? 'btn-green' : 'btn-danger'}" onclick="Engine.toggleStaffInsurance()" style="font-weight:bold; white-space:nowrap; padding:8px 12px;">${g.staffInsurance ? t('staffInsuranceBtnOn') : t('staffInsuranceBtnOff')}</button>
            </div>
        </div>`;

        for (let k in GameData.staffTypes) { 
            let s = GameData.staffTypes[k]; 
            let count = (g.staff && g.staff[k]) ? g.staff[k] : 0;
            let hireCost = Engine.getStaffHireCost(k);
            let atLimit = total >= maxLimit;
            let sName = tStaff(k);

            h += `<div class="item-row">
                <div class="item-info">
                    <span class="item-title">${sName} (${count})</span>
                    <span class="item-sub" style="color:var(--text-dark);">${s.desc}</span>
                    <span class="item-sub" style="color:var(--danger); font-weight:bold;">${t('wageDaily').replace('{cost}', App.formatMoney(s.wage))}</span>
                    <span class="item-sub" style="color:var(--text-light); font-size:0.75rem;">${t('nextHireCost').replace('{cost}', App.formatMoney(hireCost))}</span>
                </div>
                <div class="item-action" style="flex-direction:row; align-items:center; gap:6px;">
                    ${count > 0 ? `<button class="btn btn-outline" style="border-color:var(--danger); color:var(--danger); padding:6px 10px;" onclick="Engine.fireStaff('${k}')">${t('fireStaffBtn')}</button>` : ''}
                    <button class="btn btn-primary" onclick="Engine.hireStaff('${k}')" ${atLimit ? 'disabled' : ''}>${t('hireStaffBtn')}<br>(${App.formatMoney(hireCost)})</button>
                </div>
            </div>`; 
        }
        document.getElementById('staff-view').innerHTML = h;
    },
    
    renderB2BTab: () => {
        let g = App.state.g; 
        let h = `<div class="page-header">${t('b2bTitle')}</div><div class="panel text-center">${t('corpRep')}: <strong class="purple" style="font-size:1.2rem;">${g.corporateRep || 0} REP</strong><br><small class="text-muted">${t('corpRepSub')}</small></div>`;
        h += `<div class="page-header mt-2">${t('incomingBids')}</div>`;
        if(!g.availableContracts || g.availableContracts.length === 0) h += `<div class="panel text-center">${t('noIncomingBids')}</div>`;
        else {
            g.availableContracts.forEach((c, idx) => {
                if(c.isBribe) {
                    h += `<div class="item-row" style="background:#fff3cd; border-color:#ffeeba;"><div class="item-info"><span class="item-title">${c.client}</span><span class="item-sub">${t('bribeContractDesc')}</span><span class="item-sub green">${t('rewardLabel')}: ${App.formatMoney(c.reward)}</span><span class="item-sub red">${t('bribeCostDesc')}</span></div><div class="item-action"><button class="btn btn-danger" onclick="Engine.acceptContract(${idx})">${t('acceptBidBtn')}</button></div></div>`;
                } else {
                    let pName = tProduct(c.item);
                    h += `<div class="item-row"><div class="item-info"><span class="item-title">${c.client}</span><span class="item-sub">${t('requestedLabel')}: <strong>${c.qty}x ${pName}</strong> (${c.days} ${t('day')})</span><span class="item-sub green">${t('rewardLabel')}: ${App.formatMoney(c.reward)}</span><span class="item-sub red">${t('penaltyLabel')}: -${App.formatMoney(c.penalty)}</span></div><div class="item-action"><button class="btn btn-purple" onclick="Engine.acceptContract(${idx})">${t('acceptBidBtn')}</button></div></div>`;
                }
            });
        }
        h += `<div class="page-header mt-2">${t('activeContracts')}</div>`;
        if(!g.contracts || g.contracts.length === 0) h += `<div class="panel text-center">${t('noActiveContracts')}</div>`;
        else {
            g.contracts.forEach((c, idx) => {
                let hasEnough = g.inventory[c.item] >= c.qty;
                let pName = tProduct(c.item);
                h += `<div class="item-row"><div class="item-info"><span class="item-title">${c.client} <span class="red">(${c.days} ${t('daysRemaining')})</span></span><span class="item-sub">${t('requestedLabel')}: <strong>${c.qty}x ${pName}</strong></span><span class="item-sub ${hasEnough?'green':'red'}">${t('stockLabel')}: ${g.inventory[c.item]||0} / ${c.qty}</span></div><div class="item-action"><button class="btn btn-green" onclick="Engine.fulfillContract(${idx})" ${hasEnough?'':'disabled'}>${t('deliverBidBtn')}</button></div></div>`;
            });
        }
        document.getElementById('b2b-view').innerHTML = h;
    },

    renderFinancePanel: () => {
        let g = App.state.g; let h = '';
        
        let loansHTML = '';
        if(!g.activeLoans) g.activeLoans = [];
        if (g.loan > 0) {
            g.activeLoans.push({ amount: g.loan, total: g.loan, dailyPayment: Math.floor(g.loan/10), daysLeft: 10, type: 'Eski Kredi' });
            g.loan = 0;
        }

        if (g.activeLoans.length > 0) {
            loansHTML += `<div style="font-size:0.9rem; font-weight:bold; color:var(--danger); margin-top:15px; margin-bottom:5px;">${t('activeLoansTitle')}:</div>`;
            g.activeLoans.forEach((l, idx) => {
                loansHTML += `<div class="item-row" style="background:rgba(231,76,60,0.05); border:1px solid rgba(231,76,60,0.2);">
                    <div class="item-info">
                        <span class="item-title">${l.type}</span>
                        <span class="item-sub" style="color:var(--text-dark);">${t('daysRemaining')}: ${l.daysLeft} ${t('day')} (${(App.state.lang==='en'?'Daily: ':'Günlük: ') + App.formatMoney(l.dailyPayment)})</span>
                        <span class="item-sub red" style="font-weight:bold;">${(App.state.lang==='en'?'Total Debt: ':'Toplam Borç: ') + App.formatMoney(l.total)}</span>
                    </div>
                    <div class="item-action"><button class="btn btn-danger" onclick="Engine.payOffLoan(${idx})">${t('payOffLoanBtn')}</button></div>
                </div>`;
            });
        }

        let l1Name = t('emergencyCashTitle');
        let l2Name = t('commGrowthLoanTitle');
        let l3Name = t('holdingLoanTitle');
        let lPrincStr = (got, pay) => t('loanPrincipal').replace('{got}', App.formatMoney(got)).replace('{pay}', App.formatMoney(pay));
        let lTermStr = (days, daily) => t('loanTerm').replace('{days}', days).replace('{daily}', App.formatMoney(daily));
        let loanBtn = t('loanTakeBtn');

        h += `<div class="panel mb-2">
            <div style="font-weight:900; font-size:1.2rem; margin-bottom:10px; color:var(--primary-dark); text-align:center;">${t('loansTitle')}</div>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <div class="item-row" style="padding:10px; border:1px solid #ddd; background: #fafafa;">
                    <div class="item-info">
                        <span class="item-title">${l1Name}</span>
                        <span class="item-sub">${lPrincStr(10000, 12000)}</span>
                        <span class="item-sub">${lTermStr(10, 1200)}</span>
                    </div>
                    <div class="item-action"><button class="btn btn-green" onclick="Engine.takeLoanPackage(10000, 12000, 10, '${l1Name}')">${loanBtn}</button></div>
                </div>
                <div class="item-row" style="padding:10px; border:1px solid #ddd; background: #fafafa;">
                    <div class="item-info">
                        <span class="item-title">${l2Name}</span>
                        <span class="item-sub">${lPrincStr(50000, 65000)}</span>
                        <span class="item-sub">${lTermStr(30, 2166)}</span>
                    </div>
                    <div class="item-action"><button class="btn btn-green" onclick="Engine.takeLoanPackage(50000, 65000, 30, '${l2Name}')">${loanBtn}</button></div>
                </div>
                <div class="item-row" style="padding:10px; border:1px solid #ddd; background: #fafafa;">
                    <div class="item-info">
                        <span class="item-title">${l3Name}</span>
                        <span class="item-sub">${lPrincStr(250000, 350000)}</span>
                        <span class="item-sub">${lTermStr(50, 7000)}</span>
                    </div>
                    <div class="item-action"><button class="btn btn-green" onclick="Engine.takeLoanPackage(250000, 350000, 50, '${l3Name}')">${loanBtn}</button></div>
                </div>
            </div>
            ${loansHTML}
        </div>`;

        h += `<div class="item-row mb-2"><div class="item-info"><span class="item-title">${t('depositTitle')}</span><span class="item-sub green">${t('depositBalance')}: ${App.formatMoney(g.deposits)} (${App.state.lang==='en'?'2%/Day':'%2/Gün'})</span></div><div class="item-action" style="flex-direction:row;"><button class="btn" onclick="Engine.depositMoney(10000)">+10K ${t('depositBtn')}</button><button class="btn btn-green" onclick="Engine.withdrawMoney(10000)">${t('withdrawBtn')}</button></div></div>`;
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">${t('stocksTitle')}</div>`;
        for (let s in g.stocks) { let stock = g.stocks[s]; let n = s==='doge'?'DogeCoin':(s==='gold'?t('goldStock'):s); h += `<div class="item-row stock"><div class="item-info"><span class="item-title">${n}</span><span class="item-sub">${t('stockPrice')}: ${App.formatMoney(stock.price)}</span><span class="item-sub green">${t('stockShares')}: ${stock.shares}</span></div><div class="item-action" style="flex-direction:row;"><button class="btn btn-green" onclick="Engine.buyStock('${s}')">${t('buyStockBtn')}</button><button class="btn btn-danger" onclick="Engine.sellStock('${s}')">${t('sellStockBtn')}</button></div></div>`; }
        document.getElementById('finance-view').innerHTML = h;
    },
    
    renderRDPanel: () => {
        let g = App.state.g;
        if (!g.currentLevel) Engine.updatePlayerLevel();
        let curLvl = g.currentLevel || 1;
        let lvlInfo = tLevel(curLvl);

        let h = `<div class="panel mb-2" style="background:linear-gradient(135deg, #2c3e50, #3498db); color:white; padding:15px; text-align:center;">
            <div style="font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">${t('statusTitle')}</div>
            <div style="font-size:1.5rem; font-weight:900; margin:4px 0;">⭐ ${t('levelText')} ${curLvl}: ${lvlInfo.name}</div>
            <div style="font-size:0.85rem; opacity:0.9; margin-bottom:10px;">${lvlInfo.desc}</div>
            <div style="display:inline-block; background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:20px; font-weight:bold; font-size:0.9rem;">
                🧪 ${t('currentRP')}: ${g.researchPoints} RP
            </div>
        </div>`;

        // Ar-Ge Becerileri (Skills)
        h += `<div class="page-header mt-2" style="font-size:1.1rem;">${t('skillsTitle')}</div>`;
        for(let k in g.skills) {
            let sInfo = tSkill(k);
            let sState = g.skills[k];
            h += `<div class="item-row skill" style="margin-bottom:6px;">
                <div class="item-info">
                    <span class="item-title">${sInfo.name}</span>
                    <span class="item-sub">${sInfo.desc}</span>
                </div>
                <div class="item-action">
                    ${sState.unlocked ? `<button class="btn btn-sm" disabled style="background:var(--success); color:white;">${t('unlockedTag')}</button>` : `<button class="btn btn-purple btn-sm" onclick="Engine.unlockSkill('${k}')">${t('rpCost').replace('{cost}', sState.cost)}</button>`}
                </div>
            </div>`;
        }

        // Seviye Bazlı Görevler (Level Quests)
        h += `<div class="page-header mt-3" style="font-size:1.1rem;">${t('levelQuestsTitle')}</div>`;

        if (typeof GameData !== 'undefined' && GameData.quests && GameData.levels) {
            for (let l = 1; l <= 10; l++) {
                let lData = tLevel(l);
                let levelQuestKeys = Object.keys(GameData.quests).filter(k => GameData.quests[k].level === l);
                if (levelQuestKeys.length === 0) continue;

                let isLevelDone = levelQuestKeys.every(k => g.quests[k] && g.quests[k].claimed);
                let isCurrentLevel = (l === curLvl);

                let headerBg = isLevelDone ? 'rgba(46, 204, 113, 0.15)' : (isCurrentLevel ? 'rgba(52, 152, 219, 0.15)' : 'rgba(0,0,0,0.03)');
                let borderCol = isLevelDone ? 'var(--success)' : (isCurrentLevel ? 'var(--primary)' : '#ddd');
                let statusBadge = isLevelDone ? `<span style="color:var(--success); font-weight:bold; font-size:0.8rem;">${t('completedBadge')}</span>` : (isCurrentLevel ? `<span style="color:var(--primary); font-weight:bold; font-size:0.8rem;">${t('activeBadge')}</span>` : `<span style="color:var(--text-muted); font-size:0.8rem;">${t('lockedBadge')}</span>`);

                h += `<div class="panel mb-2" style="border-left: 4px solid ${borderCol}; background:${headerBg}; padding:10px 12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span style="font-weight:900; font-size:1rem; color:var(--text-dark);">${t('levelText')} ${l}: ${lData.name}</span>
                        ${statusBadge}
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">${lData.desc}</div>`;

                levelQuestKeys.forEach(qKey => {
                    let qDef = GameData.quests[qKey];
                    let qInfo = tQuest(qKey);
                    let qState = g.quests[qKey] || { done: false, claimed: false };

                    let prereqsOk = true;
                    if (qDef.prereqQuests && qDef.prereqQuests.length > 0) {
                        prereqsOk = qDef.prereqQuests.every(pKey => g.quests[pKey] && (g.quests[pKey].claimed || g.quests[pKey].done));
                    }
                    let buildOk = !qDef.reqBuild || (g.buildingLevel >= qDef.reqBuild);

                    let rewardStr = [];
                    if (qDef.reward.money) rewardStr.push(`+$${qDef.reward.money.toLocaleString()}`);
                    if (qDef.reward.rp) rewardStr.push(`+${qDef.reward.rp} RP`);
                    if (qDef.reward.rep) rewardStr.push(`+${qDef.reward.rep} REP`);

                    let actionBtn = '';
                    if (qState.claimed) {
                        actionBtn = `<button class="btn btn-sm" disabled style="background:var(--success); color:white; opacity:0.9;">${t('rewardClaimed')}</button>`;
                    } else if (qState.done) {
                        actionBtn = `<button class="btn btn-green btn-sm" style="animation: pulse 1.5s infinite;" onclick="Engine.claimQuest('${qKey}')">${t('claimRewardBtn')}</button>`;
                    } else if (!prereqsOk || !buildOk) {
                        actionBtn = `<button class="btn btn-sm" disabled style="opacity:0.5; font-size:0.75rem;">${t('lockedBadge')}</button>`;
                    } else {
                        actionBtn = `<button class="btn btn-sm" disabled style="opacity:0.6; font-size:0.75rem;">${t('inProgress')}</button>`;
                    }

                    h += `<div class="item-row quest" style="background:white; margin-bottom:6px; padding:8px 10px; border-radius:10px; border:1px solid rgba(0,0,0,0.06);">
                        <div class="item-info">
                            <span class="item-title" style="font-size:0.95rem;">${qInfo.title}</span>
                            <span class="item-sub" style="font-size:0.8rem;">${qInfo.desc}</span>
                            <span class="item-sub" style="color:var(--primary); font-size:0.75rem; font-weight:bold;">${t('rewardLabel')}: ${rewardStr.join(', ')}</span>
                            ${(!buildOk && qDef.reqBuild) ? `<span class="item-sub red" style="font-size:0.75rem;">${t('reqBuildingAlert').replace('{n}', qDef.reqBuild)}</span>` : ''}
                        </div>
                        <div class="item-action">
                            ${actionBtn}
                        </div>
                    </div>`;
                });

                h += `</div>`;
            }
        }
        document.getElementById('rd-view').innerHTML = h;
    },

    renderLawPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.lawsuits) g.lawsuits = [];
        if(g.lawyerLevel === undefined) g.lawyerLevel = 0;
        
        let lawyerFees = [0, 200, 1000, 4000];
        let lawyerWinRates = [10, 40, 70, 95];
        let lawyers = [0, 1, 2, 3].map(idx => {
            let lInfo = tLawyer(idx);
            return { name: lInfo.name, fee: lawyerFees[idx], winRate: lawyerWinRates[idx], desc: lInfo.desc };
        });

        h += `<div class="panel text-center mb-2" style="background:var(--primary-dark); color:white;">
            <div style="font-size:1.4rem; font-weight:900;">${t('lawTitle')}</div>
            <div style="font-size:0.9rem; opacity:0.9;">${t('lawSub')}</div>
        </div>`;

        // Lawyer Raise / Bonus Card
        h += `<div class="panel mb-2" style="background:${g.lawyerRaise ? 'rgba(52, 152, 219, 0.12)' : 'rgba(0,0,0,0.03)'}; border:1px solid ${g.lawyerRaise ? 'rgba(52, 152, 219, 0.4)' : '#ddd'};">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div>
                    <div style="font-weight:900; font-size:1.05rem; color:var(--primary-dark);">${t('lawyerRaiseTitle')}</div>
                    <div style="font-size:0.8rem; color:var(--text-dark); margin-top:2px;">${t('lawyerRaiseCost')} | <b>${g.lawyerRaise ? t('lawyerRaiseStatusOn') : t('lawyerRaiseStatusOff')}</b></div>
                    <div style="font-size:0.75rem; color:var(--text-light); margin-top:2px;">${t('lawyerRaiseDesc')}</div>
                </div>
                <button class="btn ${g.lawyerRaise ? 'btn-primary' : 'btn-outline'}" onclick="Engine.toggleLawyerRaise()" style="font-weight:bold; white-space:nowrap; padding:8px 12px;">${g.lawyerRaise ? t('lawyerRaiseBtnOn') : t('lawyerRaiseBtnOff')}</button>
            </div>
        </div>`;
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">${t('lawyerHireTitle')}</div><div style="display:flex; flex-direction:column; gap:10px;">`;
        lawyers.forEach((l, idx) => {
            let isCurrent = g.lawyerLevel === idx;
            h += `<div class="item-row" style="border: ${isCurrent ? '2px solid var(--success)' : '1px solid #ddd'}; background: ${isCurrent ? 'rgba(46, 204, 113, 0.1)' : 'white'};">
                <div class="item-info">
                    <span class="item-title">${l.name} ${isCurrent ? '✅' : ''}</span>
                    <span class="item-sub">${l.desc}</span>
                    <span class="item-sub" style="color:var(--danger); font-weight:bold;">${l.fee > 0 ? (t('wageDaily').replace('{cost}', App.formatMoney(l.fee))) : 'Free'}</span>
                </div>
                <div class="item-action">
                    <button class="btn ${isCurrent ? 'btn-green' : 'btn-outline'}" onclick="Engine.hireLawyer(${idx})" ${isCurrent ? 'disabled' : ''}>${isCurrent ? t('lawyerCurrentBadge') : t('hireBtn')}</button>
                </div>
            </div>`;
        });
        h += `</div>`;

        h += `<div class="page-header mt-2" style="font-size:1.2rem; margin-top:20px;">${t('lawsuitsTitle')}</div>`;
        if (g.lawsuits.length === 0) {
            h += `<div class="panel text-center" style="color:var(--success); font-weight:bold;">${t('noLawsuitsMsg')}</div>`;
        } else {
            g.lawsuits.forEach((law, idx) => {
                let lawsuitName = tLawsuit(law.type);
                h += `<div class="item-row" style="background:rgba(231, 76, 60, 0.1); border:1px solid rgba(231, 76, 60, 0.3);">
                    <div class="item-info">
                        <span class="item-title" style="color:var(--danger);">${lawsuitName}</span>
                        <span class="item-sub">${t('claimAmount')}: <b>${App.formatMoney(law.cost)}</b></span>
                        <span class="item-sub">${t('daysUntilTrial')}: <b>${law.daysLeft} ${t('day')}</b></span>
                    </div>
                    <div class="item-action" style="flex-direction:row; align-items:center; gap:6px;">
                        <button class="btn btn-purple" style="padding:6px 10px; font-weight:bold;" onclick="Engine.rollLawsuitDice(${idx})">${t('trialDiceBtn')}</button>
                        <button class="btn btn-warning" onclick="Engine.settleLawsuit(${idx})">${t('settleLawsuitBtn').replace('{cost}', App.formatMoney(law.cost))}</button>
                    </div>
                </div>`;
            });
        }
        document.getElementById('law-view').innerHTML = h;
    },

    renderCalendarPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.history || g.history.length === 0) {
            h += `<div class="panel text-center mb-2" style="color:var(--text-light); font-weight:bold;">Henüz kayıtlı bir günlüğün yok.<br>İlk gününü bitirdiğinde buralar dolacak!</div>`;
        } else {
            g.history.forEach((dayData) => {
                h += `<div class="panel mb-2" style="padding:12px;">
                    <div style="font-weight:900; font-size:1.1rem; border-bottom:2px solid var(--border); padding-bottom:5px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--primary-dark);">${dayData.date}</span>
                        <span style="font-size:0.9rem; background:rgba(0,0,0,0.05); padding:2px 8px; border-radius:8px;">
                            <span class="green">+${App.formatMoney(dayData.revenue)}</span> | 
                            <span class="red">-${App.formatMoney(dayData.expenses)}</span>
                        </span>
                    </div>
                    <div style="font-size:0.85rem; line-height:1.6; color:var(--text-dark);">
                        ${dayData.logs.length > 0 ? dayData.logs.join('<br>') : '<i>Kayıtlı olay yok.</i>'}
                    </div>
                </div>`;
            });
        }
        document.getElementById('calendar-view').innerHTML = h;
    },

    renderRelationsPanel: () => {
        let g = App.state.g;
        if (!g.relations) g.relations = { wholesaler: 50, minister: 50, mafia: 10 };
        if (!g.foundations) g.foundations = { children: 0, green: 0, tech_edu: 0, animal: 0 };
        
        let h = `<div class="panel text-center mb-2" style="background:linear-gradient(135deg, #1e3799, #0c2461); color:white; padding:15px;">
            <div style="font-size:1.4rem; font-weight:900;">${t('relationsTitle')}</div>
            <div style="font-size:0.85rem; opacity:0.9;">${t('relationsSub')}</div>
        </div>`;

        // BÖLÜM 1: GÜÇ ODAKLARI VE ETKİLEŞİM / MİNİ OYUNLAR
        h += `<div class="page-header mt-2" style="font-size:1.15rem;">${t('powersHeader')}</div>`;

        let instKeys = ['wholesaler', 'minister', 'mafia'];
        instKeys.forEach(instId => {
            let inst = (typeof GameData !== 'undefined' && GameData.institutions) ? GameData.institutions[instId] : null;
            if (!inst) return;
            let instData = tInstitution(instId);
            let val = g.relations[instId] !== undefined ? g.relations[instId] : inst.defaultVal;
            let color = val >= 75 ? 'var(--success)' : (val < 30 ? 'var(--danger)' : '#f39c12');
            let status = val >= 75 ? t('statusExcellent') : (val < 30 ? t('statusHostile') : t('statusBalanced'));

            h += `<div class="panel mb-3" style="border:1px solid rgba(0,0,0,0.08); padding:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <span style="font-weight:900; font-size:1.05rem;">${inst.icon} ${instData.name}</span>
                    <span style="color:${color}; font-weight:bold; font-size:0.9rem;">${val}/100 (${status})</span>
                </div>
                <div class="progress-bar mb-2" style="height:8px; background:rgba(0,0,0,0.08); border-radius:4px;">
                    <div class="progress-fill" style="width:${val}%; background:${color}; border-radius:4px;"></div>
                </div>
                <div style="font-size:0.82rem; color:var(--text-dark); margin-bottom:10px; line-height:1.4;">${instData.desc}</div>`;

            if (inst.minigame) {
                h += `<div style="background:rgba(0,0,0,0.03); border:1px dashed #ccc; border-radius:8px; padding:10px; margin-top:8px;">
                    <div style="font-weight:bold; font-size:0.85rem; color:var(--primary-dark); margin-bottom:4px;">${instData.title || inst.minigame.title}</div>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">${instData.descMini || inst.minigame.desc}</div>`;

                if (inst.minigame.isDice) {
                    h += `<div style="text-align:center;">
                        <button class="btn btn-warning" onclick="Engine.playRelationMinigame('${instId}', 0)" style="width:100%; font-weight:bold;">
                            ${t('diceRollMafiaBtn')}
                        </button>
                    </div>`;
                } else if (inst.minigame.options) {
                    h += `<div style="display:flex; flex-direction:column; gap:6px;">`;
                    inst.minigame.options.forEach((opt, oIdx) => {
                        let optData = (instData.options && instData.options[oIdx]) ? instData.options[oIdx] : opt;
                        let costText = opt.cost ? ` (${t('costUnit')}: ${App.formatMoney(opt.cost)})` : '';
                        let chanceText = opt.cost ? t('chanceGuaranteed') : t('chancePct').replace('{n}', Math.round(opt.successRate * 100));
                        h += `<button class="btn btn-outline" onclick="Engine.playRelationMinigame('${instId}', ${oIdx})" style="text-align:left; font-size:0.8rem; padding:8px 10px; display:flex; justify-content:space-between; align-items:center;">
                            <span><b>${optData.name}</b>${costText}</span>
                            <span style="font-size:0.75rem; color:var(--primary); font-weight:bold;">${chanceText}</span>
                        </button>`;
                    });
                    h += `</div>`;
                }
                h += `</div>`;
            }

            h += `</div>`;
        });

        // BÖLÜM 2: VAKIFLAR VE HAYIRSEVERLİK
        h += `<div class="page-header mt-3" style="font-size:1.15rem;">${t('charityHeader')}</div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${t('charitySub')}</div>`;

        if (typeof GameData !== 'undefined' && GameData.foundations) {
            for (let fId in GameData.foundations) {
                let f = GameData.foundations[fId];
                let fData = tFoundation(fId);
                let curLvl = (g.foundations && g.foundations[fId] !== undefined) ? g.foundations[fId] : 0;
                let maxLvl = f.maxLevel || 10;
                let isMax = curLvl >= maxLvl;
                let cost = Math.floor(f.baseCost * Math.pow(1.5, curLvl));
                let pct = Math.floor((curLvl / maxLvl) * 100);

                let currentEffectStr = '';
                let isEn = App.state.lang === 'en';
                if (curLvl === 0) {
                    currentEffectStr = t('noDonationsYet');
                } else {
                    let parts = [];
                    if (f.effectPerLevel.pop) parts.push(`+${curLvl * f.effectPerLevel.pop} ${isEn ? 'Popularity' : 'Popülarite'}`);
                    if (f.effectPerLevel.demandPercent) parts.push(`+${curLvl * f.effectPerLevel.demandPercent}% ${isEn ? 'Demand' : 'Talep'}`);
                    if (f.effectPerLevel.taxDiscountPercent) parts.push(`${curLvl * f.effectPerLevel.taxDiscountPercent}% ${isEn ? 'Tax Discount' : 'Vergi İndirimi'}`);
                    if (f.effectPerLevel.dailyRP) parts.push(`+${curLvl * f.effectPerLevel.dailyRP} ${isEn ? 'Daily RP' : 'Günlük RP'}`);
                    if (f.effectPerLevel.corporateRep) parts.push(`+${curLvl * f.effectPerLevel.corporateRep} ${isEn ? 'Corporate REP' : 'Kurumsal REP'}`);
                    currentEffectStr = `${t('activeBonus')} ` + parts.join(', ');
                }

                h += `<div class="panel mb-2" style="border:1px solid rgba(0,0,0,0.08); padding:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span style="font-weight:900; font-size:1.05rem;">${f.icon} ${fData.name}</span>
                        <span style="font-weight:bold; font-size:0.85rem; color:var(--primary);">${t('levelText')} ${curLvl} / ${maxLvl}</span>
                    </div>
                    <div class="progress-bar mb-2" style="height:6px; background:rgba(0,0,0,0.06); border-radius:3px;">
                        <div class="progress-fill" style="width:${pct}%; background:var(--success); border-radius:3px;"></div>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:4px;">${fData.desc}</div>
                    <div style="font-size:0.8rem; color:var(--primary-dark); font-weight:bold; margin-bottom:4px;">💡 ${fData.effectDesc}</div>
                    <div style="font-size:0.78rem; color:var(--success-dark); font-style:italic; margin-bottom:10px;">${currentEffectStr}</div>
                    <div style="text-align:right;">
                        ${isMax ? `<button class="btn btn-sm" disabled style="background:var(--success); color:white;">${t('maxLevelBadge')}</button>` : `<button class="btn btn-green btn-sm" onclick="Engine.donateFoundation('${fId}')">${t('donateBtnAction').replace('{cost}', App.formatMoney(cost))}</button>`}
                    </div>
                </div>`;
            }
        }

        document.getElementById('relations-view').innerHTML = h;
    },

    renderReviewsPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.reviews || g.reviews.length === 0) {
            h += `<div class="panel text-center mb-2" style="color:var(--text-light); font-weight:bold;">${t('noReviewsMsg')}</div>`;
        } else {
            g.reviews.forEach((rev) => {
                let ratingCount = (rev.text.match(/⭐/g) || []).length;
                let color = ratingCount >= 4 ? 'var(--success)' : (ratingCount <= 2 ? 'var(--danger)' : '#f39c12');
                h += `<div class="panel mb-2" style="padding:12px; border-left:4px solid ${color};">
                    <div style="font-weight:900; font-size:0.85rem; color:var(--primary-dark); margin-bottom:5px;">📅 ${rev.date}</div>
                    <div style="font-size:0.95rem; line-height:1.4; color:var(--text-dark); font-style:italic;">"${rev.text}"</div>
                </div>`;
            });
        }
        document.getElementById('reviews-view').innerHTML = h;
    },

    renderCargoPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.incomingCargo || g.incomingCargo.length === 0) {
            h += `<div class="panel text-center mb-2" style="color:var(--text-light); font-weight:bold;">${t('noCargoMsg')}</div>`;
        } else {
            g.incomingCargo.forEach((c) => {
                let pName = tProduct(c.id);
                h += `<div class="item-row" style="background:rgba(52, 152, 219, 0.05); border:1px solid rgba(52, 152, 219, 0.3);">
                    <div class="item-info">
                        <span class="item-title">📦 ${pName} (x${c.qty})</span>
                        <span class="item-sub">${t('totalSpaceLabel')} <b>${c.space} br</b></span>
                    </div>
                    <div class="item-action" style="font-weight:900; color:var(--primary); font-size:1.1rem; text-align:center;">
                        ${t('cargoDaysLeft').replace('{days}', c.daysLeft)}
                    </div>
                </div>`;
            });
        }
        document.getElementById('cargo-view').innerHTML = h;
    },

    renderMarketPanel: () => {
        let g = App.state.g; let h = '';
        let myShare = g.marketShare || 5.0;
        let rivalShare = 100.0 - myShare;

        h += `<div class="panel text-center mb-2" style="background:var(--primary-dark); color:white;">
            <div style="font-size:1.4rem; font-weight:900;">${t('marketShareReportTitle')}</div>
            <div style="font-size:0.9rem; opacity:0.9;">${t('marketShareReportSub')}</div>
        </div>`;

        h += `<div class="panel mb-2">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-weight:900; font-size:1.1rem; color:var(--success);">${t('youLabel')} (%${myShare.toFixed(1)})</span>
                <span style="font-weight:900; font-size:1.1rem; color:var(--danger);">${t('rivalLabel')} (%${rivalShare.toFixed(1)})</span>
            </div>
            <div class="progress-bar mb-2" style="height:15px; border-radius:10px; background:var(--danger); display:flex;">
                <div class="progress-fill" style="width:${myShare}%; background:var(--success); border-radius:10px 0 0 10px;"></div>
            </div>
            <div style="font-size:0.85rem; color:var(--text-dark);">
                <ul>
                    <li>${t('marketTips')}</li>
                </ul>
            </div>
        </div>`;

        if (!g.rivalDefeated) {
            h += `<div class="item-row mt-2" style="background:#fff3cd; border:1px solid #ffeeba;">
                <div class="item-info">
                    <span class="item-title" style="color:#856404;">${t('hostileTakeoverTitle')}</span>
                    <span class="item-sub">${t('hostileTakeoverDesc')}</span>
                </div>
                <div class="item-action">
                    <button class="btn btn-warning" onclick="Engine.buyoutRival()">${t('hostileTakeoverBtn')}</button>
                </div>
            </div>`;
        } else {
            h += `<div class="panel text-center mt-2" style="color:var(--success); font-weight:900; font-size:1.1rem;">
                ${t('monopolyAchieved')}
            </div>`;
        }
        document.getElementById('market-view').innerHTML = h;
    },

    renderUpgradesPanel: () => {
        let g = App.state.g; let h = '';
        let nextLevel = g.buildingLevel + 1;
        if (GameData.buildings[nextLevel]) {
            let b = GameData.buildings[nextLevel];
            let bName = tBuilding(nextLevel).name;
            h += `<div class="item-row upgrade"><div class="item-info"><span class="item-title">${t('buildingUpgradeCard').replace('{name}', bName)}</span><span class="item-sub">${t('costUnit')}: ${App.formatMoney(b.cost)}</span></div><div class="item-action"><button class="btn btn-primary" onclick="Engine.upgradeBuilding()">${t('upgradeBtn')}</button></div></div>`;
        } else {
            h += `<div class="panel text-center mb-2" style="font-size:1.1rem; color:var(--success);"><strong>${t('maxBuildingBadge')}</strong></div>`;
        }
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">${t('storageUpgradesTitle')}</div>`;
        if (!g.upgrades) g.upgrades = {};
        for (let k in GameData.upgrades) {
            let u = GameData.upgrades[k];
            let uName = tUpgrade(k);
            let isBought = !!g.upgrades[k];
            h += `<div class="item-row"><div class="item-info"><span class="item-title">${uName}</span><span class="item-sub">${t('spaceUnit')}: +${u.cap} br</span></div><div class="item-action">${isBought ? `<button class="btn btn-green" disabled>${t('unlockedTag')} ✅</button>` : `<button class="btn btn-warning" onclick="Engine.buyStorage('${k}')">${t('buyBtn')} (${App.formatMoney(u.cost)})</button>`}</div></div>`;
        }

        h += `<div class="page-header mt-2" style="font-size:1.2rem;">${t('fleetLogisticsTitle')}</div>`;
        for (let k in g.fleet) {
            let f = g.fleet[k];
            let fName = tFleet(k).name;
            h += `<div class="item-row"><div class="item-info"><span class="item-title">${fName} (${f.count} ${t('stockLabel')})</span><span class="item-sub">${t('spaceUnit')}: +${f.capacity}</span></div><div class="item-action"><button class="btn btn-green" onclick="Engine.buyVehicle('${k}')">${t('buyBtn')} (${App.formatMoney(f.cost)})</button></div></div>`;
        }
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">${t('marketingTitle')}</div>`;
        if (g.marketingDaysLeft > 0) {
            h += `<div class="panel text-center"><strong>${t('marketingActive').replace('{days}', g.marketingDaysLeft)}</strong></div>`;
        } else {
            for (let k in GameData.marketing) {
                let mData = tMarketing(k);
                h += `<div class="item-row marketing"><div class="item-info"><span class="item-title">${mData.name}</span><span class="item-sub">${t('headerPop')}: +${GameData.marketing[k].pop}</span></div><div class="item-action"><button class="btn btn-primary" onclick="Engine.startCampaign('${k}')">${t('marketingStartBtn').replace('{cost}', App.formatMoney(GameData.marketing[k].cost))}</button></div></div>`;
            }
        }
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">${t('prestigeEmpireTitle')}</div><div class="panel text-center"><span>${t('currentPrestigeFP')} <strong style="font-size:1.2rem;">${g.franchisePoints}</strong></span><br><button class="btn btn-purple mt-2" onclick="Engine.doPrestige()">${t('doPrestigeBtn')}</button></div>`;
        document.getElementById('upgrades-view').innerHTML = h;
    },

    renderFactoryPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.factory) g.factory = { owned: false, level: 1, activeItem: null };
        if(!g.factory.owned) {
            h += `<div class="panel text-center" style="padding:20px;">
                    <h3 style="color:var(--warning);">${t('buyFactoryTitle')}</h3>
                    <p class="text-muted mb-2" style="font-size:1.1rem;">${t('buyFactoryDesc')}</p>
                    <button class="btn btn-massive btn-warning" onclick="Engine.buyFactory()">${t('buyFactoryBtn')}</button>
                  </div>`;
        } else {
            let upgCost = g.factory.level * 75000;
            let spaceLimit = g.factory.level * 100;
            h += `<div class="panel">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:2px solid #eee; padding-bottom:10px;">
                        <span style="font-weight:900; font-size:1.3rem; color:var(--primary-dark);">${t('factoryTierHeader').replace('{lvl}', g.factory.level)}</span>
                        <button class="btn btn-green" onclick="Engine.upgradeFactory()">${t('upgradeBtn')} (${App.formatMoney(upgCost)})</button>
                    </div>
                    <div class="settings-row">
                        <label style="font-size:1.1rem; font-weight:bold;">${t('assemblyLine')}</label>
                        <select class="fancy-select" onchange="Engine.setFactoryItem(this.value)">
                            <option value="">${t('factoryStopOpt')}</option>`;
            for(let k in GameData.products) {
                if(g.unlocked[k]) {
                    let p = GameData.products[k];
                    let pName = tProduct(k);
                    let qty = Math.max(1, Math.floor(spaceLimit / p.space));
                    let cost = Math.floor(p.buy * 0.3) * qty;
                    let rateDesc = t('factoryRateDesc').replace('{qty}', qty).replace('{cost}', App.formatMoney(cost));
                    h += `<option value="${k}" ${g.factory.activeItem===k?'selected':''}>${pName} (${rateDesc})</option>`;
                }
            }
            h += `      </select>
                    </div>
                    <small class="text-muted mt-2" style="display:block; font-size:0.9rem;">${t('factoryFootnoteText')}</small>
                  </div>`;
        }
        document.getElementById('factory-view').innerHTML = h;
    },

    renderSettingsPanel: () => {
        let h = `<div class="panel">`;
        h += `<div class="settings-row"><label style="font-weight:bold;">🔊 ${t('vol')}</label><input type="range" min="0" max="1" step="0.1" value="${App.state.volume}" onchange="App.setVolume(this.value)" style="width:50%;"></div>`;
        h += `<div class="settings-row mt-2"><label style="font-weight:bold;">🎨 ${t('theme')}</label>
            <select class="fancy-select" onchange="App.setTheme(this.value)" style="width:50%;">
                <option value="theme-modern" ${App.state.theme === 'theme-modern' ? 'selected' : ''}>${t('themeModern')}</option>
                <option value="theme-dark" ${App.state.theme === 'theme-dark' ? 'selected' : ''}>${t('themeDark')}</option>
                <option value="theme-classic" ${App.state.theme === 'theme-classic' ? 'selected' : ''}>${t('themeClassic')}</option>
                <option value="theme-medieval" ${App.state.theme === 'theme-medieval' ? 'selected' : ''}>${t('themeMedieval')}</option>
            </select></div>`;
        h += `<div class="settings-row mt-2 mb-2"><label style="font-weight:bold;">🌍 ${t('lang')}</label>
            <select class="fancy-select" onchange="App.setLang(this.value)" style="width:50%;">
                <option value="tr" ${App.state.lang === 'tr' ? 'selected' : ''}>Türkçe</option>
                <option value="en" ${App.state.lang === 'en' ? 'selected' : ''}>English</option>
            </select></div>`;
        h += `</div>`;
        document.getElementById('settings-view').innerHTML = h;
    },

    renderPenthousePanel: () => {
        let g = App.state.g;
        if (!g.penthouse) g.penthouse = {};
        const itemIds = [
            { id: 'espresso', icon: '☕', cost: 5000 },
            { id: 'chair', icon: '💆', cost: 12000 },
            { id: 'parrot', icon: '🦜', cost: 30000 },
            { id: 'dojo', icon: '🥋', cost: 75000 },
            { id: 'helipad', icon: '🚁', cost: 200000 },
            { id: 'vault', icon: '🔐', cost: 500000 }
        ];

        let h = `<div class="panel text-center mb-2" style="background:linear-gradient(135deg, #f39c12, #d35400); color:white; padding:15px;">
            <div style="font-size:1.4rem; font-weight:900;">${t('penthouseTitle')}</div>
            <div style="font-size:0.85rem; opacity:0.9;">${t('penthouseSub')}</div>
        </div>`;

        itemIds.forEach(it => {
            let pInfo = tPenthouseItem(it.id);
            let owned = !!g.penthouse[it.id];
            h += `<div class="panel mb-2" style="display:flex; justify-content:space-between; align-items:center; gap:10px; border:${owned ? '2px solid var(--success)' : '1px solid var(--border)'}; background:${owned ? 'rgba(46,204,113,0.08)' : 'var(--bg)'};">
                <div style="font-size:2.5rem; min-width:50px; text-align:center;">${it.icon}</div>
                <div style="flex:1;">
                    <div style="font-weight:900; font-size:1.05rem; color:var(--primary-dark);">${pInfo.name} ${owned ? '✅' : ''}</div>
                    <div style="font-size:0.8rem; color:var(--text-dark); margin-top:2px;">${pInfo.desc}</div>
                    <div style="font-size:0.85rem; font-weight:bold; color:var(--danger); margin-top:4px;">${owned ? `<span class="green">${t('penthouseActiveCollection')}</span>` : App.formatMoney(it.cost)}</div>
                </div>
                <div>
                    ${owned ? `<button class="btn btn-green btn-sm" disabled>${t('ownedBadge')}</button>` : `<button class="btn btn-warning btn-sm" onclick="Engine.buyPenthouseItem('${it.id}')">${t('buyBtn')}</button>`}
                </div>
            </div>`;
        });

        document.getElementById('penthouse-view').innerHTML = h;
    },

    renderEspionagePanel: () => {
        let g = App.state.g;
        let h = `<div class="panel text-center mb-2" style="background:linear-gradient(135deg, #2c3e50, #1a252f); color:white; padding:15px;">
            <div style="font-size:1.4rem; font-weight:900;">${t('espionageTitle')}</div>
            <div style="font-size:0.85rem; opacity:0.9;">${t('espionageSub')}</div>
        </div>`;

        if (g.espionageActive) {
            h += `<div class="panel mb-2" style="background:rgba(52,152,219,0.15); border:1px solid var(--primary); text-align:center; font-weight:bold;">
                ${t('espionageActiveSpy').replace('{days}', g.espionageActive.daysLeft)}
            </div>`;
        }

        const missionDefs = [
            { type: 'cost', icon: '📉', cost: 3000 },
            { type: 'sabotage', icon: '🐀', cost: 10000 },
            { type: 'headhunt', icon: '👔', cost: 35000 }
        ];

        missionDefs.forEach(m => {
            let mInfo = tEspionage(m.type);
            h += `<div class="panel mb-2" style="border:1px solid var(--border); padding:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <span style="font-weight:900; font-size:1.05rem;">${m.icon} ${mInfo.name}</span>
                    <span style="color:var(--danger); font-weight:bold; font-size:0.95rem;">${App.formatMoney(m.cost)}</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-dark); margin-bottom:10px;">${mInfo.desc}</div>
                <div style="text-align:right;">
                    <button class="btn btn-purple btn-sm" onclick="Engine.startEspionage('${m.type}')">${t('startEspionageBtn').replace('{cost}', App.formatMoney(m.cost))}</button>
                </div>
            </div>`;
        });

        document.getElementById('espionage-view').innerHTML = h;
    },

    renderRoadmapPanel: () => {
        let g = App.state.g; let h = `<div class="panel">`;
        h += `<p class="mb-2">${t('roadmapIntro').replace('{n}', `<span class="green" style="font-size:1.2rem; font-weight:900;">${t('level')} ${g.buildingLevel}</span>`)}</p>`;
        
        let start = Math.max(1, g.buildingLevel - 1);
        let end = Math.min(150, start + 8);
        for(let i = start; i <= end; i++) {
            let b = GameData.buildings[i];
            let bName = tBuilding(i).name;
            let isCurrent = (i === g.buildingLevel);
            let isUnlocked = (i <= g.buildingLevel);
            h += `<div class="item-row" style="${isCurrent?'border:2px solid var(--primary); background:rgba(67,97,238,0.1);':(isUnlocked?'opacity:0.6;':'')}">
                <div class="item-info">
                    <span class="item-title">${isUnlocked?'✅':'🔒'} ${t('level')} ${i}: ${bName}</span>
                    <span class="item-sub">${isCurrent ? t('currentBuildingBadge') : (isUnlocked ? t('clearedBadge') : t('popContribution').replace('{n}', b.popBoost))}</span>
                </div>
                <div class="item-action">
                    ${!isUnlocked ? `<span style="font-weight:bold; color:var(--danger); font-size:0.9rem;">${App.formatMoney(b.cost)}</span>` : ''}
                </div>
            </div>`;
        }
        if(end < 150) h += `<div class="text-center mt-2" style="font-style:italic; color:#777;">${t('andMoreRoadmap')}</div>`;
        h += `</div>`;
        document.getElementById('roadmap-view').innerHTML = h;
    },

    showEndDayModal: () => {
        let g = App.state.g;
        if (!g.lastDayReport) return;
        let rep = g.lastDayReport;
        let isProfit = rep.netProfit >= 0;

        let content = `
            <div style="background:var(--bg); border:1px solid var(--border); border-radius:15px; padding:12px; margin-bottom:12px;">
                <div style="display:flex; justify-content:space-around; align-items:center; font-weight:900;">
                    <div><span style="font-size:0.75rem; color:var(--text-light); display:block;">${t('reportRevenue')}</span><span class="green">+${App.formatMoney(rep.revenue)}</span></div>
                    <div style="font-size:1.2rem; color:var(--text-light);">|</div>
                    <div><span style="font-size:0.75rem; color:var(--text-light); display:block;">${t('reportExpenses')}</span><span class="red">-${App.formatMoney(rep.expenses)}</span></div>
                    <div style="font-size:1.2rem; color:var(--text-light);">|</div>
                    <div><span style="font-size:0.75rem; color:var(--text-light); display:block;">${isProfit ? t('reportNetProfit') : t('reportNetLoss')}</span><span class="${isProfit ? 'green' : 'red'}">${isProfit ? '+' : ''}${App.formatMoney(rep.netProfit)}</span></div>
                </div>
                <div class="mt-2" style="font-style:italic; font-size:0.85rem; color:var(--text-dark); border-top:1px dashed var(--border); padding-top:6px;">
                    "${rep.randomReview}"
                </div>
            </div>

            <!-- Tab Buttons -->
            <div class="endday-tabs">
                <button class="endday-tab active" id="tab-btn-kasa" onclick="UI.switchEndDayTab('kasa')">${t('tabKasa')} (${rep.tabKasa ? rep.tabKasa.length : 0})</button>
                <button class="endday-tab" id="tab-btn-haberler" onclick="UI.switchEndDayTab('haberler')">${t('tabPazar')} (${rep.tabHaberler ? rep.tabHaberler.length : 0})</button>
                <button class="endday-tab" id="tab-btn-hukuk" onclick="UI.switchEndDayTab('hukuk')">${t('tabHukuk')} (${rep.tabHukuk ? rep.tabHukuk.length : 0})</button>
                <button class="endday-tab" id="tab-btn-duyurular" onclick="UI.switchEndDayTab('duyurular')">${t('tabDuyurular')} (${rep.tabDuyurular ? rep.tabDuyurular.length : 0})</button>
            </div>

            <!-- Tab Contents -->
            <div class="endday-content active" id="tab-view-kasa">
                ${rep.tabKasa && rep.tabKasa.length > 0 ? rep.tabKasa.join('') : `<div style="color:var(--text-light); font-style:italic; padding:10px;">${t('emptyKasa')}</div>`}
            </div>
            <div class="endday-content" id="tab-view-haberler">
                ${rep.tabHaberler && rep.tabHaberler.length > 0 ? rep.tabHaberler.join('') : `<div style="color:var(--text-light); font-style:italic; padding:10px;">${t('emptyHaberler')}</div>`}
            </div>
            <div class="endday-content" id="tab-view-hukuk">
                ${rep.tabHukuk && rep.tabHukuk.length > 0 ? rep.tabHukuk.join('') : `<div style="color:var(--text-light); font-style:italic; padding:10px;">${t('emptyHukuk')}</div>`}
            </div>
            <div class="endday-content" id="tab-view-duyurular">
                ${rep.tabHukuk && rep.tabDuyurular && rep.tabDuyurular.length > 0 ? rep.tabDuyurular.join('') : `<div style="color:var(--text-light); font-style:italic; padding:10px;">${t('emptyDuyurular')}</div>`}
            </div>

            <div class="mt-2 text-center" style="color:var(--success); font-weight:900; font-size:0.85rem;">
                ${t('progressSaved')}
            </div>
        `;

        App.showModal(t('endDayReportTitle'), content, `<button class="btn btn-primary" onclick="App.closeModal()">${t('endDayConfirmBtn')}</button>`);

        if (typeof Engine !== 'undefined' && Engine.isAutoPilot) {
            setTimeout(() => {
                if (typeof Engine !== 'undefined' && Engine.isAutoPilot) {
                    App.closeModal();
                }
            }, 2200);
        }
    },

    switchEndDayTab: (tabKey) => {
        if (typeof AudioSys !== 'undefined') AudioSys.tap();
        document.querySelectorAll('.endday-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.endday-content').forEach(c => c.classList.remove('active'));

        let btn = document.getElementById('tab-btn-' + tabKey);
        let view = document.getElementById('tab-view-' + tabKey);
        if (btn) btn.classList.add('active');
        if (view) view.classList.add('active');
    },

    showWalkthroughModal: () => {
        if (typeof AudioSys !== 'undefined') AudioSys.tap();
        let isTr = App.state.lang === 'tr';

        let html = `
            <div class="wt-tabs">
                <button class="wt-tab active" id="wt-btn-l1-3" onclick="UI.switchWalkthroughTab('l1-3')">Lv 1-3: ${isTr ? 'Başlangıç' : 'Basics'}</button>
                <button class="wt-tab" id="wt-btn-l4-6" onclick="UI.switchWalkthroughTab('l4-6')">Lv 4-6: ${isTr ? 'Borsa & Süper' : 'Stocks & Super'}</button>
                <button class="wt-tab" id="wt-btn-l7-8" onclick="UI.switchWalkthroughTab('l7-8')">Lv 7-8: ${isTr ? 'Fabrika & AVM' : 'Factory & Mall'}</button>
                <button class="wt-tab" id="wt-btn-l9-10" onclick="UI.switchWalkthroughTab('l9-10')">Lv 9-10: 🏆 ${isTr ? 'BÜYÜK FİNAL' : 'GRAND FINALE'}</button>
                <button class="wt-tab" id="wt-btn-tips" onclick="UI.switchWalkthroughTab('tips')">⚡ ${isTr ? 'Altın Taktikler' : 'Pro Tips'}</button>
            </div>

            <!-- TAB 1: Level 1-3 -->
            <div class="wt-content active" id="wt-view-l1-3">
                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🏪 Level 1: ${isTr ? 'Mahalle Bakkalı' : 'Corner Grocery'}</span>
                        <span class="wt-badge" style="background:#2ecc71; color:white;">Lv 1</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> 15 ${isTr ? 'Elma sat' : 'Apples sold'} ➔ ${isTr ? 'Ekmek reyonu kur ve 10 Ekmek sat' : 'Build Bread aisle & sell 10 Bread'} ➔ ${isTr ? '$2.500 nakit ve 3 gün tamamla' : 'Reach $2,500 cash & complete 3 days'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Dükkandan elma ve ekmek alıp rafları doldur. Günleri ilerletip müşterilere sat. Günlük mağaza kirasını ($25) unutma!' : 'Stock apples and bread. Advance days to sell to customers while covering daily store rent ($25).' }
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🛒 Level 2: ${isTr ? 'Mini Market & Personel' : 'Mini Mart & Staff'}</span>
                        <span class="wt-badge" style="background:#3498db; color:white;">Lv 2</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> 1 ${isTr ? 'Kasiyer işe al' : 'Hire Cashier'} ➔ ${isTr ? 'Süt reyonu kur ve 15 Süt sat' : 'Build Milk aisle & sell 15 Milk'} ➔ ${isTr ? 'Depo I yükseltmesi al' : 'Upgrade Storage I'} ➔ ${isTr ? 'SGK Sigortasını aç ve 6 gün işlet' : 'Enable Staff Insurance & survive 6 days'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Kasiyer olmadan müşteriler hırsızlık yapar. Personel sekmesinden SGK Sigortası butonunu açık tut, çalışanların istifasını ve tazminat cezalarını engelle.' : 'Without a Cashier, customers steal and walk out. Turn Staff Insurance ON in Staff tab to prevent resignations and penalties.'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🚚 Level 3: ${isTr ? 'Market & Filo / İtibar' : 'Market & Cargo / Reputation'}</span>
                        <span class="wt-badge" style="background:#9b59b6; color:white;">Lv 3</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> 1 ${isTr ? 'Kamyon satın al' : 'Buy Truck'} ➔ ${isTr ? 'Tişört reyonu kur ve 20 Tişört sat' : 'Build T-Shirt aisle & sell 20 T-Shirts'} ➔ ${isTr ? 'Vakıf bağışlarıyla İtibarını 5 yap' : 'Reach Corporate Rep 5 with NGO donations'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Kamyon sayesinde taşıma kapasiten artar, ürünlerin toptancıda kalmaz. Vakıf bağışları itibarını ve patron moralini yükseltir.' : 'Truck raises logistics cap to ensure shipments arrive safely. Foundation donations build valuable reputation.'}
                    </div>
                </div>
            </div>

            <!-- TAB 2: Level 4-6 -->
            <div class="wt-content" id="wt-view-l4-6">
                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🏬 Level 4: ${isTr ? 'Büyük Market & Altın Borsası' : 'Large Mart & Gold Stocks'}</span>
                        <span class="wt-badge" style="background:#f39c12; color:white;">Lv 4</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> ${isTr ? 'Ayakkabı reyonu kur ve 15 Ayakkabı sat' : 'Build Shoes aisle & sell 15 Shoes'} ➔ ${isTr ? '10 lot Altın al' : 'Buy 10 lots of Gold'} ➔ 1 ${isTr ? 'Güvenlik Görevlisi tut' : 'Hire Guard'} ➔ ${isTr ? 'Kozmetik aç ve $15.000 nakit biriktir' : 'Build Cosmetics & save $15,000 cash'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Finans sekmesinden Altın alarak paranı güvenceye al. Güvenlik personeli mağaza asayişini sağlar.' : 'Buy Gold in Finance tab to preserve wealth. Guards safeguard your store against theft.'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>📱 Level 5: ${isTr ? 'Teknoloji & B2B İhaleleri' : 'Tech & B2B Contracts'}</span>
                        <span class="wt-badge" style="background:#e67e22; color:white;">Lv 5</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> ${isTr ? 'Telefon reyonu aç ve 10 Telefon sat' : 'Build Smartphone aisle & sell 10 Phones'} ➔ 2 ${isTr ? 'B2B ihalesini teslim et' : 'Fulfill 2 B2B contracts'} ➔ ${isTr ? '$50.000 nakit ve %15 Pazar Payı' : 'Reach $50,000 cash & 15% Market Share'} ➔ ${isTr ? 'Oyuncak reyonunu aç' : 'Build Toys aisle'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'B2B sözleşmeleri tek seferde toplu nakit kazandırır! Telefonları yüksek kar marjıyla sat.' : 'Fulfill B2B wholesale deals for huge instant cash injections!'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🏢 Level 6: ${isTr ? 'Süpermarket & Eczane' : 'Supermarket & Pharmacy'}</span>
                        <span class="wt-badge" style="background:#e74c3c; color:white;">Lv 6</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> ${isTr ? 'Binayı Süpermarkete yükselt ($75.000)' : 'Upgrade Building to Supermarket ($75,000)'} ➔ ${isTr ? 'İlaç reyonu kur ve 20 İlaç sat' : 'Build Pharmacy & sell 20 Medicines'} ➔ 1 ${isTr ? 'Vakfı Seviye 3 yap' : 'Upgrade 1 Foundation to Lv 3'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Yükseltmeler sekmesinden binanı seviye 2 yap. Personel kapasiten 40 kişiye fırlar ve müşteri akını başlar.' : 'Building upgrade boosts staff cap to 40 and substantially increases daily foot traffic.'}
                    </div>
                </div>
            </div>

            <!-- TAB 3: Level 7-8 -->
            <div class="wt-content" id="wt-view-l7-8">
                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🏭 Level 7: ${isTr ? 'Hipermarket & Fabrika / Avukat' : 'Hypermarket & Factory / Lawyer'}</span>
                        <span class="wt-badge" style="background:#8e44ad; color:white;">Lv 7</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> ${isTr ? 'Fabrikayı satın al ($50.000)' : 'Purchase Factory ($50,000)'} ➔ ${isTr ? '2. Seviye Şirket Avukatı tut' : 'Hire Level 2 Corporate Lawyer'} ➔ 50 ${isTr ? 'İtibara ulaş' : 'Corporate Reputation'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Fabrika kendi mallarını üretir, toptancı maliyetlerini sıfırlar! Avukat ise davaları zarlarla kazanıp karşı taraftan tazminat toplar.' : 'Factory produces goods for free. Level 2 lawyer wins lawsuits with dice advantage.'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>🏎️ Level 8: ${isTr ? 'Mega AVM & Lüks Ürünler' : 'Mega Mall & Luxury Goods'}</span>
                        <span class="wt-badge" style="background:#16a085; color:white;">Lv 8</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> ${isTr ? 'Mega AVM seviyesine geç ($400.000)' : 'Upgrade to Mega Mall ($400,000)'} ➔ ${isTr ? 'Spor Araba reyonu kur ve 1 Araba sat' : 'Build Sports Car aisle & sell 1 Car'} ➔ ${isTr ? 'Mobilya reyonunu aç' : 'Build Furniture aisle'} ➔ ${isTr ? 'Yeşil Doğa Vakfını Lv 5 yap' : 'Green NGO to Lv 5'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Spor araba satışı başına binlerce dolar net kar bırakır. Günlük net karın $50.000 üzerine çıkabilir!' : 'Sports cars deliver insane profit margins. Your daily profit can easily exceed $50,000!'}
                    </div>
                </div>
            </div>

            <!-- TAB 4: Level 9-10 Grand Finale -->
            <div class="wt-content" id="wt-view-l9-10">
                <div class="wt-step-card">
                    <div class="wt-step-title">
                        <span>✈️ Level 9: ${isTr ? 'Holding Plaza & Pazar Hakimiyeti' : 'Holding Plaza & Market Hegemony'}</span>
                        <span class="wt-badge" style="background:#2c3e50; color:white;">Lv 9</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'Hedefler' : 'Goals'}:</b> 1 ${isTr ? 'Kargo Uçağı satın al ($150.000)' : 'Buy Cargo Plane ($150,000)'} ➔ %80 ${isTr ? 'Pazar Payına ulaş' : 'Market Share'} ➔ $500.000 ${isTr ? 'nakit topla' : 'cash'} ➔ ${isTr ? 'Holding Plaza seviyesine geç ($1.000.000)' : 'Upgrade to Plaza ($1,000,000)'}.<br>
                        <b>💡 ${isTr ? 'Taktik' : 'Tip'}:</b> ${isTr ? 'Kargo uçağı taşıma sınırlarını kaldırır. Rakip HyperMart pazar payını eritmek için AR-GE ve ajanlık operasyonlarını aralıksız sürdür.' : 'Cargo plane removes shipping bottlenecks. Run R&D and espionage sabotage to crush HyperMart share.'}
                    </div>
                </div>

                <div class="wt-step-card" style="border: 2px solid #f1c40f; background: linear-gradient(135deg, rgba(241,196,15,0.1), rgba(243,156,18,0.15));">
                    <div class="wt-step-title">
                        <span style="color:#d35400;">👑 Level 10: ${isTr ? 'PERAKENDE İMPARATORU (OYUNU BİTİRME)' : 'RETAIL EMPEROR (BEATING THE GAME)'}</span>
                        <span class="wt-badge" style="background:#f1c40f; color:#2c3e50;">FINALE</span>
                    </div>
                    <div class="wt-step-body">
                        <b>🎯 ${isTr ? 'BÜYÜK HEDEFLER' : 'FINAL GOALS'}:</b><br>
                        1. 👑 <b>${isTr ? 'HyperMart Devralması' : 'HyperMart Buyout'}:</b> ${isTr ? 'Penthouse sekmesine girip ezeli rakip HyperMart\'ı 1.000.000$ ve %99 pazar payı ile satın al!' : 'Go to Penthouse panel and buy out rival HyperMart for $1M cash + 99% market share!'}<br>
                        2. 🤝 <b>${isTr ? 'Vakıf Zirvesi' : 'Foundation Summit'}:</b> ${isTr ? 'Tüm vakıfların toplam seviyesini 20 yap.' : 'Reach 20 total foundation levels.'}<br>
                        3. 💰 <b>${isTr ? 'Büyük Servet' : 'Ultimate Wealth'}:</b> 50 ${isTr ? 'lot Altın ve $2.000.000 nakit biriktir.' : 'lots of Gold and $2,000,000 cash.'}<br>
                        <b>🏆 ${isTr ? 'SONUÇ' : 'VICTORY'}:</b> ${isTr ? 'HyperMart iflas eder, bayrağı indirir ve tüm perakende sektörünün tek lideri olursun!' : 'HyperMart goes bankrupt and surrenders, crowning you the undisputed Retail Emperor!'}
                    </div>
                </div>
            </div>

            <!-- TAB 5: Pro Tips & Tricks -->
            <div class="wt-content" id="wt-view-tips">
                <div class="wt-step-card">
                    <div class="wt-step-title"><span style="color:#27ae60;">⚡ ${isTr ? 'Kasa Rush Mini-Oyunu (Patron Memnuniyeti)' : 'Cashier Rush (Customer & Morale)'}</span></div>
                    <div class="wt-step-body">
                        ${isTr ? 'Patron moralini ve müşteri memnuniyetini yükseltmek için Dükkan sekmesindeki "Kasa Rush" butonuna tıkla. 10 saniyede hızlıca barkod okutarak moralini anında tavan yaptırabilirsin!' : 'Whenever customer queues or boss morale needs a lift, tap "Cashier Rush" in Shop tab. Quick scanning provides a huge boost to executive morale!'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title"><span style="color:#e74c3c;">🛡️ ${isTr ? 'SGK Çalışan Sigortası Hayatidir' : 'Staff Insurance is Critical'}</span></div>
                    <div class="wt-step-body">
                        ${isTr ? 'Personel sekmesindeki Sigorta (SGK) butonunu daima AÇIK tut. Kapatırsan çalışanlar topluca istifa eder, tazminat davaları açılır ve binlerce dolar ceza ödersin.' : 'Keep Staff Insurance ON in Staff tab at all times. Disabling it triggers mass strikes and crippling legal fines.'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title"><span style="color:#8e44ad;">🤖 ${isTr ? 'Yapay Zeka Oto-Pilot Bot Modu' : 'AI Auto-Pilot Bot Mode'}</span></div>
                    <div class="wt-step-body">
                        ${isTr ? 'Ekranın üstündeki "🤖 Oto-Pilot" butonuna tıkla! Sen arkana yaslanırken yapay zeka senin yerine dükkanı yönetir: akıllıca stok alır, görev ödüllerini toplar, filoyu ve binayı büyütür, günleri ilerletir!' : 'Click "🤖 Auto-Pilot" on top of the screen! Sit back while AI smartly buys stock, claims quest rewards, upgrades fleet and buildings, and loops days!'}
                    </div>
                </div>

                <div class="wt-step-card">
                    <div class="wt-step-title"><span style="color:#f39c12;">😎 ${isTr ? 'Patron Morali & Penthouse' : 'Boss Morale & Penthouse'}</span></div>
                    <div class="wt-step-body">
                        ${isTr ? 'Patron moralini %50 altına düşürme. Penthouse\'dan tatillere çıkıp partiler vererek morali yüksek tut; yüksek moral satışlarını ve gelirini %30 artırır.' : 'Keep Boss Morale above 50%. Go on vacations or throw parties in Penthouse for a +30% revenue boost.'}
                    </div>
                </div>
            </div>
        `;

        App.showModal(`📖 ${isTr ? 'Oyunu Bitirme Kılavuzu (Level 1-10)' : 'Game Completion Guide (Level 1-10)'}`, html, `<button class="btn btn-primary" onclick="App.closeModal()">${t('done')}</button>`);
    },

    switchWalkthroughTab: (tabKey) => {
        if (typeof AudioSys !== 'undefined') AudioSys.tap();
        document.querySelectorAll('.wt-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.wt-content').forEach(c => c.classList.remove('active'));

        let btn = document.getElementById('wt-btn-' + tabKey);
        let view = document.getElementById('wt-view-' + tabKey);
        if (btn) btn.classList.add('active');
        if (view) view.classList.add('active');
    }
};

UI.dragData = { active: null, startX: 0, startY: 0, initialX: 0, initialY: 0 };
document.addEventListener('mousedown', (e) => {
    let header = e.target.closest('.panel-header');
    if(header && !e.target.closest('.btn-close')) {
        let panel = header.closest('.floating-panel');
        UI.dragData.active = panel;
        UI.dragData.startX = e.clientX;
        UI.dragData.startY = e.clientY;
        let rect = panel.getBoundingClientRect();
        UI.dragData.initialX = rect.left;
        UI.dragData.initialY = rect.top;
        if(typeof App !== 'undefined' && App.zIndexCounter) panel.style.zIndex = ++App.zIndexCounter;
    }
});
document.addEventListener('mousemove', (e) => {
    if(UI.dragData.active) {
        let dx = e.clientX - UI.dragData.startX;
        let dy = e.clientY - UI.dragData.startY;
        UI.dragData.active.style.left = (UI.dragData.initialX + dx) + 'px';
        UI.dragData.active.style.top = (UI.dragData.initialY + dy) + 'px';
        e.preventDefault();
    }
});
document.addEventListener('mouseup', () => { UI.dragData.active = null; });

document.addEventListener('touchstart', (e) => {
    let header = e.target.closest('.panel-header');
    if(header && !e.target.closest('.btn-close')) {
        let panel = header.closest('.floating-panel');
        UI.dragData.active = panel;
        UI.dragData.startX = e.touches[0].clientX;
        UI.dragData.startY = e.touches[0].clientY;
        let rect = panel.getBoundingClientRect();
        UI.dragData.initialX = rect.left;
        UI.dragData.initialY = rect.top;
        if(typeof App !== 'undefined' && App.zIndexCounter) panel.style.zIndex = ++App.zIndexCounter;
    }
}, {passive: false});
document.addEventListener('touchmove', (e) => {
    if(UI.dragData.active) {
        let dx = e.touches[0].clientX - UI.dragData.startX;
        let dy = e.touches[0].clientY - UI.dragData.startY;
        UI.dragData.active.style.left = (UI.dragData.initialX + dx) + 'px';
        UI.dragData.active.style.top = (UI.dragData.initialY + dy) + 'px';
        e.preventDefault();
    }
}, {passive: false});
document.addEventListener('touchend', () => { UI.dragData.active = null; });

const Tutorial = {
    step: 0,
    show: () => {
        let steps = tTutorial();
        let s = steps[Tutorial.step] || steps[0];
        let html = `<div style="font-size:1.1rem; line-height:1.5; color:var(--text-dark); text-align:left; padding:10px 0;">${s.text}</div><hr style="border:0; border-top:1px solid #ccc; margin:15px 0;">`;
        html += `<div class="action-grid mt-2" style="grid-template-columns: 1fr 1fr;">`;
        if(Tutorial.step > 0) html += `<button class="btn" style="background:#555; color:white;" onclick="Tutorial.step--; Tutorial.show();">${t('tutorialBack')}</button>`;
        else html += `<div></div>`;
        
        if(Tutorial.step < steps.length - 1) {
            html += `<button class="btn btn-primary" onclick="Tutorial.step++; Tutorial.show();">${t('tutorialNext')}</button>`;
        } else {
            html += `<button class="btn btn-green" onclick="Tutorial.finish();">${t('tutorialStart')}</button>`;
        }
        html += `</div>`;
        App.showModal(s.title, html);
    },
    finish: () => {
        if(App.state.g) App.state.g.tutorialDone = true;
        App.closeModal();
        App.saveGame(false);
    }
};
