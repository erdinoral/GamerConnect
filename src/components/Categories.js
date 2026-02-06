import React from 'react';

function Categories() {
  const categories = [
    { icon: 'fas fa-fist-raised', name: 'Aksiyon', desc: 'Hızlı tempolu aksiyon oyunları', category: 'action' },
    { icon: 'fas fa-mountain', name: 'Macera', desc: 'Epik macera hikayeleri', category: 'adventure' },
    { icon: 'fas fa-chess', name: 'Strateji', desc: 'Zeka ve strateji oyunları', category: 'strategy' },
    { icon: 'fas fa-futbol', name: 'Spor', desc: 'Gerçekçi spor simülasyonları', category: 'sports' },
    { icon: 'fas fa-car', name: 'Yarış', desc: 'Hızlı yarış oyunları', category: 'racing' },
    { icon: 'fas fa-puzzle-piece', name: 'Bulmaca', desc: 'Zeka geliştirici bulmacalar', category: 'puzzle' }
  ];

  return (
    <section id="categories" className="section categories-section">
      <div className="container">
        <h2 className="section-title">Kategoriler</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div key={index} className="category-card" data-category={cat.category}>
              <i className={cat.icon}></i>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
