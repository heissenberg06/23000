import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
    return (
        <div>
            <div className="hero-section">
                <h1 className='h1class'>Türkiye'nin 2. el Araç Deposu!</h1>
                <p>Hayalindeki arabayı bizimle bul.</p>
                <Link to="/sales" className="btn btn-primary">İlanlara Git</Link>
            </div>
            <div className="search-section">
                {/* Search component goes here */}
            </div>
            <div className="about-brief">
                <h2>Bize ulaş</h2>
                <p>Herhangi bir sorun oluşması durumunda müşteri hizmetleri 7/24 aktiftir.</p>
                <Link to="/contact" className="btn btn-secondary">Daha Fazla</Link>
            </div>
            <div className="special-offers">
                {/* Special offers component */}
            </div>
            <div className="testimonials">
                {/* Testimonials component */}
            </div>
            <div className="latest-news">
                <h2>Yeni Haberler</h2>
                {/* News articles or blog posts listed here */}
            </div>
            <div className="newsletter-signup">
                <h2>Güncel Kal</h2>
                <p>En yeni otomobil haberleri ve özel teklifler için kaydolun!</p>
                {/* Signup form */}
            </div>
            <div className="footer">
                {/* Footer with contact info and social media links */}
            </div>
        </div>
    );
};

export default HomePage;
