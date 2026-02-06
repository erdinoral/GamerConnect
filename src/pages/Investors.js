import React from 'react';
import BackButton from '../components/BackButton';

function Investors() {
  return (
    <div className="page-container" style={{marginTop: '80px', padding: '40px 20px'}}>
      <BackButton />
      <div className="container">
        <div className="page-header">
          <h1><i className="fas fa-handshake"></i> Yatırımcı Paneli</h1>
          <p>Gamer Hub'ın geleceği ve yatırım fırsatları</p>
        </div>
        <div className="investors-content">
          <section className="vision-section">
            <h2><i className="fas fa-rocket"></i> Vizyonumuz</h2>
            <p>Gamer Hub, oyun topluluğunu bir araya getiren, kapsamlı bir platform olmayı hedefliyor.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Investors;
