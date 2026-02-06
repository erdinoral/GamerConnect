// Patch Notes Data
export const patchNotes = [
  {
    id: 1,
    game: "Valorant",
    version: "v8.01",
    icon: "Crosshair",
    color: "neon-red",
    changes: [
      { type: "buff", text: "Jett dash cooldown azaltıldı" },
      { type: "nerf", text: "Raze satchel damage düşürüldü" }
    ],
    date: "2 saat önce"
  },
  {
    id: 2,
    game: "Counter-Strike 2",
    version: "v1.2.5",
    icon: "Target",
    color: "neon-blue",
    changes: [
      { type: "buff", text: "AK-47 recoil pattern iyileştirildi" },
      { type: "buff", text: "Yeni harita eklendi: Anubis" }
    ],
    date: "5 saat önce"
  },
  {
    id: 3,
    game: "League of Legends",
    version: "Patch 14.3",
    icon: "Sword",
    color: "neon-gold",
    changes: [
      { type: "nerf", text: "Yasuo Q cooldown artırıldı" },
      { type: "buff", text: "Jinx attack speed bonusu eklendi" }
    ],
    date: "1 gün önce"
  }
];

// Professional Events (Pro League)
export const proEvents = [
  {
    id: 1,
    title: "VCT Masters Madrid",
    team1: "Sentinels",
    team2: "Fnatic",
    score1: 8,
    score2: 6,
    status: "live",
    prize: "$500,000",
    participants: "16 takım",
    startTime: "2024-03-24T18:00:00Z",
    icon: "Trophy",
    color: "neon-red",
    game: "Valorant"
  },
  {
    id: 2,
    title: "IEM Katowice 2024",
    team1: "FaZe",
    team2: "NAVI",
    score1: 12,
    score2: 10,
    status: "live",
    prize: "$1,000,000",
    participants: "24 takım",
    startTime: "2024-02-11T16:00:00Z",
    icon: "Medal",
    color: "neon-blue",
    game: "Counter-Strike 2"
  },
  {
    id: 3,
    title: "Worlds 2024 Final",
    team1: "T1",
    team2: "Gen.G",
    score1: null,
    score2: null,
    status: "upcoming",
    prize: "$2,000,000",
    participants: "24 takım",
    startTime: "2024-11-02T19:00:00Z",
    icon: "Trophy",
    color: "neon-gold",
    game: "League of Legends"
  }
];

// Amateur Events (Community Cup)
export const amateurEvents = [
  {
    id: 1,
    title: "Hafta Sonu Turnuvası",
    prize: "50,000 GP",
    participants: "128 takım",
    timeLeft: "Son 3 gün",
    status: "active",
    icon: "Trophy",
    color: "neon-gold",
    game: "Valorant"
  },
  {
    id: 2,
    title: "Valorant Ranked Challenge",
    prize: "25,000 GP",
    participants: "500+ oyuncu",
    timeLeft: "Son 5 gün",
    status: "active",
    icon: "Award",
    color: "neon-purple",
    game: "Valorant"
  },
  {
    id: 3,
    title: "CS2 Community Cup",
    prize: "30,000 GP",
    participants: "64 takım",
    timeLeft: "Son 2 gün",
    status: "active",
    icon: "Medal",
    color: "neon-cyan",
    game: "Counter-Strike 2"
  }
];

// Tournaments - Pro League
export const proTournaments = [
  {
    id: 1,
    name: "VCT Champions 2024",
    game: "Valorant",
    prizePool: "$2,000,000",
    teams: 16,
    startDate: "2024-08-15",
    status: "upcoming",
    icon: "Trophy",
    color: "neon-red"
  },
  {
    id: 2,
    name: "IEM Cologne 2024",
    game: "Counter-Strike 2",
    prizePool: "$1,000,000",
    teams: 24,
    startDate: "2024-07-20",
    status: "upcoming",
    icon: "Medal",
    color: "neon-blue"
  },
  {
    id: 3,
    name: "LoL World Championship",
    game: "League of Legends",
    prizePool: "$2,500,000",
    teams: 24,
    startDate: "2024-10-01",
    status: "upcoming",
    icon: "Trophy",
    color: "neon-gold"
  }
];

// Tournaments - Community Cup
export const communityTournaments = [
  {
    id: 1,
    name: "GamerConnect Haftalık Turnuva",
    game: "Valorant",
    prizePool: "50,000 GP",
    participants: 128,
    startDate: "2024-03-25",
    status: "active",
    icon: "Award",
    color: "neon-purple"
  },
  {
    id: 2,
    name: "CS2 Amatör Ligi",
    game: "Counter-Strike 2",
    prizePool: "30,000 GP",
    participants: 64,
    startDate: "2024-03-20",
    status: "active",
    icon: "Medal",
    color: "neon-cyan"
  },
  {
    id: 3,
    name: "LoL Flex Queue Challenge",
    game: "League of Legends",
    prizePool: "40,000 GP",
    participants: 256,
    startDate: "2024-03-22",
    status: "active",
    icon: "Trophy",
    color: "neon-gold"
  }
];

