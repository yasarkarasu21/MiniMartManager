const locales = {
    tr: {
        play: "Kariyere Başla", settings: "Ayarlar",
        shop: "Toptancı", inv: "Reyonlar", staff: "Personel", b2b: "İhaleler", manage: "Yönetim",
        finance: "Banka & Borsa", rd: "Ar-Ge Merkezi", upgrades: "Şirket Geliştirmeleri", factory: "Üretim Tesisi",
        loadCareer: "Kariyer Yükle", slotUsed: "Kayıt", slotEmpty: "Boş", back: "Geri Dön",
        endDay: "Günü Bitir 🌙",
        mainMenu: "Ana Menü", saveGame: "Şimdi Kaydet", theme: "Tema", lang: "Dil",
        themeModern: "Modern", themeClassic: "Klasik", themeMedieval: "Ortaçağ",
        vol: "Ses Seviyesi",
        newCareer: "Yeni Kariyere Başla",
        delete: "Bu kaydı silmek istediğine emin misin?",
        month: "Ay", day: "Gün", level: "Sv.", rep: "İtibar", playBtn: "Oyna ▶"
    },
    en: {
        play: "Start Career", settings: "Settings",
        shop: "Wholesale", inv: "Aisles", staff: "Staff", b2b: "Contracts", manage: "Manage",
        finance: "Bank & Stocks", rd: "R&D Center", upgrades: "Upgrades", factory: "Factory",
        loadCareer: "Load Career", slotUsed: "Save", slotEmpty: "Empty", back: "Go Back",
        endDay: "End Day 🌙",
        mainMenu: "Main Menu", saveGame: "Save Now", theme: "Theme", lang: "Language",
        themeModern: "Modern", themeClassic: "Classic", themeMedieval: "Medieval",
        vol: "Volume Level",
        newCareer: "Start New Career",
        delete: "Are you sure you want to delete this save?",
        month: "M", day: "Day", level: "Lv.", rep: "Rep", playBtn: "Play ▶"
    }
};

const t = (key) => {
    let lang = 'tr';
    if(typeof App !== 'undefined' && App.state && App.state.lang) lang = App.state.lang;
    return locales[lang][key] || key;
};
