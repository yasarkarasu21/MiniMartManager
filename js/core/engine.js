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
    
    unlockDept: (id) => { let g = App.state.g; if (g.money >= GameData.products[id].unlock) { Engine.spendMoney(GameData.products[id].unlock); g.unlocked[id] = true; AudioSys.success(); App.showNotify("Reyon açıldı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    hireStaff: (id) => { 
        let g = App.state.g; 
        if(!g.staff) g.staff = { cashier: 0, guard: 0, janitor: 0, warehouse: 0, manager: 0 };
        if(g.staff[id] === undefined || isNaN(g.staff[id])) g.staff[id] = 0;
        if (g.money >= GameData.staffTypes[id].cost) { Engine.spendMoney(GameData.staffTypes[id].cost); g.staff[id]++; AudioSys.buy(); App.showNotify("İşe alındı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } 
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
            UI.update(); 
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } 
    },
    buyVehicle: (id) => { let g = App.state.g; if(g.money >= g.fleet[id].cost) { Engine.spendMoney(g.fleet[id].cost); g.fleet[id].count++; AudioSys.buy(); App.showNotify(`${g.fleet[id].name} alındı!`); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    
    upgradeBuilding: () => {
        let g = App.state.g; let next = g.buildingLevel + 1;
        if (GameData.buildings[next] && g.money >= GameData.buildings[next].cost) {
            Engine.spendMoney(GameData.buildings[next].cost); g.buildingLevel = next;
            AudioSys.success(); App.showModal("🏢 BÜYÜK AÇILIŞ!", `Tebrikler, yeni dükkanına geçtin: ${GameData.buildings[next].name}!`); UI.update();
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
    depositMoney: (amt) => { let g = App.state.g; if(g.money >= amt) { Engine.spendMoney(amt); g.deposits += amt; AudioSys.cash(); App.showNotify("Mevduata eklendi."); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    withdrawMoney: (amt) => { let g = App.state.g; if(g.deposits > 0) { let w = Math.min(amt, g.deposits); g.deposits -= w; Engine.earnMoney(w); AudioSys.cash(); App.showNotify("Para çekildi."); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    buyStock: (id) => { let g = App.state.g; if (g.money >= g.stocks[id].price) { Engine.spendMoney(g.stocks[id].price); g.stocks[id].shares++; AudioSys.buy(); App.showNotify("Hisse alındı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); } },
    sellStock: (id) => { let g = App.state.g; if (g.stocks[id].shares > 0) { g.stocks[id].shares--; Engine.earnMoney(g.stocks[id].price); AudioSys.cash(); App.showNotify("Hisse satıldı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Hisse yok!"); } },
    unlockSkill: (id) => { let g = App.state.g; if(g.researchPoints >= g.skills[id].cost) { g.researchPoints -= g.skills[id].cost; g.skills[id].unlocked = true; AudioSys.success(); App.showNotify("Yetenek açıldı!"); UI.update(); } else { AudioSys.error(); App.showNotify("Yetersiz RP!"); } },
    
    checkQuests: () => {
        let g = App.state.g;
        if(!g || !g.quests) return;
        
        let newlyCompleted = [];
        
        if(g.quests.q1 && !g.quests.q1.done && g.money >= g.quests.q1.reqMoney) { g.quests.q1.done = true; newlyCompleted.push(g.quests.q1); }
        if(g.quests.q2 && !g.quests.q2.done && g.stocks.gold && g.stocks.gold.shares >= g.quests.q2.reqGold) { g.quests.q2.done = true; newlyCompleted.push(g.quests.q2); }
        if(g.quests.q3 && !g.quests.q3.done && g.fleet && g.fleet.truck && g.fleet.truck.count > 0) { g.quests.q3.done = true; newlyCompleted.push(g.quests.q3); }
        if(g.quests.q4 && !g.quests.q4.done && g.buildingLevel >= 2) { g.quests.q4.done = true; newlyCompleted.push(g.quests.q4); }
        if(g.quests.q5 && !g.quests.q5.done && (g.inventory.car > 0 || g.unlocked.car)) { g.quests.q5.done = true; newlyCompleted.push(g.quests.q5); }
        
        if(g.quests.q6 && !g.quests.q6.done && g.staff.cashier >= g.quests.q6.reqCashier) { g.quests.q6.done = true; newlyCompleted.push(g.quests.q6); }
        if(g.quests.q7 && !g.quests.q7.done && Engine.getBasePop() >= g.quests.q7.reqPop) { g.quests.q7.done = true; newlyCompleted.push(g.quests.q7); }
        if(g.quests.q8 && !g.quests.q8.done && g.unlocked.laptop) { g.quests.q8.done = true; newlyCompleted.push(g.quests.q8); }
        if(g.quests.q9 && !g.quests.q9.done && g.money >= g.quests.q9.reqMoney2) { g.quests.q9.done = true; newlyCompleted.push(g.quests.q9); }
        if(g.quests.q10 && !g.quests.q10.done && g.fleet && g.fleet.plane && g.fleet.plane.count > 0) { g.quests.q10.done = true; newlyCompleted.push(g.quests.q10); }
        if(g.quests.q11 && !g.quests.q11.done && g.staff && g.staff.guard >= g.quests.q11.reqGuard) { g.quests.q11.done = true; newlyCompleted.push(g.quests.q11); }
        if(g.quests.q12 && !g.quests.q12.done && (g.corporateRep || 0) >= g.quests.q12.reqRep) { g.quests.q12.done = true; newlyCompleted.push(g.quests.q12); }
        if(g.quests.q13 && !g.quests.q13.done && g.relations && g.relations.mafia >= g.quests.q13.reqMafia) { g.quests.q13.done = true; newlyCompleted.push(g.quests.q13); }
        if(g.quests.q14 && !g.quests.q14.done && g.money >= g.quests.q14.reqMoney3) { g.quests.q14.done = true; newlyCompleted.push(g.quests.q14); }
        if(g.quests.q15 && !g.quests.q15.done && g.rivalDefeated) { g.quests.q15.done = true; newlyCompleted.push(g.quests.q15); }
        if (newlyCompleted.length > 0) {
            newlyCompleted.forEach(q => {
                if(typeof AudioSys !== 'undefined') AudioSys.success();
                App.showNotify(`Görev Tamamlandı: ${q.title}!`, 'success');
            });
            
            let allDone = true;
            for(let key in g.quests) {
                if(!g.quests[key].done) { allDone = false; break; }
            }
            if(allDone && !g.allQuestsCompletedNotified) {
                g.allQuestsCompletedNotified = true;
                setTimeout(() => {
                    App.showModal("🏆 TÜM GÖREVLER TAMAMLANDI!", "Tebrikler! Oyundaki tüm hedeflere ulaştın ve gerçek bir iş insanı olduğunu kanıtladın.");
                }, 1000);
            }
        }
    },
    claimQuest: (id) => { let g = App.state.g; if(g.quests[id].done && !g.quests[id].claimed) { g.quests[id].claimed = true; g.researchPoints += g.quests[id].rp; AudioSys.success(); App.showNotify(`Görev Tamamlandı! +${g.quests[id].rp} RP`); UI.update(); } },
    
    buyoutRival: () => {
        let g = App.state.g;
        if(g.money >= 1000000 && g.marketShare >= 99) {
            Engine.spendMoney(1000000);
            g.rivalDefeated = true; g.marketShare = 100.0;
            AudioSys.success();
            App.showModal("🏆 TEKEL OLDUN!", "HyperMart'ı 1 Milyon Dolara satın aldın. Artık şehirdeki TEK market sensin!");
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
            g.contracts.splice(idx, 1);
            Engine.addLog(`🤝 ${c.client} ihalesi başarıyla tamamlandı!`);
            AudioSys.success();
            App.showModal("🏆 İHALE TAMAMLANDI!", `${c.client} şirketine teslimat yapıldı.<br>Kazanılan: <span class="green">+${App.formatMoney(c.reward)}</span><br>Kurumsal İtibar: <span class="green">+5</span>`);
            UI.update();
        } else { AudioSys.error(); App.showNotify("Depoda yeterli mal yok!"); }
    },

    endDay: () => {
        AudioSys.endDay();
        let g = App.state.g;
        let dayPassedDateStr = `Ay ${g.month} / Hft ${g.week} / Gn ${g.day}`;
        g.logs = []; let revenue = 0, soldTotal = 0; g.currentTransportUsed = 0;
        
        if(g.trendDaysLeft > 0) { g.trendDaysLeft--; if(g.trendDaysLeft === 0) g.trendActive = null; } 
        else { if(Math.random() < 0.15) { g.trendActive = GameData.marketTrends[Math.floor(Math.random() * GameData.marketTrends.length)]; g.trendDaysLeft = 3 + Math.floor(Math.random() * 3); Engine.addLog(`🌍 YENİ TREND: ${g.trendActive.name}!`); } }
        
        if(Math.random() < 0.2) { g.blackMarketActive = true; let keys = Object.keys(GameData.products); g.blackMarketItem = keys[Math.floor(Math.random() * keys.length)]; } 
        else { g.blackMarketActive = false; }
        
        // Incoming Cargo Processing
        if(g.incomingCargo) {
            let stillIncoming = [];
            for(let i=0; i<g.incomingCargo.length; i++) {
                let c = g.incomingCargo[i];
                c.daysLeft--;
                if(c.daysLeft <= 0) {
                    g.inventory[c.id] += c.qty;
                    Engine.addLog(`📦 Kargo Teslim Edildi: ${c.qty}x ${GameData.products[c.id].name}`);
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
                
                let actStore = g.storageCapacity; if(g.skills && g.skills.storageOpt && g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
                
                if(g.money >= cost && g.currentStorage + (produceQty * p.space) <= actStore) {
                    Engine.spendMoney(cost);
                    g.inventory[g.factory.activeItem] += produceQty;
                    g.currentStorage += (produceQty * p.space);
                    Engine.addLog(`🏭 Fabrika: ${produceQty}x ${p.name} üretildi (Maliyet: ${App.formatMoney(cost)})`);
                } else {
                    Engine.addLog(`⚠️ Fabrika durdu! (Yetersiz bakiye veya depo alanı)`);
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
                Engine.addLog(`🕶️ Mafyadan reddedemeyeceğin bir 'teklif' geldi! (B2B sekmesine bak)`);
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
                    Engine.addLog(`🤝 Yeni B2B İhalesi teklifi geldi!`);
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
                Engine.addLog(`❌ İhale BAŞARISIZ! ${c.client} firmasına söz verilen mallar gitmedi. <span class="red">-${App.formatMoney(c.penalty)} ceza yedin.</span>`);
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

        let mBoost = g.marketingBoost; if(g.skills && g.skills.marketingPro && g.skills.marketingPro.unlocked) mBoost *= 1.5;
        let currentPop = Math.min(200, Math.max(1, Engine.getBasePop() + (g.marketingDaysLeft > 0 ? mBoost : 0)));
        if (g.marketingDaysLeft > 0) g.marketingDaysLeft--;
        
        let fpDemandBonus = 1 + (g.franchisePoints * 0.10); let fpProfitBonus = 1 + (g.franchisePoints * 0.10);
        let repBonus = 1 + ((g.corporateRep || 0) * 0.01); 
        let marketShareMod = g.rivalDefeated ? 2.5 : (0.5 + ((g.marketShare||5) / 100)); 
        let demandMult = (currentPop / 50) * fpDemandBonus * marketShareMod * repBonus; 
        let cashierBonus = g.staff.cashier * 5;

        for (let k in GameData.products) {
            if (g.inventory[k] > 0) {
                let p = GameData.products[k]; 
                let sellPrice = p.sell;
                if(g.customPrice && g.customPrice[k] !== undefined) sellPrice = g.customPrice[k];
                else {
                    // Legacy migration
                    let priceMode = g.pricing[k];
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
                    Engine.addLog(`🛒 ${p.name}: ${sold} satıldı (+${App.formatMoney(rev)})`);
                }
            }
        }

        let expenses = 0; let managerDiscount = g.staff.manager > 0 ? 0.8 : 1.0; let hrWageMod = (g.skills && g.skills.hrExpert && g.skills.hrExpert.unlocked) ? 0.9 : 1.0;
        for (let k in GameData.staffTypes) expenses += (g.staff[k]||0) * (GameData.staffTypes[k].wage * managerDiscount * hrWageMod);
        
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
            Engine.addLog(`💳 ${l.type} Taksiti: -${App.formatMoney(payAmt)} (${Math.max(0, l.daysLeft)} gün kaldı)`);
            if (l.daysLeft <= 0 || l.total <= 0) {
                Engine.addLog(`🎉 ${l.type} başarıyla kapatıldı!`);
                g.activeLoans.splice(i, 1);
            }
        }

        // Lawyer & Lawsuits Processing
        if(!g.lawsuits) g.lawsuits = [];
        if(!g.lawyerLevel) g.lawyerLevel = 0;
        
        let lawyerFees = [0, 200, 1000, 4000];
        let lawyerWinRates = [10, 40, 70, 95];
        if (g.lawyerLevel > 0) {
            let fee = lawyerFees[g.lawyerLevel];
            expenses += fee;
            Engine.addLog(`⚖️ Avukatlık Ücreti: -${App.formatMoney(fee)}`);
        }
        
        for (let i = g.lawsuits.length - 1; i >= 0; i--) {
            let law = g.lawsuits[i];
            law.daysLeft--;
            if (law.daysLeft <= 0) {
                // Court Day!
                let winChance = lawyerWinRates[g.lawyerLevel];
                if (Math.random() * 100 <= winChance) {
                    Engine.addLog(`🧑‍⚖️ <b>MAHKEME KAZANILDI!</b> Avukatın sayesinde "${law.type}" davası düştü!`);
                } else {
                    let penalty = Math.floor(law.cost * 1.5); // 50% extra for court fees
                    expenses += penalty;
                    g.popularity = Math.max(0, g.popularity - 10);
                    Engine.addLog(`👨‍⚖️ <b>MAHKEME KAYBEDİLDİ!</b> "${law.type}" davası sonuçlandı. Masraflarla: <span class="red">-${App.formatMoney(penalty)}</span> (Popülarite Düştü)`);
                }
                g.lawsuits.splice(i, 1);
            } else {
                Engine.addLog(`⚖️ "${law.type}" davası için duruşmaya ${law.daysLeft} gün kaldı.`);
            }
        }

        if (g.deposits > 0) { let earned = Math.floor(g.deposits * 0.02); g.deposits += earned; }
        if (g.insurance) expenses += 50;

        // Tüketici / RP kazanımı
        let rpGain = Math.floor(revenue / 20000) + Math.floor(soldTotal / 50) + 1;
        g.researchPoints = (g.researchPoints || 0) + rpGain;
        if(rpGain > 0) Engine.addLog(`🧪 +${rpGain} RP Kazanıldı`);

        g.day++; 
        if (g.day > 7) { 
            g.day = 1; g.week++; 
            // HAFTALIK VERGİ (TAX)
            let taxRate = 0.10;
            if(g.relations && g.relations.minister >= 80) taxRate = 0; // Tax free
            else if(g.relations && g.relations.minister < 30) taxRate = 0.20; // Double tax
            
            let tax = Math.floor(g.money * taxRate);
            if(tax > 0) { expenses += tax; Engine.addLog(`🏛️ Haftalık Kurumlar Vergisi: -${App.formatMoney(tax)}`); }
            else if (g.relations && g.relations.minister >= 80) { Engine.addLog(`🏛️ Bakanlık ile aranız iyi olduğu için bu hafta VERGİ ÖDEMEDİNİZ!`); }
        } 
        if (g.week > 4) { g.week = 1; g.month++; }
        
        Engine.spendMoney(expenses);

        for(let s in g.stocks) {
            if(!g.stocks[s]) continue;
            g.stocks[s].oldPrice = g.stocks[s].price; let volatility = s === 'megatech' ? 0.25 : (s === 'foodco' ? 0.10 : (s === 'doge' ? 0.50 : 0.03)); 
            let change = 1 + (Math.random() * volatility * 2 - volatility);
            if(g.trendActive && g.trendActive.id === 'crypto' && s === 'doge') change *= 1.5;
            g.stocks[s].price = Math.max(1, Math.floor(g.stocks[s].price * change));
        }
        if ((g.staff.janitor||0) === 0 && soldTotal > 50 && Math.random() > 0.5) g.popularity -= 2;
        else if ((g.staff.janitor||0) > 0 && g.popularity < Engine.getBasePop()+50) g.popularity += 1;

        if(!g.modifiers) g.modifiers = {buyMod:1};
        let bMod = 1.0;
        if(g.relations && g.relations.wholesaler >= 80) bMod = 0.8;
        else if(g.relations && g.relations.wholesaler < 30) bMod = 1.3;
        g.modifiers.buyMod = bMod;
        if (Math.random() < 0.45) {
            let r = Math.random();
            if (r < 0.15 && !g.rivalDefeated && (g.marketShare||0) > 20) { 
                g.popularity -= 5; g.marketShare -= 2.0; Engine.addLog(`📉 Rakip agresif kampanya yaptı! Popülarite düştü.`); 
            }
            else if (r < 0.3) { 
                if (g.relations && g.relations.mafia >= 80 && !g.rivalDefeated) {
                    g.marketShare += 2.0;
                    Engine.addLog(`🕶️ Mafya rakibin nakliye aracını 'ikna etti'. Pazar payın arttı!`);
                } else if (g.relations && g.relations.mafia < 30) {
                    let loss = Math.floor(g.money * 0.15) + 500; if(g.money<loss)loss=g.money; 
                    Engine.spendMoney(loss); expenses += loss; Engine.addLog(`🕶️ Mafya haraç kesti! Zarar: -${App.formatMoney(loss)}`); 
                } else {
                    if((g.staff.guard||0) === 0) { 
                        let loss = Math.floor(g.money * 0.1) + 100; if(g.money<loss)loss=g.money; 
                        Engine.spendMoney(loss); expenses += loss; Engine.addLog(`🦹 Marketten Hırsızlık Yapıldı! Zarar: -${App.formatMoney(loss)}`); 
                    } else {
                        let fine = 500 * g.staff.guard;
                        Engine.earnMoney(fine); revenue += fine;
                        Engine.addLog(`👮 Güvenlik Görevlisi hırsızı suçüstü yakaladı! Tazminat: <span class="green">+${App.formatMoney(fine)}</span>`);
                    }
                }
            }
            else if (r < 0.45) { 
                if(!g.insurance) { 
                    let lost = Math.floor((g.inventory.apple||0)/2); g.inventory.apple -= lost; g.currentStorage -= lost; 
                    Engine.addLog(`🔥 Depoda Küçük Çaplı Yangın! Elmaların bir kısmı ziyan oldu.`); 
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
                if (acc.preventable && (g.staff.janitor||0) > 0) {
                    Engine.addLog(`🧹 Temizlikçi yerdeki sıvı döküntüsünü hemen temizleyerek olası bir düşme davasını önledi!`);
                } else {
                    let courtDays = Math.floor(Math.random() * 3) + 3; // 3 to 5 days
                    g.lawsuits.push({ type: acc.type, cost: acc.baseCost, daysLeft: courtDays });
                    Engine.addLog(`🚨 <b>DAVA AÇILDI!</b> Sebep: "${acc.type}". Talep: ${App.formatMoney(acc.baseCost)}. Duruşmaya: ${courtDays} gün.`);
                    setTimeout(() => App.showNotify("ŞİRKETE DAVA AÇILDI!", 'error'), 1000);
                }
            }
        }
        
        // Manager Ability: Free Stock Negotiation
        if ((g.staff.manager||0) > 0 && Math.random() < 0.15) {
            let pkeys = Object.keys(GameData.products).filter(k => g.unlocked[k]);
            if (pkeys.length > 0) {
                let rItem = pkeys[Math.floor(Math.random() * pkeys.length)];
                let qty = Math.floor(Math.random() * 50) + 10;
                let reqSpace = GameData.products[rItem].space * qty;
                if (g.currentStorage + reqSpace <= g.storageCapacity) {
                    g.inventory[rItem] += qty;
                    g.currentStorage += reqSpace;
                    Engine.addLog(`👔 Müdür tedarikçilerle pazarlık yaparak ${qty}x ${GameData.products[rItem].name} BEDAVA kopardı!`);
                }
            }
        }

        // DÜNYADAN HABERLER SİSTEMİ
        if(!g.modifiers) g.modifiers = {buyMod: 1};
        if(Math.random() < 0.15) {
            let news = [
                { text: 'Dünya Ekonomik Krizi: Tedarik fiyatları fırladı!', action: () => { g.modifiers.buyMod = 1.3; g.popularity -= 5; } },
                { text: 'Hükümetten Teşvik Paketi: Esnafa $5,000 hibe edildi!', action: () => { Engine.earnMoney(5000); revenue += 5000; } },
                { text: 'Yerel Festival: Şehre turist akını var! (Müşteri arttı)', action: () => { g.popularity += 25; } },
                { text: 'Liman İşçileri Grevi: Kargo operasyonları aksıyor!', action: () => { g.popularity -= 5; } },
                { text: 'Vergi İadesi Sürprizi: Kasaya ek para girdi!', action: () => { let ref = Math.floor(g.money * 0.05); Engine.earnMoney(ref); revenue += ref; } }
            ];
            let ev = news[Math.floor(Math.random() * news.length)];
            ev.action();
            Engine.addLog(`📰 <b>FLAŞ HABER:</b> ${ev.text}`);
        }

        let reviews = [];
        if(cheapCount > 2) reviews.push("Fiyatlar o kadar ucuz ki toptancı sandım! ⭐⭐⭐⭐⭐");
        if(expCount > 2) reviews.push("Fiyatlar ateş pahası. Burası saray mı market mi? ⭐");
        if((g.staff.janitor||0) === 0 && Math.random()>0.5) reviews.push("İçerisi çok pisti, her yerde toz var. ⭐⭐");
        if((g.staff.cashier||0) > 2 && Math.random()>0.5) reviews.push("Kasa sırası hiç beklemedim, kasiyerler jet gibi. ⭐⭐⭐⭐");
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

        App.saveGame(false);
        
        setTimeout(() => AudioSys.cash(), 500); // Play cash sound when modal appears
        App.showModal("Gün Sonu Raporu", `<div>KAZANÇ: <span class="green">+${App.formatMoney(revenue)}</span></div><div>GİDER: <span class="red">-${App.formatMoney(expenses)}</span></div><div class="mt-2" style="font-style:italic;">"${randomReview}"</div><hr><div style="font-size:0.8rem; text-align:left;">${g.logs.join('')}</div><div class="mt-2 text-center" style="color:var(--success); font-weight:900; font-size:1.1rem;">💾 Oyun Başarıyla Kaydedildi</div>`);
        UI.update();
    }
};