// Popular Lobbies
export const popularLobbies = [
  {
    id: 1,
    title: "HyperX Gaming Turnuva Lobisi",
    description: "HyperX sponsorluğunda özel turnuva lobisi! Ödüller ve sürprizler sizi bekliyor.",
    game: "Valorant",
    tags: ["Sponsorlu", "Squad", "Tüm Ranklar", "Mic"],
    members: 6,
    maxMembers: 10,
    timeAgo: "yaklaşık 1 saat önce",
    sponsored: true
  },
  {
    id: 2,
    title: "Monster Energy Pro Lobby",
    description: "Monster Energy sponsorluğunda profesyonel CS2 lobisi. Haftalık ödüller!",
    game: "Counter-Strike 2",
    tags: ["Sponsorlu", "Squad", "Global Elite", "Mic"],
    members: 7,
    maxMembers: 10,
    timeAgo: "yaklaşık 1 saat önce",
    sponsored: true
  },
  {
    id: 3,
    title: "Faceit Level 8+ Duo",
    description: "Entry fragger veya AWPer arıyorum Faceit hesabı zorunlu",
    game: "Counter-Strike 2",
    tags: ["Duo", "Faceit 8", "Mic"],
    members: 1,
    maxMembers: 2,
    timeAgo: "yaklaşık 3 saat önce",
    sponsored: false
  },
  {
    id: 4,
    title: "Ranked Duo Gold+",
    description: "Gold rank ve üzeri oyuncular için duo partner arıyorum",
    game: "Valorant",
    tags: ["Duo", "Gold", "Mic"],
    members: 1,
    maxMembers: 2,
    timeAgo: "yaklaşık 5 saat önce",
    sponsored: false
  }
];

// Featured Guides
export const featuredGuides = [
  {
    id: 1,
    game: "Valorant",
    title: "Jett Giriş Taktiği",
    author: "ProGamer123",
    views: 1250,
    rating: 4.8,
    icon: "Crosshair",
    color: "neon-red"
  },
  {
    id: 2,
    game: "Counter-Strike 2",
    title: "A Site Take Stratejisi",
    author: "CSMaster",
    views: 890,
    rating: 4.6,
    icon: "Target",
    color: "neon-blue"
  },
  {
    id: 3,
    game: "League of Legends",
    title: "Jungle Pathing Rehberi",
    author: "JunglePro",
    views: 2100,
    rating: 4.9,
    icon: "Sword",
    color: "neon-gold"
  },
  {
    id: 4,
    game: "Valorant",
    title: "Sage Support Build",
    author: "SupportMain",
    views: 750,
    rating: 4.7,
    icon: "Shield",
    color: "neon-purple"
  }
];

// News/Updates
export const newsUpdates = [
  {
    id: 1,
    category: "E-spor",
    title: "Valorant Champions 2024 Başlıyor!",
    description: "Dünyanın en büyük Valorant turnuvası bu hafta sonu başlıyor. 16 takım yarışacak.",
    date: "2 saat önce",
    icon: "Trophy",
    color: "neon-gold"
  },
  {
    id: 2,
    category: "Mağaza",
    title: "Steam Yeni İndirim Kampanyası",
    description: "Hafta sonu özel indirimler başladı! %70'e varan indirimler.",
    date: "3 saat önce",
    icon: "ShoppingBag",
    color: "neon-cyan"
  },
  {
    id: 3,
    category: "Güncelleme",
    title: "CS2 Yeni Harita: Anubis",
    description: "Counter-Strike 2'ye yeni harita eklendi. Detaylar için tıklayın.",
    date: "5 saat önce",
    icon: "Map",
    color: "neon-blue"
  },
  {
    id: 4,
    category: "E-spor",
    title: "LoL World Championship Grupları",
    description: "World Championship için grup kuraları çekildi. Türk takımları hangi grupta?",
    date: "1 gün önce",
    icon: "Users",
    color: "neon-purple"
  }
];

// Statistics & Meta
export const gameStats = [
  {
    game: "Valorant",
    characters: [
      { name: "Jett", winRate: 52.3, pickRate: 18.5, kda: 1.15 },
      { name: "Raze", winRate: 51.8, pickRate: 15.2, kda: 1.12 },
      { name: "Sage", winRate: 50.5, pickRate: 22.1, kda: 0.95 },
      { name: "Omen", winRate: 49.8, pickRate: 12.3, kda: 1.08 }
    ]
  },
  {
    game: "Counter-Strike 2",
    characters: [
      { name: "AK-47", winRate: 58.2, pickRate: 45.3, kda: 1.25 },
      { name: "AWP", winRate: 62.1, pickRate: 18.7, kda: 1.35 },
      { name: "M4A4", winRate: 54.8, pickRate: 38.9, kda: 1.18 }
    ]
  },
  {
    game: "League of Legends",
    characters: [
      { name: "Jinx", winRate: 53.2, pickRate: 12.5, kda: 2.15 },
      { name: "Yasuo", winRate: 49.8, pickRate: 18.3, kda: 1.85 },
      { name: "Thresh", winRate: 51.5, pickRate: 15.7, kda: 2.05 }
    ]
  }
];
