// Leaderboard Data Structure

// Individual Players Data
export const individualPlayers = {
  weekly: [
    {
      id: 1,
      username: 'ProGamer123',
      email: 'erdinoral31@gmail.com',
      points: 450,
      wins: 18,
      tournaments: 0,
      rank: 1,
      avatar: 'P'
    },
    {
      id: 2,
      username: 'ValorantMaster',
      email: 'valorant@example.com',
      points: 375,
      wins: 15,
      tournaments: 0,
      rank: 2,
      avatar: 'V'
    },
    {
      id: 3,
      username: 'CS2Legend',
      email: 'cs2@example.com',
      points: 325,
      wins: 13,
      tournaments: 0,
      rank: 3,
      avatar: 'C'
    },
    {
      id: 4,
      username: 'LoLPro',
      email: 'lol@example.com',
      points: 275,
      wins: 11,
      tournaments: 0,
      rank: 4,
      avatar: 'L'
    },
    {
      id: 5,
      username: 'ApexChampion',
      email: 'apex@example.com',
      points: 250,
      wins: 10,
      tournaments: 0,
      rank: 5,
      avatar: 'A'
    }
  ],
  allTime: [
    {
      id: 1,
      username: 'ProGamer123',
      email: 'erdinoral31@gmail.com',
      points: 2850,
      wins: 114,
      tournaments: 3,
      rank: 1,
      avatar: 'P'
    },
    {
      id: 2,
      username: 'ValorantMaster',
      email: 'valorant@example.com',
      points: 2400,
      wins: 96,
      tournaments: 2,
      rank: 2,
      avatar: 'V'
    },
    {
      id: 3,
      username: 'CS2Legend',
      email: 'cs2@example.com',
      points: 2100,
      wins: 84,
      tournaments: 1,
      rank: 3,
      avatar: 'C'
    },
    {
      id: 4,
      username: 'LoLPro',
      email: 'lol@example.com',
      points: 1900,
      wins: 76,
      tournaments: 1,
      rank: 4,
      avatar: 'L'
    },
    {
      id: 5,
      username: 'ApexChampion',
      email: 'apex@example.com',
      points: 1750,
      wins: 70,
      tournaments: 0,
      rank: 5,
      avatar: 'A'
    }
  ]
};

// Teams Data
export const teams = {
  weekly: [
    {
      id: 1,
      name: 'HyperX Elite',
      members: 5,
      points: 600,
      wins: 24,
      tournaments: 0,
      rank: 1,
      logo: 'H'
    },
    {
      id: 2,
      name: 'Monster Energy Squad',
      members: 5,
      points: 525,
      wins: 21,
      tournaments: 0,
      rank: 2,
      logo: 'M'
    },
    {
      id: 3,
      name: 'Razer Gaming',
      members: 5,
      points: 475,
      wins: 19,
      tournaments: 0,
      rank: 3,
      logo: 'R'
    },
    {
      id: 4,
      name: 'SteelSeries Pro',
      members: 5,
      points: 400,
      wins: 16,
      tournaments: 0,
      rank: 4,
      logo: 'S'
    },
    {
      id: 5,
      name: 'Corsair Champions',
      members: 5,
      points: 375,
      wins: 15,
      tournaments: 0,
      rank: 5,
      logo: 'C'
    }
  ],
  allTime: [
    {
      id: 1,
      name: 'HyperX Elite',
      members: 5,
      points: 4200,
      wins: 168,
      tournaments: 5,
      rank: 1,
      logo: 'H'
    },
    {
      id: 2,
      name: 'Monster Energy Squad',
      members: 5,
      points: 3800,
      wins: 152,
      tournaments: 4,
      rank: 2,
      logo: 'M'
    },
    {
      id: 3,
      name: 'Razer Gaming',
      members: 5,
      points: 3400,
      wins: 136,
      tournaments: 3,
      rank: 3,
      logo: 'R'
    },
    {
      id: 4,
      name: 'SteelSeries Pro',
      members: 5,
      points: 3000,
      wins: 120,
      tournaments: 2,
      rank: 4,
      logo: 'S'
    },
    {
      id: 5,
      name: 'Corsair Champions',
      members: 5,
      points: 2750,
      wins: 110,
      tournaments: 2,
      rank: 5,
      logo: 'C'
    }
  ]
};

// Hall of Fame Data
export const hallOfFame = {
  weeklyPlayer: {
    username: 'ProGamer123',
    email: 'erdinoral31@gmail.com',
    points: 450,
    avatar: 'P'
  },
  weeklyTeam: {
    name: 'HyperX Elite',
    points: 600,
    logo: 'H'
  },
  allTimePlayer: {
    username: 'ProGamer123',
    email: 'erdinoral31@gmail.com',
    points: 2850,
    avatar: 'P'
  },
  allTimeTeam: {
    name: 'HyperX Elite',
    points: 4200,
    logo: 'H'
  }
};

// Breaking News / Live Match Banner
export const breakingNews = [
  {
    id: 1,
    type: 'tournament',
    text: 'HyperX Elite, turnuva finalini kazandı ve Tüm Zamanlar sıralamasında 1. sıraya yükseldi!',
    timestamp: '2 dakika önce'
  },
  {
    id: 2,
    type: 'match',
    text: 'ProGamer123, 10 maç üst üste kazandı ve haftalık liderlik tablosunda zirveye çıktı!',
    timestamp: '15 dakika önce'
  },
  {
    id: 3,
    type: 'achievement',
    text: 'Monster Energy Squad, 100. galibiyetlerini aldı ve özel rozet kazandı!',
    timestamp: '1 saat önce'
  }
];

// Point System Constants
export const POINT_SYSTEM = {
  MATCH_WIN: 25,
  TOURNAMENT_WIN: 100
};

// Calculate points
export const calculatePoints = (wins, tournaments) => {
  return (wins * POINT_SYSTEM.MATCH_WIN) + (tournaments * POINT_SYSTEM.TOURNAMENT_WIN);
};
