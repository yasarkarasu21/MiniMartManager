const StateManager = {
    getInitialGameState: function() {
        return {
            day: 1, week: 1, month: 1, money: 1000, popularity: 50, storageCapacity: 200, currentStorage: 0,
            loan: 0, deposits: 0, insurance: false, researchPoints: 0, franchisePoints: 0, prestigeCount: 0,
            marketShare: 5.0, rivalDefeated: false, buildingLevel: 1, currentTransportUsed: 0,
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
                q5: { title: 'Lüks', desc: 'Spor Araba sat.', reqCar: true, rp: 50, done: false, claimed: false },
                q6: { title: 'İşveren', desc: '5 Kasiyer işe al.', reqCashier: 5, rp: 25, done: false, claimed: false },
                q7: { title: 'Popüler', desc: '150 Popülariteye ulaş.', reqPop: 150, rp: 35, done: false, claimed: false },
                q8: { title: 'Teknoloji', desc: 'Laptop reyonunu aç.', reqLaptop: true, rp: 40, done: false, claimed: false },
                q9: { title: 'Holding', desc: '$100,000 kazanca ulaş.', reqMoney2: 100000, rp: 100, done: false, claimed: false },
                q10: { title: 'Nakliyat Kralı', desc: 'Kargo Uçağı satın al.', reqPlane: true, rp: 200, done: false, claimed: false },
                q11: { title: 'Güvenlik Ağı', desc: '3 Güvenlik Görevlisi işe al.', reqGuard: 3, rp: 30, done: false, claimed: false },
                q12: { title: 'Sağlık Sektörü', desc: 'Şirket İtibarını (REP) 50 yap.', reqRep: 50, rp: 45, done: false, claimed: false },
                q13: { title: 'Mafya Dostu', desc: 'Mafya ilişkisini 80 yap.', reqMafia: 80, rp: 60, done: false, claimed: false },
                q14: { title: 'Milyoner', desc: '$1,000,000 kazanca ulaş.', reqMoney3: 1000000, rp: 150, done: false, claimed: false },
                q15: { title: 'Tekel', desc: 'Rakibini satın al.', reqRivalDefeated: true, rp: 500, done: false, claimed: false }
            },
            skills: {
                negotiator: { name: 'Pazarlık Ustası', desc: 'Alış fiyatları kalıcı olarak %10 ucuzlar.', cost: 15, unlocked: false },
                marketingPro: { name: 'Sosyal Medya Dahisi', desc: 'Reklam kampanyaları %50 daha fazla müşteri çeker.', cost: 20, unlocked: false },
                storageOpt: { name: 'Depo Ustası', desc: 'Depo kapasiten kalıcı olarak %20 artar.', cost: 30, unlocked: false },
                hrExpert: { name: 'İK Uzmanı', desc: 'Personel maaşları %10 azalır.', cost: 25, unlocked: false }
            },
            factory: { owned: false, level: 1, activeItem: null },
            contracts: [],
            availableContracts: [],
            corporateRep: 0,
            tutorialDone: false,
            relations: { wholesaler: 50, minister: 50, mafia: 10 },
            incomingCargo: [],
            reviews: []
        };
    },
    
    getSafeState: function(savedState) {
        let defaultState = this.getInitialGameState();
        if (!savedState) return defaultState;
        
        // Deep merge for safe backward compatibility
        let merged = { ...defaultState };
        for(let key in defaultState) {
            if (savedState[key] !== undefined) {
                if (typeof defaultState[key] === 'object' && defaultState[key] !== null && !Array.isArray(defaultState[key])) {
                    merged[key] = { ...defaultState[key], ...savedState[key] };
                } else {
                    merged[key] = savedState[key];
                }
            }
        }
        return merged;
    },

    getSlots: function() { return JSON.parse(localStorage.getItem('mm_slots')) || { 1: null, 2: null, 3: null }; },
    saveSlot: function(id, data) { let s = this.getSlots(); s[id] = data; localStorage.setItem('mm_slots', JSON.stringify(s)); },
    deleteSlot: function(id) { let s = this.getSlots(); s[id] = null; localStorage.setItem('mm_slots', JSON.stringify(s)); },
    
    migrateLegacy: function() {
        let legacy = localStorage.getItem('megaMartSave');
        let slots = this.getSlots();
        if(legacy && !slots[1] && !slots[2] && !slots[3]) {
            slots[1] = JSON.parse(legacy);
            localStorage.setItem('mm_slots', JSON.stringify(slots));
            localStorage.removeItem('megaMartSave');
        }
    }
};
