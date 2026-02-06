// Games Data
export const games = [
  {
    id: 1,
    name: "Valorant",
    players: "15M+",
    lobbies: 12,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    color: "#FF4655"
  },
  {
    id: 2,
    name: "Counter-Strike 2",
    players: "25M+",
    lobbies: 8,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    color: "#B48B2D"
  },
  {
    id: 3,
    name: "League of Legends",
    players: "100M+",
    lobbies: 15,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    color: "#C89B3C"
  }
];

// Popular Lobbies
export const popularLobbies = [
  {
    id: 1,
    title: "HyperX Gaming Turnuva Lobisi",
    description: "HyperX sponsorluğunda özel turnuva lobisi! Ödüller ve sürprizler sizi bekliyor. HyperX kullanıcılarına özel avantajlar",
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
    description: "Monster Energy sponsorluğunda profesyonel CS2 lobisi. Haftalık ödüller! Faceit 10+, turnuva tecrübesi",
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

// Upcoming Matches
export const upcomingMatches = [
  {
    id: 1,
    status: "Yakında",
    date: "6 Şub",
    time: "07:01",
    team1: { name: "TSM", logo: "T", odds: 2.00 },
    team2: { name: "NRG", logo: "N", odds: 1.80 },
    game: "Valorant"
  },
  {
    id: 2,
    status: "Yakında",
    date: "6 Şub",
    time: "04:01",
    team1: { name: "T1", logo: "T", odds: 1.90 },
    team2: { name: "Gen.G", logo: "G", odds: 1.90 },
    game: "League of Legends"
  },
  {
    id: 3,
    status: "Yakında",
    date: "6 Şub",
    time: "02:01",
    team1: { name: "FaZe Clan", logo: "F", odds: 2.25 },
    team2: { name: "Vitality", logo: "V", odds: 1.65 },
    game: "Counter-Strike 2"
  },
  {
    id: 4,
    status: "Yakında",
    date: "6 Şub",
    time: "00:01",
    team1: { name: "Team Heretics", logo: "H", odds: 2.10 },
    team2: { name: "Fnatic", logo: "F", odds: 1.75 },
    game: "Counter-Strike 2"
  }
];

// Live Streams
export const liveStreams = [
  {
    id: 1,
    title: "ESL CS",
    channel: "eslcs",
    game: "Counter-Strike 2",
    viewers: "125K",
    map: "Mirage",
    tournament: "IEM KRAKOW 2026",
    team1: { name: "NRG", rounds: 2 },
    team2: { name: "B8 ESPORTS", rounds: 3 },
    currentRound: 6,
    timeRemaining: "1:46"
  }
];

// Tournament Brackets
export const tournamentBrackets = [
  {
    id: 1,
    round: "Yarı Final 1",
    status: "CANLI",
    team1: { name: "Fnatic", score: 12 },
    team2: { name: "Vitality", score: 10 },
    map: "Mirage",
    roundNumber: 23
  },
  {
    id: 2,
    round: "Yarı Final 2",
    status: "Yakında",
    time: "21:00",
    team1: { name: "G2 Esports", score: 0 },
    team2: { name: "Team Liquid", score: 0 }
  },
  {
    id: 3,
    round: "Final",
    status: "Yakında",
    time: "Yarın 20:00",
    team1: { name: "TBD", score: 0 },
    team2: { name: "TBD", score: 0 }
  }
];

// Prediction Stats
export const predictionStats = {
  balance: 1000,
  won: 0,
  lost: 0,
  successRate: 0
};

// Donation Tiers
export const donationTiers = [
  { amount: 10, title: "Kahve", description: "Bir kahve ısmarlayarak destek ol" },
  { amount: 25, title: "Supporter", description: "Platformun büyümesine katkı sağ" },
  { amount: 50, title: "Champion", description: "Şampiyonlar gibi destekle" },
  { amount: 100, title: "Legend", description: "Efsanevi bir destekçi ol" }
];

// Investor Stats
export const investorStats = [
  { label: "Aktif Kullanıcı", value: "15,000+", icon: "users", color: "blue" },
  { label: "Aylık Büyüme", value: "%45", icon: "trending-up", color: "green" },
  { label: "Ülke", value: "12+", icon: "globe", color: "purple" },
  { label: "Turnuva", value: "200+", icon: "target", color: "red" }
];

// User Profile
export const userProfile = {
  name: "Erdin Oral",
  email: "erdinoral31@gmail.com",
  points: 1000,
  avatar: "E",
  ranks: {
    valorant: "Belirtilmemiş",
    cs2: "Belirtilmemiş",
    lol: "Belirtilmemiş",
    apex: "Belirtilmemiş",
    fortnite: "Belirtilmemiş"
  },
  gameStyle: [],
  bio: ""
};
