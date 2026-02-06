# Lobi Odası Sistemi

## Özellikler

### 1. Lobi Odası Tasarımı
- **Phonk Estetiği**: Koyu arka plan, neon cyan/purple çerçeveler
- **Glassmorphism**: Yarı saydam bulanık arka planlar
- **Responsive**: Mobil ve masaüstü uyumlu

### 2. Üst Bilgi Paneli
- Oyun bilgisi (Valorant, CS2, LoL vb.)
- Lobi başlığı
- Rütbe kısıtlaması
- Sponsorlu etiketi (varsa)

### 3. Sol Sütun - Oyuncu Listesi
- Katılan oyuncuların listesi
- Online/Offline durumu
- Rütbe bilgileri
- **KURUCU Tagi**: erdinoral31@gmail.com için neon altın sarısı parlayan tag

### 4. Sağ Sütun - Chat & Ses
- **Canlı Sohbet**: Anlık mesajlaşma
- **Sesli Sohbet UI**: Discord benzeri arayüz
- Mikrofon ve hoparlör kontrolleri
- "Konuşuyor..." göstergeleri

### 5. Navigasyon
- Sağ üstte "Lobiden Ayrıl" butonu
- useNavigate(-1) ile geri dönüş
- Neon glow efektli buton

## Kullanım

### Lobiye Katılma
1. Ana sayfadaki "Popüler Lobiler" bölümünden bir lobi seçin
2. "Katıl" butonuna tıklayın
3. `/lobby/:id` sayfasına yönlendirilirsiniz

### Lobi Odasında
- Sol tarafta oyuncu listesini görüntüleyin
- Sağ tarafta chat'e mesaj yazabilirsiniz
- Sesli sohbet kontrollerini kullanabilirsiniz
- "Lobiden Ayrıl" butonu ile çıkış yapabilirsiniz

## Veritabanı Entegrasyonu

### Mevcut Durum
- Mock database service kullanılıyor
- Gerçek zamanlı güncellemeler simüle ediliyor

### Supabase Entegrasyonu
`src/services/database.js` dosyasında Supabase örnek kodları mevcut:

```javascript
// Supabase kurulumu için:
// 1. npm install @supabase/supabase-js
// 2. .env dosyasına REACT_APP_SUPABASE_URL ve REACT_APP_SUPABASE_ANON_KEY ekleyin
// 3. database.js dosyasındaki Supabase kodlarının yorumlarını kaldırın
```

### Firebase Entegrasyonu
`src/services/database.js` dosyasında Firebase örnek kodları mevcut:

```javascript
// Firebase kurulumu için:
// 1. npm install firebase
// 2. .env dosyasına Firebase config değerlerini ekleyin
// 3. database.js dosyasındaki Firebase kodlarının yorumlarını kaldırın
```

## Veritabanı Şeması

### Supabase Tabloları
```sql
-- Lobby Messages
CREATE TABLE lobby_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lobby_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  text TEXT NOT NULL,
  type TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lobby Participants
CREATE TABLE lobby_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lobby_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  is_creator BOOLEAN DEFAULT FALSE,
  is_online BOOLEAN DEFAULT TRUE,
  joined_at TIMESTAMP DEFAULT NOW()
);
```

### Firebase Collections
```
lobbies/
  {lobbyId}/
    messages/
      {messageId}/
        userId: string
        username: string
        text: string
        type: string
        timestamp: timestamp
    participants/
      {userId}/
        username: string
        email: string
        isCreator: boolean
        isOnline: boolean
        joinedAt: timestamp
```

## Otomatik Mesajlar

- Kullanıcı lobiye katıldığında: "{username} lobiye katıldı"
- Kullanıcı lobiden ayrıldığında: "{username} lobiden ayrıldı"

Bu mesajlar otomatik olarak sistem mesajı olarak eklenir.
