import React from 'react';
import { Trophy, Users, Crown, Award, TrendingUp } from 'lucide-react';
import { hallOfFame } from '../data/leaderboardData';

function HallOfFame() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-neon-gold mb-6 flex items-center gap-3">
        <Trophy className="w-8 h-8" />
        Onur Kürsüsü
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Haftanın Oyuncusu */}
        <div className="backdrop-blur-glass bg-white/5 border border-neon-cyan rounded-2xl p-6 hover:border-neon-cyan hover:shadow-neon-cyan transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-neon-cyan/20 border border-neon-cyan">
              <Award className="w-6 h-6 text-neon-cyan" />
            </div>
            <h3 className="text-lg font-bold text-neon-cyan">Haftanın Oyuncusu</h3>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-neon-cyan flex items-center justify-center text-white font-bold text-lg">
              {hallOfFame.weeklyPlayer.avatar}
            </div>
            <div>
              <p className="font-semibold text-white text-lg">{hallOfFame.weeklyPlayer.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-4 h-4 text-neon-cyan" />
                <span className="text-neon-cyan font-bold">{hallOfFame.weeklyPlayer.points.toLocaleString()} Puan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Haftanın Takımı */}
        <div className="backdrop-blur-glass bg-white/5 border border-neon-purple rounded-2xl p-6 hover:border-neon-purple hover:shadow-neon-purple transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-neon-purple/20 border border-neon-purple">
              <Users className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="text-lg font-bold text-neon-purple">Haftanın Takımı</h3>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-neon-purple flex items-center justify-center text-white font-bold text-lg">
              {hallOfFame.weeklyTeam.logo}
            </div>
            <div>
              <p className="font-semibold text-white text-lg">{hallOfFame.weeklyTeam.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-4 h-4 text-neon-purple" />
                <span className="text-neon-purple font-bold">{hallOfFame.weeklyTeam.points.toLocaleString()} Puan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tüm Zamanların Efsanesi */}
        <div className="backdrop-blur-glass bg-white/5 border border-neon-gold rounded-2xl p-6 hover:border-neon-gold hover:shadow-neon-gold transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-neon-gold/20 border border-neon-gold">
              <Crown className="w-6 h-6 text-neon-gold" />
            </div>
            <h3 className="text-lg font-bold text-neon-gold">Tüm Zamanların Efsanesi</h3>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-neon-gold flex items-center justify-center text-bg-primary font-bold text-lg">
              {hallOfFame.allTimePlayer.avatar}
            </div>
            <div>
              <p className="font-semibold text-white text-lg">{hallOfFame.allTimePlayer.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <Trophy className="w-4 h-4 text-neon-gold" />
                <span className="text-neon-gold font-bold">{hallOfFame.allTimePlayer.points.toLocaleString()} Puan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tüm Zamanların Takımı */}
        <div className="backdrop-blur-glass bg-white/5 border border-neon-gold rounded-2xl p-6 hover:border-neon-gold hover:shadow-neon-gold transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-neon-gold/20 border border-neon-gold">
              <Crown className="w-6 h-6 text-neon-gold" />
            </div>
            <h3 className="text-lg font-bold text-neon-gold">Tüm Zamanların Takımı</h3>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-neon-gold flex items-center justify-center text-bg-primary font-bold text-lg">
              {hallOfFame.allTimeTeam.logo}
            </div>
            <div>
              <p className="font-semibold text-white text-lg">{hallOfFame.allTimeTeam.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Trophy className="w-4 h-4 text-neon-gold" />
                <span className="text-neon-gold font-bold">{hallOfFame.allTimeTeam.points.toLocaleString()} Puan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HallOfFame;
