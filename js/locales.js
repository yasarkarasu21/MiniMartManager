const locales = {
    tr: {
        // Genel & Başlangıç
        play: "Kariyere Başla",
        settings: "Ayarlar",
        shop: "Toptancı",
        inv: "Reyonlar",
        staff: "Personel",
        b2b: "İhaleler",
        manage: "Yönetim",
        finance: "Banka & Borsa",
        rd: "Ar-Ge Merkezi",
        upgrades: "Geliştirmeler",
        factory: "Üretim Tesisi",
        loadCareer: "Kariyer Yükle",
        slotUsed: "Kayıt",
        slotEmpty: "Boş Slot",
        back: "Geri Dön",
        endDay: "Günü Bitir 🌙",
        mainMenu: "Ana Menü",
        saveGame: "Şimdi Kaydet",
        theme: "Görsel Tema",
        lang: "Dil / Language",
        vol: "Ses Seviyesi",
        newCareer: "Yeni Kariyere Başla",
        delete: "Bu kaydı silmek istediğine emin misin?",
        month: "Ay",
        week: "Hft",
        day: "Gn",
        level: "Sv.",
        rep: "İtibar",
        playBtn: "Oyna ▶",
        savedSuccess: "💾 Oyun Başarıyla Kaydedildi",
        careerLoaded: "Kariyer Yüklendi!",
        yes: "Evet",
        cancel: "Vazgeç",
        confirm: "Onayla",
        close: "Kapat",
        done: "Tamam",
        levelText: "Seviye",

        // Temalar
        themeModern: "Modern (Neon Mavi)",
        themeClassic: "Klasik (Retro 90'lar)",
        themeMedieval: "Ortaçağ (Tüccar Hanı)",
        themeDark: "Karanlık Mod (OLED)",
        themeCyberpunk: "Cyberpunk (Gece Kulübü)",

        // Header İstatistikleri
        headerDate: "Tarih",
        headerMoney: "Nakit Kasa",
        headerPop: "Popülarite",
        headerCargo: "Kargo Filosu",
        headerMarket: "Pazar Payı",
        headerMorale: "Patron Morali",
        headerStorage: "Depo Doluluğu",
        headerTrend: "Piyasa Trendi",

        // Toptancı Ekranı (Shop)
        shopTitle: "🛒 Toptancı Hali & Tedarik",
        blackMarketTitle: "🕵️ Karaborsa Fırsatı",
        blackMarketDesc: "Gümrüksüz ve kaçak mallar. Fiyat %80 daha ucuz ama polis baskını riski var!",
        wholesaleBuy: "Al",
        wholesaleSell: "Toptancıya İade",
        spaceUnit: "Hacim",
        costUnit: "Alış",
        refundUnit: "İade",
        stockUnit: "Depoda",

        // Reyonlar Ekranı (Inventory)
        invTitle: "🏪 Mağaza Reyonları",
        unitCost: "Birim Maliyet",
        recPrice: "Önerilen Fiyat",
        currentPrice: "Satış Fiyatı",
        stockLabel: "Stok",
        aisleTitle: "Reyonu",
        newAisleTitle: "🔨 Yeni Reyon Kurulumu",
        reqBuilding: "Seviye {n} Bina Gerekli",
        reqQuestDone: "Görevi Tamamlanmalı",
        installCost: "Kurulum Bedeli",
        buildAisleBtn: "Reyonu Aç",

        // Personel Ekranı (Staff)
        staffTitle: "👥 Şirket Personel Kadrosu",
        staffLimit: "Personel Kapasitesi",
        staffLimitSub: "Daha büyük binalar daha fazla personel istihdam edebilir.",
        staffInsuranceTitle: "🛡️ Personel Sigortası (SGK)",
        staffInsuranceActive: "Aktif (İstifalar Engellendi)",
        staffInsuranceInactive: "Kapalı (İstifa Riski Var)",
        staffInsuranceCost: "Maliyet: $15/personel/gün",
        staffInsuranceDescOn: "✅ Personeller güvencede, istifalar ve davalar önlenir.",
        staffInsuranceDescOff: "⚠️ Sigortasız çalışanlar istifa edebilir ve patron morali düşer!",
        staffInsuranceBtnOn: "Sigortalı ✅",
        staffInsuranceBtnOff: "Sigorta Başlat",
        wageDaily: "Maaş: {cost}/Gün",
        nextHireCost: "Sonraki Alım: {cost}",
        fireStaffBtn: "Çıkar",
        hireStaffBtn: "İşe Al",

        // B2B İhaleler Ekranı
        b2bTitle: "🤝 Kurumsal B2B İhaleleri",
        corpRep: "Kurumsal İtibar",
        corpRepSub: "İhaleleri zamanında teslim ederek kurumsal itibarınızı artırın.",
        incomingBids: "Gelen İhale Teklifleri",
        noIncomingBids: "Şu an açık bir kurumsal ihale teklifi bulunmuyor.",
        activeContracts: "Aktif Yürütülen Sözleşmeler",
        noActiveContracts: "Şu an yürütülen aktif sözleşmeniz bulunmuyor.",
        acceptBidBtn: "İhaleyi Al",
        deliverBidBtn: "Malları Teslim Et",
        daysRemaining: "Kalan Süre",
        requestedLabel: "İstenen Mal",
        rewardLabel: "Ödül",
        penaltyLabel: "Gecikme Cezası",

        // Hukuk Departmanı
        lawTitle: "🧑‍⚖️ Hukuk Departmanı & Davalar",
        lawSub: "Davalarla başa çıkmak için bir avukat tutun veya duruşmada zar atın!",
        lawyerRaiseTitle: "💼 Avukata Prim & Zam",
        lawyerRaiseCost: "Maliyet: +$1,000/gün",
        lawyerRaiseStatusOn: "Aktif (+%20 Zafer Bonusu & Zar Avantajı)",
        lawyerRaiseStatusOff: "Standart Tarife",
        lawyerRaiseDesc: "Avukata prim ödendiğinde davaları kazanma şansı %20 artar ve duruşma zarlarında +2 avantaj sağlar.",
        lawyerRaiseBtnOn: "Prim Veriliyor ✅",
        lawyerRaiseBtnOff: "Prim/Zam Ver",
        lawyerHireTitle: "💼 Avukat Kiralama",
        lawyerCurrentBadge: "Mevcut",
        hireBtn: "Kirala",
        lawsuitsTitle: "🚨 Bekleyen Davalar",
        noLawsuitsMsg: "Şirkete açılmış bir dava yok! 🎉",
        claimAmount: "Tazminat Talebi",
        daysUntilTrial: "Mahkemeye Kalan",
        trialDiceBtn: "🎲 Zar At<br><small>(Duruşma)</small>",
        settleLawsuitBtn: "Anlaş<br>({cost})",

        // Banka & Finans
        financeTitle: "🏦 Banka, Krediler & Borsa",
        loansTitle: "💳 Kredi Paketleri",
        activeLoansTitle: "💳 Aktif Kredi Borçların",
        payOffLoanBtn: "Borcu Kapat",
        depositTitle: "💰 Vadeli Mevduat Hesabı",
        depositDesc: "Paranızı bankaya yatırarak her gün %2 risksiz faiz geliri elde edin.",
        depositBalance: "Mevduattaki Para",
        depositBtn: "Para Yatır",
        withdrawBtn: "Para Çek",
        stocksTitle: "📈 Borsa & Hisse Senetleri",
        stockShares: "Hisse Adedi",
        stockPrice: "Birim Fiyat",
        buyStockBtn: "Hisse Al",
        sellStockBtn: "Hisse Sat",

        // Ar-Ge & Seviyeler
        rdTitle: "🧪 Ar-Ge Laboratuvarı & Yetenekler",
        currentRP: "Mevcut RP (Araştırma Puanı)",
        rpSub: "RP her gün mağaza satışlarından ve teknoloji yatırımlarından kazanılır.",
        unlockSkillBtn: "Yetenek Aç",
        skillUnlocked: "Açıldı ✅",
        statusTitle: "Mevcut Şirket Statüsü",
        skillsTitle: "💡 Ar-Ge Yetenekleri",
        levelQuestsTitle: "📋 Seviye Görevleri & Hedefler",
        completedBadge: "✅ Tamamlandı",
        activeBadge: "⭐ Aktif Seviye",
        lockedBadge: "🔒 Kilitli",
        inProgress: "Devam Ediyor",
        claimRewardBtn: "🎁 Ödülü Al",
        rewardClaimed: "✅ Alındı",
        reqBuildingAlert: "⚠️ Gereken Bina: Seviye {n}",
        unlockedTag: "Açıldı",
        rpCost: "Aç ({cost} RP)",

        // Geliştirmeler & Bina
        upgradesTitle: "🏢 Bina, Depo & Filo Geliştirmeleri",
        buildingUpgradeCard: "{name} Binasına Geç",
        maxBuildingBadge: "En lüks binadasın!",
        upgradeBtn: "Geliştir",
        storageUpgradesTitle: "📦 Depo Kapasitesi Genişletmeleri",
        fleetLogisticsTitle: "🚚 Lojistik Filosu",
        marketingTitle: "📢 Pazarlama & Reklam",
        marketingActive: "Kampanya Aktif! (Kalan: {days} Gün)",
        marketingStartBtn: "Başlat ({cost})",
        prestigeEmpireTitle: "👑 Franchise (Prestij)",
        currentPrestigeFP: "Şu anki Prestij (FP):",
        doPrestigeBtn: "Şirketi Devret & Prestij Yap",

        // Fabrika
        factoryTitle: "🏭 Özel Marka Üretim Tesisi",
        factorySub: "Toptancıyı aradan çıkararak kendi markanı maliyetine üret!",
        buyFactoryTitle: "Kendi Fabrikanı Kur!",
        buyFactoryDesc: "Toptancıya para yedirme. Ürünleri %70 daha ucuza mal et!",
        buyFactoryBtn: "Fabrika Kur ($50,000)",
        factoryTierHeader: "🏭 Seviye {lvl} Fabrika",
        assemblyLine: "Üretim Bandı:",
        factoryStopOpt: "-- Üretimi Durdur --",
        factoryRateDesc: "{qty} adet/gün | Maliyet: {cost}",
        factoryFootnoteText: "* Fabrika her gün sonu otomatik olarak ürünü üretip doğrudan depona yollar.",

        // Pazar & Rekabet
        marketShareReportTitle: "📊 Pazar Payı Raporu",
        marketShareReportSub: "Piyasadaki etkinliğini ve rakiplerini gör.",
        youLabel: "Sen",
        rivalLabel: "Rakip",
        marketTips: "Pazar payını artırmak için fiyatlarını düşürebilir, popülariteni yüksek tutabilirsin. Rakibini yenersen pazarı tekeline alırsın!",
        hostileTakeoverTitle: "🏆 Büyük Satın Alma",
        hostileTakeoverDesc: "Rakibini tamamen piyasadan silmek için Pazar Payının %99, bakiyenin ise $1,000,000 olması gerekir.",
        hostileTakeoverBtn: "Rakibi Satın Al",
        monopolyAchieved: "🏆 RAKİP YOK EDİLDİ! PİYASANIN TEK HAKİMİ SENSİN!",

        // İlişki & Vakıf
        relationsTitle: "🤝 Kurum İlişkileri & Hayırseverlik",
        relationsSub: "Masadaki güçlerle ilişkilerini koru ve vakıf bağışlarıyla kalıcı itibar kazan!",
        powersHeader: "🏢 Masadaki Güçler (Mini Oyunlar & Kararlar)",
        statusExcellent: "Mükemmel",
        statusBalanced: "Dengeli",
        statusHostile: "Düşmanca",
        charityHeader: "🌱 Hayırseverlik & Vakıflar (Sosyal Yatırım)",
        charitySub: "Bağış yaparak vakıfları geliştir; her seviye şirketinize kalıcı itibar ve pasif avantajlar sağlar.",
        noDonationsYet: "Henüz bağış yapılmadı.",
        activeBonus: "Aktif Bonus:",
        donateBtnAction: "🌟 Bağış Yap ({cost})",
        diceRollMafiaBtn: "🎲 Zarları At! (Kazan: +25 İlişki & $10,000 / Kaybet: -15 & -$5,000)",
        chanceGuaranteed: "Garantili",
        chancePct: "%{n} Şans",

        // Yorumlar & Kargo & Takvim & Yol Haritası
        noReviewsMsg: "Henüz hiç müşteri yorumu yok. İlk gününü bitirdiğinde buraya yorumlar düşecek!",
        noCargoMsg: "Şu an yolda olan bir kargo yok. Siparişlerinizi Toptancı sekmesinden verebilirsiniz.",
        totalSpaceLabel: "Toplam Hacim:",
        daysLeftLabel: "Kalan:",
        noCalendarMsg: "Henüz kayıtlı bir günlüğün yok. İlk gününü bitirdiğinde buralar dolacak!",
        noEventsMsg: "Kayıtlı olay yok.",
        roadmapIntro: "Mega Mart Tycoon toplam 150 Seviye bina geliştirmesi sunar! Şu anki seviyen: Sv. {n}",
        currentBuildingBadge: "ŞU ANKİ BİNAN",
        clearedBadge: "Geçildi",
        popContribution: "Popülarite Katkısı: +{n}",

        // Gün Sonu Raporu Modali
        endDayReportTitle: "📅 Gün Sonu Şirket Raporu",
        reportRevenue: "KAZANÇ",
        reportExpenses: "GİDER",
        reportNetProfit: "NET KAR",
        reportNetLoss: "NET ZARAR",
        tabKasa: "💰 Kasa",
        tabPazar: "📰 Pazar",
        tabHukuk: "⚖️ Hukuk",
        tabDuyurular: "📢 Duyurular",
        endDayConfirmBtn: "Tamam / Sonraki Gün",
        progressSaved: "💾 Günlük İlerleme Otomatik Kaydedildi",

        // Günlük Giriş Modali
        dailyBonusTitle: "📅 GÜNLÜK GİRİŞ SERİSİ",
        dailyBonusWelcome: "Hoş geldin Patron! Giriş serisi:",
        dailyBonusDay: "Gün",
        dailyBonusRewards: "Bugünün Ödülleri:",
        dailyBonusCash: "Nakit Para",
        dailyBonusRP: "Ar-Ge Puanı (RP)",
        dailyBonusMorale: "Patron Morali",
        dailyBonusJackpot: "🎉 7. GÜN BÜYÜK İKRAMİYESİ ALINDI!",

        // CEO Odası & Casusluk & Kasa Rush
        penthouseTitle: "👑 CEO Penthouse & Özel Koleksiyon",
        penthouseSub: "Lüks ofis eşyalarıyla statünü yükselt, kalıcı kurumsal pasif güçler kazan!",
        espionageTitle: "🕵️‍♂️ Kurumsal Casusluk & İstihbarat",
        espionageSub: "Rakip HyperMart'a gizli operasyonlar düzenle, pazar paylarını ele geçir!",
        cashierRushTitle: "⚡ Kasa Rush Mini-Oyunu",
        cashierRushSub: "Kasiyerin yerine geç, müşterilerin barkodlarını jet gibi okut ve bonus nakit kap!",
        cashierRushBtn: "⚡ Kasa Başına Geç!",

        // Bildirimler & Ekstra
        deleteCareerTitle: "Kariyeri Sil",
        deleteConfirm: "Evet, Sil",
        roadmapTitle: "Yol Haritası",
        roadmapSub: "150 Seviye bina yolculuğu",
        maxLevelBadge: "Maksimum Seviye",
        penthouseActiveCollection: "Penthouse Koleksiyonunda Aktif",
        buyBtn: "Satın Al",
        ownedBadge: "Sahipsin ✅",
        emptyKasa: "Bugün kasa hareketi olmadı.",
        emptyHaberler: "Bugün önemli bir piyasa veya trend haberi yok.",
        emptyHukuk: "Herhangi bir dava veya duruşma gelişmesi yok.",
        emptyDuyurular: "Özel bir şirket duyurusu bulunmuyor.",
        emergencyCashTitle: "Acil Nakit",
        commGrowthLoanTitle: "Ticari Kredi (Büyüme)",
        holdingLoanTitle: "Holding Yatırımı",
        loanPrincipal: "Alınan: {got} | Geri Ödeme: {pay}",
        loanTerm: "{days} Gün Vadeli (Günlük: {daily})",
        loanTakeBtn: "Al",
        goldStock: "Altın",
        bribeContractDesc: "Gizli bir ödeme karşılığı iyilik isteniyor.",
        bribeCostDesc: "Bedeli: İtibar Kaybı",
        cargoDaysLeft: "Kalan:<br>{days} Gün",
        andMoreRoadmap: "... ve 150. seviyeye kadar daha fazlası!",
        tutorialBack: "⬅ Geri",
        tutorialNext: "İleri ➡",
        tutorialStart: "Başla! 🚀",
        startEspionageBtn: "Operasyonu Başlat ({cost})",
        espionageActiveSpy: "🕵️ Aktif Operasyon: Fiyat Casusu devrede! (Kalan: {days} Gün - Tüm alışlarda %15 indirim)",
        insufficientFunds: "Yetersiz bakiye!",
        insufficientStorage: "Depoda yeterli alan yok!",
        insufficientTransport: "Nakliye filosu kapasitesi yetersiz!",
        deptUnlocked: "Reyon başarıyla açıldı!",
        itemPurchased: "Sipariş verildi!",
        itemSoldWholesale: "Ürün toptancıya iade edildi!",
        staffHired: "Personel işe alındı!",
        staffFired: "Personel işten çıkarıldı.",
        lawsuitSettled: "Dava masada uzlaşıldı!",
        diceRolling: "Zarlar atılıyor...",
        diceWin: "🏆 KAZANDIN!",
        diceLose: "💥 KAYBETTİN!",
        diceTie: "🤝 BERABERE!",
        buildingUpgraded: "🏢 Yeni dükkanına geçtin!",
        allQuestsDone: "🏆 TÜM GÖREVLER TAMAMLANDI!",
        walkthroughTitle: "📖 Oyunu Bitirme Kılavuzu",
        walkthroughBtn: "📖 Bitirme Kılavuzu",
        autopilotBtn: "🤖 Oto-Pilot (Bot Oynasın)",
        autopilotActive: "🤖 OTO-PİLOT AKTİF",
        autopilotStop: "Durdur ⏹️",
        autopilotStarted: "🤖 Oto-Pilot devreye girdi! Oyun otomatik oynanıyor.",
        autopilotStopped: "⏹️ Oto-Pilot durduruldu."
    },

    en: {
        // General & Start
        play: "Start Career",
        settings: "Settings",
        shop: "Wholesale",
        inv: "Aisles",
        staff: "Staff",
        b2b: "Contracts",
        manage: "Manage",
        finance: "Bank & Stocks",
        rd: "R&D Center",
        upgrades: "Upgrades",
        factory: "Factory",
        loadCareer: "Load Career",
        slotUsed: "Save Slot",
        slotEmpty: "Empty Slot",
        back: "Go Back",
        endDay: "End Day 🌙",
        mainMenu: "Main Menu",
        saveGame: "Save Game",
        theme: "Visual Theme",
        lang: "Language",
        vol: "Volume Level",
        newCareer: "Start New Career",
        delete: "Are you sure you want to delete this career save?",
        month: "Month",
        week: "Wk",
        day: "Day",
        level: "Lv.",
        rep: "Reputation",
        playBtn: "Play ▶",
        savedSuccess: "💾 Game Saved Successfully",
        careerLoaded: "Career Loaded!",
        yes: "Yes",
        cancel: "Cancel",
        confirm: "Confirm",
        close: "Close",
        done: "Done",
        levelText: "Level",

        // Themes
        themeModern: "Modern (Neon Blue)",
        themeClassic: "Classic (Retro 90s)",
        themeMedieval: "Medieval (Merchant Guild)",
        themeDark: "Dark Mode (OLED)",
        themeCyberpunk: "Cyberpunk (Night Club)",

        // Header Stats
        headerDate: "Date",
        headerMoney: "Cash Balance",
        headerPop: "Popularity",
        headerCargo: "Fleet Cargo",
        headerMarket: "Market Share",
        headerMorale: "Boss Morale",
        headerStorage: "Storage Fill",
        headerTrend: "Market Trend",

        // Wholesale Screen (Shop)
        shopTitle: "🛒 Wholesale Market & Suppliers",
        blackMarketTitle: "🕵️ Black Market Deal",
        blackMarketDesc: "Smuggled contraband goods. 80% discount but carries police raid risks!",
        wholesaleBuy: "Buy",
        wholesaleSell: "Return to Supplier",
        spaceUnit: "Space",
        costUnit: "Cost",
        refundUnit: "Refund",
        stockUnit: "Stock",

        // Aisles Screen (Inventory)
        invTitle: "🏪 Store Aisles & Pricing",
        unitCost: "Unit Cost",
        recPrice: "Recommended",
        currentPrice: "Selling Price",
        stockLabel: "Stock",
        aisleTitle: "Aisle",
        newAisleTitle: "🔨 Construct New Aisle",
        reqBuilding: "Building Level {n} Required",
        reqQuestDone: "Quest Must Be Completed",
        installCost: "Setup Cost",
        buildAisleBtn: "Unlock Aisle",

        // Staff Screen
        staffTitle: "👥 Company Staff Roster",
        staffLimit: "Staff Capacity Limit",
        staffLimitSub: "Larger buildings can accommodate more employees.",
        staffInsuranceTitle: "🛡️ Employee Insurance (Social Security)",
        staffInsuranceActive: "Active (Resignations Prevented)",
        staffInsuranceInactive: "Disabled (Resignation Risk)",
        staffInsuranceCost: "Cost: $15/staff/day",
        staffInsuranceDescOn: "✅ Workers are protected. Quits and workplace lawsuits are prevented.",
        staffInsuranceDescOff: "⚠️ Uninsured employees may resign when boss morale dips!",
        staffInsuranceBtnOn: "Insured ✅",
        staffInsuranceBtnOff: "Enable Insurance",
        wageDaily: "Salary: {cost}/Day",
        nextHireCost: "Next Hire: {cost}",
        fireStaffBtn: "Dismiss",
        hireStaffBtn: "Hire",

        // B2B Contracts
        b2bTitle: "🤝 Corporate B2B Contracts",
        corpRep: "Corporate Reputation",
        corpRepSub: "Fulfill contracts on time to build corporate prestige.",
        incomingBids: "Incoming Contract Requests",
        noIncomingBids: "There are currently no open corporate contract proposals.",
        activeContracts: "Active Ongoing Contracts",
        noActiveContracts: "You currently have no active contracts in progress.",
        acceptBidBtn: "Accept Contract",
        deliverBidBtn: "Deliver Goods",
        daysRemaining: "Days Left",
        requestedLabel: "Requested",
        rewardLabel: "Reward",
        penaltyLabel: "Late Penalty",

        // Legal Department
        lawTitle: "🧑‍⚖️ Legal Department & Lawsuits",
        lawSub: "Hire an attorney or roll the dice in court to dismiss claims!",
        lawyerRaiseTitle: "💼 Lawyer Bonus & Raise",
        lawyerRaiseCost: "Cost: +$1,000/day",
        lawyerRaiseStatusOn: "Active (+20% Win Rate & Court Dice Advantage)",
        lawyerRaiseStatusOff: "Standard Retainer",
        lawyerRaiseDesc: "Paying your attorney a bonus increases court win chance by 20% and gives +2 bonus on court dice rolls.",
        lawyerRaiseBtnOn: "Bonus Active ✅",
        lawyerRaiseBtnOff: "Grant Bonus",
        lawyerHireTitle: "💼 Retain Legal Counsel",
        lawyerCurrentBadge: "Retained",
        hireBtn: "Retain",
        lawsuitsTitle: "🚨 Pending Lawsuits",
        noLawsuitsMsg: "No pending lawsuits against your business! 🎉",
        claimAmount: "Claim Amount",
        daysUntilTrial: "Days Until Hearing",
        trialDiceBtn: "🎲 Court Dice Trial",
        settleLawsuitBtn: "Settle Out of Court<br>({cost})",

        // Bank & Finance
        financeTitle: "🏦 Bank, Credit & Stocks",
        loansTitle: "💳 Commercial Loan Packages",
        activeLoansTitle: "💳 Your Active Bank Loans",
        payOffLoanBtn: "Pay Off Early",
        depositTitle: "💰 High-Yield Savings Account",
        depositDesc: "Deposit cash to earn a guaranteed 2% daily interest return.",
        depositBalance: "Savings Balance",
        depositBtn: "Deposit",
        withdrawBtn: "Withdraw",
        stocksTitle: "📈 Stock Market Portfolio",
        stockShares: "Shares Owned",
        stockPrice: "Unit Price",
        buyStockBtn: "Buy Shares",
        sellStockBtn: "Sell Shares",

        // R&D & Levels
        rdTitle: "🧪 R&D Center & Skills Tree",
        currentRP: "Available Research Points (RP)",
        rpSub: "RP accumulates daily based on retail sales volume and tech philanthropy.",
        unlockSkillBtn: "Research Skill",
        skillUnlocked: "Researched ✅",
        statusTitle: "Current Company Status",
        skillsTitle: "💡 R&D Skills",
        levelQuestsTitle: "📋 Level Quests & Objectives",
        completedBadge: "✅ Completed",
        activeBadge: "⭐ Active Tier",
        lockedBadge: "🔒 Locked",
        inProgress: "In Progress",
        claimRewardBtn: "🎁 Claim Reward",
        rewardClaimed: "✅ Claimed",
        reqBuildingAlert: "⚠️ Required Building: Level {n}",
        unlockedTag: "Unlocked",
        rpCost: "Unlock ({cost} RP)",

        // Upgrades & Building
        upgradesTitle: "🏢 Building, Storage & Fleet Upgrades",
        buildingUpgradeCard: "Upgrade to {name}",
        maxBuildingBadge: "You own the highest tier luxury real estate!",
        upgradeBtn: "Upgrade",
        storageUpgradesTitle: "📦 Warehouse Capacity Expansions",
        fleetLogisticsTitle: "🚚 Logistics Fleet",
        marketingTitle: "📢 Marketing & Advertising",
        marketingActive: "Campaign Active! ({days} Days Remaining)",
        marketingStartBtn: "Launch ({cost})",
        prestigeEmpireTitle: "👑 Franchise Prestige",
        currentPrestigeFP: "Current Prestige (FP):",
        doPrestigeBtn: "Sell Empire & Prestige",

        // Factory
        factoryTitle: "🏭 Private Label Manufacturing Facility",
        factorySub: "Bypass middlemen and manufacture your own brand at cost!",
        buyFactoryTitle: "Build Your Own Factory!",
        buyFactoryDesc: "Cut out wholesale middlemen. Produce products at 70% cheaper unit costs!",
        buyFactoryBtn: "Build Factory ($50,000)",
        factoryTierHeader: "🏭 Tier {lvl} Factory",
        assemblyLine: "Assembly Line:",
        factoryStopOpt: "-- Halt Production --",
        factoryRateDesc: "{qty} units/day | Cost: {cost}",
        factoryFootnoteText: "* The factory delivers produced items directly to your warehouse daily with a 70% production discount.",

        // Market & Competition
        marketShareReportTitle: "📊 Market Share Report",
        marketShareReportSub: "Monitor your commercial influence and rival market presence.",
        youLabel: "You",
        rivalLabel: "Rival",
        marketTips: "Lower retail prices and maintain high popularity to expand market share. Overtake your rival to achieve complete monopoly!",
        hostileTakeoverTitle: "🏆 Hostile Takeover (Monopoly)",
        hostileTakeoverDesc: "To eliminate your rival completely, reach 99% market share and $1,000,000 in liquid capital.",
        hostileTakeoverBtn: "Acquire Rival",
        monopolyAchieved: "🏆 RIVAL CRUSHED! YOU HOLD COMPLETE MARKET MONOPOLY!",

        // Relations & Foundations
        relationsTitle: "🤝 Stakeholders & Philanthropy",
        relationsSub: "Maintain leverage with authorities and earn lasting reputation through charity!",
        powersHeader: "🏢 Key Stakeholders (Minigames & Decisions)",
        statusExcellent: "Excellent",
        statusBalanced: "Neutral",
        statusHostile: "Hostile",
        charityHeader: "🌱 Philanthropy & Foundations (CSR)",
        charitySub: "Donate to advance foundations; each level awards permanent corporate perks and passive buffs.",
        noDonationsYet: "No donations made yet.",
        activeBonus: "Active Perks:",
        donateBtnAction: "🌟 Donate ({cost})",
        diceRollMafiaBtn: "🎲 Roll Dice! (Win: +25 Rel & $10,000 / Lose: -15 & -$5,000)",
        chanceGuaranteed: "Guaranteed",
        chancePct: "{n}% Chance",

        // Reviews, Cargo, Calendar & Roadmap
        noReviewsMsg: "No customer reviews recorded yet. Feedback arrives after your first trading day!",
        noCargoMsg: "No freight shipments currently in transit. Place wholesale orders in Wholesale.",
        totalSpaceLabel: "Total Volume:",
        daysLeftLabel: "Remaining:",
        noCalendarMsg: "No journal history yet. Milestones will be recorded here at day end!",
        noEventsMsg: "No recorded events.",
        roadmapIntro: "Mega Mart Tycoon features 150 Tiers of commercial real estate! Current tier: Lv. {n}",
        currentBuildingBadge: "CURRENT PREMISES",
        clearedBadge: "Completed",
        popContribution: "Popularity Boost: +{n}",

        // Day End Modal
        endDayReportTitle: "📅 End of Day Corporate Report",
        reportRevenue: "REVENUE",
        reportExpenses: "EXPENSES",
        reportNetProfit: "NET PROFIT",
        reportNetLoss: "NET LOSS",
        tabKasa: "💰 Financials",
        tabPazar: "📰 Market",
        tabHukuk: "⚖️ Legal",
        tabDuyurular: "📢 Bulletins",
        endDayConfirmBtn: "Done / Next Day",
        progressSaved: "💾 Daily Progress Saved Automatically",

        // Daily Login Streak Modal
        dailyBonusTitle: "📅 DAILY LOGIN REWARD",
        dailyBonusWelcome: "Welcome back, Boss! Current streak:",
        dailyBonusDay: "Day",
        dailyBonusRewards: "Today's Rewards:",
        dailyBonusCash: "Cold Cash",
        dailyBonusRP: "Research Points (RP)",
        dailyBonusMorale: "Executive Morale",
        dailyBonusJackpot: "🎉 DAY 7 JACKPOT REWARD CLAIMED!",

        // Executive Penthouse & Espionage & Cashier Rush
        penthouseTitle: "👑 Executive Penthouse & Luxury Suite",
        penthouseSub: "Furnish your executive office with prestige symbols to unlock passive corporate buffs!",
        espionageTitle: "🕵️‍♂️ Corporate Espionage Bureau",
        espionageSub: "Infiltrate HyperMart with undercover agents to steal price lists and sabotage rivals!",
        cashierRushTitle: "⚡ Cashier Rush Minigame",
        cashierRushSub: "Step behind the register, scan barcodes in rapid succession, and score quick cash & morale!",
        cashierRushBtn: "⚡ Take the Register!",

        // Notifications & Extras
        deleteCareerTitle: "Delete Career",
        deleteConfirm: "Yes, Delete",
        roadmapTitle: "Premises Roadmap",
        roadmapSub: "150 Tiers of real estate progress",
        maxLevelBadge: "Max Tier",
        penthouseActiveCollection: "Active in Penthouse Collection",
        buyBtn: "Buy",
        ownedBadge: "Owned ✅",
        emptyKasa: "No cash movements recorded today.",
        emptyHaberler: "No major market trends or news today.",
        emptyHukuk: "No lawsuit or legal developments today.",
        emptyDuyurular: "No special company bulletins today.",
        emergencyCashTitle: "Emergency Cash",
        commGrowthLoanTitle: "Commercial Growth Loan",
        holdingLoanTitle: "Holding Investment Loan",
        loanPrincipal: "Principal: {got} | Repay: {pay}",
        loanTerm: "{days} Days Term (Daily: {daily})",
        loanTakeBtn: "Apply",
        goldStock: "Gold",
        bribeContractDesc: "Favors requested in exchange for covert payment.",
        bribeCostDesc: "Cost: Corporate Rep Loss",
        cargoDaysLeft: "Arrival:<br>{days} Days",
        andMoreRoadmap: "... and much more up to Tier 150!",
        tutorialBack: "⬅ Back",
        tutorialNext: "Next ➡",
        tutorialStart: "Let's Go! 🚀",
        startEspionageBtn: "Launch Operation ({cost})",
        espionageActiveSpy: "🕵️ Active Operation: Price Spy infiltrated! ({days} Days remaining - 15% discount on all purchases)",
        insufficientFunds: "Insufficient funds!",
        insufficientStorage: "Not enough warehouse storage space!",
        insufficientTransport: "Logistics fleet capacity exceeded!",
        deptUnlocked: "Aisle unlocked successfully!",
        itemPurchased: "Shipment ordered!",
        itemSoldWholesale: "Inventory returned to supplier!",
        staffHired: "Staff member hired!",
        staffFired: "Employee dismissed.",
        lawsuitSettled: "Lawsuit settled out of court!",
        diceRolling: "Dice rolling...",
        diceWin: "🏆 YOU WON!",
        diceLose: "💥 YOU LOST!",
        diceTie: "🤝 IT'S A TIE!",
        buildingUpgraded: "🏢 Relocated to new premises!",
        allQuestsDone: "🏆 ALL QUESTS COMPLETED!",
        walkthroughTitle: "📖 Game Completion Walkthrough",
        walkthroughBtn: "📖 Walkthrough Guide",
        autopilotBtn: "🤖 Auto-Pilot (Let Bot Play)",
        autopilotActive: "🤖 AUTO-PILOT ACTIVE",
        autopilotStop: "Stop ⏹️",
        autopilotStarted: "🤖 Auto-Pilot engaged! The game is playing automatically.",
        autopilotStopped: "⏹️ Auto-Pilot stopped."
    }
};

