const Engine = {
    getTotalTransportCap: () => {
        let cap = 50;
        if(App.state.g.skills && App.state.g.skills.logistics && App.state.g.skills.logistics.unlocked) cap = 75;
        for (let k in App.state.g.fleet) {
            let f = App.state.g.fleet[k];
            if (f.count > 0) cap += f.capacity * f.count;
        }
        return cap;
    },
    getBasePop: () => {
        let pop = 10;
        let b = App.state.g.buildingLevel || 1;
        if(b > 1) pop += GameData.buildings[b].popBoost;
        return pop;
    },
    addLog: (msg) => {
        if (!App.state.g.logs) App.state.g.logs = [];
        App.state.g.logs.unshift(msg + "<br>");
        if (App.state.g.logs.length > 30) App.state.g.logs.pop();
    },
    spendMoney: (amount) => {
        App.state.g.money -= amount;
        UI.update();
    },
    earnMoney: (amount) => {
        App.state.g.money += amount;
        UI.update();
    },
    buyProduct: (id, qty) => {
        let g = App.state.g; let p = GameData.products[id]; 
        if(!g.relations) g.relations = { mayor: 0, mafia: 0, suppliers: 0 };
        let relDiscount = 1.0 - (Math.floor((g.relations.suppliers/100)*20)/100);
        let basePrice = p.buy * (g.modifiers ? g.modifiers.buyMod : 1) * relDiscount; 
        if(g.skills && g.skills.negotiator && g.skills.negotiator.unlocked) basePrice *= 0.9;
        let cost = Math.floor(basePrice) * qty; 
        let actStore = g.storageCapacity; 
        if(g.skills && g.skills.storageOpt && g.skills.storageOpt.unlocked) actStore = Math.floor(actStore * 1.2);
        let trReq = p.space * qty; let trMax = Engine.getTotalTransportCap();

        if (g.money >= cost && g.currentStorage + trReq <= actStore && trReq <= trMax) {
            Engine.spendMoney(cost);
            g.inventory[id] = (g.inventory[id] || 0) + qty;
            g.currentStorage += trReq;
            AudioSys.buy();
        } else {
            AudioSys.error();
            if (g.money < cost) App.showNotify("Yetersiz Bakiye!");
            else if (trReq > trMax) App.showNotify("Taşıma Kapasitesi Yetersiz!");
            else App.showNotify("Depo Dolu!");
        }
    },
    adjustPrice: (id, dir) => {
        let g = App.state.g;
        if (!g.customPrice) g.customPrice = {};
        if (!g.customPrice[id]) g.customPrice[id] = GameData.products[id].sell;
        g.customPrice[id] += dir;
        if (g.customPrice[id] < 1) g.customPrice[id] = 1;
        UI.update();
    },
    buyBlackMarket: (qty) => {
        // Implement later or stub
    },
    unlockDept: (id) => {
        let g = App.state.g;
        let cost = GameData.departments[id].unlock;
        if (g.money >= cost) {
            Engine.spendMoney(cost);
            g.unlocked[id] = true;
            AudioSys.success();
            App.showNotify(GameData.departments[id].name + " Reyonu Açıldı!");
        }
    },
    hireStaff: (id) => {
        let g = App.state.g;
        let cost = GameData.staffTypes[id].cost;
        if (g.money >= cost) {
            Engine.spendMoney(cost);
            g.staff[id] = (g.staff[id] || 0) + 1;
            AudioSys.success();
            App.showNotify(GameData.staffTypes[id].name + " İşe Alındı!");
        } else { AudioSys.error(); App.showNotify("Paranız Yetmiyor!"); }
    },
    takeLoanPackage: (amount, total, days, type) => {
        let g = App.state.g;
        if (!g.activeLoans) g.activeLoans = [];
        g.activeLoans.push({ type: type, total: total, daysLeft: days, daily: Math.ceil(total / days) });
        Engine.earnMoney(amount);
        AudioSys.cash();
        App.showNotify(type + " Kredisi Alındı!");
        UI.closePanel('finance');
    },
    payOffLoan: (idx) => {
        let g = App.state.g;
        let l = g.activeLoans[idx];
        if (g.money >= l.total) {
            Engine.spendMoney(l.total);
            g.activeLoans.splice(idx, 1);
            AudioSys.success();
            App.showNotify("Kredi Kapatıldı!");
            UI.closePanel('finance');
        } else { AudioSys.error(); App.showNotify("Yetersiz Bakiye!"); }
    },
    depositMoney: (amount) => {
        if (App.state.g.money >= amount) {
            Engine.spendMoney(amount);
            App.state.g.deposits = (App.state.g.deposits || 0) + amount;
            AudioSys.cash();
        }
    },
    withdrawMoney: (amount) => {
        if (App.state.g.deposits >= amount) {
            App.state.g.deposits -= amount;
            Engine.earnMoney(amount);
            AudioSys.cash();
        }
    },
    buyStock: (id) => {
        let g = App.state.g;
        let p = g.stocks[id].price;
        if (g.money >= p) {
            Engine.spendMoney(p);
            g.stocks[id].shares++;
            AudioSys.buy();
        }
    },
    sellStock: (id) => {
        let g = App.state.g;
        let p = g.stocks[id].price;
        if (g.stocks[id].shares > 0) {
            g.stocks[id].shares--;
            Engine.earnMoney(p);
            AudioSys.cash();
        }
    },
    unlockSkill: (id) => {
        let g = App.state.g;
        let s = g.skills[id];
        if (g.researchPoints >= s.cost && !s.unlocked) {
            g.researchPoints -= s.cost;
            s.unlocked = true;
            AudioSys.success();
            App.showNotify("Yetenek Açıldı: " + s.name);
            UI.update();
        } else { AudioSys.error(); }
    },
    improveRelation: (key, cost) => {
        let g = App.state.g;
        if (!g.relations) g.relations = { mayor: 0, mafia: 0, suppliers: 0 };
        if (g.money >= cost) {
            if (g.relations[key] >= 100) { AudioSys.error(); App.showNotify("İlişki zaten en üst seviyede!"); return; }
            Engine.spendMoney(cost);
            g.relations[key] = Math.min(100, g.relations[key] + 15);
            AudioSys.cash(); App.showNotify("İlişki geliştirildi!");
            UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); }
    },
    hireLawyer: (level) => {
        App.state.g.lawyerLevel = level;
        AudioSys.success(); App.showNotify("Avukat Kiralandı!"); UI.update();
    },
    settleLawsuit: (idx) => {
        let g = App.state.g;
        let law = g.lawsuits[idx];
        if (g.money >= law.cost) {
            Engine.spendMoney(law.cost);
            g.lawsuits.splice(idx, 1);
            AudioSys.success(); App.showNotify("Dava Anlaşmayla Çözüldü!"); UI.update();
        } else { AudioSys.error(); App.showNotify("Yetersiz bakiye!"); }
    },
    upgradeBuilding: () => {
        let g = App.state.g;
        let next = (g.buildingLevel || 1) + 1;
        if (GameData.buildings[next] && g.money >= GameData.buildings[next].cost) {
            Engine.spendMoney(GameData.buildings[next].cost);
            g.buildingLevel = next;
            AudioSys.success(); App.showNotify("Bina Geliştirildi!"); UI.update();
        }
    },
    buyVehicle: (id) => {
        let g = App.state.g;
        if (g.money >= g.fleet[id].cost) {
            Engine.spendMoney(g.fleet[id].cost);
            g.fleet[id].count++;
            AudioSys.success(); App.showNotify("Araç Satın Alındı!"); UI.update();
        }
    },
    startCampaign: (id) => {
        let g = App.state.g;
        let m = GameData.marketing[id];
        if (g.money >= m.cost) {
            Engine.spendMoney(m.cost);
            g.marketingActive = id;
            g.marketingDaysLeft = m.days;
            AudioSys.success(); App.showNotify("Kampanya Başladı!"); UI.update();
        }
    },
    doPrestige: () => {
        if(confirm("Şirketi satıp prestij puanı kazanmak istediğine emin misin? Tüm ilerlemen sıfırlanacak!")) {
            App.state.g.franchisePoints += Math.floor(App.state.g.money / 100000);
            // Reset logic
        }
    },
    buyFactory: () => {
        let g = App.state.g;
        if (g.money >= 50000) {
            Engine.spendMoney(50000);
            g.factoryOwned = true; g.factoryLevel = 1;
            AudioSys.success(); UI.update();
        }
    },
    upgradeFactory: () => {
        let g = App.state.g;
        let cost = g.factoryLevel * 50000;
        if (g.money >= cost) {
            Engine.spendMoney(cost);
            g.factoryLevel++;
            AudioSys.success(); UI.update();
        }
    },
    setFactoryItem: (val) => { App.state.g.factoryItem = val; },
    checkQuests: () => {},
    acceptContract: () => {},
    fulfillContract: () => {},
    
    endDay: () => {
        let g = App.state.g;
        g.logs = [];
        let revenue = 0; let expenses = 0;
        
        // Factory
        if (g.factoryOwned && g.factoryItem) {
            let p = GameData.products[g.factoryItem];
            let cost = Math.floor(p.buy * 0.5) * (g.factoryLevel * 10);
            expenses += cost;
            g.inventory[g.factoryItem] = (g.inventory[g.factoryItem] || 0) + (g.factoryLevel * 10);
            g.currentStorage += p.space * (g.factoryLevel * 10);
            Engine.addLog(`🏭 Fabrika Üretimi: ${g.factoryLevel * 10}x ${p.name}`);
        }

        // Wages
        let managerDiscount = g.staff.manager > 0 ? 0.8 : 1.0; 
        let hrWageMod = (g.skills && g.skills.hrExpert && g.skills.hrExpert.unlocked) ? 0.9 : 1.0;
        for (let k in GameData.staffTypes) expenses += (g.staff[k]||0) * (GameData.staffTypes[k].wage * managerDiscount * hrWageMod);
        
        // Sales
        let soldTotal = 0;
        let currentPop = Math.min(200, Math.max(1, Engine.getBasePop() + (g.marketingDaysLeft > 0 ? GameData.marketing[g.marketingActive].pop : 0)));
        let fpDemandBonus = 1 + (g.franchisePoints * 0.05);
        let marketShareMod = 1 + ((g.marketShare||0)/100);
        let repBonus = 1 + ((g.corporateRep||0)/100);
        let cashierBonus = (g.staff.cashier || 0) * 5;
        let demandMult = (currentPop / 50) * fpDemandBonus * marketShareMod * repBonus;
        
        let expCount = 0; let cheapCount = 0;

        for (let k in g.inventory) {
            if (g.inventory[k] > 0) {
                let p = GameData.products[k];
                let recPrice = p.sell;
                let cPrice = g.customPrice && g.customPrice[k] ? g.customPrice[k] : recPrice;
                let ratio = recPrice / cPrice;
                if(ratio < 0.8) expCount++;
                if(ratio > 1.2) cheapCount++;
                let demandMod = ratio * ratio;
                if(g.trendActive && g.trendActive.effect[p.category]) demandMod *= g.trendActive.effect[p.category];
                let maxDemand = Math.floor((p.demand + cashierBonus) * demandMult * demandMod);
                let sold = Math.min(g.inventory[k], maxDemand);
                
                if (sold > 0) {
                    revenue += sold * cPrice;
                    g.inventory[k] -= sold;
                    g.currentStorage -= p.space * sold;
                    soldTotal += sold;
                    Engine.addLog(`🛒 ${sold}x ${p.name} Satıldı. (+${App.formatMoney(sold * cPrice)})`);
                }
            }
        }
        
        if (g.marketingDaysLeft > 0) {
            g.marketingDaysLeft--;
            if(g.marketingDaysLeft === 0) Engine.addLog(`📢 ${GameData.marketing[g.marketingActive].name} Kampanyası Bitti!`);
        }
        
        if (g.trendActive) {
            g.trendDaysLeft--;
            if(g.trendDaysLeft <= 0) g.trendActive = null;
        } else {
            if(Math.random() < 0.2) {
                let trends = [
                    { id: 'summer', name: 'Sıcak Hava Dalgası', effect: { drink: 2.0 }, days: 3 },
                    { id: 'winter', name: 'Kar Fırtınası', effect: { food: 1.5, snack: 1.5 }, days: 2 },
                    { id: 'crypto', name: 'Kripto Boğa Sezonu', effect: { tech: 2.5 }, days: 4 }
                ];
                let tr = trends[Math.floor(Math.random() * trends.length)];
                g.trendActive = tr; g.trendDaysLeft = tr.days;
                Engine.addLog(`📈 <b>TREND BAŞLADI:</b> ${tr.name} (${tr.days} Gün)`);
                App.showNotify("YENİ BİR TREND BAŞLADI!");
            }
        }
        
        if(!g.activeLoans) g.activeLoans = [];
        for (let i = g.activeLoans.length - 1; i >= 0; i--) {
            let l = g.activeLoans[i];
            expenses += l.daily;
            l.total -= l.daily;
            l.daysLeft--;
            Engine.addLog(`🏦 Kredi Taksiti Ödendi: -${App.formatMoney(l.daily)} (${l.type})`);
            if (l.daysLeft <= 0 || l.total <= 0) {
                Engine.addLog(`✅ ${l.type} kredisi kapatıldı!`);
                g.activeLoans.splice(i, 1);
            }
        }
        
        if(!g.lawsuits) g.lawsuits = [];
        let lawyerWinRates = [10, 40, 70, 95];
        let lawyerFees = [0, 200, 1000, 4000];
        let fee = lawyerFees[g.lawyerLevel || 0];
        if (fee > 0) { expenses += fee; Engine.addLog(`🧑‍⚖️ Avukat Ücreti: -${App.formatMoney(fee)}`); }
        
        for (let i = g.lawsuits.length - 1; i >= 0; i--) {
            let law = g.lawsuits[i];
            law.daysLeft--;
            if (law.daysLeft <= 0) {
                let winChance = lawyerWinRates[g.lawyerLevel || 0];
                if (Math.random() * 100 <= winChance) {
                    Engine.addLog(`⚖️ <b>MAHKEME KAZANILDI!</b> Avukatın sayesinde "${law.type}" davası düştü!`);
                } else {
                    let penalty = Math.floor(law.cost * 1.5);
                    expenses += penalty;
                    g.popularity = Math.max(0, g.popularity - 10);
                    Engine.addLog(`⚖️ <b>MAHKEME KAYBEDİLDİ!</b> "${law.type}" sonucu cezasıyla birlikte -${App.formatMoney(penalty)}!`);
                }
                g.lawsuits.splice(i, 1);
            }
        }

        if(!g.relations) g.relations = { mayor: 0, mafia: 0, suppliers: 0 };
        g.relations.mayor = Math.max(0, g.relations.mayor - 1);
        g.relations.mafia = Math.max(0, g.relations.mafia - 1);
        g.relations.suppliers = Math.max(0, g.relations.suppliers - 1);

        g.day++; 
        if (g.day > 7) { 
            g.day = 1; g.week++; 
            let taxRate = (10 - Math.floor((g.relations.mayor/100)*8)) / 100;
            let tax = Math.floor(g.money * taxRate);
            if(tax > 0) { expenses += tax; Engine.addLog(`📉 Haftalık Kurumlar Vergisi (%${(taxRate*100).toFixed(1)}): -${App.formatMoney(tax)}`); }
        } 
        if (g.week > 4) { g.week = 1; g.month++; }
        
        Engine.spendMoney(expenses);
        
        if (Math.random() < 0.45) {
            let r = Math.random();
            if (r < 0.15 && !g.rivalDefeated && (g.marketShare||0) > 20) { g.popularity -= 5; g.marketShare -= 2.0; Engine.addLog(`📉 Rakip agresif kampanya yaptı! Popülarite düştü.`); }
            else if (r < 0.3) {
                if (g.relations.mafia >= 80 && !g.rivalDefeated) {
                    g.marketShare += 2.0; Engine.addLog(`🔥 Mafya rakibin deposunu kundakladı! Pazar payın arttı.`);
                } else if (g.relations.mafia < 50) {
                    if((g.staff.guard||0) === 0) { 
                        let loss = Math.floor(g.money * 0.1) + 100; if(g.money<loss)loss=g.money; 
                        Engine.spendMoney(loss); Engine.addLog(`🦹 Marketten Hırsızlık Yapıldı! Zarar: -${App.formatMoney(loss)}`); 
                    } else {
                        let fine = 500 * g.staff.guard;
                        Engine.earnMoney(fine); revenue += fine;
                        Engine.addLog(`👮 Güvenlik Görevlisi hırsızı suçüstü yakaladı! Tazminat: <span class="green">+${App.formatMoney(fine)}</span>`);
                    }
                }
            } else if (r < 0.45) { 
                if(!g.insurance) { 
                    let lost = Math.floor((g.inventory.apple||0)/2); g.inventory.apple -= lost; g.currentStorage -= lost; 
                    Engine.addLog(`🔥 Depoda Küçük Çaplı Yangın! Elmaların bir kısmı ziyan oldu.`); 
                } 
            } else if (r < 0.7) {
                if ((g.staff.janitor||0) > 0) { Engine.addLog(`🧹 Temizlikçi olası bir davayı önledi!`); } 
                else {
                    let accidents = [{ type: "Müşteri Reyonda Kayıp Düştü", baseCost: 15000 }, { type: "Bozuk Ürün Zehirlenmesi", baseCost: 35000 }, { type: "Personel Hakareti Davası", baseCost: 8000 }];
                    let acc = accidents[Math.floor(Math.random() * accidents.length)];
                    let courtDays = Math.floor(Math.random() * 3) + 3;
                    g.lawsuits.push({ type: acc.type, cost: acc.baseCost, daysLeft: courtDays });
                    Engine.addLog(`🚨 <b>DAVA AÇILDI!</b> Sebep: "${acc.type}". Duruşmaya: ${courtDays} gün.`);
                    setTimeout(() => App.showNotify("ŞİRKETE DAVA AÇILDI!"), 1000);
                }
            }
        }
        
        if ((g.staff.manager||0) > 0 && Math.random() < 0.15) {
            let pkeys = Object.keys(GameData.products).filter(k => g.unlocked[k]);
            if (pkeys.length > 0) {
                let rItem = pkeys[Math.floor(Math.random() * pkeys.length)];
                let qty = Math.floor(Math.random() * 50) + 10;
                let reqSpace = GameData.products[rItem].space * qty;
                if (g.currentStorage + reqSpace <= g.storageCapacity) {
                    g.inventory[rItem] += qty; g.currentStorage += reqSpace;
                    Engine.addLog(`👔 Müdür tedarikçilerle pazarlık yaparak ${qty}x BEDAVA kopardı!`);
                }
            }
        }

        Engine.earnMoney(revenue);
        
        let rpGain = Math.floor(revenue * 0.10) + 15;
        g.researchPoints = (g.researchPoints || 0) + rpGain;
        Engine.addLog(`🧪 +${rpGain} RP Kazanıldı`);

        if(!g.history) g.history = [];
        g.history.unshift({ date: `Ay ${g.month} / Hft ${g.week} / Gn ${g.day}`, revenue: revenue, expenses: expenses, logs: [...g.logs] });
        if (g.history.length > 30) g.history.pop();
        
        App.saveGame(false);
        setTimeout(() => AudioSys.cash(), 500);
        App.showModal("Gün Sonu Raporu", `<div>KAZANÇ: <span class="green">+${App.formatMoney(revenue)}</span></div><div>GİDER: <span class="red">-${App.formatMoney(expenses)}</span></div><hr><div style="font-size:0.8rem; text-align:left;">${g.logs.join('')}</div>`);
        UI.update();
    }
};
window.Engine = Engine;
