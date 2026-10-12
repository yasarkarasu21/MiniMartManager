const GameData = {
    products: {
        apple: { name: 'Elma', type: 'Manav', category: 'food', buy: 2, sell: 5, unlock: 0, space: 1, demand: 30, reqBuild: 1, reqQuest: null, cargoDays: 1, isDefault: true },
        bread: { name: 'Ekmek', type: 'Fırın', category: 'food', buy: 3, sell: 7, unlock: 250, space: 1, demand: 25, reqBuild: 1, reqQuest: null, cargoDays: 1, isDefault: false },
        milk: { name: 'Süt', type: 'Şarküteri', category: 'food', buy: 5, sell: 12, unlock: 600, space: 1, demand: 20, reqBuild: 1, reqQuest: null, cargoDays: 1, isDefault: false },
        tshirt: { name: 'T-Shirt', type: 'Giyim', category: 'clothes', buy: 15, sell: 40, unlock: 1500, space: 2, demand: 15, reqBuild: 1, reqQuest: null, cargoDays: 2, isDefault: false },
        shoes: { name: 'Ayakkabı', type: 'Giyim', category: 'clothes', buy: 35, sell: 85, unlock: 4000, space: 3, demand: 10, reqBuild: 1, reqQuest: null, cargoDays: 2, isDefault: false },
        phone: { name: 'Telefon', type: 'Elektronik', category: 'tech', buy: 250, sell: 600, unlock: 10000, space: 2, demand: 5, reqBuild: 1, reqQuest: null, cargoDays: 3, isDefault: false },
        laptop: { name: 'Laptop', type: 'Elektronik', category: 'tech', buy: 600, sell: 1500, unlock: 25000, space: 5, demand: 3, reqBuild: 1, reqQuest: null, cargoDays: 3, isDefault: false },
        tv: { name: 'Plazma TV', type: 'Elektronik', category: 'tech', buy: 1500, sell: 3500, unlock: 75000, space: 10, demand: 2, reqBuild: 2, reqQuest: null, cargoDays: 4, isDefault: false },
        car: { name: 'Spor Araba', type: 'Lüks', category: 'luxury', buy: 35000, sell: 80000, unlock: 500000, space: 50, demand: 1, reqBuild: 3, reqQuest: null, cargoDays: 7, isDefault: false },
        pharmacy: { name: 'Vitamin & İlaç', type: 'Eczane', category: 'health', buy: 100, sell: 250, unlock: 35000, space: 1, demand: 15, reqBuild: 2, reqQuest: 'l6_q2', cargoDays: 2, isDefault: false },
        cosmetics: { name: 'Kozmetik', type: 'Kozmetik', category: 'health', buy: 50, sell: 150, unlock: 18000, space: 1, demand: 12, reqBuild: 1, reqQuest: 'l4_q1', cargoDays: 2, isDefault: false },
        toys: { name: 'Oyuncak', type: 'Oyuncak', category: 'toys', buy: 20, sell: 60, unlock: 8000, space: 2, demand: 18, reqBuild: 1, reqQuest: null, cargoDays: 2, isDefault: false },
        furniture: { name: 'Mobilya', type: 'Ev', category: 'home', buy: 800, sell: 2000, unlock: 120000, space: 15, demand: 2, reqBuild: 2, reqQuest: null, cargoDays: 5, isDefault: false }
    },
    levels: {
        "1": { name: "Mahalle Bakkalı", desc: "Ticarete ilk adımı at ve temel ihtiyaçları karşıla." },
        "2": { name: "Gelişen Esnaf", desc: "İlk personelini al ve dükkanını büyüt." },
        "3": { name: "Lojistik Ağı", desc: "Kendi araç filonu kur ve toptancı ağını güçlendir." },
        "4": { name: "Borsa & Yatırım", desc: "Finans dünyasına adım at ve kurumsal itibar kazan." },
        "5": { name: "Teknoloji & İhale", desc: "Büyük B2B sözleşmelerine imza at ve teknoloji sat." },
        "6": { name: "Süpermarket Zinciri", desc: "Devasa Süpermarket açılışı yap ve sağlık sektörüne gir." },
        "7": { name: "Üretim Holdingi", desc: "Kendi fabrikanı kur ve toptancıyı devreden çıkar." },
        "8": { name: "Mega AVM", desc: "Şehrin en gözde alışveriş merkezini inşa et." },
        "9": { name: "Piyasa Tekeli", desc: "Rakiplerini köşeye sıkıştır ve pazar payını %80'e çıkar." },
        "10": { name: "Dünya Tekeli", desc: "HyperMart'ı satın alarak piyasanın mutlak hakimi ol!" }
    },
    quests: {
        l1_q1: { level: 1, title: "İlk Sevkiyat", desc: "Toptancıdan 10 adet Elma siparişi ver.", prereqQuests: [], reqBuild: 1, condition: { type: "inventory", param: "apple", value: 10 }, reward: { money: 500, rp: 10, rep: 1 } },
        l1_q2: { level: 1, title: "Fırın Reyonu", desc: "Dükkanına Ekmek reyonu kur.", prereqQuests: ["l1_q1"], reqBuild: 1, condition: { type: "unlocked", param: "bread", value: true }, reward: { money: 750, rp: 15, rep: 2 } },
        l1_q3: { level: 1, title: "İlk Gün Sonu", desc: "Satışlarını tamamla ve $2,000 nakde ulaş.", prereqQuests: ["l1_q2"], reqBuild: 1, condition: { type: "money", value: 2000 }, reward: { money: 1000, rp: 20, rep: 2 } },

        l2_q1: { level: 2, title: "İlk Çalışan", desc: "Kasa kuyruğunu önlemek için 1 Kasiyer işe al.", prereqQuests: ["l1_q3"], reqBuild: 1, condition: { type: "staff", param: "cashier", value: 1 }, reward: { money: 800, rp: 15, rep: 2 } },
        l2_q2: { level: 2, title: "Şarküteri Reyonu", desc: "Müşteriler için Süt reyonu aç.", prereqQuests: ["l2_q1"], reqBuild: 1, condition: { type: "unlocked", param: "milk", value: true }, reward: { money: 1200, rp: 20, rep: 3 } },
        l2_q3: { level: 2, title: "Depo Genişletme", desc: "Depo Genişletme I satın alarak kapasiteyi artır.", prereqQuests: ["l2_q2"], reqBuild: 1, condition: { type: "upgrade", param: "storage2", value: true }, reward: { money: 1500, rp: 25, rep: 3 } },
        l2_q4: { level: 2, title: "Personel Güvencesi", desc: "Personel İstifalarını önlemek için SGK / Personel Sigortasını aç.", prereqQuests: ["l2_q3"], reqBuild: 1, condition: { type: "staffInsurance", value: true }, reward: { money: 1800, rp: 20, rep: 3 } },

        l3_q1: { level: 3, title: "Lojistik Devrimi", desc: "Filoya 1 adet Kamyon satın al.", prereqQuests: ["l2_q4"], reqBuild: 1, condition: { type: "fleet", param: "truck", value: 1 }, reward: { money: 2500, rp: 30, rep: 4 } },
        l3_q2: { level: 3, title: "Giyim Reyonu", desc: "T-Shirt reyonu açarak tekstil sektörüne adım at.", prereqQuests: ["l3_q1"], reqBuild: 1, condition: { type: "unlocked", param: "tshirt", value: true }, reward: { money: 2000, rp: 25, rep: 3 } },
        l3_q3: { level: 3, title: "Hayırsever İş İnsanı", desc: "Herhangi bir vakfa ilk bağışını yap.", prereqQuests: ["l3_q2"], reqBuild: 1, condition: { type: "foundation", value: 1 }, reward: { money: 3000, rp: 35, rep: 5 } },

        l4_q1: { level: 4, title: "Moda & Ayakkabı", desc: "Ayakkabı reyonunu kur.", prereqQuests: ["l3_q3"], reqBuild: 1, condition: { type: "unlocked", param: "shoes", value: true }, reward: { money: 3500, rp: 30, rep: 4 } },
        l4_q2: { level: 4, title: "Borsa Kurdu", desc: "Borsadan en az 10 Lot Altın satın al.", prereqQuests: ["l4_q1"], reqBuild: 1, condition: { type: "stock", param: "gold", value: 10 }, reward: { money: 5000, rp: 40, rep: 5 } },
        l4_q3: { level: 4, title: "Mağaza Güvenliği", desc: "Hırsızları önlemek için 1 Güvenlik Görevlisi tut.", prereqQuests: ["l4_q2"], reqBuild: 1, condition: { type: "staff", param: "guard", value: 1 }, reward: { money: 4000, rp: 35, rep: 4 } },
        l4_q4: { level: 4, title: "Güzellik & Bakım", desc: "Kozmetik reyonunu açarak ürün yelpazeni genişlet.", prereqQuests: ["l4_q3"], reqBuild: 1, condition: { type: "unlocked", param: "cosmetics", value: true }, reward: { money: 4500, rp: 35, rep: 4 } },

        l5_q1: { level: 5, title: "Teknoloji Çağı", desc: "Telefon reyonunu açarak elektroniğe geç.", prereqQuests: ["l4_q4"], reqBuild: 1, condition: { type: "unlocked", param: "phone", value: true }, reward: { money: 6000, rp: 45, rep: 6 } },
        l5_q2: { level: 5, title: "İlk Büyük İhale", desc: "B2B sekmesinden 1 adet sözleşmeyi başarıyla teslim et.", prereqQuests: ["l5_q1"], reqBuild: 1, condition: { type: "b2b", value: 1 }, reward: { money: 8000, rp: 50, rep: 8 } },
        l5_q3: { level: 5, title: "Büyük Sermaye", desc: "Kasada $50,000 nakit biriktir.", prereqQuests: ["l5_q2"], reqBuild: 1, condition: { type: "money", value: 50000 }, reward: { money: 10000, rp: 60, rep: 10 } },
        l5_q4: { level: 5, title: "Oyuncak Dünyası", desc: "Çocuklar için Oyuncak reyonunun kilidini aç.", prereqQuests: ["l5_q3"], reqBuild: 1, condition: { type: "unlocked", param: "toys", value: true }, reward: { money: 12000, rp: 65, rep: 10 } },

        l6_q1: { level: 6, title: "Süpermarket Açılışı", desc: "Bina seviyeni Süpermarket'e (Seviye 2) yükselt.", prereqQuests: ["l5_q4"], reqBuild: 2, condition: { type: "buildingLevel", value: 2 }, reward: { money: 15000, rp: 80, rep: 12 } },
        l6_q2: { level: 6, title: "Sağlık & Eczane", desc: "Vitamin & İlaç reyonunu aç.", prereqQuests: ["l6_q1"], reqBuild: 2, condition: { type: "unlocked", param: "pharmacy", value: true }, reward: { money: 12000, rp: 70, rep: 10 } },
        l6_q3: { level: 6, title: "Toplumsal Destek", desc: "Bir vakfı Seviye 3'e kadar geliştir.", prereqQuests: ["l6_q2"], reqBuild: 2, condition: { type: "foundationLevel", value: 3 }, reward: { money: 20000, rp: 90, rep: 15 } },

        l7_q1: { level: 7, title: "Kendi Fabrikan", desc: "Toptancıyı aradan çıkarmak için Fabrika satın al.", prereqQuests: ["l6_q3"], reqBuild: 2, condition: { type: "factory", value: true }, reward: { money: 25000, rp: 100, rep: 15 } },
        l7_q2: { level: 7, title: "Şirket Avukatı", desc: "Hukuk departmanına en az Seviye 2 (Şirket Avukatı) ata.", prereqQuests: ["l7_q1"], reqBuild: 2, condition: { type: "lawyer", value: 2 }, reward: { money: 15000, rp: 85, rep: 10 } },
        l7_q3: { level: 7, title: "İtibar Devrimi", desc: "Şirket itibarını (REP) 50'ye ulaştır.", prereqQuests: ["l7_q2"], reqBuild: 2, condition: { type: "rep", value: 50 }, reward: { money: 30000, rp: 120, rep: 20 } },

        l8_q1: { level: 8, title: "Mega AVM Projesi", desc: "Bina seviyeni Mega AVM'ye (Seviye 3) yükselt.", prereqQuests: ["l7_q3"], reqBuild: 3, condition: { type: "buildingLevel", value: 3 }, reward: { money: 50000, rp: 150, rep: 25 } },
        l8_q2: { level: 8, title: "Lüks Otomobil Galerisi", desc: "Spor Araba reyonunun kilidini aç.", prereqQuests: ["l8_q1"], reqBuild: 3, condition: { type: "unlocked", param: "car", value: true }, reward: { money: 75000, rp: 200, rep: 30 } },
        l8_q3: { level: 8, title: "Lüks Ev & Mobilya", desc: "Mobilya reyonunu açarak AVM'yi donat.", prereqQuests: ["l8_q2"], reqBuild: 3, condition: { type: "unlocked", param: "furniture", value: true }, reward: { money: 60000, rp: 180, rep: 25 } },
        l8_q4: { level: 8, title: "Büyük Çevre Hamisi", desc: "Yeşil Doğa Vakfını en az Seviye 5 yap.", prereqQuests: ["l8_q3"], reqBuild: 3, condition: { type: "foundationLevel", value: 5 }, reward: { money: 80000, rp: 220, rep: 35 } },

        l9_q1: { level: 9, title: "Gökyüzü Filosu", desc: "Filoya 1 adet Kargo Uçağı satın al.", prereqQuests: ["l8_q4"], reqBuild: 3, condition: { type: "fleet", param: "plane", value: 1 }, reward: { money: 100000, rp: 300, rep: 40 } },
        l9_q2: { level: 9, title: "Piyasa Hakimiyeti", desc: "Pazar payını %80'e çıkar.", prereqQuests: ["l9_q1"], reqBuild: 3, condition: { type: "marketShare", value: 80 }, reward: { money: 150000, rp: 350, rep: 50 } },
        l9_q3: { level: 9, title: "Dev Kasa Birikimi", desc: "Kasada $300,000 nakit rezervi tut.", prereqQuests: ["l9_q2"], reqBuild: 3, condition: { type: "money", value: 300000 }, reward: { money: 120000, rp: 250, rep: 35 } },
        l9_q4: { level: 9, title: "Holding Gökdeleni", desc: "Bina seviyeni Plaza Seviye 4 veya üzerine yükselt.", prereqQuests: ["l9_q3"], reqBuild: 4, condition: { type: "buildingLevel", value: 4 }, reward: { money: 180000, rp: 400, rep: 50 } },

        l10_q1: { level: 10, title: "Mutlak Tekel", desc: "HyperMart'ı satın alarak rakibini tamamen yok et!", prereqQuests: ["l9_q4"], reqBuild: 3, condition: { type: "rivalDefeated", value: true }, reward: { money: 500000, rp: 1000, rep: 100 } },
        l10_q2: { level: 10, title: "Dünya Hayırseveri", desc: "Tüm vakıfların toplam seviyesini en az 20 yap.", prereqQuests: ["l10_q1"], reqBuild: 3, condition: { type: "foundation", value: 20 }, reward: { money: 300000, rp: 600, rep: 60 } },
        l10_q3: { level: 10, title: "Finans Lordu", desc: "Borsada 50 Lot Altın rezervi bulundur.", prereqQuests: ["l10_q2"], reqBuild: 3, condition: { type: "stock", param: "gold", value: 50 }, reward: { money: 400000, rp: 700, rep: 70 } },
        l10_q4: { level: 10, title: "Küresel İmparatorluk", desc: "$2,000,000 toplam nakde ulaşarak tarihe geç!", prereqQuests: ["l10_q3"], reqBuild: 4, condition: { type: "money", value: 2000000 }, reward: { money: 1000000, rp: 2000, rep: 200 } }
    },
    foundations: {
        children: { id: "children", name: "Geleceğe Umut Çocuk Vakfı", icon: "🧒", desc: "Öğrencilere burs ve ihtiyaç sahibi çocuklara gıda desteği sağlar.", baseCost: 5000, maxLevel: 10, effectPerLevel: { pop: 5, demandPercent: 3 }, effectDesc: "Seviye başına +5 Kalıcı Popülarite ve +%3 Müşteri Talebi." },
        green: { id: "green", name: "Yeşil Doğa & Temiz Çevre Vakfı", icon: "🌱", desc: "Şehirde fidan dikimi ve çevre projeleri yürütür.", baseCost: 7500, maxLevel: 10, effectPerLevel: { taxDiscountPercent: 2, ministerRel: 2 }, effectDesc: "Haftalık kurumlar vergisinde %2 indirim ve Bakanlık desteği." },
        tech_edu: { id: "tech_edu", name: "Milli Teknoloji & Burs Vakfı", icon: "💡", desc: "Genç girişimcilere ve teknoloji Ar-Ge laboratuvarlarına fon sağlar.", baseCost: 10000, maxLevel: 10, effectPerLevel: { dailyRP: 2 }, effectDesc: "Her gün sonu otomatik +2 Ar-Ge Puanı (RP) üretir." },
        animal: { id: "animal", name: "Can Dostlar Hayvanları Koruma Vakfı", icon: "🐾", desc: "Sokak hayvanları barınakları ve veteriner kliniklerine destek olur.", baseCost: 4000, maxLevel: 10, effectPerLevel: { corporateRep: 4, reviewBoost: true }, effectDesc: "Seviye başına +4 Kurumsal İtibar (REP) ve olumlu müşteri yorumları." }
    },
    institutions: {
        wholesaler: {
            id: "wholesaler", name: "Toptancılar Birliği", icon: "📦", desc: "Tedarik zincirinin kalbi. İlişki yüksekse malları indirimli alırsın. Düşükse fiyatlar zamlanır.", defaultVal: 50, weeklyDecay: 2,
            minigame: {
                title: "🤝 Toptancıyla Pazarlık Masası", desc: "Toptancılar Birliği başkanıyla ofisinde bir araya geldin. Hangi yaklaşımı seçeceksin?",
                options: [
                    { id: "tea", name: "☕ Çay Ismarla & Samimi Ol", desc: "Risksiz ve güvenli.", successRate: 0.75, successBonus: 10, failPenalty: 0, successMsg: "Sıcak bir sohbet geçti, toptancı sana güvendi! (+10 İlişki)", failMsg: "Toptancı meşguldü, pek vakit ayıramadı." },
                    { id: "bulk", name: "📑 Büyük Sevkiyat Sözü Ver", desc: "Dengeli risk.", successRate: 0.50, successBonus: 20, failPenalty: -10, successMsg: "Gelecek sipariş sözün toptancıyı mest etti! (+20 İlişki)", failMsg: "Toptancı sözüne şüpheyle yaklaştı. (-10 İlişki)" },
                    { id: "hard", name: "💼 Sert İndirim Masaya Koy", desc: "Yüksek risk, yüksek getiri.", successRate: 0.35, successBonus: 30, failPenalty: -15, successMsg: "Profesyonel duruşunla toptancıyı ikna ettin! (+30 İlişki)", failMsg: "Toptancı restine sert karşılık verdi! (-15 İlişki)" }
                ]
            }
        },
        minister: {
            id: "minister", name: "Maliye Bakanlığı & Denetim", icon: "🏛️", desc: "Vergi politikaları ve devlet hibeleri. İlişki yüksekse vergi sıfırlanabilir. Düşükse çifte vergi ve denetim gelir.", defaultVal: 50, weeklyDecay: 2,
            minigame: {
                title: "📋 Bakanlık Denetim Sunumu", desc: "Müfettişler şirketini teftişe geldi. Nasıl bir savunma dosyası sunacaksın?",
                options: [
                    { id: "audit", name: "📊 Şeffaf Muhasebe Defteri", desc: "Standart yasal beyan.", successRate: 0.70, successBonus: 12, failPenalty: -8, successMsg: "Müfettişler hesapları tertemiz buldu! (+12 İlişki)", failMsg: "Ufak pürüzler tespit edildi. (-8 İlişki)" },
                    { id: "csr", name: "🌱 Sosyal Sorumluluk Dosyası", desc: "Vakıf bağışlarını öne sür.", successRate: 0.60, successBonus: 22, failPenalty: -5, successMsg: "Devlet, yaptığın hayırseverlikten gurur duydu! (+22 İlişki)", failMsg: "Müfettişler sadece resmi rakamlara baktı." },
                    { id: "sponsor", name: "🏛️ Kamu Projesine Sponsorluk ($10,000)", desc: "Garantili devlet teşviki.", cost: 10000, successRate: 1.0, successBonus: 25, failPenalty: 0, successMsg: "Bakanlık şilt takdim etti ve tebrik mektubu yolladı! (+25 İlişki)", failMsg: "" }
                ]
            }
        },
        mafia: {
            id: "mafia", name: "Yeraltı Dünyası (Rüşvet)", icon: "🕶️", desc: "Şehrin arka sokaklarındaki güç. İlişki yüksekse rakipleri sabote ederler. Düşükse dükkanına zarar verirler.", defaultVal: 10, weeklyDecay: 1,
            minigame: { title: "🎲 Yeraltı Kumar & Zar Düellosu", desc: "Arka sokaktaki depoda mafya lideriyle zar atıyorsun. (Yüksek atan kazanır)", isDice: true, winBonus: 25, winMoney: 10000, losePenalty: -15, loseMoney: 5000 }
        }
    },
    news: [
        { id: "crisis", title: "Dünya Ekonomik Krizi", desc: "Küresel tedarik zinciri aksadı, toptan alım fiyatları fırladı!", type: "negative", effects: { buyMod: 1.3, popChange: -5 } },
        { id: "stimulus", title: "Hükümetten KOBİ Teşvik Paketi", desc: "Yerel esnafa devletten karşılıksız hibe desteği sağlandı!", type: "positive", effects: { moneyChange: 5000 } },
        { id: "festival", title: "Şehirde Alışveriş Festivali", desc: "Şehre binlerce turist akın etti, perakende satış patlaması bekleniyor!", type: "positive", effects: { popChange: 25 } },
        { id: "strike", title: "Liman İşçileri Grevi", desc: "Gümrük kapılarında kargo operasyonları aksıyor.", type: "negative", effects: { buyMod: 1.15, popChange: -5 } },
        { id: "tax_refund", title: "Sürpriz Vergi İadesi", desc: "Maliye Bakanlığı fazla tahsil edilen vergileri iade etti!", type: "positive", effects: { taxRefundPercent: 0.05 } },
        { id: "rival_scandal", title: "Rakip Markada Hijyen Skandalı", desc: "HyperMart'ta skandal patlak verdi. Müşteriler sana yöneliyor!", type: "positive", effects: { popChange: 15, marketShareChange: 3.0 } }
    ],
    law: {
        lawyers: [
            { level: 0, name: "Avukat Yok", fee: 0, winRate: 10, desc: "Çok riskli. %10 Mahkeme kazanma şansı." },
            { level: 1, name: "Stajyer Avukat", fee: 200, winRate: 40, desc: "Günlük ücreti ucuz. %40 Mahkeme kazanma şansı." },
            { level: 2, name: "Şirket Avukatı", fee: 1000, winRate: 70, desc: "Profesyonel savunma. %70 Mahkeme kazanma şansı." },
            { level: 3, name: "Şeytanın Avukatı", fee: 4000, winRate: 95, desc: "Davalarda mutlak zafer. %95 Mahkeme kazanma şansı." }
        ],
        lawsuitTypes: [
            { type: "Müşteri Reyonda Kayıp Düştü", baseCost: 15000, preventable: true },
            { type: "Bozuk Ürün Zehirlenmesi", baseCost: 35000, preventable: false },
            { type: "Personel Hakareti Davası", baseCost: 8000, preventable: false },
            { type: "Hatalı Elektronik Patlaması", baseCost: 25000, preventable: false },
            { type: "Telif Hakkı İhlali İhtarı", baseCost: 50000, preventable: false }
        ]
    },
    buildings: {
        1: { name: 'Kiosk', cost: 0, popBoost: 0, desc: 'Temel satış noktası ve mahalle esnaflığı.' },
        2: { name: 'Süpermarket', cost: 75000, popBoost: 15, desc: 'Geniş reyonlar, Plazma TV, Mobilya ve İlaç satışı.' },
        3: { name: 'Mega AVM', cost: 400000, popBoost: 40, desc: 'Spor Araba galerisi ve devasa müşteri kapasitesi.' }
    },
    staffTypes: { 
        cashier: { name: 'Kasiyer', cost: 200, wage: 25, desc: 'Günlük +5 Müşteri Talebi artışı sağlar.' }, 
        guard: { name: 'Güvenlik', cost: 400, wage: 50, desc: 'Hırsızları yakalayıp tazminat kazandırır.' }, 
        janitor: { name: 'Temizlikçi', cost: 150, wage: 20, desc: 'Düşme ve kayma kazası davalarını önler.' }, 
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
    ],

    // Async loader from assets/settings/ folder
    loadSettingsAsync: async function() {
        const files = [
            { path: 'assets/settings/urunler.json', key: 'products', sub: 'products' },
            { path: 'assets/settings/gorevler.json', key: 'quests', sub: 'quests' },
            { path: 'assets/settings/gorevler.json', key: 'levels', sub: 'levels' },
            { path: 'assets/settings/vakiflar.json', key: 'foundations', sub: 'foundations' },
            { path: 'assets/settings/iliskiler.json', key: 'institutions', sub: 'institutions' },
            { path: 'assets/settings/haberler.json', key: 'news', sub: 'news' },
            { path: 'assets/settings/hukuk.json', key: 'law', sub: null },
            { path: 'assets/settings/binalar.json', key: 'buildings', sub: 'baseBuildings' }
        ];

        for (let item of files) {
            try {
                let res = await fetch(item.path);
                if (res.ok) {
                    let data = await res.json();
                    let val = item.sub ? data[item.sub] : data;
                    if (val) {
                        if (item.key === 'buildings') {
                            for (let bId in val) GameData.buildings[bId] = val[bId];
                        } else {
                            GameData[item.key] = val;
                        }
                    }
                }
            } catch (e) {
                // Keep default embedded data if fetch is unavailable (e.g. file:// protocol)
            }
        }
    }
};

// Procedurally generate buildings up to 150 levels
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