const t = (key, fallback) => {
    let lang = 'tr';
    if(typeof App !== 'undefined' && App.state && App.state.lang) lang = App.state.lang;
    if(locales[lang] && locales[lang][key] !== undefined) return locales[lang][key];
    if(locales['tr'] && locales['tr'][key] !== undefined) return locales['tr'][key];
    return fallback !== undefined ? fallback : key;
};

// All 13 Products Dictionary
const tProduct = (pKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            apple: "Elma", bread: "Ekmek", milk: "Süt", tshirt: "T-Shirt", shoes: "Ayakkabı",
            phone: "Telefon", laptop: "Laptop", tv: "Plazma TV", car: "Spor Araba",
            pharmacy: "Vitamin & İlaç", cosmetics: "Kozmetik", toys: "Oyuncak", furniture: "Mobilya"
        },
        en: {
            apple: "Apple", bread: "Bread", milk: "Milk", tshirt: "T-Shirt", shoes: "Shoes",
            phone: "Smartphone", laptop: "Laptop", tv: "Plasma TV", car: "Sports Car",
            pharmacy: "Vitamins & Meds", cosmetics: "Cosmetics", toys: "Toys", furniture: "Furniture"
        }
    };
    return (dict[lang] && dict[lang][pKey]) || (GameData.products[pKey] ? GameData.products[pKey].name : pKey);
};

