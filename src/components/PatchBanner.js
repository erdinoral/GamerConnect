import React from 'react';

function PatchBanner() {
  return (
    <section className="patch-banner">
      <div className="container">
        <div className="patch-content">
          <div className="patch-item">
            <i className="fas fa-download"></i>
            <div>
              <h3>Yeni Yama: v2.4.1</h3>
              <p>Yeni karakterler ve denge güncellemeleri</p>
              <span className="patch-date">2 saat önce</span>
            </div>
          </div>
          <div className="patch-item">
            <i className="fas fa-calendar-alt"></i>
            <div>
              <h3>Aktif Etkinlik</h3>
              <p>Hafta Sonu Turnuvası - Ödül Havuzu: 50,000₺</p>
              <span className="patch-date">Son 3 gün</span>
            </div>
          </div>
          <div className="patch-item">
            <i className="fas fa-fire"></i>
            <div>
              <h3>Hotfix: v2.4.0.1</h3>
              <p>Kritik bug düzeltmeleri ve performans iyileştirmeleri</p>
              <span className="patch-date">5 saat önce</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatchBanner;
