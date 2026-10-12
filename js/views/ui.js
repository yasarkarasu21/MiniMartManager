const UI = {
    currentTab: 'tab-shop',
    
    renderGameLayout: () => `
        <header style="position: relative; padding-top: 10px; padding-bottom: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); z-index: 100;">
            <div class="top-row">
                <div class="header-stat"><span class="stat-icon">🗓️</span><span class="stat-text" id="s-date"></span></div>
                <div class="header-stat money"><span class="stat-icon">💵</span><span class="stat-text" id="s-money"></span></div>
            </div>
            <div class="top-row mt-2">
                <div class="header-stat" style="cursor:pointer;" onclick="UI.openPanel('reviews')"><span class="stat-icon">⭐</span><span class="stat-text">%<span id="s-pop"></span> Pop.</span></div>
                <div class="header-stat" style="background:rgba(231,76,60,0.3); cursor:pointer;" onclick="UI.openPanel('cargo')"><span class="stat-icon">🚚</span><span class="stat-text">Kargo: <span id="s-truck"></span></span></div>
                <div class="header-stat" style="background:rgba(52,152,219,0.3); cursor:pointer;" onclick="UI.openPanel('market')"><span class="stat-icon">📊</span><span class="stat-text">Pazar: %<span id="s-market-share"></span></span></div>
                <div class="header-stat" id="s-morale-box" style="background:rgba(155,89,182,0.2); cursor:pointer;" onclick="App.showNotify('Patron Morali: %' + (App.state.g.bossMorale || 80) + ' - Satışları ve personel verimini etkiler.')"><span class="stat-icon" id="s-morale-icon">😎</span><span class="stat-text">%<span id="s-morale">80</span></span></div>
            </div>
            <div class="storage-container mt-2">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:800; margin-bottom:5px;"><span>📦 Depo Doluluğu</span><span id="s-storage"></span></div>
                <div class="progress-bar"><div class="progress-fill" id="storage-fill" style="width: 0%;"></div></div>
            </div>
            <div class="top-row mt-2" id="trend-bar" style="display:none; width:100%;"><div class="trend-badge" style="width:100%; text-align:center;">🌍 Trend: <span id="s-trend"></span> (<span id="s-trend-days"></span> Gün) - <small style="opacity:0.8">Fiyatları Etkiler</small></div></div>
        </header>

        <div class="game-scroll-area">
            <main id="main-content" style="padding-bottom: 20px;">
                <section id="tab-shop" class="tab-content hidden"><div id="shop-view"></div></section>
                <section id="tab-inv" class="tab-content hidden"><div id="inv-view"></div></section>
                <section id="tab-staff" class="tab-content hidden"><div id="staff-view"></div></section>
                <section id="tab-b2b" class="tab-content hidden"><div id="b2b-view"></div></section>
                <section id="tab-manage" class="tab-content hidden">
                    <div class="page-header">👔 ${t('manage')}</div>
                    
                    <div class="manage-card" onclick="UI.openPanel('finance')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #27ae60, #2ecc71);">🏦</div>
                        <div class="mc-content"><div class="mc-title">${t('finance')}</div><div class="mc-desc">Krediler, Borsa ve Nakit Yönetimi</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('rd')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #2980b9, #3498db);">🧪</div>
                        <div class="mc-content"><div class="mc-title">${t('rd')}</div><div class="mc-desc">Yeni Yetenekler ve Özel Görevler</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('upgrades')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #d35400, #e67e22);">🏢</div>
                        <div class="mc-content"><div class="mc-title">${t('upgrades')}</div><div class="mc-desc">Bina Seviyeleri, Araç Filosu, Prestij</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    
                    <div class="manage-card" onclick="UI.openPanel('factory')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #8e44ad, #9b59b6);">🏭</div>
                        <div class="mc-content"><div class="mc-title">${t('factory')}</div><div class="mc-desc">Kendi Markanı Üret, Toptancıyı Es Geç</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('calendar')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #16a085, #1abc9c);">📅</div>
                        <div class="mc-content"><div class="mc-title">Şirket Günlüğü</div><div class="mc-desc">Geçmiş satışlar, kredi taksitleri ve günlük olaylar</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('law')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #c0392b, #e74c3c);">🧑‍⚖️</div>
                        <div class="mc-content"><div class="mc-title">Hukuk Departmanı</div><div class="mc-desc">Davalar, tazminatlar ve avukat yönetimi</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="manage-card" onclick="UI.openPanel('relations')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #8e44ad, #2c3e50);">🤝</div>
                        <div class="mc-content"><div class="mc-title">İlişki Yönetimi</div><div class="mc-desc">Toptancı, Bakanlık ve Mafya İlişkileri</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>

                    <div class="page-header mt-2">Sistem Seçenekleri</div>
                    <div class="manage-card" onclick="UI.openPanel('roadmap')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #f39c12, #e67e22);">🗺️</div>
                        <div class="mc-content"><div class="mc-title">Yol Haritası</div><div class="mc-desc">Oyunun ilerleyen 150 seviyesinde seni neler bekliyor?</div></div>
                        <div class="mc-arrow">▶</div>
                    </div>
                    <div class="manage-card" onclick="UI.openPanel('settings')">
                        <div class="mc-icon" style="background:linear-gradient(135deg, #34495e, #7f8c8d);">⚙️</div>
                        <div class="mc-content"><div class="mc-title">${t('settings')}</div><div class="mc-desc">Ses, Tema ve Dil Ayarları</div></div>
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
        <div class="floating-panel" id="panel-finance"><div class="panel-header"><span class="panel-title">🏦 ${t('finance')}</span><button class="btn-close" onclick="UI.closePanel('finance')">X</button></div><div class="panel-body" id="finance-view"></div></div>
        <div class="floating-panel" id="panel-rd"><div class="panel-header"><span class="panel-title">🧪 ${t('rd')}</span><button class="btn-close" onclick="UI.closePanel('rd')">X</button></div><div class="panel-body" id="rd-view"></div></div>
        <div class="floating-panel" id="panel-upgrades"><div class="panel-header"><span class="panel-title">🏢 ${t('upgrades')}</span><button class="btn-close" onclick="UI.closePanel('upgrades')">X</button></div><div class="panel-body" id="upgrades-view"></div></div>
        <div class="floating-panel" id="panel-factory"><div class="panel-header"><span class="panel-title">🏭 ${t('factory')}</span><button class="btn-close" onclick="UI.closePanel('factory')">X</button></div><div class="panel-body" id="factory-view"></div></div>
        <div class="floating-panel" id="panel-settings"><div class="panel-header"><span class="panel-title">⚙️ ${t('settings')}</span><button class="btn-close" onclick="UI.closePanel('settings')">X</button></div><div class="panel-body" id="settings-view"></div></div>
        <div class="floating-panel" id="panel-roadmap"><div class="panel-header"><span class="panel-title">🗺️ Yol Haritası</span><button class="btn-close" onclick="UI.closePanel('roadmap')">X</button></div><div class="panel-body" id="roadmap-view"></div></div>
        <div class="floating-panel" id="panel-calendar"><div class="panel-header"><span class="panel-title">📅 Şirket Günlüğü</span><button class="btn-close" onclick="UI.closePanel('calendar')">X</button></div><div class="panel-body" id="calendar-view"></div></div>
        <div class="floating-panel" id="panel-law"><div class="panel-header"><span class="panel-title">🧑‍⚖️ Hukuk Departmanı</span><button class="btn-close" onclick="UI.closePanel('law')">X</button></div><div class="panel-body" id="law-view"></div></div>
        <div class="floating-panel" id="panel-relations"><div class="panel-header"><span class="panel-title">🤝 İlişki Yönetimi</span><button class="btn-close" onclick="UI.closePanel('relations')">X</button></div><div class="panel-body" id="relations-view"></div></div>
        <div class="floating-panel" id="panel-reviews"><div class="panel-header"><span class="panel-title">⭐ Müşteri Yorumları</span><button class="btn-close" onclick="UI.closePanel('reviews')">X</button></div><div class="panel-body" id="reviews-view"></div></div>
        <div class="floating-panel" id="panel-cargo"><div class="panel-header"><span class="panel-title">🚚 Gelen Kargolar</span><button class="btn-close" onclick="UI.closePanel('cargo')">X</button></div><div class="panel-body" id="cargo-view"></div></div>
        <div class="floating-panel" id="panel-market"><div class="panel-header"><span class="panel-title">📊 Pazar Payı & Rakipler</span><button class="btn-close" onclick="UI.closePanel('market')">X</button></div><div class="panel-body" id="market-view"></div></div>

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
            
            document.getElementById('s-date').innerText = `Ay ${g.month} / Hft ${g.week} / Gn ${g.day}`;
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

            if (UI.currentTab === 'tab-shop') UI.renderShopTab();
            if (UI.currentTab === 'tab-inv') UI.renderInvTab();
            if (UI.currentTab === 'tab-staff') UI.renderStaffTab();
            if (UI.currentTab === 'tab-b2b') UI.renderB2BTab();
            
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
        let g = App.state.g; let h = `<div class="page-header">${t('shop')}</div>`;
        if (g.blackMarketActive && g.blackMarketItem) {
            let p = GameData.products[g.blackMarketItem]; let price = Math.floor(p.buy * 0.2); 
            h += `<div class="panel" style="border:2px solid #e74c3c; background:#ffeaa7;"><h3 style="color:#c0392b;">🕵️ Karaborsa</h3><div class="item-row blackmarket"><div class="item-info"><span class="item-title">${p.name}</span><span class="item-sub">Fiyat: ${App.formatMoney(price)}</span></div><div class="item-action"><button class="btn btn-danger" onclick="Engine.buyBlackMarket(10)">10 Al</button></div></div></div>`;
        }
        for (let k in GameData.products) {
            if (!g.unlocked[k]) continue;
            let p = GameData.products[k]; 
            let basePrice = Engine.getProductBuyPrice(k);
            let sellWholesale = Math.floor(basePrice * 0.5);
            let stock = g.inventory[k] || 0;
            h += `<div class="item-row" style="flex-wrap: wrap; gap: 10px;">
                <div class="item-info" style="flex: 1; min-width: 140px;">
                    <span class="item-title">${p.name} (Stok: ${stock})</span>
                    <span class="item-sub">Alış: ${App.formatMoney(basePrice)} | İade: ${App.formatMoney(sellWholesale)}</span>
                    <span class="item-sub">Hacim: ${p.space} br</span>
                </div>
                <div class="item-action" style="flex-direction:row; flex-wrap:wrap; gap:5px; justify-content:flex-end;">
                    <button class="btn btn-danger" onclick="Engine.sellProductWholesale('${k}', 10)" ${stock < 10 ? 'disabled' : ''}>10 Sat</button>
                    <button class="btn" onclick="Engine.buyProduct('${k}', 1)">1 Al</button>
                    <button class="btn btn-purple" onclick="Engine.buyProduct('${k}', 10)">10 Al</button>
                </div>
            </div>`;
        }
        document.getElementById('shop-view').innerHTML = h;
    },
    
        renderInvTab: () => {
        let g = App.state.g; let h = `<div class="page-header">🏪 ${t('inv')}</div>`;
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

                h += `<div class="panel mb-2">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid rgba(0,0,0,0.05); padding-bottom:8px; margin-bottom:12px;">
                        <span style="font-weight:900; font-size:1.2rem; color:var(--primary-dark); text-shadow:0 1px 2px rgba(0,0,0,0.1);">${p.name} Reyonu</span>
                        <span style="background:var(--primary); color:white; padding:6px 12px; border-radius:12px; font-size:0.9rem; font-weight:bold; box-shadow:0 2px 5px rgba(0,0,0,0.2);">📦 Stok: ${g.inventory[k]}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.02); padding:10px; border-radius:12px; border: 1px solid rgba(0,0,0,0.05);">
                        <div style="display:flex; flex-direction:column; gap:4px;">
                            <span style="font-size:0.8rem; font-weight:800; color:var(--text-light);">Birim Maliyet: <b style="color:var(--danger);">${App.formatMoney(Engine.getProductBuyPrice(k))}</b></span>
                            <span style="font-size:0.8rem; font-weight:800; color:var(--text-light);">Önerilen: <b>${App.formatMoney(baseSell)}</b></span>
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
        h += '<div class="page-header mt-2">🔨 Yeni Reyon Kur</div>';
        for (let k in GameData.products) {
            if (!g.unlocked[k]) {
                let p = GameData.products[k];
                let questReq = p.reqQuest && (!g.quests[p.reqQuest] || !g.quests[p.reqQuest].done);
                if (p.reqBuild > g.buildingLevel) {
                    h += `<div class="item-row" style="opacity:0.6;"><div class="item-info"><span class="item-title">🔒 ${p.name} Reyonu</span><span class="item-sub" style="color:var(--danger);">Seviye ${p.reqBuild} Bina Gerekli</span></div></div>`;
                } else if (questReq) {
                    h += `<div class="item-row" style="opacity:0.6;"><div class="item-info"><span class="item-title">🔒 ${p.name} Reyonu</span><span class="item-sub" style="color:var(--danger);">"${g.quests[p.reqQuest].title}" Görevi Tamamlanmalı</span></div></div>`;
                } else {
                    h += `<div class="item-row upgrade"><div class="item-info"><span class="item-title">🛒 ${p.name} Reyonu</span><span class="item-sub">Kurulum Maliyeti: ${App.formatMoney(p.unlock)}</span></div><div class="item-action"><button class="btn btn-warning" onclick="Engine.unlockDept('${k}')">Kur</button></div></div>`;
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

        let h = `<div class="page-header">${t('staff')}</div>`;

        // Capacity Progress Card
        h += `<div class="panel mb-2">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span style="font-weight:900; font-size:1.1rem; color:var(--primary-dark);">👥 Personel Kadrosu</span>
                <span style="font-weight:bold; font-size:1rem; color:${total >= maxLimit ? 'var(--danger)' : 'var(--primary)'};">${total} / ${maxLimit} Kişi</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${fillPct}%; background:${total >= maxLimit ? 'var(--danger)' : 'var(--primary)'};"></div></div>
            <div style="font-size:0.75rem; color:var(--text-light); margin-top:4px;">Bina Seviyesi: Sv. ${g.buildingLevel} (Daha büyük binalar daha fazla personel alır)</div>
        </div>`;

        // SGK Insurance Toggle Card
        h += `<div class="panel mb-2" style="background:${g.staffInsurance ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.08)'}; border:1px solid ${g.staffInsurance ? 'rgba(46, 204, 113, 0.4)' : 'rgba(231, 76, 60, 0.3)'};">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div>
                    <div style="font-weight:900; font-size:1.05rem; color:${g.staffInsurance ? 'var(--success)' : 'var(--danger)'};">🛡️ Personel Sigortası (SGK)</div>
                    <div style="font-size:0.8rem; color:var(--text-dark); margin-top:2px;">Maliyet: <b>$15/personel/gün</b> | Durum: <b>${g.staffInsurance ? 'Aktif (Korumalı)' : 'Kapalı (İstifa Riski)'}</b></div>
                    <div style="font-size:0.75rem; color:var(--text-light); margin-top:2px;">${g.staffInsurance ? '✅ Personeller güvencede, istifalar ve davalar önlenir.' : '⚠️ Sigortasız çalışanlar istifa edebilir ve patron morali düşer!'}</div>
                </div>
                <button class="btn ${g.staffInsurance ? 'btn-green' : 'btn-danger'}" onclick="Engine.toggleStaffInsurance()" style="font-weight:bold; white-space:nowrap; padding:8px 12px;">${g.staffInsurance ? 'Sigortalı ✅' : 'Sigorta Aç'}</button>
            </div>
        </div>`;

        for (let k in GameData.staffTypes) { 
            let s = GameData.staffTypes[k]; 
            let count = (g.staff && g.staff[k]) ? g.staff[k] : 0;
            let hireCost = Engine.getStaffHireCost(k);
            let atLimit = total >= maxLimit;

            h += `<div class="item-row">
                <div class="item-info">
                    <span class="item-title">${s.name} (${count})</span>
                    <span class="item-sub" style="color:var(--text-dark);">${s.desc}</span>
                    <span class="item-sub" style="color:var(--danger); font-weight:bold;">Maaş: ${App.formatMoney(s.wage)}/Gün</span>
                    <span class="item-sub" style="color:var(--text-light); font-size:0.75rem;">Sonraki Alım: ${App.formatMoney(hireCost)} (Kademeli Artış)</span>
                </div>
                <div class="item-action" style="flex-direction:row; align-items:center; gap:6px;">
                    ${count > 0 ? `<button class="btn btn-outline" style="border-color:var(--danger); color:var(--danger); padding:6px 10px;" onclick="Engine.fireStaff('${k}')">Çıkar</button>` : ''}
                    <button class="btn btn-primary" onclick="Engine.hireStaff('${k}')" ${atLimit ? 'disabled' : ''}>İşe Al<br>(${App.formatMoney(hireCost)})</button>
                </div>
            </div>`; 
        }
        document.getElementById('staff-view').innerHTML = h;
    },
    
    renderB2BTab: () => {
        let g = App.state.g; 
        let h = `<div class="page-header">${t('b2b')}</div><div class="panel text-center">Kurumsal İtibar: <strong class="purple" style="font-size:1.2rem;">${g.corporateRep || 0} REP</strong><br><small class="text-muted">İhaleleri zamanında teslim ederek itibar kazanın.</small></div>`;
        h += `<div class="page-header mt-2">Gelen Teklifler</div>`;
        if(!g.availableContracts || g.availableContracts.length === 0) h += `<div class="panel text-center">Şu an açık bir ihale yok.</div>`;
        else {
            g.availableContracts.forEach((c, idx) => {
                if(c.isBribe) {
                    h += `<div class="item-row" style="background:#fff3cd; border-color:#ffeeba;"><div class="item-info"><span class="item-title">${c.client}</span><span class="item-sub">Gizli bir ödeme karşılığı iyilik isteniyor.</span><span class="item-sub green">Ödeme: ${App.formatMoney(c.reward)}</span><span class="item-sub red">Bedeli: İtibar Kaybı</span></div><div class="item-action"><button class="btn btn-danger" onclick="Engine.acceptContract(${idx})">Kabul Et</button></div></div>`;
                } else {
                    h += `<div class="item-row"><div class="item-info"><span class="item-title">${c.client}</span><span class="item-sub">İstenen: <strong>${c.qty}x ${GameData.products[c.item].name}</strong> (${c.days} Gün)</span><span class="item-sub green">Ödül: ${App.formatMoney(c.reward)}</span><span class="item-sub red">Ceza: -${App.formatMoney(c.penalty)}</span></div><div class="item-action"><button class="btn btn-purple" onclick="Engine.acceptContract(${idx})">Kabul Et</button></div></div>`;
                }
            });
        }
        h += `<div class="page-header mt-2">Aktif Sözleşmeler</div>`;
        if(!g.contracts || g.contracts.length === 0) h += `<div class="panel text-center">Aktif sözleşmen bulunmuyor.</div>`;
        else {
            g.contracts.forEach((c, idx) => {
                let hasEnough = g.inventory[c.item] >= c.qty;
                h += `<div class="item-row"><div class="item-info"><span class="item-title">${c.client} <span class="red">(${c.days} Gün Kaldı)</span></span><span class="item-sub">İstenen: <strong>${c.qty}x ${GameData.products[c.item].name}</strong></span><span class="item-sub ${hasEnough?'green':'red'}">Depoda: ${g.inventory[c.item]||0} / ${c.qty}</span></div><div class="item-action"><button class="btn btn-green" onclick="Engine.fulfillContract(${idx})" ${hasEnough?'':'disabled'}>Teslim Et</button></div></div>`;
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
            loansHTML += `<div style="font-size:0.9rem; font-weight:bold; color:var(--danger); margin-top:15px; margin-bottom:5px;">💳 Aktif Kredilerin:</div>`;
            g.activeLoans.forEach((l, idx) => {
                loansHTML += `<div class="item-row" style="background:rgba(231,76,60,0.05); border:1px solid rgba(231,76,60,0.2);">
                    <div class="item-info">
                        <span class="item-title">${l.type}</span>
                        <span class="item-sub" style="color:var(--text-dark);">Kalan: ${l.daysLeft} Gün (Günlük: ${App.formatMoney(l.dailyPayment)})</span>
                        <span class="item-sub red" style="font-weight:bold;">Toplam Borç: ${App.formatMoney(l.total)}</span>
                    </div>
                    <div class="item-action"><button class="btn btn-danger" onclick="Engine.payOffLoan(${idx})">Kapat</button></div>
                </div>`;
            });
        }

        h += `<div class="panel mb-2">
            <div style="font-weight:900; font-size:1.2rem; margin-bottom:10px; color:var(--primary-dark); text-align:center;">🏦 Kredi Paketleri</div>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <div class="item-row" style="padding:10px; border:1px solid #ddd; background: #fafafa;">
                    <div class="item-info">
                        <span class="item-title">Acil Nakit</span>
                        <span class="item-sub">Alınan: $10,000 | Geri Ödeme: $12,000</span>
                        <span class="item-sub">10 Gün Vadeli (Günlük: $1,200)</span>
                    </div>
                    <div class="item-action"><button class="btn btn-green" onclick="Engine.takeLoanPackage(10000, 12000, 10, 'Acil Nakit')">Al</button></div>
                </div>
                <div class="item-row" style="padding:10px; border:1px solid #ddd; background: #fafafa;">
                    <div class="item-info">
                        <span class="item-title">Ticari Kredi (Büyüme)</span>
                        <span class="item-sub">Alınan: $50,000 | Geri Ödeme: $65,000</span>
                        <span class="item-sub">30 Gün Vadeli (Günlük: $2,166)</span>
                    </div>
                    <div class="item-action"><button class="btn btn-green" onclick="Engine.takeLoanPackage(50000, 65000, 30, 'Ticari Kredi')">Al</button></div>
                </div>
                <div class="item-row" style="padding:10px; border:1px solid #ddd; background: #fafafa;">
                    <div class="item-info">
                        <span class="item-title">Holding Yatırımı</span>
                        <span class="item-sub">Alınan: $250,000 | Geri Ödeme: $350,000</span>
                        <span class="item-sub">50 Gün Vadeli (Günlük: $7,000)</span>
                    </div>
                    <div class="item-action"><button class="btn btn-green" onclick="Engine.takeLoanPackage(250000, 350000, 50, 'Holding Yatırımı')">Al</button></div>
                </div>
            </div>
            ${loansHTML}
        </div>`;

        h += `<div class="item-row mb-2"><div class="item-info"><span class="item-title">Vadeli Mevduat</span><span class="item-sub green">Bakiye: ${App.formatMoney(g.deposits)} (Günlük %2 Kazanç)</span></div><div class="item-action" style="flex-direction:row;"><button class="btn" onclick="Engine.depositMoney(10000)">+10K Yatır</button><button class="btn btn-green" onclick="Engine.withdrawMoney(10000)">Çek</button></div></div>`;
        
        h += '<div class="page-header mt-2" style="font-size:1.2rem;">📈 Borsa & Kripto</div>';
        for (let s in g.stocks) { let stock = g.stocks[s]; let n = s==='doge'?'DogeCoin':(s==='gold'?'Altın':s); h += `<div class="item-row stock"><div class="item-info"><span class="item-title">${n}</span><span class="item-sub">Fiyat: ${App.formatMoney(stock.price)}</span><span class="item-sub green">Sende: ${stock.shares} Hisse</span></div><div class="item-action" style="flex-direction:row;"><button class="btn btn-green" onclick="Engine.buyStock('${s}')">Al</button><button class="btn btn-danger" onclick="Engine.sellStock('${s}')">Sat</button></div></div>`; }
        document.getElementById('finance-view').innerHTML = h;
    },
    
    renderRDPanel: () => {
        let g = App.state.g;
        if (!g.currentLevel) Engine.updatePlayerLevel();
        let curLvl = g.currentLevel || 1;
        let lvlInfo = (typeof GameData !== 'undefined' && GameData.levels && GameData.levels[curLvl]) 
            ? GameData.levels[curLvl] 
            : { name: "Tüccar", desc: "Ticarete devam et." };

        let h = `<div class="panel mb-2" style="background:linear-gradient(135deg, #2c3e50, #3498db); color:white; padding:15px; text-align:center;">
            <div style="font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; opacity:0.9;">Mevcut Şirket Statüsü</div>
            <div style="font-size:1.5rem; font-weight:900; margin:4px 0;">⭐ Seviye ${curLvl}: ${lvlInfo.name}</div>
            <div style="font-size:0.85rem; opacity:0.9; margin-bottom:10px;">${lvlInfo.desc}</div>
            <div style="display:inline-block; background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:20px; font-weight:bold; font-size:0.9rem;">
                🧪 Ar-Ge Bütçesi: ${g.researchPoints} RP
            </div>
        </div>`;

        // Ar-Ge Becerileri (Skills)
        h += '<div class="page-header mt-2" style="font-size:1.1rem;">💡 Ar-Ge Yetenekleri</div>';
        for(let k in g.skills) {
            let s = g.skills[k];
            h += `<div class="item-row skill" style="margin-bottom:6px;">
                <div class="item-info">
                    <span class="item-title">${s.name}</span>
                    <span class="item-sub">${s.desc}</span>
                </div>
                <div class="item-action">
                    ${s.unlocked ? '<button class="btn btn-sm" disabled style="background:var(--success); color:white;">Açıldı</button>' : `<button class="btn btn-purple btn-sm" onclick="Engine.unlockSkill('${k}')">Aç (${s.cost} RP)</button>`}
                </div>
            </div>`;
        }

        // Seviye Bazlı Görevler (Level Quests)
        h += '<div class="page-header mt-3" style="font-size:1.1rem;">📋 Seviye Görevleri & Hedefler</div>';

        if (typeof GameData !== 'undefined' && GameData.quests && GameData.levels) {
            for (let l = 1; l <= 10; l++) {
                let lData = GameData.levels[l];
                if (!lData) continue;
                let levelQuestKeys = Object.keys(GameData.quests).filter(k => GameData.quests[k].level === l);
                if (levelQuestKeys.length === 0) continue;

                let isLevelDone = levelQuestKeys.every(k => g.quests[k] && g.quests[k].claimed);
                let isCurrentLevel = (l === curLvl);
                let isLocked = (l > curLvl);

                let headerBg = isLevelDone ? 'rgba(46, 204, 113, 0.15)' : (isCurrentLevel ? 'rgba(52, 152, 219, 0.15)' : 'rgba(0,0,0,0.03)');
                let borderCol = isLevelDone ? 'var(--success)' : (isCurrentLevel ? 'var(--primary)' : '#ddd');
                let statusBadge = isLevelDone ? '<span style="color:var(--success); font-weight:bold; font-size:0.8rem;">✅ Tamamlandı</span>' : (isCurrentLevel ? '<span style="color:var(--primary); font-weight:bold; font-size:0.8rem;">⭐ Aktif Seviye</span>' : '<span style="color:var(--text-muted); font-size:0.8rem;">🔒 Kilitli</span>');

                h += `<div class="panel mb-2" style="border-left: 4px solid ${borderCol}; background:${headerBg}; padding:10px 12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span style="font-weight:900; font-size:1rem; color:var(--text-dark);">Seviye ${l}: ${lData.name}</span>
                        ${statusBadge}
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">${lData.desc}</div>`;

                levelQuestKeys.forEach(qKey => {
                    let qDef = GameData.quests[qKey];
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
                        actionBtn = `<button class="btn btn-sm" disabled style="background:var(--success); color:white; opacity:0.9;">✅ Alındı</button>`;
                    } else if (qState.done) {
                        actionBtn = `<button class="btn btn-green btn-sm" style="animation: pulse 1.5s infinite;" onclick="Engine.claimQuest('${qKey}')">🎁 Ödülü Al</button>`;
                    } else if (!prereqsOk || !buildOk) {
                        actionBtn = `<button class="btn btn-sm" disabled style="opacity:0.5; font-size:0.75rem;">🔒 Kilitli</button>`;
                    } else {
                        actionBtn = `<button class="btn btn-sm" disabled style="opacity:0.6; font-size:0.75rem;">Devam Ediyor</button>`;
                    }

                    h += `<div class="item-row quest" style="background:white; margin-bottom:6px; padding:8px 10px; border-radius:10px; border:1px solid rgba(0,0,0,0.06);">
                        <div class="item-info">
                            <span class="item-title" style="font-size:0.95rem;">${qDef.title}</span>
                            <span class="item-sub" style="font-size:0.8rem;">${qDef.desc}</span>
                            <span class="item-sub" style="color:var(--primary); font-size:0.75rem; font-weight:bold;">Ödül: ${rewardStr.join(', ')}</span>
                            ${(!buildOk && qDef.reqBuild) ? `<span class="item-sub red" style="font-size:0.75rem;">⚠️ Gereken Bina: Seviye ${qDef.reqBuild}</span>` : ''}
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
        
        let lawyers = [
            { name: "Avukat Yok", fee: 0, winRate: 10, desc: "Çok riskli. %10 Kazanma şansı." },
            { name: "Stajyer Avukat", fee: 200, winRate: 40, desc: "Günlük ücreti ucuz. %40 Kazanma şansı." },
            { name: "Şirket Avukatı", fee: 1000, winRate: 70, desc: "Profesyonel savunma. %70 Kazanma şansı." },
            { name: "Şeytanın Avukatı", fee: 4000, winRate: 95, desc: "Davalarda kesin zafer. %95 Kazanma şansı." }
        ];

        h += `<div class="panel text-center mb-2" style="background:var(--primary-dark); color:white;">
            <div style="font-size:1.4rem; font-weight:900;">🧑‍⚖️ Hukuk Departmanı</div>
            <div style="font-size:0.9rem; opacity:0.9;">Davalarla başa çıkmak için avukatınızı güçlendirin veya duruşmada zar atın!</div>
        </div>`;

        // Lawyer Raise / Bonus Card
        h += `<div class="panel mb-2" style="background:${g.lawyerRaise ? 'rgba(52, 152, 219, 0.12)' : 'rgba(0,0,0,0.03)'}; border:1px solid ${g.lawyerRaise ? 'rgba(52, 152, 219, 0.4)' : '#ddd'};">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div>
                    <div style="font-weight:900; font-size:1.05rem; color:var(--primary-dark);">💼 Avukata Prim & Zam</div>
                    <div style="font-size:0.8rem; color:var(--text-dark); margin-top:2px;">Maliyet: <b>+$1,000/gün</b> | Durum: <b>${g.lawyerRaise ? 'Aktif (+%20 Zafer Şansı)' : 'Standart Tarife'}</b></div>
                    <div style="font-size:0.75rem; color:var(--text-light); margin-top:2px;">Avukata prim verildiğinde duruşma zafer şansı %20 artar ve duruşmada zar atarken +2 bonus verir!</div>
                </div>
                <button class="btn ${g.lawyerRaise ? 'btn-primary' : 'btn-outline'}" onclick="Engine.toggleLawyerRaise()" style="font-weight:bold; white-space:nowrap; padding:8px 12px;">${g.lawyerRaise ? 'Prim Veriliyor ✅' : 'Prim/Zam Ver'}</button>
            </div>
        </div>`;
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">💼 Avukat Kiralama</div><div style="display:flex; flex-direction:column; gap:10px;">`;
        lawyers.forEach((l, idx) => {
            let isCurrent = g.lawyerLevel === idx;
            h += `<div class="item-row" style="border: ${isCurrent ? '2px solid var(--success)' : '1px solid #ddd'}; background: ${isCurrent ? 'rgba(46, 204, 113, 0.1)' : 'white'};">
                <div class="item-info">
                    <span class="item-title">${l.name} ${isCurrent ? '✅' : ''}</span>
                    <span class="item-sub">${l.desc}</span>
                    <span class="item-sub" style="color:var(--danger); font-weight:bold;">${l.fee > 0 ? 'Günlük: ' + App.formatMoney(l.fee) : 'Ücretsiz'}</span>
                </div>
                <div class="item-action">
                    <button class="btn ${isCurrent ? 'btn-green' : 'btn-outline'}" onclick="Engine.hireLawyer(${idx})" ${isCurrent ? 'disabled' : ''}>${isCurrent ? 'Mevcut' : 'Kirala'}</button>
                </div>
            </div>`;
        });
        h += `</div>`;

        h += `<div class="page-header mt-2" style="font-size:1.2rem; margin-top:20px;">🚨 Bekleyen Davalar</div>`;
        if (g.lawsuits.length === 0) {
            h += `<div class="panel text-center" style="color:var(--success); font-weight:bold;">Şirkete açılmış bir dava yok!</div>`;
        } else {
            g.lawsuits.forEach((law, idx) => {
                h += `<div class="item-row" style="background:rgba(231, 76, 60, 0.1); border:1px solid rgba(231, 76, 60, 0.3);">
                    <div class="item-info">
                        <span class="item-title" style="color:var(--danger);">${law.type}</span>
                        <span class="item-sub">Tazminat Talebi: <b>${App.formatMoney(law.cost)}</b></span>
                        <span class="item-sub">Mahkemeye Kalan: <b>${law.daysLeft} Gün</b></span>
                    </div>
                    <div class="item-action" style="flex-direction:row; align-items:center; gap:6px;">
                        <button class="btn btn-purple" style="padding:6px 10px; font-weight:bold;" onclick="Engine.rollLawsuitDice(${idx})">🎲 Zar At<br><small>(Duruşma)</small></button>
                        <button class="btn btn-warning" onclick="Engine.settleLawsuit(${idx})">Anlaş<br>(${App.formatMoney(law.cost)})</button>
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
            <div style="font-size:1.4rem; font-weight:900;">🤝 İlişki Yönetimi & Hayırseverlik</div>
            <div style="font-size:0.85rem; opacity:0.9;">Masadaki güçlerle ilişkilerini koru ve vakıf bağışlarıyla kalıcı itibar kazan!</div>
        </div>`;

        // BÖLÜM 1: GÜÇ ODAKLARI VE ETKİLEŞİM / MİNİ OYUNLAR
        h += `<div class="page-header mt-2" style="font-size:1.15rem;">🏢 Masadaki Güçler (Mini Oyunlar & Kararlar)</div>`;

        let instKeys = ['wholesaler', 'minister', 'mafia'];
        instKeys.forEach(instId => {
            let inst = (typeof GameData !== 'undefined' && GameData.institutions) ? GameData.institutions[instId] : null;
            if (!inst) return;
            let val = g.relations[instId] !== undefined ? g.relations[instId] : inst.defaultVal;
            let color = val >= 75 ? 'var(--success)' : (val < 30 ? 'var(--danger)' : '#f39c12');
            let status = val >= 75 ? 'Mükemmel' : (val < 30 ? 'Düşmanca' : 'Dengeli');

            h += `<div class="panel mb-3" style="border:1px solid rgba(0,0,0,0.08); padding:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <span style="font-weight:900; font-size:1.05rem;">${inst.icon} ${inst.name}</span>
                    <span style="color:${color}; font-weight:bold; font-size:0.9rem;">${val}/100 (${status})</span>
                </div>
                <div class="progress-bar mb-2" style="height:8px; background:rgba(0,0,0,0.08); border-radius:4px;">
                    <div class="progress-fill" style="width:${val}%; background:${color}; border-radius:4px;"></div>
                </div>
                <div style="font-size:0.82rem; color:var(--text-dark); margin-bottom:10px; line-height:1.4;">${inst.desc}</div>`;

            if (inst.minigame) {
                h += `<div style="background:rgba(0,0,0,0.03); border:1px dashed #ccc; border-radius:8px; padding:10px; margin-top:8px;">
                    <div style="font-weight:bold; font-size:0.85rem; color:var(--primary-dark); margin-bottom:4px;">${inst.minigame.title}</div>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">${inst.minigame.desc}</div>`;

                if (inst.minigame.isDice) {
                    h += `<div style="text-align:center;">
                        <button class="btn btn-warning" onclick="Engine.playRelationMinigame('${instId}', 0)" style="width:100%; font-weight:bold;">
                            🎲 Zarları At! (Kazan: +25 İlişki & $10,000 / Kaybet: -15 & -$5,000)
                        </button>
                    </div>`;
                } else if (inst.minigame.options) {
                    h += `<div style="display:flex; flex-direction:column; gap:6px;">`;
                    inst.minigame.options.forEach((opt, oIdx) => {
                        let costText = opt.cost ? ` (Maliyet: ${App.formatMoney(opt.cost)})` : '';
                        let chanceText = opt.cost ? 'Garantili' : `%${Math.round(opt.successRate * 100)} Şans`;
                        h += `<button class="btn btn-outline" onclick="Engine.playRelationMinigame('${instId}', ${oIdx})" style="text-align:left; font-size:0.8rem; padding:8px 10px; display:flex; justify-content:space-between; align-items:center;">
                            <span><b>${opt.name}</b>${costText}</span>
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
        h += `<div class="page-header mt-3" style="font-size:1.15rem;">🌱 Hayırseverlik & Vakıflar (Sosyal Yatırım)</div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Bağış yaparak vakıfları geliştir; her seviye şirketinize kalıcı itibar ve pasif avantajlar sağlar.</div>`;

        if (typeof GameData !== 'undefined' && GameData.foundations) {
            for (let fId in GameData.foundations) {
                let f = GameData.foundations[fId];
                let curLvl = (g.foundations && g.foundations[fId] !== undefined) ? g.foundations[fId] : 0;
                let maxLvl = f.maxLevel || 10;
                let isMax = curLvl >= maxLvl;
                let cost = Math.floor(f.baseCost * Math.pow(1.5, curLvl));
                let pct = Math.floor((curLvl / maxLvl) * 100);

                let currentEffectStr = '';
                if (curLvl === 0) {
                    currentEffectStr = 'Henüz bağış yapılmadı.';
                } else {
                    let parts = [];
                    if (f.effectPerLevel.pop) parts.push(`+${curLvl * f.effectPerLevel.pop} Popülarite`);
                    if (f.effectPerLevel.demandPercent) parts.push(`+%${curLvl * f.effectPerLevel.demandPercent} Talep`);
                    if (f.effectPerLevel.taxDiscountPercent) parts.push(`%${curLvl * f.effectPerLevel.taxDiscountPercent} Vergi İndirimi`);
                    if (f.effectPerLevel.dailyRP) parts.push(`+${curLvl * f.effectPerLevel.dailyRP} Günlük RP`);
                    if (f.effectPerLevel.corporateRep) parts.push(`+${curLvl * f.effectPerLevel.corporateRep} Kurumsal REP`);
                    currentEffectStr = `Aktif Bonus: ` + parts.join(', ');
                }

                h += `<div class="panel mb-2" style="border:1px solid rgba(0,0,0,0.08); padding:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span style="font-weight:900; font-size:1.05rem;">${f.icon} ${f.name}</span>
                        <span style="font-weight:bold; font-size:0.85rem; color:var(--primary);">Seviye ${curLvl} / ${maxLvl}</span>
                    </div>
                    <div class="progress-bar mb-2" style="height:6px; background:rgba(0,0,0,0.06); border-radius:3px;">
                        <div class="progress-fill" style="width:${pct}%; background:var(--success); border-radius:3px;"></div>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:4px;">${f.desc}</div>
                    <div style="font-size:0.8rem; color:var(--primary-dark); font-weight:bold; margin-bottom:4px;">💡 ${f.effectDesc}</div>
                    <div style="font-size:0.78rem; color:var(--success-dark); font-style:italic; margin-bottom:10px;">${currentEffectStr}</div>
                    <div style="text-align:right;">
                        ${isMax ? '<button class="btn btn-sm" disabled style="background:var(--success); color:white;">Maksimum Seviye</button>' : `<button class="btn btn-green btn-sm" onclick="Engine.donateFoundation('${fId}')">🌟 Bağış Yap (${App.formatMoney(cost)})</button>`}
                    </div>
                </div>`;
            }
        }

        document.getElementById('relations-view').innerHTML = h;
    },

    renderReviewsPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.reviews || g.reviews.length === 0) {
            h += `<div class="panel text-center mb-2" style="color:var(--text-light); font-weight:bold;">Henüz hiç müşteri yorumu yok. İlk gününü bitirdiğinde buraya yorumlar düşecek!</div>`;
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
            h += `<div class="panel text-center mb-2" style="color:var(--text-light); font-weight:bold;">Şu an yolda olan bir kargo yok. Siparişlerinizi Mağaza sekmesinden verebilirsiniz.</div>`;
        } else {
            g.incomingCargo.forEach((c) => {
                let p = GameData.products[c.id];
                h += `<div class="item-row" style="background:rgba(52, 152, 219, 0.05); border:1px solid rgba(52, 152, 219, 0.3);">
                    <div class="item-info">
                        <span class="item-title">📦 ${p.name} (x${c.qty})</span>
                        <span class="item-sub">Toplam Hacim: <b>${c.space} br</b></span>
                    </div>
                    <div class="item-action" style="font-weight:900; color:var(--primary); font-size:1.1rem; text-align:center;">
                        Kalan:<br>${c.daysLeft} Gün
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
            <div style="font-size:1.4rem; font-weight:900;">📊 Pazar Payı Raporu</div>
            <div style="font-size:0.9rem; opacity:0.9;">Piyasadaki etkinliğini ve rakiplerini gör.</div>
        </div>`;

        h += `<div class="panel mb-2">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-weight:900; font-size:1.1rem; color:var(--success);">Sen (%${myShare.toFixed(1)})</span>
                <span style="font-weight:900; font-size:1.1rem; color:var(--danger);">Rakip (%${rivalShare.toFixed(1)})</span>
            </div>
            <div class="progress-bar mb-2" style="height:15px; border-radius:10px; background:var(--danger); display:flex;">
                <div class="progress-fill" style="width:${myShare}%; background:var(--success); border-radius:10px 0 0 10px;"></div>
            </div>
            <div style="font-size:0.85rem; color:var(--text-dark);">
                <ul>
                    <li>Pazar payını artırmak için fiyatlarını düşürebilir, popülariteni yüksek tutabilirsin.</li>
                    <li>Rakibini yenersen pazarı tekeline alırsın!</li>
                </ul>
            </div>
        </div>`;

        if (!g.rivalDefeated) {
            h += `<div class="item-row mt-2" style="background:#fff3cd; border:1px solid #ffeeba;">
                <div class="item-info">
                    <span class="item-title" style="color:#856404;">🏆 Büyük Satın Alma</span>
                    <span class="item-sub">Rakibini tamamen piyasadan silmek için Pazar Payının <b>%99</b>, bakiyenin ise <b>$1,000,000</b> olması gerekir.</span>
                </div>
                <div class="item-action">
                    <button class="btn btn-warning" onclick="Engine.buyoutRival()">Rakibi Satın Al</button>
                </div>
            </div>`;
        } else {
            h += `<div class="panel text-center mt-2" style="color:var(--success); font-weight:900; font-size:1.1rem;">
                🏆 RAKİP YOK EDİLDİ! PİYASANIN TEK HAKİMİ SENSİN!
            </div>`;
        }
        document.getElementById('market-view').innerHTML = h;
    },

    renderUpgradesPanel: () => {
        let g = App.state.g; let h = '';
        let nextLevel = g.buildingLevel + 1;
        if (GameData.buildings[nextLevel]) { let b = GameData.buildings[nextLevel]; h += `<div class="item-row upgrade"><div class="item-info"><span class="item-title">${b.name} Binasına Geç</span><span class="item-sub">Maliyet: ${App.formatMoney(b.cost)}</span></div><div class="item-action"><button class="btn btn-primary" onclick="Engine.upgradeBuilding()">Geliştir</button></div></div>`; } 
        else { h += `<div class="panel text-center mb-2" style="font-size:1.1rem; color:var(--success);"><strong>En lüks binadasın!</strong></div>`; }
        
        h += '<div class="page-header mt-2" style="font-size:1.2rem;">📦 Depo Kapasitesi Genişletmeleri</div>';
        if (!g.upgrades) g.upgrades = {};
        for (let k in GameData.upgrades) {
            let u = GameData.upgrades[k];
            let isBought = !!g.upgrades[k];
            h += `<div class="item-row"><div class="item-info"><span class="item-title">${u.name}</span><span class="item-sub">Kapasite: +${u.cap} br</span></div><div class="item-action">${isBought ? '<button class="btn btn-green" disabled>Alındı ✅</button>' : `<button class="btn btn-warning" onclick="Engine.buyStorage('${k}')">Satın Al (${App.formatMoney(u.cost)})</button>`}</div></div>`;
        }

        h += '<div class="page-header mt-2" style="font-size:1.2rem;">🚚 Lojistik Filosu</div>';
        for (let k in g.fleet) { let f = g.fleet[k]; h += `<div class="item-row"><div class="item-info"><span class="item-title">${f.name} (${f.count} Adet)</span><span class="item-sub">Kapasite: +${f.capacity}</span></div><div class="item-action"><button class="btn btn-green" onclick="Engine.buyVehicle('${k}')">Satın Al (${App.formatMoney(f.cost)})</button></div></div>`; }
        
        h += '<div class="page-header mt-2" style="font-size:1.2rem;">📢 Pazarlama & Reklam</div>';
        if (g.marketingDaysLeft > 0) h += `<div class="panel text-center"><strong>Kampanya Aktif! (Kalan: ${g.marketingDaysLeft} Gün)</strong></div>`;
        else { for (let k in GameData.marketing) h += `<div class="item-row marketing"><div class="item-info"><span class="item-title">${GameData.marketing[k].name}</span><span class="item-sub">Etki: +${GameData.marketing[k].pop} Popülarite</span></div><div class="item-action"><button class="btn btn-primary" onclick="Engine.startCampaign('${k}')">Başlat (${App.formatMoney(GameData.marketing[k].cost)})</button></div></div>`; }
        
        h += `<div class="page-header mt-2" style="font-size:1.2rem;">👑 Franchise (Prestij)</div><div class="panel text-center"><span>Şu anki Prestij (FP): <strong style="font-size:1.2rem;">${g.franchisePoints}</strong></span><br><button class="btn btn-purple mt-2" onclick="Engine.doPrestige()">Şirketi Devret & Prestij Yap</button></div>`;
        document.getElementById('upgrades-view').innerHTML = h;
    },

    renderFactoryPanel: () => {
        let g = App.state.g; let h = '';
        if(!g.factory) g.factory = { owned: false, level: 1, activeItem: null };
        if(!g.factory.owned) {
            h += `<div class="panel text-center" style="padding:20px;">
                    <h3 style="color:var(--warning);">Kendi Fabrikanı Kur!</h3>
                    <p class="text-muted mb-2" style="font-size:1.1rem;">Toptancıya para yedirme. Ürünleri <strong>%70 daha ucuza</strong> mal et!</p>
                    <button class="btn btn-massive btn-warning" onclick="Engine.buyFactory()">Fabrika Kur ($50,000)</button>
                  </div>`;
        } else {
            let upgCost = g.factory.level * 75000;
            let spaceLimit = g.factory.level * 100;
            h += `<div class="panel">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:2px solid #eee; padding-bottom:10px;">
                        <span style="font-weight:900; font-size:1.3rem; color:var(--primary-dark);">🏭 Seviye ${g.factory.level} Fabrika</span>
                        <button class="btn btn-green" onclick="Engine.upgradeFactory()">Geliştir (${App.formatMoney(upgCost)})</button>
                    </div>
                    <div class="settings-row">
                        <label style="font-size:1.1rem; font-weight:bold;">Üretim Bandı:</label>
                        <select class="fancy-select" onchange="Engine.setFactoryItem(this.value)">
                            <option value="">-- Üretimi Durdur --</option>`;
            for(let k in GameData.products) {
                if(g.unlocked[k]) {
                    let p = GameData.products[k];
                    let qty = Math.max(1, Math.floor(spaceLimit / p.space));
                    let cost = Math.floor(p.buy * 0.3) * qty;
                    h += `<option value="${k}" ${g.factory.activeItem===k?'selected':''}>${p.name} (${qty} adet/gün | Maliyet: ${App.formatMoney(cost)})</option>`;
                }
            }
            h += `      </select>
                    </div>
                    <small class="text-muted mt-2" style="display:block; font-size:0.9rem;">* Fabrika her gün sonu otomatik olarak ürünü üretip doğrudan depona yollar.</small>
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

    renderRoadmapPanel: () => {
        let g = App.state.g; let h = `<div class="panel">`;
        h += `<p class="mb-2"><strong>Mega Mart Tycoon</strong> toplam <strong>150 Seviye</strong> bina geliştirmesi sunar! Şu anki seviyen: <span class="green" style="font-size:1.2rem; font-weight:900;">Sv. ${g.buildingLevel}</span></p>`;
        
        let start = Math.max(1, g.buildingLevel - 1);
        let end = Math.min(150, start + 8);
        for(let i = start; i <= end; i++) {
            let b = GameData.buildings[i];
            let isCurrent = (i === g.buildingLevel);
            let isUnlocked = (i <= g.buildingLevel);
            h += `<div class="item-row" style="${isCurrent?'border:2px solid var(--primary); background:rgba(67,97,238,0.1);':(isUnlocked?'opacity:0.6;':'')}">
                <div class="item-info">
                    <span class="item-title">${isUnlocked?'✅':'🔒'} Sv. ${i}: ${b.name}</span>
                    <span class="item-sub">${isCurrent ? 'ŞU ANKİ BİNAN' : (isUnlocked ? 'Geçildi' : 'Popülarite Katkısı: +'+b.popBoost)}</span>
                </div>
                <div class="item-action">
                    ${!isUnlocked ? `<span style="font-weight:bold; color:var(--danger); font-size:0.9rem;">${App.formatMoney(b.cost)}</span>` : ''}
                </div>
            </div>`;
        }
        if(end < 150) h += `<div class="text-center mt-2" style="font-style:italic; color:#777;">... ve 150. seviyeye kadar daha fazlası!</div>`;
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
                    <div><span style="font-size:0.75rem; color:var(--text-light); display:block;">KAZANÇ</span><span class="green">+${App.formatMoney(rep.revenue)}</span></div>
                    <div style="font-size:1.2rem; color:var(--text-light);">|</div>
                    <div><span style="font-size:0.75rem; color:var(--text-light); display:block;">GİDER</span><span class="red">-${App.formatMoney(rep.expenses)}</span></div>
                    <div style="font-size:1.2rem; color:var(--text-light);">|</div>
                    <div><span style="font-size:0.75rem; color:var(--text-light); display:block;">NET KAR</span><span class="${isProfit ? 'green' : 'red'}">${isProfit ? '+' : ''}${App.formatMoney(rep.netProfit)}</span></div>
                </div>
                <div class="mt-2" style="font-style:italic; font-size:0.85rem; color:var(--text-dark); border-top:1px dashed var(--border); padding-top:6px;">
                    "${rep.randomReview}"
                </div>
            </div>

            <!-- Tab Buttons -->
            <div class="endday-tabs">
                <button class="endday-tab active" id="tab-btn-kasa" onclick="UI.switchEndDayTab('kasa')">💰 Kasa (${rep.tabKasa ? rep.tabKasa.length : 0})</button>
                <button class="endday-tab" id="tab-btn-haberler" onclick="UI.switchEndDayTab('haberler')">📰 Pazar (${rep.tabHaberler ? rep.tabHaberler.length : 0})</button>
                <button class="endday-tab" id="tab-btn-hukuk" onclick="UI.switchEndDayTab('hukuk')">⚖️ Hukuk (${rep.tabHukuk ? rep.tabHukuk.length : 0})</button>
                <button class="endday-tab" id="tab-btn-duyurular" onclick="UI.switchEndDayTab('duyurular')">📢 Duyurular (${rep.tabDuyurular ? rep.tabDuyurular.length : 0})</button>
            </div>

            <!-- Tab Contents -->
            <div class="endday-content active" id="tab-view-kasa">
                ${rep.tabKasa && rep.tabKasa.length > 0 ? rep.tabKasa.join('') : '<div style="color:var(--text-light); font-style:italic; padding:10px;">Bugün kasa hareketi olmadı.</div>'}
            </div>
            <div class="endday-content" id="tab-view-haberler">
                ${rep.tabHaberler && rep.tabHaberler.length > 0 ? rep.tabHaberler.join('') : '<div style="color:var(--text-light); font-style:italic; padding:10px;">Bugün önemli bir piyasa veya trend haberi yok.</div>'}
            </div>
            <div class="endday-content" id="tab-view-hukuk">
                ${rep.tabHukuk && rep.tabHukuk.length > 0 ? rep.tabHukuk.join('') : '<div style="color:var(--text-light); font-style:italic; padding:10px;">Herhangi bir dava veya duruşma gelişmesi yok.</div>'}
            </div>
            <div class="endday-content" id="tab-view-duyurular">
                ${rep.tabDuyurular && rep.tabDuyurular.length > 0 ? rep.tabDuyurular.join('') : '<div style="color:var(--text-light); font-style:italic; padding:10px;">Özel bir şirket duyurusu bulunmuyor.</div>'}
            </div>

            <div class="mt-2 text-center" style="color:var(--success); font-weight:900; font-size:0.85rem;">
                💾 İlerleme Otomatik Olarak Kaydedildi
            </div>
        `;

        App.showModal("📅 Gün Sonu Raporu", content, `<button class="btn btn-primary" onclick="App.closeModal()">Tamam / Sonraki Gün</button>`);
    },

    switchEndDayTab: (tabKey) => {
        if (typeof AudioSys !== 'undefined') AudioSys.tap();
        document.querySelectorAll('.endday-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.endday-content').forEach(c => c.classList.remove('active'));

        let btn = document.getElementById('tab-btn-' + tabKey);
        let view = document.getElementById('tab-view-' + tabKey);
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
    steps: [
        { title: "👋 MEGA MART'A HOŞ GELDİN!", text: "Sen bu şehrin yeni perakende kralısın! Küçük bir toptancıdan başlayıp dev bir üretim holdingine dönüşmeye hazır mısın?<br><br>Sana temel kuralları öğreteyim..." },
        { title: "🛒 1. TOPTANCIDAN MAL AL", text: "Alttaki <b>🛒 Toptancı</b> sekmesinden ucuza ürün satın al. Satın aldığın ürünler doğrudan depona gider." },
        { title: "🏪 2. REYONLARI YÖNET", text: "<b>🏪 Reyonlar</b> sekmesine geçip aldığın ürünün 'fiyat politikasını' belirle. Ucuz fiyat daha hızlı satar ama kar marjın düşer!" },
        { title: "🚚 3. KARGO FİLOSU (DİKKAT)", text: "Depoda malın olsa bile, günlük ne kadar satabileceğin <b>Kargo Filosu Kapasitene</b> bağlıdır! Satışların yavaşlarsa <b>👔 Yönetim -> 🏢 Geliştirmeler</b> sekmesinden yeni tır veya kamyonet almalısın." },
        { title: "🧪 4. RP VE AR-GE MERKEZİ", text: "RP (Araştırma Puanı), sen <b>Günü Bitir</b> tuşuna bastıkça o günkü <u>kazancına oranla</u> (%5) otomatik olarak birikir.<br><br>Kazandığın RP'leri <b>👔 Yönetim -> 🧪 Ar-Ge</b> ekranında yeni yetenekler açmak için kullanabilirsin." },
        { title: "🏦 5. PARAM BİTERSE NE OLACAK?", text: "Eğer paran sıfırlanırsa ve mal alamıyorsan oyun bitmez! <b>👔 Yönetim -> 🏦 Banka</b> ekranına girip anında <b>Kredi Çekebilirsin</b>. <br><br>Artık hazırsın patron, iyi şanslar!" }
    ],
    show: () => {
        let s = Tutorial.steps[Tutorial.step];
        let html = `<div style="font-size:1.1rem; line-height:1.5; color:var(--text-dark); text-align:left; padding:10px 0;">${s.text}</div><hr style="border:0; border-top:1px solid #ccc; margin:15px 0;">`;
        html += `<div class="action-grid mt-2" style="grid-template-columns: 1fr 1fr;">`;
        if(Tutorial.step > 0) html += `<button class="btn" style="background:#555; color:white;" onclick="Tutorial.step--; Tutorial.show();">⬅ Geri</button>`;
        else html += `<div></div>`;
        
        if(Tutorial.step < Tutorial.steps.length - 1) {
            html += `<button class="btn btn-primary" onclick="Tutorial.step++; Tutorial.show();">İleri ➡</button>`;
        } else {
            html += `<button class="btn btn-green" onclick="Tutorial.finish();">Başla! 🚀</button>`;
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