// Staff Titles and Descriptions
const tStaff = (sKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: { cashier: "Kasiyer", guard: "Güvenlik Görevlisi", janitor: "Temizlikçi", warehouse: "Depo Sorumlusu", manager: "Mağaza Müdürü" },
        en: { cashier: "Cashier", guard: "Security Guard", janitor: "Janitor", warehouse: "Warehouse Specialist", manager: "General Manager" }
    };
    return (dict[lang] && dict[lang][sKey]) || (GameData.staffTypes[sKey] ? GameData.staffTypes[sKey].name : sKey);
};

const tStaffDesc = (sKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            cashier: "Günlük +5 Müşteri Talebi artışı sağlar.",
            guard: "Hırsızları yakalayıp tazminat kazandırır.",
            janitor: "Düşme ve kayma kazası davalarını önler.",
            warehouse: "Kargoların teslimat süresini 1 güne düşürür (En az 2 kişi).",
            manager: "Tüm maaşları %20 düşürür, bedava mal bulabilir."
        },
        en: {
            cashier: "Provides +5 daily customer demand across all aisles.",
            guard: "Apprehends shoplifters and recovers damage claims.",
            janitor: "Keeps aisles clean, preventing slip-and-fall injury claims.",
            warehouse: "Cuts delivery time of all incoming freight to 1 day (Min. 2 staff).",
            manager: "Reduces all staff wages by 20% and secures free supplier stock."
        }
    };
    return (dict[lang] && dict[lang][sKey]) || (GameData.staffTypes[sKey] ? GameData.staffTypes[sKey].desc : "");
};

