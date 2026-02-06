# Gamer Hub - Gelişmiş Oyun Platformu

Modern ve kapsamlı bir oyun platformu. Patch notları, canlı yayınlar, lobi sistemi, rehberler, haberler ve detaylı istatistiklerle oyun topluluğunu bir araya getiren platform.

## Özellikler

### İçerik Bölümleri
- 📋 **Patch Notes & Etkinlikler**: Ana sayfa üstünde oyun yama notları ve aktif etkinlikler
- 📺 **Live Arena**: Twitch canlı yayınları (CS2, EAFC, LoL, Valorant)
- 👥 **Lobi & Forum**: Duo/Squad ilan sistemi, soru-cevap, upvote/downvote
- 📚 **Rehberler & Build'ler**: Topluluk rehberleri ve karakter dizilimleri
- 📰 **Haberler**: E-spor ve Steam/Epic mağaza haberleri
- 📊 **İstatistikler & Meta**: Win rates, pick rates ve meta analizleri

### Teknik Özellikler
- 🎮 **Gelişmiş Lobi Sistemi**: Gerçek zamanlı chat ve sesli sohbet (Voice UI)
- 🔐 **Public Access**: Tüm içerikler üye olmadan görüntülenebilir
- ⚠️ **Akıllı Navigasyon**: Neon parlayan "Geri Dön" butonu
- 💎 **Trust Score & Rank**: Kullanıcı güvenilirlik puanı ve rütbe sistemi
- 💰 **Gelir Modeli**: Reklam alanları ve bağış sistemi
- 📱 **Responsive Design**: Mobil cihazlarda kusursuz görünüm
- 🚀 **SEO Optimized**: Arama motoru optimizasyonu

## Kurulum

1. Projeyi klonlayın veya indirin
2. Terminal'de proje klasörüne gidin
3. Bağımlılıkları yükleyin:

```bash
npm install
```

4. React geliştirme sunucusunu başlatın:

```bash
npm run react-dev
```

Bu komut otomatik olarak `http://localhost:3000` adresinde uygulamayı açacaktır.

**Not:** Eğer React kullanmak istemiyorsanız, eski vanilla JS versiyonu için:

```bash
npm run dev
```

veya

```bash
npm start
```

## Kullanım

### Ana Sayfa
- **Patch Notes**: En üstte oyun yama notları ve aktif etkinlikler
- **Live Arena**: Twitch canlı yayınlarını izleyin
- **Oyun Keşfet**: Kategorilere göre oyunları filtreleyin

### Lobi & Forum
- **Duo/Squad Ara**: Takım arkadaşı ilanlarını görüntüleyin ve katılın
- **Forum**: Sorular sorun, yanıtlayın ve oylayın (upvote/downvote)
- **Lobi Detay**: Lobiye katıldığınızda gerçek zamanlı chat ve sesli sohbet

### Rehberler
- Oyun kategorilerine göre rehberleri filtreleyin
- Build'ler, stratejiler ve taktikler

### Haberler
- E-spor, Steam ve Epic Games haberlerini takip edin

### İstatistikler
- Oyun karakterlerinin kazanma oranları
- Meta analizleri ve içgörüler

## Teknolojiler

- **React 18.2.0** - UI framework
- **React Router DOM 6.20.0** - Client-side routing
- **HTML5** - Yapı
- **CSS3** - Modern CSS özellikleri (Grid, Flexbox, Animations, Neon effects)
- **JavaScript (ES6+)** - Programlama dili
- **Font Awesome Icons** - İkon kütüphanesi
- **Google Fonts (Poppins)** - Tipografi

## Yapı

```
gamer-hub/
├── index.html          # Ana sayfa
├── lobby.html          # Lobi & Forum sayfası
├── lobby-detail.html   # Lobi detay sayfası (Chat & Voice)
├── guides.html         # Rehberler sayfası
├── news.html           # Haberler sayfası
├── stats.html          # İstatistikler sayfası
├── investors.html      # Yatırımcı Paneli
├── styles.css          # Ana stil dosyası
├── app.js              # Global uygulama mantığı
├── script.js           # Ana sayfa JavaScript
├── lobby.js            # Lobi sayfası JavaScript
├── lobby-detail.js     # Lobi detay JavaScript
├── guides.js           # Rehberler JavaScript
├── news.js             # Haberler JavaScript
├── stats.js            # İstatistikler JavaScript
├── package.json        # Proje yapılandırması
└── README.md           # Bu dosya
```

## Özelleştirme

### Renkleri Değiştirme

`styles.css` dosyasındaki `:root` değişkenlerini düzenleyerek renkleri özelleştirebilirsiniz:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... */
}
```

### Oyun Ekleme

`script.js` dosyasındaki `gamesData` dizisine yeni oyunlar ekleyebilirsiniz:

```javascript
{
    id: 13,
    title: "Yeni Oyun",
    category: "action",
    rating: 4.5,
    players: "500K",
    image: "🎯",
    description: "Oyun açıklaması"
}
```

## Lisans

MIT License

## Geliştirici

Gamer Hub - Modern Oyun Platformu
