import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Download, Calendar, Fire, 
  Mic, Users, Star, ArrowRight,
  Trophy, Award, Medal,
  Crosshair, Target, Sword, Shield,
  ShoppingBag, Map,
  TrendingUp, BarChart3,
  Radio, ExternalLink, Clock
} from 'lucide-react';
import { 
  patchNotes, 
  proEvents,
  amateurEvents,
  proTournaments,
  communityTournaments,
  popularLobbies, 
  featuredGuides, 
  newsUpdates, 
  gameStats 
} from '../data/homeData';
import '../styles/Home.css';

const iconMap = {
  Crosshair, Target, Sword, Shield,
  Trophy, Award, Medal,
  ShoppingBag, Map, Users,
  TrendingUp, BarChart3, Radio
};

// Twitch Channels
const twitchChannels = {
  valorant: { channel: 'riotgames', name: 'Riot Games', game: 'Valorant', icon: '🔫' },
  cs2: { channel: 'eslcs', name: 'ESL CS', game: 'Counter-Strike 2', icon: '🎯' },
  lol: { channel: 'riotgames', name: 'LoL Esports', game: 'League of Legends', icon: '⚔️' },
  eafc: { channel: 'easportsfc', name: 'EA Sports FC', game: 'EA Sports FC', icon: '⚽' },
  apex: { channel: 'playapex', name: 'Apex Legends', game: 'Apex Legends', icon: '🎮' },
  fortnite: { channel: 'fortnite', name: 'Fortnite', game: 'Fortnite', icon: '🏗️' }
};

