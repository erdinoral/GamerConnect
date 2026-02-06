import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Gamer Hub</h3>
            <p>Oyun dünyasının merkezi</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/lobby">Lobi & Forum</Link></li>
              <li><Link to="/guides">Rehberler</Link></li>
              <li><Link to="/news">Haberler</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Destek</h4>
            <ul>
              <li><a href="#">Yardım Merkezi</a></li>
              <li><a href="#">İletişim</a></li>
              <li><a href="#">Gizlilik Politikası</a></li>
              <li><a href="#">Kullanım Şartları</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Yatırımcılar</h4>
            <ul>
              <li><Link to="/investors">Yatırımcı Paneli</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Gamer Hub. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
