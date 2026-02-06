import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, LogIn, ChevronDown, Users, MessageSquare, ShoppingBag, Calendar, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import '../styles/Navbar.css';

const gameLobbies = {
  valorant: { name: 'Valorant', path: '/lobbies/valorant' },
  cs2: { name: 'Counter-Strike 2', path: '/lobbies/cs2' },
  lol: { name: 'League of Legends', path: '/lobbies/lol' },
  eafc: { name: 'EA Sports FC', path: '/lobbies/eafc' },
  apex: { name: 'Apex Legends', path: '/lobbies/apex' },
  fortnite: { name: 'Fortnite', path: '/lobbies/fortnite' }
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLobbyDropdown, setShowLobbyDropdown] = useState(false);
  const [dropdownTimer, setDropdownTimer] = useState(null);

  const isActive = (path) => location.pathname === path;

  const handleLoginClick = () => {
    if (isLoggedIn) {
      if (window.confirm('Çıkış yapmak istediğinize emin misiniz?')) {
        logout();
      }
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <nav className="navbar glass">
        <div className="container">
          <Link to="/" className="nav-brand">
            <span className="logo-text text-neon-blue">GamerConnect</span>
          </Link>
          <ul className="nav-menu">
            <li>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/live-arena" className={`nav-link ${isActive('/live-arena') ? 'active' : ''}`}>
                Live Arena
              </Link>
            </li>
            <li>
              <Link to="/predictions" className={`nav-link ${isActive('/predictions') ? 'active' : ''}`}>
                Tahminler
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}>
                Liderlik Tablosu
              </Link>
            </li>
            <li 
              className="relative group"
              onMouseEnter={() => {
                if (dropdownTimer) {
                  clearTimeout(dropdownTimer);
                  setDropdownTimer(null);
                }
                setShowLobbyDropdown(true);
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => setShowLobbyDropdown(false), 200);
                setDropdownTimer(timer);
              }}
            >
              <Link 
                to="/lobbies"
                className={`nav-link ${location.pathname.startsWith('/lobbies') ? 'active' : ''} flex items-center gap-1`}
              >
                <Users size={18} />
                Lobiler
                <ChevronDown size={16} />
              </Link>
              <div 
                className={`lobby-dropdown absolute top-full left-0 pt-4 w-64 backdrop-blur-glass bg-gray-900/95 border border-white/10 rounded-xl shadow-lg z-50 py-2 transition-all duration-300 delay-150 ${
                  showLobbyDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {Object.entries(gameLobbies).map(([key, game]) => (
                  <Link
                    key={key}
                    to={game.path}
                    className={`block w-full px-4 py-3 transition-all duration-200 text-white/80 hover:text-white cursor-pointer ${
                      location.pathname === game.path 
                        ? 'bg-white/5 text-white border-l-2 border-neon-purple' 
                        : 'hover:bg-white/5 hover:bg-neon-purple/10 hover:border-l-2 hover:border-neon-purple'
                    }`}
                    onClick={() => setShowLobbyDropdown(false)}
                  >
                    {game.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link to="/forum" className={`nav-link ${isActive('/forum') ? 'active' : ''}`}>
                <MessageSquare size={18} />
                Forum
              </Link>
            </li>
            <li>
              <Link to="/market" className={`nav-link ${isActive('/market') ? 'active' : ''}`}>
                <ShoppingBag size={18} />
                Market
              </Link>
            </li>
            <li>
              <Link to="/squad-finder" className={`nav-link ${isActive('/squad-finder') ? 'active' : ''}`}>
                <Users size={18} />
                Squad Finder
              </Link>
            </li>
            <li>
              <Link to="/tournaments" className={`nav-link ${isActive('/tournaments') ? 'active' : ''}`}>
                <Calendar size={18} />
                Turnuvalar
              </Link>
            </li>
            <li>
              <Link to="/highlights" className={`nav-link ${isActive('/highlights') ? 'active' : ''}`}>
                <Video size={18} />
                Highlights
              </Link>
            </li>
            <li>
              <Link to="/support" className={`nav-link ${isActive('/support') ? 'active' : ''}`}>
                Destek
              </Link>
            </li>
            <li>
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                Profil
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            <div className="search-box glass">
              <Search size={18} />
              <input type="text" placeholder="Ara..." />
            </div>
            <button className="btn-login neon-glow-blue" onClick={handleLoginClick}>
              <LogIn size={18} />
              {isLoggedIn ? user?.username || 'Kullanıcı' : 'Giriş Yap'}
            </button>
          </div>
        </div>
      </nav>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default Navbar;
