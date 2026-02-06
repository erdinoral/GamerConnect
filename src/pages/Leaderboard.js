import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Medal, Award, Users, User, 
  Calendar, Clock, Crown, TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { individualPlayers, teams } from '../data/leaderboardData';
import BackButton from '../components/BackButton';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('individual'); // 'individual' or 'teams'
  const [activeFilter, setActiveFilter] = useState('weekly'); // 'weekly' or 'allTime'

  const currentData = activeCategory === 'individual' 
    ? individualPlayers[activeFilter]
    : teams[activeFilter];

  const getRankIcon = (rank) => {
    if (rank === 1) {
      return <Trophy className="w-6 h-6 text-neon-gold" style={{filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'}} />;
    } else if (rank === 2) {
      return <Medal className="w-6 h-6 text-gray-300" style={{filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.8))'}} />;
    } else if (rank === 3) {
      return <Award className="w-6 h-6 text-amber-600" style={{filter: 'drop-shadow(0 0 10px rgba(217, 119, 6, 0.8))'}} />;
    }
    return null;
  };

  const isCreator = (email) => {
    return email === 'erdinoral31@gmail.com';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <BackButton />
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-cyan mb-4 flex items-center gap-3">
            <Trophy className="w-10 h-10" />
            Liderlik Tablosu
          </h1>
          <p className="text-white/60">En iyi oyuncular ve takımlar</p>
        </div>

        {/* Category Tabs */}
        <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategory('individual')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeCategory === 'individual'
                  ? 'bg-gradient-neon-cyan text-white shadow-neon-cyan'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              Bireysel Oyuncular
            </button>
            <button
              onClick={() => setActiveCategory('teams')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeCategory === 'teams'
                  ? 'bg-gradient-neon-purple text-white shadow-neon-purple'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              Takımlar
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveFilter('weekly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all backdrop-blur-glass border ${
              activeFilter === 'weekly'
                ? 'bg-white/10 border-neon-cyan text-neon-cyan shadow-neon-cyan'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Haftalık
          </button>
          <button
            onClick={() => setActiveFilter('allTime')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all backdrop-blur-glass border ${
              activeFilter === 'allTime'
                ? 'bg-white/10 border-neon-gold text-neon-gold shadow-neon-gold'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5" />
            Tüm Zamanlar
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/60 font-semibold">Sıra</th>
                  <th className="text-left p-4 text-white/60 font-semibold">
                    {activeCategory === 'individual' ? 'Oyuncu' : 'Takım'}
                  </th>
                  <th className="text-right p-4 text-white/60 font-semibold">Puan</th>
                  <th className="text-right p-4 text-white/60 font-semibold">Kazanma</th>
                  <th className="text-right p-4 text-white/60 font-semibold">Turnuva</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => {
                  const isTopThree = item.rank <= 3;
                  const isUserItem = activeCategory === 'individual' 
                    ? isCreator(item.email)
                    : false;

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-all ${
                        isTopThree ? 'bg-white/5' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(item.rank)}
                          <span className={`text-xl font-bold ${
                            item.rank === 1 ? 'text-neon-gold' :
                            item.rank === 2 ? 'text-gray-300' :
                            item.rank === 3 ? 'text-amber-600' :
                            'text-white/60'
                          }`}>
                            #{item.rank}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                            activeCategory === 'individual'
                              ? 'bg-gradient-neon-cyan'
                              : 'bg-gradient-neon-purple'
                          }`}>
                            {activeCategory === 'individual' ? item.avatar : item.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white text-lg">
                                {activeCategory === 'individual' ? item.username : item.name}
                              </span>
                              {isUserItem && (
                                <span className="px-2 py-0.5 bg-gradient-neon-gold border border-neon-gold rounded-full text-xs font-bold text-bg-primary shadow-neon-gold animate-pulse">
                                  KURUCU
                                </span>
                              )}
                            </div>
                            {activeCategory === 'teams' && (
                              <span className="text-sm text-white/60">{item.members} üye</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <TrendingUp className="w-4 h-4 text-neon-cyan" />
                          <span className="text-xl font-bold text-neon-cyan">
                            {item.points.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-white/80 font-semibold">{item.wins}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-white/80 font-semibold">{item.tournaments}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Point System Info */}
        <div className="mt-6 backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-gold" />
            Puan Sistemi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <span className="text-white/80 font-semibold">Maç Kazanma</span>
                <p className="text-white/60">+25 Puan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-gold/20 border border-neon-gold flex items-center justify-center">
                <Crown className="w-5 h-5 text-neon-gold" />
              </div>
              <div>
                <span className="text-white/80 font-semibold">Turnuva Galibiyeti</span>
                <p className="text-white/60">+100 Puan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
