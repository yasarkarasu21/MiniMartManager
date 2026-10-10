// js/config.js - Game Configurations & Constants

const products = {
    apple: { name: 'Elma', type: 'Manav', category: 'food', buy: 2, sell: 5, unlock: 0, space: 1, demand: 30, reqBuild: 1 },
    bread: { name: 'Ekmek', type: 'Fırın', category: 'food', buy: 3, sell: 7, unlock: 250, space: 1, demand: 25, reqBuild: 1 },
    milk: { name: 'Süt', type: 'Şarküteri', category: 'food', buy: 5, sell: 12, unlock: 600, space: 1, demand: 20, reqBuild: 1 },
    tshirt: { name: 'T-Shirt', type: 'Giyim', category: 'clothes', buy: 15, sell: 40, unlock: 1500, space: 2, demand: 15, reqBuild: 1 },
    shoes: { name: 'Ayakkabı', type: 'Giyim', category: 'clothes', buy: 35, sell: 85, unlock: 4000, space: 3, demand: 10, reqBuild: 1 },
    phone: { name: 'Telefon', type: 'Elektronik', category: 'tech', buy: 250, sell: 600, unlock: 10000, space: 2, demand: 5, reqBuild: 1 },
    laptop: { name: 'Laptop', type: 'Elektronik', category: 'tech', buy: 600, sell: 1500, unlock: 25000, space: 5, demand: 3, reqBuild: 1 },
    tv: { name: 'Plazma TV', type: 'Elektronik', category: 'tech', buy: 1500, sell: 3500, unlock: 75000, space: 10, demand: 2, reqBuild: 2 },
    car: { name: 'Spor Araba', type: 'Lüks', category: 'luxury', buy: 35000, sell: 80000, unlock: 500000, space: 50, demand: 1, reqBuild: 3 }
};

const buildings = {
    2: { name: 'Süpermarket', cost: 75000, popBoost: 15, desc: 'Plazma TV satabilmeni sağlar.' },
    3: { name: 'Mega AVM', cost: 400000, popBoost: 40, desc: 'Spor Araba galerisi açmanı sağlar.' }
};

const staffTypes = { 
    cashier: { name: 'Kasiyer', cost: 200, wage: 25 }, 
    guard: { name: 'Güvenlik', cost: 400, wage: 50 }, 
    janitor: { name: 'Temizlikçi', cost: 150, wage: 20 }, 
    manager: { name: 'Müdür', cost: 2000, wage: 150 } 
};

const marketing = { 
    flyer: { name: 'Broşür', cost: 100, days: 2, pop: 10 }, 
    social: { name: 'Sosyal Medya', cost: 500, days: 5, pop: 25 }, 
    tv: { name: 'TV Reklamı', cost: 2500, days: 7, pop: 50 } 
};

const upgrades = { 
    storage2: { name: 'Genişletme I', cost: 1500, cap: 300, bought: false }, 
    storage3: { name: 'Genişletme II', cost: 5000, cap: 1000, bought: false }, 
    storage4: { name: 'Lojistik Mrk.', cost: 20000, cap: 5000, bought: false } 
};

const marketTrends = [ 
    { id: 'heatwave', name: 'Sıcak Hava', effect: { food: 0.5 } }, 
    { id: 'school', name: 'Okula Dönüş', effect: { clothes: 2.0 } }, 
    { id: 'techfair', name: 'Teknoloji Fuarı', effect: { tech: 2.5 } }, 
    { id: 'crypto', name: 'Kripto Çılgınlığı', effect: {} } 
];
