# Rekabet ve Ödül Sistemi

## Özellikler

### 1. Dinamik Liderlik Tablosu (Leaderboard.jsx)

#### Kategoriler
- **Bireysel Oyuncular**: Tekil oyuncu sıralaması
- **Takımlar**: Takım bazlı sıralama

#### Filtreleme
- **Haftalık**: Bu hafta kazanılan puanlar
- **Tüm Zamanlar**: Tüm zamanların toplam puanları

#### Puan Sistemi
- **Maç Kazanma**: +25 Puan
- **Turnuva Galibiyeti**: +100 Puan

#### Özel Mühürler
- **1. Sıra**: Altın neon kupa (Trophy icon, neon-gold)
- **2. Sıra**: Gümüş neon kupa (Medal icon, silver)
- **3. Sıra**: Bronz neon kupa (Award icon, bronze)

#### Admin Görünümü
- `erdinoral31@gmail.com` email'li kullanıcı için her zaman "KURUCU" tagi gösterilir
- Neon altın sarısı, parlayan tag

### 2. Onur Kürsüsü (Hall of Fame)

Ana sayfada 4 başlık:

1. **Haftanın Oyuncusu** (Neon Cyan)
   - En yüksek haftalık puanlı oyuncu
   - Cyan vurgulu tasarım

2. **Haftanın Takımı** (Neon Purple)
   - En yüksek haftalık puanlı takım
   - Purple vurgulu tasarım

3. **Tüm Zamanların Efsanesi** (Neon Gold)
   - Tüm zamanların en yüksek puanlı oyuncusu
   - Gold vurgulu tasarım

4. **Tüm Zamanların Takımı** (Neon Gold)
   - Tüm zamanların en yüksek puanlı takımı
   - Gold vurgulu tasarım

### 3. Canlı Maç Banner'ı

- Liderlik tablosuyla senkronize çalışır
- Breaking News tarzı haberler
- Otomatik kayan banner (5 saniyede bir değişir)
- Turnuva, maç ve başarı haberleri

### 4. Veritabanı Yapısı

#### Supabase Şeması

```sql
-- Players Table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  tournaments INTEGER DEFAULT 0,
  weekly_points INTEGER DEFAULT 0,
  weekly_wins INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Teams Table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  members INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  tournaments INTEGER DEFAULT 0,
  weekly_points INTEGER DEFAULT 0,
  weekly_wins INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Match Results Table
CREATE TABLE match_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id),
  team_id UUID REFERENCES teams(id),
  type TEXT NOT NULL, -- 'match' or 'tournament'
  points_awarded INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboard Updates (for real-time)
CREATE TABLE leaderboard_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id),
  team_id UUID REFERENCES teams(id),
  points_change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Firebase Şeması

```
players/
  {playerId}/
    username: string
    email: string
    points: number
    wins: number
    tournaments: number
    weeklyPoints: number
    weeklyWins: number
    createdAt: timestamp
    updatedAt: timestamp

teams/
  {teamId}/
    name: string
    members: number
    points: number
    wins: number
    tournaments: number
    weeklyPoints: number
    weeklyWins: number
    createdAt: timestamp
    updatedAt: timestamp

matchResults/
  {resultId}/
    playerId: string (optional)
    teamId: string (optional)
    type: 'match' | 'tournament'
    pointsAwarded: number
    createdAt: timestamp
```

## Puan Hesaplama

```javascript
// Maç kazanma
points += 25;
wins += 1;
weeklyPoints += 25;
weeklyWins += 1;

// Turnuva galibiyeti
points += 100;
tournaments += 1;
weeklyPoints += 100;
```

## Admin Paneli

Admin panelinden (`/admin`):
- Puan ekleme formu
- Bireysel oyuncu veya takım seçimi
- Maç kazanma veya turnuva galibiyeti seçimi
- Otomatik puan hesaplama ve güncelleme

## Gerçek Zamanlı Güncellemeler

Liderlik tablosu gerçek zamanlı olarak güncellenir:
- Yeni puan eklendiğinde sıralama otomatik güncellenir
- Breaking news banner'ı otomatik güncellenir
- Hall of Fame otomatik güncellenir

## Kullanım

1. **Liderlik Tablosunu Görüntüleme**: `/leaderboard` sayfasına gidin
2. **Kategori Seçimi**: Bireysel Oyuncular veya Takımlar
3. **Filtreleme**: Haftalık veya Tüm Zamanlar
4. **Puan Ekleme**: Admin panelinden puan ekleyin

## Entegrasyon

Supabase veya Firebase entegrasyonu için:
1. `src/services/pointsService.js` dosyasındaki yorumları kaldırın
2. Gerekli paketleri yükleyin
3. Environment variables'ları ayarlayın
4. Database şemalarını oluşturun
