import React from 'react';

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-content">
          <h2>Gamer Hub Hakkında</h2>
          <p>Gamer Hub, oyun severler için tasarlanmış modern bir platformdur. Binlerce oyunu keşfedin, favorilerinizi oynayın ve oyun topluluğuna katılın.</p>
          <div className="features">
            <div className="feature">
              <i className="fas fa-gamepad"></i>
              <h3>Geniş Oyun Kütüphanesi</h3>
              <p>Yüzlerce farklı kategoride oyun</p>
            </div>
            <div className="feature">
              <i className="fas fa-users"></i>
              <h3>Aktif Topluluk</h3>
              <p>Milyonlarca oyuncu ile bağlantı kurun</p>
            </div>
            <div className="feature">
              <i className="fas fa-star"></i>
              <h3>Öneri Sistemi</h3>
              <p>Size özel oyun önerileri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
