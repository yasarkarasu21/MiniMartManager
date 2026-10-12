const GameData = {
    products: {
        apple: { name: 'Elma', type: 'Manav', category: 'food', buy: 2, sell: 5, unlock: 0, space: 1, demand: 30, reqBuild: 1, cargoDays: 1 },
        bread: { name: 'Ekmek', type: 'Fırın', category: 'food', buy: 3, sell: 7, unlock: 250, space: 1, demand: 25, reqBuild: 1, cargoDays: 1 },
        milk: { name: 'Süt', type: 'Şarküteri', category: 'food', buy: 5, sell: 12, unlock: 600, space: 1, demand: 20, reqBuild: 1, cargoDays: 1 },
        tshirt: { name: 'T-Shirt', type: 'Giyim', category: 'clothes', buy: 15, sell: 40, unlock: 1500, space: 2, demand: 15, reqBuild: 1, cargoDays: 2 },
        shoes: { name: 'Ayakkabı', type: 'Giyim', category: 'clothes', buy: 35, sell: 85, unlock: 4000, space: 3, demand: 10, reqBuild: 1, cargoDays: 2 },
        phone: { name: 'Telefon', type: 'Elektronik', category: 'tech', buy: 250, sell: 600, unlock: 10000, space: 2, demand: 5, reqBuild: 1, cargoDays: 3 },
        laptop: { name: 'Laptop', type: 'Elektronik', category: 'tech', buy: 600, sell: 1500, unlock: 25000, space: 5, demand: 3, reqBuild: 1, cargoDays: 3 },
        tv: { name: 'Plazma TV', type: 'Elektronik', category: 'tech', buy: 1500, sell: 3500, unlock: 75000, space: 10, demand: 2, reqBuild: 2, cargoDays: 4 },
        car: { name: 'Spor Araba', type: 'Lüks', category: 'luxury', buy: 35000, sell: 80000, unlock: 500000, space: 50, demand: 1, reqBuild: 3, cargoDays: 7 },
        pharmacy: { name: 'Vitamin & İlaç', type: 'Eczane', category: 'health', buy: 100, sell: 250, unlock: 35000, space: 1, demand: 15, reqBuild: 2, reqQuest: 'q12', cargoDays: 2 },
        cosmetics: { name: 'Kozmetik', type: 'Kozmetik', category: 'health', buy: 50, sell: 150, unlock: 18000, space: 1, demand: 12, reqBuild: 1, reqQuest: 'q7', cargoDays: 2 },
        toys: { name: 'Oyuncak', type: 'Oyuncak', category: 'toys', buy: 20, sell: 60, unlock: 8000, space: 2, demand: 18, reqBuild: 1, cargoDays: 2 },
        furniture: { name: 'Mobilya', type: 'Ev', category: 'home', buy: 800, sell: 2000, unlock: 120000, space: 15, demand: 2, reqBuild: 2, cargoDays: 5 }
    },
    buildings: {
        1: { name: 'Kiosk', cost: 0, popBoost: 0, desc: 'Temel satıș noktası' },
        2: { name: 'Süpermarket', cost: 75000, popBoost: 15, desc: 'Plazma TV, Mobilya ve İlaç satabilmeni sağlar.' },
        3: { name: 'Mega AVM', cost: 400000, popBoost: 40, desc: 'Spor Araba galerisi açmanı sağlar.' }
    },
    staffTypes: { 
        cashier: { name: 'Kasiyer', cost: 200, wage: 25, desc: 'Günlük +5 Müşteri Talebi artışı sağlar.' }, 
        guard: { name: 'Güvenlik', cost: 400, wage: 50, desc: 'Hırsızları yakalayıp tazminat kazandırır.' }, 
        janitor: { name: 'Temizlikçi', cost: 150, wage: 20, desc: 'Mağaza içi kaza (dava) riskini önler.' }, 
        warehouse: { name: 'Depo Sorumlusu', cost: 600, wage: 40, desc: 'Kargoların teslimat süresini 1 güne düşürür (En az 2 kişi).' },
        manager: { name: 'Müdür', cost: 2000, wage: 150, desc: 'Tüm maaşları %20 düşürür, bedava mal bulabilir.' } 
    },
    marketing: { 
        flyer: { name: 'Broşür', cost: 100, days: 2, pop: 10 }, 
        social: { name: 'Sosyal Medya', cost: 500, days: 5, pop: 25 }, 
        tv: { name: 'TV Reklamı', cost: 2500, days: 7, pop: 50 } 
    },
    upgrades: { 
        storage2: { name: 'Genişletme I', cost: 1500, cap: 300, bought: false }, 
        storage3: { name: 'Genişletme II', cost: 5000, cap: 1000, bought: false }, 
        storage4: { name: 'Lojistik Mrk.', cost: 20000, cap: 5000, bought: false } 
    },
    marketTrends: [ 
        { id: 'heatwave', name: 'Sıcak Hava', effect: { food: 0.5 } }, 
        { id: 'school', name: 'Okula Dönüş', effect: { clothes: 2.0 } }, 
        { id: 'techfair', name: 'Teknoloji Fuarı', effect: { tech: 2.5 } }, 
        { id: 'crypto', name: 'Kripto Çılgınlığı', effect: {} } 
    ]
};

// Procedurally generate up to 150 levels!
for(let i = 4; i <= 150; i++) {
    let cost = Math.floor(400000 * Math.pow(1.15, i - 3));
    let popBoost = 40 + (i - 3) * 5;
    let name = '';
    if(i < 10) name = `Uluslararası Plaza Kat ${i}`;
    else if(i < 30) name = `Dev Holding Merkezi Kat ${i}`;
    else if(i < 70) name = `Global Şirket Gökdeleni Kat ${i}`;
    else if(i < 120) name = `Silikon Vadisi Kampüsü Bölge ${i}`;
    else name = `Mega Dünya Tekeli Üssü Sv. ${i}`;
    
    let desc = `Kapasiteyi artırır, prestij sağlar. Seviye ${i} Kilidi açıldı!`;
    GameData.buildings[i] = { name, cost, popBoost, desc };
}
