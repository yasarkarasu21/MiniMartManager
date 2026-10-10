// js/ui.js - User Interface & Rendering Logic

function formatMoney(m) { return '$' + Math.floor(m).toLocaleString('en-US'); }
function addLog(msg) { g.logs.push(`<div class="log-entry">${msg}</div>`); }

function showNotify(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div'); toast.className = 'toast'; toast.innerText = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => { toast.classList.add('show'); });
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2500);
}

function showModal(title, descHTML) { document.getElementById('modal-title').innerText = title; document.getElementById('modal-desc').innerHTML = descHTML; document.getElementById('modal-overlay').classList.remove('hidden'); }
function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.remove('hidden');
    document.querySelector(`[onclick="switchTab('${id}')"]`).classList.add('active');
    updateUI();
}

function updateUI() {
    checkQuests();
    document.getElementById('s-day').innerText = g.day; document.getElementById('s-week').innerText = g.week; document.getElementById('s-month').innerText = g.month;
    document.getElementById('s-money').innerText = formatMoney(g.money); document.getElementById('s-rp').innerText = g.researchPoints; document.getElementById('s-fp').innerText = g.franchisePoints;
    
    let currentPop = Math.min(200, Math.max(1, getBasePop() + (g.marketingDaysLeft > 0 ? (g.skills.marketingPro.unlocked ? g.marketingBoost*1.5 : g.marketingBoost) : 0)));
    document.getElementById('s-pop').innerText = Math.floor(currentPop);
    
    let baseStorage = g.storageCapacity; if(g.skills.storageOpt.unlocked) baseStorage = Math.floor(baseStorage * 1.2);
    document.getElementById('s-storage').innerText = `${g.currentStorage}/${baseStorage}`;
    let pct = (g.currentStorage / baseStorage) * 100; let fill = document.getElementById('storage-fill');
    fill.style.width = `${Math.min(100, pct)}%`; if(pct > 90) fill.style.background = 'var(--danger)'; else fill.style.background = 'var(--success)';

    let trCap = getTotalTransportCap();
    document.getElementById('s-truck').innerText = `${g.currentTransportUsed}/${trCap}`;

    let fpNext = Math.floor(g.stats.earned / 50000); document.getElementById('stat-fp').innerText = g.franchisePoints + " FP"; document.getElementById('stat-next-fp').innerText = fpNext + " FP";
    
    // Market Share UI Updates
    document.getElementById('s-market-share').innerText = g.marketShare.toFixed(1);
    document.getElementById('corp-my-share').innerText = g.marketShare.toFixed(1);
    document.getElementById('corp-rival-share').innerText = (100 - g.marketShare).toFixed(1);
    document.getElementById('market-share-fill').style.width = `${g.marketShare}%`;
    let btnBuyout = document.getElementById('btn-buyout');
    if(g.marketShare >= 99 && !g.rivalDefeated) { btnBuyout.style.display = 'block'; } else { btnBuyout.style.display = 'none'; }

    let tBar = document.getElementById('trend-bar');
    if(g.trendDaysLeft > 0 && g.trendActive) { tBar.style.display = 'flex'; document.getElementById('s-trend').innerText = g.trendActive.name; document.getElementById('s-trend-days').innerText = g.trendDaysLeft; } 
    else tBar.style.display = 'none';

    renderShop(); renderInventory(); renderStaff(); renderFinance(); renderRD(); renderCorp();
}

function renderShop() {
    let bmPanel = document.getElementById('black-market-panel'); let bmList = document.getElementById('black-market-list');
    if (g.blackMarketActive && g.blackMarketItem) {
        bmPanel.classList.remove('hidden'); bmList.innerHTML = '';
        let p = products[g.blackMarketItem]; let price = Math.floor(p.buy * 0.2); 
        bmList.innerHTML = `<div class="item-row blackmarket"><div class="item-info"><span class="item-title">${p.name}</span><span class="item-sub">Karaborsa: ${formatMoney(price)} | Nakliye: ${p.space*10} br</span></div><div class="item-action"><button class="btn btn-danger" onclick="buyBlackMarket(10)">10 Al</button></div></div>`;
    } else { bmPanel.classList.add('hidden'); }

    const list = document.getElementById('shop-list'); list.innerHTML = '';
    for (let k in products) {
        if (!g.unlocked[k]) continue;
        let p = products[k]; let basePrice = p.buy * g.modifiers.buyMod; if(g.skills.negotiator.unlocked) basePrice *= 0.9;
        let price = Math.floor(basePrice);
        list.innerHTML += `<div class="item-row"><div class="item-info"><span class="item-title">${p.name}</span><span class="item-sub">Alış: ${formatMoney(price)} | Hacim: ${p.space} br</span></div><div class="item-action" style="flex-direction:row;"><button class="btn" onclick="buyProduct('${k}', 1)">1 Al</button><button class="btn btn-purple" onclick="buyProduct('${k}', 10)">10 Al</button></div></div>`;
    }
}