function Home() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [activeGame, setActiveGame] = useState('valorant');
  const [activeEventTab, setActiveEventTab] = useState('pro');
  const [activeTournamentTab, setActiveTournamentTab] = useState('pro');

  const currentChannel = twitchChannels[activeGame] || twitchChannels.valorant;

  const handleGameChange = (game) => {
    setActiveGame(game);
  };

  const handleTwitchOpen = () => {
    window.open(`https://www.twitch.tv/${currentChannel.channel}`, '_blank');
  };

  const handleEventClick = (eventId) => {
    navigate(`/live-arena/${eventId}`);
  };

  const isLive = (event) => {
    return event.status === 'live';
  };

  const isUpcoming = (event) => {
    return event.status === 'upcoming';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section - Live Arena with Twitch Embed */}
        <section className="mb-16">
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-neon-cyan flex items-center gap-3">
                <Radio className="w-8 h-8" />
                Live Arena
              </h2>
              <button
                onClick={handleTwitchOpen}
                className="px-4 py-2 bg-gradient-to-br from-neon-purple to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:shadow-neon-purple/70 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Twitch'te Aç
              </button>
            </div>
            
            {/* Twitch Player */}
            <div className="stream-player-wrapper mb-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px' }}>
                <iframe
                  src={`https://player.twitch.tv/?channel=${currentChannel.channel}&parent=${window.location.hostname || 'localhost'}&muted=false`}
                  height="100%"
                  width="100%"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '16px' }}
                  title={currentChannel.name}
                ></iframe>
              </div>
            </div>

            {/* Game Channel Selector */}
            <div className="game-selector">
              <h3 className="text-lg font-semibold text-white/80 mb-4">Kanal Seçici</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(twitchChannels).map(([key, channel]) => (
                  <button
                    key={key}
                    onClick={() => handleGameChange(key)}
                    className={`game-selector-btn backdrop-blur-glass border rounded-xl px-6 py-3 flex items-center gap-2 transition-all duration-300 ${
                      activeGame === key
                        ? 'border-neon-cyan bg-neon-cyan/10 shadow-neon-cyan/50'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl">{channel.icon}</span>
                    <span className={`font-semibold ${activeGame === key ? 'text-neon-cyan' : 'text-white/80'}`}>
                      {channel.game}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* Active & Upcoming Events Section */}
        <section className="mb-16">
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-neon-gold mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              Aktif ve Yaklaşan Etkinlikler
            </h2>

            {/* Tab Selector */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
              <button
                onClick={() => setActiveEventTab('pro')}
                className={`tab-button px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                  activeEventTab === 'pro'
                    ? 'border-neon-gold text-neon-gold'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                Profesyonel E-spor
              </button>
              <button
                onClick={() => setActiveEventTab('amateur')}
                className={`tab-button px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                  activeEventTab === 'amateur'
                    ? 'border-neon-purple text-neon-purple'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                Amatör Turnuvalar
              </button>
            </div>

            {/* Events Content */}
            <div className="events-content">
              {activeEventTab === 'pro' ? (
                <div className="space-y-4">
                  {/* Live Events First */}
                  {proEvents.filter(isLive).map((event) => {
                    const Icon = iconMap[event.icon] || Trophy;
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event.id)}
                        className="event-card backdrop-blur-glass bg-white/5 border border-neon-red rounded-xl p-5 hover:border-neon-red hover:shadow-neon-red/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="p-3 rounded-lg border bg-neon-red/20 border-neon-red">
                              <Icon className="w-6 h-6 text-neon-red" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                <span className="px-3 py-1 bg-red-500/20 border border-red-500 rounded-full text-xs font-bold text-red-400 animate-pulse">
                                  CANLI
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white/60">
                                <span className="text-neon-cyan font-semibold">{event.team1}</span>
                                <span className="text-2xl font-bold text-white">{event.score1} - {event.score2}</span>
                                <span className="text-neon-cyan font-semibold">{event.team2}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-neon-gold font-semibold mb-1">Ödül: {event.prize}</p>
                            <p className="text-white/60 text-sm">{event.game}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Upcoming Events */}
                  {proEvents.filter(isUpcoming).length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-neon-cyan mt-8 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Yaklaşan Etkinlikler
                      </h3>
                      {proEvents.filter(isUpcoming).map((event) => {
                        const Icon = iconMap[event.icon] || Trophy;
                        return (
                          <div
                            key={event.id}
                            onClick={() => handleEventClick(event.id)}
                            className="event-card backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-gold transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <div className={`p-3 rounded-lg border bg-${event.color}/20 border-${event.color}`}>
                                  <Icon className={`w-6 h-6 text-${event.color}`} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                  <div className="flex items-center gap-4 text-sm text-white/60">
                                    <span className="text-neon-cyan font-semibold">{event.team1}</span>
                                    <span className="text-white/40">vs</span>
                                    <span className="text-neon-cyan font-semibold">{event.team2}</span>
                                  </div>
                                  <p className="text-white/40 text-xs mt-2">
                                    {new Date(event.startTime).toLocaleDateString('tr-TR', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-neon-gold font-semibold mb-1">Ödül: {event.prize}</p>
                                <p className="text-white/60 text-sm">{event.game}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {amateurEvents.map((event) => {
                    const Icon = iconMap[event.icon] || Trophy;
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event.id)}
                        className="event-card backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-purple transition-all cursor-pointer"
                      >
                        <div className={`p-3 rounded-lg border bg-${event.color}/20 border-${event.color} w-fit mb-4`}>
                          <Icon className={`w-6 h-6 text-${event.color}`} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-neon-gold font-semibold">Ödül: {event.prize}</p>
                          <p className="text-white/60">{event.participants}</p>
                          <p className="text-white/40">{event.timeLeft}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* Tournaments Section */}
        <section className="mb-16">
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-neon-purple mb-6 flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              Turnuvalar
            </h2>

            {/* Tab Selector */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
              <button
                onClick={() => setActiveTournamentTab('pro')}
                className={`tab-button px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                  activeTournamentTab === 'pro'
                    ? 'border-neon-gold text-neon-gold'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                Pro League
              </button>
              <button
                onClick={() => setActiveTournamentTab('community')}
                className={`tab-button px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                  activeTournamentTab === 'community'
                    ? 'border-neon-purple text-neon-purple'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                Community Cup
              </button>
            </div>

            {/* Tournaments Content */}
            <div className="tournaments-content">
              {activeTournamentTab === 'pro' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {proTournaments.map((tournament) => {
                    const Icon = iconMap[tournament.icon] || Trophy;
                    return (
                      <div
                        key={tournament.id}
                        onClick={() => navigate('/tournaments')}
                        className="tournament-card backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-gold transition-all cursor-pointer"
                      >
                        <div className={`p-3 rounded-lg border bg-${tournament.color}/20 border-${tournament.color} w-fit mb-4`}>
                          <Icon className={`w-6 h-6 text-${tournament.color}`} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{tournament.name}</h3>
                        <p className="text-neon-cyan font-semibold mb-2">{tournament.game}</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-neon-gold font-semibold">Ödül Havuzu: {tournament.prizePool}</p>
                          <p className="text-white/60">{tournament.teams} Takım</p>
                          <p className="text-white/40">Başlangıç: {new Date(tournament.startDate).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {communityTournaments.map((tournament) => {
                    const Icon = iconMap[tournament.icon] || Trophy;
                    return (
                      <div
                        key={tournament.id}
                        onClick={() => navigate('/tournaments')}
                        className="tournament-card backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-purple transition-all cursor-pointer"
                      >
                        <div className={`p-3 rounded-lg border bg-${tournament.color}/20 border-${tournament.color} w-fit mb-4`}>
                          <Icon className={`w-6 h-6 text-${tournament.color}`} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{tournament.name}</h3>
                        <p className="text-neon-cyan font-semibold mb-2">{tournament.game}</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-neon-gold font-semibold">Ödül: {tournament.prizePool}</p>
                          <p className="text-white/60">{tournament.participants} Katılımcı</p>
                          <p className="text-white/40">Başlangıç: {new Date(tournament.startDate).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* Popular Lobbies */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-neon-purple flex items-center gap-3">
              <Users className="w-8 h-8" />
              Popüler Lobiler
            </h2>
            <button
              onClick={() => navigate('/lobbies')}
              className="px-4 py-2 bg-gradient-to-br from-neon-purple to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:shadow-neon-purple/70 transition-all"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {popularLobbies.slice(0, 4).map((lobby) => (
              <div
                key={lobby.id}
                onClick={() => navigate(`/lobby/${lobby.id}`)}
                className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-purple transition-all cursor-pointer"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {lobby.sponsored && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 border border-yellow-500 text-yellow-400 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Sponsorlu
                    </span>
                  )}
                  {lobby.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        tag === 'Mic'
                          ? 'bg-green-500/20 border border-green-500 text-green-400'
                          : tag === 'Squad' || tag === 'Duo'
                          ? 'bg-purple-500/20 border border-purple-500 text-purple-400'
                          : 'bg-white/10 border border-white/20 text-white/60'
                      }`}
                    >
                      {(tag === 'Mic' && <Mic className="w-3 h-3" />) ||
                       ((tag === 'Squad' || tag === 'Duo') && <Users className="w-3 h-3" />)}
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{lobby.title}</h3>
                <p className="text-white/60 text-sm mb-4">{lobby.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="text-neon-blue font-semibold">{lobby.game}</span>
                    <span className="text-green-400">{lobby.members}/{lobby.maxMembers}</span>
                    <span>{lobby.timeAgo}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/lobby/${lobby.id}`); }}
                    className="px-4 py-2 bg-gradient-to-br from-neon-blue to-blue-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:shadow-neon-blue/70 transition-all"
                  >
                    Katıl <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* Featured Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neon-cyan mb-6 flex items-center gap-3">
            <Sword className="w-8 h-8" />
            Öne Çıkan Rehberler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredGuides.map((guide) => {
              const Icon = iconMap[guide.icon] || Sword;
              return (
                <div
                  key={guide.id}
                  onClick={() => navigate('/forum')}
                  className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-cyan transition-all cursor-pointer"
                >
                  <div 
                    className="p-3 rounded-lg border w-fit mb-4"
                    style={{
                      backgroundColor: guide.color === 'neon-red' ? 'rgba(255, 0, 64, 0.2)' : 
                                    guide.color === 'neon-blue' ? 'rgba(0, 212, 255, 0.2)' : 
                                    guide.color === 'neon-gold' ? 'rgba(255, 215, 0, 0.2)' : 
                                    'rgba(176, 38, 255, 0.2)',
                      borderColor: guide.color === 'neon-red' ? '#ff0040' : 
                                  guide.color === 'neon-blue' ? '#00d4ff' : 
                                  guide.color === 'neon-gold' ? '#ffd700' : 
                                  '#b026ff'
                    }}
                  >
                    <Icon 
                      className="w-6 h-6"
                      style={{
                        color: guide.color === 'neon-red' ? '#ff0040' : 
                               guide.color === 'neon-blue' ? '#00d4ff' : 
                               guide.color === 'neon-gold' ? '#ffd700' : 
                               '#b026ff'
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-white/60">{guide.game}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{guide.title}</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/40 mt-4">
                    <span>{guide.author}</span>
                    <div className="flex items-center gap-2">
                      <span>⭐ {guide.rating}</span>
                      <span>👁 {guide.views}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* News/Updates Blog Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neon-gold mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            Günün Haberleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newsUpdates.map((news) => {
              const Icon = iconMap[news.icon] || TrendingUp;
              const categoryColors = {
                'E-spor': 'neon-gold',
                'Mağaza': 'neon-cyan',
                'Güncelleme': 'neon-blue'
              };
              const color = categoryColors[news.category] || 'neon-purple';
              return (
                <div
                  key={news.id}
                  onClick={() => navigate('/news')}
                  className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-5 hover:border-neon-gold transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-4 rounded-lg border"
                      style={{
                        backgroundColor: color === 'neon-gold' ? 'rgba(255, 215, 0, 0.2)' : 
                                        color === 'neon-cyan' ? 'rgba(0, 255, 255, 0.2)' : 
                                        color === 'neon-blue' ? 'rgba(0, 212, 255, 0.2)' : 
                                        'rgba(176, 38, 255, 0.2)',
                        borderColor: color === 'neon-gold' ? '#ffd700' : 
                                    color === 'neon-cyan' ? '#00ffff' : 
                                    color === 'neon-blue' ? '#00d4ff' : 
                                    '#b026ff',
                        boxShadow: color === 'neon-gold' ? '0 0 20px rgba(255, 215, 0, 0.5)' : 
                                 color === 'neon-cyan' ? '0 0 20px rgba(0, 255, 255, 0.5)' : 
                                 color === 'neon-blue' ? '0 0 20px rgba(0, 212, 255, 0.5)' : 
                                 '0 0 20px rgba(176, 38, 255, 0.5)'
                      }}
                    >
                      <Icon 
                        className="w-8 h-8"
                        style={{
                          color: color === 'neon-gold' ? '#ffd700' : 
                                 color === 'neon-cyan' ? '#00ffff' : 
                                 color === 'neon-blue' ? '#00d4ff' : 
                                 '#b026ff'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <span 
                        className="text-xs font-semibold px-2 py-1 rounded-full border mb-2 inline-block"
                        style={{
                          backgroundColor: color === 'neon-gold' ? 'rgba(255, 215, 0, 0.2)' : 
                                          color === 'neon-cyan' ? 'rgba(0, 255, 255, 0.2)' : 
                                          color === 'neon-blue' ? 'rgba(0, 212, 255, 0.2)' : 
                                          'rgba(176, 38, 255, 0.2)',
                          borderColor: color === 'neon-gold' ? '#ffd700' : 
                                      color === 'neon-cyan' ? '#00ffff' : 
                                      color === 'neon-blue' ? '#00d4ff' : 
                                      '#b026ff',
                          color: color === 'neon-gold' ? '#ffd700' : 
                                 color === 'neon-cyan' ? '#00ffff' : 
                                 color === 'neon-blue' ? '#00d4ff' : 
                                 '#b026ff'
                        }}
                      >
                        {news.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2">{news.title}</h3>
                      <p className="text-white/60 text-sm mb-3">{news.description}</p>
                      <span className="text-xs text-white/40">{news.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* Statistics & Meta Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neon-blue mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            İstatistikler & Meta Analizi
          </h2>
          <div className="space-y-8">
            {gameStats.map((game, gameIdx) => (
              <div
                key={gameIdx}
                onClick={() => navigate('/stats/' + game.game.toLowerCase().replace(/\s+/g, '-'))}
                className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-6 hover:border-neon-blue transition-all cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{game.game}</h3>
                <div className="space-y-4">
                  {game.characters.map((char, charIdx) => (
                    <div key={charIdx} className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{char.name}</span>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>Win Rate: <span className="text-neon-cyan font-bold">{char.winRate}%</span></span>
                          <span>Pick: {char.pickRate}%</span>
                          <span>K/D/A: {char.kda}</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full transition-all duration-500"
                          style={{ width: `${char.winRate}%` }}
                        >
                          <div className="h-full w-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/5 my-12"></div>

        {/* Patch Notes Section - Moved to Bottom */}
        <section className="mb-16">
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-neon-cyan mb-6 flex items-center gap-3">
              <Download className="w-8 h-8" />
              Yama Notları
            </h2>
            <div className="space-y-4">
              {patchNotes.map((patch) => {
                const Icon = iconMap[patch.icon] || Crosshair;
                return (
                  <div 
                    key={patch.id}
                    className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-4 hover:border-neon-cyan transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: patch.color === 'neon-red' ? 'rgba(255, 0, 64, 0.2)' : 
                                          patch.color === 'neon-blue' ? 'rgba(0, 212, 255, 0.2)' : 
                                          'rgba(255, 215, 0, 0.2)',
                          borderColor: patch.color === 'neon-red' ? '#ff0040' : 
                                       patch.color === 'neon-blue' ? '#00d4ff' : 
                                       '#ffd700',
                          boxShadow: patch.color === 'neon-red' ? '0 0 20px rgba(255, 0, 64, 0.5)' : 
                                    patch.color === 'neon-blue' ? '0 0 20px rgba(0, 212, 255, 0.5)' : 
                                    '0 0 20px rgba(255, 215, 0, 0.5)'
                        }}
                      >
                        <Icon 
                          className="w-6 h-6"
                          style={{
                            color: patch.color === 'neon-red' ? '#ff0040' : 
                                   patch.color === 'neon-blue' ? '#00d4ff' : 
                                   '#ffd700'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{patch.game}</h3>
                          <span className="text-sm text-white/60">{patch.version}</span>
                          <span className="text-xs text-white/40">{patch.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {patch.changes.map((change, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                change.type === 'buff'
                                  ? 'bg-green-500/20 border border-green-500 text-green-400'
                                  : 'bg-red-500/20 border border-red-500 text-red-400'
                              }`}
                            >
                              {change.type === 'buff' ? '↑ Buff' : '↓ Nerf'} - {change.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
