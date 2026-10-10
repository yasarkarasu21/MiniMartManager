# Yapılan İşlemler ve Dosya Mimarisi

Kullanıcının talebi üzerine, spagetti (tek dosyada toplanmış) kod yapısı kırılarak daha profesyonel ve modüler bir klasör mimarisine geçilmiştir.

## Neden Bu Mimari İstendi?
- Oyunun kodları (eski `game.js`) çok büyüdüğü için okuması, bakımı ve yeni özellik eklemesi zorlaşmıştı.
- CSS, HTML ve JS dosyaları aynı ana dizinde (kök klasörde) çorba gibi duruyordu.
- Profesyonel yazılım geliştirme standartlarına ("Separation of Concerns" - Sorumlulukların Ayrılması prensibi) uymak ve takım çalışmasına/büyümeye uygun bir altyapı kurmak gerekti.

## Yeni Klasör ve Dosya Yapısı

- `index.html`
  Ana arayüz iskeleti. Sadece HTML etiketlerini barındırır. Yeni modüler JS dosyalarını sırasıyla yükler.

- `assets/` (Statik Dosyalar)
  - `assets/css/style.css`: Tüm görsel kurallar, renkler ve modern mobil uygulama arayüzü stilleri buraya taşındı.

- `js/` (JavaScript Modülleri)
  - `js/config.js`: Oyun içi **Sabit Veriler** (ürün fiyatları, bina tipleri, personel maliyetleri, market trendleri). Neden yapıldı? Fiyat veya denge değişikliği yapılacağında kodların içinde kaybolmamak için.
  - `js/state.js`: Oyunun **Hafızası**. Ana veri modeli (`g` objesi), varsayılan değerler, Save (Kaydet), Load (Yükle) ve Prestij (Sıfırlama) işlemleri buradadır.
  - `js/ui.js`: **Kullanıcı Arayüzü Motoru**. Ekrana ürünleri çizdirme (`renderShop`), sekmeler arası geçiş, bildirim popup'ları (Toast) ve HTML elementlerini güncelleme (DOM Manipülasyonu) işlerini yapar.
  - `js/engine.js`: **Oyun Mekanikleri**. Para harcama, ürün alma, kredi çekme ve oyunun kalbi olan `endDay()` (Günü Bitirme ve hesaplama) algoritması buradadır.
  - `js/app.js`: **Başlatıcı**. Diğer tüm dosyalar yüklendikten sonra en son çalışır, kayıtları kontrol eder ve oyunu ekrana yansıtır.

Bu yapı sayesinde ileride oyuna "Ses dosyaları" eklenmek istenirse `assets/audio/`, yeni bir mini oyun eklenmek istenirse `js/minigame.js` şeklinde mimari bozulmadan kolayca genişletilebilir.