function renderInventory() {
    const list = document.getElementById('inventory-list'); list.innerHTML = '';
    for (let k in products) if (g.unlocked[k]) list.innerHTML += `<div class="item-row"><div class="item-info"><span class="item-title">${products[k].name} Reyonu</span><span class="item-sub">Depo: <strong style="color:var(--text-dark);">${g.inventory[k]} Adet</strong></span><select onchange="changePricing('${k}', this.value)"><option value="cheap" ${g.pricing[k]==='cheap'?'selected':''}>Ucuz Sürüm</option><option value="normal" ${g.pricing[k]==='normal'?'selected':''}>Normal</option><option value="expensive" ${g.pricing[k]==='expensive'?'selected':''}>Lüks (Premium)</option></select></div></div>`;
    
    const upgList = document.getElementById('upgrade-list'); upgList.innerHTML = '';
    for (let k in products) {
        if (!g.unlocked[k]) {
            let p = products[k];
            if (p.reqBuild > g.buildingLevel) {
                upgList.innerHTML += `<div class="item-row" style="opacity:0.6;"><div class="item-info"><span class="item-title">🔒 ${p.name}</span><span class="item-sub" style="color:var(--danger);">Daha büyük bina gerekli (Seviye ${p.reqBuild})</span></div></div>`;
            } else {
                upgList.innerHTML += `<div class="item-row upgrade"><div class="item-info"><span class="item-title">${p.name}</span><span class="item-sub">Kurulum: ${formatMoney(p.unlock)}</span></div><div class="item-action"><button class="btn btn-warning" onclick="unlockDept('${k}')">Kur</button></div></div>`;
            }
        }
    }
}

