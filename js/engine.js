// js/engine.js - Game Mechanics and Core Loop

function spendMoney(amt) { g.money -= amt; g.stats.spent += amt; }
function earnMoney(amt) { g.money += amt; g.stats.earned += amt; }

function getTotalTransportCap() { return (g.fleet.van.count * g.fleet.van.capacity) + (g.fleet.truck.count * g.fleet.truck.capacity) + (g.fleet.plane.count * g.fleet.plane.capacity); }
function getBasePop() { let pop = g.popularity; if(g.buildingLevel >= 2) pop += buildings[2].popBoost; if(g.buildingLevel >= 3) pop += buildings[3].popBoost; return pop; }

function changePricing(id, val) { g.pricing[id] = val; updateUI(); }

function buyProduct(id, qty) {
    let p = products[id]; let basePrice = p.buy * g.modifiers.buyMod; if(g.skills.negotiator.unlocked) basePrice *= 0.9;
    let cost = Math.floor(basePrice) * qty; 
    let actStore = g.storageCapacity; if(g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
    let trReq = p.space * qty; let trMax = getTotalTransportCap();

    if (g.currentTransportUsed + trReq > trMax) { showNotify("Kargo kapasiten yetersiz! Araç filonu büyüt."); return; }
    if (g.money >= cost && g.currentStorage + (p.space * qty) <= actStore) { 
        spendMoney(cost); g.inventory[id] += qty; g.currentStorage += (p.space * qty); 
        g.currentTransportUsed += trReq;
        showNotify(`${qty}x ${p.name} yola çıktı!`); updateUI(); 
    } else { showNotify("Yetersiz bakiye veya depo alanı!"); }
}

function buyBlackMarket(qty) {
    let p = products[g.blackMarketItem]; let cost = Math.floor(p.buy * 0.2) * qty; 
    let actStore = g.storageCapacity; if(g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
    let trReq = p.space * qty; let trMax = getTotalTransportCap();

    if (g.currentTransportUsed + trReq > trMax) { showNotify("Nakliye kapasiten yetmiyor!"); return; }
    if (g.money >= cost && g.currentStorage + (p.space * qty) <= actStore) {
        spendMoney(cost); g.inventory[g.blackMarketItem] += qty; g.currentStorage += (p.space * qty); g.currentTransportUsed += trReq;
        if(Math.random() < 0.25) {
            showModal("🚨 POLİS BASKINI!", "Kaçak mal alırken yakalandın! Depondaki TÜM mallara el konuldu ve $2000 ceza yedin.");
            g.money -= 2000; for(let k in g.inventory) g.inventory[k] = 0; g.currentStorage = 0; g.blackMarketActive = false;
        } else { showNotify(`Gizlice ${p.name} depoya sokuldu!`); }
        updateUI();
    }
}

function unlockDept(id) { if (g.money >= products[id].unlock) { spendMoney(products[id].unlock); g.unlocked[id] = true; showNotify("Reyon açıldı!"); updateUI(); } }
function hireStaff(id) { if (g.money >= staffTypes[id].cost) { spendMoney(staffTypes[id].cost); g.staff[id]++; showNotify("İşe alındı!"); updateUI(); } }
function startCampaign(id) { if (g.money >= marketing[id].cost) { spendMoney(marketing[id].cost); g.marketingBoost = marketing[id].pop; g.marketingDaysLeft = marketing[id].days; showNotify("Kampanya Başladı!"); updateUI(); } }
function buyStorage(id) { if (g.money >= upgrades[id].cost) { spendMoney(upgrades[id].cost); upgrades[id].bought = true; g.storageCapacity += upgrades[id].cap; showNotify("Lojistik geliştirildi!"); updateUI(); } }
function buyVehicle(id) { if(g.money >= g.fleet[id].cost) { spendMoney(g.fleet[id].cost); g.fleet[id].count++; showNotify(`${g.fleet[id].name} alındı!`); updateUI(); } }

function upgradeBuilding() {
    let next = g.buildingLevel + 1;
    if (buildings[next] && g.money >= buildings[next].cost) {
        spendMoney(buildings[next].cost); g.buildingLevel = next;
        showModal("🏢 BÜYÜK AÇILIŞ!", `Tebrikler, yeni dükkanına geçtin: ${buildings[next].name}! Popülarite arttı ve yeni ürünler kilitlerini açtı.`);
        updateUI();
    }
}

function toggleInsurance() { g.insurance = !g.insurance; updateUI(); }
function takeLoan(amt) { earnMoney(amt); g.loan += amt; showNotify("Kredi çekildi."); updateUI(); }
function payLoan(amt) { if (g.loan > 0 && g.money >= amt) { let pay = Math.min(amt, g.loan); spendMoney(pay); g.loan -= pay; showNotify("Borç ödendi."); updateUI(); } }
function depositMoney(amt) { if(g.money >= amt) { spendMoney(amt); g.deposits += amt; showNotify("Mevduata eklendi."); updateUI(); } }
function withdrawMoney(amt) { if(g.deposits > 0) { let w = Math.min(amt, g.deposits); g.deposits -= w; earnMoney(w); showNotify("Para çekildi."); updateUI(); } }
function buyStock(id) { if (g.money >= g.stocks[id].price) { spendMoney(g.stocks[id].price); g.stocks[id].shares++; showNotify("Hisse alındı!"); updateUI(); } }
function sellStock(id) { if (g.stocks[id].shares > 0) { g.stocks[id].shares--; earnMoney(g.stocks[id].price); showNotify("Hisse satıldı!"); updateUI(); } }
function unlockSkill(id) { if(g.researchPoints >= g.skills[id].cost) { g.researchPoints -= g.skills[id].cost; g.skills[id].unlocked = true; showNotify("Yetenek açıldı!"); updateUI(); } }

function checkQuests() {
    if(!g.quests.q1.done && g.money >= g.quests.q1.reqMoney) g.quests.q1.done = true;
    if(!g.quests.q2.done && g.stocks.gold.shares >= g.quests.q2.reqGold) g.quests.q2.done = true;
    if(!g.quests.q3.done && g.fleet.truck.count > 0) g.quests.q3.done = true;
    if(!g.quests.q4.done && g.buildingLevel >= 2) g.quests.q4.done = true;
    if(!g.quests.q5.done && g.inventory.car > 0) g.quests.q5.done = true;
    if(!g.quests.q5.done && g.unlocked.car) g.quests.q5.done = true; 
}
function claimQuest(id) { if(g.quests[id].done && !g.quests[id].claimed) { g.quests[id].claimed = true; g.researchPoints += g.quests[id].rp; showNotify(`Görev Tamamlandı! +${g.quests[id].rp} RP`); updateUI(); } }

function buyoutRival() {
    if(g.money >= 1000000 && g.marketShare >= 99) {
        spendMoney(1000000);
        g.rivalDefeated = true; g.marketShare = 100.0;
        showModal("🏆 TEKEL OLDUN!", "İnanılmaz! HyperMart'ı 1 Milyon Dolara satın aldın. Artık şehirdeki TEK market sensin. Müşterilerin gidecek başka yeri kalmadı!");
        updateUI();
    } else {
        showNotify("1 Milyon Dolar ve %99 Pazar Payı gerekli!");
    }
}

// --- THE CORE LOOP ---
function endDay() {
    g.logs = []; let revenue = 0, soldTotal = 0;
    g.currentTransportUsed = 0; // Reset logistics

    // Trends
    if(g.trendDaysLeft > 0) { g.trendDaysLeft--; if(g.trendDaysLeft === 0) { g.trendActive = null; addLog("🌍 Piyasa trendi normale döndü."); } } 
    else { if(Math.random() < 0.15) { g.trendActive = marketTrends[Math.floor(Math.random() * marketTrends.length)]; g.trendDaysLeft = 3 + Math.floor(Math.random() * 3); addLog(`🌍 YENİ TREND: ${g.trendActive.name}!`); } }

    // Black Market Event
    if(Math.random() < 0.2) { g.blackMarketActive = true; let keys = Object.keys(products); g.blackMarketItem = keys[Math.floor(Math.random() * keys.length)]; } 
    else { g.blackMarketActive = false; }

    // Market Share Calculation
    let cheapCount = 0; let expCount = 0;
    for(let k in g.pricing) { if(g.pricing[k] === 'cheap') cheapCount++; if(g.pricing[k] === 'expensive') expCount++; }
    
    if(!g.rivalDefeated) {
        let shareGrowth = (g.popularity - 50) / 200; // max +0.25%
        shareGrowth += (cheapCount * 0.10);
        shareGrowth -= (expCount * 0.10);
        shareGrowth += (g.marketingDaysLeft > 0 ? 0.2 : 0);
        
        g.marketShare += shareGrowth;
        if(g.marketShare < 1.0) g.marketShare = 1.0;
        if(g.marketShare > 99.0) g.marketShare = 99.0;
    }

    // Demand Calculation
    let mBoost = g.marketingBoost; if(g.skills.marketingPro.unlocked) mBoost *= 1.5;
    let currentPop = Math.min(200, Math.max(1, getBasePop() + (g.marketingDaysLeft > 0 ? mBoost : 0)));
    if (g.marketingDaysLeft > 0) g.marketingDaysLeft--;
    
    let fpDemandBonus = 1 + (g.franchisePoints * 0.10); 
    let fpProfitBonus = 1 + (g.franchisePoints * 0.10);
    
    // Massive demand boost from Market Share!
    let marketShareMod = g.rivalDefeated ? 2.5 : (0.5 + (g.marketShare / 100)); 
    let demandMult = (currentPop / 50) * fpDemandBonus * marketShareMod; 
    let cashierBonus = g.staff.cashier * 5;

    // Sales Loop
    for (let k in products) {
        if (g.inventory[k] > 0) {
            let p = products[k]; let priceMode = g.pricing[k]; let priceMult = 1.0, demandMod = 1.0;
            if(priceMode === 'cheap') { priceMult = 0.7; demandMod = 1.5; } else if(priceMode === 'expensive') { priceMult = 1.5; demandMod = 0.4; }
            if(g.trendActive && g.trendActive.effect[p.category]) demandMod *= g.trendActive.effect[p.category];

            let maxDemand = Math.floor((p.demand + cashierBonus) * demandMult * demandMod);
            let sold = Math.min(g.inventory[k], maxDemand);
            
            if (sold > 0) {
                let sellPrice = Math.floor(p.sell * priceMult * fpProfitBonus);
                let rev = sold * sellPrice;
                earnMoney(rev); revenue += rev; soldTotal += sold;
                g.inventory[k] -= sold; g.currentStorage -= (sold * p.space);
                addLog(`🛒 ${p.name}: ${sold} satıldı (+${formatMoney(rev)})`);
            }
        }
    }

    // Expenses
    let expenses = 0; let managerDiscount = g.staff.manager > 0 ? 0.8 : 1.0; let hrWageMod = g.skills.hrExpert.unlocked ? 0.9 : 1.0;
    for (let k in staffTypes) expenses += g.staff[k] * (staffTypes[k].wage * managerDiscount * hrWageMod);
    if (expenses > 0) addLog(`👥 Personel Maaşları: -${formatMoney(expenses)}`);

    if (g.loan > 0) { let interest = Math.floor(g.loan * 0.05); g.loan += interest; addLog(`🏦 Kredi Faizi Eklendi: +${formatMoney(interest)} borç`); }
    if (g.deposits > 0) { let earned = Math.floor(g.deposits * 0.02); g.deposits += earned; addLog(`📈 Mevduat Faizi: +${formatMoney(earned)}`); }
    if (g.insurance) { expenses += 50; addLog(`🛡️ Sigorta Primi: -$50`); }
    spendMoney(expenses);

    // Stock Market Simulation
    for(let s in g.stocks) {
        g.stocks[s].oldPrice = g.stocks[s].price; let volatility = s === 'megatech' ? 0.25 : (s === 'foodco' ? 0.10 : (s === 'doge' ? 0.50 : 0.03)); 
        let change = 1 + (Math.random() * volatility * 2 - volatility);
        if(g.trendActive && g.trendActive.id === 'crypto' && s === 'doge') change *= 1.5;
        g.stocks[s].price = Math.max(1, Math.floor(g.stocks[s].price * change));
    }

    // Progression
    g.day++; if (g.day > 7) { g.day = 1; g.week++; } if (g.week > 4) { g.week = 1; g.month++; }
    if (g.staff.janitor === 0 && soldTotal > 50 && Math.random() > 0.5) { g.popularity -= 2; addLog("🧹 Market kirlendi! Popülarite düştü."); }
    else if (g.staff.janitor > 0 && g.popularity < getBasePop()+50) { g.popularity += 1; }

    // Random Events & Rival Sabotage
    g.modifiers.buyMod = 1;
    if (Math.random() < 0.4) {
        let r = Math.random();
        if (r < 0.2 && !g.rivalDefeated && g.marketShare > 20) { g.popularity -= 5; g.marketShare -= 2.0; addLog(`🏢 HyperMart agresif reklam kampanyası yaptı! Pazar payı ve müşteri kaybettin.`); }
        else if (r < 0.4) { if(g.staff.guard > 0) addLog("🚨 Hırsız yakalandı."); else { let loss = Math.floor(g.money * 0.1) + 100; if(g.money<loss)loss=g.money; spendMoney(loss); addLog(`🧨 Hırsızlık! -${formatMoney(loss)}`); } }
        else if (r < 0.6) { if(g.insurance) addLog("🔥 Yangın çıktı ama sigorta karşıladı."); else { let lost = Math.floor(g.inventory.apple/2); g.inventory.apple -= lost; g.currentStorage -= lost; addLog(`🔥 Yangın! ${lost} Elma yandı.`); } }
    }

    if (g.money < 0) addLog("💀 Kasa ekside! Finans sekmesinden kredi çek.");
    
    // Generates a daily Customer Review
    let reviews = [];
    if(cheapCount > 2) reviews.push("Fiyatlar o kadar ucuz ki toptancı sandım! ⭐⭐⭐⭐⭐");
    if(expCount > 2) reviews.push("Fiyatlar ateş pahası. Burası saray mı market mi? ⭐");
    if(g.staff.janitor === 0 && Math.random()>0.5) reviews.push("İçerisi çok pisti, her yerde toz var. ⭐⭐");
    if(g.staff.cashier > 2 && Math.random()>0.5) reviews.push("Kasa sırası hiç beklemedim, kasiyerler jet gibi. ⭐⭐⭐⭐");
    if(g.blackMarketActive && Math.random()>0.5) reviews.push("Reyonlarda markası kazınmış garip mallar vardı... ⭐⭐⭐");
    if(g.buildingLevel === 3 && Math.random()>0.5) reviews.push("Mega AVM devasa! İçinde kayboldum ama çok iyi. ⭐⭐⭐⭐⭐");
    if(reviews.length === 0) reviews.push("Normal bir alışveriş deneyimiydi. Fena değil. ⭐⭐⭐");
    let randomReview = reviews[Math.floor(Math.random()*reviews.length)];

    localStorage.setItem('megaMartSave', JSON.stringify(g));
    
    showModal("Gün Sonu Raporu", `<div style="background:var(--bg-main); padding:20px; border-radius:15px; margin-bottom:10px; border: 1px solid var(--border); display:flex; justify-content:space-around;"><div><span style="font-size:0.8rem; font-weight:800; color:var(--text-muted); display:block;">KAZANÇ</span><span class="green" style="font-size:1.5rem; font-weight:900;">+${formatMoney(revenue)}</span></div><div><span style="font-size:0.8rem; font-weight:800; color:var(--text-muted); display:block;">GİDER</span><span class="red" style="font-size:1.5rem; font-weight:900;">-${formatMoney(expenses)}</span></div></div><div class="panel" style="background:#fff3cd; border:1px solid #ffe69c; border-radius:10px; margin-bottom:15px; padding:12px;"><span style="display:block; font-size:0.75rem; font-weight:900; color:#856404; margin-bottom:4px;">💬 GÜNÜN MÜŞTERİ YORUMU</span><span style="font-size:0.95rem; font-weight:bold; color:#664d03;">"${randomReview}"</span></div><div style="max-height:160px; overflow-y:auto; border:1px solid var(--border); border-radius:12px; background:var(--bg-card); padding:10px;">${g.logs.join('')}</div>`);
    
    updateUI();
}
