const Engine = {
    spendMoney: (amt) => { App.state.g.money -= amt; App.state.g.stats.spent += amt; },
    earnMoney: (amt) => { App.state.g.money += amt; App.state.g.stats.earned += amt; },
    getTotalTransportCap: () => { let g = App.state.g; return (g.fleet.van.count * g.fleet.van.capacity) + (g.fleet.truck.count * g.fleet.truck.capacity) + (g.fleet.plane.count * g.fleet.plane.capacity); },
    getBasePop: () => { let g = App.state.g; let pop = g.popularity; if(g.buildingLevel >= 2) pop += GameData.buildings[2].popBoost; if(g.buildingLevel >= 3) pop += GameData.buildings[3].popBoost; return pop; },
    addLog: (msg) => { App.state.g.logs.push(`<div class="log-entry">${msg}</div>`); },
    
    getProductBuyPrice: (id) => {
        let g = App.state.g; let p = GameData.products[id];
        let basePrice = p.buy;
        if(g.relations && g.relations.wholesaler !== undefined) basePrice *= (1.3 - (g.relations.wholesaler / 100) * 0.6);
        if(g.skills && g.skills.negotiator && g.skills.negotiator.unlocked) basePrice *= 0.9;
        if(g.trendActive && g.trendActive.effect[p.category]) basePrice *= g.trendActive.effect[p.category];
        return Math.max(1, Math.floor(basePrice));
    },
    getProductBaseSellPrice: (id) => {
        let g = App.state.g; let p = GameData.products[id];
        let basePrice = p.sell;
        if(g.trendActive && g.trendActive.effect[p.category]) basePrice *= g.trendActive.effect[p.category];
        return Math.max(1, Math.floor(basePrice));
    },

    adjustPrice: (id, delta) => {
        let g = App.state.g;
        let p = GameData.products[id];
        if(!g.customPrice) g.customPrice = {};
        
        let currentPrice = Engine.getProductBaseSellPrice(id);
        if(g.customPrice[id] !== undefined) currentPrice = g.customPrice[id];
        else if(g.pricing && g.pricing[id]) {
            if(g.pricing[id] === 'cheap') currentPrice = Math.floor(Engine.getProductBaseSellPrice(id) * 0.7);
            else if(g.pricing[id] === 'expensive') currentPrice = Math.floor(Engine.getProductBaseSellPrice(id) * 1.5);
        }
        
        let step = 1;
        let testVal = (delta > 0) ? currentPrice : (currentPrice - 1);
        if (testVal >= 10000) step = 1000;
        else if (testVal >= 1000) step = 100;
        else if (testVal >= 100) step = 10;
        
        let newPrice = currentPrice + (delta * step);
        let minBuy = Engine.getProductBuyPrice(id);
        if (newPrice < minBuy) newPrice = minBuy; // Do not allow selling below cost
        if (newPrice < 1) newPrice = 1;
        
        g.customPrice[id] = newPrice;
        AudioSys.click();
        UI.update();
    },
    
    buyProduct: (id, qty) => {
        let g = App.state.g; let p = GameData.products[id]; 
        let cost = Engine.getProductBuyPrice(id) * qty; 
        let actStore = g.storageCapacity; if(g.skills && g.skills.storageOpt && g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
        let trReq = p.space * qty; let trMax = Engine.getTotalTransportCap();

        if (g.currentTransportUsed + trReq > trMax) { AudioSys.error(); App.showNotify("Kargo kapasiten yetersiz! Araç filonu büyüt."); return; }
        if (g.money >= cost && g.currentStorage + (p.space * qty) <= actStore) { 
            Engine.spendMoney(cost);
            g.currentTransportUsed += trReq;
            g.currentStorage += (p.space * qty);
            if(g.inventory[id] === undefined || isNaN(g.inventory[id])) g.inventory[id] = 0;
            
            if(!g.incomingCargo) g.incomingCargo = [];
            let baseDays = p.cargoDays || 2;
            let whStaff = (g.staff && g.staff.warehouse && !isNaN(g.staff.warehouse)) ? g.staff.warehouse : 0;
            let daysToArrive = Math.max(1, baseDays - whStaff);
            g.incomingCargo.push({ id: id, qty: qty, daysLeft: daysToArrive, space: p.space * qty });
            
            AudioSys.buy(); App.showNotify(`${qty}x ${p.name} siparişi verildi! (${daysToArrive} gün)`); UI.update(); 
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye veya depo alanı!"); }
    },

    sellProductWholesale: (id, qty) => {
        let g = App.state.g; let p = GameData.products[id];
        if (g.inventory[id] >= qty) {
            let earn = Math.floor(Engine.getProductBuyPrice(id) * 0.5) * qty;
            g.inventory[id] -= qty;
            g.currentStorage = Math.max(0, g.currentStorage - (p.space * qty));
            Engine.earnMoney(earn);
            AudioSys.cash(); App.showNotify(`${qty}x ${p.name} toptancıya iade edildi!`); UI.update();
        } else { AudioSys.error(); App.showNotify("Depoda o kadar ürün yok!"); }
    },
    
    buyBlackMarket: (qty) => {
        let g = App.state.g; let p = GameData.products[g.blackMarketItem]; let cost = Math.floor(p.buy * 0.2) * qty; 
        let actStore = g.storageCapacity; if(g.skills && g.skills.storageOpt && g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
        let trReq = p.space * qty; let trMax = Engine.getTotalTransportCap();

        if (g.currentTransportUsed + trReq > trMax) { AudioSys.error(); App.showNotify("Nakliye kapasiten yetmiyor!"); return; }
        if (g.money >= cost && g.currentStorage + (p.space * qty) <= actStore) {
            Engine.spendMoney(cost); 
            if(g.inventory[g.blackMarketItem] === undefined || isNaN(g.inventory[g.blackMarketItem])) g.inventory[g.blackMarketItem] = 0;
            g.inventory[g.blackMarketItem] += qty; g.currentStorage += (p.space * qty); g.currentTransportUsed += trReq;
            if(Math.random() < 0.25) {
                AudioSys.police();
                App.showModal("🚨 POLİS BASKINI!", "Kaçak mal alırken yakalandın! Depondaki TÜM mallara el konuldu ve ceza yedin.");
                g.money -= 2000; for(let k in g.inventory) g.inventory[k] = 0; g.currentStorage = 0; g.blackMarketActive = false;
            } else { AudioSys.buy(); App.showNotify(`Gizlice ${p.name} depoya sokuldu!`); }
            UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye veya depo alanı!"); }
    },
    
    unlockDept: (id) => { let g = App.state.g; if (g.money >= GameData.products[id].unlock) { Engine.spendMoney(GameData.products[id].unlock); g.unlocked[id] = true; AudioSys.success(); App.showNotify("Reyon açıldı!"); Engine.checkQuests(); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    getMaxStaffLimit: () => {
        let g = App.state.g;
        let bLvl = (g && g.buildingLevel) ? g.buildingLevel : 1;
        if (bLvl === 1) return 10;
        if (bLvl === 2) return 50;
        if (bLvl === 3) return 200;
        return 200 + (bLvl - 3) * 100;
    },
    getTotalStaffCount: () => {
        let g = App.state.g;
        if (!g || !g.staff) return 0;
        return Object.values(g.staff).reduce((a, b) => a + (Number(b) || 0), 0);
    },
    getStaffHireCost: (id) => {
        let g = App.state.g;
        if (!GameData || !GameData.staffTypes || !GameData.staffTypes[id]) return 25;
        let base = GameData.staffTypes[id].cost;
        let count = (g && g.staff && g.staff[id]) ? g.staff[id] : 0;
        return Math.floor(base * Math.pow(1.08, count));
    },
    hireStaff: (id) => { 
        let g = App.state.g; 
        if(!g.staff) g.staff = { cashier: 0, guard: 0, janitor: 0, warehouse: 0, manager: 0 };
        if(g.staff[id] === undefined || isNaN(g.staff[id])) g.staff[id] = 0;
        
        let total = Engine.getTotalStaffCount();
        let maxLimit = Engine.getMaxStaffLimit();
        if (total >= maxLimit) {
            AudioSys.error();
            App.showNotify(`Personel kapasitesi dolu (${total}/${maxLimit})! Dükkanı büyüt.`, 'error');
            return;
        }

        let cost = Engine.getStaffHireCost(id);
        if (g.money >= cost) { 
            Engine.spendMoney(cost); 
            g.staff[id]++; 
            AudioSys.buy(); 
            App.showNotify(`${GameData.staffTypes[id].name} işe alındı! (${App.formatMoney(cost)})`, 'success'); 
            Engine.checkQuests(); 
            UI.update(); 
        } else { 
            AudioSys.error(); 
            App.showNotify(`Yetersiz bakiye! Gerekli: ${App.formatMoney(cost)}`); 
        } 
    },
    fireStaff: (id) => {
        let g = App.state.g;
        if (!g.staff || !g.staff[id] || g.staff[id] <= 0) {
            AudioSys.error();
            App.showNotify("İşten çıkarılacak personel yok!");
            return;
        }
        g.staff[id]--;
        AudioSys.tap();
        App.showNotify(`${GameData.staffTypes[id].name} işten çıkarıldı.`);
        UI.update();
    },
    toggleStaffInsurance: () => {
        let g = App.state.g;
        g.staffInsurance = !g.staffInsurance;
        AudioSys.click();
        App.showNotify(g.staffInsurance ? "🛡️ SGK Personel Sigortası Aktif Edildi!" : "SGK Personel Sigortası Kapatıldı.");
        Engine.checkQuests();
        UI.update();
    },
    toggleLawyerRaise: () => {
        let g = App.state.g;
        g.lawyerRaise = !g.lawyerRaise;
        AudioSys.click();
        App.showNotify(g.lawyerRaise ? "⚖️ Avukata Prim/Zam Verildi! (+%20 Zafer Şansı)" : "Avukat Primi Kapatıldı.");
        UI.update();
    },
    adjustMorale: (delta, reason) => {
        let g = App.state.g;
        if (!g) return;
        if (g.bossMorale === undefined) g.bossMorale = 80;
        g.bossMorale = Math.max(0, Math.min(100, g.bossMorale + delta));
        if (delta !== 0 && reason) {
            let sign = delta > 0 ? '+' : '';
            Engine.addLog(`😎 Patron Morali: ${sign}${delta} (${reason}) -> %${g.bossMorale}`);
        }
    },
    startCampaign: (id) => { let g = App.state.g; if (g.money >= GameData.marketing[id].cost) { Engine.spendMoney(GameData.marketing[id].cost); g.marketingBoost = GameData.marketing[id].pop; g.marketingDaysLeft = GameData.marketing[id].days; AudioSys.success(); App.showNotify("Kampanya Başladı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    buyStorage: (id) => { 
        let g = App.state.g; 
        if(!g.upgrades) g.upgrades = {};
        if(g.upgrades[id]) { AudioSys.error(); App.showNotify("Bu geliştirme zaten alındı!"); return; }
        if (g.money >= GameData.upgrades[id].cost) { 
            Engine.spendMoney(GameData.upgrades[id].cost); 
            g.upgrades[id] = true; 
            g.storageCapacity += GameData.upgrades[id].cap; 
            AudioSys.success(); 
            App.showNotify("Depo kapasitesi artırıldı!"); 
            Engine.checkQuests();
            UI.update(); 
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } 
    },
    buyVehicle: (id) => { let g = App.state.g; if(g.money >= g.fleet[id].cost) { Engine.spendMoney(g.fleet[id].cost); g.fleet[id].count++; AudioSys.buy(); App.showNotify(`${g.fleet[id].name} alındı!`); Engine.checkQuests(); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    
    upgradeBuilding: () => {
        let g = App.state.g; let next = g.buildingLevel + 1;
        if (GameData.buildings[next] && g.money >= GameData.buildings[next].cost) {
            Engine.spendMoney(GameData.buildings[next].cost); g.buildingLevel = next;
            AudioSys.success(); App.showModal("🏢 BÜYÜK AÇILIŞ!", `Tebrikler, yeni dükkanına geçtin: ${GameData.buildings[next].name}!`); Engine.checkQuests(); UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); }
    },
    
    toggleInsurance: () => { App.state.g.insurance = !App.state.g.insurance; AudioSys.click(); UI.update(); },
    takeLoanPackage: (amount, totalRepay, days, type) => {
        let g = App.state.g;
        if (!g.activeLoans) g.activeLoans = [];
        if (g.activeLoans.length >= 3) {
            AudioSys.error(); App.showNotify("En fazla 3 aktif kredin olabilir!"); return;
        }
        Engine.earnMoney(amount);
        let daily = Math.ceil(totalRepay / days);
        g.activeLoans.push({ amount: amount, total: totalRepay, dailyPayment: daily, daysLeft: days, type: type });
        g.popularity = Math.max(0, g.popularity - 10);
        if(!g.rivalDefeated) g.marketShare = Math.max(1.0, (g.marketShare || 5.0) - 2.0);
        Engine.addLog(`📉 Kredi Çekildi: Müşteri güveni sarsıldı (Popülarite -10, Pazar Payı -%2.0)`);
        AudioSys.cash(); App.showNotify(`${type} Çekildi! (Popülarite Düştü)`); UI.update();
    },
    payOffLoan: (idx) => {
        let g = App.state.g;
        let l = g.activeLoans[idx];
        if (g.money >= l.total) {
            Engine.spendMoney(l.total);
            g.activeLoans.splice(idx, 1);
            AudioSys.cash(); App.showNotify("Kredi tamamen kapatıldı!"); UI.update();
        } else {
            AudioSys.error(); App.showNotify("Kapatmak için yeterli paran yok!");
        }
    },
    hireLawyer: (level) => {
        App.state.g.lawyerLevel = level;
        if(level === 3) {
            App.state.g.popularity = Math.max(0, App.state.g.popularity - 15);
            if(!App.state.g.rivalDefeated) App.state.g.marketShare = Math.max(1.0, (App.state.g.marketShare || 5.0) - 2.0);
            Engine.addLog("😈 Şeytanın Avukatı kiralandı. Halk bunu hiç sevmedi! (Popülarite -15, Pazar Payı -2.0)");
        }
        AudioSys.success();
        App.showNotify("Avukat değiştirildi.");
        Engine.checkQuests();
        UI.update();
    },
    settleLawsuit: (idx) => {
        let g = App.state.g;
        let law = g.lawsuits[idx];
        if (g.money >= law.cost) {
            Engine.spendMoney(law.cost);
            g.lawsuits.splice(idx, 1);
            Engine.addLog(`🤝 "${law.type}" davası için davacıyla anlaşıldı. ${App.formatMoney(law.cost)} ödendi.`);
            AudioSys.cash();
            App.showNotify("Dava masada çözüldü!");
            UI.update();
        } else {
            AudioSys.error(); App.showNotify("Anlaşmak için yeterli paran yok!");
        }
    },
    startDiceDuel: (params, onFinish) => {
        let diceIcons = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        let pName = params.playerName || 'Sen';
        let oppName = params.opponentName || 'Rakip';
        let pBonus = params.playerBonus || 0;
        let oppBonus = params.oppBonus || 0;
        
        let initialHtml = `
            <div style="font-size:0.95rem; color:var(--text-light); margin-bottom:12px;">Zarlar atılıyor, masada gerilim yüksek...</div>
            <div class="dice-container">
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <div style="font-size:0.85rem; font-weight:800; color:var(--primary); margin-bottom:5px;">${pName}</div>
                    <div class="dice-box rolling" id="dice-player">🎲</div>
                    <div id="dice-p-score" style="font-size:0.85rem; font-weight:bold; margin-top:5px; height:18px;"></div>
                </div>
                <div style="font-size:1.6rem; font-weight:900; color:var(--text-light);">VS</div>
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <div style="font-size:0.85rem; font-weight:800; color:var(--danger); margin-bottom:5px;">${oppName}</div>
                    <div class="dice-box rolling" id="dice-opp">🎲</div>
                    <div id="dice-opp-score" style="font-size:0.85rem; font-weight:bold; margin-top:5px; height:18px;"></div>
                </div>
            </div>
            <div id="dice-result-msg" style="margin-top:15px; font-weight:bold; font-size:1.05rem; min-height:40px;">Zarlar dönüyor...</div>
        `;

        App.showModal(params.title || "🎲 Zar Düellosu", initialHtml, `<button class="btn btn-outline" disabled>Zarlar Dönüyor...</button>`);

        let rollInterval = setInterval(() => {
            let r1 = Math.floor(Math.random() * 6) + 1;
            let r2 = Math.floor(Math.random() * 6) + 1;
            let pBox = document.getElementById('dice-player');
            let oBox = document.getElementById('dice-opp');
            if (pBox) pBox.innerText = diceIcons[r1];
            if (oBox) oBox.innerText = diceIcons[r2];
        }, 80);

        setTimeout(() => {
            clearInterval(rollInterval);
            let finalP = Math.floor(Math.random() * 6) + 1;
            let finalOpp = Math.floor(Math.random() * 6) + 1;
            let totalP = finalP + pBonus;
            let totalOpp = finalOpp + oppBonus;

            let pBox = document.getElementById('dice-player');
            let oBox = document.getElementById('dice-opp');
            if (pBox) {
                pBox.classList.remove('rolling');
                pBox.innerText = diceIcons[finalP];
            }
            if (oBox) {
                oBox.classList.remove('rolling');
                oBox.innerText = diceIcons[finalOpp];
            }

            let pScoreEl = document.getElementById('dice-p-score');
            let oppScoreEl = document.getElementById('dice-opp-score');
            if (pScoreEl) pScoreEl.innerText = `${finalP} ${pBonus ? `(+${pBonus})` : ''} = ${totalP}`;
            if (oppScoreEl) oppScoreEl.innerText = `${finalOpp} ${oppBonus ? `(+${oppBonus})` : ''} = ${totalOpp}`;

            let resMsg = document.getElementById('dice-result-msg');
            let won = totalP > totalOpp;
            let tie = totalP === totalOpp;

            let actionsEl = document.getElementById('modal-actions');
            if (actionsEl) {
                actionsEl.innerHTML = `<button class="btn btn-primary" onclick="App.closeModal()">Tamam</button>`;
            }

            if (won) {
                if (typeof AudioSys !== 'undefined') AudioSys.success();
                if (resMsg) resMsg.innerHTML = `<span class="green" style="font-size:1.2rem;">🏆 KAZANDIN! (${totalP} vs ${totalOpp})</span>`;
            } else if (tie) {
                if (typeof AudioSys !== 'undefined') AudioSys.click();
                if (resMsg) resMsg.innerHTML = `<span class="yellow" style="font-size:1.2rem;">🤝 BERABERE! (${totalP} vs ${totalOpp})</span>`;
            } else {
                if (typeof AudioSys !== 'undefined') AudioSys.error();
                if (resMsg) resMsg.innerHTML = `<span class="red" style="font-size:1.2rem;">💥 KAYBETTİN! (${totalP} vs ${totalOpp})</span>`;
            }

            if (onFinish) {
                onFinish({
                    playerRoll: finalP,
                    opponentRoll: finalOpp,
                    playerTotal: totalP,
                    opponentTotal: totalOpp,
                    won: won,
                    tie: tie,
                    resMsgEl: resMsg
                });
            }
        }, 1200);
    },
    rollLawsuitDice: (idx) => {
        let g = App.state.g;
        if (!g.lawsuits || !g.lawsuits[idx]) return;
        let law = g.lawsuits[idx];
        let lawyerBonus = (g.lawyerLevel || 0) + (g.lawyerRaise ? 2 : 0);

        Engine.startDiceDuel({
            title: `⚖️ ${law.type} Duruşması`,
            playerName: "Avukatın",
            opponentName: "Hakim & Davacı",
            playerBonus: lawyerBonus
        }, (res) => {
            if (res.won) {
                g.lawsuits.splice(idx, 1);
                Engine.adjustMorale(6, "Mahkeme Zaferi");
                Engine.addLog(`🧑‍⚖️ <b>DAVA DÜŞTÜ!</b> Mahkemede zarları kazandın, "${law.type}" davası düştü!`);
                if (res.resMsgEl) res.resMsgEl.innerHTML += `<div style="font-size:0.9rem; margin-top:8px;" class="green">Dava Masrafsız Düştü! (+6 Patron Morali)</div>`;
            } else if (res.tie) {
                law.daysLeft = Math.max(1, law.daysLeft - 1);
                if (res.resMsgEl) res.resMsgEl.innerHTML += `<div style="font-size:0.9rem; margin-top:8px;">Duruşma ertelendi. Masraf değişmedi.</div>`;
            } else {
                let costIncrease = Math.floor(law.cost * 0.4);
                law.cost += costIncrease;
                Engine.adjustMorale(-4, "Mahkeme Kaybı");
                Engine.addLog(`👨‍⚖️ <b>DOSYA MASRAFI BİNDİ!</b> Mahkemede zarları kaybettin. "${law.type}" dava maliyeti +${App.formatMoney(costIncrease)} arttı!`);
                if (res.resMsgEl) res.resMsgEl.innerHTML += `<div style="font-size:0.9rem; margin-top:8px;" class="red">Mahkeme Masrafı Eklendi: +${App.formatMoney(costIncrease)} (-4 Moral)</div>`;
            }
            UI.update();
        });
    },
    depositMoney: (amt) => { let g = App.state.g; if(g.money >= amt) { Engine.spendMoney(amt); g.deposits += amt; AudioSys.cash(); App.showNotify("Mevduata eklendi."); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    withdrawMoney: (amt) => { let g = App.state.g; if(g.deposits > 0) { let w = Math.min(amt, g.deposits); g.deposits -= w; Engine.earnMoney(w); AudioSys.cash(); App.showNotify("Para çekildi."); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    buyStock: (id) => { let g = App.state.g; if (g.money >= g.stocks[id].price) { Engine.spendMoney(g.stocks[id].price); g.stocks[id].shares++; AudioSys.buy(); App.showNotify("Hisse alındı!"); Engine.checkQuests(); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    sellStock: (id) => { let g = App.state.g; if (g.stocks[id].shares > 0) { g.stocks[id].shares--; Engine.earnMoney(g.stocks[id].price); AudioSys.cash(); App.showNotify("Hisse satıldı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Hisse yok!"); } },
    unlockSkill: (id) => { let g = App.state.g; if(g.researchPoints >= g.skills[id].cost) { g.researchPoints -= g.skills[id].cost; g.skills[id].unlocked = true; AudioSys.success(); App.showNotify("Yetenek açıldı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz RP!"); } },
    
    updatePlayerLevel: () => {
        let g = App.state.g;
        if (!g || !g.quests || typeof GameData === 'undefined' || !GameData.quests) return;
        let lvl = 1;
        for (let l = 1; l <= 10; l++) {
            let levelQuests = Object.keys(GameData.quests).filter(k => GameData.quests[k].level === l);
            if (levelQuests.length > 0 && levelQuests.every(k => g.quests[k] && g.quests[k].claimed)) {
                lvl = l + 1;
            } else {
                break;
            }
        }
        g.currentLevel = Math.min(10, lvl);
    },

    checkQuests: () => {
        let g = App.state.g;
        if (!g || !g.quests || typeof GameData === 'undefined' || !GameData.quests) return;
        
        let newlyCompleted = [];
        
        for (let qId in GameData.quests) {
            let qDef = GameData.quests[qId];
            if (!g.quests[qId]) {
                g.quests[qId] = { title: qDef.title, desc: qDef.desc, level: qDef.level, done: false, claimed: false };
            }
            let qState = g.quests[qId];
            if (qState.done) continue;

            // Check prerequisites
            if (qDef.prereqQuests && qDef.prereqQuests.length > 0) {
                let prereqsMet = qDef.prereqQuests.every(pId => g.quests[pId] && (g.quests[pId].claimed || g.quests[pId].done));
                if (!prereqsMet) continue;
            }

            // Check building requirement
            if (qDef.reqBuild && g.buildingLevel < qDef.reqBuild) continue;

            // Evaluate condition
            let cond = qDef.condition;
            let satisfied = false;
            if (!cond) satisfied = true;
            else {
                switch (cond.type) {
                    case 'inventory':
                        satisfied = (g.inventory && (g.inventory[cond.param] || 0) >= cond.value);
                        break;
                    case 'unlocked':
                        satisfied = !!(g.unlocked && g.unlocked[cond.param]);
                        break;
                    case 'money':
                        satisfied = (g.money >= cond.value);
                        break;
                    case 'staff':
                        satisfied = (g.staff && (g.staff[cond.param] || 0) >= cond.value);
                        break;
                    case 'upgrade':
                        satisfied = !!(g.upgrades && g.upgrades[cond.param]);
                        break;
                    case 'fleet':
                        satisfied = (g.fleet && g.fleet[cond.param] && g.fleet[cond.param].count >= cond.value);
                        break;
                    case 'foundation': {
                        let totalFoundations = Object.values(g.foundations || {}).reduce((a, b) => a + b, 0);
                        satisfied = totalFoundations >= cond.value;
                        break;
                    }
                    case 'foundationLevel': {
                        let maxFoundationLvl = Math.max(0, ...Object.values(g.foundations || {}));
                        satisfied = maxFoundationLvl >= cond.value;
                        break;
                    }
                    case 'stock':
                        satisfied = (g.stocks && g.stocks[cond.param] && g.stocks[cond.param].shares >= cond.value);
                        break;
                    case 'b2b':
                        satisfied = ((g.stats && g.stats.contractsCompleted) || 0) >= cond.value;
                        break;
                    case 'buildingLevel':
                        satisfied = (g.buildingLevel >= cond.value);
                        break;
                    case 'factory':
                        satisfied = !!(g.factory && g.factory.owned);
                        break;
                    case 'lawyer':
                        satisfied = ((g.lawyerLevel || 0) >= cond.value);
                        break;
                    case 'rep':
                        satisfied = ((g.corporateRep || 0) >= cond.value);
                        break;
                    case 'marketShare':
                        satisfied = ((g.marketShare || 0) >= cond.value);
                        break;
                    case 'rivalDefeated':
                        satisfied = !!g.rivalDefeated;
                        break;
                    default:
                        satisfied = false;
                }
            }

            if (satisfied) {
                qState.done = true;
                newlyCompleted.push(qDef);
            }
        }

        if (newlyCompleted.length > 0) {
            newlyCompleted.forEach(q => {
                if (typeof AudioSys !== 'undefined') AudioSys.success();
                App.showNotify(`Görev Tamamlandı: ${q.title}!`, 'success');
            });
            
            let allDone = Object.keys(GameData.quests).every(k => g.quests[k] && g.quests[k].done);
            if (allDone && !g.allQuestsCompletedNotified) {
                g.allQuestsCompletedNotified = true;
                setTimeout(() => {
                    App.showModal("🏆 TÜM GÖREVLER TAMAMLANDI!", "Tebrikler! Oyundaki tüm seviyeleri ve hedefleri başarıyla tamamladın!");
                }, 1000);
            }
        }
    },

    claimQuest: (id) => {
        let g = App.state.g;
        if (!g || !g.quests || !g.quests[id]) return;
        if (g.quests[id].done && !g.quests[id].claimed) {
            g.quests[id].claimed = true;
            let qDef = (typeof GameData !== 'undefined' && GameData.quests) ? GameData.quests[id] : null;
            let reward = (qDef && qDef.reward) ? qDef.reward : { rp: 15 };
            let rewardItems = [];

            if (reward.money) {
                Engine.earnMoney(reward.money);
                rewardItems.push(`+${App.formatMoney(reward.money)}`);
            }
            if (reward.rp) {
                g.researchPoints = (g.researchPoints || 0) + reward.rp;
                rewardItems.push(`+${reward.rp} RP`);
            }
            if (reward.rep) {
                g.corporateRep = (g.corporateRep || 0) + reward.rep;
                rewardItems.push(`+${reward.rep} REP`);
            }

            AudioSys.success();
            App.showNotify(`Görev Ödülü Alındı: ${rewardItems.join(', ')}`, 'success');
            Engine.updatePlayerLevel();
            Engine.checkQuests();
            UI.update();
        }
    },
    
    buyoutRival: () => {
        let g = App.state.g;
        if(g.money >= 1000000 && g.marketShare >= 99) {
            Engine.spendMoney(1000000);
            g.rivalDefeated = true; g.marketShare = 100.0;
            AudioSys.success();
            App.showModal("🏆 TEKEL OLDUN!", "HyperMart'ı 1 Milyon Dolara satın aldın. Artık şehirdeki TEK market sensin!");
            Engine.checkQuests();
            UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye veya Pazar Payı!"); }
    },
    
    doPrestige: () => {
        let g = App.state.g;
        let fpToGain = Math.floor(g.stats.earned / 50000);
        if(fpToGain <= 0) { AudioSys.error(); alert("Gelir çok düşük."); return; }
        if(confirm(`Marketini devredip ${fpToGain} FP alacaksın. Kabul mü?`)) {
            let currentFP = g.franchisePoints + fpToGain; let pCount = g.prestigeCount + 1;
            App.state.g = StateManager.getInitialGameState();
            App.state.g.franchisePoints = currentFP; App.state.g.prestigeCount = pCount;
            AudioSys.success();
            App.saveGame(); App.showModal("👑 FRANCHISE AÇILDI!", `Tebrikler! Toplam ${currentFP} FP'ye sahipsin.`);
            UI.update();
        }
    },

    buyFactory: () => {
        let g = App.state.g;
        if(g.money >= 50000 && (!g.factory || !g.factory.owned)) {
            Engine.spendMoney(50000);
            if(!g.factory) g.factory = { owned: true, level: 1, activeItem: null };
            g.factory.owned = true;
            AudioSys.success(); App.showNotify("🏭 Kendi Fabrikanı Satın Aldın!");
            Engine.checkQuests();
            UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); }
    },
    upgradeFactory: () => {
        let g = App.state.g;
        let cost = g.factory.level * 75000;
        if(g.money >= cost) {
            Engine.spendMoney(cost);
            g.factory.level++;
            AudioSys.buy(); App.showNotify(`🏭 Fabrika Seviye ${g.factory.level} oldu!`);
            UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); }
    },
    improveRelation: (id, cost, boost) => {
        let g = App.state.g;
        if(g.money >= cost) {
            if(!g.relations) g.relations = { wholesaler: 50, minister: 50, mafia: 10 };
            if(g.relations[id] >= 100) { AudioSys.error(); App.showNotify("İlişki zaten maksimumda!"); return; }
            Engine.spendMoney(cost);
            g.relations[id] = Math.min(100, g.relations[id] + boost);
            AudioSys.success();
            App.showNotify("İlişki geliştirildi!");
            UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); }
    },

    playRelationMinigame: (instId, optionIdx) => {
        let g = App.state.g;
        let inst = (typeof GameData !== 'undefined' && GameData.institutions) ? GameData.institutions[instId] : null;
        if (!inst || !inst.minigame) return;
        if (!g.relations) g.relations = { wholesaler: 50, minister: 50, mafia: 10 };

        if (inst.minigame.isDice) {
            Engine.startDiceDuel({
                title: "🎲 Mafya Zar Masası",
                playerName: "Sen",
                opponentName: "Mafya Babası"
            }, (res) => {
                let winBonus = inst.minigame.winBonus || 25;
                let winMoney = inst.minigame.winMoney || 10000;
                let losePenalty = inst.minigame.losePenalty || -15;
                let loseMoney = inst.minigame.loseMoney || 5000;

                if (res.won) {
                    g.relations[instId] = Math.min(100, (g.relations[instId] || 10) + winBonus);
                    Engine.earnMoney(winMoney);
                    Engine.adjustMorale(5, "Mafya Masasında Galibiyet");
                    if (res.resMsgEl) res.resMsgEl.innerHTML += `<div style="font-size:0.9rem; margin-top:8px;" class="green">+${winBonus} Mafya İlişkisi | +${App.formatMoney(winMoney)} Kazanç (+5 Moral)</div>`;
                } else if (res.tie) {
                    if (res.resMsgEl) res.resMsgEl.innerHTML += `<div style="font-size:0.9rem; margin-top:8px;">İki taraf da aynı attı! Para ve ilişki değişmedi.</div>`;
                } else {
                    g.relations[instId] = Math.max(0, (g.relations[instId] || 10) + losePenalty);
                    let actualLoss = Math.min(g.money, loseMoney);
                    Engine.spendMoney(actualLoss);
                    Engine.adjustMorale(-4, "Mafya Masasında Kayıp");
                    if (res.resMsgEl) res.resMsgEl.innerHTML += `<div style="font-size:0.9rem; margin-top:8px;" class="red">${losePenalty} Mafya İlişkisi | -${App.formatMoney(actualLoss)} Kayıp (-4 Moral)</div>`;
                }
                UI.update();
            });
            return;
        }

        let opt = inst.minigame.options ? inst.minigame.options[optionIdx] : null;
        if (!opt) return;

        if (opt.cost && g.money < opt.cost) {
            AudioSys.error();
            App.showNotify(`Yetersiz bakiye! Gerekli: ${App.formatMoney(opt.cost)}`);
            return;
        }

        if (opt.cost) {
            Engine.spendMoney(opt.cost);
        }

        let roll = Math.random();
        let success = roll <= opt.successRate;

        if (success) {
            let delta = opt.successBonus || 10;
            g.relations[instId] = Math.min(100, (g.relations[instId] || 50) + delta);
            Engine.adjustMorale(3, "Başarılı İlişki Etkileşimi");
            AudioSys.success();
            App.showModal("🎉 BAŞARILI ETKİLEŞİM!", `<b>${opt.name}</b><br><br>${opt.successMsg || 'İlişki güçlendi!'}<br><span class="green">+${delta} İlişki</span><br><span class="green">+3 Patron Morali</span>`);
        } else {
            let delta = opt.failPenalty || 0;
            g.relations[instId] = Math.max(0, (g.relations[instId] || 50) + delta);
            Engine.adjustMorale(-3, "Başarısız Görüşme");
            AudioSys.error();
            App.showModal("⚠️ ANLAŞMAZLIK!", `<b>${opt.name}</b><br><br>${opt.failMsg || 'Görüşme beklediğin gibi gitmedi.'}<br>${delta < 0 ? `<span class="red">${delta} İlişki</span>` : ''}<br><span class="red">-3 Patron Morali</span>`);
        }
        UI.update();
    },

    donateFoundation: (id) => {
        let g = App.state.g;
        let fDef = (typeof GameData !== 'undefined' && GameData.foundations) ? GameData.foundations[id] : null;
        if (!fDef) return;
        if (!g.foundations) g.foundations = { children: 0, green: 0, tech_edu: 0, animal: 0 };
        let curLevel = g.foundations[id] || 0;
        if (curLevel >= (fDef.maxLevel || 10)) {
            AudioSys.error();
            App.showNotify("Bu vakıf zaten maksimum seviyede!");
            return;
        }
        let cost = Math.floor(fDef.baseCost * Math.pow(1.5, curLevel));
        if (g.money >= cost) {
            Engine.spendMoney(cost);
            g.foundations[id] = curLevel + 1;
            let newLvl = g.foundations[id];

            if (fDef.effectPerLevel.pop) {
                g.popularity = Math.min(200, g.popularity + fDef.effectPerLevel.pop);
            }
            if (fDef.effectPerLevel.corporateRep) {
                g.corporateRep = (g.corporateRep || 0) + fDef.effectPerLevel.corporateRep;
            }
            if (fDef.effectPerLevel.ministerRel) {
                if (!g.relations) g.relations = { wholesaler: 50, minister: 50, mafia: 10 };
                g.relations.minister = Math.min(100, (g.relations.minister || 50) + fDef.effectPerLevel.ministerRel);
            }

            AudioSys.success();
            App.showModal(`🌟 ${fDef.name} Seviye ${newLvl}!`, `Bağışın için teşekkürler!<br>Etki: <b>${fDef.effectDesc}</b><br>Yeni Seviye: <b>${newLvl} / ${fDef.maxLevel}</b>`);
            Engine.checkQuests();
            UI.update();
        } else {
            AudioSys.error();
            App.showNotify(`Yetersiz bakiye! Gerekli: ${App.formatMoney(cost)}`);
        }
    },
    setFactoryItem: (id) => { App.state.g.factory.activeItem = id; AudioSys.click(); UI.update(); },

    acceptContract: (idx) => {
        let g = App.state.g;
        if(g.contracts.length >= 3) { AudioSys.error(); App.showNotify("Aynı anda en fazla 3 sözleşme alabilirsin."); return; }
        let c = g.availableContracts.splice(idx, 1)[0];
        
        if (c.isBribe) {
            Engine.earnMoney(c.reward);
            g.popularity = Math.max(0, g.popularity - 20);
            g.corporateRep = Math.max(0, (g.corporateRep || 0) - 15);
            if(!g.rivalDefeated) g.marketShare = Math.max(1.0, (g.marketShare || 5.0) - 3.0);
            Engine.addLog(`🕶️ Mafyanın rüşvetini kabul ettin! (+${App.formatMoney(c.reward)}, İtibar Düştü)`);
            AudioSys.cash(); App.showNotify("Rüşvet Alındı!"); UI.update();
            return;
        }
        
        g.contracts.push(c);
        AudioSys.buy(); App.showNotify("İhale kabul edildi! Zamanında teslim et."); UI.update();
    },

    fulfillContract: (idx) => {
        let g = App.state.g;
        let c = g.contracts[idx];
        if(g.inventory[c.item] >= c.qty) {
            g.inventory[c.item] -= c.qty;
            g.currentStorage -= (c.qty * GameData.products[c.item].space);
            Engine.earnMoney(c.reward);
            g.corporateRep = (g.corporateRep || 0) + 5;
            if (!g.stats) g.stats = { earned: 0, spent: 0, contractsCompleted: 0 };
            g.stats.contractsCompleted = (g.stats.contractsCompleted || 0) + 1;
            g.contracts.splice(idx, 1);
            Engine.addLog(`🤝 ${c.client} ihalesi başarıyla tamamlandı!`);
            AudioSys.success();
            App.showModal("🏆 İHALE TAMAMLANDI!", `${c.client} şirketine teslimat yapıldı.<br>Kazanılan: <span class="green">+${App.formatMoney(c.reward)}</span><br>Kurumsal İtibar: <span class="green">+5</span>`);
            Engine.checkQuests();
            UI.update();
        } else { AudioSys.error(); App.showNotify("Depoda yeterli mal yok!"); }
    },

    checkDailyLoginBonus: () => {
        let g = App.state.g;
        if (!g) return;
        let today = new Date().toISOString().slice(0, 10);
        if (g.lastLoginDate === today) return; // Already claimed today

        let isConsecutive = false;
        if (g.lastLoginDate) {
            let prevDate = new Date(g.lastLoginDate);
            let currDate = new Date(today);
            let diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) isConsecutive = true;
        }

        if (isConsecutive) {
            g.loginStreak = ((g.loginStreak || 1) % 7) + 1;
        } else {
            g.loginStreak = 1;
        }
        g.lastLoginDate = today;

        let rewards = [
            { day: 1, money: 1000, rp: 5, morale: 2 },
            { day: 2, money: 2500, rp: 10, morale: 4 },
            { day: 3, money: 5000, rp: 15, morale: 5 },
            { day: 4, money: 10000, rp: 25, morale: 8 },
            { day: 5, money: 20000, rp: 35, morale: 10 },
            { day: 6, money: 35000, rp: 50, morale: 15 },
            { day: 7, money: 75000, rp: 100, morale: 25, jackpot: true }
        ];

        let r = rewards[g.loginStreak - 1] || rewards[0];
        Engine.earnMoney(r.money);
        g.researchPoints = (g.researchPoints || 0) + r.rp;
        Engine.adjustMorale(r.morale, "Günlük Giriş Bonusu");

        let streakHtml = `<div style="display:flex; justify-content:center; gap:6px; margin:15px 0;">`;
        for (let i = 1; i <= 7; i++) {
            let active = i === g.loginStreak;
            let passed = i < g.loginStreak;
            streakHtml += `
                <div style="flex:1; padding:6px 2px; border-radius:10px; background:${active ? 'var(--primary)' : (passed ? 'rgba(46,204,113,0.2)' : 'rgba(0,0,0,0.05)')}; color:${active ? 'white' : 'var(--text)'}; border:${active ? '2px solid var(--primary-dark)' : '1px solid var(--border)'}; font-size:0.75rem; text-align:center;">
                    <div style="font-weight:900;">${i}.G</div>
                    <div style="font-size:1.1rem; margin:2px 0;">${i === 7 ? '🎁' : (passed ? '✅' : '⭐')}</div>
                    <div style="font-weight:bold;">${i === 7 ? '$75K' : '$' + (rewards[i-1].money / 1000) + 'K'}</div>
                </div>
            `;
        }
        streakHtml += `</div>`;

        let modalContent = `
            <div style="font-size:1.05rem; line-height:1.6;">
                Hoş geldin Patron! Giriş serisi: <b>${g.loginStreak}. Gün</b> 🔥<br>
                ${streakHtml}
                <div style="background:rgba(46, 204, 113, 0.1); border:1px solid rgba(46, 204, 113, 0.3); border-radius:12px; padding:12px; margin-top:10px;">
                    <div style="font-weight:900; color:var(--success); font-size:1.1rem;">Bugünün Ödülleri:</div>
                    <div style="font-weight:bold; margin-top:5px;">💵 +${App.formatMoney(r.money)} Nakit</div>
                    <div style="font-weight:bold; color:var(--purple);">🧪 +${r.rp} Ar-Ge Puanı (RP)</div>
                    <div style="font-weight:bold; color:var(--primary);">😎 +%${r.morale} Patron Morali</div>
                    ${r.jackpot ? '<div style="font-weight:900; color:var(--danger); margin-top:5px;">🎉 7. GÜN BÜYÜK İKRAMİYESİ ALINDI!</div>' : ''}
                </div>
            </div>
        `;

        setTimeout(() => {
            if (typeof AudioSys !== 'undefined') AudioSys.success();
            App.showModal("📅 GÜNLÜK GİRİŞ SERİSİ", modalContent);
        }, 600);
    },

    endDay: () => {
        AudioSys.endDay();
        let g = App.state.g;
        let dayPassedDateStr = `Ay ${g.month} / Hft ${g.week} / Gn ${g.day}`;
        g.logs = []; let revenue = 0, soldTotal = 0; g.currentTransportUsed = 0;
        
        let tabKasaLogs = [];
        let tabHaberlerLogs = [];
        let tabHukukLogs = [];
        let tabDuyurularLogs = [];

        const logKasa = (msg) => { Engine.addLog(msg); tabKasaLogs.push(`<div class="log-entry">${msg}</div>`); };
        const logHaber = (msg) => { Engine.addLog(msg); tabHaberlerLogs.push(`<div class="log-entry">${msg}</div>`); };
        const logHukuk = (msg) => { Engine.addLog(msg); tabHukukLogs.push(`<div class="log-entry">${msg}</div>`); };
        const logDuyuru = (msg) => { Engine.addLog(msg); tabDuyurularLogs.push(`<div class="log-entry">${msg}</div>`); };

        if(g.trendDaysLeft > 0) { 
            g.trendDaysLeft--; 
            if(g.trendDaysLeft === 0) g.trendActive = null; 
        } else { 
            if(Math.random() < 0.15) { 
                g.trendActive = GameData.marketTrends[Math.floor(Math.random() * GameData.marketTrends.length)]; 
                g.trendDaysLeft = 3 + Math.floor(Math.random() * 3); 
                logHaber(`🌍 YENİ TREND: ${g.trendActive.name}!`); 
            } 
        }
        
        if(Math.random() < 0.2) { 
            g.blackMarketActive = true; 
            let keys = Object.keys(GameData.products); 
            g.blackMarketItem = keys[Math.floor(Math.random() * keys.length)]; 
            logHaber(`🕵️ Karaborsa tüccarı şehre geldi! Alışveriş sekmesinden kaçak mal alabilirsin.`);
        } else { 
            g.blackMarketActive = false; 
        }
        
        // Incoming Cargo Processing
        if(g.incomingCargo) {
            let stillIncoming = [];
            for(let i=0; i<g.incomingCargo.length; i++) {
                let c = g.incomingCargo[i];
                c.daysLeft--;
                if(c.daysLeft <= 0) {
                    g.inventory[c.id] += c.qty;
                    logKasa(`📦 Kargo Teslim Edildi: ${c.qty}x ${GameData.products[c.id].name}`);
                } else {
                    stillIncoming.push(c);
                }
            }
            g.incomingCargo = stillIncoming;
        }
        
        // Factory Production Loop
        if(g.factory && g.factory.owned && g.factory.activeItem) {
            let p = GameData.products[g.factory.activeItem];
            if(p) {
                let spaceLimit = g.factory.level * 100;
                let produceQty = Math.max(1, Math.floor(spaceLimit / p.space));
                let cost = Math.floor(p.buy * 0.3) * produceQty;
                let actStore = g.storageCapacity; 
                if(g.skills && g.skills.storageOpt && g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
                
                if(g.money >= cost && g.currentStorage + (produceQty * p.space) <= actStore) {
                    Engine.spendMoney(cost);
                    g.inventory[g.factory.activeItem] += produceQty;
                    g.currentStorage += (produceQty * p.space);
                    logKasa(`🏭 Fabrika: ${produceQty}x ${p.name} üretildi (Maliyet: ${App.formatMoney(cost)})`);
                } else {
                    logDuyuru(`⚠️ Fabrika durdu! (Yetersiz bakiye veya depo alanı)`);
                }
            }
        }

        // B2B Contracts Daily Loop
        if(!g.availableContracts) g.availableContracts = [];
        if(!g.contracts) g.contracts = [];
        
        if (g.availableContracts.length < 3 && Math.random() < 0.4) {
            if (Math.random() < 0.2) {
                let bribeAmt = 15000 + Math.floor(Math.random() * 35000);
                g.availableContracts.push({
                    client: "🕶️ Mafya Bağlantısı", item: "apple", qty: 0, reward: bribeAmt, penalty: 0, days: 2, isBribe: true
                });
                logDuyuru(`🕶️ Mafyadan gizli bir 'teklif' geldi! (B2B sekmesine bak)`);
            } else {
                let clients = ["Belediye", "Lüks Otel", "Okul Kantini", "Hastane", "Plaza", "Askeriye", "Festival Organizatörü"];
                let keys = Object.keys(GameData.products).filter(k => g.unlocked[k]);
                if(keys.length > 0) {
                    let item = keys[Math.floor(Math.random() * keys.length)];
                    let p = GameData.products[item];
                    let qty = 20 + Math.floor(Math.random() * 80);
                    if(item === 'car' || item === 'tv' || item === 'furniture') qty = 2 + Math.floor(Math.random() * 5); 
                    let reward = Math.floor(p.sell * qty * (1.2 + Math.random() * 0.5)); 
                    let penalty = Math.floor(reward * 0.5);
                    g.availableContracts.push({
                        client: clients[Math.floor(Math.random() * clients.length)],
                        item: item, qty: qty, reward: reward, penalty: penalty, days: 3 + Math.floor(Math.random()*4)
                    });
                    logDuyuru(`🤝 Yeni B2B İhalesi teklifi geldi!`);
                }
            }
        }
        
        let newContracts = [];
        for(let i=0; i<g.contracts.length; i++) {
            let c = g.contracts[i];
            c.days--;
            if(c.days <= 0) {
                Engine.spendMoney(c.penalty);
                g.corporateRep = Math.max(0, (g.corporateRep||0) - 10);
                logDuyuru(`❌ İhale BAŞARISIZ! ${c.client} firmasına teslimat yetişmedi. <span class="red">-${App.formatMoney(c.penalty)} ceza</span>`);
            } else {
                newContracts.push(c);
            }
        }
        g.contracts = newContracts;

        let cheapCount = 0; let expCount = 0;
        for(let k in GameData.products) {
            if(!g.unlocked[k]) continue;
            let p = GameData.products[k];
            let sp = (g.customPrice && g.customPrice[k] !== undefined) ? g.customPrice[k] : p.sell;
            if(sp <= Math.floor(p.sell * 0.8)) cheapCount++;
            else if(sp >= Math.floor(p.sell * 1.25)) expCount++;
        }
        
        if(!g.rivalDefeated) {
            let shareGrowth = (g.popularity - 50) / 200;
            shareGrowth += (cheapCount * 0.10); shareGrowth -= (expCount * 0.10);
            shareGrowth += (g.marketingDaysLeft > 0 ? 0.2 : 0);
            g.marketShare = (g.marketShare || 5.0) + shareGrowth;
            if(g.marketShare < 1.0) g.marketShare = 1.0;
            if(g.marketShare > 99.0) g.marketShare = 99.0;
        }

        let mBoost = g.marketingBoost; 
        if(g.skills && g.skills.marketingPro && g.skills.marketingPro.unlocked) mBoost *= 1.5;
        let currentPop = Math.min(200, Math.max(1, Engine.getBasePop() + (g.marketingDaysLeft > 0 ? mBoost : 0)));
        if (g.marketingDaysLeft > 0) g.marketingDaysLeft--;
        
        let fpDemandBonus = 1 + (g.franchisePoints * 0.10); 
        let fpProfitBonus = 1 + (g.franchisePoints * 0.10);
        let repBonus = 1 + ((g.corporateRep || 0) * 0.01); 
        let marketShareMod = g.rivalDefeated ? 2.5 : (0.5 + ((g.marketShare||5) / 100)); 
        let childDemandBonus = (g.foundations && g.foundations.children) ? (1 + (g.foundations.children * 0.03)) : 1.0;
        
        // Boss morale modifies daily customer demand
        let bossMoraleMod = 0.7 + (((g.bossMorale !== undefined) ? g.bossMorale : 80) / 100) * 0.5;
        let demandMult = (currentPop / 50) * fpDemandBonus * marketShareMod * repBonus * childDemandBonus * bossMoraleMod; 
        let cashierBonus = (g.staff && g.staff.cashier ? g.staff.cashier : 0) * 5;

        for (let k in GameData.products) {
            if (g.inventory[k] > 0) {
                let p = GameData.products[k]; 
                let sellPrice = p.sell;
                if(g.customPrice && g.customPrice[k] !== undefined) sellPrice = g.customPrice[k];
                else {
                    let priceMode = g.pricing ? g.pricing[k] : null;
                    if(priceMode === 'cheap') sellPrice = Math.floor(p.sell * 0.7);
                    else if(priceMode === 'expensive') sellPrice = Math.floor(p.sell * 1.5);
                    if(!g.customPrice) g.customPrice = {};
                    g.customPrice[k] = sellPrice;
                }
                
                let demandMod = 1.0;
                let priceRatio = sellPrice / p.sell;
                
                if (priceRatio > 1.0) demandMod = Math.max(0.05, 1.0 - ((priceRatio - 1.0) * 1.2));
                else if (priceRatio < 1.0) demandMod = Math.min(3.0, 1.0 + ((1.0 - priceRatio) * 1.5));
                
                if(g.trendActive && g.trendActive.effect[p.category]) demandMod *= g.trendActive.effect[p.category];

                let maxDemand = Math.floor((p.demand + cashierBonus) * demandMult * demandMod);
                let sold = Math.min(g.inventory[k], maxDemand);
                
                if (sold > 0) {
                    let actualSellPrice = Math.floor(sellPrice * fpProfitBonus);
                    let rev = sold * actualSellPrice;
                    Engine.earnMoney(rev); revenue += rev; soldTotal += sold;
                    g.inventory[k] -= sold; g.currentStorage -= (sold * p.space);
                    logKasa(`🛒 ${p.name}: ${sold} satıldı (+${App.formatMoney(rev)})`);
                }
            }
        }

        let expenses = 0; 
        let managerDiscount = (g.staff && g.staff.manager > 0) ? 0.8 : 1.0; 
        let hrWageMod = (g.skills && g.skills.hrExpert && g.skills.hrExpert.unlocked) ? 0.9 : 1.0;
        
        let totalWages = 0;
        for (let k in GameData.staffTypes) {
            let count = (g.staff && g.staff[k]) ? g.staff[k] : 0;
            totalWages += count * (GameData.staffTypes[k].wage * managerDiscount * hrWageMod);
        }
        expenses += totalWages;
        if (totalWages > 0) logKasa(`👥 Personel Maaşları: -${App.formatMoney(totalWages)}`);

        // Staff Insurance (SGK) vs Resignation
        let totalStaff = Engine.getTotalStaffCount();
        if (g.staffInsurance) {
            let insCost = totalStaff * 15;
            expenses += insCost;
            if (insCost > 0) logKasa(`🛡️ SGK Personel Sigortası: -${App.formatMoney(insCost)} (${totalStaff} personel korundu)`);
        } else if (totalStaff > 5) {
            let resignChance = 0.12 + ((g.bossMorale || 80) < 50 ? 0.15 : 0);
            if (Math.random() < resignChance) {
                let hiredKeys = Object.keys(GameData.staffTypes).filter(k => (g.staff && g.staff[k] > 0));
                if (hiredKeys.length > 0) {
                    let rKey = hiredKeys[Math.floor(Math.random() * hiredKeys.length)];
                    g.staff[rKey]--;
                    Engine.adjustMorale(-4, "Personel İstifası");
                    logDuyuru(`🚪 <b>PERSONEL İSTİFASI!</b> Sigortasız koşullar nedeniyle 1x ${GameData.staffTypes[rKey].name} istifa etti! (-4 Moral)`);
                }
            }
        }
        
        // Active Loans Processing
        if (!g.activeLoans) g.activeLoans = [];
        if (g.loan > 0) {
            g.activeLoans.push({ amount: g.loan, total: g.loan, dailyPayment: Math.floor(g.loan/10), daysLeft: 10, type: 'Eski Kredi' });
            g.loan = 0;
        }
        for (let i = g.activeLoans.length - 1; i >= 0; i--) {
            let l = g.activeLoans[i];
            let payAmt = Math.min(l.dailyPayment, l.total);
            expenses += payAmt;
            l.total -= payAmt;
            l.daysLeft--;
            logKasa(`💳 ${l.type} Taksiti: -${App.formatMoney(payAmt)} (${Math.max(0, l.daysLeft)} gün kaldı)`);
            if (l.daysLeft <= 0 || l.total <= 0) {
                logDuyuru(`🎉 ${l.type} tamamen kapandı!`);
                g.activeLoans.splice(i, 1);
            }
        }

        // Lawyer & Lawsuits Processing
        if(!g.lawsuits) g.lawsuits = [];
        if(!g.lawyerLevel) g.lawyerLevel = 0;
        
        let lawyerFees = [0, 200, 1000, 4000];
        let lawyerWinRates = [10, 40, 70, 95];
        
        if (g.lawyerRaise) {
            expenses += 1000;
            logHukuk(`⚖️ Avukat Primi & Zammı: -$1,000 (+%20 Ekstra Zafer Şansı)`);
        }
        if (g.lawyerLevel > 0) {
            let fee = lawyerFees[g.lawyerLevel];
            expenses += fee;
            logHukuk(`⚖️ Avukatlık Ücreti: -${App.formatMoney(fee)}`);
        }
        
        for (let i = g.lawsuits.length - 1; i >= 0; i--) {
            let law = g.lawsuits[i];
            law.daysLeft--;
            if (law.daysLeft <= 0) {
                let winChance = lawyerWinRates[g.lawyerLevel] + (g.lawyerRaise ? 20 : 0);
                if (Math.random() * 100 <= winChance) {
                    Engine.adjustMorale(5, "Mahkeme Zaferi");
                    logHukuk(`🧑‍⚖️ <b>MAHKEME KAZANILDI!</b> Avukatın sayesinde "${law.type}" davası düştü! (+5 Moral)`);
                } else {
                    let penalty = Math.floor(law.cost * 1.5);
                    expenses += penalty;
                    g.popularity = Math.max(0, g.popularity - 10);
                    Engine.adjustMorale(-8, "Mahkeme Kaybı");
                    logHukuk(`👨‍⚖️ <b>MAHKEME KAYBEDİLDİ!</b> "${law.type}" davası sonuçlandı: <span class="red">-${App.formatMoney(penalty)}</span> (-8 Moral)`);
                }
                g.lawsuits.splice(i, 1);
            } else {
                logHukuk(`⚖️ "${law.type}" duruşmasına ${law.daysLeft} gün kaldı. (Duruşmada Zar Atabilirsin)`);
            }
        }

        if (g.deposits > 0) { 
            let earned = Math.floor(g.deposits * 0.02); 
            g.deposits += earned; 
            logKasa(`🏦 Mevduat Faizi Getirisi: <span class="green">+${App.formatMoney(earned)}</span>`);
        }
        if (g.insurance) {
            expenses += 50;
            logKasa(`🛡️ Dükkan Yangın Sigortası: -$50`);
        }

        // RP kazanımı
        let rpGain = Math.floor(revenue / 20000) + Math.floor(soldTotal / 50) + 1;
        if (g.foundations && g.foundations.tech_edu > 0) {
            let fRp = g.foundations.tech_edu * 2;
            rpGain += fRp;
            logDuyuru(`💡 Teknoloji Vakfı Katkısı: +${fRp} RP üretildi.`);
        }
        g.researchPoints = (g.researchPoints || 0) + rpGain;
        if(rpGain > 0) logDuyuru(`🧪 +${rpGain} RP Kazanıldı`);

        g.day++; 
        if (g.day > 7) { 
            g.day = 1; g.week++; 
            // HAFTALIK VERGİ (TAX)
            let taxRate = 0.10;
            if(g.relations && g.relations.minister >= 80) taxRate = 0;
            else if(g.relations && g.relations.minister < 30) taxRate = 0.20;
            
            if (g.foundations && g.foundations.green > 0) {
                taxRate = Math.max(0, taxRate - (g.foundations.green * 0.02));
            }
            
            let tax = Math.floor(g.money * taxRate);
            if(tax > 0) { 
                expenses += tax; 
                logKasa(`🏛️ Haftalık Kurumlar Vergisi: -${App.formatMoney(tax)}`); 
            } else if (taxRate <= 0) { 
                logKasa(`🏛️ Bakanlık & Çevre Vakfı muafiyeti sayesinde bu hafta VERGİ ÖDEMEDİNİZ!`); 
            }

            // Haftalık kurum ilişkileri yıpranması
            if (g.relations && typeof GameData !== 'undefined' && GameData.institutions) {
                for (let instKey in GameData.institutions) {
                    let dec = GameData.institutions[instKey].weeklyDecay || 2;
                    g.relations[instKey] = Math.max(0, (g.relations[instKey] || 50) - dec);
                }
                logDuyuru(`📉 Haftalık kurum ilişkileri doğal olarak yıprandı.`);
            }

            // Haftalık Şehir Piyangosu (Re-engagement / Retention)
            if (Math.random() < 0.35) {
                let lotteryPrize = (Math.random() < 0.1) ? 50000 : (5000 + Math.floor(Math.random() * 15000));
                Engine.earnMoney(lotteryPrize); 
                revenue += lotteryPrize;
                Engine.adjustMorale(8, "Şehir Piyangosu");
                logDuyuru(`🎰 <b>ŞEHİR PİYANGOSU TALİHLİSİ!</b> Piyango biletine <span class="green">+${App.formatMoney(lotteryPrize)}</span> ikramiye çıktı! (+8 Moral)`);
            }

            // Haftalık Borsa Temettü Geliri (Hisse senedi sahiplerine)
            let portVal = 0;
            for (let s in g.stocks) {
                if (g.stocks[s]) portVal += (g.stocks[s].shares || 0) * (g.stocks[s].price || 0);
            }
            if (portVal > 0) {
                let dividend = Math.floor(portVal * 0.04);
                if (dividend > 0) {
                    Engine.earnMoney(dividend);
                    revenue += dividend;
                    logKasa(`📈 Haftalık Borsa Temettü Geliri: <span class="green">+${App.formatMoney(dividend)}</span> (%4 Temettü)`);
                }
            }
        } 
        if (g.week > 4) { g.week = 1; g.month++; }
        
        Engine.spendMoney(expenses);

        for(let s in g.stocks) {
            if(!g.stocks[s]) continue;
            g.stocks[s].oldPrice = g.stocks[s].price; 
            let volatility = s === 'megatech' ? 0.25 : (s === 'foodco' ? 0.10 : (s === 'doge' ? 0.50 : 0.03)); 
            let change = 1 + (Math.random() * volatility * 2 - volatility);
            if(g.trendActive && g.trendActive.id === 'crypto' && s === 'doge') change *= 1.5;
            g.stocks[s].price = Math.max(1, Math.floor(g.stocks[s].price * change));
        }

        if ((g.staff && g.staff.janitor||0) === 0 && soldTotal > 50 && Math.random() > 0.5) g.popularity -= 2;
        else if ((g.staff && g.staff.janitor||0) > 0 && g.popularity < Engine.getBasePop()+50) g.popularity += 1;

        if(!g.modifiers) g.modifiers = {buyMod:1};
        let bMod = 1.0;
        if(g.relations && g.relations.wholesaler >= 80) bMod = 0.8;
        else if(g.relations && g.relations.wholesaler < 30) bMod = 1.3;
        g.modifiers.buyMod = bMod;

        if (Math.random() < 0.45) {
            let r = Math.random();
            if (r < 0.15 && !g.rivalDefeated && (g.marketShare||0) > 20) { 
                g.popularity -= 5; g.marketShare -= 2.0; 
                logHaber(`📉 Rakip agresif kampanya yaptı! Popülarite ve Pazar Payı düştü.`); 
            }
            else if (r < 0.3) { 
                if (g.relations && g.relations.mafia >= 80 && !g.rivalDefeated) {
                    g.marketShare += 2.0;
                    logHaber(`🕶️ Mafya rakibin nakliye aracını durdurdu. Pazar payın arttı!`);
                } else if (g.relations && g.relations.mafia < 30) {
                    let loss = Math.floor(g.money * 0.15) + 500; 
                    if(g.money < loss) loss = g.money; 
                    Engine.spendMoney(loss); expenses += loss; 
                    logDuyuru(`🕶️ Mafya dükkana haraç kesti! Zarar: -${App.formatMoney(loss)}`); 
                } else {
                    if((g.staff && g.staff.guard||0) === 0) { 
                        let loss = Math.floor(g.money * 0.1) + 100; 
                        if(g.money < loss) loss = g.money; 
                        Engine.spendMoney(loss); expenses += loss; 
                        logDuyuru(`🦹 Marketten Hırsızlık Yapıldı! Zarar: -${App.formatMoney(loss)}`); 
                    } else {
                        let fine = 500 * g.staff.guard;
                        Engine.earnMoney(fine); revenue += fine;
                        logKasa(`👮 Güvenlik Görevlisi hırsızı suçüstü yakaladı! Tazminat: <span class="green">+${App.formatMoney(fine)}</span>`);
                    }
                }
            }
            else if (r < 0.45) { 
                if(!g.insurance) { 
                    let lost = Math.floor((g.inventory.apple||0)/2); 
                    g.inventory.apple -= lost; g.currentStorage -= lost; 
                    logDuyuru(`🔥 Depoda Küçük Yangın Çıktı! Malların bir kısmı ziyan oldu.`); 
                } 
            }
            else if (r < 0.7) {
                // LAWSUIT GENERATION
                let accidents = [
                    { type: "Müşteri Reyonda Kayıp Düştü", baseCost: 15000, preventable: true },
                    { type: "Bozuk Ürün Zehirlenmesi", baseCost: 35000, preventable: false },
                    { type: "Personel Hakareti Davası", baseCost: 8000, preventable: false },
                    { type: "Hatalı Ürün Patlaması", baseCost: 25000, preventable: false }
                ];
                let acc = accidents[Math.floor(Math.random() * accidents.length)];
                if (acc.preventable && (g.staff && g.staff.janitor||0) > 0) {
                    logDuyuru(`🧹 Temizlikçi ıslak zemini anında silerek olası düşme davasını engelledi!`);
                } else {
                    let courtDays = Math.floor(Math.random() * 3) + 3;
                    g.lawsuits.push({ type: acc.type, cost: acc.baseCost, daysLeft: courtDays });
                    logHukuk(`🚨 <b>DAVA AÇILDI!</b> "${acc.type}" davası açıldı. Talep: ${App.formatMoney(acc.baseCost)}. Duruşmaya: ${courtDays} gün.`);
                    setTimeout(() => App.showNotify("ŞİRKETE DAVA AÇILDI!", 'error'), 1000);
                }
            }
        }
        
        // Manager Ability: Free Stock Negotiation
        if ((g.staff && g.staff.manager||0) > 0 && Math.random() < 0.15) {
            let pkeys = Object.keys(GameData.products).filter(k => g.unlocked[k]);
            if (pkeys.length > 0) {
                let rItem = pkeys[Math.floor(Math.random() * pkeys.length)];
                let qty = Math.floor(Math.random() * 50) + 10;
                let reqSpace = GameData.products[rItem].space * qty;
                if (g.currentStorage + reqSpace <= g.storageCapacity) {
                    g.inventory[rItem] += qty;
                    g.currentStorage += reqSpace;
                    logKasa(`👔 Müdür tedarikçiyle pazarlık yaparak ${qty}x ${GameData.products[rItem].name} BEDAVA aldı!`);
                }
            }
        }

        // DÜNYADAN HABERLER SİSTEMİ
        if(Math.random() < 0.20 && typeof GameData !== 'undefined' && GameData.news && GameData.news.length > 0) {
            let ev = GameData.news[Math.floor(Math.random() * GameData.news.length)];
            if(ev.effects) {
                if(ev.effects.buyMod !== undefined) g.modifiers.buyMod = ev.effects.buyMod;
                if(ev.effects.popChange) g.popularity = Math.min(200, Math.max(1, g.popularity + ev.effects.popChange));
                if(ev.effects.moneyChange) {
                    Engine.earnMoney(ev.effects.moneyChange);
                    revenue += ev.effects.moneyChange;
                }
                if(ev.effects.marketShareChange && !g.rivalDefeated) {
                    g.marketShare = Math.min(99.0, Math.max(1.0, (g.marketShare || 5.0) + ev.effects.marketShareChange));
                }
                if(ev.effects.taxRefundPercent) {
                    let ref = Math.floor(g.money * ev.effects.taxRefundPercent);
                    Engine.earnMoney(ref);
                    revenue += ref;
                }
            }
            logHaber(`📰 <b>${ev.title}:</b> ${ev.desc}`);
        }

        // Morale impact from daily net profit / loss
        let netProfit = revenue - expenses;
        if (netProfit > 0) {
            let mBoost = Math.min(5, Math.max(1, Math.floor(netProfit / 5000)));
            Engine.adjustMorale(mBoost, "Günlük Kar");
            logKasa(`📈 Günlük Net Kar: <span class="green">+${App.formatMoney(netProfit)}</span> (+${mBoost} Moral)`);
        } else {
            let mLoss = Math.min(8, Math.max(2, Math.floor(Math.abs(netProfit) / 3000)));
            Engine.adjustMorale(-mLoss, "Günlük Zarar");
            logKasa(`📉 Günlük Net Zarar: <span class="red">-${App.formatMoney(Math.abs(netProfit))}</span> (-${mLoss} Moral)`);
        }

        let reviews = [];
        if(cheapCount > 2) reviews.push("Fiyatlar o kadar ucuz ki toptancı sandım! ⭐⭐⭐⭐⭐");
        if(expCount > 2) reviews.push("Fiyatlar ateş pahası. Burası saray mı market mi? ⭐");
        if((g.staff && g.staff.janitor||0) === 0 && Math.random()>0.5) reviews.push("İçerisi çok pisti, her yerde toz var. ⭐⭐");
        if((g.staff && g.staff.cashier||0) > 2 && Math.random()>0.5) reviews.push("Kasa sırası hiç beklemedim, kasiyerler jet gibi. ⭐⭐⭐⭐");
        if(g.foundations && g.foundations.animal > 0 && Math.random() > 0.4) reviews.push("Hayvan barınaklarına bağış yapan duyarlı bir market, bayılıyorum! ⭐⭐⭐⭐⭐");
        if(reviews.length === 0) reviews.push("Normal bir alışveriş deneyimiydi. Fena değil. ⭐⭐⭐");
        let randomReview = reviews[Math.floor(Math.random()*reviews.length)];
        if(!g.reviews) g.reviews = [];
        g.reviews.unshift({ date: dayPassedDateStr, text: randomReview });
        if(g.reviews.length > 20) g.reviews.pop();

        if(!g.history) g.history = [];
        g.history.unshift({
            date: dayPassedDateStr,
            revenue: revenue,
            expenses: expenses,
            logs: [...g.logs]
        });
        if (g.history.length > 30) g.history.pop();

        g.lastDayReport = {
            revenue: revenue,
            expenses: expenses,
            netProfit: netProfit,
            randomReview: randomReview,
            tabKasa: tabKasaLogs,
            tabHaberler: tabHaberlerLogs,
            tabHukuk: tabHukukLogs,
            tabDuyurular: tabDuyurularLogs
        };

        Engine.checkQuests();
        App.saveGame(false);
        
        setTimeout(() => AudioSys.cash(), 400);
        UI.showEndDayModal();
        UI.update();
    }
};
