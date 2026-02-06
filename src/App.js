import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveArena from './pages/LiveArena';
import Predictions from './pages/Predictions';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import LobbyDetail from './pages/LobbyDetail';
import Leaderboard from './pages/Leaderboard';
import Forum from './pages/Forum';
import GameLobbies from './pages/GameLobbies';
import Lobbies from './pages/Lobbies';
import Market from './pages/Market';
import SquadFinder from './pages/SquadFinder';
import TournamentCalendar from './pages/TournamentCalendar';
import Achievements from './pages/Achievements';
import Highlights from './pages/Highlights';
import NotFound from './pages/NotFound';
import './App.css';
import './styles/global.css';

function AppContent() {
  return (
    <Router basename="/">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-arena" element={<LiveArena />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lobby/:id" element={<LobbyDetail />} />
          <Route path="/lobbies" element={<Lobbies />} />
          <Route path="/lobbies/:game" element={<GameLobbies />} />
          <Route path="/market" element={<Market />} />
          <Route path="/squad-finder" element={<SquadFinder />} />
          <Route path="/tournaments" element={<TournamentCalendar />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/forum" element={<Forum />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="/news" element={<NotFound />} />
          <Route path="/stats/:id" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Protected Admin Route
function ProtectedAdminRoute({ children }) {
  const { user } = useAuth();
  
  if (!user || user.email !== 'erdinoral31@gmail.com') {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default App;