function renderStaff() {
    const list = document.getElementById('staff-list'); list.innerHTML = ''; let wageMod = g.skills.hrExpert.unlocked ? 0.9 : 1.0;
    for (let k in staffTypes) { let s = staffTypes[k]; list.innerHTML += `<div class="item-row"><div class="item-info"><span class="item-title">${s.name} (${g.staff[k]})</span><span class="item-sub">Maaş: ${formatMoney(s.wage*wageMod)}/Gün</span></div><div class="item-action"><button class="btn" onclick="hireStaff('${k}')">İşe Al (${formatMoney(s.cost)})</button></div></div>`; }
}
function renderFinance() {
    document.getElementById('loan-amount').innerText = formatMoney(g.loan); document.getElementById('deposit-amount').innerText = formatMoney(g.deposits);
    let insBtn = document.getElementById('btn-insurance'); if (g.insurance) { insBtn.innerText = "Sigorta Aktif (İptal Et)"; insBtn.className = "btn btn-green"; } else { insBtn.innerText = "Sigorta Yaptır ($50/Gün)"; insBtn.className = "btn"; }
    let sList = document.getElementById('stock-list'); sList.innerHTML = ''; let stockNames = { megatech: 'MegaTech (Teknoloji)', foodco: 'FoodCo (Gıda)', gold: 'Altın (Güvenli)', doge: 'DogeCoin (Kripto)' };
    for (let s in g.stocks) { let stock = g.stocks[s]; sList.innerHTML += `<div class="item-row stock"><div class="item-info"><span class="item-title">${stockNames[s]}</span><span class="item-sub">1 Lot: ${formatMoney(stock.price)}</span><span class="item-sub" style="color:var(--success);">Sende: ${stock.shares} Lot</span></div><div class="item-action" style="flex-direction:row;"><button class="btn btn-green" onclick="buyStock('${s}')">Al</button><button class="btn btn-danger" onclick="sellStock('${s}')">Sat</button></div></div>`; }
}
function renderRD() {
    const qList = document.getElementById('quest-list'); qList.innerHTML = '';
    for(let k in g.quests) { let q = g.quests[k]; if(!q.claimed) qList.innerHTML += `<div class="item-row quest"><div class="item-info"><span class="item-title">${q.title}</span><span class="item-sub">${q.desc}</span><span class="item-sub" style="color:#d35400;font-weight:900;">Ödül: ${q.rp} RP</span></div><div class="item-action"><button class="btn" onclick="claimQuest('${k}')" ${!q.done ? 'disabled' : ''} style="${q.done ? 'background:var(--success);' : ''}">${q.done ? 'Al' : 'Bekliyor'}</button></div></div>`; }
    const sList = document.getElementById('skill-list'); sList.innerHTML = '';
    for(let k in g.skills) { let s = g.skills[k]; sList.innerHTML += `<div class="item-row skill" style="${s.unlocked ? 'border-color:var(--success); background:#e8f8f5;' : ''}"><div class="item-info"><span class="item-title">${s.name}</span><span class="item-sub">${s.desc}</span></div><div class="item-action">${s.unlocked ? '<button class="btn" disabled style="background:var(--success);">Açıldı</button>' : `<button class="btn btn-purple" onclick="unlockSkill('${k}')" ${g.researchPoints < s.cost ? 'disabled' : ''}>Aç (${s.cost} RP)</button>`}</div></div>`; }
}
function renderCorp() {
    document.getElementById('stat-earn').innerText = formatMoney(g.stats.earned); document.getElementById('stat-spend').innerText = formatMoney(g.stats.spent);
    
    const bList = document.getElementById('building-upgrades'); bList.innerHTML = '';
    let nextLevel = g.buildingLevel + 1;
    if (buildings[nextLevel]) {
        let b = buildings[nextLevel];
        bList.innerHTML = `<div class="item-row upgrade"><div class="item-info"><span class="item-title">${b.name} Dükkanına Geç</span><span class="item-sub">${b.desc}</span><span class="item-sub" style="font-weight:900; color:var(--danger);">Maliyet: ${formatMoney(b.cost)}</span></div><div class="item-action"><button class="btn btn-primary" onclick="upgradeBuilding()">Geçiş Yap</button></div></div>`;
    } else { bList.innerHTML = `<div class="panel text-center"><strong>En büyük binadasın! (Mega AVM)</strong></div>`; }

    const fList = document.getElementById('fleet-list'); fList.innerHTML = '';
    for (let k in g.fleet) {
        let f = g.fleet[k];
        fList.innerHTML += `<div class="item-row"><div class="item-info"><span class="item-title">${f.name} (${f.count} Adet)</span><span class="item-sub">Kapasite: +${f.capacity} Kargo/Gün</span><span class="item-sub">Fiyat: ${formatMoney(f.cost)}</span></div><div class="item-action"><button class="btn btn-green" onclick="buyVehicle('${k}')">Satın Al</button></div></div>`;
    }
    const mList = document.getElementById('marketing-list'); mList.innerHTML = '';
    if (g.marketingDaysLeft > 0) mList.innerHTML = `<div class="panel" style="text-align:center; border: 2px solid var(--primary);"><strong>Kampanya Aktif!</strong><br>Kalan: ${g.marketingDaysLeft} Gün</div>`;
    else { for (let k in marketing) mList.innerHTML += `<div class="item-row marketing"><div class="item-info"><span class="item-title">${marketing[k].name}</span><span class="item-sub">Maliyet: ${formatMoney(marketing[k].cost)} | +%${marketing[k].pop} Etki</span></div><div class="item-action"><button class="btn btn-primary" onclick="startCampaign('${k}')">Başlat</button></div></div>`; }
    const cList = document.getElementById('corp-upgrades'); cList.innerHTML = '';
    for (let k in upgrades) { let u = upgrades[k]; if (!u.bought) cList.innerHTML += `<div class="item-row upgrade"><div class="item-info"><span class="item-title">${u.name}</span><span class="item-sub">${formatMoney(u.cost)}</span></div><div class="item-action"><button class="btn btn-warning" onclick="buyStorage('${k}')">Al</button></div></div>`; }
}
