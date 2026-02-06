// External API Services for GamerConnect Platform

// PandaScore API - General match scores and schedules
const PANDASCORE_API_KEY = process.env.REACT_APP_PANDASCORE_API_KEY || '';
const PANDASCORE_BASE_URL = 'https://api.pandascore.co';

export const pandaScoreService = {
  // Get upcoming matches
  getUpcomingMatches: async (game = 'csgo', page = 1) => {
    try {
      const response = await fetch(
        `${PANDASCORE_BASE_URL}/${game}/matches/upcoming?page=${page}&per_page=20`,
        {
          headers: {
            'Authorization': `Bearer ${PANDASCORE_API_KEY}`,
            'Accept': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('PandaScore API error');
      return await response.json();
    } catch (error) {
      console.error('PandaScore API Error:', error);
      // Return mock data if API fails
      return getMockMatches();
    }
  },

  // Get live matches
  getLiveMatches: async (game = 'csgo') => {
    try {
      const response = await fetch(
        `${PANDASCORE_BASE_URL}/${game}/matches/running`,
        {
          headers: {
            'Authorization': `Bearer ${PANDASCORE_API_KEY}`,
            'Accept': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('PandaScore API error');
      return await response.json();
    } catch (error) {
      console.error('PandaScore API Error:', error);
      return [];
    }
  },

  // Get match details
  getMatchDetails: async (matchId, game = 'csgo') => {
    try {
      const response = await fetch(
        `${PANDASCORE_BASE_URL}/${game}/matches/${matchId}`,
        {
          headers: {
            'Authorization': `Bearer ${PANDASCORE_API_KEY}`,
            'Accept': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('PandaScore API error');
      return await response.json();
    } catch (error) {
      console.error('PandaScore API Error:', error);
      return null;
    }
  },

  // Get tournaments
  getTournaments: async (game = 'csgo') => {
    try {
      const response = await fetch(
        `${PANDASCORE_BASE_URL}/${game}/tournaments/upcoming`,
        {
          headers: {
            'Authorization': `Bearer ${PANDASCORE_API_KEY}`,
            'Accept': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('PandaScore API error');
      return await response.json();
    } catch (error) {
      console.error('PandaScore API Error:', error);
      return [];
    }
  }
};

// HLTV API/Scraper - CS2 detailed match statistics
const HLTV_BASE_URL = 'https://www.hltv.org';

export const hltvService = {
  // Get CS2 match statistics (Note: HLTV doesn't have official API, this is a placeholder)
  getMatchStats: async (matchId) => {
    try {
      // In production, you would use a proxy server to scrape HLTV
      // or use an unofficial HLTV API wrapper
      const response = await fetch(`/api/hltv/match/${matchId}`);
      if (!response.ok) throw new Error('HLTV API error');
      return await response.json();
    } catch (error) {
      console.error('HLTV API Error:', error);
      return getMockCS2Stats();
    }
  },

  // Get player statistics
  getPlayerStats: async (playerId) => {
    try {
      const response = await fetch(`/api/hltv/player/${playerId}`);
      if (!response.ok) throw new Error('HLTV API error');
      return await response.json();
    } catch (error) {
      console.error('HLTV API Error:', error);
      return null;
    }
  }
};

// Riot Games API - LoL and Valorant rank/match data
const RIOT_API_KEY = process.env.REACT_APP_RIOT_API_KEY || '';
const RIOT_BASE_URL = 'https://euw1.api.riotgames.com'; // EUW region

export const riotService = {
  // Get Valorant match history (Note: Riot API requires server-side proxy)
  getValorantMatchHistory: async (puuid) => {
    try {
      // This should be called from your backend to protect API key
      const response = await fetch(`/api/riot/valorant/matches/${puuid}`);
      if (!response.ok) throw new Error('Riot API error');
      return await response.json();
    } catch (error) {
      console.error('Riot API Error:', error);
      return [];
    }
  },

  // Get LoL ranked stats
  getLoLRankedStats: async (summonerId) => {
    try {
      const response = await fetch(`/api/riot/lol/summoner/${summonerId}/ranked`);
      if (!response.ok) throw new Error('Riot API error');
      return await response.json();
    } catch (error) {
      console.error('Riot API Error:', error);
      return null;
    }
  },

  // Get Valorant rank
  getValorantRank: async (puuid) => {
    try {
      const response = await fetch(`/api/riot/valorant/mmr/${puuid}`);
      if (!response.ok) throw new Error('Riot API error');
      return await response.json();
    } catch (error) {
      console.error('Riot API Error:', error);
      return null;
    }
  }
};

// Twitch API - Live stream status
const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID || '';
const TWITCH_BASE_URL = 'https://api.twitch.tv/helix';

export const twitchService = {
  // Check if channel is live
  isChannelLive: async (channelName) => {
    try {
      const response = await fetch(
        `${TWITCH_BASE_URL}/streams?user_login=${channelName}`,
        {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${process.env.REACT_APP_TWITCH_ACCESS_TOKEN || ''}`
          }
        }
      );
      if (!response.ok) throw new Error('Twitch API error');
      const data = await response.json();
      return data.data.length > 0;
    } catch (error) {
      console.error('Twitch API Error:', error);
      return false;
    }
  },

  // Get live streams by game
  getLiveStreamsByGame: async (gameName) => {
    try {
      const response = await fetch(
        `${TWITCH_BASE_URL}/streams?game=${encodeURIComponent(gameName)}&first=10`,
        {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${process.env.REACT_APP_TWITCH_ACCESS_TOKEN || ''}`
          }
        }
      );
      if (!response.ok) throw new Error('Twitch API error');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Twitch API Error:', error);
      return [];
    }
  }
};

// Mock data functions (fallback when APIs fail)
function getMockMatches() {
  return [
    {
      id: 1,
      opponents: [
        { name: 'Team Liquid', image_url: null },
        { name: 'FaZe Clan', image_url: null }
      ],
      scheduled_at: new Date(Date.now() + 3600000).toISOString(),
      status: 'not_started'
    }
  ];
}

function getMockCS2Stats() {
  return {
    matchId: 1,
    teams: [
      { name: 'Team A', score: 16, players: [] },
      { name: 'Team B', score: 12, players: [] }
    ],
    maps: ['Mirage', 'Dust2'],
    stats: {
      kills: [],
      assists: [],
      deaths: []
    }
  };
}

// Export all services
export default {
  pandaScore: pandaScoreService,
  hltv: hltvService,
  riot: riotService,
  twitch: twitchService
};
