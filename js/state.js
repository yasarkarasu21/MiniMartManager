// js/state.js - Core State Management

function getInitialState() {
    return {
        day: 1, week: 1, month: 1, money: 1000, popularity: 50, storageCapacity: 200, currentStorage: 0,
        loan: 0, deposits: 0, insurance: false, researchPoints: 0, franchisePoints: 0, prestigeCount: 0,
        
        marketShare: 5.0, rivalDefeated: false,
        buildingLevel: 1,
        currentTransportUsed: 0,
        fleet: {
            van: { count: 1, capacity: 200, cost: 2500, name: "Minivan" },
            truck: { count: 0, capacity: 1000, cost: 15000, name: "Kamyon" },
            plane: { count: 0, capacity: 10000, cost: 150000, name: "Kargo Uçağı" }
        },

        inventory: { apple: 0, bread: 0, milk: 0, tshirt: 0, shoes: 0, phone: 0, laptop: 0, tv: 0, car: 0 },
        unlocked: { apple: true, bread: false, milk: false, tshirt: false, shoes: false, phone: false, laptop: false, tv: false, car: false },
        pricing: { apple: 'normal', bread: 'normal', milk: 'normal', tshirt: 'normal', shoes: 'normal', phone: 'normal', laptop: 'normal', tv: 'normal', car: 'normal' },
        staff: { cashier: 0, guard: 0, janitor: 0, manager: 0 },
        stocks: { megatech: { shares: 0, price: 150, oldPrice: 150 }, foodco: { shares: 0, price: 60, oldPrice: 60 }, gold: { shares: 0, price: 500, oldPrice: 500 }, doge: { shares: 0, price: 10, oldPrice: 10 } },
        marketingBoost: 0, marketingDaysLeft: 0, modifiers: { buyMod: 1 }, stats: { earned: 0, spent: 0 }, logs: [],
        trendActive: null, trendDaysLeft: 0, blackMarketActive: false, blackMarketItem: null,
        quests: {
            q1: { title: 'Tüccar', desc: '$5,000 kazanca ulaş.', reqMoney: 5000, rp: 10, done: false, claimed: false },
            q2: { title: 'Borsa Kurdu', desc: '10 Lot Altın al.', reqGold: 10, rp: 15, done: false, claimed: false },
            q3: { title: 'Lojistik', desc: 'İlk Kamyonunu satın al.', reqTruck: true, rp: 20, done: false, claimed: false },
            q4: { title: 'Büyüme', desc: 'Süpermarket statüsüne geç.', reqBuild: 2, rp: 30, done: false, claimed: false },
            q5: { title: 'Lüks', desc: 'Spor Araba sat.', reqCar: true, rp: 50, done: false, claimed: false }
        },
        skills: {
            negotiator: { name: 'Pazarlık Ustası', desc: 'Alış fiyatları kalıcı olarak %10 ucuzlar.', cost: 15, unlocked: false },
            marketingPro: { name: 'Sosyal Medya Dahisi', desc: 'Reklam kampanyaları %50 daha fazla müşteri çeker.', cost: 20, unlocked: false },
            storageOpt: { name: 'Depo Ustası', desc: 'Depo kapasiten kalıcı olarak %20 artar.', cost: 30, unlocked: false },
            hrExpert: { name: 'İK Uzmanı', desc: 'Personel maaşları %10 azalır.', cost: 25, unlocked: false }
        }
    };
}

let g = getInitialState();

function saveGame() { localStorage.setItem('megaMartSave', JSON.stringify(g)); showNotify("Oyun Kaydedildi! 💾"); }

function loadGame() { 
    let saved = localStorage.getItem('megaMartSave'); 
    if (saved) { 
        g = JSON.parse(saved); 
        // Migrations
        if(!g.fleet) { g.fleet = { van: { count: 1, capacity: 200, cost: 2500, name: "Minivan" }, truck: { count: 0, capacity: 1000, cost: 15000, name: "Kamyon" }, plane: { count: 0, capacity: 10000, cost: 150000, name: "Kargo Uçağı" } }; g.currentTransportUsed = 0; g.buildingLevel = 1; }
        if(g.inventory.tv === undefined) { g.inventory.tv = 0; g.inventory.car = 0; g.unlocked.tv = false; g.unlocked.car = false; g.pricing.tv = 'normal'; g.pricing.car = 'normal'; }
        if(!g.stocks.doge) g.stocks.doge = { shares:0, price:10, oldPrice:10 };
        if(!g.quests.q4) { g.quests.q4 = { title: 'Büyüme', desc: 'Süpermarket statüsüne geç.', reqBuild: 2, rp: 30, done: false, claimed: false }; g.quests.q5 = { title: 'Lüks', desc: 'Spor Araba sat.', reqCar: true, rp: 50, done: false, claimed: false }; }
        if(g.marketShare === undefined) { g.marketShare = 5.0; g.rivalDefeated = false; }
        updateUI(); showNotify("Kayıt Yüklendi! 📂"); 
    } 
}

function hardReset() { 
    if(confirm("Tüm ilerlemen kalıcı silinecek. Emin misin?")) { 
        g = getInitialState(); localStorage.removeItem('megaMartSave'); updateUI(); showNotify("Oyun sıfırlandı."); 
    } 
}

function doPrestige() {
    let fpToGain = Math.floor(g.stats.earned / 50000);
    if(fpToGain <= 0) { alert("Franchise açmak için toplam gelirinin en az $50,000 olması gerek."); return; }
    if(confirm(`Marketini devredip ${fpToGain} FP alacaksın. FP kalıcı bonus sağlayacak. Kabul mü?`)) {
        let currentFP = g.franchisePoints + fpToGain; let pCount = g.prestigeCount + 1;
        g = getInitialState(); g.franchisePoints = currentFP; g.prestigeCount = pCount;
        saveGame(); updateUI(); showModal("👑 FRANCHISE AÇILDI!", `Tebrikler! Toplam ${currentFP} FP'ye sahipsin. Her oyunda +%${currentFP*10} Müşteri Talebi ve +%${currentFP*10} Kâr!`);
    }
}
