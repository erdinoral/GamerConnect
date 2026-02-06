import React, { useState, useEffect } from 'react';
import { AlertCircle, Trophy, TrendingUp, Award } from 'lucide-react';
import { breakingNews } from '../data/leaderboardData';

function BreakingNewsBanner() {
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % breakingNews.length);
    }, 5000); // Her 5 saniyede bir değiş

    return () => clearInterval(interval);
  }, []);

  const news = breakingNews[currentNews];
  
  const getIcon = (type) => {
    switch (type) {
      case 'tournament':
        return <Trophy className="w-5 h-5 text-neon-gold" />;
      case 'match':
        return <TrendingUp className="w-5 h-5 text-neon-cyan" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-neon-purple" />;
      default:
        return <AlertCircle className="w-5 h-5 text-neon-cyan" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'tournament':
        return 'neon-gold';
      case 'match':
        return 'neon-cyan';
      case 'achievement':
        return 'neon-purple';
      default:
        return 'neon-cyan';
    }
  };

  return (
    <div className="mb-8">
      <div 
        className={`backdrop-blur-glass bg-white/5 border border-${getColor(news.type)} rounded-2xl p-4 overflow-hidden relative`}
        style={{
          borderColor: news.type === 'tournament' ? '#ffd700' : 
                      news.type === 'match' ? '#00ffff' : 
                      '#b026ff',
          boxShadow: news.type === 'tournament' ? '0 0 20px rgba(255, 215, 0, 0.3)' : 
                    news.type === 'match' ? '0 0 20px rgba(0, 255, 255, 0.3)' : 
                    '0 0 20px rgba(176, 38, 255, 0.3)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500">
            <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-xs font-bold text-red-400">BREAKING NEWS</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            {getIcon(news.type)}
            <p className="text-white font-semibold flex-1">{news.text}</p>
            <span className="text-xs text-white/40">{news.timestamp}</span>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan"
            style={{
              width: '200%',
              animation: 'slide 5s linear infinite'
            }}
          ></div>
        </div>
        
        <style>{`
          @keyframes slide {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default BreakingNewsBanner;