// Level Titles & Descriptions
const tLevel = (lvl) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
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
        en: {
            "1": { name: "Neighborhood Mart", desc: "Take your first step in retail and satisfy local consumer demand." },
            "2": { name: "Emerging Merchant", desc: "Hire your first staff members and expand store facilities." },
            "3": { name: "Logistics Network", desc: "Build your freight fleet and expand wholesale supply lines." },
            "4": { name: "Investment & Stocks", desc: "Step into corporate finance and build commercial prestige." },
            "5": { name: "Corporate Contracts", desc: "Win large B2B supply tenders and retail cutting-edge tech." },
            "6": { name: "Supermarket Chain", desc: "Grand opening of a full-scale Supermarket and pharmacy aisle." },
            "7": { name: "Manufacturing Giant", desc: "Construct a factory to manufacture private-label goods at cost." },
            "8": { name: "Mega Shopping Mall", desc: "Erect the city's premier luxury retail and automotive center." },
            "9": { name: "Market Monopoly", desc: "Corner competitors and seize over 80% market dominance." },
            "10": { name: "Global Retail Empire", desc: "Acquire HyperMart to become the undisputed commercial titan!" }
        }
    };
    let lStr = String(lvl);
    return (dict[lang] && dict[lang][lStr]) || (GameData.levels[lStr] || { name: `Tier ${lvl}`, desc: "" });
};

