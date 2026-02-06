import React, { useState } from 'react';

function DonateButton() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');

  const processDonation = () => {
    if (!selectedAmount || selectedAmount <= 0) {
      alert('Lütfen geçerli bir tutar girin.');
      return;
    }
    alert(`Teşekkürler! ${selectedAmount}₺ bağış işlemi simüle edildi. (Gerçek ödeme entegrasyonu eklenecek)`);
    setShowModal(false);
    setSelectedAmount('');
  };

  return (
    <>
      <button className="donate-btn neon-gold" onClick={() => setShowModal(true)}>
        <i className="fas fa-heart"></i> Bağış Yap
      </button>
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>
            <div className="donate-content">
              <i className="fas fa-heart" style={{fontSize: '3rem', color: '#fbbf24', marginBottom: '1rem'}}></i>
              <h2>Gamer Hub'ı Destekle</h2>
              <p>Bağışlarınız platformun gelişimine katkıda bulunur.</p>
              <div className="donate-options">
                {[50, 100, 250, 500].map(amount => (
                  <button
                    key={amount}
                    className={`donate-amount ${selectedAmount == amount ? 'active' : ''}`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    {amount}₺
                  </button>
                ))}
              </div>
              <div className="custom-amount">
                <input
                  type="number"
                  placeholder="Özel Tutar (₺)"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                />
              </div>
              <button className="btn-primary" onClick={processDonation}>
                <i className="fas fa-credit-card"></i> Bağış Yap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DonateButton;
