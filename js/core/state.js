const StateManager = {
    getInitialGameState: function() {
        let initialInventory = {};
        let initialUnlocked = {};
        let initialPricing = {};
        let initialCustomPrice = {};
        
        let productKeys = (typeof GameData !== 'undefined' && GameData.products) 
            ? Object.keys(GameData.products) 
            : ['apple', 'bread', 'milk', 'tshirt', 'shoes', 'phone', 'laptop', 'tv', 'car', 'pharmacy', 'cosmetics', 'toys', 'furniture'];

        productKeys.forEach(k => {
            initialInventory[k] = 0;
            initialUnlocked[k] = (k === 'apple');
            initialPricing[k] = 'normal';
            if (typeof GameData !== 'undefined' && GameData.products && GameData.products[k]) {
                initialCustomPrice[k] = GameData.products[k].sell;
            }
        });

        let initialQuests = {};
        if (typeof GameData !== 'undefined' && GameData.quests) {
            for (let qId in GameData.quests) {
                let q = GameData.quests[qId];
                initialQuests[qId] = {
                    title: q.title,
                    desc: q.desc,
                    level: q.level,
                    done: false,
                    claimed: false
                };
            }
        }

        return {
            day: 1, week: 1, month: 1, currentLevel: 1, money: 1000, popularity: 50, storageCapacity: 200, currentStorage: 0,
            loan: 0, deposits: 0, insurance: false, researchPoints: 0, franchisePoints: 0, prestigeCount: 0,
            marketShare: 5.0, rivalDefeated: false, buildingLevel: 1, currentTransportUsed: 0,
            fleet: {
                van: { count: 1, capacity: 200, cost: 2500, name: "Minivan" },
                truck: { count: 0, capacity: 1000, cost: 15000, name: "Kamyon" },
                plane: { count: 0, capacity: 10000, cost: 150000, name: "Kargo Uçağı" }
            },
            inventory: initialInventory,
            unlocked: initialUnlocked,
            pricing: initialPricing,
            customPrice: initialCustomPrice,
            staff: { cashier: 0, guard: 0, janitor: 0, warehouse: 0, manager: 0 },
            stocks: { megatech: { shares: 0, price: 150, oldPrice: 150 }, foodco: { shares: 0, price: 60, oldPrice: 60 }, gold: { shares: 0, price: 500, oldPrice: 500 }, doge: { shares: 0, price: 10, oldPrice: 10 } },
            upgrades: { storage2: false, storage3: false, storage4: false },
            marketingBoost: 0, marketingDaysLeft: 0, modifiers: { buyMod: 1 }, stats: { earned: 0, spent: 0, contractsCompleted: 0 }, logs: [],
            trendActive: null, trendDaysLeft: 0, blackMarketActive: false, blackMarketItem: null,
            quests: initialQuests,
            foundations: { children: 0, green: 0, tech_edu: 0, animal: 0 },
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
            reviews: [],
            activeLoans: [],
            lawsuits: [],
            lawyerLevel: 0,
            history: []
        };
    },
    
    getSafeState: function(savedState) {
        let defaultState = this.getInitialGameState();
        if (!savedState) return defaultState;
        
        // Deep merge that preserves all saved keys while backfilling missing defaults
        let merged = { ...defaultState, ...savedState };
        for(let key in defaultState) {
            if (typeof defaultState[key] === 'object' && defaultState[key] !== null) {
                if (Array.isArray(defaultState[key])) {
                    merged[key] = Array.isArray(savedState[key]) ? savedState[key] : [...defaultState[key]];
                } else {
                    merged[key] = { ...defaultState[key], ...(savedState[key] || {}) };
                }
            }
        }

        // Clean any undefined or NaN product values in inventory, unlocked, pricing
        if (typeof GameData !== 'undefined' && GameData.products) {
            for (let p in GameData.products) {
                if (merged.inventory[p] === undefined || isNaN(merged.inventory[p])) merged.inventory[p] = 0;
                if (merged.unlocked[p] === undefined) merged.unlocked[p] = (p === 'apple');
                if (merged.pricing[p] === undefined) merged.pricing[p] = 'normal';
                if (!merged.customPrice) merged.customPrice = {};
                if (merged.customPrice[p] === undefined) merged.customPrice[p] = GameData.products[p].sell;
            }
        }
        if (merged.staff) {
            for (let s of ['cashier', 'guard', 'janitor', 'warehouse', 'manager']) {
                if (merged.staff[s] === undefined || isNaN(merged.staff[s])) merged.staff[s] = 0;
            }
        }
        if (!merged.upgrades) merged.upgrades = { storage2: false, storage3: false, storage4: false };
        if (!merged.activeLoans) merged.activeLoans = [];
        if (!merged.lawsuits) merged.lawsuits = [];
        if (merged.lawyerLevel === undefined) merged.lawyerLevel = 0;
        if (!merged.history) merged.history = [];
        if (!merged.incomingCargo) merged.incomingCargo = [];
        if (!merged.reviews) merged.reviews = [];
        if (!merged.relations) merged.relations = { wholesaler: 50, minister: 50, mafia: 10 };

        // Foundations safe merge
        if (!merged.foundations) {
            merged.foundations = { children: 0, green: 0, tech_edu: 0, animal: 0 };
        } else {
            for (let f of ['children', 'green', 'tech_edu', 'animal']) {
                if (merged.foundations[f] === undefined || isNaN(merged.foundations[f])) merged.foundations[f] = 0;
            }
        }

        // Level & Stats safe merge
        if (merged.currentLevel === undefined) merged.currentLevel = 1;
        if (!merged.stats) merged.stats = { earned: 0, spent: 0, contractsCompleted: 0 };
        if (merged.stats.contractsCompleted === undefined) merged.stats.contractsCompleted = 0;

        // Quests safe merge
        if (typeof GameData !== 'undefined' && GameData.quests) {
            if (!merged.quests) merged.quests = {};
            for (let qId in GameData.quests) {
                let q = GameData.quests[qId];
                if (!merged.quests[qId]) {
                    merged.quests[qId] = {
                        title: q.title,
                        desc: q.desc,
                        level: q.level,
                        done: false,
                        claimed: false
                    };
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
