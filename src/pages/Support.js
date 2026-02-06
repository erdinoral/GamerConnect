import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { donationTiers, investorStats } from '../data/data';
import { Heart, Rocket, TrendingUp, Users, Globe, Target, X, Copy, Check } from 'lucide-react';
import '../styles/Support.css';

function Support() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [copied, setCopied] = useState({});

  const paymentInfo = {
    bank: {
      name: 'Türkiye İş Bankası',
      accountName: 'GamerConnect Platform',
      iban: 'TR33 0006 4000 0011 2345 6789 01',
      accountNumber: '1234567890'
    },
    crypto: {
      btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      eth: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      usdt: 'TXYZ1234567890abcdefghijklmnopqrstuvwxyz'
    }
  };

  const handleCopy = (type, value) => {
    navigator.clipboard.writeText(value);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => {
      setCopied({ ...copied, [type]: false });
    }, 2000);
  };

  const iconMap = {
    users: Users,
    'trending-up': TrendingUp,
    globe: Globe,
    target: Target
  };

  return (
    <div className="support-page">
      <BackButton />
      <div className="container" style={{paddingTop: '100px', paddingBottom: '40px'}}>
        {/* Support & Invest Section */}
        <section className="support-section">
          <div className="support-header">
            <Heart size={32} className="text-neon-pink" />
            <h1 className="page-title text-neon-gold">Support & Invest</h1>
          </div>
          <p className="support-description">
            GamerConnect'in büyümesine katkı sağlayarak Türkiye'nin en büyük gaming topluluğunun bir parçası ol.
          </p>
          
          <div className="donate-section">
            <button 
              onClick={() => setShowDonateModal(true)}
              className="btn-donate-main neon-glow-gold"
            >
              <Heart size={20} />
              Bağış Yap
            </button>
            <p className="donate-subtext">Platformun ayakta kalmasına ve büyümesine katkı sağ</p>
            
            <div className="donation-tiers">
              {donationTiers.map((tier, index) => (
                <div 
                  key={index}
                  className={`donation-card glass neon-glow-gold ${selectedAmount === tier.amount ? 'selected' : ''}`}
                  onClick={() => setSelectedAmount(tier.amount)}
                >
                  <div className="donation-amount">${tier.amount}</div>
                  <div className="donation-title">{tier.title}</div>
                  <div className="donation-description">{tier.description}</div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowDonateModal(true)}
              className="btn-donate-large neon-glow-gold"
            >
              <Heart size={24} />
              Bağış Yap
            </button>
            <p className="security-text">Güvenli ödeme altyapısı ile bağışlarınız koruma altındadır.</p>
          </div>
        </section>

        {/* Investor Panel */}
        <section className="investor-section glass">
          <div className="investor-header">
            <Rocket size={32} className="text-neon-blue" />
            <h2 className="section-title text-neon-blue">Yatırımcı Paneli</h2>
          </div>
          <p className="investor-description">
            E-spor ve gaming sektörünün hızla büyüyen ekosisteminde yerinizi alın. GamerConnect, Türkiye'nin lider gaming platformu olma vizyonuyla büyüyor.
          </p>
          
          <div className="investor-stats">
            {investorStats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <div key={index} className={`investor-stat-card glass stat-${stat.color}`}>
                  <Icon size={32} />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why GamerConnect */}
        <section className="why-section glass">
          <div className="why-header">
            <TrendingUp size={32} className="text-neon-cyan" />
            <h2 className="section-title text-neon-cyan">Neden GamerConnect?</h2>
          </div>
          
          <div className="why-grid">
            <div className="why-card glass">
              <h3>Hızla Büyüyen Pazar</h3>
              <p>Türkiye e-spor pazarı yıllık %35 büyüme gösteriyor. 2025'te $500M+ pazar büyüklüğü bekleniyor.</p>
            </div>
            <div className="why-card glass">
              <h3>Gelir Modeli</h3>
              <p>Reklam, sponsorlu lobiler, premium üyelik ve turnuva komisyonları ile çoklu gelir akışı.</p>
            </div>
            <div className="why-card glass">
              <h3>Benzersiz Pozisyon</h3>
              <p>Türkçe konuşan gamerlar için özel tasarlanmış tek kapsamlı platform. Lobbyler, turnuvalar, tahminler tek çatıda.</p>
            </div>
            <div className="why-card glass">
              <h3>Topluluk Odaklı</h3>
              <p>Forum, sesli sohbet ve canlı yayınlar ile güçlü topluluk bağlantısından yüksek kullanıcı tutma oranı.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Donation Modal */}
      {showDonateModal && (
        <div className="modal" onClick={() => setShowDonateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-neon-gold">Bağış Yap</h2>
              <button 
                onClick={() => setShowDonateModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Bank Transfer */}
              <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-neon-cyan mb-4">Banka Havale/EFT</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Banka:</span>
                    <span className="text-white font-semibold">{paymentInfo.bank.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Hesap Adı:</span>
                    <span className="text-white font-semibold">{paymentInfo.bank.accountName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">IBAN:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">{paymentInfo.bank.iban}</span>
                      <button
                        onClick={() => handleCopy('iban', paymentInfo.bank.iban)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copied.iban ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Hesap No:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">{paymentInfo.bank.accountNumber}</span>
                      <button
                        onClick={() => handleCopy('account', paymentInfo.bank.accountNumber)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copied.account ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto */}
              <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-neon-purple mb-4">Kripto Para</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">Bitcoin (BTC):</span>
                      <button
                        onClick={() => handleCopy('btc', paymentInfo.crypto.btc)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copied.btc ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-white/60 font-mono text-sm break-all">{paymentInfo.crypto.btc}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">Ethereum (ETH):</span>
                      <button
                        onClick={() => handleCopy('eth', paymentInfo.crypto.eth)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copied.eth ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-white/60 font-mono text-sm break-all">{paymentInfo.crypto.eth}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">USDT (TRC20):</span>
                      <button
                        onClick={() => handleCopy('usdt', paymentInfo.crypto.usdt)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copied.usdt ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-white/60 font-mono text-sm break-all">{paymentInfo.crypto.usdt}</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-neon-gold mb-4">İletişim</h3>
                <p className="text-white/80 mb-4">
                  Bağış yaptıktan sonra lütfen aşağıdaki formu doldurun veya{' '}
                  <a href="mailto:donate@gamerconnect.com" className="text-neon-cyan hover:underline">
                    donate@gamerconnect.com
                  </a>{' '}
                  adresine e-posta gönderin.
                </p>
                <button className="w-full py-3 bg-gradient-neon-gold rounded-lg text-white font-semibold hover:shadow-neon-gold transition-all">
                  İletişim Formu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
