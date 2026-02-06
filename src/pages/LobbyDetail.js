import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mic, MicOff, Volume2, VolumeX, 
  Send, Users, Crown, MessageSquare, Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { popularLobbies } from '../data/homeData';
import db from '../services/database';
import '../styles/LobbyDetail.css';

function LobbyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lobby, setLobby] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Find lobby from data
    const foundLobby = popularLobbies.find(l => l.id === parseInt(id));
    if (foundLobby) {
      setLobby(foundLobby);
      
      // Initialize participants
      const initialParticipants = [
        {
          id: 1,
          username: 'LobbyCreator',
          email: 'erdinoral31@gmail.com',
          isCreator: true,
          isOnline: true,
          rank: foundLobby.tags?.find(t => t && (t.includes('Rank') || t.includes('Faceit') || t.includes('Global'))) || 'Unranked'
        },
        {
          id: 2,
          username: user?.username || 'Guest',
          email: user?.email || 'guest@example.com',
          isCreator: user?.email === 'erdinoral31@gmail.com',
          isOnline: true,
          rank: 'Gold'
        }
      ];
      setParticipants(initialParticipants);

      // Join lobby in database
      if (user) {
        db.joinLobby(parseInt(id), user.email, {
          id: user.email,
          username: user.username,
          email: user.email,
          isCreator: user.email === 'erdinoral31@gmail.com',
          isOnline: true
        });
      }

      // Add join message
      const joinMessage = {
        id: Date.now(),
        type: 'system',
        text: `${user?.username || 'Guest'} lobiye katıldı`,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([joinMessage]);
      db.sendMessage(parseInt(id), joinMessage);

      // Subscribe to real-time updates
      const unsubscribe = db.subscribeToLobby(parseInt(id), ({ messages, participants }) => {
        if (messages) setMessages(messages);
        if (participants) setParticipants(participants);
      });

      return () => {
        unsubscribe();
        if (user) {
          db.leaveLobby(parseInt(id), user.email);
        }
      };
    }
  }, [id, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      type: 'user',
      username: user?.username || 'Guest',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    // Send to database
    await db.sendMessage(parseInt(id), message);
    
    // Update local state
    setMessages([...messages, { ...message, id: Date.now() }]);
    setNewMessage('');
  };

  const handleLeaveLobby = async () => {
    if (window.confirm('Lobiden ayrılmak istediğinize emin misiniz?')) {
      // Leave lobby in database
      if (user) {
        await db.leaveLobby(parseInt(id), user.email);
        
        // Send leave message
        const leaveMessage = {
          type: 'system',
          text: `${user.username || 'Guest'} lobiden ayrıldı`,
          timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };
        await db.sendMessage(parseInt(id), leaveMessage);
      }
      
      navigate(-1);
    }
  };

  if (!lobby) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Lobi bulunamadı...</div>
      </div>
    );
  }

  const getGameIcon = (gameName) => {
    if (gameName.includes('Valorant')) return '🔫';
    if (gameName.includes('Counter-Strike') || gameName.includes('CS2')) return '🎯';
    if (gameName.includes('League')) return '⚔️';
    return '🎮';
  };

  const getRankColor = (rank) => {
    if (!rank || typeof rank !== 'string') return 'text-white/60';
    if (rank.includes('Global') || rank.includes('Radiant')) return 'text-neon-gold';
    if (rank.includes('Diamond') || rank.includes('Immortal')) return 'text-neon-cyan';
    if (rank.includes('Platinum') || rank.includes('Ascendant')) return 'text-neon-purple';
    return 'text-white/60';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header with Leave Button */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={handleLeaveLobby}
          className="backdrop-blur-glass bg-white/5 border border-neon-cyan rounded-xl px-6 py-3 text-neon-cyan font-semibold flex items-center gap-2 hover:bg-neon-cyan/10 hover:shadow-neon-cyan transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Lobiden Ayrıl
        </button>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header Panel */}
        <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{getGameIcon(lobby.game)}</div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{lobby.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-neon-cyan font-semibold">{lobby.game}</span>
                  <span className="text-white/60">
                    {lobby.tags?.find(t => t && (t.includes('Rank') || t.includes('Faceit') || t.includes('Global'))) || 'Tüm Ranklar'}
                  </span>
                  <span className="text-white/40">
                    {lobby.members}/{lobby.maxMembers} Oyuncu
                  </span>
                </div>
              </div>
            </div>
            {lobby.sponsored && (
              <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-400 font-semibold flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Sponsorlu
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Participants List */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-neon-purple" />
                <h2 className="text-2xl font-bold text-neon-purple">Oyuncular</h2>
                <span className="text-white/60 text-sm">({participants.length}/{lobby.maxMembers})</span>
              </div>
              
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-4 hover:border-neon-purple transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-neon-blue flex items-center justify-center text-white font-bold">
                            {participant.username.charAt(0).toUpperCase()}
                          </div>
                          {participant.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-primary"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{participant.username}</span>
                            {participant.isCreator && (
                              <span className="px-2 py-0.5 bg-gradient-neon-gold border border-neon-gold rounded-full text-xs font-bold text-bg-primary shadow-neon-gold animate-pulse">
                                KURUCU
                              </span>
                            )}
                          </div>
                          <span className={`text-xs ${getRankColor(participant.rank || '')}`}>
                            {participant.rank || 'Unranked'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice Chat Section */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Radio className="w-5 h-5 text-neon-cyan" />
                  <h3 className="text-lg font-bold text-neon-cyan">Sesli Sohbet</h3>
                </div>
                
                <div className="space-y-2">
                  {participants.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-neon-purple flex items-center justify-center text-white text-xs font-bold">
                          {p.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-white/80">{p.username}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.isOnline && (
                          <div className="flex items-center gap-1 text-green-400 text-xs">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Konuşuyor...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voice Controls */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      isMicOn
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                    }`}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    <span className="text-sm font-semibold">{isMicOn ? 'Mikrofon Açık' : 'Mikrofon Kapalı'}</span>
                  </button>
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      isSpeakerOn
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                    }`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    <span className="text-sm font-semibold">{isSpeakerOn ? 'Hoparlör Açık' : 'Hoparlör Kapalı'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-200px)]">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-xl font-bold text-neon-cyan">Canlı Sohbet</h2>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.type === 'system'
                        ? 'text-center'
                        : 'flex items-start gap-3'
                    }`}
                  >
                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-neon-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {message.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div
                      className={`flex-1 ${
                        message.type === 'system'
                          ? 'text-white/40 text-sm italic'
                          : ''
                      }`}
                    >
                      {message.type === 'user' && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-neon-cyan">{message.username}</span>
                          <span className="text-xs text-white/40">{message.timestamp}</span>
                        </div>
                      )}
                      <div
                        className={`${
                          message.type === 'system'
                            ? 'text-center'
                            : 'text-white/80 bg-white/5 rounded-lg px-4 py-2 border border-white/10'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Mesaj yazın..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-gradient-neon-cyan rounded-lg text-white hover:shadow-neon-cyan transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyDetail;