// Quests Dictionary (All 35 Quests)
const tQuest = (qKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            l1_q1: { title: "İlk Sevkiyat", desc: "Toptancıdan 10 adet Elma siparişi ver." },
            l1_q2: { title: "Fırın Reyonu", desc: "Dükkanına Ekmek reyonu kur." },
            l1_q3: { title: "İlk Gün Sonu", desc: "Satışlarını tamamla ve $2,000 nakde ulaş." },
            l2_q1: { title: "İlk Çalışan", desc: "Kasa kuyruğunu önlemek için 1 Kasiyer işe al." },
            l2_q2: { title: "Şarküteri Reyonu", desc: "Müşteriler için Süt reyonu aç." },
            l2_q3: { title: "Depo Genişletme", desc: "Depo Genişletme I satın alarak kapasiteyi artır." },
            l2_q4: { title: "Personel Güvencesi", desc: "Personel İstifalarını önlemek için SGK / Personel Sigortasını aç." },
            l3_q1: { title: "Lojistik Devrimi", desc: "Filoya 1 adet Kamyon satın al." },
            l3_q2: { title: "Giyim Reyonu", desc: "T-Shirt reyonu açarak tekstil sektörüne adım at." },
            l3_q3: { title: "Hayırsever İş İnsanı", desc: "Herhangi bir vakfa ilk bağışını yap." },
            l4_q1: { title: "Moda & Ayakkabı", desc: "Ayakkabı reyonunu kur." },
            l4_q2: { title: "Borsa Kurdu", desc: "Borsadan en az 10 Lot Altın satın al." },
            l4_q3: { title: "Mağaza Güvenliği", desc: "Hırsızları önlemek için 1 Güvenlik Görevlisi tut." },
            l4_q4: { title: "Güzellik & Bakım", desc: "Kozmetik reyonunu açarak ürün yelpazeni genişlet." },
            l5_q1: { title: "Teknoloji Çağı", desc: "Telefon reyonunu açarak elektroniğe geç." },
            l5_q2: { title: "İlk Büyük İhale", desc: "B2B sekmesinden 1 adet sözleşmeyi başarıyla teslim et." },
            l5_q3: { title: "Büyük Sermaye", desc: "Kasada $50,000 nakit biriktir." },
            l5_q4: { title: "Oyuncak Dünyası", desc: "Çocuklar için Oyuncak reyonunun kilidini aç." },
            l6_q1: { title: "Süpermarket Açılışı", desc: "Bina seviyeni Süpermarket'e (Seviye 2) yükselt." },
            l6_q2: { title: "Sağlık & Eczane", desc: "Vitamin & İlaç reyonunu aç." },
            l6_q3: { title: "Toplumsal Destek", desc: "Bir vakfı Seviye 3'e kadar geliştir." },
            l7_q1: { title: "Kendi Fabrikan", desc: "Toptancıyı aradan çıkarmak için Fabrika satın al." },
            l7_q2: { title: "Şirket Avukatı", desc: "Hukuk departmanına en az Seviye 2 (Şirket Avukatı) ata." },
            l7_q3: { title: "İtibar Devrimi", desc: "Şirket itibarını (REP) 50'ye ulaştır." },
            l8_q1: { title: "Mega AVM Projesi", desc: "Bina seviyeni Mega AVM'ye (Seviye 3) yükselt." },
            l8_q2: { title: "Lüks Otomobil Galerisi", desc: "Spor Araba reyonunun kilidini aç." },
            l8_q3: { title: "Lüks Ev & Mobilya", desc: "Mobilya reyonunu açarak AVM'yi donat." },
            l8_q4: { title: "Büyük Çevre Hamisi", desc: "Yeşil Doğa Vakfını en az Seviye 5 yap." },
            l9_q1: { title: "Gökyüzü Filosu", desc: "Filoya 1 adet Kargo Uçağı satın al." },
            l9_q2: { title: "Piyasa Hakimiyeti", desc: "Pazar payını %80'e çıkar." },
            l9_q3: { title: "Dev Kasa Birikimi", desc: "Kasada $300,000 nakit rezervi tut." },
            l9_q4: { title: "Holding Gökdeleni", desc: "Bina seviyeni Plaza Seviye 4 veya üzerine yükselt." },
            l10_q1: { title: "Mutlak Tekel", desc: "HyperMart'ı satın alarak rakibini tamamen yok et!" },
            l10_q2: { title: "Dünya Hayırseveri", desc: "Tüm vakıfların toplam seviyesini en az 20 yap." },
            l10_q3: { title: "Finans Lordu", desc: "Borsada 50 Lot Altın rezervi bulundur." },
            l10_q4: { title: "Küresel İmparatorluk", desc: "$2,000,000 toplam nakde ulaşarak tarihe geç!" }
        },
        en: {
            l1_q1: { title: "First Shipment", desc: "Order 10 units of Apples from wholesale supplier." },
            l1_q2: { title: "Bakery Aisle", desc: "Construct a Bread bakery aisle in your mart." },
            l1_q3: { title: "First Day End", desc: "Complete daily sales and accumulate $2,000 in cash." },
            l2_q1: { title: "First Employee", desc: "Hire 1 Cashier to prevent customer checkout lines." },
            l2_q2: { title: "Dairy Aisle", desc: "Unlock and build a Milk dairy aisle." },
            l2_q3: { title: "Storage Expansion", desc: "Purchase Warehouse Expansion I to increase capacity." },
            l2_q4: { title: "Staff Insurance", desc: "Enable Employee Insurance (Social Security) to prevent resignations." },
            l3_q1: { title: "Logistics Breakthrough", desc: "Acquire 1 Freight Truck for your distribution fleet." },
            l3_q2: { title: "Apparel Aisle", desc: "Unlock the T-Shirt aisle to enter the textile market." },
            l3_q3: { title: "Philanthropist", desc: "Make your first charity donation to any foundation." },
            l4_q1: { title: "Footwear & Fashion", desc: "Unlock and build the Shoes footwear aisle." },
            l4_q2: { title: "Wall Street Wolf", desc: "Purchase at least 10 shares of Gold on the stock exchange." },
            l4_q3: { title: "Store Security", desc: "Hire 1 Security Guard to catch thieves and deter shoplifting." },
            l4_q4: { title: "Beauty & Personal Care", desc: "Unlock the Cosmetics aisle to expand product variety." },
            l5_q1: { title: "Age of Technology", desc: "Unlock the Smartphone electronics aisle." },
            l5_q2: { title: "Corporate Contract", desc: "Successfully deliver 1 B2B contract on schedule." },
            l5_q3: { title: "Capital Accumulation", desc: "Amass a cash reserve of $50,000 in the bank." },
            l5_q4: { title: "Toy Wonderland", desc: "Unlock the Toys aisle for families and children." },
            l6_q1: { title: "Supermarket Opening", desc: "Upgrade premises to Supermarket (Building Tier 2)." },
            l6_q2: { title: "Health & Pharmacy", desc: "Unlock the Vitamins & Pharmaceuticals aisle." },
            l6_q3: { title: "Community Patron", desc: "Upgrade any charitable foundation to Level 3." },
            l7_q1: { title: "Own Manufacturing", desc: "Purchase your own Factory to produce goods at cost." },
            l7_q2: { title: "Corporate Counsel", desc: "Retain at least Tier 2 Corporate Legal Counsel." },
            l7_q3: { title: "Corporate Prestige", desc: "Raise corporate reputation (REP) to 50." },
            l8_q1: { title: "Mega Shopping Mall", desc: "Upgrade building premises to Mega Mall (Tier 3)." },
            l8_q2: { title: "Supercar Showroom", desc: "Unlock the luxury Sports Car showroom aisle." },
            l8_q3: { title: "Home & Furniture", desc: "Unlock the Furniture aisle to furnish the mega mall." },
            l8_q4: { title: "Green Visionary", desc: "Advance the Green Earth Foundation to Level 5." },
            l9_q1: { title: "Air Freight Logistics", desc: "Acquire 1 Cargo Airplane for global freight distribution." },
            l9_q2: { title: "Market Supremacy", desc: "Capture an 80% total market share over rivals." },
            l9_q3: { title: "Corporate War Chest", desc: "Maintain $300,000 in liquid capital reserves." },
            l9_q4: { title: "Holding Skyscraper", desc: "Upgrade corporate headquarters to Plaza Tier 4 or higher." },
            l10_q1: { title: "Absolute Monopoly", desc: "Buy out HyperMart to completely eradicate retail competition!" },
            l10_q2: { title: "Global Philanthropist", desc: "Attain a combined charity foundation level of 20." },
            l10_q3: { title: "Financial Overlord", desc: "Hold 50 shares of Gold in your corporate portfolio." },
            l10_q4: { title: "Global Retail Empire", desc: "Reach $2,000,000 in total liquid cash to become a legend!" }
        }
    };
    return (dict[lang] && dict[lang][qKey]) || (GameData.quests[qKey] || { title: qKey, desc: "" });
};

