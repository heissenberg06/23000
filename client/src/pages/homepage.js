import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
    return (
        <div>
            <div className="hero-section">
                <h1 className='h1class'>Welcome to Our Trusted Second-Hand Car Marketplace!</h1>
                <p>Find your perfect car with us.</p>
                <Link to="/sales" className="btn btn-primary">View Featured Cars</Link>
            </div>
            <div className="search-section">
                {/* Search component goes here */}
            </div>
            <div className="about-brief">
                <h2>Contact Us</h2>
                <p>Learn more about our commitment to quality and customer service.</p>
                <Link to="/contact" className="btn btn-secondary">Learn More</Link>
            </div>
            <div className="special-offers">
                {/* Special offers component */}
            </div>
            <div className="testimonials">
                {/* Testimonials component */}
            </div>
            <div className="latest-news">
                <h2>Latest News</h2>
                {/* News articles or blog posts listed here */}
            </div>
            <div className="newsletter-signup">
                <h2>Stay Updated</h2>
                <p>Sign up for our newsletter to receive the latest car listings and special offers.</p>
                {/* Signup form */}
            </div>
            <div className="footer">
                {/* Footer with contact info and social media links */}
            </div>
        </div>
    );
};

export default HomePage;
