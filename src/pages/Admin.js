import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Trophy, Users, Plus, Award, Coins, ShoppingBag } from 'lucide-react';
import { pointsService } from '../services/pointsService';
import '../styles/Admin.css';

function Admin() {
  const { user, updateGP } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'individual',
    userId: '',
    action: 'matchWin',
    points: 0
  });
  const [gpFormData, setGpFormData] = useState({
    userId: '',
    amount: 0,
    action: 'add' // 'add' or 'subtract'
  });

  const handleAddPoints = async (e) => {
    e.preventDefault();
    alert('Puan eklendi! (Veritabanı entegrasyonu eklendiğinde aktif olacak)');
    setFormData({ type: 'individual', userId: '', action: 'matchWin', points: 0 });
  };

  const handleManageGP = (e) => {
    e.preventDefault();
    if (gpFormData.userId && gpFormData.amount > 0) {
      // In production, update user's GP in database
      alert(`GP ${gpFormData.action === 'add' ? 'eklendi' : 'çıkarıldı'}: ${gpFormData.amount} GP`);
      setGpFormData({ userId: '', amount: 0, action: 'add' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <BackButton />
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-gold mb-4 flex items-center gap-3">
            <Trophy className="w-10 h-10" />
            Yönetim Paneli
          </h1>
          <p className="text-white/60">Hoş geldiniz, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Points Form */}
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-neon-cyan mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Puan Ekle
            </h2>
            <form onSubmit={handleAddPoints} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Tip</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan"
                >
                  <option value="individual">Bireysel Oyuncu</option>
                  <option value="team">Takım</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Kullanıcı/Takım ID</label>
                <input
                  type="text"
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                  placeholder="Kullanıcı veya takım ID'si"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Aksiyon</label>
                <select
                  value={formData.action}
                  onChange={(e) => setFormData({...formData, action: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan"
                >
                  <option value="matchWin">Maç Kazanma (+25 Puan)</option>
                  <option value="tournamentWin">Turnuva Galibiyeti (+100 Puan)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-neon-cyan rounded-lg text-white font-semibold hover:shadow-neon-cyan transition-all"
              >
                Puan Ekle
              </button>
            </form>
          </div>

          {/* Admin Features */}
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-neon-purple mb-6 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Yönetim Özellikleri
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/leaderboard')}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-left hover:border-neon-purple transition-all"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-neon-gold" />
                  <div>
                    <p className="font-semibold text-white">Liderlik Tablosu</p>
                    <p className="text-sm text-white/60">Sıralamaları görüntüle ve yönet</p>
                  </div>
                </div>
              </button>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="font-semibold text-white mb-2">Kullanıcı Yönetimi</p>
                <p className="text-sm text-white/60">Kullanıcı hesaplarını yönet</p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="font-semibold text-white mb-2">İçerik Moderasyonu</p>
                <p className="text-sm text-white/60">İçerikleri kontrol et ve moderasyon yap</p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="font-semibold text-white mb-2">İstatistikler ve Raporlar</p>
                <p className="text-sm text-white/60">Platform istatistiklerini görüntüle</p>
              </div>
            </div>

          {/* GP Management */}
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-neon-gold mb-6 flex items-center gap-2">
              <Coins className="w-6 h-6" />
              GP Yönetimi
            </h2>
            <form onSubmit={handleManageGP} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Kullanıcı Email</label>
                <input
                  type="email"
                  value={gpFormData.userId}
                  onChange={(e) => setGpFormData({...gpFormData, userId: e.target.value})}
                  placeholder="kullanici@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-gold"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Miktar</label>
                <input
                  type="number"
                  value={gpFormData.amount}
                  onChange={(e) => setGpFormData({...gpFormData, amount: parseInt(e.target.value) || 0})}
                  placeholder="GP miktarı"
                  min="1"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">İşlem</label>
                <select
                  value={gpFormData.action}
                  onChange={(e) => setGpFormData({...gpFormData, action: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-gold"
                >
                  <option value="add">GP Ekle</option>
                  <option value="subtract">GP Çıkar</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-neon-gold rounded-lg text-white font-semibold hover:shadow-neon-gold transition-all"
              >
                GP {gpFormData.action === 'add' ? 'Ekle' : 'Çıkar'}
              </button>
            </form>
          </div>

          {/* Market Management */}
          <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-neon-purple mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Market Yönetimi
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/market')}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-left hover:border-neon-purple transition-all"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="font-semibold text-white">Market Sayfası</p>
                    <p className="text-sm text-white/60">Ürünleri görüntüle ve yönet</p>
                  </div>
                </div>
              </button>
              <p className="text-sm text-white/60">
                Admin olarak tüm market ürünlerini ücretsiz alabilirsiniz.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
