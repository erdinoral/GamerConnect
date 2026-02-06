import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Coins, Sparkles, Frame, Star, Check } from 'lucide-react';
import '../styles/Market.css';

const marketItems = [
  {
    id: 'neon-name-cyan',
    name: 'Neon Cyan İsim',
    description: 'İsminizi neon cyan renkte parlatır',
    price: 500,
    category: 'name-color',
    icon: Sparkles,
    color: 'neon-cyan'
  },
  {
    id: 'neon-name-purple',
    name: 'Neon Purple İsim',
    description: 'İsminizi neon purple renkte parlatır',
    price: 500,
    category: 'name-color',
    icon: Sparkles,
    color: 'neon-purple'
  },
  {
    id: 'neon-name-gold',
    name: 'Neon Gold İsim',
    description: 'İsminizi neon gold renkte parlatır',
    price: 1000,
    category: 'name-color',
    icon: Sparkles,
    color: 'neon-gold'
  },
  {
    id: 'frame-basic',
    name: 'Temel Profil Çerçevesi',
    description: 'Basit neon çerçeveli profil görünümü',
    price: 300,
    category: 'frame',
    icon: Frame,
    color: 'neon-blue'
  },
  {
    id: 'frame-premium',
    name: 'Premium Profil Çerçevesi',
    description: 'Özel animasyonlu premium çerçeve',
    price: 1500,
    category: 'frame',
    icon: Frame,
    color: 'neon-gold'
  },
  {
    id: 'sponsored-lobby',
    name: 'Sponsorlu Lobi',
    description: 'Lobinizi en üste sabitleyin (7 gün)',
    price: 2000,
    category: 'lobby',
    icon: Star,
    color: 'neon-purple'
  }
];

function Market() {
  const { user, isLoggedIn, purchaseItem, updateGP } = useAuth();
  const [purchasedItems, setPurchasedItems] = useState(
    user?.purchasedItems || []
  );
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isAdmin = user?.email === 'erdinoral31@gmail.com';
  const userGP = user?.gp || 0;

  const handlePurchase = (item) => {
    if (!isLoggedIn) {
      alert('Satın almak için lütfen giriş yapın.');
      return;
    }

    if (purchasedItems.includes(item.id)) {
      alert('Bu ürün zaten satın alınmış!');
      return;
    }

    const success = purchaseItem(item.id, item.price);
    if (success) {
      setPurchasedItems([...purchasedItems, item.id]);
      if (user) {
        const updatedUser = { ...user, purchasedItems: [...purchasedItems, item.id] };
        localStorage.setItem('gamerHub_user', JSON.stringify(updatedUser));
      }
      alert(`${item.name} satın alındı!`);
    } else {
      alert('Yetersiz GP! Mevcut bakiyeniz: ' + userGP + ' GP');
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? marketItems 
    : marketItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'name-color', name: 'İsim Renkleri' },
    { id: 'frame', name: 'Profil Çerçeveleri' },
    { id: 'lobby', name: 'Lobi Özellikleri' }
  ];

  return (
    <div className="market-page">
      <BackButton />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="market-header">
          <div>
            <h1 className="page-title text-neon-gold">
              <ShoppingBag size={32} />
              Gamer Market
            </h1>
            <p className="page-subtitle">GP harcayarak özel özellikler satın alın</p>
          </div>
          <div className="gp-balance">
            <Coins size={24} className="text-neon-gold" />
            <span className="gp-amount">{userGP.toLocaleString()} GP</span>
          </div>
        </div>

        {isAdmin && (
          <div className="admin-badge">
            <Star size={16} />
            Admin: Tüm ürünler ücretsiz!
          </div>
        )}

        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="market-grid">
          {filteredItems.map(item => {
            const Icon = item.icon;
            const isPurchased = purchasedItems.includes(item.id);
            const canAfford = isAdmin || userGP >= item.price;

            return (
              <div
                key={item.id}
                className={`market-item glass ${isPurchased ? 'purchased' : ''} ${!canAfford ? 'insufficient' : ''}`}
              >
                {isPurchased && (
                  <div className="purchased-badge">
                    <Check size={16} />
                    Satın Alındı
                  </div>
                )}
                <div className="item-icon" style={{ color: `var(--neon-${item.color.split('-')[1]})` }}>
                  <Icon size={32} />
                </div>
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <div className="item-price">
                    {isAdmin ? (
                      <span className="free">ÜCRETSİZ</span>
                    ) : (
                      <>
                        <Coins size={18} />
                        {item.price.toLocaleString()} GP
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={isPurchased || !canAfford}
                    className={`btn-purchase ${isPurchased ? 'disabled' : ''}`}
                  >
                    {isPurchased ? 'Satın Alındı' : 'Satın Al'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Market;