// Buildings Dictionary
const tBuilding = (lvl) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            1: { name: 'Kiosk', desc: 'Temel satış noktası ve mahalle esnaflığı.' },
            2: { name: 'Süpermarket', desc: 'Geniş reyonlar, Plazma TV, Mobilya ve İlaç satışı.' },
            3: { name: 'Mega AVM', desc: 'Spor Araba galerisi ve devasa müşteri kapasitesi.' }
        },
        en: {
            1: { name: 'Kiosk Store', desc: 'Essential retail kiosk and local neighborhood convenience.' },
            2: { name: 'Supermarket', desc: 'Spacious aisles with Smart TVs, furniture, and pharmacy lines.' },
            3: { name: 'Mega Shopping Mall', desc: 'Luxury supercar showroom and massive foot traffic.' }
        }
    };
    if (lvl > 3) {
        if (lang === 'en') {
            if (lvl < 10) return { name: `International Plaza Floor ${lvl}`, desc: `High-rise corporate suites.` };
            if (lvl < 30) return { name: `Global Conglomerate Tower Floor ${lvl}`, desc: `Massive corporate offices.` };
            if (lvl < 70) return { name: `Multinational Skyscraper Floor ${lvl}`, desc: `World-class commercial center.` };
            if (lvl < 120) return { name: `Silicon Valley Campus Sector ${lvl}`, desc: `Tech-infused distribution hub.` };
            return { name: `Global Retail Monopoly Citadel Lv. ${lvl}`, desc: `Unrivaled world corporate fortress.` };
        }
    }
    return (dict[lang] && dict[lang][lvl]) || (GameData.buildings[lvl] || { name: `Building ${lvl}`, desc: "" });
};

// Fleet Vehicles
const tFleet = (fKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: { van: "Kamyonet", truck: "Kamyon", trailer: "Tır", plane: "Kargo Uçağı" },
        en: { van: "Delivery Van", truck: "Freight Truck", trailer: "Heavy Semi-Trailer", plane: "Cargo Airplane" }
    };
    return (dict[lang] && dict[lang][fKey]) || fKey;
};

// Marketing Campaigns
const tMarketing = (mKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            flyer: { name: "Broşür Dağıtımı", desc: "Mahallede el broşürleri dağıt." },
            social: { name: "Sosyal Medya Kampanyası", desc: "Hedefli dijital reklamlar ver." },
            tv: { name: "Televizyon Reklamı", desc: "Ulusal kanalda prime-time reklam yayını." }
        },
        en: {
            flyer: { name: "Local Flyers", desc: "Distribute promotional flyers across the neighborhood." },
            social: { name: "Social Media Campaign", desc: "Run targeted digital social campaigns." },
            tv: { name: "Television Commercial", desc: "Prime-time nationwide television advertisement." }
        }
    };
    return (dict[lang] && dict[lang][mKey]) || { name: mKey, desc: "" };
};

// Storage Upgrades
const tUpgrade = (uKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: { storage2: "Depo Genişletme I", storage3: "Depo Genişletme II", storage4: "Lojistik Merkezi" },
        en: { storage2: "Warehouse Expansion I", storage3: "Warehouse Expansion II", storage4: "Logistics Hub" }
    };
    return (dict[lang] && dict[lang][uKey]) || uKey;
};

// R&D Skills
const tSkill = (sKey) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            storageOpt: { name: "Depo Optimizasyonu", desc: "Tüm depolama alanını kalıcı olarak %20 artırır." },
            hrExpert: { name: "İnsan Kaynakları Uzmanı", desc: "Tüm personel maaşlarını kalıcı %10 ucuzlatır." },
            marketingPro: { name: "Pazarlama Dehası", desc: "Tüm reklam kampanyalarının etkisini %50 artırır." }
        },
        en: {
            storageOpt: { name: "Warehouse Logistics Opt.", desc: "Permanently expands all warehouse capacity by +20%." },
            hrExpert: { name: "Human Resources Expert", desc: "Permanently reduces all staff salary overhead by 10%." },
            marketingPro: { name: "Marketing Specialist", desc: "Boosts popularity gain from all marketing campaigns by +50%." }
        }
    };
    return (dict[lang] && dict[lang][sKey]) || { name: sKey, desc: "" };
};

