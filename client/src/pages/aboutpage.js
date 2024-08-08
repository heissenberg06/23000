import React from 'react';
import './aboutpage.css';

function AboutPage() {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>Welcome to our website! We are committed to providing the best experience for our users.</p>
            
            <h2>Contact Information</h2>
            <p>If you have any questions, please feel free to reach out to us:</p>
            <ul>
                <li>Email: contact@example.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 1234 Street, City, Country</li>
            </ul>
        </div>
    );
}

export default AboutPage;