// Legal Lawyers
const tLawyer = (lvl) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            0: { name: "Avukat Yok", desc: "Çok riskli. %10 Mahkeme kazanma şansı." },
            1: { name: "Stajyer Avukat", desc: "Günlük ücreti ucuz. %40 Mahkeme kazanma şansı." },
            2: { name: "Şirket Avukatı", desc: "Profesyonel savunma. %70 Mahkeme kazanma şansı." },
            3: { name: "Şeytanın Avukatı", desc: "Davalarda mutlak zafer. %95 Mahkeme kazanma şansı." }
        },
        en: {
            0: { name: "No Counsel", desc: "Extremely risky. 10% court victory probability." },
            1: { name: "Junior Associate", desc: "Low daily retainer. 40% court victory probability." },
            2: { name: "Corporate Attorney", desc: "Professional corporate defense. 70% victory probability." },
            3: { name: "Devil's Advocate", desc: "Elite trial juggernaut. 95% courtroom victory probability." }
        }
    };
    return (dict[lang] && dict[lang][lvl]) || { name: `Lawyer ${lvl}`, desc: "" };
};

// Lawsuits
const tLawsuit = (type) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            "Müşteri Reyonda Kayıp Düştü": "Müşteri Reyonda Kayıp Düştü",
            "Bozuk Ürün Zehirlenmesi": "Bozuk Ürün Zehirlenmesi",
            "Personel Hakareti Davası": "Personel Hakareti Davası",
            "Hatalı Ürün Patlaması": "Hatalı Ürün Patlaması",
            "Telif Hakkı İhlali İhtarı": "Telif Hakkı İhlali İhtarı",
            "Ticari Casusluk ve İtibar Suikastı": "Ticari Casusluk ve İtibar Suikastı"
        },
        en: {
            "Müşteri Reyonda Kayıp Düştü": "Customer Slip-and-Fall Claim",
            "Bozuk Ürün Zehirlenmesi": "Spoiled Product Food Poisoning",
            "Personel Hakareti Davası": "Staff Defamation Lawsuit",
            "Hatalı Ürün Patlaması": "Defective Electronic Device Explosion",
            "Telif Hakkı İhlali İhtarı": "Trademark & Copyright Infringement",
            "Ticari Casusluk ve İtibar Suikastı": "Corporate Espionage & Defamation Investigation"
        }
    };
    return (dict[lang] && dict[lang][type]) || type;
};

// Foundations
const tFoundation = (fId) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            children: { name: "Geleceğe Umut Çocuk Vakfı", desc: "Öğrencilere burs ve ihtiyaç sahibi çocuklara gıda desteği sağlar.", effectDesc: "Seviye başına +5 Kalıcı Popülarite ve +%3 Müşteri Talebi." },
            green: { name: "Yeşil Doğa & Temiz Çevre Vakfı", desc: "Şehirde fidan dikimi ve çevre projeleri yürütür.", effectDesc: "Haftalık kurumlar vergisinde %2 indirim ve Bakanlık desteği." },
            tech_edu: { name: "Milli Teknoloji & Burs Vakfı", desc: "Genç girişimcilere ve teknoloji Ar-Ge laboratuvarlarına fon sağlar.", effectDesc: "Her gün sonu otomatik +2 Ar-Ge Puanı (RP) üretir." },
            animal: { name: "Can Dostlar Hayvanları Koruma Vakfı", desc: "Sokak hayvanları barınakları ve veteriner kliniklerine destek olur.", effectDesc: "Seviye başına +4 Kurumsal İtibar (REP) ve olumlu müşteri yorumları." }
        },
        en: {
            children: { name: "Future Hope Children's Foundation", desc: "Supplies educational grants and food relief to children in need.", effectDesc: "Provides +5 Permanent Popularity and +3% Customer Demand per level." },
            green: { name: "Green Earth & Clean Ecology Foundation", desc: "Conducts urban afforestation and environmental clean-up initiatives.", effectDesc: "Grants 2% weekly corporate tax reduction and Ministry rapport per level." },
            tech_edu: { name: "National Tech Innovation & Science Grant", desc: "Funds student innovators and commercial R&D laboratories.", effectDesc: "Generates +2 Research Points (RP) automatically each day per level." },
            animal: { name: "Guardian Paws Animal Welfare Sanctuary", desc: "Sponsors stray animal rescue shelters and veterinary hospital care.", effectDesc: "Grants +4 Corporate Reputation (REP) and boosts positive customer reviews per level." }
        }
    };
    return (dict[lang] && dict[lang][fId]) || (GameData.foundations[fId] || { name: fId, desc: "", effectDesc: "" });
};

// Institutions
const tInstitution = (instId) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            wholesaler: {
                name: "Toptancılar Birliği",
                desc: "Tedarik zincirinin kalbi. İlişki yüksekse malları indirimli alırsın. Düşükse fiyatlar zamlanır.",
                title: "🤝 Toptancıyla Pazarlık Masası",
                descMini: "Toptancılar Birliği başkanıyla ofisinde bir araya geldin. Hangi yaklaşımı seçeceksin?",
                options: [
                    { name: "☕ Çay Ismarla & Samimi Ol" },
                    { name: "📑 Büyük Sevkiyat Sözü Ver" },
                    { name: "💼 Sert İndirim Masaya Koy" }
                ]
            },
            minister: {
                name: "Maliye Bakanlığı & Denetim",
                desc: "Vergi politikaları ve devlet hibeleri. İlişki yüksekse vergi sıfırlanabilir. Düşükse çifte vergi ve denetim gelir.",
                title: "📋 Bakanlık Denetim Sunumu",
                descMini: "Müfettişler şirketini teftişe geldi. Nasıl bir savunma dosyası sunacaksın?",
                options: [
                    { name: "📊 Şeffaf Muhasebe Defteri" },
                    { name: "🌱 Sosyal Sorumluluk Dosyası" },
                    { name: "🏛️ Kamu Projesine Sponsorluk ($10,000)" }
                ]
            },
            mafia: {
                name: "Yeraltı Dünyası (Rüşvet)",
                desc: "Şehrin arka sokaklarındaki güç. İlişki yüksekse rakipleri sabote ederler. Düşükse dükkanına zarar verirler.",
                title: "🎲 Yeraltı Kumar & Zar Düellosu",
                descMini: "Arka sokaktaki depoda mafya lideriyle zar atıyorsun. (Yüksek atan kazanır)"
            }
        },
        en: {
            wholesaler: {
                name: "Wholesale Merchants Syndicate",
                desc: "The backbone of your supply chain. High relations grant trade discounts. Low relations cause price inflation.",
                title: "🤝 Supplier Bargaining Table",
                descMini: "Meeting with the president of the Wholesale Syndicate. What negotiation strategy will you adopt?",
                options: [
                    { name: "☕ Hospitality & Warm Dialogue" },
                    { name: "📑 Guarantee High-Volume Reorders" },
                    { name: "💼 Aggressive Price Hardball" }
                ]
            },
            minister: {
                name: "Ministry of Finance & Tax Audit",
                desc: "Tax regulation and municipal subsidies. High relations exempt taxes; low relations invite harsh audits.",
                title: "📋 Ministry Fiscal Compliance Review",
                descMini: "Tax auditors have arrived at headquarters. How will you present your commercial compliance dossier?",
                options: [
                    { name: "📊 Transparent Audited Ledger" },
                    { name: "🌱 Corporate Social Responsibility Report" },
                    { name: "🏛️ Public Infrastructure Sponsorship ($10,000)" }
                ]
            },
            mafia: {
                name: "Underground Syndicate (Bribes)",
                desc: "The city's shadow influence. High relations sabotage rivals. Low relations lead to extortion and theft.",
                title: "🎲 Underground High-Stakes Dice Duel",
                descMini: "Rolling dice in a back-alley vault against the syndicate boss. (Higher roll wins all)"
            }
        }
    };
    return (dict[lang] && dict[lang][instId]) || (GameData.institutions[instId] || { name: instId, desc: "" });
};

// Executive Penthouse Perks
const tPenthouseItem = (pId) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            espresso: { name: "Altın Espresso Makinesi", desc: "Tüm mağazada müşteri talebi ve satış hızı +%8 artar." },
            chair: { name: "İtalyan Masaj Koltuğu", desc: "Her gün sonu Patron Morali otomatik +3 yenilenir." },
            parrot: { name: "Şans Papağanı 'Korsan'", desc: "%25 şansla her gün zengin bir turistten +$5,000 ek hasılat!" },
            dojo: { name: "Özel Zen Bahçesi & Dojo", desc: "Duruşma zarlarında her zaman +1 ekstra zar avantajı." },
            helipad: { name: "Çatı Katı Helikopter Pisti", desc: "Uluslararası VIP ihaleler; B2B kazançları %40 artar!" },
            vault: { name: "Mücevher Kasası & Kripto Cüzdanı", desc: "Kasa eksiye düşerse anında $50,000 acil kurtarma fonu açar!" }
        },
        en: {
            espresso: { name: "Golden Espresso Machine", desc: "Customer checkout speed and store-wide sales demand increases by +8%." },
            chair: { name: "Italian Leather Massage Chair", desc: "Executive Boss Morale automatically recovers +3 at the end of each day." },
            parrot: { name: "'Captain' Lucky Parrot", desc: "25% daily chance to attract wealthy international VIP shoppers for +$5,000!" },
            dojo: { name: "Private Zen Garden & Dojo", desc: "Always receive a +1 bonus roll advantage in courtroom dice trials." },
            helipad: { name: "Rooftop Executive Helipad", desc: "Unlocks global VIP contracts; all B2B tender earnings increase by +40%." },
            vault: { name: "Diamond Safe & Cold Crypto Vault", desc: "Triggers an emergency $50,000 bail-out fund instantly if cash falls below zero!" }
        }
    };
    return (dict[lang] && dict[lang][pId]) || { name: pId, desc: "" };
};

// Corporate Espionage Missions
const tEspionage = (type) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    const dict = {
        tr: {
            cost: { name: "Fiyat Casusu Sızdır", desc: "Toptancı tedarik zincirine sızar. 5 gün boyunca tüm ürün alış fiyatları %15 ucuzlar." },
            sabotage: { name: "Gizli Denetim & Hijyen Sabotajı", desc: "Rakibe ani sağlık müfettişi salar! %80 şansla pazar payından +%5 kaparsın." },
            headhunt: { name: "Rakip Müdürünü Transfer Et", desc: "Rakibin baş yöneticisini ayartırsın! Rakip pazar payı %10 çöker, 1x Müdür şirketine geçer." }
        },
        en: {
            cost: { name: "Infiltrate Price Spy", desc: "Infiltrates wholesale supplier supply networks. Slashes all unit purchase prices by 15% for 5 days." },
            sabotage: { name: "Surprise Health Inspection Sabotage", desc: "Sick an aggressive hygiene inspector on HyperMart! 80% chance to seize +5% market share." },
            headhunt: { name: "Poach Rival General Manager", desc: "Bribe HyperMart's top executive to defect! Shrinks rival market share by 10% and adds +1 Store Manager." }
        }
    };
    return (dict[lang] && dict[lang][type]) || { name: type, desc: "" };
};

// Interactive Tutorial Steps
const tTutorial = () => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    if (lang === 'en') {
        return [
            { title: "👋 WELCOME TO MEGA MART!", text: "You are the city's newest retail visionary! Are you ready to evolve from a humble corner shop into a multi-billion dollar manufacturing empire?<br><br>Let me introduce you to the core rules..." },
            { title: "🛒 1. ORDER FROM WHOLESALER", text: "Head to the <b>🛒 Wholesale</b> tab at the bottom to purchase low-cost inventory. Purchased products are delivered directly to your store warehouse." },
            { title: "🏪 2. MANAGE STORE AISLES", text: "Switch to <b>🏪 Aisles</b> to customize your retail price markups. Competitive pricing drives customer volume, while higher prices maximize profit margins!" },
            { title: "🚚 3. LOGISTICS FLEET (CRITICAL)", text: "Even with shelves packed full of inventory, daily sales throughput is bounded by your <b>Logistics Fleet Delivery Capacity</b>! If sales stagnate, visit <b>👔 Manage -> 🏢 Upgrades</b> to buy more trucks." },
            { title: "🧪 4. RP AND RESEARCH LAB", text: "RP (Research Points) accumulate daily proportional to your sales revenue. Spend earned RP in <b>👔 Manage -> 🧪 R&D</b> to unlock powerful passive corporate skills." },
            { title: "🏦 5. WHAT IF CASH RUNS LOW?", text: "If you ever run out of operating capital, do not despair! Head to <b>👔 Manage -> 🏦 Bank</b> to secure an immediate commercial loan.<br><br>You're all set, Boss. Good luck!" }
        ];
    }
    return [
        { title: "👋 MEGA MART'A HOŞ GELDİN!", text: "Sen bu şehrin yeni perakende kralısın! Küçük bir toptancıdan başlayıp dev bir üretim holdingine dönüşmeye hazır mısın?<br><br>Sana temel kuralları öğreteyim..." },
        { title: "🛒 1. TOPTANCIDAN MAL AL", text: "Alttaki <b>🛒 Toptancı</b> sekmesinden ucuza ürün satın al. Satın aldığın ürünler doğrudan depona gider." },
        { title: "🏪 2. REYONLARI YÖNET", text: "<b>🏪 Reyonlar</b> sekmesine geçip aldığın ürünün 'fiyat politikasını' belirle. Ucuz fiyat daha hızlı satar ama kar marjın düşer!" },
        { title: "🚚 3. KARGO FİLOSU (DİKKAT)", text: "Depoda malın olsa bile, günlük ne kadar satabileceğin <b>Kargo Filosu Kapasitene</b> bağlıdır! Satışların yavaşlarsa <b>👔 Yönetim -> 🏢 Geliştirmeler</b> sekmesinden yeni tır veya kamyonet almalısın." },
        { title: "🧪 4. RP VE AR-GE MERKEZİ", text: "RP (Araştırma Puanı), sen <b>Günü Bitir</b> tuşuna bastıkça o günkü <u>kazancına oranla</u> (%5) otomatik olarak birikir.<br><br>Kazandığın RP'leri <b>👔 Yönetim -> 🧪 Ar-Ge</b> ekranında yeni yetenekler açmak için kullanabilirsin." },
        { title: "🏦 5. PARAM BİTERSE NE OLACAK?", text: "Eğer paran sıfırlanırsa ve mal alamıyorsan oyun bitmez! <b>👔 Yönetim -> 🏦 Banka</b> ekranına girip anında <b>Kredi Çekebilirsin</b>. <br><br>Artık hazırsın patron, iyi şanslar!" }
    ];
};

// Market Trends
const tTrend = (trendOrId) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    let id = typeof trendOrId === 'string' ? trendOrId : (trendOrId && trendOrId.id ? trendOrId.id : '');
    const dict = {
        tr: {
            heatwave: "Sıcak Hava",
            school: "Okula Dönüş",
            techfair: "Teknoloji Fuarı",
            crypto: "Kripto Çılgınlığı"
        },
        en: {
            heatwave: "Heatwave",
            school: "Back to School",
            techfair: "Tech Expo",
            crypto: "Crypto Frenzy"
        }
    };
    return (dict[lang] && dict[lang][id]) || (trendOrId && trendOrId.name ? trendOrId.name : id);
};

// Global News Events
const tNews = (evOrId) => {
    let lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'tr';
    let id = typeof evOrId === 'string' ? evOrId : (evOrId && evOrId.id ? evOrId.id : '');
    const dict = {
        tr: {
            crisis: { title: "Dünya Ekonomik Krizi", desc: "Küresel tedarik zinciri aksadı, toptan alım fiyatları fırladı!" },
            stimulus: { title: "Hükümetten KOBİ Teşvik Paketi", desc: "Yerel esnafa devletten karşılıksız hibe desteği sağlandı!" },
            festival: { title: "Şehirde Alışveriş Festivali", desc: "Şehre binlerce turist akın etti, perakende satış patlaması bekleniyor!" },
            strike: { title: "Liman İşçileri Grevi", desc: "Gümrük kapılarında kargo operasyonları durma noktasına geldi." },
            tax_refund: { title: "Sürpriz Vergi İadesi", desc: "Maliye Bakanlığı fazla tahsil edilen vergileri kasalara iade etti!" },
            rival_scandal: { title: "Rakip Markada Hijyen Skandalı", desc: "HyperMart'ta tarihi geçmiş ürün skandalı patlak verdi. Müşteriler sana yöneliyor!" },
            heatwave: { title: "Aşırı Sıcak Hava Dalgası", desc: "Vatandaşlar serinlemek için marketlere hücum ediyor. Soğuk içecek talebi patladı!" }
        },
        en: {
            crisis: { title: "Global Economic Crisis", desc: "Global supply chains falter, wholesale purchase prices soar!" },
            stimulus: { title: "Government SME Stimulus", desc: "Unconditional fiscal grant distributed to local retail enterprises!" },
            festival: { title: "City Shopping Festival", desc: "Thousands of tourists descend on the city; retail boom underway!" },
            strike: { title: "Dockworkers Strike", desc: "Customs cargo logistics grinding to an abrupt halt at the ports." },
            tax_refund: { title: "Surprise Corporate Tax Refund", desc: "The Treasury refunded excess corporate tax directly into company coffers!" },
            rival_scandal: { title: "Hygiene Scandal at Rival Chain", desc: "Expired stock scandal uncovered at HyperMart. Shoppers are defecting to your store!" },
            heatwave: { title: "Scorching Urban Heatwave", desc: "Shoppers rush into supermarkets seeking cold refreshments and air conditioning!" }
        }
    };
    return (dict[lang] && dict[lang][id]) || (evOrId && evOrId.title ? { title: evOrId.title, desc: evOrId.desc } : { title: id, desc: "" });
};

